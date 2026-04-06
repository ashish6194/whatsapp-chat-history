export type MessageType = 'text' | 'media' | 'system';
export type MediaType = 'image' | 'video' | 'audio' | 'document' | 'sticker' | 'unknown';

export interface Message {
  id: string;
  timestamp: Date;
  sender: string;
  content: string;
  type: MessageType;
  mediaType?: MediaType;
  mediaUrl?: string;
  mediaFilename?: string;
  isOutgoing: boolean;
}

export interface Chat {
  id?: string;
  name: string;
  participants: string[];
  messages: Message[];
  isGroup: boolean;
}

export interface ChatSummary {
  id: string;
  name: string;
  participants: string[];
  isGroup: boolean;
  messageCount: number;
  firstMessageDate: string;
  lastMessageDate: string;
  createdAt: string;
  bookmarkCount: number;
}

export interface FilterState {
  searchQuery: string;
  selectedSender: string | null;
  dateFrom: string | null;
  dateTo: string | null;
  mediaOnly: boolean;
  hideSystemMessages: boolean;
}
