<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/skills -->

# Skills

> Give Claude domain knowledge and reusable workflows with SKILL.md files.

Skills extend what Claude knows with information specific to your project, team, or domain. They load on demand when relevant.

## Create a skill

Add a directory with SKILL.md to `.claude/skills/`:

```markdown
---
name: deploy
description: Deployment workflow
disable-model-invocation: true
---

Deploy the application following these steps...
```

Invoke with `/deploy`.

## Bundled skills

Built-in: `/simplify`, `/batch`, `/debug`, `/commit`, and more.

## Frontmatter options

- `name`, `description`: identify the skill
- `disable-model-invocation`: only triggered manually
- `context`: `fork` for isolated execution
- `effort`: override effort level
- `model`: override model

## Where skills live

- `.claude/skills/` (project)
- `~/.claude/skills/` (user)
- Plugin `skills/` directories

## See also

- Features overview, Subagents, Plugins
