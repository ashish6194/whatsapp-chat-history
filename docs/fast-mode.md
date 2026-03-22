<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/fast-mode -->

# Speed up responses with fast mode

> Get faster Opus 4.6 responses by toggling fast mode.

Fast mode is a high-speed configuration for Opus 4.6, making the model 2.5x faster at a higher cost per token. Same quality, just faster responses.

## Toggle fast mode

- Type `/fast` and press Tab
- Or set `"fastMode": true` in user settings

## Cost tradeoff

| Mode                  | Input (MTok) | Output (MTok) |
| --------------------- | ------------ | ------------- |
| Fast mode on Opus 4.6 | $30          | $150          |

## When to use fast mode

**Good for**: rapid iteration, live debugging, time-sensitive work

**Standard mode better for**: long autonomous tasks, batch processing, cost-sensitive work

### Fast mode vs effort level

| Setting           | Effect                                                |
| ----------------- | ----------------------------------------------------- |
| Fast mode         | Same quality, lower latency, higher cost              |
| Lower effort      | Less thinking, faster, potentially lower quality      |

You can combine both for maximum speed on straightforward tasks.

## Requirements

- Not available on Bedrock, Vertex, or Foundry
- Extra usage must be enabled
- Teams/Enterprise: admin must enable fast mode

## Handle rate limits

When fast mode rate limit is hit, automatically falls back to standard Opus 4.6.

## See also

- Model configuration
- Manage costs effectively
- Status line configuration
