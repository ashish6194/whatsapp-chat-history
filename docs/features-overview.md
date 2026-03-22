<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/features-overview -->

# Extend Claude Code

> Understand when to use CLAUDE.md, Skills, subagents, hooks, MCP, and plugins.

## Overview

Extensions plug into different parts of the agentic loop:

- **CLAUDE.md**: persistent context every session
- **Skills**: reusable knowledge and invocable workflows
- **MCP**: connects to external services and tools
- **Subagents**: isolated context, returning summaries
- **Agent teams**: coordinate multiple independent sessions
- **Hooks**: deterministic scripts outside the loop
- **Plugins/Marketplaces**: package and distribute features

## Match features to your goal

| Feature      | What it does                                  | When to use it                              |
| ------------ | --------------------------------------------- | ------------------------------------------- |
| CLAUDE.md    | Persistent context loaded every conversation  | Project conventions, "always do X" rules    |
| Skill        | Instructions and workflows Claude can use     | Reusable content, repeatable tasks          |
| Subagent     | Isolated execution context                    | Context isolation, parallel tasks           |
| Agent teams  | Coordinate multiple sessions                  | Parallel research, competing hypotheses     |
| MCP          | Connect to external services                  | External data or actions                    |
| Hook         | Deterministic script on events                | Predictable automation                      |

## Compare similar features

### Skill vs Subagent

- Skills are reusable content for any context
- Subagents are isolated workers with own context

### CLAUDE.md vs Skill

- CLAUDE.md loads every session automatically
- Skills load on demand

### Subagent vs Agent team

- Subagents report back to main context
- Agent teams are independent sessions that communicate with each other

### MCP vs Skill

- MCP provides connections to external services
- Skills provide knowledge about how to use those services

## Context costs

| Feature    | When it loads    | Context cost        |
| ---------- | ---------------- | ------------------- |
| CLAUDE.md  | Session start    | Every request       |
| Skills     | When used        | Low until used      |
| MCP        | Session start    | Every request       |
| Subagents  | When spawned     | Isolated            |
| Hooks      | On trigger       | Zero                |

## Learn more

- CLAUDE.md (memory)
- Skills
- Subagents
- Agent teams
- MCP
- Hooks guide
- Plugins
- Marketplaces
