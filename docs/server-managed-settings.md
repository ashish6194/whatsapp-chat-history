<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/server-managed-settings -->

# Configure server-managed settings (public beta)

> Centrally configure Claude Code through server-delivered settings without device management infrastructure.

Available for Teams and Enterprise plans. Settings delivered from Anthropic servers at authentication time.

## Configure

1. Open Admin Settings > Claude Code > Managed settings on Claude.ai
2. Define settings as JSON
3. Save and deploy

Clients receive updates on startup and hourly polling.

## Requirements

- Claude for Teams or Enterprise
- Claude Code v2.1.38+ (Teams) or v2.1.30+ (Enterprise)
- Network access to api.anthropic.com

## Precedence

Server-managed settings are highest priority. Cannot be overridden by any other settings level.

## See also

- Settings, Permissions, Authentication, Security
