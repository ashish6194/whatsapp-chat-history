'use client';

import { memo } from 'react';
import { formatDate } from '@/lib/utils';

const DateSeparator = memo(function DateSeparator({ date }: { date: Date }) {
  return (
    <div className="flex justify-center my-3 sticky top-0 z-10" role="separator" aria-label={formatDate(date)}>
      <span className="bg-white/90 text-[#54656f] text-xs px-3 py-1 rounded-lg shadow-sm">
        {formatDate(date)}
      </span>
    </div>
  );
});

export default DateSeparator;
