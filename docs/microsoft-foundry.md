<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/microsoft-foundry -->

# Claude Code on Microsoft Foundry

> Configure Claude Code through Microsoft Foundry, including setup and troubleshooting.

## Prerequisites

- Azure subscription with Microsoft Foundry access
- RBAC permissions for Foundry resources

## Setup

### 1. Provision resource
Create a Claude resource in the Microsoft Foundry portal.

### 2. Configure credentials

**API key:**
```bash
export ANTHROPIC_FOUNDRY_API_KEY=your-azure-api-key
```

**Entra ID:**
```bash
az login
```

### 3. Configure Claude Code
```bash
export CLAUDE_CODE_USE_FOUNDRY=1
export ANTHROPIC_FOUNDRY_RESOURCE={resource}
```

### 4. Pin model versions
```bash
export ANTHROPIC_DEFAULT_OPUS_MODEL='claude-opus-4-6'
export ANTHROPIC_DEFAULT_SONNET_MODEL='claude-sonnet-4-6'
export ANTHROPIC_DEFAULT_HAIKU_MODEL='claude-haiku-4-5'
```

## RBAC

Use `Azure AI User` or `Cognitive Services User` roles.

## See also

- [Microsoft Foundry documentation](https://learn.microsoft.com/en-us/azure/ai-foundry/what-is-azure-ai-foundry)
