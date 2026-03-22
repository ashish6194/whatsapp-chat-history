<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/keybindings -->

# Customize keyboard shortcuts

> Customize keyboard shortcuts in Claude Code with a keybindings configuration file.

Run `/keybindings` to create or open `~/.claude/keybindings.json`. Changes are auto-detected.

## Contexts

Global, Chat, Autocomplete, Settings, Confirmation, Tabs, Help, Transcript, HistorySearch, Task, ThemePicker, Attachments, Footer, MessageSelector, DiffDialog, ModelPicker, Select, Plugin.

## Key actions

- `app:interrupt` (Ctrl+C), `app:exit` (Ctrl+D), `app:toggleTodos` (Ctrl+T)
- `chat:submit` (Enter), `chat:cycleMode` (Shift+Tab), `chat:externalEditor` (Ctrl+G)
- `history:search` (Ctrl+R), `history:previous/next` (Up/Down)

## Keystroke syntax

Use modifiers with `+`: `ctrl+k`, `shift+tab`, `meta+p`. Chords: `ctrl+k ctrl+s`.

## Reserved shortcuts

Ctrl+C and Ctrl+D cannot be rebound.

## See also

- Interactive mode
- Terminal configuration
