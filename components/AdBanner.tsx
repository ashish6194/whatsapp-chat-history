'use client';

import { useEffect, useRef } from 'react';

const ADSENSE_PUB_ID = 'ca-pub-1021154314438944';

type AdFormat = 'horizontal' | 'rectangle' | 'vertical';

interface AdBannerProps {
  format?: AdFormat;
  className?: string;
  slot: string; // AdSense ad slot ID
}

const formatStyles: Record<AdFormat, { width: string; height: string }> = {
  horizontal: { width: '100%', height: '90px' },
  rectangle: { width: '300px', height: '250px' },
  vertical: { width: '160px', height: '600px' },
};

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export default function AdBanner({ format = 'horizontal', className = '', slot }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet or ad blocker active
    }
  }, []);

  const styles = formatStyles[format];
  const isPlaceholder = ADSENSE_PUB_ID === 'ca-pub-XXXXXXXXXXXXXXXX';

  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{ minHeight: styles.height }}
    >
      {isPlaceholder ? (
        // Placeholder shown until real AdSense ID is configured
        <div
          className="flex items-center justify-center bg-gradient-to-r from-[#f0f2f5] to-[#e9edef] border border-dashed border-[#c4ccd5] rounded-lg text-[#667781] text-xs"
          style={{ width: styles.width, height: styles.height, maxWidth: '100%' }}
        >
          <div className="text-center px-2">
            <p className="font-medium">Ad Space</p>
            <p className="opacity-60 mt-0.5">Google AdSense</p>
          </div>
        </div>
      ) : (
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            display: 'block',
            width: styles.width,
            height: styles.height,
            maxWidth: '100%',
          }}
          data-ad-client={ADSENSE_PUB_ID}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}
