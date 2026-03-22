<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/changelog -->

# Claude Code Changelog

Release notes for Claude Code, including new features, improvements, and bug fixes organized by version.

## Latest Release: 2.1.81 (March 20, 2026)

### New Features
- Added `--bare` flag for scripted `-p` calls -- skips hooks, LSP, plugin sync, and skill directory walks
- Added `--channels` permission relay -- channel servers can forward tool approval prompts to your phone
- Resumed sessions now switch back to their original worktree

### Bug Fixes
- Fixed multiple concurrent Claude Code sessions requiring repeated re-authentication
- Fixed voice mode silently swallowing retry failures
- Fixed voice mode audio not recovering from dropped WebSocket connections
- Fixed `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` not suppressing structured-outputs beta header
- Fixed plugin hooks blocking prompt submission when plugin directory is deleted
- Fixed race condition where background agent task output could hang indefinitely
- Fixed `/btw` not including pasted text during active responses
- Fixed terminal tab title not updating with auto-generated session description
- Fixed Remote Control sessions showing generic title
- Fixed `/rename` not syncing title for Remote Control sessions
- Fixed Remote Control `/exit` not reliably archiving sessions

### Improvements
- Improved MCP read/search tool calls to collapse into single line (expandable with Ctrl+O)
- Improved `!` bash mode discoverability
- Improved plugin freshness -- ref-tracked plugins re-clone on every load
- Improved Remote Control session titles to refresh after third message
- Updated MCP OAuth to support Client ID Metadata Document (CIMD / SEP-991)
- Changed plan mode to hide "clear context" option by default
- Disabled line-by-line response streaming on Windows due to rendering issues
- Fixed Windows PATH inheritance for Bash tool when using Git Bash

## Key Features Introduced in Recent Versions

- Auto-memory system
- Agent Teams (research preview)
- Remote Control
- Customizable keybindings
- Task management system
- Fast mode for Opus 4.6
- MCP elicitation support
- Voice mode improvements (20 languages, push-to-talk, STT support)

## Check Your Version

```bash
claude --version
```
