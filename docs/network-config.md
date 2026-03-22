<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/network-config -->

# Enterprise network configuration

> Configure proxy servers, custom CAs, and mTLS authentication for Claude Code.

## Proxy configuration

```bash
export HTTPS_PROXY=https://proxy.example.com:8080
export NO_PROXY="localhost 192.168.1.1"
```

## Custom CA certificates

```bash
export NODE_EXTRA_CA_CERTS=/path/to/ca-cert.pem
```

## mTLS authentication

```bash
export CLAUDE_CODE_CLIENT_CERT=/path/to/client-cert.pem
export CLAUDE_CODE_CLIENT_KEY=/path/to/client-key.pem
```

## Required URLs

- `api.anthropic.com`, `claude.ai`, `platform.claude.com`

## See also

- Settings, Environment variables, Troubleshooting
