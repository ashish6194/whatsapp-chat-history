# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Test
- `npm run dev` — start dev server (port 3000)
- `npm run build` — production build
- `npm run lint` — run ESLint

## Tech Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- react-window (virtualized scrolling)
- jszip (zip extraction), jspdf (PDF export), idb (IndexedDB wrapper)
- No backend — 100% client-side processing

## Architecture
- `app/` — Next.js App Router pages (home, bookmarks, privacy, terms)
- `components/` — React components (all client components with 'use client')
- `lib/` — Parser, types, utilities, IndexedDB layer, PDF export, chat analytics
- All state is client-side React state + IndexedDB for persistence

## Conventions
- WhatsApp theme colors use CSS variables (`--wa-*`) defined in globals.css for dark mode support
- Parser supports multiple WhatsApp export formats (bracket and dash style, 12h/24h, with/without AM/PM)
- `isOutgoing` is determined by matching sender name, selected via SenderPicker modal
- Dark mode: toggle in bottom-right, respects system preference, persists in localStorage

## Key Files
- `lib/parser.ts` — WhatsApp .txt export parser (handles multiple formats, unicode marks, BOM)
- `lib/db.ts` — IndexedDB layer for chat persistence, bookmarks, media blobs, global search
- `lib/pdf-export.ts` — jsPDF-based WhatsApp-style PDF generation
- `lib/chat-stats.ts` — Chat analytics computation (messages per person, hourly/weekly activity, emojis)
- `lib/zip-handler.ts` — ZIP extraction with media blob retention for IndexedDB storage
- `components/ChatView.tsx` — Main chat container with react-window virtualization, search, bookmarks
- `components/ChatBubble.tsx` — Individual message rendering with bookmark toggle
- `components/ChatList.tsx` — Landing page with saved chats, global search, upload
- `components/ChatStats.tsx` — Analytics modal with charts and fun facts
