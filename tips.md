# Claude Code Tips & Cheat Sheet

## Essential Shortcuts

| Shortcut | Action |
|----------|--------|
| `Escape` | Stop Claude mid-action |
| `Escape` x2 | Rewind menu (undo changes + conversation) |
| `Shift+Tab` | Toggle Plan / Normal / Auto mode |
| `Ctrl+G` | Open prompt in your text editor |
| `Ctrl+R` | Search command history |
| `Option+T` | Toggle extended thinking |
| `Ctrl+V` | Paste image from clipboard |
| `Ctrl+L` | Clear screen (keeps history) |
| `Ctrl+O` | Toggle verbose output |
| `Ctrl+B` | Background tasks |
| `@filename` | Reference a file in prompt |
| `!command` | Run shell command directly |

## Essential Commands

| Command | Purpose |
|---------|---------|
| `/init` | Generate starter CLAUDE.md |
| `/clear` | Reset context between tasks |
| `/compact` | Compress conversation history |
| `/rewind` | Restore previous state |
| `/rename` | Name your session |
| `/resume` | Pick previous session |
| `/memory` | View/edit auto memory |
| `/skills` | Browse available skills |
| `/hooks` | Browse configured hooks |
| `/mcp` | Check MCP server status |
| `/permissions` | Manage permissions |
| `/context` | See what's using context |
| `/btw` | Side question (no context cost) |
| `/model` | Switch models |

## The #1 Rule: Verification

**The single highest-leverage thing you can do is give Claude a way to check its own work.**

```
Bad:  "Fix the login bug"
Good: "The login form shows a blank screen after submit.
       Fix it and verify the form redirects to /dashboard.
       Run tests after."
```

Always include: tests to run, expected output, screenshots to compare, or commands to verify.

## Context Is Your Primary Constraint

Everything goes into one window. Performance degrades as it fills.

1. **`/clear` between unrelated tasks** — don't let irrelevant context accumulate
2. **Use subagents for investigation** — their context is isolated from yours
3. **`/compact` proactively** — don't wait for auto-compaction
4. **Use skills instead of CLAUDE.md** — skills load on demand, CLAUDE.md loads always
5. **Monitor with `/context`** — see what's consuming your window

## CLAUDE.md Budget: Under 200 Lines

LLMs reliably follow ~150-200 instructions. Claude's system prompt uses ~50. That leaves ~100-150 for your CLAUDE.md.

**Include**: Commands Claude can't guess, non-default conventions, architecture decisions, gotchas
**Exclude**: Anything Claude can infer from code, standard conventions, detailed docs (use @imports)

For each line, ask: "Would removing this cause Claude to make mistakes?" If not, cut it.

## Progressive Disclosure

Don't put everything in CLAUDE.md. Use the right layer:

| Content | Where to put it |
|---------|----------------|
| Always-on rules | CLAUDE.md (under 200 lines) |
| File-type rules | .claude/rules/ with paths: frontmatter |
| Reference docs | Skills (loaded on demand) |
| Detailed docs | @imports to separate files |

## The Explore-Plan-Implement Loop

For complex changes:
1. **Explore** (Plan Mode): Read files, understand the codebase
2. **Plan** (Plan Mode): Create implementation plan
3. **Implement** (Normal Mode): Code and verify
4. **Commit**: Create PR with descriptive message

Skip planning for small, scoped changes.

## Session Management

```bash
claude --continue      # Resume last session
claude --resume        # Pick from recent sessions
claude --worktree name # Parallel work on a branch
/rename oauth-work     # Name important sessions
```

## Power Moves

- **Pipe data in**: `cat error.log | claude "explain this error"`
- **Headless mode**: `claude -p "list all API endpoints" --output-format json`
- **Fan out**: loop `claude -p` over multiple files for bulk changes
- **Deep thinking**: say "think harder" or "ultrathink" for complex problems
- **Interview mode**: "Interview me about requirements before implementing"
- **Writer/Reviewer**: Use two sessions — one writes, one reviews
- **Subagent delegation**: "Use a subagent to research how auth works"

## Common Mistakes & Fixes

| Mistake | Fix |
|---------|-----|
| Many unrelated tasks in one session | `/clear` between tasks |
| Correcting Claude 3+ times | `/clear`, write better initial prompt |
| Huge CLAUDE.md | Prune to under 200 lines, use skills |
| No verification criteria | Always include tests or expected output |
| Letting Claude explore endlessly | Use subagent or scope the search |
| Big changes without planning | Use Plan Mode (`Shift+Tab`) first |
| Ignoring context usage | Monitor with `/context` |
| Not using hooks for automation | Use hooks for deterministic actions |

## Hooks vs CLAUDE.md vs Skills

| Need | Use |
|------|-----|
| "Always format code after edits" | Hook (deterministic, guaranteed) |
| "Prefer functional components" | CLAUDE.md (behavioral guidance) |
| "How to deploy" | Skill (on-demand workflow) |
| "API design patterns" | Skill (on-demand knowledge) |
| "Block edits to .env" | Hook (deterministic block) |
| "Use pnpm, not npm" | CLAUDE.md (always-on rule) |
