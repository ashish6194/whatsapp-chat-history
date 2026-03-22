<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/claude-code-on-the-web -->

# Claude Code on the web

> Run Claude Code tasks asynchronously on secure cloud infrastructure.

Claude Code on the web lets developers kick off Claude Code from the Claude app. Perfect for:

- Answering questions about code architecture
- Bug fixes and routine tasks
- Parallel work on multiple bug fixes
- Repositories not on your local machine
- Backend changes with test-driven development

## Who can use it

Available in research preview to Pro, Max, Team, and Enterprise users.

## Getting started

1. Visit claude.ai/code
2. Connect your GitHub account
3. Install the Claude GitHub app
4. Select your default environment
5. Submit your coding task
6. Review changes in diff view, iterate, then create a PR

## How it works

1. Repository cloning to an Anthropic-managed VM
2. Environment setup with your setup script
3. Network configuration based on settings
4. Task execution
5. Notification on completion
6. Changes pushed to a branch for PR creation

## Moving tasks between web and terminal

### From terminal to web

```bash
claude --remote "Fix the authentication bug in src/auth/login.ts"
```

### From web to terminal

- `/teleport` or `/tp` from within Claude Code
- `claude --teleport` from the command line
- `/tasks` then press `t` to teleport
- "Open in CLI" from the web interface

## Cloud environment

### Default image

Includes popular languages, build tools, package managers, testing frameworks. Run `check-tools` to see what's available.

### Setup scripts

Bash scripts that run when a new cloud session starts, before Claude Code launches.

```bash
#!/bin/bash
apt update && apt install -y gh
```

### Network access

Default: limited to allowlisted domains. Configurable to no internet or full access.

## Security and isolation

- Isolated virtual machines per session
- Network access controls
- Credential protection through secure proxy
- Code analyzed within isolated VMs

## Limitations

- Only works with GitHub-hosted code
- Repository authentication requires same account
- Session handoff is one-way (web to terminal only for existing sessions)

## Related resources

- Hooks configuration
- Settings reference
- Security
- Data usage
