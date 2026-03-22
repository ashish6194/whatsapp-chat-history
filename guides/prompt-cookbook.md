# Prompt Cookbook

Proven prompt templates for common tasks. Replace `[placeholders]` with your specifics.

---

## Bug Fix

```
The [feature] is broken: [symptom].
Check [location/files] for the issue.
Write a failing test that reproduces it, then fix it.
Run tests after to verify.
```

**Example:**
```
The login form shows a blank screen after submit.
Check src/auth/ for the issue, especially the session handling.
Write a failing test, then fix it. Run tests after.
```

---

## Feature Implementation

```
I want to add [feature]. Interview me about requirements first using AskUserQuestion.
Ask about technical implementation, UI/UX, edge cases, and tradeoffs.
Then create a plan. After approval, implement and verify with tests.
```

**For simpler features:**
```
Add [feature] following the pattern in [example file].
Write tests. Run the test suite after.
```

---

## Code Review

```
Review [file or PR] for:
- Edge cases and error handling gaps
- Race conditions and concurrency issues
- Security vulnerabilities
- Consistency with existing patterns in [reference file]
Provide specific line references and fixes.
```

---

## Refactoring

```
Refactor [target] to [goal]. Don't change behavior.
Run tests after each change to verify no regressions.
Show a before/after summary of what changed.
```

**Example:**
```
Extract the token validation logic from auth.ts into a
separate validateToken function. Don't change behavior.
Run tests after. Show the before/after diff.
```

---

## Migration / Bulk Changes

```
Migrate [files/pattern] from [old approach] to [new approach].
Follow the pattern in [example file].
Test each file after migration. Report OK/FAIL for each.
```

**For large migrations, use fan-out:**
```bash
for file in $(cat files.txt); do
  claude -p "Migrate $file from CommonJS to ESM. Return OK or FAIL." \
    --allowedTools "Edit"
done
```

---

## Codebase Onboarding

```
Explain the architecture of this project.
How does [feature] work?
What files handle [concept]?
Trace the data flow from [input] to [output].
```

---

## Debugging

```
[paste error message or stack trace]
Investigate the root cause in [location].
Don't suppress the error — fix what's actually wrong.
Run tests to verify the fix.
```

---

## Writing Tests

```
Write tests for [file/function] covering:
- Happy path
- Edge cases: [empty input, null, boundary values]
- Error cases: [network failure, invalid data]
Use the same testing patterns as [existing test file].
```

---

## PR Preparation

```
Review all my changes (git diff). Check for:
- Leftover debug statements (console.log, debugger, TODO)
- Missing error handling at system boundaries
- Accidentally committed files (.env, node_modules)
Then run lint, type check, and tests.
If everything passes, create a commit with a clear message and open a PR.
```

---

## Architecture Decision

```
I need to choose between [option A] and [option B] for [goal].
Compare tradeoffs considering:
- Performance and scalability
- Maintainability and complexity
- Our existing patterns in this codebase
Recommend one with reasoning.
```

---

## Prompt Patterns That Amplify Results

| Pattern | Example |
|---------|---------|
| **Give verification criteria** | "Run tests after" / "Take a screenshot and compare" |
| **Point to examples** | "Follow the pattern in src/routes/users.ts" |
| **Scope the work** | "Only modify files in src/auth/" |
| **Ask for options** | "Suggest 3 approaches and compare tradeoffs" |
| **Use plan mode first** | Press Shift+Tab, then "Explore how we handle X today" |
| **Delegate investigation** | "Use a subagent to research how auth works in this codebase" |
| **Say think harder** | Include "think harder" or "ultrathink" for complex reasoning |

## Anti-Patterns to Avoid

| Don't | Do instead |
|-------|------------|
| Multiple unrelated tasks in one session | `/clear` between tasks |
| Correcting Claude 3+ times | `/clear` and write a better initial prompt |
| Vague prompts without verification | Include test cases or expected output |
| Letting Claude explore forever | Use subagent or scope the search |
| Skipping plan mode on big changes | Use `Shift+Tab` for plan mode first |
