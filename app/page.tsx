'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Chat, ChatSummary } from '@/lib/types';
import { parseWhatsAppChat } from '@/lib/parser';
import { sampleChat } from '@/lib/sample-data';
import { revokeMediaUrls } from '@/lib/zip-handler';
import { isDBAvailable, listChats, saveChat, loadChat, deleteChat, saveMediaBlob, getBookmarks, addBookmark, removeBookmark } from '@/lib/db';
import ChatView from '@/components/ChatView';
import ChatList from '@/components/ChatList';
import SenderPicker from '@/components/SenderPicker';
import ErrorBoundary from '@/components/ErrorBoundary';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const [chat, setChat] = useState<Chat | null>(null);
  const [storedChats, setStoredChats] = useState<ChatSummary[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [dbAvailable, setDbAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialSearchQuery, setInitialSearchQuery] = useState<string | null>(null);

  const [pendingText, setPendingText] = useState<string | null>(null);
  const [pendingParticipants, setPendingParticipants] = useState<string[]>([]);
  const pendingMediaMapRef = useRef<Map<string, string> | undefined>(undefined);
  const pendingMediaBlobMapRef = useRef<Map<string, Blob> | undefined>(undefined);
  const activeMediaMapRef = useRef<Map<string, string> | undefined>(undefined);

  useEffect(() => {
    if (!isDBAvailable()) { setDbAvailable(false); setLoading(false); return; }
    setDbAvailable(true);
    listChats().then(setStoredChats).catch(() => setDbAvailable(false)).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    return () => { if (activeMediaMapRef.current) revokeMediaUrls(activeMediaMapRef.current); };
  }, []);

  const handleFileLoaded = useCallback((text: string, mediaMap?: Map<string, string>, mediaBlobMap?: Map<string, Blob>) => {
    const parsed = parseWhatsAppChat(text);
    if (parsed.messages.length === 0) {
      alert('Could not parse any messages from this file. Please check the format.');
      if (mediaMap) revokeMediaUrls(mediaMap);
      return;
    }
    setPendingText(text);
    setPendingParticipants(parsed.participants);
    pendingMediaMapRef.current = mediaMap;
    pendingMediaBlobMapRef.current = mediaBlobMap;
  }, []);

  const handleSenderSelected = useCallback(async (sender: string) => {
    if (!pendingText) return;
    if (activeMediaMapRef.current) revokeMediaUrls(activeMediaMapRef.current);

    const mediaMap = pendingMediaMapRef.current;
    const mediaBlobMap = pendingMediaBlobMapRef.current;
    const parsed = parseWhatsAppChat(pendingText, sender, mediaMap);

    let chatId: string | null = null;
    if (dbAvailable) {
      try {
        const first = parsed.messages[0], last = parsed.messages[parsed.messages.length - 1];
        chatId = await saveChat(pendingText, parsed.name, parsed.participants, parsed.isGroup, sender, parsed.messages.length, first?.timestamp.toISOString() || '', last?.timestamp.toISOString() || '');
        parsed.id = chatId;
        if (mediaBlobMap && chatId) {
          const cid = chatId;
          for (const [fn, blob] of mediaBlobMap) saveMediaBlob(cid, fn, blob, 'image').catch(() => {});
        }
        setStoredChats(await listChats());
        setBookmarks(await getBookmarks(chatId));
      } catch { /* persistence failed, chat still works */ }
    }

    setChat(parsed);
    setActiveChatId(chatId);
    setPendingText(null);
    setPendingParticipants([]);
    activeMediaMapRef.current = mediaMap;
    pendingMediaMapRef.current = undefined;
    pendingMediaBlobMapRef.current = undefined;
  }, [pendingText, dbAvailable]);

  const handleLoadStoredChat = useCallback(async (chatId: string, searchQuery?: string) => {
    setLoading(true);
    try {
      const result = await loadChat(chatId);
      if (!result) { setLoading(false); return; }
      if (activeMediaMapRef.current) revokeMediaUrls(activeMediaMapRef.current);
      const parsed = parseWhatsAppChat(result.rawText, result.outgoingSender, result.mediaMap);
      parsed.id = chatId;
      setBookmarks(await getBookmarks(chatId));
      setChat(parsed);
      setActiveChatId(chatId);
      setInitialSearchQuery(searchQuery || null);
      activeMediaMapRef.current = result.mediaMap;
    } catch { alert('Failed to load chat.'); }
    finally { setLoading(false); }
  }, []);

  const handleDeleteChat = useCallback(async (chatId: string) => {
    try {
      await deleteChat(chatId);
      setStoredChats(await listChats());
      if (activeChatId === chatId) {
        if (activeMediaMapRef.current) { revokeMediaUrls(activeMediaMapRef.current); activeMediaMapRef.current = undefined; }
        setChat(null); setActiveChatId(null); setBookmarks(new Set());
      }
    } catch { alert('Failed to delete chat.'); }
  }, [activeChatId]);

  const loadSampleData = useCallback(() => {
    if (activeMediaMapRef.current) { revokeMediaUrls(activeMediaMapRef.current); activeMediaMapRef.current = undefined; }
    setChat({ ...sampleChat, id: '__sample__' });
    setActiveChatId('__sample__');
    setBookmarks(new Set());
  }, []);

  const handleBackToList = useCallback(() => {
    if (activeMediaMapRef.current) { revokeMediaUrls(activeMediaMapRef.current); activeMediaMapRef.current = undefined; }
    setChat(null); setActiveChatId(null); setBookmarks(new Set());
  }, []);

  const handleToggleBookmark = useCallback(async (messageId: string) => {
    if (!activeChatId || activeChatId === '__sample__') {
      setBookmarks((prev) => { const n = new Set(prev); if (n.has(messageId)) n.delete(messageId); else n.add(messageId); return n; });
      return;
    }
    try {
      const isB = bookmarks.has(messageId);
      if (isB) await removeBookmark(activeChatId, messageId); else await addBookmark(activeChatId, messageId);
      setBookmarks((prev) => { const n = new Set(prev); if (isB) n.delete(messageId); else n.add(messageId); return n; });
    } catch { /* silent */ }
  }, [activeChatId, bookmarks]);

  if (loading) {
    return (
      <main className="flex flex-col h-screen bg-[var(--wa-page-bg)] items-center justify-center">
        <div className="w-10 h-10 border-3 border-[var(--wa-accent)] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="flex flex-col h-screen bg-[var(--wa-page-bg)]">
      <div className="hidden md:block h-[127px] bg-[var(--wa-top-bar)] shrink-0" />

      <div className="flex-1 flex flex-col md:relative md:-mt-[87px] md:mx-auto md:w-full md:max-w-[1600px] md:shadow-2xl md:rounded-t-sm overflow-hidden min-h-0">
        {chat ? (
          <ErrorBoundary onReset={handleBackToList}>
            <ChatView
              chat={chat}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
              onUploadClick={handleBackToList}
              onBackToList={storedChats.length > 0 || dbAvailable ? handleBackToList : undefined}
              initialSearchQuery={initialSearchQuery}
            />
          </ErrorBoundary>
        ) : pendingText ? null : (
          <ChatList
            chats={storedChats}
            onLoadChat={handleLoadStoredChat}
            onDeleteChat={handleDeleteChat}
            onFileLoaded={handleFileLoaded}
            onLoadSample={loadSampleData}
          />
        )}
      </div>

      {pendingText && pendingParticipants.length > 0 && (
        <SenderPicker participants={pendingParticipants} onSelect={handleSenderSelected} />
      )}

      <ThemeToggle />
    </main>
  );
}
