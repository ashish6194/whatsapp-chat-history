<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/desktop -->

# Use Claude Code Desktop

> Get more out of Claude Code Desktop: parallel sessions, visual diff review, app previews, PR monitoring, permission modes, connectors, and enterprise configuration.

The Code tab within the Claude Desktop app lets you use Claude Code through a graphical interface.

## Key capabilities

- Visual diff review with inline comments
- Live app preview with dev servers
- GitHub PR monitoring with auto-fix and auto-merge
- Parallel sessions with automatic Git worktree isolation
- Scheduled tasks
- Connectors for GitHub, Slack, Linear, and more
- Local, SSH, and cloud environments

## Start a session

Configure: environment (Local/Remote/SSH), project folder, model, and permission mode.

## Work with code

### Permission modes

| Mode                   | Behavior                                            |
| ---------------------- | --------------------------------------------------- |
| Ask permissions        | Claude asks before editing files or running commands |
| Auto accept edits      | Auto-accepts file edits, asks for commands           |
| Plan mode              | Analyzes code without modifying files               |
| Bypass permissions     | Runs without prompts (enable in Settings)           |

### Preview your app

Claude can start a dev server and open an embedded browser. Configure via `.claude/launch.json`.

### Review changes with diff view

Click the diff stats indicator to open the diff viewer. Comment on specific lines.

### Monitor pull request status

CI status bar with auto-fix and auto-merge toggles. Requires `gh` CLI.

## Manage sessions

### Work in parallel

Click + New session. Each gets its own Git worktree.

### Run long-running tasks remotely

Select Remote for cloud infrastructure sessions.

### Continue in another surface

Move sessions to web or IDE.

## Extend Claude Code

- **Connectors**: GitHub, Slack, Linear, etc.
- **Skills**: type `/` to browse
- **Plugins**: click + > Plugins to browse/install

## Schedule recurring tasks

Set up automated tasks: daily code reviews, dependency checks, etc.

## Environment configuration

- **Local**: runs on your machine
- **Remote**: runs on Anthropic cloud infrastructure
- **SSH**: runs on remote machine over SSH

## Enterprise configuration

- Admin console controls
- Managed settings
- Device management policies (MDM on macOS, group policy on Windows)

## Troubleshooting

- 403/authentication errors: sign out and back in
- Blank/stuck screen: restart app
- Failed to load session: try different folder
- Git and Git LFS errors: install required tools
