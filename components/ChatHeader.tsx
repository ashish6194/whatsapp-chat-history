'use client';

import { Chat } from '@/lib/types';
import { getInitials } from '@/lib/utils';

interface ChatHeaderProps {
  chat: Chat;
  onSearchToggle: () => void;
  onUploadClick: () => void;
  searchOpen: boolean;
}

export default function ChatHeader({ chat, onSearchToggle, onUploadClick, searchOpen }: ChatHeaderProps) {
  return (
    <header className="bg-[#075e54] text-white flex items-center px-4 py-2 gap-3 shrink-0 md:bg-[#f0f2f5] md:text-[#111b21] md:border-b md:border-[#e9edef]">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-[#dfe5e7] flex items-center justify-center text-[#075e54] font-semibold text-sm shrink-0 md:bg-[#075e54] md:text-white" aria-hidden="true">
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
      <div className="flex items-center gap-2">
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
