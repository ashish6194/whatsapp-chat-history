<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/plugin-marketplaces -->

# Create and distribute a plugin marketplace

> Build and host plugin marketplaces to distribute Claude Code extensions.

## Overview

1. Create plugins
2. Create marketplace.json
3. Host the marketplace
4. Share with users

## Create the marketplace file

Place `.claude-plugin/marketplace.json` in your repository root with name, owner, and plugins list.

## Plugin sources

- Relative paths (`./plugins/my-plugin`)
- GitHub repos (`owner/repo`)
- Git URLs
- Git subdirectories
- npm packages

## Host and distribute

### GitHub (recommended)
Users add with `/plugin marketplace add owner/repo`

### Private repos
Supports git credential helpers and token-based auth.

## Managed restrictions

Use `strictKnownMarketplaces` to control which marketplaces users can add.

## See also

- Discover and install plugins
- Plugins
- Plugins reference
