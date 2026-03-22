---
name: pr-ready
description: Pre-PR checklist — tests, lint, types, commit message
---

# PR Ready Checklist

Run through this checklist before creating a PR:

1. **Tests**: Run the full test suite. Fix any failures.
   ```
   npm test
   ```

2. **Lint**: Run linter and fix all issues.
   ```
   npm run lint
   ```

3. **Type check**: Ensure no type errors (if TypeScript).
   ```
   npx tsc --noEmit
   ```

4. **Review diff**: Run `git diff` and review every changed line. Look for:
   - Leftover debug statements (console.log, debugger, TODO)
   - Hardcoded values that should be constants
   - Missing error handling at system boundaries
   - Accidentally committed files (.env, node_modules, .DS_Store)

5. **Commit**: Write a clear commit message summarizing what and why.

6. **PR**: Create PR with summary, test plan, and link to any relevant issue.

If any step fails, fix the issue before proceeding to the next step.
