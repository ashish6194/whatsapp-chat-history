<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/llm-gateway -->

# LLM gateway configuration

> Configure Claude Code to work with LLM gateway solutions for centralized auth, usage tracking, and cost controls.

## Gateway requirements

Must expose at least one API format:
1. Anthropic Messages: `/v1/messages`
2. Bedrock InvokeModel
3. Vertex rawPredict

Must forward `anthropic-beta` and `anthropic-version` headers.

## LiteLLM configuration

### Basic setup
```bash
export ANTHROPIC_BASE_URL=https://litellm-server:4000
```

### Authentication methods

- Static API key: `ANTHROPIC_AUTH_TOKEN`
- Dynamic with helper: `apiKeyHelper` setting

### Provider-specific endpoints

- Claude API: `ANTHROPIC_BASE_URL=https://litellm-server:4000/anthropic`
- Bedrock: `ANTHROPIC_BEDROCK_BASE_URL=https://litellm-server:4000/bedrock`
- Vertex AI: `ANTHROPIC_VERTEX_BASE_URL=https://litellm-server:4000/vertex_ai/v1`

## See also

- Settings
- Network configuration
- Third-party integrations
