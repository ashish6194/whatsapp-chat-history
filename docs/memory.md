<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/memory -->

# How Claude remembers your project

> Give Claude persistent instructions with CLAUDE.md files, and let Claude accumulate learnings with auto memory.

Two mechanisms carry knowledge across sessions:
- **CLAUDE.md files**: instructions you write
- **Auto memory**: notes Claude writes itself

## CLAUDE.md files

### Where to put them

| Scope | Location | Purpose |
|-------|----------|---------|
| Managed policy | System-level paths | Organization-wide |
| Project | `./CLAUDE.md` | Team-shared |
| User | `~/.claude/CLAUDE.md` | Personal preferences |

### Write effective instructions

- Target under 200 lines
- Use markdown headers and bullets
- Be specific and verifiable
- Remove conflicting instructions

### Import additional files

Use `@path/to/import` syntax in CLAUDE.md.

### Organize rules with .claude/rules/

Place markdown files in `.claude/rules/` for modular instructions. Support path-specific rules with YAML frontmatter.

## Auto memory

Claude saves notes automatically: build commands, debugging insights, preferences.

### Storage

`~/.claude/projects/<project>/memory/MEMORY.md` and topic files.

### How it works

First 200 lines of MEMORY.md loaded at session start. Topic files loaded on demand.

### Enable/disable

Toggle via `/memory` or set `autoMemoryEnabled` in settings.

## View and edit with /memory

Lists all CLAUDE.md and rules files. Select to open in editor.

## See also

- Skills
- Settings
- Subagent memory
