---
name: debug-loop
description: Systematic debugging — reproduce, isolate, fix, verify
---

# Debug Loop

Follow this cycle for any bug:

1. **Reproduce**: Get the exact error message or unexpected behavior. Run the failing case.
2. **Isolate**: Narrow down to the smallest code path that triggers the issue.
   - Add targeted logging or use a debugger
   - Binary search through recent changes if the bug is a regression
3. **Hypothesize**: State your theory for the root cause before changing code.
4. **Fix**: Make the minimal change to address the root cause — not the symptom.
5. **Verify**: Run the original failing case to confirm it passes.
6. **Regression check**: Run the full test suite to ensure nothing else broke.

Rules:
- Never suppress errors to "fix" a bug
- If you can't reproduce it, gather more information before guessing
- If stuck after 2 attempts, step back and re-examine assumptions
- Write a test that would have caught this bug
