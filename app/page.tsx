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
import AdBanner from '@/components/AdBanner';

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
    <main className="flex flex-col h-screen bg-[#111b21]">
      {/* Top bar (desktop only) */}
      <div className="hidden md:block h-[127px] bg-[#00a884] shrink-0" />

      {/* Main container */}
      <div className="flex-1 flex flex-col md:relative md:-mt-[87px] md:mx-auto md:w-full md:max-w-[1600px] md:shadow-2xl md:rounded-t-sm overflow-hidden min-h-0">
        {showUpload && !pendingText ? (
          <div className="flex flex-col flex-1">
            {/* Top ad on upload screen */}
            <AdBanner format="horizontal" slot="1234567890" className="bg-[#eae6df] pt-4 px-4" />
            <FileUpload onFileLoaded={handleFileLoaded} />
            <div className="bg-[#eae6df] pb-4 text-center">
              <button
                onClick={loadSampleData}
                className="text-sm text-[#00a884] hover:underline font-medium"
              >
                Or load sample chat data to explore
              </button>
            </div>
            {/* Bottom ad on upload screen */}
            <AdBanner format="horizontal" slot="1234567891" className="bg-[#eae6df] pb-4 px-4" />
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
    </main>
  );
}
