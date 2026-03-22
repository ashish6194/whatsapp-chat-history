<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/how-claude-code-works -->

# How Claude Code works

> Understand the agentic loop, built-in tools, and how Claude Code interacts with your project.

## The agentic loop

Claude works through three phases: gather context, take action, and verify results. These phases blend together using tools throughout.

### Models

Claude models understand code in any language, reason about tasks, and break work into steps. Multiple models available: Sonnet for most tasks, Opus for complex decisions.

### Tools

| Category | What Claude can do |
|----------|-------------------|
| File operations | Read, edit, create, rename files |
| Search | Find files, search content with regex |
| Execution | Run commands, tests, use git |
| Web | Search web, fetch documentation |
| Code intelligence | Type errors, jump to definitions (with plugins) |

## What Claude can access

- Your project files
- Your terminal and CLI tools
- Git state
- CLAUDE.md instructions
- Auto memory
- Configured extensions (MCP, skills, subagents)

## Work with sessions

Sessions are independent and saved locally. Each starts with fresh context.

### Resume or fork sessions

```bash
claude --continue        # Resume most recent
claude --resume          # Pick from list
claude --continue --fork-session  # Branch off
```

### The context window

Holds conversation history, file contents, command outputs, CLAUDE.md, and system instructions. Auto-compacts when full.

## Stay safe

### Checkpoints

Every file edit creates a snapshot. Press Esc twice to rewind.

### Permission modes

- **Default**: asks before edits and commands
- **Auto-accept edits**: edits without asking
- **Plan mode**: read-only analysis

## Work effectively

- Ask Claude Code for help
- Be specific upfront
- Give verification targets (tests, screenshots)
- Explore before implementing
- Delegate, don't dictate

## See also

- Common workflows
- Extend Claude Code (features overview)
- Best practices
