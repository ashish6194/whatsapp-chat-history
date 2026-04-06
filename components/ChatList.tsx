'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChatSummary } from '@/lib/types';
import { getInitials, getParticipantColor } from '@/lib/utils';
import { searchAllChats, addBookmark, removeBookmark, getBookmarks, type GlobalSearchResult } from '@/lib/db';
import FileUpload from './FileUpload';
import AdBanner from './AdBanner';

interface ChatListProps {
  chats: ChatSummary[];
  onLoadChat: (chatId: string, searchQuery?: string) => void;
  onDeleteChat: (chatId: string) => void;
  onFileLoaded: (text: string, mediaMap?: Map<string, string>, mediaBlobMap?: Map<string, Blob>) => void;
  onLoadSample: () => void;
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return <>{text.slice(0, idx)}<mark className="bg-[#f5c829]/30 text-[var(--wa-text-primary)] rounded-sm px-0.5">{text.slice(idx, idx + query.length)}</mark>{text.slice(idx + query.length)}</>;
}

export default function ChatList({ chats, onLoadChat, onDeleteChat, onFileLoaded, onLoadSample }: ChatListProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GlobalSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchBookmarks, setSearchBookmarks] = useState<Map<string, Set<string>>>(new Map()); // chatId -> Set<messageId>
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!searchQuery || searchQuery.length < 2) { setSearchResults([]); setSearching(false); return; }
    setSearching(true);
    debounceRef.current = setTimeout(() => {
      searchAllChats(searchQuery).then(async (r) => {
        setSearchResults(r);
        // Load bookmarks for all chats in results
        const chatIds = [...new Set(r.map((x) => x.chatId))];
        const bmMap = new Map<string, Set<string>>();
        for (const cid of chatIds) {
          try { bmMap.set(cid, await getBookmarks(cid)); } catch { /* ignore */ }
        }
        setSearchBookmarks(bmMap);
        setSearching(false);
      });
    }, 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchQuery]);

  if (chats.length === 0) {
    return (
      <div className="flex flex-col flex-1">
        <AdBanner format="horizontal" slot="7984254267" className="bg-[var(--wa-bg)] pt-4 px-4" />
        <FileUpload onFileLoaded={onFileLoaded} />
        <div className="bg-[var(--wa-bg)] pb-4 text-center">
          <button onClick={onLoadSample} className="text-sm text-[var(--wa-accent)] hover:underline font-medium">Or load sample chat data to explore</button>
        </div>
        <AdBanner format="horizontal" slot="7984254267" className="bg-[var(--wa-bg)] pb-4 px-4" />
        <div className="bg-[var(--wa-bg)] pb-6 text-center flex justify-center gap-4">
          <a href="/privacy" className="text-xs text-[var(--wa-text-secondary)] hover:text-[var(--wa-accent)] hover:underline">Privacy Policy</a>
          <span className="text-xs text-[var(--wa-text-secondary)]">&middot;</span>
          <a href="/terms" className="text-xs text-[var(--wa-text-secondary)] hover:text-[var(--wa-accent)] hover:underline">Terms of Service</a>
        </div>
      </div>
    );
  }

  const isSearching = searchQuery.length >= 2;

  return (
    <div className="flex flex-col flex-1 bg-[var(--wa-bg)] overflow-y-auto">
      <div className="bg-[var(--wa-header)] text-[var(--wa-header-text)] px-4 py-3 shrink-0">
        <h1 className="text-lg font-medium">Your Chats</h1>
        <p className="text-xs opacity-70">{chats.length} saved chat{chats.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Global search */}
      <div className="px-4 pt-3">
        <div className="relative">
          <svg className="w-4 h-4 text-[var(--wa-text-secondary)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search across all chats..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--wa-sidebar-bg)] rounded-full pl-10 pr-10 py-2.5 text-sm text-[var(--wa-text-primary)] placeholder:text-[var(--wa-text-secondary)] outline-none focus:ring-2 focus:ring-[var(--wa-accent)] border border-[var(--wa-border)]" aria-label="Search across all chats" />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-full" aria-label="Clear search">
              <svg className="w-4 h-4 text-[var(--wa-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Search results */}
      {isSearching && (
        <div className="px-4 pt-3 flex-1">
          {searching ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-[var(--wa-accent)] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-[var(--wa-text-secondary)] ml-2">Searching...</span>
            </div>
          ) : searchResults.length === 0 ? (
            <p className="text-center py-8 text-sm text-[var(--wa-text-secondary)]">No messages found for &ldquo;{searchQuery}&rdquo;</p>
          ) : (
            <div className="space-y-1.5">
              <p className="text-xs text-[var(--wa-text-secondary)] mb-2">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''}</p>
              {searchResults.map((r, i) => {
                const isBookmarked = searchBookmarks.get(r.chatId)?.has(r.messageId) || false;
                return (
                  <div key={`${r.chatId}-${r.messageId}-${i}`} className="bg-[var(--wa-sidebar-bg)] rounded-xl border border-[var(--wa-border)] overflow-hidden flex">
                    <button onClick={() => onLoadChat(r.chatId, searchQuery)}
                      className="flex-1 px-4 py-3 hover:bg-[var(--wa-input-bg)] transition-colors text-left min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-medium shrink-0" style={{ backgroundColor: getParticipantColor(r.chatName, r.participants) }} aria-hidden="true">{getInitials(r.chatName)}</div>
                        <span className="text-xs font-medium text-[var(--wa-text-primary)]">{r.chatName}</span>
                        <span className="text-[10px] text-[var(--wa-text-secondary)]">&middot;</span>
                        <span className="text-xs font-medium" style={{ color: getParticipantColor(r.sender, r.participants) }}>{r.sender}</span>
                        {r.timestamp && <span className="text-[10px] text-[var(--wa-text-secondary)] ml-auto">{r.timestamp}</span>}
                      </div>
                      <p className="text-sm text-[var(--wa-text-primary)] truncate">{highlightMatch(r.content, searchQuery)}</p>
                    </button>
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        try {
                          if (isBookmarked) {
                            await removeBookmark(r.chatId, r.messageId);
                          } else {
                            await addBookmark(r.chatId, r.messageId);
                          }
                          setSearchBookmarks((prev) => {
                            const next = new Map(prev);
                            const set = new Set(next.get(r.chatId) || []);
                            if (isBookmarked) set.delete(r.messageId); else set.add(r.messageId);
                            next.set(r.chatId, set);
                            return next;
                          });
                        } catch { /* silent */ }
                      }}
                      className="px-3 flex items-center hover:bg-[var(--wa-input-bg)] transition-colors border-l border-[var(--wa-border)]"
                      aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this message'}
                    >
                      <svg className={`w-5 h-5 ${isBookmarked ? 'text-[#f5c829]' : 'text-[var(--wa-text-secondary)] opacity-40 hover:opacity-100'}`} viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Normal list */}
      {!isSearching && (
        <>
          <div className="px-4 pt-3">
            <label className="flex items-center gap-2 bg-[var(--wa-sidebar-bg)] rounded-xl px-4 py-3 cursor-pointer hover:bg-[var(--wa-input-bg)] transition-colors border border-[var(--wa-border)]">
              <svg className="w-5 h-5 text-[var(--wa-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm text-[var(--wa-text-primary)] font-medium">Upload new chat</span>
              <input type="file" accept=".txt,.zip" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0]; if (!file) return;
                if (!file.name.endsWith('.zip')) {
                  const reader = new FileReader();
                  reader.onload = (ev) => { const t = ev.target?.result as string; if (t) onFileLoaded(t); };
                  reader.readAsText(file);
                } else {
                  import('@/lib/zip-handler').then(({ extractWhatsAppZip }) => {
                    extractWhatsAppZip(file).then(({ chatText, mediaMap, mediaBlobMap }) => onFileLoaded(chatText, mediaMap, mediaBlobMap));
                  });
                }
              }} />
            </label>
          </div>

          {chats.some((c) => c.bookmarkCount > 0) && (
            <div className="px-4 pt-2">
              <Link href="/bookmarks" className="flex items-center gap-2 bg-[var(--wa-sidebar-bg)] rounded-xl px-4 py-3 hover:bg-[var(--wa-input-bg)] transition-colors border border-[var(--wa-border)]">
                <svg className="w-5 h-5 text-[#f5c829]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span className="text-sm text-[var(--wa-text-primary)] font-medium">View all bookmarks</span>
                <span className="text-xs text-[var(--wa-text-secondary)] ml-auto">{chats.reduce((s, c) => s + c.bookmarkCount, 0)}</span>
              </Link>
            </div>
          )}

          <div className="px-4 py-3 space-y-2 flex-1">
            {chats.map((chat) => (
              <div key={chat.id} className="bg-[var(--wa-sidebar-bg)] rounded-xl overflow-hidden border border-[var(--wa-border)]">
                <button onClick={() => onLoadChat(chat.id)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--wa-input-bg)] transition-colors text-left">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0" style={{ backgroundColor: getParticipantColor(chat.name, chat.participants) }} aria-hidden="true">{getInitials(chat.name)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] text-[var(--wa-text-primary)] font-medium truncate">{chat.name}</p>
                    <p className="text-xs text-[var(--wa-text-secondary)] truncate">{chat.participants.join(', ')}</p>
                    <p className="text-xs text-[var(--wa-text-secondary)] mt-0.5">
                      {chat.messageCount} messages
                      {chat.bookmarkCount > 0 && <span className="text-[#f5c829]"> &middot; &#9733; {chat.bookmarkCount}</span>}
                      {' '}&middot; {new Date(chat.firstMessageDate).toLocaleDateString()} — {new Date(chat.lastMessageDate).toLocaleDateString()}
                    </p>
                  </div>
                </button>
                <div className="border-t border-[var(--wa-border)] px-4 py-2 flex justify-between items-center">
                  <span className="text-xs text-[var(--wa-text-secondary)]">Saved {new Date(chat.createdAt).toLocaleDateString()}</span>
                  {deleteConfirm === chat.id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-red-600">Delete?</span>
                      <button onClick={() => { onDeleteChat(chat.id); setDeleteConfirm(null); }} className="text-xs text-red-600 font-medium hover:underline">Yes</button>
                      <button onClick={() => setDeleteConfirm(null)} className="text-xs text-[var(--wa-text-secondary)] hover:underline">No</button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirm(chat.id)} className="text-xs text-[var(--wa-text-secondary)] hover:text-red-600 transition-colors" aria-label={`Delete ${chat.name}`}>Delete</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 pb-4 text-center space-y-2 shrink-0">
            <button onClick={onLoadSample} className="text-sm text-[var(--wa-accent)] hover:underline font-medium">Load sample chat data</button>
            <div className="flex justify-center gap-4">
              <a href="/privacy" className="text-xs text-[var(--wa-text-secondary)] hover:text-[var(--wa-accent)] hover:underline">Privacy Policy</a>
              <span className="text-xs text-[var(--wa-text-secondary)]">&middot;</span>
              <a href="/terms" className="text-xs text-[var(--wa-text-secondary)] hover:text-[var(--wa-accent)] hover:underline">Terms of Service</a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
