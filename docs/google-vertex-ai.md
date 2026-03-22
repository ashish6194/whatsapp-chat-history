<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/google-vertex-ai -->

# Claude Code on Google Vertex AI

> Configure Claude Code through Google Vertex AI, including setup, IAM, and troubleshooting.

## Prerequisites

- GCP account with billing enabled
- GCP project with Vertex AI API enabled
- Access to desired Claude models
- Google Cloud SDK installed

## Setup

### 1. Enable Vertex AI API
```bash
gcloud config set project YOUR-PROJECT-ID
gcloud services enable aiplatform.googleapis.com
```

### 2. Request model access
Navigate to Vertex AI Model Garden and request access to Claude models.

### 3. Configure GCP credentials
Uses standard Google Cloud authentication.

### 4. Configure Claude Code
```bash
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION=global
export ANTHROPIC_VERTEX_PROJECT_ID=YOUR-PROJECT-ID
```

### 5. Pin model versions
```bash
export ANTHROPIC_DEFAULT_OPUS_MODEL='claude-opus-4-6'
export ANTHROPIC_DEFAULT_SONNET_MODEL='claude-sonnet-4-6'
export ANTHROPIC_DEFAULT_HAIKU_MODEL='claude-haiku-4-5@20251001'
```

## IAM configuration

Assign `roles/aiplatform.user` role with `aiplatform.endpoints.predict` permission.

## Troubleshooting

- Quota issues: check quotas in Cloud Console
- Model not found: confirm model is enabled in Model Garden
- 429 errors: consider switching to global endpoint

## Additional resources

- [Vertex AI documentation](https://cloud.google.com/vertex-ai/docs)
- [Vertex AI pricing](https://cloud.google.com/vertex-ai/pricing)
