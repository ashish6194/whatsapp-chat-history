'use client';

import { useMemo } from 'react';
import { Chat } from '@/lib/types';
import { computeChatStats, formatHour } from '@/lib/chat-stats';
import { getParticipantColor } from '@/lib/utils';

interface ChatStatsProps {
  chat: Chat;
  onClose: () => void;
}

function BarChart({ data, maxValue, color }: { data: { label: string; value: number }[]; maxValue: number; color?: string }) {
  return (
    <div className="space-y-1.5">
      {data.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className="text-[10px] text-[var(--wa-text-secondary)] w-8 text-right shrink-0">{item.label}</span>
          <div className="flex-1 bg-[var(--wa-input-bg)] rounded-full h-4 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: maxValue > 0 ? `${(item.value / maxValue) * 100}%` : '0%',
                backgroundColor: color || '#00a884',
                minWidth: item.value > 0 ? '4px' : '0',
              }}
            />
          </div>
          <span className="text-[10px] text-[var(--wa-text-secondary)] w-6 shrink-0">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function ChatStats({ chat, onClose }: ChatStatsProps) {
  const stats = useMemo(() => computeChatStats(chat), [chat]);

  const hourlyData = stats.hourlyActivity.map((count, i) => ({
    label: formatHour(i).replace(' ', ''),
    value: count,
  }));
  const maxHourly = Math.max(...stats.hourlyActivity);

  const weekdayData = stats.weekdayActivity.map((d) => ({
    label: d.day.slice(0, 3),
    value: d.count,
  }));
  const maxWeekday = Math.max(...stats.weekdayActivity.map((d) => d.count));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-[var(--wa-bg)] rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Chat statistics"
      >
        {/* Header */}
        <div className="bg-[var(--wa-header)] text-white px-5 py-4 rounded-t-2xl flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-lg font-semibold">Chat Analytics</h2>
            <p className="text-xs text-white/70">{chat.name}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-[var(--wa-sidebar-bg)]/10 rounded-full" aria-label="Close analytics">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Overview cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Messages', value: stats.totalMessages.toLocaleString(), icon: '💬' },
              { label: 'Days', value: stats.totalDays.toLocaleString(), icon: '📅' },
              { label: 'Avg/Day', value: String(stats.avgMessagesPerDay), icon: '📊' },
              { label: 'Media', value: stats.mediaCount.toLocaleString(), icon: '📸' },
            ].map((card) => (
              <div key={card.label} className="bg-[var(--wa-sidebar-bg)] rounded-xl p-3 text-center shadow-sm">
                <span className="text-xl">{card.icon}</span>
                <p className="text-xl font-bold text-[var(--wa-text-primary)] mt-1">{card.value}</p>
                <p className="text-[10px] text-[var(--wa-text-secondary)] uppercase tracking-wide">{card.label}</p>
              </div>
            ))}
          </div>

          {/* Messages per sender */}
          <div className="bg-[var(--wa-sidebar-bg)] rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-[var(--wa-text-primary)] mb-3">Messages per Person</h3>
            <div className="space-y-2.5">
              {stats.messagesPerSender.map((s) => (
                <div key={s.sender} className="flex items-center gap-2">
                  <span className="text-xs text-[var(--wa-text-primary)] w-16 truncate shrink-0 font-medium">{s.sender}</span>
                  <div className="flex-1 bg-[var(--wa-input-bg)] rounded-full h-5 overflow-hidden">
                    <div
                      className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-300"
                      style={{
                        width: `${s.percentage}%`,
                        backgroundColor: getParticipantColor(s.sender, chat.participants),
                        minWidth: '20px',
                      }}
                    >
                      <span className="text-[10px] text-white font-medium">{s.percentage}%</span>
                    </div>
                  </div>
                  <span className="text-xs text-[var(--wa-text-secondary)] w-10 text-right shrink-0">{s.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hourly activity */}
          <div className="bg-[var(--wa-sidebar-bg)] rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-[var(--wa-text-primary)] mb-1">Activity by Hour</h3>
            <p className="text-[10px] text-[var(--wa-text-secondary)] mb-3">
              Most active: <strong className="text-[var(--wa-text-primary)]">{formatHour(stats.mostActiveHour.hour)}</strong> ({stats.mostActiveHour.count} messages)
            </p>
            <div className="flex items-end gap-[2px] h-20">
              {hourlyData.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5" title={`${h.label}: ${h.value} messages`}>
                  <div
                    className="w-full rounded-t transition-all duration-300"
                    style={{
                      height: maxHourly > 0 ? `${(h.value / maxHourly) * 100}%` : '0%',
                      backgroundColor: i === stats.mostActiveHour.hour ? '#00a884' : '#d1d7db',
                      minHeight: h.value > 0 ? '2px' : '0',
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[8px] text-[var(--wa-text-secondary)]">12AM</span>
              <span className="text-[8px] text-[var(--wa-text-secondary)]">6AM</span>
              <span className="text-[8px] text-[var(--wa-text-secondary)]">12PM</span>
              <span className="text-[8px] text-[var(--wa-text-secondary)]">6PM</span>
              <span className="text-[8px] text-[var(--wa-text-secondary)]">11PM</span>
            </div>
          </div>

          {/* Weekday activity */}
          <div className="bg-[var(--wa-sidebar-bg)] rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-[var(--wa-text-primary)] mb-3">Activity by Day of Week</h3>
            <BarChart data={weekdayData} maxValue={maxWeekday} />
          </div>

          {/* Top emojis */}
          {stats.topEmojis.length > 0 && (
            <div className="bg-[var(--wa-sidebar-bg)] rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-[var(--wa-text-primary)] mb-3">Top Emojis</h3>
              <div className="flex flex-wrap gap-3">
                {stats.topEmojis.map((e, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-[var(--wa-input-bg)] rounded-full px-3 py-1.5">
                    <span className="text-lg">{e.emoji}</span>
                    <span className="text-xs text-[var(--wa-text-secondary)] font-medium">{e.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Media breakdown */}
          {stats.mediaPerType.length > 0 && (
            <div className="bg-[var(--wa-sidebar-bg)] rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-[var(--wa-text-primary)] mb-3">Media Breakdown</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {stats.mediaPerType.map((m) => (
                  <div key={m.type} className="bg-[var(--wa-input-bg)] rounded-lg p-2.5 text-center">
                    <p className="text-lg font-bold text-[var(--wa-text-primary)]">{m.count}</p>
                    <p className="text-[10px] text-[var(--wa-text-secondary)] capitalize">{m.type}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fun facts */}
          <div className="bg-[var(--wa-sidebar-bg)] rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-[var(--wa-text-primary)] mb-3">Fun Facts</h3>
            <div className="space-y-2 text-sm text-[var(--wa-text-secondary)]">
              <p>
                <span className="text-[var(--wa-text-primary)] font-medium">First message:</span>{' '}
                {stats.firstMessage.date} by {stats.firstMessage.sender}
              </p>
              <p>
                <span className="text-[var(--wa-text-primary)] font-medium">Latest message:</span>{' '}
                {stats.lastMessage.date} by {stats.lastMessage.sender}
              </p>
              <p>
                <span className="text-[var(--wa-text-primary)] font-medium">Average message length:</span>{' '}
                {stats.avgMessageLength} characters
              </p>
              {stats.mostActiveDay.date && (
                <p>
                  <span className="text-[var(--wa-text-primary)] font-medium">Most active day:</span>{' '}
                  {new Date(stats.mostActiveDay.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} ({stats.mostActiveDay.count} messages)
                </p>
              )}
              {stats.longestMessage.sender && (
                <p>
                  <span className="text-[var(--wa-text-primary)] font-medium">Longest message:</span>{' '}
                  {stats.longestMessage.length} chars by {stats.longestMessage.sender}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-[10px] text-[var(--wa-text-secondary)]">
            Generated by WhatsApp Chat Viewer
          </p>
        </div>
      </div>
    </div>
  );
}
