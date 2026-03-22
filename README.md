# use-claude

Complete Claude Code configuration reference and generator. Contains every file Claude Code recognizes, with best-practice examples sourced from Anthropic's official docs and industry patterns.

## Quick Start

### Set up a new project
```bash
cd use-claude
claude
> /init-project /path/to/your/project
```

The `/init-project` skill auto-detects your stack and generates:
- CLAUDE.md (under 200 lines, tailored to your project)
- .claude/settings.json (permissions + hooks for your stack)
- Skills, agents, hooks, and rules copied to your project

### Manual setup
```bash
# Copy config files to your project
cp -r use-claude/.claude/skills/ your-project/.claude/skills/
cp -r use-claude/.claude/agents/ your-project/.claude/agents/
cp -r use-claude/.claude/hooks/ your-project/.claude/hooks/
cp -r use-claude/.claude/rules/ your-project/.claude/rules/
cp use-claude/templates/settings-template.json your-project/.claude/settings.json

# Use the blueprint to write your CLAUDE.md
# See templates/claude-md-blueprint.md
```

## What's Inside

### Configuration Files (.claude/)

| File | What it does | When it's used |
|------|-------------|----------------|
| `CLAUDE.md` | Project memory — loaded every session | Always |
| `.claude/settings.json` | Permissions + hooks | Always |
| `.claude/settings.local.json` | Personal overrides (gitignored) | Always |
| `.claude/.mcp.json` | External service connections | Always |
| `.claude/rules/*.md` | Path-scoped rules | When matching files are touched |
| `.claude/skills/*/SKILL.md` | Reusable workflows | When invoked or auto-detected |
| `.claude/agents/*.md` | Specialized subagents | When spawned |
| `.claude/hooks/*.sh` | Automation scripts | On matching events |

### Skills (invoke with `/name`)

| Skill | Purpose |
|-------|---------|
| `/init-project` | Generate Claude Code config for any project |
| `/quick-refactor` | Refactoring with before/after verification |
| `/pr-ready` | Pre-PR checklist: tests, lint, types, commit |
| `/debug-loop` | Systematic reproduce → isolate → fix → verify |
| `/fix-issue` | GitHub issue → investigate → fix → test → PR |

### Agents

| Agent | Purpose |
|-------|---------|
| `researcher` | Codebase exploration in isolated context |
| `test-runner` | Run tests and report structured results |
| `code-reviewer` | Security + quality review |

### Templates

| File | Purpose |
|------|---------|
| `claude-md-blueprint.md` | CLAUDE.md structure guide |
| `settings-template.json` | Settings with common permissions + hooks |
| `hooks-catalog.md` | 10 hook patterns with examples |
| `rules-examples.md` | Path-scoped rules for various stacks |

### Guides

| Guide | What you'll learn |
|-------|-------------------|
| `how-claude-works.md` | Agentic loop, tools, context management |
| `precedence-and-loading.md` | Settings hierarchy, instruction load order |
| `mcp-setup.md` | MCP server setup with .mcp.json examples |
| `prompt-cookbook.md` | Proven prompt templates for 10+ task types |
| `ci-cd-integration.md` | GitHub Actions, non-interactive mode, pipelines |

### Documentation (docs/)

Full offline copy of all 67 official Anthropic Claude Code documentation pages.

## Customizing Per Project

| File | What to change |
|------|---------------|
| `CLAUDE.md` | Build commands, stack, architecture, conventions |
| `.claude/settings.json` | Permissions for your CLI tools |
| `.claude/.mcp.json` | Connect your services (DB, issue tracker) |
| `.claude/rules/` | Add rules for your file types |
| `.claude/hooks/` | Adjust formatter (prettier, dart format, black, etc.) |

## Sources

- [Anthropic Official Best Practices](https://code.claude.com/docs/en/best-practices)
- [Extend Claude Code](https://code.claude.com/docs/en/features-overview)
- [Hooks Guide](https://code.claude.com/docs/en/hooks-guide)
- [Writing a good CLAUDE.md — HumanLayer](https://www.humanlayer.dev/blog/writing-a-good-claude-md)
- [CLAUDE.md Guide — Builder.io](https://www.builder.io/blog/claude-md-guide)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
