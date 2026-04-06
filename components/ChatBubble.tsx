'use client';

import { memo } from 'react';
import { Message } from '@/lib/types';
import { formatTime, getParticipantColor } from '@/lib/utils';
import MediaDisplay from './MediaDisplay';

interface ChatBubbleProps {
  message: Message;
  isGroup: boolean;
  participants: string[];
  showSender: boolean;
}

const ChatBubble = memo(function ChatBubble({ message, isGroup, participants, showSender }: ChatBubbleProps) {
  if (message.type === 'system') {
    return (
      <div className="flex justify-center my-1" role="status">
        <span className="bg-[#e2d6ba]/60 text-[#54656f] text-[11px] px-3 py-1 rounded-lg text-center max-w-[85%] leading-relaxed">
          {message.content}
        </span>
      </div>
    );
  }

  const isOut = message.isOutgoing;

  return (
    <div className={`flex ${isOut ? 'justify-end' : 'justify-start'} mb-[2px] px-[5%] md:px-[8%]`} aria-label={`${message.sender}, ${formatTime(message.timestamp)}`}>
      <div
        className={`relative rounded-lg shadow-sm ${
          message.mediaUrl
            ? 'max-w-[280px] px-1 pt-1 pb-1'
            : 'max-w-[75%] md:max-w-[65%] px-2 py-1'
        } ${
          isOut
            ? 'bg-[var(--wa-bubble-out)] rounded-tr-none'
            : 'bg-[var(--wa-bubble-in)] rounded-tl-none'
        }`}
      >
        {/* Bubble tail */}
        <div
          className={`absolute top-0 w-2 h-3 ${
            isOut
              ? '-right-2 text-[var(--wa-bubble-out)]'
              : '-left-2 text-[var(--wa-bubble-in)]'
          }`}
        >
          <svg viewBox="0 0 8 13" width="8" height="13" aria-hidden="true">
            {isOut ? (
              <path fill="currentColor" d="M1 0L0 0C0 0 0.7 3.3 3 6.2C5.2 9 8 13 8 13V0H1Z" />
            ) : (
              <path fill="currentColor" d="M7 0L8 0C8 0 7.3 3.3 5 6.2C2.8 9 0 13 0 13V0H7Z" />
            )}
          </svg>
        </div>

        {/* Sender name */}
        {isGroup && showSender && !isOut && (
          <p
            className="text-[12.5px] font-medium mb-0.5 leading-tight"
            style={{ color: getParticipantColor(message.sender, participants) }}
          >
            {message.sender}
          </p>
        )}

        {/* Content */}
        {message.type === 'media' && message.mediaType && (
          <MediaDisplay
            mediaType={message.mediaType}
            mediaUrl={message.mediaUrl}
            mediaFilename={message.mediaFilename}
          />
        )}
        {message.content && !message.content.startsWith('<Media omitted>') && !message.mediaUrl && (
          <p className="text-[14.2px] leading-[19px] text-[var(--wa-text-primary)] whitespace-pre-wrap break-words">
            {message.content}
          </p>
        )}

        {/* Timestamp + ticks */}
        <div className="flex justify-end items-center gap-1 -mb-0.5 mt-0.5">
          <span className="text-[11px] text-[var(--wa-text-secondary)] leading-none">
            {formatTime(message.timestamp)}
          </span>
          {isOut && (
            <svg viewBox="0 0 16 11" width="16" height="11" className="text-[#53bdeb]" aria-hidden="true">
              <path
                fill="currentColor"
                d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 0 0-.336-.153.457.457 0 0 0-.344.153l-.311.324a.515.515 0 0 0-.142.363.524.524 0 0 0 .142.374l2.963 3.085c.093.097.196.145.306.145a.48.48 0 0 0 .381-.178l6.818-8.412a.513.513 0 0 0 .134-.36.512.512 0 0 0-.134-.363l-.591-.595z"
              />
              <path
                fill="currentColor"
                d="M15.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.2-1.25-.313.325 1.855 1.934c.093.097.196.145.306.145a.48.48 0 0 0 .381-.178l6.818-8.412a.513.513 0 0 0 .134-.36.512.512 0 0 0-.134-.363l-.591-.595z"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
});

export default ChatBubble;
