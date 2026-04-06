'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Message } from '@/lib/types';
import { isDBAvailable, listChats, loadChat, getBookmarks } from '@/lib/db';
import { parseWhatsAppChat } from '@/lib/parser';
import { formatTime, formatDate, getParticipantColor, getInitials } from '@/lib/utils';

interface BookmarkEntry {
  chatId: string; chatName: string; participants: string[]; message: Message;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isDBAvailable()) { setError('Browser storage is not available.'); setLoading(false); return; }
    (async () => {
      try {
        const chats = await listChats();
        const all: BookmarkEntry[] = [];
        for (const cs of chats) {
          const bmSet = await getBookmarks(cs.id);
          if (bmSet.size === 0) continue;
          const data = await loadChat(cs.id);
          if (!data) continue;
          const parsed = parseWhatsAppChat(data.rawText, data.outgoingSender, data.mediaMap);
          for (const msg of parsed.messages) {
            if (bmSet.has(msg.id)) all.push({ chatId: cs.id, chatName: cs.name, participants: cs.participants, message: msg });
          }
        }
        all.sort((a, b) => b.message.timestamp.getTime() - a.message.timestamp.getTime());
        setBookmarks(all);
      } catch { setError('Failed to load bookmarks.'); }
      finally { setLoading(false); }
    })();
  }, []);

  return (
    <main className="flex flex-col h-screen bg-[var(--wa-page-bg)]">
      <div className="hidden md:block h-[127px] bg-[var(--wa-top-bar)] shrink-0" />
      <div className="flex-1 flex flex-col md:relative md:-mt-[87px] md:mx-auto md:w-full md:max-w-[1600px] md:shadow-2xl md:rounded-t-sm overflow-hidden min-h-0">
        <div className="bg-[var(--wa-header)] text-[var(--wa-header-text)] px-4 py-3 shrink-0 flex items-center gap-3">
          <Link href="/" className="p-1.5 -ml-1 rounded-full hover:bg-white/10 transition-colors" aria-label="Back to chats">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <h1 className="text-lg font-medium">All Bookmarks</h1>
            <p className="text-xs opacity-70">{loading ? 'Loading...' : `${bookmarks.length} bookmarked message${bookmarks.length !== 1 ? 's' : ''}`}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-[var(--wa-bg)]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-8 h-8 border-3 border-[var(--wa-accent)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-[var(--wa-text-secondary)] bg-[var(--wa-sidebar-bg)] px-4 py-2 rounded-lg">{error}</p>
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <svg className="w-16 h-16 text-[var(--wa-text-secondary)] opacity-30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <p className="text-sm text-[var(--wa-text-secondary)]">No bookmarks yet</p>
              <p className="text-xs text-[var(--wa-text-secondary)]">Open a chat and tap the star on any message</p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto py-3 px-4 space-y-2">
              {bookmarks.map((entry, idx) => {
                const msg = entry.message;
                const prev = idx > 0 ? bookmarks[idx - 1] : null;
                const showHeader = !prev || prev.chatId !== entry.chatId;
                return (
                  <div key={`${entry.chatId}-${msg.id}`}>
                    {showHeader && (
                      <div className="flex items-center gap-2 mt-4 mb-2 first:mt-0">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0" style={{ backgroundColor: getParticipantColor(entry.chatName, entry.participants) }} aria-hidden="true">{getInitials(entry.chatName)}</div>
                        <span className="text-sm font-medium text-[var(--wa-text-primary)]">{entry.chatName}</span>
                      </div>
                    )}
                    <div className="bg-[var(--wa-sidebar-bg)] rounded-xl border border-[var(--wa-border)] px-4 py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium" style={{ color: getParticipantColor(msg.sender, entry.participants) }}>{msg.sender}</span>
                        <span className="text-[10px] text-[var(--wa-text-secondary)]">{formatDate(msg.timestamp)} &middot; {formatTime(msg.timestamp)}</span>
                        <svg className="w-3.5 h-3.5 text-[#f5c829] ml-auto shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </div>
                      <p className="text-[14px] text-[var(--wa-text-primary)] leading-relaxed whitespace-pre-wrap break-words">
                        {msg.type === 'media' ? `[${msg.mediaType || 'Media'}] ${msg.mediaFilename || ''}` : msg.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
