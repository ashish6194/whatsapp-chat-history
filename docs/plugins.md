<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/plugins -->

# Create plugins

> Create custom plugins to extend Claude Code with skills, agents, hooks, and MCP servers.

## Quickstart

1. Create plugin directory with `.claude-plugin/plugin.json`
2. Add skills in `skills/` directory
3. Test with `claude --plugin-dir ./my-plugin`

## Plugin structure

| Directory | Purpose |
|:----------|:--------|
| `.claude-plugin/` | Contains plugin.json manifest |
| `commands/` | Skill markdown files |
| `agents/` | Custom agent definitions |
| `skills/` | Agent Skills with SKILL.md |
| `hooks/` | Event handlers |
| `.mcp.json` | MCP server configs |
| `.lsp.json` | LSP server configs |

## Features

- Skills, agents, hooks, MCP servers, LSP servers
- Namespaced commands (`/plugin-name:skill`)
- Ship default settings
- Convert from standalone configs

## See also

- Discover plugins, Plugin marketplaces, Plugins reference
