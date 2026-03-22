<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/amazon-bedrock -->

# Claude Code on Amazon Bedrock

> Learn about configuring Claude Code through Amazon Bedrock, including setup, IAM configuration, and troubleshooting.

## Prerequisites

Before configuring Claude Code with Bedrock, ensure you have:

- An AWS account with Bedrock access enabled
- Access to desired Claude models in Bedrock
- AWS CLI installed and configured (optional)
- Appropriate IAM permissions

> **Note:** If you are deploying Claude Code to multiple users, pin your model versions to prevent breakage when Anthropic releases new models.

## Setup

### 1. Submit use case details

First-time users of Anthropic models are required to submit use case details before invoking a model.

1. Ensure you have the right IAM permissions
2. Navigate to the Amazon Bedrock console
3. Select Chat/Text playground
4. Choose any Anthropic model and fill out the use case form

### 2. Configure AWS credentials

Claude Code uses the default AWS SDK credential chain. Options:

**Option A: AWS CLI configuration**
```bash
aws configure
```

**Option B: Environment variables (access key)**
```bash
export AWS_ACCESS_KEY_ID=your-access-key-id
export AWS_SECRET_ACCESS_KEY=your-secret-access-key
export AWS_SESSION_TOKEN=your-session-token
```

**Option C: Environment variables (SSO profile)**
```bash
aws sso login --profile=<your-profile-name>
export AWS_PROFILE=your-profile-name
```

**Option D: AWS Management Console credentials**
```bash
aws login
```

**Option E: Bedrock API keys**
```bash
export AWS_BEARER_TOKEN_BEDROCK=your-bedrock-api-key
```

#### Advanced credential configuration

Claude Code supports automatic credential refresh for AWS SSO and corporate identity providers.

```json
{
  "awsAuthRefresh": "aws sso login --profile myprofile",
  "env": {
    "AWS_PROFILE": "myprofile"
  }
}
```

### 3. Configure Claude Code

```bash
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1
```

### 4. Pin model versions

> **Warning:** Pin specific model versions for every deployment to avoid breakage.

```bash
export ANTHROPIC_DEFAULT_OPUS_MODEL='us.anthropic.claude-opus-4-6-v1'
export ANTHROPIC_DEFAULT_SONNET_MODEL='us.anthropic.claude-sonnet-4-6'
export ANTHROPIC_DEFAULT_HAIKU_MODEL='us.anthropic.claude-haiku-4-5-20251001-v1:0'
```

Default models when no pinning variables are set:

| Model type       | Default value                                 |
| :--------------- | :-------------------------------------------- |
| Primary model    | `global.anthropic.claude-sonnet-4-6`          |
| Small/fast model | `us.anthropic.claude-haiku-4-5-20251001-v1:0` |

#### Map each model version to an inference profile

Use `modelOverrides` in your settings file for multiple versions:

```json
{
  "modelOverrides": {
    "claude-opus-4-6": "arn:aws:bedrock:us-east-2:123456789012:application-inference-profile/opus-46-prod",
    "claude-opus-4-5-20251101": "arn:aws:bedrock:us-east-2:123456789012:application-inference-profile/opus-45-prod"
  }
}
```

## IAM configuration

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowModelAndInferenceProfileAccess",
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream",
        "bedrock:ListInferenceProfiles"
      ],
      "Resource": [
        "arn:aws:bedrock:*:*:inference-profile/*",
        "arn:aws:bedrock:*:*:application-inference-profile/*",
        "arn:aws:bedrock:*:*:foundation-model/*"
      ]
    },
    {
      "Sid": "AllowMarketplaceSubscription",
      "Effect": "Allow",
      "Action": [
        "aws-marketplace:ViewSubscriptions",
        "aws-marketplace:Subscribe"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:CalledViaLast": "bedrock.amazonaws.com"
        }
      }
    }
  ]
}
```

## AWS Guardrails

```json
{
  "env": {
    "ANTHROPIC_CUSTOM_HEADERS": "X-Amzn-Bedrock-GuardrailIdentifier: your-guardrail-id\nX-Amzn-Bedrock-GuardrailVersion: 1"
  }
}
```

## Troubleshooting

- Check model availability: `aws bedrock list-inference-profiles --region your-region`
- Switch to a supported region: `export AWS_REGION=us-east-1`
- Consider using inference profiles for cross-region access
- Claude Code uses the Bedrock Invoke API and does not support the Converse API

## Additional resources

- [Bedrock documentation](https://docs.aws.amazon.com/bedrock/)
- [Bedrock pricing](https://aws.amazon.com/bedrock/pricing/)
- [Bedrock inference profiles](https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-support.html)
