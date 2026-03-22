<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/code-review -->

# Code Review

> Set up automated PR reviews that catch logic errors, security vulnerabilities, and regressions using multi-agent analysis.

Code Review is in research preview, available for Teams and Enterprise subscriptions.

Code Review analyzes your GitHub pull requests and posts findings as inline comments. Specialized agents examine code changes in the context of your full codebase, looking for logic errors, security vulnerabilities, broken edge cases, and subtle regressions.

## How reviews work

Reviews trigger when a PR opens, on every push, or when manually requested. Multiple agents analyze the diff and surrounding code in parallel. Results are deduplicated, ranked by severity, and posted as inline comments.

### Severity levels

| Marker | Severity     | Meaning                                              |
| :----- | :----------- | :--------------------------------------------------- |
| Red    | Normal       | A bug that should be fixed before merging            |
| Yellow | Nit          | A minor issue, worth fixing but not blocking         |
| Purple | Pre-existing | A bug that exists but was not introduced by this PR  |

## Set up Code Review

1. Go to claude.ai/admin-settings/claude-code
2. Click Setup to begin GitHub App installation
3. Install the Claude GitHub App
4. Select repositories
5. Set review triggers per repo (once after creation, after every push, or manual)

## Manually trigger reviews

Comment `@claude review` on a pull request.

## Customize reviews

- **CLAUDE.md**: shared project instructions for all Claude Code tasks
- **REVIEW.md**: review-only guidance at the repository root

## View usage

Go to claude.ai/analytics/code-review for activity dashboard.

## Pricing

Each review averages $15-25 in cost, scaling with PR size and codebase complexity. Billed separately through extra usage.

## Related resources

- Plugins (code-review plugin for local reviews)
- GitHub Actions
- GitLab CI/CD
- Memory (CLAUDE.md)
- Analytics
