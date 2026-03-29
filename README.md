# WhatsApp Chat Viewer

A web app that renders exported WhatsApp chat history with a familiar WhatsApp-like UI. Upload your exported `.txt` file and browse your conversations with search, filters, and media placeholders.

## Features

- **Chat bubbles** — sent (green) and received (white) messages with timestamps, sender names, and double-check marks
- **Date separators** — sticky date dividers between message groups
- **Search & filter** — search by text, filter by sender, or date range
- **Media placeholders** — icons for photos, videos, audio, documents, and stickers
- **File upload** — drag-and-drop or click to upload WhatsApp `.txt` exports (max 50MB)
- **Sender selection** — pick your name to show your messages on the right side
- **Responsive** — mobile WhatsApp style on small screens, desktop WhatsApp Web style with sidebar on large screens
- **Virtualized scrolling** — handles large chats (10k+ messages) without performance issues
- **Accessible** — ARIA labels, keyboard navigation, focus management, reduced motion support

## How to Export WhatsApp Chat

1. Open the chat in WhatsApp
2. Tap **More options** (three dots) > **More** > **Export chat**
3. Choose **Without media**
4. Save the `.txt` file

## Supported Formats

```
[DD/MM/YY, HH:MM:SS] Sender Name: Message text
DD/MM/YYYY, HH:MM - Sender Name: Message text
```

Both 12-hour (AM/PM) and 24-hour time formats are supported.

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
- Client-side only — no database, no server-side processing

## Known Limitations

- Media files are not displayed (WhatsApp exports reference them but don't include them in `.txt`)
- Non-English system messages may not be detected as system messages
- Date format must be DD/MM/YY or DD/MM/YYYY (US-style MM/DD not yet supported)
