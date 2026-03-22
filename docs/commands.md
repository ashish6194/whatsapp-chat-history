<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/commands -->

# Built-in commands

> Complete reference for built-in commands available in Claude Code.

Type `/` in Claude Code to see all available commands. Key commands include:

| Command                | Purpose                                                        |
| :--------------------- | :------------------------------------------------------------- |
| `/add-dir <path>`      | Add a new working directory                                    |
| `/agents`              | Manage agent configurations                                    |
| `/btw <question>`      | Ask a side question without adding to conversation             |
| `/chrome`              | Configure Chrome settings                                      |
| `/clear`               | Clear conversation history (aliases: `/reset`, `/new`)         |
| `/compact [instr]`     | Compact conversation with optional focus                       |
| `/config`              | Open Settings interface (alias: `/settings`)                   |
| `/context`             | Visualize current context usage                                |
| `/copy [N]`            | Copy last assistant response to clipboard                      |
| `/cost`                | Show token usage statistics                                    |
| `/desktop`             | Continue session in Desktop app (alias: `/app`)                |
| `/diff`                | Open interactive diff viewer                                   |
| `/doctor`              | Diagnose installation and settings                             |
| `/effort`              | Set model effort level                                         |
| `/exit`                | Exit the CLI (alias: `/quit`)                                  |
| `/export [filename]`   | Export conversation as plain text                              |
| `/fast [on\|off]`      | Toggle fast mode                                               |
| `/feedback`            | Submit feedback (alias: `/bug`)                                |
| `/branch [name]`       | Create a conversation branch (alias: `/fork`)                  |
| `/help`                | Show help and available commands                               |
| `/hooks`               | View hook configurations                                      |
| `/ide`                 | Manage IDE integrations                                        |
| `/init`                | Initialize project with CLAUDE.md                              |
| `/login`               | Sign in to Anthropic account                                   |
| `/logout`              | Sign out                                                       |
| `/mcp`                 | Manage MCP server connections                                  |
| `/memory`              | Edit CLAUDE.md memory files                                    |
| `/model [model]`       | Select or change AI model                                      |
| `/permissions`         | View or update permissions (alias: `/allowed-tools`)           |
| `/plan`                | Enter plan mode                                                |
| `/plugin`              | Manage plugins                                                 |
| `/pr-comments [PR]`    | Fetch GitHub PR comments                                       |
| `/release-notes`       | View the full changelog                                        |
| `/remote-control`      | Make session available for remote control (alias: `/rc`)       |
| `/rename [name]`       | Rename the current session                                     |
| `/resume [session]`    | Resume a conversation (alias: `/continue`)                     |
| `/rewind`              | Rewind conversation/code (alias: `/checkpoint`)                |
| `/sandbox`             | Toggle sandbox mode                                            |
| `/skills`              | List available skills                                          |
| `/status`              | Show version, model, account info                              |
| `/statusline`          | Configure status line                                          |
| `/tasks`               | List and manage background tasks                               |
| `/theme`               | Change the color theme                                         |
| `/usage`               | Show plan usage and rate limits                                |
| `/vim`                 | Toggle Vim editing mode                                        |
| `/voice`               | Toggle push-to-talk voice dictation                            |

## MCP prompts

MCP servers can expose prompts using the format `/mcp__<server>__<prompt>`.

## See also

- Skills: create your own commands
- Interactive mode
- CLI reference
