import { openDB, type IDBPDatabase } from 'idb';
import { ChatSummary, MediaType } from './types';

const DB_NAME = 'whatsapp-viewer';
const DB_VERSION = 1;

interface ChatRecord {
  id: string;
  rawText: string;
  name: string;
  participants: string[];
  isGroup: boolean;
  outgoingSender: string;
  messageCount: number;
  firstMessageDate: string;
  lastMessageDate: string;
  createdAt: string;
}

interface MediaRecord {
  chatId: string;
  filename: string;
  blob: Blob;
  mediaType: MediaType;
}

interface BookmarkRecord {
  chatId: string;
  messageId: string;
  createdAt: string;
}

interface WhatsAppDB {
  chats: { key: string; value: ChatRecord };
  media: { key: [string, string]; value: MediaRecord; indexes: { byChatId: string } };
  bookmarks: { key: [string, string]; value: BookmarkRecord; indexes: { byChatId: string } };
}

let dbInstance: IDBPDatabase<WhatsAppDB> | null = null;

function generateChatId(rawText: string, name: string, participants: string[]): string {
  const input = rawText.slice(0, 1000) + '|' + name + '|' + [...participants].sort().join(',');
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) - hash) + input.charCodeAt(i);
    hash |= 0;
  }
  return 'chat_' + Math.abs(hash).toString(36);
}

export async function initDB(): Promise<IDBPDatabase<WhatsAppDB>> {
  if (dbInstance) return dbInstance;
  dbInstance = await openDB<WhatsAppDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('chats')) db.createObjectStore('chats', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('media')) {
        const ms = db.createObjectStore('media', { keyPath: ['chatId', 'filename'] });
        ms.createIndex('byChatId', 'chatId');
      }
      if (!db.objectStoreNames.contains('bookmarks')) {
        const bs = db.createObjectStore('bookmarks', { keyPath: ['chatId', 'messageId'] });
        bs.createIndex('byChatId', 'chatId');
      }
    },
  });
  return dbInstance;
}

export function isDBAvailable(): boolean {
  return typeof window !== 'undefined' && !!window.indexedDB;
}

export async function saveChat(
  rawText: string, name: string, participants: string[], isGroup: boolean,
  outgoingSender: string, messageCount: number, firstMessageDate: string, lastMessageDate: string,
): Promise<string> {
  const db = await initDB();
  const id = generateChatId(rawText, name, participants);
  await db.put('chats', { id, rawText, name, participants, isGroup, outgoingSender, messageCount, firstMessageDate, lastMessageDate, createdAt: new Date().toISOString() });
  return id;
}

export async function listChats(): Promise<ChatSummary[]> {
  const db = await initDB();
  const records = await db.getAll('chats');
  const bookmarkCounts = new Map<string, number>();
  const allBookmarks = await db.getAll('bookmarks');
  for (const bm of allBookmarks) bookmarkCounts.set(bm.chatId, (bookmarkCounts.get(bm.chatId) || 0) + 1);
  return records
    .map((r) => ({ id: r.id, name: r.name, participants: r.participants, isGroup: r.isGroup, messageCount: r.messageCount, firstMessageDate: r.firstMessageDate, lastMessageDate: r.lastMessageDate, createdAt: r.createdAt, bookmarkCount: bookmarkCounts.get(r.id) || 0 }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function loadChat(chatId: string): Promise<{ rawText: string; outgoingSender: string; mediaMap: Map<string, string> } | null> {
  const db = await initDB();
  const chat = await db.get('chats', chatId);
  if (!chat) return null;
  const mediaMap = new Map<string, string>();
  const mediaRecords = await db.getAllFromIndex('media', 'byChatId', chatId);
  for (const r of mediaRecords) mediaMap.set(r.filename, URL.createObjectURL(r.blob));
  return { rawText: chat.rawText, outgoingSender: chat.outgoingSender, mediaMap };
}

export async function deleteChat(chatId: string): Promise<void> {
  const db = await initDB();
  const tx = db.transaction(['chats', 'media', 'bookmarks'], 'readwrite');
  await tx.objectStore('chats').delete(chatId);
  let mc = await tx.objectStore('media').index('byChatId').openCursor(chatId);
  while (mc) { await mc.delete(); mc = await mc.continue(); }
  let bc = await tx.objectStore('bookmarks').index('byChatId').openCursor(chatId);
  while (bc) { await bc.delete(); bc = await bc.continue(); }
  await tx.done;
}

export async function saveMediaBlob(chatId: string, filename: string, blob: Blob, mediaType: MediaType): Promise<void> {
  const db = await initDB();
  await db.put('media', { chatId, filename, blob, mediaType });
}

export async function addBookmark(chatId: string, messageId: string): Promise<void> {
  const db = await initDB();
  await db.put('bookmarks', { chatId, messageId, createdAt: new Date().toISOString() });
}

export async function removeBookmark(chatId: string, messageId: string): Promise<void> {
  const db = await initDB();
  await db.delete('bookmarks', [chatId, messageId]);
}

export async function getBookmarks(chatId: string): Promise<Set<string>> {
  const db = await initDB();
  const records = await db.getAllFromIndex('bookmarks', 'byChatId', chatId);
  return new Set(records.map((r) => r.messageId));
}

export interface GlobalSearchResult {
  chatId: string; chatName: string; participants: string[];
  sender: string; content: string; timestamp: string; messageId: string;
}

export async function searchAllChats(query: string, limit = 50): Promise<GlobalSearchResult[]> {
  if (!query || query.length < 2) return [];
  const db = await initDB();
  const chatRecords = await db.getAll('chats');
  const results: GlobalSearchResult[] = [];
  const lq = query.toLowerCase();
  for (const chat of chatRecords) {
    const lines = chat.rawText.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').split('\n');
    let li = 0;
    for (const line of lines) {
      if (results.length >= limit) break;
      if (!line.toLowerCase().includes(lq)) { li++; continue; }
      const m = line.match(/^[\u200E\u200F]*\[?[\d/.,\s:APMapm–-]+\]?\s?[-–]?\s?(.+?):\s(.+)$/);
      if (m) {
        const sender = m[1].trim(), content = m[2].trim();
        if (content.toLowerCase().includes(lq) || sender.toLowerCase().includes(lq)) {
          const tm = line.match(/([\d/.]+ [\d:]+(?:\s?[APap][Mm])?)/);
          results.push({ chatId: chat.id, chatName: chat.name, participants: chat.participants, sender, content, timestamp: tm?.[1] || '', messageId: String(li) });
        }
      }
      li++;
    }
    if (results.length >= limit) break;
  }
  return results;
}
