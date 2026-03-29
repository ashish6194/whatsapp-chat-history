'use client';

import { FilterState } from '@/lib/types';

interface SearchBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  participants: string[];
  resultCount: number;
  totalCount: number;
  onClose: () => void;
}

export default function SearchBar({
  filters,
  onFilterChange,
  participants,
  resultCount,
  totalCount,
  onClose,
}: SearchBarProps) {
  const hasFilters = filters.searchQuery || filters.selectedSender || filters.dateFrom || filters.dateTo;

  return (
    <div className="bg-white border-b border-[#e9edef] px-3 py-2 space-y-2 shrink-0" role="search" aria-label="Search and filter messages">
      {/* Search input row */}
      <div className="flex items-center gap-2">
        <button
          onClick={onClose}
          aria-label="Close search"
          className="p-1 hover:bg-black/5 rounded-full shrink-0 focus:outline-none focus:ring-2 focus:ring-[#00a884]"
        >
          <svg className="w-5 h-5 text-[#667781]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search messages..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            className="w-full bg-[#f0f2f5] rounded-lg px-3 py-1.5 text-sm text-[#111b21] placeholder:text-[#667781] outline-none focus:ring-1 focus:ring-[#00a884]"
            aria-label="Search messages"
            autoFocus
          />
        </div>
        <span className="text-xs text-[#667781] shrink-0" aria-live="polite" role="status">
          {hasFilters ? `${resultCount} of ${totalCount}` : `${totalCount} messages`}
        </span>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-2 flex-wrap">
        <select
          value={filters.selectedSender || ''}
          onChange={(e) => onFilterChange({ ...filters, selectedSender: e.target.value || null })}
          className="bg-[#f0f2f5] rounded-lg px-2 py-1 text-xs text-[#111b21] outline-none cursor-pointer focus:ring-1 focus:ring-[#00a884]"
          aria-label="Filter by sender"
        >
          <option value="">All senders</option>
          {participants.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <input
          type="date"
          value={filters.dateFrom || ''}
          onChange={(e) => onFilterChange({ ...filters, dateFrom: e.target.value || null })}
          className="bg-[#f0f2f5] rounded-lg px-2 py-1 text-xs text-[#111b21] outline-none focus:ring-1 focus:ring-[#00a884]"
          aria-label="Filter from date"
        />
        <input
          type="date"
          value={filters.dateTo || ''}
          onChange={(e) => onFilterChange({ ...filters, dateTo: e.target.value || null })}
          className="bg-[#f0f2f5] rounded-lg px-2 py-1 text-xs text-[#111b21] outline-none focus:ring-1 focus:ring-[#00a884]"
          aria-label="Filter to date"
        />
        {hasFilters && (
          <button
            onClick={() =>
              onFilterChange({ searchQuery: '', selectedSender: null, dateFrom: null, dateTo: null })
            }
            className="text-xs text-[#00a884] hover:underline focus:outline-none focus:underline"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
