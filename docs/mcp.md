<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/mcp -->

# Connect Claude Code to tools via MCP

> Learn how to connect Claude Code to your tools with the Model Context Protocol.

MCP (Model Context Protocol) lets Claude Code interact with external services through a standardized protocol. Connect to databases, APIs, and tools.

## Installing MCP servers

### CLI commands
```bash
claude mcp add <name> -- <command> [args...]
claude mcp remove <name>
claude mcp list
```

### Configuration files

Project: `.mcp.json`
User: `~/.claude.json`

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "server-package"],
      "env": { "API_KEY": "value" }
    }
  }
}
```

## Scope hierarchy

local > project > user

## Use MCP resources

Reference with `@server:resource` syntax.

## Use MCP prompts as commands

Format: `/mcp__<server>__<prompt>`

## Scale with MCP tool search

When tool descriptions exceed 10% of context window, Claude Code defers them and loads on-demand.

## See also

- Features overview
- Settings
- Plugins
