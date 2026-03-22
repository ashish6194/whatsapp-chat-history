<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/interactive-mode -->

# Interactive mode

> Keyboard shortcuts, input modes, and interactive features in Claude Code sessions.

## Keyboard shortcuts

### General controls

| Shortcut | Description |
|:---------|:-----------|
| `Ctrl+C` | Cancel current input or generation |
| `Ctrl+D` | Exit session |
| `Ctrl+G` | Open in text editor |
| `Ctrl+L` | Clear terminal screen |
| `Ctrl+O` | Toggle verbose output |
| `Ctrl+R` | Reverse search history |
| `Ctrl+B` | Background running tasks |
| `Ctrl+T` | Toggle task list |
| `Esc+Esc` | Rewind or summarize |
| `Shift+Tab` | Toggle permission modes |

### Multiline input

| Method | Shortcut |
|:-------|:---------|
| Quick escape | `\` + `Enter` |
| macOS | `Option+Enter` |
| Shift+Enter | Works in iTerm2, WezTerm, Ghostty, Kitty |

### Quick commands

| Shortcut | Description |
|:---------|:-----------|
| `/` | Command or skill |
| `!` | Bash mode (run commands directly) |
| `@` | File path autocomplete |

## Vim editor mode

Enable with `/vim`. Full vi keybindings for navigation and editing.

## Side questions with /btw

Ask quick questions without adding to conversation history:

```
/btw what was the name of that config file?
```

Available while Claude is working. No tool access. Single response.

## Task list

Press `Ctrl+T` to toggle. Shows pending, in-progress, and complete tasks.

## Background bash commands

Press `Ctrl+B` to move commands to background. Or prefix with `!` for direct bash execution.

## Prompt suggestions

Grayed-out suggestions appear based on git history and conversation. Press Tab to accept.

## See also

- Commands reference
- CLI reference
- Settings
- Memory management
