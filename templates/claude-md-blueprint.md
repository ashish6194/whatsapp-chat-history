# CLAUDE.md Blueprint

Use this as a template when creating CLAUDE.md for any project. Keep the final file under 200 lines. Only include what Claude can't figure out by reading the code.

---

## Template Structure

```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Test
<!-- Commands Claude needs to run. Only include non-obvious ones. -->
- `<build command>` — build the project
- `<test command>` — run all tests
- `<single test command>` — run a single test
- `<lint command>` — run linter
- `<type check command>` — check types (if applicable)

## Tech Stack
<!-- Language, framework, key dependencies. One line each. -->
- <Language> <version> + <Framework> <version>
- <Database/Backend service>
- <Testing framework>
- <Key libraries worth knowing>

## Architecture
<!-- High-level structure. How components connect. Data flow. -->
- <Pattern> (e.g., "Monolith: frontend + backend in one app")
- <Key architectural decisions>
- <Where things live> (e.g., "API routes in app/api/, pure logic in lib/")

## Conventions
<!-- Non-obvious rules Claude wouldn't know from reading code. -->
- <Rule 1> (e.g., "Prefer server components; use 'use client' only when needed")
- <Rule 2> (e.g., "All data tables have Row Level Security enabled")
- <Rule 3>

## Key Files
<!-- Entry points and core logic files worth knowing about. -->
- `<path>` — <what it does>
- `<path>` — <what it does>

## Rules
<!-- Guardrails. What to never do, what to always do. -->
- Never <dangerous thing>
- Always <important practice>
- <Additional guardrail>
```

---

## Guidelines for Writing

**Include:**
- Commands Claude can't guess (custom scripts, unusual test runners)
- Code style rules that differ from language defaults
- Architectural decisions specific to your project
- Common gotchas or non-obvious behaviors
- Developer environment quirks (required env vars, setup steps)

**Exclude:**
- Anything Claude can figure out by reading the code
- Standard language conventions Claude already knows
- Detailed API documentation (link to docs instead with @path)
- Information that changes frequently
- File-by-file descriptions (Claude can explore)
- Self-evident practices ("write clean code", "handle errors")

**Tips:**
- For each line, ask: "Would removing this cause Claude to make mistakes?" If not, cut it
- Use emphasis (IMPORTANT, NEVER, ALWAYS) for critical rules
- Use @path/to/file imports for detailed docs that don't need to be in every session
- Split into .claude/rules/ for file-type-specific rules
- Target under 200 lines — longer files reduce adherence
