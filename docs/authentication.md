<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/authentication -->

# Authentication

> Log in to Claude Code and configure authentication for individuals, teams, and organizations.

Claude Code supports multiple authentication methods depending on your setup.

## Log in to Claude Code

After installing Claude Code, run `claude` in your terminal. On first launch, Claude Code opens a browser window for you to log in.

You can authenticate with:

- **Claude Pro or Max subscription**: log in with your Claude.ai account
- **Claude for Teams or Enterprise**: log in with the account your team admin invited you to
- **Claude Console**: log in with your Console credentials
- **Cloud providers**: set environment variables for Amazon Bedrock, Google Vertex AI, or Microsoft Foundry

To log out: type `/logout` at the Claude Code prompt.

## Set up team authentication

### Claude for Teams or Enterprise

1. Subscribe to Claude for Teams or contact sales for Enterprise
2. Invite team members from the admin dashboard
3. Team members install Claude Code and log in

### Claude Console authentication

1. Create or use a Console account
2. Add users (bulk invite or SSO)
3. Assign roles: **Claude Code** or **Developer**
4. Users accept invite, install, and log in

### Cloud provider authentication

1. Follow the provider setup docs (Bedrock, Vertex, or Foundry)
2. Distribute environment variables to users
3. Users install Claude Code

## Credential management

- **macOS**: credentials stored in encrypted macOS Keychain
- **Linux/Windows**: stored in `~/.claude/.credentials.json`
- **Custom credential scripts**: use `apiKeyHelper` setting
- **Refresh intervals**: default 5 minutes or on HTTP 401

### Authentication precedence

1. Cloud provider credentials (Bedrock, Vertex, Foundry)
2. `ANTHROPIC_AUTH_TOKEN` environment variable
3. `ANTHROPIC_API_KEY` environment variable
4. `apiKeyHelper` script output
5. Subscription OAuth credentials from `/login`
