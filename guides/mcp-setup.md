# MCP Setup Guide

MCP (Model Context Protocol) connects Claude Code to external services — databases, APIs, browsers, issue trackers. It's the most context-efficient way to give Claude access to tools beyond the terminal.

## Quick Setup

```bash
# Add an MCP server
claude mcp add <name> <command> [args...]

# List configured servers
claude mcp list

# Remove a server
claude mcp remove <name>

# Check status and token costs
/mcp  (in interactive mode)
```

## Configuration File: `.mcp.json`

MCP servers are configured in `.claude/.mcp.json`:

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-name"],
      "env": {
        "API_KEY": "your-key-here"
      }
    }
  }
}
```

## Scope Hierarchy

MCP servers can be configured at multiple levels (higher overrides lower):

```
1. Local (.claude/.mcp.json in project — gitignored)
2. Project (.claude/.mcp.json committed to git)
3. User (~/.claude/.mcp.json — all projects)
```

Same server name at different levels: local wins.

## Common Servers

### GitHub
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..."
      }
    }
  }
}
```
**Alternative**: Install the `gh` CLI. Claude knows how to use it without MCP.

### PostgreSQL
```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:pass@localhost/dbname"
      }
    }
  }
}
```

### Filesystem (additional directories)
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
    }
  }
}
```

### Puppeteer (browser automation)
```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

### Slack
```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-..."
      }
    }
  }
}
```

## Context Cost

- All MCP tool definitions load at session start
- Tool search (auto-enabled) loads tools up to 10% of context, deferring the rest
- Run `/mcp` to see per-server token costs
- Disconnect servers you're not actively using

## Permission Rules for MCP Tools

```json
{
  "permissions": {
    "allow": [
      "mcp__github__search_repositories",
      "mcp__postgres__*"
    ],
    "deny": [
      "mcp__postgres__execute_query"
    ]
  }
}
```

Tool names follow the pattern: `mcp__<server>__<tool>`

## Troubleshooting

- **Server not connecting**: Run `/mcp` to check status
- **Tools not appearing**: Server may have disconnected silently. Restart with `/mcp`
- **High token usage**: Check `/mcp` for per-server costs. Disconnect unused servers
- **Connection errors**: Verify the command works standalone: `npx -y @modelcontextprotocol/server-name`
