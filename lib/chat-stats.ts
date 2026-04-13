import { Chat, Message } from './types';

export interface ChatStatistics {
  totalMessages: number;
  totalDays: number;
  avgMessagesPerDay: number;
  mediaCount: number;
  messagesPerSender: { sender: string; count: number; percentage: number }[];
  hourlyActivity: number[]; // 24 entries, messages per hour (0-23)
  dailyActivity: { date: string; count: number }[]; // messages per day
  weekdayActivity: { day: string; count: number }[]; // Mon-Sun
  topEmojis: { emoji: string; count: number }[];
  longestMessage: { sender: string; length: number; preview: string };
  firstMessage: { date: string; sender: string };
  lastMessage: { date: string; sender: string };
  mediaPerType: { type: string; count: number }[];
  avgMessageLength: number;
  mostActiveDay: { date: string; count: number };
  mostActiveHour: { hour: number; count: number };
}

// Emoji regex (covers most common emoji ranges)
const EMOJI_REGEX = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{231A}-\u{231B}\u{23E9}-\u{23F3}\u{23F8}-\u{23FA}\u{25AA}-\u{25AB}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}]/gu;

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function computeChatStats(chat: Chat): ChatStatistics {
  const messages = chat.messages.filter((m) => m.type !== 'system');
  const allMessages = chat.messages;

  // Messages per sender
  const senderCounts = new Map<string, number>();
  for (const msg of messages) {
    senderCounts.set(msg.sender, (senderCounts.get(msg.sender) || 0) + 1);
  }
  const messagesPerSender = Array.from(senderCounts.entries())
    .map(([sender, count]) => ({
      sender,
      count,
      percentage: messages.length > 0 ? Math.round((count / messages.length) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  // Hourly activity
  const hourlyActivity = new Array(24).fill(0);
  for (const msg of messages) {
    hourlyActivity[msg.timestamp.getHours()]++;
  }

  // Daily activity
  const dailyCounts = new Map<string, number>();
  for (const msg of messages) {
    const key = msg.timestamp.toISOString().split('T')[0];
    dailyCounts.set(key, (dailyCounts.get(key) || 0) + 1);
  }
  const dailyActivity = Array.from(dailyCounts.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Weekday activity
  const weekdayCounts = new Array(7).fill(0);
  for (const msg of messages) {
    weekdayCounts[msg.timestamp.getDay()]++;
  }
  const weekdayActivity = WEEKDAYS.map((day, i) => ({ day, count: weekdayCounts[i] }));

  // Top emojis
  const emojiCounts = new Map<string, number>();
  for (const msg of messages) {
    if (msg.type === 'text') {
      const emojis = msg.content.match(EMOJI_REGEX);
      if (emojis) {
        for (const e of emojis) {
          emojiCounts.set(e, (emojiCounts.get(e) || 0) + 1);
        }
      }
    }
  }
  const topEmojis = Array.from(emojiCounts.entries())
    .map(([emoji, count]) => ({ emoji, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Longest message
  let longestMsg: Message = messages[0] || { sender: '', content: '', timestamp: new Date() } as Message;
  for (const msg of messages) {
    if (msg.type === 'text' && msg.content.length > longestMsg.content.length) {
      longestMsg = msg;
    }
  }

  // Media per type
  const mediaTypeCounts = new Map<string, number>();
  for (const msg of messages) {
    if (msg.type === 'media' && msg.mediaType) {
      mediaTypeCounts.set(msg.mediaType, (mediaTypeCounts.get(msg.mediaType) || 0) + 1);
    }
  }
  const mediaPerType = Array.from(mediaTypeCounts.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);

  // Average message length
  const textMessages = messages.filter((m) => m.type === 'text');
  const avgMessageLength = textMessages.length > 0
    ? Math.round(textMessages.reduce((sum, m) => sum + m.content.length, 0) / textMessages.length)
    : 0;

  // Date range
  const firstMsg = allMessages[0];
  const lastMsg = allMessages[allMessages.length - 1];
  const firstDate = firstMsg?.timestamp || new Date();
  const lastDate = lastMsg?.timestamp || new Date();
  const totalDays = Math.max(1, Math.ceil((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)) + 1);

  // Most active day
  const mostActiveDay = dailyActivity.length > 0
    ? dailyActivity.reduce((max, d) => d.count > max.count ? d : max, dailyActivity[0])
    : { date: '', count: 0 };

  // Most active hour
  const maxHourVal = Math.max(...hourlyActivity);
  const maxHourIdx = maxHourVal > 0 ? hourlyActivity.indexOf(maxHourVal) : -1;

  return {
    totalMessages: messages.length,
    totalDays,
    avgMessagesPerDay: Math.round((messages.length / totalDays) * 10) / 10,
    mediaCount: messages.filter((m) => m.type === 'media').length,
    messagesPerSender,
    hourlyActivity,
    dailyActivity,
    weekdayActivity,
    topEmojis,
    longestMessage: {
      sender: longestMsg?.sender || '',
      length: longestMsg?.content?.length || 0,
      preview: longestMsg?.content?.slice(0, 100) || '',
    },
    firstMessage: {
      date: firstDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      sender: firstMsg?.sender || '',
    },
    lastMessage: {
      date: lastDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      sender: lastMsg?.sender || '',
    },
    mediaPerType,
    avgMessageLength,
    mostActiveDay,
    mostActiveHour: { hour: maxHourIdx >= 0 ? maxHourIdx : 0, count: maxHourIdx >= 0 ? hourlyActivity[maxHourIdx] : 0 },
  };
}

export function formatHour(hour: number): string {
  if (hour === 0) return '12 AM';
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return '12 PM';
  return `${hour - 12} PM`;
}
