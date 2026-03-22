<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/monitoring-usage -->

# Monitoring

> Enable and configure OpenTelemetry for Claude Code usage tracking, costs, and tool activity.

Track Claude Code usage across your organization by exporting telemetry data through OpenTelemetry.

## Quick start

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=otlp
export OTEL_LOGS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
claude
```

## Available metrics

- `claude_code.session.count`, `claude_code.token.usage`, `claude_code.cost.usage`
- `claude_code.lines_of_code.count`, `claude_code.commit.count`, `claude_code.pull_request.count`
- `claude_code.active_time.total`, `claude_code.code_edit_tool.decision`

## Events

- `claude_code.user_prompt`, `claude_code.tool_result`
- `claude_code.api_request`, `claude_code.api_error`, `claude_code.tool_decision`

## See also

- Settings, Environment variables, Analytics
