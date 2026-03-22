<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/scheduled-tasks -->

# Run prompts on a schedule

> Use /loop and cron tools to run prompts repeatedly or set reminders.

## /loop

```text
/loop 5m check if the deployment finished
```

Intervals: `s`, `m`, `h`, `d`. Default: every 10 minutes.

## One-time reminders

```text
remind me at 3pm to push the release branch
```

## Manage tasks

```text
what scheduled tasks do I have?
cancel the deploy check job
```

## How it works

- Session-scoped (gone when you exit)
- Fires between turns, not mid-response
- Local timezone
- 3-day expiry for recurring tasks

## Disable

Set `CLAUDE_CODE_DISABLE_CRON=1`.

## See also

- Desktop scheduled tasks (durable)
- GitHub Actions (CI/CD scheduling)
- Channels (event-driven alternative)
