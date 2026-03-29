'use client';

import { memo, useState } from 'react';
import { MediaType } from '@/lib/types';

const mediaIcons: Record<MediaType, { icon: string; label: string }> = {
  image: { icon: '\uD83D\uDCF7', label: 'Photo' },
  video: { icon: '\uD83C\uDFA5', label: 'Video' },
  audio: { icon: '\uD83C\uDFB5', label: 'Audio' },
  document: { icon: '\uD83D\uDCC4', label: 'Document' },
  sticker: { icon: '\uD83D\uDE00', label: 'Sticker' },
  unknown: { icon: '\uD83D\uDCCE', label: 'Media' },
};

interface MediaDisplayProps {
  mediaType: MediaType;
  mediaUrl?: string;
  mediaFilename?: string;
}

const MediaDisplay = memo(function MediaDisplay({ mediaType, mediaUrl, mediaFilename }: MediaDisplayProps) {
  const [imageOpen, setImageOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { icon, label } = mediaIcons[mediaType] || mediaIcons.unknown;

  // No URL or load failed — show placeholder
  if (!mediaUrl || imageError) {
    return (
      <div className="flex items-center gap-2 bg-black/5 rounded-lg p-3 min-w-[200px]" aria-label={`${label} attachment`}>
        <span className="text-2xl" aria-hidden="true">{icon}</span>
        <div className="flex flex-col">
          <span className="text-sm text-[#667781]">{label}</span>
          {mediaFilename && (
            <span className="text-xs text-[#667781]/70 truncate max-w-[180px]">{mediaFilename}</span>
          )}
        </div>
      </div>
    );
  }

  // Image
  if (mediaType === 'image' || mediaType === 'sticker') {
    return (
      <>
        <button
          onClick={() => setImageOpen(true)}
          className="block rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#00a884]"
          aria-label={`View ${mediaFilename || 'photo'} full size`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mediaUrl}
            alt={mediaFilename || 'Photo'}
            className="max-h-[200px] w-auto rounded-lg object-cover"
            style={{ maxWidth: '250px' }}
            onError={() => setImageError(true)}
          />
        </button>

        {/* Lightbox */}
        {imageOpen && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setImageOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setImageOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Full size image"
            tabIndex={0}
          >
            <button
              onClick={() => setImageOpen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
              aria-label="Close image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mediaUrl}
              alt={mediaFilename || 'Photo'}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </>
    );
  }

  // Video
  if (mediaType === 'video') {
    return (
      <video
        src={mediaUrl}
        controls
        className="max-h-[200px] rounded-lg"
        style={{ maxWidth: '250px' }}
        aria-label={mediaFilename || 'Video'}
      >
        Your browser does not support video playback.
      </video>
    );
  }

  // Audio
  if (mediaType === 'audio') {
    return (
      <div className="flex items-center gap-2 bg-[#d9fdd3]/50 rounded-full px-4 py-2 min-w-[250px]">
        <span className="text-lg" aria-hidden="true">{icon}</span>
        <audio src={mediaUrl} controls className="h-8 flex-1" aria-label={mediaFilename || 'Audio'}>
          Your browser does not support audio playback.
        </audio>
      </div>
    );
  }

  // Document — download link
  if (mediaType === 'document') {
    return (
      <a
        href={mediaUrl}
        download={mediaFilename}
        className="flex items-center gap-2 bg-black/5 rounded-lg p-3 min-w-[200px] hover:bg-black/10 transition-colors"
        aria-label={`Download ${mediaFilename || 'document'}`}
      >
        <span className="text-2xl" aria-hidden="true">{icon}</span>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-sm text-[#111b21] truncate">{mediaFilename || 'Document'}</span>
          <span className="text-xs text-[#667781]">Tap to download</span>
        </div>
        <svg className="w-5 h-5 text-[#667781] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </a>
    );
  }

  // Fallback placeholder
  return (
    <div className="flex items-center gap-2 bg-black/5 rounded-lg p-3 min-w-[200px]" aria-label={`${label} attachment`}>
      <span className="text-2xl" aria-hidden="true">{icon}</span>
      <span className="text-sm text-[#667781]">{label}</span>
    </div>
  );
});

export default MediaDisplay;
