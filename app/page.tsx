'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Chat } from '@/lib/types';
import { parseWhatsAppChat } from '@/lib/parser';
import { sampleChat } from '@/lib/sample-data';
import { revokeMediaUrls } from '@/lib/zip-handler';
import ChatView from '@/components/ChatView';
import FileUpload from '@/components/FileUpload';
import SenderPicker from '@/components/SenderPicker';
import ErrorBoundary from '@/components/ErrorBoundary';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const [chat, setChat] = useState<Chat | null>(null);
  const [showUpload, setShowUpload] = useState(true);
  const [pendingText, setPendingText] = useState<string | null>(null);
  const [pendingParticipants, setPendingParticipants] = useState<string[]>([]);
  const pendingMediaMapRef = useRef<Map<string, string> | undefined>(undefined);
  const activeMediaMapRef = useRef<Map<string, string> | undefined>(undefined);

  // Cleanup object URLs on unmount or chat change
  useEffect(() => {
    return () => {
      if (activeMediaMapRef.current) {
        revokeMediaUrls(activeMediaMapRef.current);
      }
    };
  }, []);

  const handleFileLoaded = useCallback((text: string, mediaMap?: Map<string, string>) => {
    const parsed = parseWhatsAppChat(text);
    if (parsed.messages.length === 0) {
      alert('Could not parse any messages from this file. Please check the format.');
      if (mediaMap) revokeMediaUrls(mediaMap);
      return;
    }
    setPendingText(text);
    setPendingParticipants(parsed.participants);
    pendingMediaMapRef.current = mediaMap;
  }, []);

  const handleSenderSelected = useCallback(
    (sender: string) => {
      if (!pendingText) return;

      // Revoke previous media URLs
      if (activeMediaMapRef.current) {
        revokeMediaUrls(activeMediaMapRef.current);
      }

      const mediaMap = pendingMediaMapRef.current;
      const parsed = parseWhatsAppChat(pendingText, sender, mediaMap);
      setChat(parsed);
      setShowUpload(false);
      setPendingText(null);
      setPendingParticipants([]);
      activeMediaMapRef.current = mediaMap;
      pendingMediaMapRef.current = undefined;
    },
    [pendingText]
  );

  const loadSampleData = useCallback(() => {
    if (activeMediaMapRef.current) {
      revokeMediaUrls(activeMediaMapRef.current);
      activeMediaMapRef.current = undefined;
    }
    setChat(sampleChat);
    setShowUpload(false);
  }, []);

  const handleUploadClick = useCallback(() => {
    setShowUpload(true);
  }, []);

  return (
    <main className="flex flex-col h-screen bg-[var(--wa-page-bg)]">
      {/* Top bar (desktop only) */}
      <div className="hidden md:block h-[127px] bg-[var(--wa-top-bar)] shrink-0" />

      {/* Main container */}
      <div className="flex-1 flex flex-col md:relative md:-mt-[87px] md:mx-auto md:w-full md:max-w-[1600px] md:shadow-2xl md:rounded-t-sm overflow-hidden min-h-0">
        {showUpload && !pendingText ? (
          <div className="flex flex-col flex-1 bg-[var(--wa-bg)] overflow-y-auto">
            <FileUpload onFileLoaded={handleFileLoaded} />
            <div className="pb-4 text-center">
              <button
                onClick={loadSampleData}
                className="text-sm text-[#00a884] hover:underline font-medium"
              >
                Or load sample chat data to explore
              </button>
            </div>

            {/* Content section for AdSense compliance */}
            <div className="max-w-2xl mx-auto px-6 pb-8 space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-[#111b21] mb-3">WhatsApp Chat Viewer</h2>
                <p className="text-sm text-[#667781] leading-relaxed mb-4">
                  View your exported WhatsApp conversations in a beautiful, familiar interface. Upload a <code className="bg-[#f0f2f5] px-1 rounded text-[#111b21]">.txt</code> or <code className="bg-[#f0f2f5] px-1 rounded text-[#111b21]">.zip</code> file exported from WhatsApp and browse your messages with full search, filters, and media support.
                </p>
                <h3 className="text-sm font-semibold text-[#111b21] mb-2">Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {[
                    'WhatsApp-style chat bubbles with timestamps and read receipts',
                    'Search messages and filter by sender or date range',
                    'View photos, videos, and audio from .zip exports',
                    '100% private \u2014 all processing happens in your browser',
                    'Works with both individual and group chats',
                    'Responsive design for mobile and desktop',
                  ].map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <span className="text-[#00a884] mt-0.5">&#x2713;</span>
                      <span className="text-[#667781]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-[#111b21] mb-3">How to Export Your WhatsApp Chat</h3>
                <ol className="text-sm text-[#667781] space-y-2 list-decimal list-inside">
                  <li>Open the chat you want to export in WhatsApp</li>
                  <li>Tap the <strong className="text-[#111b21]">three dots</strong> menu (top right)</li>
                  <li>Select <strong className="text-[#111b21]">More</strong> &rarr; <strong className="text-[#111b21]">Export chat</strong></li>
                  <li>Choose <strong className="text-[#111b21]">Include media</strong> for photos/videos, or <strong className="text-[#111b21]">Without media</strong> for text only</li>
                  <li>Save the file and upload it here</li>
                </ol>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-[#111b21] mb-3">Supported Formats</h3>
                <div className="text-sm text-[#667781] space-y-1">
                  <p><code className="bg-[#f0f2f5] px-1 rounded text-[#111b21]">.txt</code> &mdash; Text-only export with placeholder icons for media.</p>
                  <p><code className="bg-[#f0f2f5] px-1 rounded text-[#111b21]">.zip</code> &mdash; Full export with photos, videos, and audio displayed inline.</p>
                  <p className="mt-2">Both <code className="bg-[#f0f2f5] px-1 rounded text-[#111b21]">DD/MM/YYYY</code> and <code className="bg-[#f0f2f5] px-1 rounded text-[#111b21]">[DD/MM/YY, HH:MM:SS]</code> formats supported.</p>
                </div>
              </div>

              <div className="text-center flex justify-center gap-4 pb-4">
                <a href="/privacy" className="text-xs text-[#667781] hover:text-[#00a884] hover:underline">Privacy Policy</a>
                <span className="text-xs text-[#667781]">&middot;</span>
                <a href="/terms" className="text-xs text-[#667781] hover:text-[#00a884] hover:underline">Terms of Service</a>
              </div>
            </div>
          </div>
        ) : chat ? (
          <ErrorBoundary onReset={handleUploadClick}>
            <ChatView chat={chat} onUploadClick={handleUploadClick} />
          </ErrorBoundary>
        ) : null}
      </div>

      {/* Sender picker modal */}
      {pendingText && pendingParticipants.length > 0 && (
        <SenderPicker participants={pendingParticipants} onSelect={handleSenderSelected} />
      )}

      <ThemeToggle />
    </main>
  );
}
