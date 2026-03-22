<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/channels-reference -->

# Channels reference

> Build an MCP server that pushes webhooks, alerts, and chat messages into a Claude Code session.

A channel is an MCP server that pushes events into a Claude Code session so Claude can react to things happening outside the terminal.

## Overview

A channel is an MCP server that runs on the same machine as Claude Code, communicating over stdio. Your channel server bridges external systems and the Claude Code session.

## What you need

- `@modelcontextprotocol/sdk` package
- A Node.js-compatible runtime (Bun, Node, or Deno)

Your server needs to:
1. Declare the `claude/channel` capability
2. Emit `notifications/claude/channel` events
3. Connect over stdio transport

## Example: build a webhook receiver

1. Create the project and install MCP SDK
2. Write the channel server (webhook.ts)
3. Register your server in `.mcp.json`
4. Test with `--dangerously-load-development-channels`

## Server options

| Field                                         | Type     | Description                                              |
| :-------------------------------------------- | :------- | :------------------------------------------------------- |
| `capabilities.experimental['claude/channel']` | `object` | Required. Always `{}`. Registers the notification listener |
| `capabilities.tools`                          | `object` | Two-way only. Standard MCP tool capability               |
| `instructions`                                | `string` | Added to Claude's system prompt                          |

## Notification format

| Field     | Type                     | Description                          |
| :-------- | :----------------------- | :----------------------------------- |
| `content` | `string`                 | The event body                       |
| `meta`    | `Record<string, string>` | Optional attributes on the channel tag |

## Expose a reply tool

For two-way channels, expose a standard MCP tool that Claude can call to send messages back.

1. Enable tool discovery with `tools: {}` in capabilities
2. Register the reply tool with ListToolsRequestSchema and CallToolRequestSchema handlers
3. Update instructions to tell Claude about the reply tool

## Gate inbound messages

Check the sender against an allowlist before calling `mcp.notification()`. Gate on sender identity, not chat/room identity.

## Package as a plugin

Wrap your channel in a plugin and publish it to a marketplace.

## See also

- Channels for installing existing channels
- MCP for the underlying protocol
- Plugins for packaging
