<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/cli-reference -->

# CLI reference

> Complete reference for Claude Code command-line interface, including commands and flags.

## CLI commands

| Command                         | Description                                          | Example                                      |
| :------------------------------ | :--------------------------------------------------- | :------------------------------------------- |
| `claude`                        | Start interactive session                            | `claude`                                     |
| `claude "query"`                | Start with initial prompt                            | `claude "explain this project"`              |
| `claude -p "query"`             | Query via SDK, then exit                             | `claude -p "explain this function"`          |
| `cat file \| claude -p "query"` | Process piped content                                | `cat logs.txt \| claude -p "explain"`        |
| `claude -c`                     | Continue most recent conversation                    | `claude -c`                                  |
| `claude -r "<session>" "query"` | Resume session by ID or name                         | `claude -r "auth-refactor" "Finish this PR"` |
| `claude update`                 | Update to latest version                             | `claude update`                              |
| `claude auth login`             | Sign in to your Anthropic account                    | `claude auth login --console`                |
| `claude auth logout`            | Log out                                              | `claude auth logout`                         |
| `claude auth status`            | Show authentication status                           | `claude auth status`                         |
| `claude agents`                 | List all configured subagents                        | `claude agents`                              |
| `claude mcp`                    | Configure MCP servers                                | See MCP documentation                        |
| `claude remote-control`         | Start a Remote Control server                        | `claude remote-control --name "My Project"`  |

## CLI flags

| Flag                                      | Description                                                          |
| :---------------------------------------- | :------------------------------------------------------------------- |
| `--add-dir`                               | Add additional working directories                                   |
| `--agent`                                 | Specify an agent for the current session                             |
| `--allowedTools`                          | Tools that execute without prompting                                 |
| `--append-system-prompt`                  | Append custom text to the system prompt                              |
| `--channels`                              | MCP servers for channel notifications                                |
| `--chrome`                                | Enable Chrome browser integration                                    |
| `--continue`, `-c`                        | Load the most recent conversation                                    |
| `--dangerously-skip-permissions`          | Skip permission prompts (use with caution)                           |
| `--debug`                                 | Enable debug mode                                                    |
| `--disallowedTools`                       | Tools that are removed from context                                  |
| `--effort`                                | Set effort level (low, medium, high, max)                            |
| `--fallback-model`                        | Enable automatic fallback model                                      |
| `--fork-session`                          | Create a new session ID when resuming                                |
| `--from-pr`                               | Resume sessions linked to a PR                                       |
| `--json-schema`                           | Get validated JSON output matching a schema                          |
| `--max-budget-usd`                        | Maximum dollar amount for API calls                                  |
| `--max-turns`                             | Limit number of agentic turns                                        |
| `--mcp-config`                            | Load MCP servers from JSON files                                     |
| `--model`                                 | Set the model for the session                                        |
| `--name`, `-n`                            | Set a display name for the session                                   |
| `--output-format`                         | Specify output format (text, json, stream-json)                      |
| `--permission-mode`                       | Begin in a specified permission mode                                 |
| `--print`, `-p`                           | Print response without interactive mode                              |
| `--remote`                                | Create a new web session                                             |
| `--remote-control`, `--rc`                | Start with Remote Control enabled                                    |
| `--resume`, `-r`                          | Resume a specific session                                            |
| `--system-prompt`                         | Replace the entire system prompt                                     |
| `--teleport`                              | Resume a web session locally                                         |
| `--tools`                                 | Restrict which built-in tools Claude can use                         |
| `--verbose`                               | Enable verbose logging                                               |
| `--version`, `-v`                         | Output the version number                                            |
| `--worktree`, `-w`                        | Start in an isolated git worktree                                    |

### System prompt flags

| Flag                          | Behavior                        |
| :---------------------------- | :------------------------------ |
| `--system-prompt`             | Replaces the entire prompt      |
| `--system-prompt-file`        | Replaces with file contents     |
| `--append-system-prompt`      | Appends to the default prompt   |
| `--append-system-prompt-file` | Appends file contents           |

## See also

- Chrome extension
- Interactive mode
- Quickstart guide
- Common workflows
- Settings
