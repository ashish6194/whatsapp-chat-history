---
name: init-project
description: Auto-detect a project's stack and generate Claude Code configuration (CLAUDE.md, settings, skills, agents, hooks)
disable-model-invocation: true
---

# Initialize Claude Code Configuration for a Project

Target project: $ARGUMENTS

## Workflow

1. **Detect the stack**: Read config files in the target project to identify:
   - Language and framework (package.json, pubspec.yaml, Cargo.toml, pyproject.toml, go.mod, Gemfile, Makefile, etc.)
   - Build/test/lint commands from scripts
   - Key dependencies
   - Project structure

2. **Generate CLAUDE.md**: Using the blueprint at `templates/claude-md-blueprint.md`, create a tailored CLAUDE.md with:
   - Build & Test commands (only ones Claude can't guess)
   - Tech Stack summary
   - Architecture overview (high-level patterns, data flow)
   - Conventions (non-obvious rules)
   - Key Files (entry points, core logic)
   - Rules (guardrails)
   - MUST be under 200 lines

3. **Create .claude/settings.json**: Generate permissions for discovered commands:
   - Allow common read-only commands (git status, git log, git diff)
   - Allow project-specific commands (npm test, flutter test, cargo test, pytest, etc.)
   - Add hooks: format-on-save (detect formatter), protect-files

4. **Copy reusable files** from this repo to the target project:
   - Skills: quick-refactor, pr-ready, debug-loop, fix-issue
   - Agents: researcher, test-runner, code-reviewer
   - Hooks: protect-files.sh, format-on-save.sh
   - Rules: code-style.md, testing.md, security.md

5. **Report**: List everything created and any manual steps needed (e.g., "install prettier for auto-formatting")
