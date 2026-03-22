<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/model-config -->

# Model configuration

> Configure models, aliases, effort levels, and extended context in Claude Code.

## Model aliases

| Alias | Behavior |
|-------|----------|
| `default` | Recommended model for your account |
| `sonnet` | Latest Sonnet (4.6) |
| `opus` | Latest Opus (4.6) |
| `haiku` | Fast Haiku model |
| `sonnet[1m]` | Sonnet with 1M context |
| `opus[1m]` | Opus with 1M context |
| `opusplan` | Opus for planning, Sonnet for execution |

## Setting your model

1. During session: `/model <alias|name>`
2. At startup: `claude --model <alias|name>`
3. Environment: `ANTHROPIC_MODEL=<alias|name>`
4. Settings file: `"model": "opus"`

## Restrict model selection

Use `availableModels` in managed settings.

## Adjust effort level

- `/effort low|medium|high|max|auto`
- `/model` with left/right arrows
- `--effort` flag
- `CLAUDE_CODE_EFFORT_LEVEL` env var

## Extended context (1M tokens)

Opus 4.6 and Sonnet 4.6 support 1M token context. Use `[1m]` suffix.

## Pin models for third-party deployments

```bash
export ANTHROPIC_DEFAULT_OPUS_MODEL='us.anthropic.claude-opus-4-6-v1'
export ANTHROPIC_DEFAULT_SONNET_MODEL='us.anthropic.claude-sonnet-4-6'
export ANTHROPIC_DEFAULT_HAIKU_MODEL='us.anthropic.claude-haiku-4-5-20251001-v1:0'
```

## Override model IDs per version

Use `modelOverrides` setting for per-version mapping.

## See also

- Environment variables
- Costs
- Status line
