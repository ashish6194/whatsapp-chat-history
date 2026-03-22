<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/best-practices -->

# Best Practices for Claude Code

> Tips and patterns for getting the most out of Claude Code, from configuring your environment to scaling across parallel sessions.

Claude Code is an agentic coding environment. Instead of writing code yourself and asking Claude to review it, you describe what you want and Claude figures out how to build it.

Most best practices are based on one constraint: Claude's context window fills up fast, and performance degrades as it fills.

## Give Claude a way to verify its work

Include tests, screenshots, or expected outputs so Claude can check itself. This is the single highest-leverage thing you can do.

| Strategy                              | Before                                                  | After                                                                                   |
| ------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Provide verification criteria**     | "implement a function that validates email addresses"   | "write a validateEmail function with test cases, run the tests after implementing"      |
| **Verify UI changes visually**        | "make the dashboard look better"                        | "[paste screenshot] implement this design, take a screenshot and compare"               |
| **Address root causes, not symptoms** | "the build is failing"                                  | "the build fails with this error: [paste]. fix it and verify the build succeeds"        |

## Explore first, then plan, then code

Separate research and planning from implementation to avoid solving the wrong problem.

1. **Explore**: Enter Plan Mode, read files and answer questions
2. **Plan**: Create a detailed implementation plan
3. **Implement**: Switch to Normal Mode and code
4. **Commit**: Ask Claude to commit and create a PR

## Provide specific context in your prompts

Reference specific files, mention constraints, and point to example patterns.

### Provide rich content

- Reference files with `@`
- Paste images directly
- Give URLs for documentation
- Pipe in data with `cat error.log | claude`

## Configure your environment

### Write an effective CLAUDE.md

Run `/init` to generate a starter CLAUDE.md file. Keep it concise.

| Include                                              | Exclude                                          |
| ---------------------------------------------------- | ------------------------------------------------ |
| Bash commands Claude can't guess                     | Anything Claude can figure out by reading code   |
| Code style rules that differ from defaults           | Standard language conventions                    |
| Testing instructions                                 | Detailed API documentation                       |
| Repository etiquette                                 | Information that changes frequently              |

### Configure permissions

Use `/permissions` to allowlist safe commands or `/sandbox` for OS-level isolation.

### Use CLI tools

Tell Claude Code to use CLI tools like `gh`, `aws`, `gcloud`, and `sentry-cli`.

### Connect MCP servers

Run `claude mcp add` to connect external tools like Notion, Figma, or your database.

### Set up hooks

Hooks run scripts automatically at specific points in Claude's workflow. Unlike CLAUDE.md instructions which are advisory, hooks are deterministic.

### Create skills

Create `SKILL.md` files in `.claude/skills/` to give Claude domain knowledge and reusable workflows.

### Create custom subagents

Define specialized assistants in `.claude/agents/` that Claude can delegate to for isolated tasks.

### Install plugins

Run `/plugin` to browse the marketplace.

## Communicate effectively

### Ask codebase questions

Ask Claude the same sorts of questions you would ask another engineer.

### Let Claude interview you

For larger features, have Claude interview you first with the `AskUserQuestion` tool.

## Manage your session

### Course-correct early and often

- `Esc`: stop Claude mid-action
- `Esc + Esc` or `/rewind`: restore previous state
- `/clear`: reset context between unrelated tasks

### Manage context aggressively

- Use `/clear` frequently between tasks
- Run `/compact <instructions>` for controlled compaction
- Use `/btw` for quick questions that don't grow context

### Use subagents for investigation

Delegate research with subagents to keep your main conversation clean.

### Rewind with checkpoints

Every action Claude makes creates a checkpoint. Double-tap Escape or run `/rewind`.

### Resume conversations

```bash
claude --continue    # Resume the most recent conversation
claude --resume      # Select from recent conversations
```

## Automate and scale

### Run non-interactive mode

```bash
claude -p "Explain what this project does"
claude -p "List all API endpoints" --output-format json
```

### Run multiple Claude sessions

- Claude Code desktop app
- Claude Code on the web
- Agent teams

### Fan out across files

```bash
for file in $(cat files.txt); do
  claude -p "Migrate $file from React to Vue." \
    --allowedTools "Edit,Bash(git commit *)"
done
```

## Avoid common failure patterns

- The kitchen sink session: `/clear` between unrelated tasks
- Correcting over and over: after two failed corrections, `/clear` and rewrite
- The over-specified CLAUDE.md: ruthlessly prune
- The trust-then-verify gap: always provide verification
- The infinite exploration: scope investigations or use subagents

## Related resources

- How Claude Code works
- Extend Claude Code (features overview)
- Common workflows
- CLAUDE.md (memory)
