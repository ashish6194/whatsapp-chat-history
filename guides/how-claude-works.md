# How Claude Code Works

## The Agentic Loop

Claude Code works in a loop of three phases:

```
Your Prompt → Gather Context → Take Action → Verify Results → Repeat until done
```

1. **Gather Context**: Reads files, searches code, runs commands to understand the codebase
2. **Take Action**: Edits files, runs commands, creates code
3. **Verify Results**: Runs tests, checks output, compares against expectations

Claude chains dozens of tool uses together, course-correcting based on what it learns at each step. You can interrupt at any point with `Escape` to redirect.

## What Claude Can Access

When you run `claude` in a directory, it gets access to:

| Access | What |
|--------|------|
| **Your project** | Files in your directory and subdirectories |
| **Your terminal** | Any command you could run (build tools, git, package managers) |
| **Git state** | Current branch, uncommitted changes, commit history |
| **CLAUDE.md** | Persistent instructions loaded every session |
| **Auto memory** | Notes Claude saved from past sessions (~/.claude/projects/) |
| **Extensions** | MCP servers, skills, subagents, hooks, plugins |

## Built-in Tools

| Category | What Claude can do |
|----------|-------------------|
| **File operations** | Read, edit, create, rename files |
| **Search** | Find files by pattern, search content with regex |
| **Execution** | Run shell commands, start servers, run tests |
| **Web** | Search the web, fetch documentation |
| **Code intelligence** | Type errors, jump to definitions (with plugins) |

## The Context Window

Everything lives in one context window: conversation history, file contents, command output, CLAUDE.md, skill content, MCP tool definitions.

**This is your primary constraint.** Performance degrades as context fills.

### What Survives Compaction
- CLAUDE.md: YES (re-read from disk after compaction)
- Auto memory: YES (first 200 lines of MEMORY.md)
- Conversation instructions: PARTIALLY (summarized, details may be lost)
- MCP tool definitions: YES (always present)

### Context Budget
- CLAUDE.md: under 200 lines
- Skills: on-demand (descriptions always loaded, full content only when invoked)
- Subagents: isolated (separate context window)
- MCP tools: always loaded (check cost with `/mcp`)

## Permission Modes

Cycle through modes with `Shift+Tab`:

| Mode | Behavior |
|------|----------|
| **default** | Prompts for each new tool |
| **acceptEdits** | Auto-accepts file edits, still asks for commands |
| **plan** | Read-only — no changes, just analysis |
| **dontAsk** | Auto-denies unless pre-approved via permissions |
| **bypassPermissions** | Skips prompts (use only in sandboxed environments) |

## Feature Decision Matrix

| Need | Use | Why |
|------|-----|-----|
| Always-on rules | CLAUDE.md | Loaded every session |
| File-type-specific rules | .claude/rules/ | Only loads when relevant files are touched |
| Reference docs, workflows | Skills (.claude/skills/) | On-demand, saves context |
| Isolated investigation | Subagents (.claude/agents/) | Separate context window |
| Guaranteed automation | Hooks (settings.json) | Deterministic, no LLM involved |
| External services | MCP (.claude/.mcp.json) | Connects to APIs, DBs, etc. |
| Distributable bundles | Plugins | Package skills + hooks + agents |

## How Hooks Execute

1. Event fires (e.g., PostToolUse after a file edit)
2. All matching hooks run in parallel
3. Hook reads event data from stdin (JSON)
4. Hook decides: exit 0 (allow) or exit 2 (block with reason)
5. For structured control: output JSON to stdout

Hook types:
- **command**: runs a shell script
- **prompt**: single-turn LLM evaluation (yes/no decision)
- **agent**: multi-turn LLM with tool access
- **http**: POST to a URL
