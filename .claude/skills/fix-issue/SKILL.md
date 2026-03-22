---
name: fix-issue
description: Fix a GitHub issue end-to-end — investigate, implement, test, and create a PR
disable-model-invocation: true
---

# Fix GitHub Issue

Issue: $ARGUMENTS

## Workflow

1. **Get details**: Run `gh issue view $ARGUMENTS` to understand the issue
2. **Investigate**: Search the codebase for relevant files. Understand the current behavior
3. **Write a failing test** that reproduces the issue (if testable)
4. **Implement the fix**: Make the minimal change to address the root cause
5. **Verify**: Run the failing test — it should pass now. Run the full test suite to check for regressions
6. **Lint and type check**: Ensure no new errors
7. **Commit**: Write a clear commit message referencing the issue number
8. **Create PR**: Run `gh pr create` with a summary and test plan
