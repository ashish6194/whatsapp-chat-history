'use client';

import { useState } from 'react';

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('theme');
  return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(getInitialTheme);

  const toggle = () => {
    const newDark = !dark;
    setDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="fixed bottom-4 right-4 z-50 p-2.5 rounded-full bg-[var(--wa-sidebar-bg)] shadow-lg border border-[var(--wa-border)] hover:scale-110 transition-transform"
    >
      {dark ? (
        <svg className="w-5 h-5 text-[#f5c829]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 7.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-[var(--wa-text-secondary)]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      )}
    </button>
  );
}
