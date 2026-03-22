<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/setup -->

# Advanced setup

> System requirements, platform-specific installation, version management, and uninstallation.

## System requirements

- macOS 13.0+, Windows 10 1809+, Ubuntu 20.04+, Debian 10+
- 4 GB+ RAM
- Internet connection required

## Install

```bash
# macOS, Linux, WSL
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex

# Homebrew
brew install --cask claude-code

# WinGet
winget install Anthropic.ClaudeCode
```

## Update

Native installations auto-update. Configure release channel with `autoUpdatesChannel` setting (`latest` or `stable`).

```bash
claude update  # Manual update
```

## Uninstall

```bash
rm -f ~/.local/bin/claude
rm -rf ~/.local/share/claude
rm -rf ~/.claude  # Settings (optional)
```

## See also

- Quickstart, Authentication, Troubleshooting
