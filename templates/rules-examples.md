# Rules Examples

Path-scoped rules go in `.claude/rules/`. They only load when Claude works with matching files, saving context.

## How It Works

Rules without `paths:` frontmatter load every session (like CLAUDE.md).
Rules with `paths:` only load when Claude reads files matching those patterns.

---

## Example: Frontend Component Rules

```markdown
---
paths:
  - "src/components/**/*.{tsx,jsx}"
  - "src/components/**/*.{ts,js}"
---

# Component Rules

- Use functional components with hooks
- Co-locate component, styles, and tests in the same directory
- Props interfaces go in the same file as the component
- Prefer composition over inheritance
```

---

## Example: API Route Rules

```markdown
---
paths:
  - "src/api/**"
  - "app/api/**"
  - "routes/**"
---

# API Route Rules

- Validate all request inputs at the handler level
- Return consistent error response format: { error: string, code: number }
- Include rate limiting on public endpoints
- Log request/response for debugging (exclude sensitive fields)
```

---

## Example: Database/Migration Rules

```markdown
---
paths:
  - "migrations/**"
  - "supabase/migrations/**"
  - "prisma/migrations/**"
  - "db/migrate/**"
---

# Migration Rules

- Migrations are additive — never modify an existing migration file
- Always include a down/rollback migration
- Test migrations against a copy of production data before deploying
- Name migrations descriptively: 001_add_users_table.sql
```

---

## Example: Flutter/Dart Rules

```markdown
---
paths:
  - "lib/**/*.dart"
---

# Dart Rules

- Use Riverpod for state management (not setState or Provider)
- Models must be immutable (use Equatable or freezed)
- Separate pure logic from UI — game engines, calculations go in domain/
- Use Random.secure() for gameplay randomness only
```

---

## Example: Python Rules

```markdown
---
paths:
  - "**/*.py"
---

# Python Rules

- Use type hints on all function signatures
- Prefer pathlib over os.path
- Use dataclasses or Pydantic for structured data
- Async functions for I/O-bound operations
```

---

## Example: Infrastructure Rules

```markdown
---
paths:
  - "terraform/**"
  - "infra/**"
  - ".github/workflows/**"
---

# Infrastructure Rules

- NEVER run terraform destroy without explicit user confirmation
- Always use variables for resource names — no hardcoded values
- Tag all resources with team and environment
- Changes to CI workflows require review from platform team
```

---

## Example: Documentation Rules

```markdown
---
paths:
  - "docs/**"
  - "**/*.md"
---

# Documentation Rules

- Use sentence case for headings
- Include code examples for any API or configuration
- Keep paragraphs short (3-4 sentences max)
- Link to source code rather than duplicating it
```
