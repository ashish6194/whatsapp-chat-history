<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/hooks-guide -->

# Automate workflows with hooks

> Run shell commands automatically when Claude Code edits files, finishes tasks, or needs input.

Hooks are user-defined shell commands that execute at specific lifecycle points, providing deterministic control over behavior.

## Common use cases

### Get notified when Claude needs input
```json
{
  "hooks": {
    "Notification": [{
      "matcher": "",
      "hooks": [{
        "type": "command",
        "command": "osascript -e 'display notification \"Claude needs attention\" with title \"Claude Code\"'"
      }]
    }]
  }
}
```

### Auto-format code after edits
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
      }]
    }]
  }
}
```

### Block edits to protected files
Create a script that checks against protected patterns and exits with code 2 to block.

### Re-inject context after compaction
Use `SessionStart` with `compact` matcher to restore important context.

## Hook types

- **command**: shell scripts
- **http**: POST to endpoints
- **prompt**: single-turn LLM decisions
- **agent**: multi-turn verification with tool access

## How hooks work

| Event | When it fires |
|:------|:-------------|
| SessionStart | Session begins or resumes |
| PreToolUse | Before tool call executes |
| PostToolUse | After tool call succeeds |
| Stop | When Claude finishes responding |
| Notification | When Claude needs attention |

## Configuration locations

| Location | Scope |
|:---------|:------|
| `~/.claude/settings.json` | All projects |
| `.claude/settings.json` | Single project |
| `.claude/settings.local.json` | Local only |

## See also

- Hooks reference (full event schemas)
- Skills
- Plugins
