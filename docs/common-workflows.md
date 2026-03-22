<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/common-workflows -->

# Common workflows

> Step-by-step guides for exploring codebases, fixing bugs, refactoring, testing, and other everyday tasks.

## Understand new codebases

1. Navigate to the project root
2. Start Claude Code with `claude`
3. Ask for a high-level overview
4. Dive deeper into specific components

## Find relevant code

```text
find the files that handle user authentication
```

## Fix bugs efficiently

1. Share the error with Claude
2. Ask for fix recommendations
3. Apply the fix

## Refactor code

1. Identify legacy code
2. Get refactoring recommendations
3. Apply changes safely
4. Verify with tests

## Use specialized subagents

- View with `/agents`
- Claude delegates automatically or you can request specific subagents
- Create custom subagents in `.claude/agents/`

## Use Plan Mode for safe code analysis

Plan Mode instructs Claude to analyze the codebase read-only. Toggle with Shift+Tab or start with:

```bash
claude --permission-mode plan
```

## Work with tests

1. Identify untested code
2. Generate test scaffolding
3. Add meaningful test cases
4. Run and verify tests

## Create pull requests

```text
create a pr
```

Sessions are automatically linked to PRs created with `gh pr create`.

## Handle documentation

1. Identify undocumented code
2. Generate documentation
3. Review and enhance
4. Verify against project standards

## Work with images

- Drag and drop images into the Claude Code window
- Copy/paste with Ctrl+V
- Provide image paths

## Reference files and directories

Use `@` to include files or directories:

```text
Explain the logic in @src/utils/auth.js
```

## Use extended thinking

Extended thinking is enabled by default. Configure with `/effort`, `/model`, or `Option+T`/`Alt+T` toggle.

## Resume previous conversations

```bash
claude --continue    # Most recent conversation
claude --resume      # Session picker
claude --from-pr 123 # Sessions linked to a PR
```

## Run parallel sessions with Git worktrees

```bash
claude --worktree feature-auth
claude --worktree bugfix-123
```

## Get notified when Claude needs attention

Add a Notification hook to your settings for desktop notifications.

## Use Claude as a unix-style utility

```bash
# As a linter
claude -p 'you are a linter. look at changes vs. main and report issues.'

# Pipe data
cat build-error.txt | claude -p 'explain the root cause' > output.txt
```

## Control output format

- `--output-format text` (default)
- `--output-format json`
- `--output-format stream-json`

## Next steps

- Best practices
- How Claude Code works
- Extend Claude Code (features overview)
