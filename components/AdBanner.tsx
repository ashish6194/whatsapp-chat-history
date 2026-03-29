'use client';

import { useEffect, useRef, useState } from 'react';

const ADSENSE_PUB_ID = 'ca-pub-1021154314438944';

type AdFormat = 'horizontal' | 'rectangle' | 'vertical';

interface AdBannerProps {
  format?: AdFormat;
  className?: string;
  slot: string;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export default function AdBanner({ format = 'horizontal', className = '', slot }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded or ad blocker active
    }

    // Check if ad was filled after a delay
    const timer = setTimeout(() => {
      const el = adRef.current;
      if (el && el.getAttribute('data-ad-status') === 'filled') {
        setAdLoaded(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Collapse if ad not loaded — no empty space
  if (!adLoaded) {
    return (
      <div className={className}>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '0', overflow: 'hidden' }}
          data-ad-client={ADSENSE_PUB_ID}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
