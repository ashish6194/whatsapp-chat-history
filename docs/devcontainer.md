<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/devcontainer -->

# Development containers

> Learn about the Claude Code development container for consistent, secure environments.

The reference devcontainer setup offers a preconfigured development container you can use as is or customize. Works with VS Code Dev Containers extension and similar tools.

## Key features

- Production-ready Node.js (Node.js 20)
- Security by design with custom firewall
- Developer-friendly tools (git, ZSH, fzf)
- VS Code integration
- Session persistence
- Cross-platform compatibility (macOS, Windows, Linux)

## Getting started

1. Install VS Code and Remote - Containers extension
2. Clone the Claude Code reference implementation
3. Open in VS Code
4. Click "Reopen in Container"

## Configuration

- **devcontainer.json**: container settings, extensions, volume mounts
- **Dockerfile**: container image and installed tools
- **init-firewall.sh**: network security rules

## Security features

- Precise access control with whitelisted domains
- Allowed outbound DNS and SSH connections
- Default-deny policy
- Startup verification
- Isolation from main system

## Customization

- Add/remove VS Code extensions
- Modify resource allocations
- Adjust network permissions
- Customize shell configurations

## Use cases

- Secure client work isolation
- Team onboarding
- Consistent CI/CD environments

## Related resources

- VS Code devcontainers documentation
- Claude Code security best practices
- Enterprise network configuration
