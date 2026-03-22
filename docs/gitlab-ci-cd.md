<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/gitlab-ci-cd -->

# Claude Code GitLab CI/CD

> Integrate Claude Code into your development workflow with GitLab CI/CD.

Claude Code for GitLab CI/CD is currently in beta, maintained by GitLab.

## Features

- Instant MR creation from descriptions
- Automated implementation from issues
- Project-aware with CLAUDE.md support
- Enterprise-ready with Claude API, AWS Bedrock, or Google Vertex AI

## Setup

1. Add `ANTHROPIC_API_KEY` as a masked CI/CD variable
2. Add a Claude job to `.gitlab-ci.yml`

```yaml
stages:
  - ai
claude:
  stage: ai
  image: node:24-alpine3.21
  before_script:
    - apk add --no-cache git curl bash
    - curl -fsSL https://claude.ai/install.sh | bash
  script:
    - claude -p "${AI_FLOW_INPUT:-'Review this MR'}" --permission-mode acceptEdits
```

## Use cases

- Create and update MRs from issue descriptions
- Implement features in branches
- Fix bugs identified by tests
- Respond to follow-up comments

## Provider support

- Claude API (SaaS)
- AWS Bedrock (IAM-based)
- Google Vertex AI (Workload Identity Federation)

## Best practices

- Create CLAUDE.md for coding standards
- Use CI/CD variables for credentials
- Configure sensible job timeouts
