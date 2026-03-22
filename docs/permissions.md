<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/permissions -->

# Configure permissions

> Control what Claude Code can access with permission rules, modes, and managed policies.

## Permission system

| Tool type | Example | Approval required |
|:----------|:--------|:-----------------|
| Read-only | File reads, Grep | No |
| Bash commands | Shell execution | Yes |
| File modification | Edit/write files | Yes |

## Permission modes

| Mode | Description |
|:-----|:-----------|
| `default` | Prompts for permission |
| `acceptEdits` | Auto-accepts file edits |
| `plan` | Read-only analysis |
| `dontAsk` | Auto-denies unless pre-approved |
| `bypassPermissions` | Skips prompts (use with caution) |

## Permission rule syntax

- `Bash(npm run *)` - wildcard matching
- `Read(./.env)` - file-specific
- `WebFetch(domain:example.com)` - domain-specific
- `mcp__server__tool` - MCP tools

## Managed settings

Organization-wide settings that cannot be overridden.

## See also

- Settings, Sandboxing, Security, Hooks
