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
  const hasFilters = filters.searchQuery || filters.selectedSender || filters.dateFrom || filters.dateTo || filters.mediaOnly || filters.hideSystemMessages;

  return (
    <div className="bg-[var(--wa-search-bg)] border-b border-[var(--wa-border)] px-3 py-2 space-y-2 shrink-0" role="search" aria-label="Search and filter messages">
      {/* Search input row */}
      <div className="flex items-center gap-2">
        <button
          onClick={onClose}
          aria-label="Close search"
          className="p-1 hover:bg-black/5 rounded-full shrink-0 focus:outline-none focus:ring-2 focus:ring-[#00a884]"
        >
          <svg className="w-5 h-5 text-[var(--wa-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search messages..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            className="w-full bg-[var(--wa-input-bg)] rounded-lg px-3 py-1.5 text-sm text-[var(--wa-text-primary)] placeholder:text-[var(--wa-text-secondary)] outline-none focus:ring-1 focus:ring-[#00a884]"
            aria-label="Search messages"
            autoFocus
          />
        </div>
        <span className="text-xs text-[var(--wa-text-secondary)] shrink-0" aria-live="polite" role="status">
          {hasFilters ? `${resultCount} of ${totalCount}` : `${totalCount} messages`}
        </span>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-2 flex-wrap">
        <select
          value={filters.selectedSender || ''}
          onChange={(e) => onFilterChange({ ...filters, selectedSender: e.target.value || null })}
          className="bg-[var(--wa-input-bg)] rounded-lg px-2 py-1 text-xs text-[var(--wa-text-primary)] outline-none cursor-pointer focus:ring-1 focus:ring-[#00a884]"
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
          className="bg-[var(--wa-input-bg)] rounded-lg px-2 py-1 text-xs text-[var(--wa-text-primary)] outline-none focus:ring-1 focus:ring-[#00a884]"
          aria-label="Filter from date"
        />
        <input
          type="date"
          value={filters.dateTo || ''}
          onChange={(e) => onFilterChange({ ...filters, dateTo: e.target.value || null })}
          className="bg-[var(--wa-input-bg)] rounded-lg px-2 py-1 text-xs text-[var(--wa-text-primary)] outline-none focus:ring-1 focus:ring-[#00a884]"
          aria-label="Filter to date"
        />
        <button
          onClick={() => onFilterChange({ ...filters, mediaOnly: !filters.mediaOnly })}
          className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            filters.mediaOnly ? 'bg-[var(--wa-accent)] text-white' : 'bg-[var(--wa-input-bg)] text-[var(--wa-text-secondary)] hover:opacity-80'
          }`}
        >
          Media only
        </button>
        <button
          onClick={() => onFilterChange({ ...filters, hideSystemMessages: !filters.hideSystemMessages })}
          className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            filters.hideSystemMessages ? 'bg-[var(--wa-accent)] text-white' : 'bg-[var(--wa-input-bg)] text-[var(--wa-text-secondary)] hover:opacity-80'
          }`}
        >
          Hide system
        </button>
        {hasFilters && (
          <button
            onClick={() =>
              onFilterChange({ searchQuery: '', selectedSender: null, dateFrom: null, dateTo: null, mediaOnly: false, hideSystemMessages: false })
            }
            className="text-xs text-[var(--wa-accent)] hover:underline focus:outline-none focus:underline"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
