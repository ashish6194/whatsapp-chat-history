<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/sub-agents -->

# Subagents

> Delegate tasks to isolated workers that run in their own context window.

Subagents run in separate context, do work, and return summaries to your main conversation.

## Built-in subagents

- Explore: codebase research
- Plan: detailed planning
- Bash: long-running commands

## Create custom subagents

Add markdown files to `.claude/agents/`:

```markdown
---
name: security-reviewer
description: Reviews code for security vulnerabilities
tools: Read, Grep, Glob, Bash
model: opus
---

You are a senior security engineer...
```

## Frontmatter options

- `name`, `description`, `model`, `effort`
- `tools`, `disallowedTools`
- `skills`: preloaded skills
- `maxTurns`: turn limit
- `isolation`: `worktree` for git isolation
- `memory`: enable persistent memory

## See also

- Agent teams, Skills, Features overview
