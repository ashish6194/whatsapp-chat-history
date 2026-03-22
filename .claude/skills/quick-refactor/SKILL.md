---
name: quick-refactor
description: Focused refactoring workflow with before/after verification
---

# Quick Refactor

Follow this workflow for any refactoring task:

1. **Snapshot**: Read the target file(s) and note current behavior
2. **Identify**: List the specific refactoring changes to make (rename, extract, inline, etc.)
3. **Refactor**: Make changes one at a time, keeping each change small and reviewable
4. **Verify**: Run tests after each change to confirm no regressions
5. **Compare**: Show a summary of what changed and why

Rules:
- Never change behavior — only structure
- If tests don't exist for the code being refactored, write them first
- Keep the diff minimal — don't reformat unrelated code
- If a refactor touches more than 5 files, pause and confirm scope with the user
