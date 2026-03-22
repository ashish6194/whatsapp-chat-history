<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/costs -->

# Manage costs effectively

> Track token usage, set team spend limits, and reduce Claude Code costs.

Average cost is ~$6 per developer per day, with daily costs below $12 for 90% of users. Team average: ~$100-200/developer per month with Sonnet 4.6.

## Track your costs

Use the `/cost` command for detailed token usage statistics.

## Managing costs for teams

Set workspace spend limits in the Console. Admins can view cost and usage reporting.

### Rate limit recommendations

| Team size     | TPM per user | RPM per user |
| ------------- | ------------ | ------------ |
| 1-5 users     | 200k-300k    | 5-7          |
| 5-20 users    | 100k-150k    | 2.5-3.5      |
| 20-50 users   | 50k-75k      | 1.25-1.75    |
| 50-100 users  | 25k-35k      | 0.62-0.87    |
| 100-500 users | 15k-20k      | 0.37-0.47    |
| 500+ users    | 10k-15k      | 0.25-0.35    |

## Reduce token usage

### Manage context proactively

- Use `/clear` between tasks
- Add custom compaction instructions with `/compact`
- Track usage with `/cost` or status line

### Choose the right model

Sonnet for most tasks, Opus for complex decisions. Use `/model` to switch.

### Reduce MCP server overhead

- Prefer CLI tools when available
- Disable unused servers
- Tool search is automatic for large tool sets

### Install code intelligence plugins

Precise symbol navigation reduces unnecessary file reads.

### Offload processing to hooks and skills

Hooks can preprocess data before Claude sees it. Skills provide domain knowledge on demand.

### Move instructions from CLAUDE.md to skills

Skills load on-demand, keeping base context smaller. Keep CLAUDE.md under ~500 lines.

### Adjust extended thinking

Lower effort level with `/effort`, disable in `/config`, or set `MAX_THINKING_TOKENS`.

### Delegate to subagents

Verbose output stays in subagent context; only summary returns to main conversation.

### Write specific prompts

Specific requests let Claude work efficiently with minimal file reads.

### Work efficiently on complex tasks

- Use plan mode before implementation
- Course-correct early with Escape
- Give verification targets
- Test incrementally

## Background token usage

Small amount of tokens used for conversation summarization and command processing (typically under $0.04 per session).
