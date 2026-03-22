<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/zero-data-retention -->

# Zero data retention

> Configure Zero Data Retention (ZDR) for Claude Code on Enterprise plans.

## Overview

ZDR ensures no data is retained on Anthropic servers after processing. Available for Claude for Enterprise.

## Enable ZDR

ZDR is enabled per-organization by your Anthropic account team. Each new organization must have ZDR enabled separately.

## What ZDR affects

- API request/response data: not retained
- Session data: not stored server-side
- Local sessions: still cached locally for 30 days (configurable)

## Limitations with ZDR

- Contribution metrics (analytics) are not available
- Code Review is not available
- Auto memory works locally only

## See also

- Data usage, Security, Legal and compliance
