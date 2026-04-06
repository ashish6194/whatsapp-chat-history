'use client';

import { Chat } from '@/lib/types';
import { getInitials } from '@/lib/utils';

interface ChatHeaderProps {
  chat: Chat;
  onSearchToggle: () => void;
  onUploadClick: () => void;
  searchOpen: boolean;
  onExportPDF?: () => void;
  exporting?: boolean;
  onStatsToggle?: () => void;
  onBookmarksToggle?: () => void;
  bookmarksOpen?: boolean;
  bookmarkCount?: number;
  onBackToList?: () => void;
}

export default function ChatHeader({ chat, onSearchToggle, onUploadClick, searchOpen, onExportPDF, exporting, onStatsToggle, onBookmarksToggle, bookmarksOpen, bookmarkCount = 0, onBackToList }: ChatHeaderProps) {
  return (
    <header className="bg-[var(--wa-header)] text-[var(--wa-header-text)] flex items-center px-4 py-2 gap-3 shrink-0 md:border-b md:border-[var(--wa-border)]">
      {/* Back button */}
      {onBackToList && (
        <button onClick={onBackToList} aria-label="Back to chat list" className="p-1.5 -ml-1 rounded-full hover:bg-white/10 dark:hover:bg-white/5 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      )}

      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-[#dfe5e7] dark:bg-[#2a3942] flex items-center justify-center text-[#075e54] dark:text-[#e9edef] font-semibold text-sm shrink-0" aria-hidden="true">
        {getInitials(chat.name)}
      </div>

      {/* Chat info */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-medium truncate md:text-[#111b21]">{chat.name}</h1>
        <p className="text-xs opacity-80 truncate md:text-[#667781]">
          {chat.participants.join(', ')}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Bookmarks */}
        {onBookmarksToggle && (
          <button onClick={onBookmarksToggle} aria-label={`Bookmarks (${bookmarkCount})`} aria-expanded={bookmarksOpen}
            className={`p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/5 transition-colors relative ${bookmarksOpen ? 'bg-white/20' : ''}`}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill={bookmarkCount > 0 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            {bookmarkCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[var(--wa-accent)] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">{bookmarkCount > 9 ? '9+' : bookmarkCount}</span>
            )}
          </button>
        )}

        {/* Stats */}
        {onStatsToggle && (
          <button
            onClick={onStatsToggle}
            aria-label="Chat analytics"
            className="p-2 rounded-full hover:bg-white/10 md:hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 md:focus:ring-[#00a884]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>
        )}

        <button
          onClick={onSearchToggle}
          aria-label="Search messages"
          aria-expanded={searchOpen}
          className={`p-2 rounded-full hover:bg-white/10 md:hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 md:focus:ring-[#00a884] ${
            searchOpen ? 'bg-white/20 md:bg-black/10' : ''
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        {/* Export PDF */}
        {onExportPDF && (
          <button
            onClick={onExportPDF}
            disabled={exporting}
            aria-label="Export chat as PDF"
            className="p-2 rounded-full hover:bg-white/10 md:hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 md:focus:ring-[#00a884] disabled:opacity-50"
          >
            {exporting ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )}
          </button>
        )}

        <button
          onClick={onUploadClick}
          aria-label="Upload new chat file"
          className="p-2 rounded-full hover:bg-white/10 md:hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 md:focus:ring-[#00a884]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </button>
      </div>
    </header>
  );
}
