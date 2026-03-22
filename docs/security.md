<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/security -->

# Security

> Security safeguards and best practices for Claude Code.

## Security foundation

Built with security at its core. SOC 2 Type 2 certified. See [Anthropic Trust Center](https://trust.anthropic.com).

## Permission-based architecture

Strict read-only by default. Explicit permission required for edits, tests, and commands.

## Built-in protections

- Sandboxed bash tool
- Write access restricted to working directory
- Prompt fatigue mitigation
- Accept Edits mode

## Prompt injection protections

- Permission system
- Context-aware analysis
- Input sanitization
- Command blocklist
- Network request approval
- Trust verification
- Secure credential storage

## Cloud execution security

- Isolated VMs per session
- Network access controls
- Credential protection via proxy
- Branch restrictions
- Audit logging

## Best practices

- Review all changes before approval
- Use project-specific permissions
- Consider devcontainers for isolation
- Use managed settings for org standards

## Report vulnerabilities

Via [HackerOne](https://hackerone.com/anthropic-vdp/reports/new?type=team&report_type=vulnerability).

## See also

- Sandboxing, Permissions, Monitoring, Devcontainer
