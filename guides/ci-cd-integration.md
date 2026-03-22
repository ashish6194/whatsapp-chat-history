# CI/CD Integration

Use Claude Code in automated pipelines: GitHub Actions, GitLab CI, pre-commit hooks, and scripts.

## Non-Interactive Mode

Run Claude without a session using `claude -p`:

```bash
# One-off query
claude -p "Explain what this project does"

# Structured output
claude -p "List all API endpoints" --output-format json

# Streaming for real-time processing
claude -p "Analyze this log file" --output-format stream-json

# Pipe data in
cat error.log | claude -p "Explain the root cause"

# Scope permissions
claude -p "Fix lint errors" --allowedTools "Edit,Bash(npm run lint*)"

# Limit turns
claude -p "Implement the feature" --max-turns 10

# Choose model
claude -p "Review this code" --model claude-sonnet-4-6
```

## GitHub Actions

### Quick Setup

```bash
# In Claude Code interactive mode:
/install-github-app
```

This installs the GitHub App and sets up secrets automatically.

### Basic Workflow: Respond to @claude

```yaml
name: Claude Code
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
jobs:
  claude:
    if: contains(github.event.comment.body, '@claude')
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

### Auto Code Review on PR

```yaml
name: Code Review
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "Review this PR for code quality, security, and correctness."
          claude_args: "--max-turns 5"
```

### Scheduled Tasks

```yaml
name: Weekly Audit
on:
  schedule:
    - cron: "0 9 * * 1"  # Monday 9am
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "Audit dependencies for security vulnerabilities. Create an issue if any are found."
          claude_args: "--model claude-sonnet-4-6 --max-turns 10"
```

### Common @claude Commands in PRs

```
@claude implement this feature based on the issue description
@claude fix the TypeError in the dashboard component
@claude add tests for the new auth endpoints
@claude review this PR for security issues
```

## Fan-Out Pattern

For bulk changes across many files:

```bash
# 1. Generate file list
claude -p "List all files that need migrating" --output-format json > files.json

# 2. Process each file
for file in $(cat files.json | jq -r '.[]'); do
  claude -p "Migrate $file from React class components to hooks. Return OK or FAIL." \
    --allowedTools "Edit,Bash(npm test *)" &
done
wait
```

## Pre-Commit Hook Integration

```bash
#!/bin/bash
# .git/hooks/pre-commit
# Run Claude to check for common issues before commit

staged_files=$(git diff --cached --name-only --diff-filter=ACM)
if [ -n "$staged_files" ]; then
  echo "$staged_files" | claude -p "Check these staged files for: hardcoded secrets, debug statements, and TODO comments. Output only issues found, or 'PASS' if clean." --output-format json
fi
```

## Cost Optimization

- Use `--max-turns` to limit iterations (default: unlimited in interactive, 10 in Actions)
- Use `--model claude-sonnet-4-6` for routine tasks (cheaper than Opus)
- Set workflow-level timeouts to prevent runaway jobs
- Use GitHub's concurrency controls to limit parallel runs
- CLAUDE.md is read in CI too — keep it concise for faster context loading

## GitLab CI/CD

Similar patterns work with GitLab. See the official docs at `docs/gitlab-ci-cd.md` for GitLab-specific configuration.

## Key CLI Flags for Automation

| Flag | Purpose |
|------|---------|
| `-p "prompt"` | Non-interactive mode |
| `--output-format json` | Structured output |
| `--output-format stream-json` | Streaming JSON |
| `--max-turns N` | Limit conversation turns |
| `--model <name>` | Choose model |
| `--allowedTools "Tool1,Tool2"` | Restrict available tools |
| `--disallowedTools "Tool1"` | Block specific tools |
| `--mcp-config path` | MCP configuration file |
| `--verbose` | Debug output |
| `--dangerously-skip-permissions` | Skip prompts (sandboxed only) |
