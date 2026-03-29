'use client';

import { useEffect, useRef, useCallback } from 'react';
import { getInitials, getParticipantColor } from '@/lib/utils';

interface SenderPickerProps {
  participants: string[];
  onSelect: (sender: string) => void;
}

export default function SenderPicker({ participants, onSelect }: SenderPickerProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  // Focus first button on mount
  useEffect(() => {
    firstButtonRef.current?.focus();
  }, []);

  // Trap focus inside modal
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') return; // No close — must pick a sender

    if (e.key === 'Tab') {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>('button');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sender-picker-title"
      aria-describedby="sender-picker-desc"
      onKeyDown={handleKeyDown}
    >
      <div ref={dialogRef} className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl">
        <h2 id="sender-picker-title" className="text-lg font-medium text-[#111b21] mb-1">Who are you?</h2>
        <p id="sender-picker-desc" className="text-sm text-[#667781] mb-5">
          Select your name to show your messages on the right side
        </p>
        <div className="space-y-2" role="listbox" aria-label="Select your name">
          {participants.map((p, i) => (
            <button
              key={p}
              ref={i === 0 ? firstButtonRef : undefined}
              role="option"
              aria-selected={false}
              onClick={() => onSelect(p)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f0f2f5] focus:bg-[#f0f2f5] focus:outline-none focus:ring-2 focus:ring-[#00a884] transition-colors text-left"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm shrink-0"
                style={{ backgroundColor: getParticipantColor(p, participants) }}
                aria-hidden="true"
              >
                {getInitials(p)}
              </div>
              <span className="text-[#111b21] text-sm font-medium">{p}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
