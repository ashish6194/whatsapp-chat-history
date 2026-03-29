'use client';

import { memo } from 'react';
import { MediaType } from '@/lib/types';

const mediaIcons: Record<MediaType, { icon: string; label: string }> = {
  image: { icon: '\uD83D\uDCF7', label: 'Photo' },
  video: { icon: '\uD83C\uDFA5', label: 'Video' },
  audio: { icon: '\uD83C\uDFB5', label: 'Audio' },
  document: { icon: '\uD83D\uDCC4', label: 'Document' },
  sticker: { icon: '\uD83D\uDE00', label: 'Sticker' },
  unknown: { icon: '\uD83D\uDCCE', label: 'Media' },
};

const MediaPlaceholder = memo(function MediaPlaceholder({ mediaType }: { mediaType: MediaType }) {
  const { icon, label } = mediaIcons[mediaType] || mediaIcons.unknown;

  return (
    <div className="flex items-center gap-2 bg-black/5 rounded-lg p-3 min-w-[200px]" aria-label={`${label} attachment`}>
      <span className="text-2xl" aria-hidden="true">{icon}</span>
      <span className="text-sm text-[#667781]">{label}</span>
    </div>
  );
});

export default MediaPlaceholder;
