<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/data-usage -->

# Data usage

> Learn about Anthropic's data usage policies for Claude Code.

## Data policies

### Data training policy

- **Consumer users (Free, Pro, Max)**: You choose whether your data is used to improve future models
- **Commercial users (Team, Enterprise, API)**: Anthropic does not train using your code or prompts unless you opt in

### Data retention

- **Consumer users who allow training**: 5-year retention
- **Consumer users who don't allow training**: 30-day retention
- **Commercial users**: 30-day retention (standard), Zero data retention available for Enterprise

### Feedback using /feedback

Transcripts shared via `/feedback` are retained for 5 years.

### Session quality surveys

Only your numeric rating is recorded. No conversation data is collected.

## Data access

### Local Claude Code

Claude Code runs locally. Data is encrypted in transit via TLS. Compatible with most VPNs and LLM proxies.

### Cloud execution

- Code cloned to isolated VM
- GitHub credentials handled through secure proxy
- All outbound traffic goes through security proxy

## Telemetry services

- **Statsig**: operational metrics (no code or file paths). Opt out: `DISABLE_TELEMETRY`
- **Sentry**: error logging. Opt out: `DISABLE_ERROR_REPORTING`
- **Feedback**: opt out with `DISABLE_FEEDBACK_COMMAND`

## Default behaviors by API provider

| Service         | Claude API | Vertex/Bedrock/Foundry |
| --------------- | ---------- | ---------------------- |
| Statsig         | Default on | Default off            |
| Sentry          | Default on | Default off            |
| Feedback        | Default on | Default off            |
| Quality surveys | Default on | Default on             |

Use `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` to opt out of all non-essential traffic.
