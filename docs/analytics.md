<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/analytics -->

# Track team usage with analytics

> View Claude Code usage metrics, track adoption, and measure engineering velocity in the analytics dashboard.

Claude Code provides analytics dashboards to help organizations understand developer usage patterns, track contribution metrics, and measure how Claude Code impacts engineering velocity.

| Plan                          | Dashboard URL                                                              | Includes                                                                              |
| ----------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Claude for Teams / Enterprise | [claude.ai/analytics/claude-code](https://claude.ai/analytics/claude-code) | Usage metrics, contribution metrics with GitHub integration, leaderboard, data export |
| API (Claude Console)          | [platform.claude.com/claude-code](https://platform.claude.com/claude-code) | Usage metrics, spend tracking, team insights                                          |

## Access analytics for Teams and Enterprise

Navigate to [claude.ai/analytics/claude-code](https://claude.ai/analytics/claude-code). Admins and Owners can view the dashboard.

The dashboard includes:

- **Usage metrics**: lines of code accepted, suggestion accept rate, daily active users and sessions
- **Contribution metrics**: PRs and lines of code shipped with Claude Code assistance, with GitHub integration
- **Leaderboard**: top contributors ranked by Claude Code usage
- **Data export**: download contribution data as CSV

### Enable contribution metrics

Usage and adoption data is available for all accounts. Contribution metrics require additional setup to connect your GitHub organization.

Steps:
1. Install the GitHub app at github.com/apps/claude
2. Enable Claude Code analytics at claude.ai/admin-settings/claude-code
3. Enable the "GitHub analytics" toggle
4. Complete the GitHub authentication flow

### Review summary metrics

- **PRs with CC**: merged PRs containing Claude Code-assisted code
- **Lines of code with CC**: lines written with Claude Code assistance
- **PRs with Claude Code (%)**: percentage of merged PRs with Claude Code
- **Suggestion accept rate**: percentage of accepted code editing suggestions
- **Lines of code accepted**: total accepted lines of code

### Explore the charts

- **Adoption**: daily active users and sessions
- **PRs per user**: individual developer activity
- **Pull requests breakdown**: PRs with vs without Claude Code
- **Leaderboard**: top 10 users by contribution volume

### PR attribution

When contribution metrics are enabled, Claude Code analyzes merged PRs to determine which code was written with Claude Code assistance.

- Time window: 21 days before to 2 days after the PR merge date
- Excluded files: lock files, generated code, build directories, test fixtures
- Code substantially rewritten (>20% difference) is not attributed

## Access analytics for API customers

API customers can access analytics at [platform.claude.com/claude-code](https://platform.claude.com/claude-code).

The Console dashboard displays:

- **Lines of code accepted**
- **Suggestion accept rate**
- **Activity**: daily active users and sessions
- **Spend**: daily API costs

### View team insights

Per-user metrics including spend and lines this month.

## Related resources

- Monitoring with OpenTelemetry
- Manage costs effectively
- Permissions
