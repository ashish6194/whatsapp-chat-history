<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/plugins-reference -->

# Plugins reference

> Complete technical reference for the Claude Code plugin system.

## Plugin components

- **Skills**: `skills/` directory with SKILL.md files
- **Agents**: `agents/` directory with markdown files
- **Hooks**: `hooks/hooks.json` configuration
- **MCP servers**: `.mcp.json` configuration
- **LSP servers**: `.lsp.json` configuration

## Plugin manifest schema

Required field: `name` (kebab-case). Optional: version, description, author, homepage, etc.

## Installation scopes

user, project, local, managed

## Environment variables

- `${CLAUDE_PLUGIN_ROOT}`: plugin installation directory
- `${CLAUDE_PLUGIN_DATA}`: persistent data directory

## CLI commands

- `claude plugin install/uninstall/enable/disable/update`
- `claude plugin validate`

## See also

- Plugins, Plugin marketplaces, Skills, Subagents, Hooks, MCP
