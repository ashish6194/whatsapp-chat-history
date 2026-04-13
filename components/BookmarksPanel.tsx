'use client';

import { Message } from '@/lib/types';
import { formatTime, formatDate, getParticipantColor } from '@/lib/utils';

interface BookmarksPanelProps {
  messages: Message[];
  bookmarks: Set<string>;
  participants: string[];
  onScrollTo: (messageId: string) => void;
  onClose: () => void;
}

export default function BookmarksPanel({ messages, bookmarks, participants, onScrollTo, onClose }: BookmarksPanelProps) {
  const bookmarkedMessages = messages.filter((m) => bookmarks.has(m.id));

  return (
    <div className="bg-[var(--wa-search-bg)] border-b border-[var(--wa-border)] shrink-0 max-h-[300px] overflow-y-auto">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--wa-border)] sticky top-0 bg-[var(--wa-search-bg)] z-10">
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full" aria-label="Close bookmarks">
            <svg className="w-5 h-5 text-[var(--wa-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h3 className="text-sm font-medium text-[var(--wa-text-primary)]">Bookmarks ({bookmarkedMessages.length})</h3>
        </div>
      </div>

      {bookmarkedMessages.length === 0 ? (
        <div className="px-4 py-6 text-center" role="status">
          <p className="text-sm text-[var(--wa-text-secondary)]">No bookmarked messages yet</p>
          <p className="text-xs text-[var(--wa-text-secondary)] mt-1">Hover over a message and click the star to bookmark it</p>
        </div>
      ) : (
        <div className="divide-y divide-[var(--wa-border)]">
          {bookmarkedMessages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => { onScrollTo(msg.id); onClose(); }}
              className="w-full px-4 py-2.5 hover:bg-[var(--wa-input-bg)] transition-colors text-left flex gap-2"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium" style={{ color: getParticipantColor(msg.sender, participants) }}>{msg.sender}</span>
                  <span className="text-[10px] text-[var(--wa-text-secondary)]">{formatDate(msg.timestamp)} &middot; {formatTime(msg.timestamp)}</span>
                </div>
                <p className="text-sm text-[var(--wa-text-primary)] truncate mt-0.5">
                  {msg.type === 'media' ? `[${msg.mediaType || 'Media'}]` : msg.content}
                </p>
              </div>
              <svg className="w-4 h-4 text-[#f5c829] shrink-0 mt-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
