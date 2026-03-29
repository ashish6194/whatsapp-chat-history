# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Test
- `npm run dev` — start dev server (port 3000)
- `npm run build` — production build
- `npm run lint` — run ESLint

## Tech Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- No database — client-side only

## Architecture
- `app/` — Next.js App Router pages (single page app)
- `components/` — React components (all client components with 'use client')
- `lib/` — Parser, types, utilities, sample data
- All state is client-side React state (no server components for chat logic)

## Conventions
- WhatsApp theme colors are hardcoded hex values, not CSS variables
- Parser supports two WhatsApp export formats (bracket and dash style)
- `isOutgoing` is determined by matching sender name, selected via SenderPicker modal

## Key Files
- `lib/parser.ts` — WhatsApp .txt export parser (handles multiple formats)
- `lib/sample-data.ts` — Demo data with 56 messages across 3 days
- `components/ChatView.tsx` — Main chat container with search/filter state
- `components/ChatBubble.tsx` — Individual message rendering
