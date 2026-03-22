# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

This is a Claude Code configuration reference and generator. It contains every file Claude Code recognizes, with best-practice examples. Use it to set up Claude Code configs for any project.

## How to Use

- Run `/init-project <path>` to auto-generate configs for any project
- See `templates/` for customizable starting points
- See `guides/` for how Claude Code works internally
- See `docs/` for full offline Anthropic documentation

## Key Skill: /init-project

The core workflow. Detects any project's stack and generates:
- CLAUDE.md (under 200 lines, following the blueprint)
- .claude/settings.json (stack-appropriate permissions + hooks)
- Copies skills, agents, and hooks to the target project

## Repo Structure

- `.claude/` — Working config examples (settings, hooks, rules, skills, agents)
- `templates/` — Customizable templates (CLAUDE.md blueprint, settings, hooks catalog)
- `guides/` — Educational docs (agentic loop, precedence, MCP, prompts, CI/CD)
- `docs/` — Full offline Anthropic Claude Code documentation
- `tips.md` — Shortcuts, prompt patterns, anti-patterns cheat sheet
