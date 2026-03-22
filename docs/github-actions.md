<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/github-actions -->

# Claude Code GitHub Actions

> Integrate Claude Code into your GitHub workflow with AI-powered automation.

Claude Code GitHub Actions brings AI-powered automation to your GitHub workflow. With `@claude` mention in any PR or issue, Claude can analyze code, create PRs, implement features, and fix bugs.

## Setup

Quick setup: run `/install-github-app` in Claude Code terminal.

Manual setup:
1. Install the Claude GitHub app
2. Add ANTHROPIC_API_KEY to repository secrets
3. Copy workflow file to `.github/workflows/`

## Example workflows

### Basic workflow
```yaml
name: Claude Code
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
jobs:
  claude:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

### Common use cases
- `@claude implement this feature based on the issue description`
- `@claude fix the TypeError in the user dashboard component`
- `@claude review this PR for security issues`

## Configuration

| Parameter           | Description                         | Required |
| ------------------- | ----------------------------------- | -------- |
| `prompt`            | Instructions for Claude             | No       |
| `claude_args`       | CLI arguments                       | No       |
| `anthropic_api_key` | Claude API key                      | Yes*     |
| `github_token`      | GitHub token                        | No       |
| `use_bedrock`       | Use AWS Bedrock                     | No       |
| `use_vertex`        | Use Google Vertex AI                | No       |

## Using with AWS Bedrock & Google Vertex AI

Enterprise environments can use cloud infrastructure with OIDC authentication.

## Best practices

- Create CLAUDE.md for project guidelines
- Use GitHub Secrets for API keys
- Configure appropriate timeouts

## Related

- [Claude Code Action repository](https://github.com/anthropics/claude-code-action)
- Agent SDK documentation
- Code Review (for automatic PR reviews)
