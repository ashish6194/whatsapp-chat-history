'use client';

import { useState, useCallback, useRef } from 'react';
import { extractWhatsAppZip } from '@/lib/zip-handler';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

interface FileUploadProps {
  onFileLoaded: (text: string, mediaMap?: Map<string, string>, mediaBlobMap?: Map<string, Blob>) => void;
}

export default function FileUpload({ onFileLoaded }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);

      const isZip = file.name.endsWith('.zip') || file.type === 'application/zip';
      const isTxt = file.name.endsWith('.txt');

      if (!isZip && !isTxt) {
        setError('Please upload a .txt or .zip file exported from WhatsApp.');
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError(`File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum size is 50MB.`);
        return;
      }

      if (file.size === 0) {
        setError('The file is empty. Please select a valid WhatsApp export.');
        return;
      }

      if (isZip) {
        setLoading(true);
        try {
          const { chatText, mediaMap, mediaBlobMap } = await extractWhatsAppZip(file);
          if (!chatText.trim()) {
            setError('No chat text found in the zip file.');
            setLoading(false);
            return;
          }
          onFileLoaded(chatText, mediaMap, mediaBlobMap);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to extract the zip file.');
        } finally {
          setLoading(false);
        }
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          if (text) onFileLoaded(text);
        };
        reader.onerror = () => {
          setError('Failed to read the file. Please try again.');
        };
        reader.readAsText(file);
      }
    },
    [onFileLoaded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center bg-[#eae6df] p-4">
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload WhatsApp chat export file. Drag and drop or press Enter to browse."
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={handleKeyDown}
        className={`w-full max-w-lg border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-[#00a884] focus:ring-offset-2 ${
          isDragging
            ? 'border-[#00a884] bg-[#00a884]/5 scale-105'
            : 'border-[#c4ccd5] bg-white/80 hover:border-[#00a884] hover:bg-white'
        }`}
      >
        {loading ? (
          <div className="py-4">
            <div className="w-10 h-10 border-3 border-[#00a884] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-[#667781]">Extracting media files...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-[#00a884]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h2 className="text-xl font-medium text-[#111b21] mb-2">Upload WhatsApp Chat</h2>
            <p className="text-sm text-[#667781] mb-4">
              Drag and drop your exported <code className="bg-[#f0f2f5] px-1 rounded">.txt</code> or <code className="bg-[#f0f2f5] px-1 rounded">.zip</code> file here, or click to browse
            </p>
            <p className="text-xs text-[#667781]">
              Export from WhatsApp: Open chat &rarr; More options &rarr; Export chat
            </p>
            <p className="text-xs text-[#667781] mt-1">
              Use <strong>.zip</strong> export to include media (photos, videos, audio)
            </p>
            <p className="text-xs text-[#667781] mt-1">Maximum file size: 50MB</p>
          </>
        )}

        {error && (
          <div role="alert" className="mt-4 bg-red-50 text-red-700 text-sm px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.zip"
          onChange={handleChange}
          className="hidden"
          aria-label="Select WhatsApp chat export file"
        />
      </div>
    </div>
  );
}
