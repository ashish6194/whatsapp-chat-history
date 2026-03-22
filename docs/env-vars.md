<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/env-vars -->

# Environment variables

> Complete reference for environment variables that control Claude Code behavior.

Set environment variables in your shell before launching `claude`, or configure them in `settings.json` under the `env` key.

## Key environment variables

| Variable | Purpose |
| :--- | :--- |
| `ANTHROPIC_API_KEY` | API key sent as X-Api-Key header |
| `ANTHROPIC_AUTH_TOKEN` | Custom Authorization header value |
| `ANTHROPIC_BASE_URL` | Override the API endpoint |
| `ANTHROPIC_CUSTOM_HEADERS` | Custom headers for requests |
| `ANTHROPIC_MODEL` | Model to use |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | Pin Opus model version |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | Pin Sonnet model version |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | Pin Haiku model version |
| `AWS_REGION` | AWS region for Bedrock |
| `CLAUDE_CODE_USE_BEDROCK` | Enable Bedrock integration |
| `CLAUDE_CODE_USE_VERTEX` | Enable Vertex AI integration |
| `CLAUDE_CODE_USE_FOUNDRY` | Enable Microsoft Foundry |
| `CLAUDE_CODE_EFFORT_LEVEL` | Set effort level (low/medium/high) |
| `CLAUDE_CONFIG_DIR` | Override config directory |
| `CLAUDE_PROJECT_DIR` | Project root directory |
| `CLAUDE_ENV_FILE` | File for persisting env vars from hooks |
| `CLAUDECODE` | Set to 1 in shells spawned by Claude Code |
| `DISABLE_TELEMETRY` | Opt out of Statsig telemetry |
| `DISABLE_ERROR_REPORTING` | Opt out of Sentry error logging |
| `DISABLE_PROMPT_CACHING` | Disable prompt caching |
| `MAX_THINKING_TOKENS` | Limit thinking token budget |
| `BASH_DEFAULT_TIMEOUT_MS` | Default bash command timeout |
| `BASH_MAX_TIMEOUT_MS` | Maximum bash command timeout |
| `BASH_MAX_OUTPUT_LENGTH` | Maximum bash output characters |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | Disable all non-essential traffic |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | Disable auto memory |
| `CLAUDE_CODE_DISABLE_FAST_MODE` | Disable fast mode |
| `CLAUDE_CODE_DISABLE_CRON` | Disable scheduled tasks |
| `CLAUDE_CODE_MAX_SUBAGENT_TURNS` | Limit subagent turns |
| `CLAUDE_CODE_REMOTE` | Set to "true" in remote environments |
| `ENABLE_TOOL_SEARCH` | Control MCP tool search behavior |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | Set auto-compaction threshold |

For the complete list with full descriptions, see the official documentation.

## See also

- Settings reference
- Model configuration
- Network configuration
