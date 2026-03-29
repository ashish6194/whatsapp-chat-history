import { Chat, Message, MessageType, MediaType } from './types';

// Format 1: [DD/MM/YY, HH:MM:SS] Sender: Message
const FORMAT_1 = /^\[(\d{1,2}\/\d{1,2}\/\d{2,4}),\s(\d{1,2}:\d{2}(?::\d{2})?)\]\s(.+?):\s([\s\S]*)$/;

// Format 2: DD/MM/YYYY, HH:MM - Sender: Message
const FORMAT_2 = /^(\d{1,2}\/\d{1,2}\/\d{2,4}),\s(\d{1,2}:\d{2}(?:\s?[APap][Mm])?)\s-\s(.+?):\s([\s\S]*)$/;

// System message formats (no sender)
const SYSTEM_FORMAT_1 = /^\[(\d{1,2}\/\d{1,2}\/\d{2,4}),\s(\d{1,2}:\d{2}(?::\d{2})?)\]\s(.+)$/;
const SYSTEM_FORMAT_2 = /^(\d{1,2}\/\d{1,2}\/\d{2,4}),\s(\d{1,2}:\d{2}(?:\s?[APap][Mm])?)\s-\s(.+)$/;

const MEDIA_PATTERNS: { pattern: RegExp; type: MediaType }[] = [
  { pattern: /<Media omitted>/i, type: 'unknown' },
  { pattern: /\.(jpg|jpeg|png|gif|webp)\s*\(file attached\)/i, type: 'image' },
  { pattern: /\.(mp4|mov|avi|mkv|3gp)\s*\(file attached\)/i, type: 'video' },
  { pattern: /\.(mp3|ogg|opus|m4a|aac)\s*\(file attached\)/i, type: 'audio' },
  { pattern: /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|zip)\s*\(file attached\)/i, type: 'document' },
  { pattern: /\.(webp)\s*\(file attached\)/i, type: 'sticker' },
  { pattern: /image omitted/i, type: 'image' },
  { pattern: /video omitted/i, type: 'video' },
  { pattern: /audio omitted/i, type: 'audio' },
  { pattern: /sticker omitted/i, type: 'sticker' },
  { pattern: /document omitted/i, type: 'document' },
  { pattern: /GIF omitted/i, type: 'image' },
];

const SYSTEM_KEYWORDS = [
  'Messages and calls are end-to-end encrypted',
  'created group',
  'added',
  'removed',
  'left',
  'changed the subject',
  'changed this group',
  'changed the group description',
  'changed their phone number',
  'deleted this message',
  'This message was deleted',
  "You're now an admin",
  'security code changed',
  'joined using this group',
  'changed to',
];

function parseDate(dateStr: string, timeStr: string): Date | null {
  const parts = dateStr.split('/');
  if (parts.length !== 3) return null;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  let year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  if (year < 100) year += 2000;

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  const isPM = /pm/i.test(timeStr);
  const isAM = /am/i.test(timeStr);
  const cleanTime = timeStr.replace(/\s?[APap][Mm]/, '');
  const timeParts = cleanTime.split(':');
  hours = parseInt(timeParts[0], 10);
  minutes = parseInt(timeParts[1], 10);
  if (timeParts[2]) seconds = parseInt(timeParts[2], 10);

  if (isNaN(hours) || isNaN(minutes)) return null;

  if (isPM && hours !== 12) hours += 12;
  if (isAM && hours === 12) hours = 0;

  const date = new Date(year, month, day, hours, minutes, seconds);
  if (isNaN(date.getTime())) return null;

  return date;
}

function detectMediaType(content: string): MediaType | null {
  for (const { pattern, type } of MEDIA_PATTERNS) {
    if (pattern.test(content)) return type;
  }
  return null;
}

function isSystemMessage(content: string): boolean {
  return SYSTEM_KEYWORDS.some((keyword) => content.includes(keyword));
}

// Extract filename from message content like "IMG-20250317-WA0001.jpg (file attached)"
const FILENAME_PATTERN = /^(.+\.\w+)\s*\(file attached\)$/i;

function extractFilename(content: string): string | null {
  const match = FILENAME_PATTERN.exec(content.trim());
  return match ? match[1].trim() : null;
}

export function parseWhatsAppChat(text: string, outgoingSender?: string, mediaMap?: Map<string, string>): Chat {
  const emptyChat: Chat = { name: 'Chat', participants: [], messages: [], isGroup: false };

  if (!text || !text.trim()) return emptyChat;

  try {
  const lines = text.split('\n');
  const messages: Message[] = [];
  const participantSet = new Set<string>();
  let currentMessage: { date: string; time: string; sender: string; content: string } | null = null;
  let messageId = 0;

  function flushMessage() {
    if (!currentMessage) return;

    const timestamp = parseDate(currentMessage.date, currentMessage.time);
    if (!timestamp) return; // Skip messages with unparseable dates

    const content = currentMessage.content.trim();
    const mediaType = detectMediaType(content);
    const isSys = !currentMessage.sender || isSystemMessage(content);

    let type: MessageType = 'text';
    if (isSys) type = 'system';
    else if (mediaType) type = 'media';

    if (currentMessage.sender && !isSys) {
      participantSet.add(currentMessage.sender);
    }

    // Try to match media filename to extracted zip media
    let mediaUrl: string | undefined;
    let mediaFilename: string | undefined;
    if (mediaType && mediaMap) {
      const filename = extractFilename(content);
      if (filename && mediaMap.has(filename)) {
        mediaUrl = mediaMap.get(filename);
        mediaFilename = filename;
      }
    }

    messages.push({
      id: String(++messageId),
      timestamp,
      sender: currentMessage.sender || '',
      content,
      type,
      mediaType: mediaType ?? undefined,
      mediaUrl,
      mediaFilename,
      isOutgoing: outgoingSender ? currentMessage.sender === outgoingSender : false,
    });
  }

  for (const line of lines) {
    // Try format 1: [DD/MM/YY, HH:MM:SS] Sender: Message
    let match = FORMAT_1.exec(line);
    if (match) {
      flushMessage();
      currentMessage = { date: match[1], time: match[2], sender: match[3], content: match[4] };
      continue;
    }

    // Try format 2: DD/MM/YYYY, HH:MM - Sender: Message
    match = FORMAT_2.exec(line);
    if (match) {
      flushMessage();
      currentMessage = { date: match[1], time: match[2], sender: match[3], content: match[4] };
      continue;
    }

    // Try system format 1
    match = SYSTEM_FORMAT_1.exec(line);
    if (match && isSystemMessage(match[3])) {
      flushMessage();
      currentMessage = { date: match[1], time: match[2], sender: '', content: match[3] };
      continue;
    }

    // Try system format 2
    match = SYSTEM_FORMAT_2.exec(line);
    if (match && isSystemMessage(match[3])) {
      flushMessage();
      currentMessage = { date: match[1], time: match[2], sender: '', content: match[3] };
      continue;
    }

    // Continuation of previous message (multi-line)
    if (currentMessage && line.trim()) {
      currentMessage.content += '\n' + line;
    }
  }

  flushMessage();

  const participants = Array.from(participantSet);
  const isGroup = participants.length > 2;
  const name = isGroup ? 'Group Chat' : participants.filter((p) => p !== outgoingSender)[0] || 'Chat';

  return { name, participants, messages, isGroup };
  } catch {
    return emptyChat;
  }
}
