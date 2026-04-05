'use client';

import { useState, useRef, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import { List, useListRef, type RowComponentProps } from 'react-window';
import { Chat, FilterState, Message } from '@/lib/types';
import { filterMessages, isSameDay } from '@/lib/utils';
import { exportChatToPDF } from '@/lib/pdf-export';
import ChatHeader from './ChatHeader';
import ChatBubble from './ChatBubble';
import DateSeparator from './DateSeparator';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';
import AdBanner from './AdBanner';

interface ChatViewProps {
  chat: Chat;
  onUploadClick: () => void;
}

interface RowItem {
  type: 'date' | 'message';
  message: Message;
  showSender: boolean;
}

function buildRows(messages: Message[]): RowItem[] {
  const rows: RowItem[] = [];
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    const prev = i > 0 ? messages[i - 1] : null;

    if (!prev || !isSameDay(prev.timestamp, msg.timestamp)) {
      rows.push({ type: 'date', message: msg, showSender: false });
    }

    const showSender = !prev || prev.sender !== msg.sender || prev.type === 'system';
    rows.push({ type: 'message', message: msg, showSender });
  }
  return rows;
}

function getRowHeight(row: RowItem): number {
  if (row.type === 'date') return 44;
  const msg = row.message;
  if (msg.type === 'system') return 36;
  if (msg.type === 'media') return 80 + (msg.content && !msg.content.startsWith('<Media omitted>') ? 30 : 0);
  const lines = Math.max(1, Math.ceil(msg.content.length / 40));
  const senderHeight = row.showSender && !msg.isOutgoing ? 18 : 0;
  return lines * 19 + 24 + senderHeight;
}

// Context to pass row data to RowRenderer without module-level mutation
interface RowContextData {
  rows: RowItem[];
  isGroup: boolean;
  participants: string[];
}

const RowDataContext = createContext<RowContextData>({ rows: [], isGroup: false, participants: [] });

function RowRenderer({ index, style }: RowComponentProps) {
  const { rows, isGroup, participants } = useContext(RowDataContext);
  const row = rows[index];
  if (!row) return null;

  return (
    <div style={style}>
      {row.type === 'date' ? (
        <DateSeparator date={row.message.timestamp} />
      ) : (
        <ChatBubble
          message={row.message}
          isGroup={isGroup}
          participants={participants}
          showSender={row.showSender}
        />
      )}
    </div>
  );
}

export default function ChatView({ chat, onUploadClick }: ChatViewProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedSender: null,
    dateFrom: null,
    dateTo: null,
  });
  const [exporting, setExporting] = useState(false);
  const listRef = useListRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [listHeight, setListHeight] = useState(600);

  const filtered = useMemo(() => filterMessages(chat.messages, filters), [chat.messages, filters]);
  const rows = useMemo(() => buildRows(filtered), [filtered]);

  const rowContextValue = useMemo(
    () => ({ rows, isGroup: chat.isGroup, participants: chat.participants }),
    [rows, chat.isGroup, chat.participants]
  );

  // Measure container height
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setListHeight(entry.contentRect.height);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll to bottom on chat load
  useEffect(() => {
    if (rows.length > 0 && listRef.current) {
      listRef.current.scrollToRow({ index: rows.length - 1, align: 'end' });
    }
  }, [chat, rows.length, listRef]);

  const getItemSize = useCallback(
    (index: number) => getRowHeight(rows[index]),
    [rows]
  );

  const handleExportPDF = useCallback(() => {
    setExporting(true);
    // Use setTimeout to let the UI update with the spinner before heavy work
    setTimeout(() => {
      try {
        const hasFilters = filters.searchQuery || filters.selectedSender || filters.dateFrom || filters.dateTo;
        exportChatToPDF(chat, hasFilters ? { messages: filtered } : undefined);
      } catch {
        alert('Failed to generate PDF. Please try again.');
      } finally {
        setExporting(false);
      }
    }, 50);
  }, [chat, filtered, filters]);

  return (
    <div className="flex flex-1 min-h-0" role="main">
      {/* Main chat area */}
      <div className="flex flex-col flex-1 min-w-0">
        <ChatHeader
          chat={chat}
          onSearchToggle={() => setSearchOpen(!searchOpen)}
          onUploadClick={onUploadClick}
          searchOpen={searchOpen}
          onExportPDF={handleExportPDF}
          exporting={exporting}
        />

        {searchOpen && (
          <SearchBar
            filters={filters}
            onFilterChange={setFilters}
            participants={chat.participants}
            resultCount={filtered.length}
            totalCount={chat.messages.length}
            onClose={() => {
              setSearchOpen(false);
              setFilters({ searchQuery: '', selectedSender: null, dateFrom: null, dateTo: null });
            }}
          />
        )}

        {/* Ad below header */}
        <AdBanner format="horizontal" slot="7984254267" className="bg-[#eae6df] shrink-0" />

        {/* Messages */}
        <div
          ref={containerRef}
          className="flex-1 overflow-hidden bg-[#eae6df]"
          role="log"
          aria-live="polite"
          aria-label="Chat messages"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d1d7db' fill-opacity='0.15'%3E%3Ccircle cx='50' cy='50' r='3'/%3E%3Ccircle cx='150' cy='80' r='2'/%3E%3Ccircle cx='250' cy='30' r='2.5'/%3E%3Ccircle cx='350' cy='70' r='2'/%3E%3Ccircle cx='100' cy='150' r='2'/%3E%3Ccircle cx='200' cy='120' r='3'/%3E%3Ccircle cx='300' cy='160' r='2'/%3E%3Ccircle cx='50' cy='250' r='2.5'/%3E%3Ccircle cx='150' cy='220' r='2'/%3E%3Ccircle cx='250' cy='270' r='3'/%3E%3Ccircle cx='350' cy='230' r='2'/%3E%3Ccircle cx='100' cy='350' r='2'/%3E%3Ccircle cx='200' cy='320' r='2.5'/%3E%3Ccircle cx='300' cy='370' r='2'/%3E%3Ccircle cx='50' cy='380' r='3'/%3E%3Ccircle cx='370' cy='350' r='2.5'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          {rows.length > 0 ? (
            <RowDataContext value={rowContextValue}>
              <List
                listRef={listRef}
                rowComponent={RowRenderer}
                rowCount={rows.length}
                rowHeight={getItemSize}
                rowProps={{}}
                overscanCount={10}
                style={{ height: listHeight, width: '100%' }}
              />
            </RowDataContext>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-[#667781] text-sm bg-white/80 px-4 py-2 rounded-lg">
                No messages found
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Desktop sidebar */}
      <Sidebar chat={chat} />
    </div>
  );
}
