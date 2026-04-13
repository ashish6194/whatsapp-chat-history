# WhatsApp Chat Viewer

A web app that renders exported WhatsApp chat history with a familiar WhatsApp-like UI. Upload your exported `.txt` or `.zip` file and browse your conversations with search, filters, media display, bookmarks, analytics, and PDF export.

## Features

- **Chat bubbles** — sent (green) and received (white) messages with timestamps, sender names, and double-check marks
- **Date separators** — sticky date dividers between message groups
- **Search & filter** — search by text, filter by sender, date range, media-only, or hide system messages
- **Media display** — view photos, videos, and audio inline from .zip exports (click images for full-screen lightbox)
- **PDF export** — download your chat as a styled WhatsApp-style PDF document
- **Chat analytics** — message counts per person, hourly/weekly activity charts, top emojis, fun facts
- **Bookmarks** — star important messages, view all bookmarks on a dedicated page
- **Local storage** — chats saved in IndexedDB, persist across page reloads, with chat list management
- **Global search** — search across all saved chats from the landing page
- **Dark mode** — toggle or auto-detect from system preference
- **File upload** — drag-and-drop or click to upload WhatsApp `.txt` or `.zip` exports (max 50MB)
- **Sender selection** — pick your name to show your messages on the right side
- **Responsive** — mobile WhatsApp style on small screens, desktop WhatsApp Web style with sidebar on large screens
- **Virtualized scrolling** — handles large chats (10k+ messages) without performance issues
- **Accessible** — ARIA labels, keyboard navigation, focus management, reduced motion support
- **Privacy** — 100% client-side processing, no data sent to any server

## How to Export WhatsApp Chat

1. Open the chat in WhatsApp
2. Tap **More options** (three dots) > **More** > **Export chat**
3. Choose **Without media** (.txt) or **Include media** (.zip)
4. Save the file and upload it here

## Supported Formats

```
[DD/MM/YY, HH:MM:SS] Sender Name: Message text
[DD/MM/YY, HH:MM:SS AM] Sender Name: Message text
DD/MM/YYYY, HH:MM - Sender Name: Message text
DD/MM/YYYY, HH:MM AM - Sender Name: Message text
```

Both 12-hour (AM/PM) and 24-hour time formats are supported. Dot-separated dates (DD.MM.YYYY) and Unicode LTR/RTL marks are handled.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — run ESLint

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- react-window (virtual scrolling)
- jszip (ZIP extraction with media blob retention)
- jspdf (PDF export)
- idb (IndexedDB wrapper for local storage)
- Client-side only — no database, no server-side processing
