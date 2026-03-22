<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/hooks -->

# Hooks reference

> Complete reference for hook events, configuration, JSON formats, and lifecycle management.

Hooks are user-defined commands that execute automatically at specific points in Claude Code's lifecycle.

## Hook lifecycle

SessionStart -> UserPromptSubmit -> [PreToolUse -> PermissionRequest -> PostToolUse] -> Stop -> SessionEnd

Plus: Notification, ConfigChange, WorktreeCreate/Remove, PreCompact/PostCompact, etc.

## Configuration

### Hook locations

| Location | Scope |
|----------|-------|
| `~/.claude/settings.json` | All projects |
| `.claude/settings.json` | Single project |
| `.claude/settings.local.json` | Single project (gitignored) |
| Plugin `hooks/hooks.json` | When plugin enabled |

### Basic structure

```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "regex_pattern",
        "hooks": [
          {
            "type": "command",
            "command": "script.sh",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

## Hook types

- **command**: shell command
- **http**: POST to URL endpoint
- **prompt**: single-turn LLM evaluation
- **agent**: multi-turn with tool access

## Exit codes

- **0**: Success, proceed
- **2**: Block the action, stderr fed to Claude
- **Other**: Non-blocking error

## Key events

### PreToolUse
Control via `permissionDecision`: "allow", "deny", or "ask"

### PostToolUse
Runs after tool completion. Cannot undo actions.

### Stop
Fires when Claude finishes responding. Can block to force continuation.

### SessionStart
Fires on session begin/resume. Can set environment variables.

### Notification
Fires when Claude needs attention.

## Decision control

- PreToolUse: `permissionDecision` field
- PermissionRequest: `decision.behavior` field
- Stop/PostToolUse: top-level `decision: "block"`

## See also

- Hooks guide (practical examples)
- Settings reference
- Permissions
