<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/channels -->

# Push events into a running session with channels

> Use channels to push messages, alerts, and webhooks into your Claude Code session from an MCP server.

> **Note:** Channels are in research preview and require Claude Code v2.1.80 or later. They require claude.ai login.

A channel is an MCP server that pushes events into your running Claude Code session, so Claude can react to things that happen while you're not at the terminal.

## Supported channels

Each supported channel is a plugin that requires Bun.

### Telegram

1. Create a Telegram bot via BotFather
2. Install the plugin: `/plugin install telegram@claude-plugins-official`
3. Configure your token: `/telegram:configure <token>`
4. Restart with channels: `claude --channels plugin:telegram@claude-plugins-official`
5. Pair your account by messaging the bot

### Discord

1. Create a Discord bot in the Developer Portal
2. Enable Message Content Intent
3. Invite the bot to your server
4. Install the plugin: `/plugin install discord@claude-plugins-official`
5. Configure your token: `/discord:configure <token>`
6. Restart with channels: `claude --channels plugin:discord@claude-plugins-official`
7. Pair your account by DMing the bot

## Quickstart

Fakechat is an officially supported demo channel that runs a chat UI on localhost.

1. Install: `/plugin install fakechat@claude-plugins-official`
2. Restart: `claude --channels plugin:fakechat@claude-plugins-official`
3. Open http://localhost:8787 and type a message

## Security

Every approved channel plugin maintains a sender allowlist. Only IDs you've added can push messages.

## Enterprise controls

| Plan type                  | Default behavior                                               |
| :------------------------- | :------------------------------------------------------------- |
| Pro / Max, no organization | Channels available; users opt in per session with `--channels` |
| Team / Enterprise          | Channels disabled until an admin explicitly enables them       |

## How channels compare

| Feature                  | What it does                                                  | Good for                                                  |
| ------------------------ | ------------------------------------------------------------- | --------------------------------------------------------- |
| Claude Code on the web   | Runs tasks in a fresh cloud sandbox                           | Delegating self-contained async work                      |
| Claude in Slack          | Spawns a web session from an @Claude mention                  | Starting tasks from team conversation context             |
| Standard MCP server      | Claude queries it during a task                               | On-demand access to read or query a system                |
| Remote Control           | Drive your local session from claude.ai or mobile app         | Steering an in-progress session while away from your desk |

## Next steps

- Build your own channel (channels reference)
- Remote Control
- Scheduled tasks
