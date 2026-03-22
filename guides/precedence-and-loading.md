# Precedence & Loading Order

## Settings Precedence (highest → lowest)

```
1. Managed settings     (org/IT policy — cannot be overridden)
2. CLI arguments        (--allowedTools, --disallowedTools — session only)
3. Local project        (.claude/settings.local.json — gitignored)
4. Shared project       (.claude/settings.json — git-tracked)
5. User settings        (~/.claude/settings.json — personal, all projects)
```

**Key rule**: If a tool is denied at any level, no other level can allow it.

## Permission Evaluation Order

```
deny → ask → allow
```

First matching rule wins. Deny always takes precedence.

Example: If `Bash(git push *)` is denied in project settings but allowed in user settings, it stays **denied**.

## How Instructions Load

### At Session Start (loaded immediately)

```
1. System prompt (built-in, ~50 instructions)
2. Managed CLAUDE.md (/Library/Application Support/ClaudeCode/CLAUDE.md)
3. User CLAUDE.md (~/.claude/CLAUDE.md)
4. User rules (~/.claude/rules/*.md)
5. Parent directory CLAUDE.md files (walk up from cwd to root)
6. Project CLAUDE.md (./CLAUDE.md or ./.claude/CLAUDE.md)
7. Project rules (.claude/rules/*.md — without paths: frontmatter)
8. Auto memory (MEMORY.md — first 200 lines only)
9. MCP tool definitions (all connected servers)
10. Skill descriptions (names + one-line descriptions only)
```

### During Session (loaded on demand)

```
- Subdirectory CLAUDE.md files (when Claude reads files in that dir)
- Path-scoped rules (.claude/rules/*.md with paths: frontmatter)
- Full skill content (when invoked with /name or auto-detected as relevant)
- Subagent context (fresh isolated window, not your main context)
```

## How Things Layer

| Feature | Layering behavior |
|---------|-------------------|
| **CLAUDE.md** | Additive — all levels contribute simultaneously. More specific wins on conflict |
| **Skills** | Override by name — same name at different levels, priority wins |
| **Subagents** | Override by name — managed > CLI flag > project > user > plugin |
| **MCP servers** | Override by name — local > project > user |
| **Hooks** | All fire — hooks from all sources execute for matching events |
| **Permissions** | Deny > ask > allow — deny at any level blocks it |

## What Survives Context Compaction

| Content | After compaction |
|---------|-----------------|
| CLAUDE.md | Fully preserved (re-read from disk) |
| Auto memory | Fully preserved (re-read from disk) |
| MCP tool definitions | Fully preserved |
| Conversation history | Summarized (details may be lost) |
| File contents read | Cleared (Claude re-reads if needed) |
| Skill content | Cleared (re-loaded when invoked) |

**Tip**: Put critical instructions in CLAUDE.md, not conversation. Conversation instructions may be lost after compaction.

## CLAUDE.md File Locations

| Location | Scope | Shared? |
|----------|-------|---------|
| `/Library/.../ClaudeCode/CLAUDE.md` | Managed (org policy) | All users on machine |
| `~/.claude/CLAUDE.md` | User (personal) | No — just you |
| `./CLAUDE.md` or `./.claude/CLAUDE.md` | Project | Yes — via git |
| `./subdir/CLAUDE.md` | Subdirectory (lazy-loaded) | Yes — via git |

## Settings File Locations

| File | Scope | Shared? |
|------|-------|---------|
| Managed policy settings | Org-wide | Yes (IT-deployed) |
| `~/.claude/settings.json` | User (all projects) | No |
| `.claude/settings.json` | Project | Yes (git-tracked) |
| `.claude/settings.local.json` | Project (personal) | No (gitignored) |
