<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/output-styles -->

# Output styles

> Adapt Claude Code for uses beyond software engineering.

## Built-in styles

- **Default**: Standard software engineering
- **Explanatory**: Provides educational insights
- **Learning**: Collaborative learn-by-doing mode

## Change your style

Run `/config` and select Output style. Or set `outputStyle` in settings.

## Create custom styles

Markdown files with frontmatter in `~/.claude/output-styles` or `.claude/output-styles`.

```markdown
---
name: My Custom Style
description: Description shown in picker
keep-coding-instructions: false
---

Your custom instructions here...
```

## See also

- CLAUDE.md (memory), Subagents, Skills
