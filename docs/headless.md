<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/headless -->

# Run Claude Code programmatically

> Use the Agent SDK to run Claude Code programmatically from the CLI, Python, or TypeScript.

Pass `-p` with your prompt to run non-interactively:

```bash
claude -p "Find and fix the bug in auth.py" --allowedTools "Read,Edit,Bash"
```

## Basic usage

```bash
claude -p "What does the auth module do?"
```

## Examples

### Get structured output
```bash
claude -p "Summarize this project" --output-format json
```

### Stream responses
```bash
claude -p "Explain recursion" --output-format stream-json --verbose
```

### Auto-approve tools
```bash
claude -p "Run tests and fix failures" --allowedTools "Bash,Read,Edit"
```

### Create a commit
```bash
claude -p "Look at staged changes and create a commit" \
  --allowedTools "Bash(git diff *),Bash(git log *),Bash(git commit *)"
```

### Continue conversations
```bash
claude -p "Review this codebase"
claude -p "Focus on database queries" --continue
```

## Next steps

- Agent SDK quickstart
- CLI reference
- GitHub Actions
- GitLab CI/CD
