'use client';

import { Chat } from '@/lib/types';
import { getInitials, getParticipantColor } from '@/lib/utils';
import AdBanner from './AdBanner';

interface SidebarProps {
  chat: Chat;
}

export default function Sidebar({ chat }: SidebarProps) {
  const messageCounts = chat.participants.reduce<Record<string, number>>((acc, p) => {
    acc[p] = chat.messages.filter((m) => m.sender === p).length;
    return acc;
  }, {});

  const firstDate = chat.messages[0]?.timestamp;
  const lastDate = chat.messages[chat.messages.length - 1]?.timestamp;

  return (
    <aside className="hidden lg:flex flex-col w-[320px] bg-[var(--wa-sidebar-bg)] border-l border-[var(--wa-border)] shrink-0" role="complementary" aria-label="Chat information">
      {/* Header */}
      <div className="bg-[#f0f2f5] px-6 py-4 border-b border-[var(--wa-border)]">
        <h2 className="text-[var(--wa-text-primary)] font-medium">Chat Info</h2>
      </div>

      {/* Chat avatar & name */}
      <div className="flex flex-col items-center py-6 border-b border-[var(--wa-border)]">
        <div className="w-20 h-20 rounded-full bg-[#075e54] flex items-center justify-center text-white text-2xl font-semibold mb-3">
          {getInitials(chat.name)}
        </div>
        <h3 className="text-[var(--wa-text-primary)] text-lg font-medium">{chat.name}</h3>
        <p className="text-[var(--wa-text-secondary)] text-sm">{chat.isGroup ? 'Group' : 'Chat'} &middot; {chat.participants.length} participants</p>
      </div>

      {/* Stats */}
      <div className="px-6 py-4 border-b border-[var(--wa-border)]">
        <h4 className="text-[#008069] text-xs font-medium mb-3 uppercase tracking-wide">Overview</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-[var(--wa-text-primary)]">
            <span>Total messages</span>
            <span className="font-medium">{chat.messages.length}</span>
          </div>
          {firstDate && (
            <div className="flex justify-between text-[var(--wa-text-primary)]">
              <span>First message</span>
              <span className="text-[var(--wa-text-secondary)]">{firstDate.toLocaleDateString()}</span>
            </div>
          )}
          {lastDate && (
            <div className="flex justify-between text-[var(--wa-text-primary)]">
              <span>Last message</span>
              <span className="text-[var(--wa-text-secondary)]">{lastDate.toLocaleDateString()}</span>
            </div>
          )}
          <div className="flex justify-between text-[var(--wa-text-primary)]">
            <span>Media messages</span>
            <span className="font-medium">{chat.messages.filter((m) => m.type === 'media').length}</span>
          </div>
        </div>
      </div>

      {/* Participants */}
      <div className="px-6 py-4 flex-1 overflow-y-auto">
        <h4 className="text-[#008069] text-xs font-medium mb-3 uppercase tracking-wide">
          {chat.participants.length} Participants
        </h4>
        <div className="space-y-3">
          {chat.participants.map((p) => (
            <div key={p} className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0"
                style={{ backgroundColor: getParticipantColor(p, chat.participants) }}
              >
                {getInitials(p)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--wa-text-primary)] truncate">{p}</p>
                <p className="text-xs text-[var(--wa-text-secondary)]">{messageCounts[p]} messages</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar ad */}
      <div className="px-3 py-4 border-t border-[var(--wa-border)] shrink-0">
        <AdBanner format="rectangle" slot="6671172592" />
      </div>
    </aside>
  );
}
