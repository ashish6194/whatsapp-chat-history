<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/settings -->

# Claude Code settings

> Configure Claude Code with global and project-level settings and environment variables.

## Configuration scopes

| Scope | Location | Who it affects |
|:------|:---------|:--------------|
| Managed | System-level or server-managed | All users |
| User | `~/.claude/` | You, all projects |
| Project | `.claude/` in repo | All collaborators |
| Local | `.claude/settings.local.json` | You, this repo only |

## Settings files

- `~/.claude/settings.json` (user)
- `.claude/settings.json` (project, committed)
- `.claude/settings.local.json` (local, gitignored)
- Managed settings (system-level or server-delivered)

## Settings precedence

Managed > CLI args > Local > Project > User

## Key settings

- `permissions.allow/deny/ask`: permission rules
- `model`: default model
- `hooks`: hook configurations
- `env`: environment variables
- `sandbox`: sandbox configuration
- `autoMemoryEnabled`: auto memory toggle
- `availableModels`: restrict model selection
- `outputStyle`: response style

## See also

- Permissions, Environment variables, Server-managed settings
