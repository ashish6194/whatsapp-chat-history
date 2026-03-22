<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/discover-plugins -->

# Discover and install prebuilt plugins through marketplaces

> Find and install plugins from marketplaces to extend Claude Code.

## How marketplaces work

1. Add the marketplace (registers the catalog)
2. Install individual plugins

## Official Anthropic marketplace

Automatically available. Browse with `/plugin` > Discover tab, or view at claude.com/plugins.

```shell
/plugin install github@claude-plugins-official
```

### Code intelligence

Plugins that enable LSP tool for precise code navigation:

| Language   | Plugin              | Binary required              |
| :--------- | :------------------ | :--------------------------- |
| C/C++      | `clangd-lsp`        | `clangd`                     |
| C#         | `csharp-lsp`        | `csharp-ls`                  |
| Go         | `gopls-lsp`         | `gopls`                      |
| Java       | `jdtls-lsp`         | `jdtls`                      |
| Kotlin     | `kotlin-lsp`        | `kotlin-language-server`     |
| Python     | `pyright-lsp`       | `pyright-langserver`         |
| Rust       | `rust-analyzer-lsp` | `rust-analyzer`              |
| TypeScript | `typescript-lsp`    | `typescript-language-server` |

### External integrations

- Source control: github, gitlab
- Project management: atlassian, asana, linear, notion
- Design: figma
- Infrastructure: vercel, firebase, supabase
- Communication: slack
- Monitoring: sentry

### Development workflows

- commit-commands, pr-review-toolkit, agent-sdk-dev, plugin-dev

## Add marketplaces

```shell
# GitHub
/plugin marketplace add anthropics/claude-code

# Git URLs
/plugin marketplace add https://gitlab.com/company/plugins.git

# Local paths
/plugin marketplace add ./my-marketplace
```

## Install plugins

```shell
/plugin install plugin-name@marketplace-name
```

Scopes: user, project, local, managed.

## Manage plugins

- `/plugin disable`, `/plugin enable`, `/plugin uninstall`
- `/reload-plugins` to apply changes without restarting

## Troubleshooting

- `/plugin` command not recognized: update Claude Code to v1.0.33+
- Plugin skills not appearing: clear cache and reinstall
- Language server issues: verify binary is in PATH

## Next steps

- Build your own plugins
- Create a marketplace
- Plugins reference
