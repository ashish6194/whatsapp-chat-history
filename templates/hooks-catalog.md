# Hooks Catalog

All useful hook patterns for Claude Code. Copy the JSON into your `.claude/settings.json` under `"hooks"`.

## Hook Events Reference

| Event | When it fires | Matcher filters |
|-------|--------------|-----------------|
| SessionStart | Session begins/resumes | startup, resume, clear, compact |
| UserPromptSubmit | You submit a prompt | (no matcher) |
| PreToolUse | Before a tool executes | tool name (Bash, Edit, Write, etc.) |
| PostToolUse | After a tool succeeds | tool name |
| PostToolUseFailure | After a tool fails | tool name |
| PermissionRequest | Permission dialog appears | tool name |
| Notification | Claude needs attention | permission_prompt, idle_prompt |
| Stop | Claude finishes responding | (no matcher) |
| SubagentStart/Stop | Subagent lifecycle | agent type |
| ConfigChange | Settings/skills change | user_settings, project_settings, skills |
| PreCompact/PostCompact | Context compaction | manual, auto |
| SessionEnd | Session terminates | clear, resume, logout |

## Exit Codes

- **Exit 0** — allow the action
- **Exit 2** — block the action (stderr becomes Claude's feedback)
- **Other** — allow, stderr logged but not shown

---

## Pattern 1: Desktop Notification (macOS)

Alert when Claude needs your input.

```json
"Notification": [{
  "matcher": "",
  "hooks": [{
    "type": "command",
    "command": "osascript -e 'display notification \"Claude Code needs your attention\" with title \"Claude Code\"'"
  }]
}]
```

**Linux:** Replace with `notify-send 'Claude Code' 'Needs your attention'`

---

## Pattern 2: Auto-Format After Edits

Run formatter after every file edit.

```json
"PostToolUse": [{
  "matcher": "Edit|Write",
  "hooks": [{
    "type": "command",
    "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
  }]
}]
```

**Dart:** Replace with `dart format`
**Python:** Replace with `black --quiet` or `ruff format`
**Rust:** Replace with `rustfmt`
**Go:** Replace with `gofmt -w`

---

## Pattern 3: Block Protected Files

Prevent edits to sensitive files.

```json
"PreToolUse": [{
  "matcher": "Edit|Write",
  "hooks": [{
    "type": "command",
    "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-files.sh"
  }]
}]
```

See `.claude/hooks/protect-files.sh` for the script that checks against protected patterns.

---

## Pattern 4: Re-inject Context After Compaction

Remind Claude of critical info after context is compacted.

```json
"SessionStart": [{
  "matcher": "compact",
  "hooks": [{
    "type": "command",
    "command": "echo 'Reminder: use pnpm, not npm. Run tests before committing. Current sprint: auth refactor.'"
  }]
}]
```

---

## Pattern 5: Log All Bash Commands

Audit trail of every command Claude runs.

```json
"PostToolUse": [{
  "matcher": "Bash",
  "hooks": [{
    "type": "command",
    "command": "jq -r '.tool_input.command' >> ~/.claude/command-log.txt"
  }]
}]
```

---

## Pattern 6: Verify Tasks Complete (Prompt Hook)

Ask an LLM to check if all requested tasks are done before stopping.

```json
"Stop": [{
  "hooks": [{
    "type": "prompt",
    "prompt": "Check if all tasks are complete. If not, respond with {\"ok\": false, \"reason\": \"what remains\"}."
  }]
}]
```

---

## Pattern 7: Auto-Approve Plan Mode Exit

Skip the approval dialog when exiting plan mode.

```json
"PermissionRequest": [{
  "matcher": "ExitPlanMode",
  "hooks": [{
    "type": "command",
    "command": "echo '{\"hookSpecificOutput\": {\"hookEventName\": \"PermissionRequest\", \"decision\": {\"behavior\": \"allow\"}}}'"
  }]
}]
```

---

## Pattern 8: Run Tests After Code Changes (Agent Hook)

Spawn a subagent to verify tests pass after Claude makes changes.

```json
"Stop": [{
  "hooks": [{
    "type": "agent",
    "prompt": "Verify all unit tests pass. Run the test suite and check results.",
    "timeout": 120
  }]
}]
```

---

## Pattern 9: Clean Up on Session End

Remove temp files when clearing context.

```json
"SessionEnd": [{
  "matcher": "clear",
  "hooks": [{
    "type": "command",
    "command": "rm -f /tmp/claude-scratch-*.txt"
  }]
}]
```

---

## Pattern 10: HTTP Webhook on Tool Use

POST tool usage to an external service.

```json
"PostToolUse": [{
  "hooks": [{
    "type": "http",
    "url": "http://localhost:8080/hooks/tool-use",
    "headers": {"Authorization": "Bearer $MY_TOKEN"},
    "allowedEnvVars": ["MY_TOKEN"]
  }]
}]
```
