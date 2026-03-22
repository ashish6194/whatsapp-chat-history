<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/sandboxing -->

# Sandboxing

> OS-level filesystem and network isolation for safer agent execution.

## Enable

Run `/sandbox` to enable. Uses Seatbelt on macOS, bubblewrap on Linux.

## Modes

- **Auto-allow**: sandboxed commands run without permission prompts
- **Regular permissions**: standard permission flow with sandbox enforcement

## Filesystem isolation

- Default: read/write to current directory only
- Configure with `sandbox.filesystem.allowWrite`

## Network isolation

- Domain restrictions via proxy
- Configure allowed domains

## Security benefits

- Protection against prompt injection
- Reduced attack surface
- Transparent operation with notifications

## See also

- Security, Permissions, Settings
