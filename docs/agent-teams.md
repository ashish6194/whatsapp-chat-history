<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/agent-teams -->

# Orchestrate teams of Claude Code sessions

> Coordinate multiple Claude Code instances working together as a team, with shared tasks, inter-agent messaging, and centralized management.

> **Warning:** Agent teams are experimental and disabled by default. Enable them by adding `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` to your settings.json or environment. Agent teams have known limitations around session resumption, task coordination, and shutdown behavior.

Agent teams let you coordinate multiple Claude Code instances working together. One session acts as the team lead, coordinating work, assigning tasks, and synthesizing results. Teammates work independently, each in its own context window, and communicate directly with each other.

Unlike subagents, which run within a single session and can only report back to the main agent, you can also interact with individual teammates directly without going through the lead.

> **Note:** Agent teams require Claude Code v2.1.32 or later. Check your version with `claude --version`.

This page covers:

- When to use agent teams, including best use cases and how they compare with subagents
- Starting a team
- Controlling teammates, including display modes, task assignment, and delegation
- Best practices for parallel work

## When to use agent teams

Agent teams are most effective for tasks where parallel exploration adds real value:

- **Research and review**: multiple teammates can investigate different aspects of a problem simultaneously, then share and challenge each other's findings
- **New modules or features**: teammates can each own a separate piece without stepping on each other
- **Debugging with competing hypotheses**: teammates test different theories in parallel and converge on the answer faster
- **Cross-layer coordination**: changes that span frontend, backend, and tests, each owned by a different teammate

Agent teams add coordination overhead and use significantly more tokens than a single session. They work best when teammates can operate independently. For sequential tasks, same-file edits, or work with many dependencies, a single session or subagents are more effective.

### Compare with subagents

Both agent teams and subagents let you parallelize work, but they operate differently. Choose based on whether your workers need to communicate with each other:

|                   | Subagents                                        | Agent teams                                         |
| :---------------- | :----------------------------------------------- | :-------------------------------------------------- |
| **Context**       | Own context window; results return to the caller | Own context window; fully independent               |
| **Communication** | Report results back to the main agent only       | Teammates message each other directly               |
| **Coordination**  | Main agent manages all work                      | Shared task list with self-coordination             |
| **Best for**      | Focused tasks where only the result matters      | Complex work requiring discussion and collaboration |
| **Token cost**    | Lower: results summarized back to main context   | Higher: each teammate is a separate Claude instance |

Use subagents when you need quick, focused workers that report back. Use agent teams when teammates need to share findings, challenge each other, and coordinate on their own.

## Enable agent teams

Agent teams are disabled by default. Enable them by setting the `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` environment variable to `1`, either in your shell environment or through settings.json:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

## Start your first agent team

After enabling agent teams, tell Claude to create an agent team and describe the task and the team structure you want in natural language. Claude creates the team, spawns teammates, and coordinates work based on your prompt.

Example:

```text
I'm designing a CLI tool that helps developers track TODO comments across
their codebase. Create an agent team to explore this from different angles: one
teammate on UX, one on technical architecture, one playing devil's advocate.
```

## Control your agent team

Tell the lead what you want in natural language. It handles team coordination, task assignment, and delegation based on your instructions.

### Choose a display mode

Agent teams support two display modes:

- **In-process**: all teammates run inside your main terminal. Use Shift+Down to cycle through teammates.
- **Split panes**: each teammate gets its own pane. Requires tmux or iTerm2.

### Specify teammates and models

Claude decides the number of teammates to spawn based on your task, or you can specify exactly what you want:

```text
Create a team with 4 teammates to refactor these modules in parallel.
Use Sonnet for each teammate.
```

### Require plan approval for teammates

For complex or risky tasks, you can require teammates to plan before implementing.

### Talk to teammates directly

Each teammate is a full, independent Claude Code session. You can message any teammate directly.

- **In-process mode**: use Shift+Down to cycle through teammates
- **Split-pane mode**: click into a teammate's pane

### Assign and claim tasks

The shared task list coordinates work across the team. Tasks have three states: pending, in progress, and completed.

### Shut down teammates

```text
Ask the researcher teammate to shut down
```

### Clean up the team

```text
Clean up the team
```

### Enforce quality gates with hooks

Use hooks to enforce rules when teammates finish work or tasks complete:

- `TeammateIdle`: runs when a teammate is about to go idle
- `TaskCompleted`: runs when a task is being marked complete

## How agent teams work

### Architecture

| Component     | Role                                                                                       |
| :------------ | :----------------------------------------------------------------------------------------- |
| **Team lead** | The main Claude Code session that creates the team, spawns teammates, and coordinates work |
| **Teammates** | Separate Claude Code instances that each work on assigned tasks                            |
| **Task list** | Shared list of work items that teammates claim and complete                                |
| **Mailbox**   | Messaging system for communication between agents                                          |

### Permissions

Teammates start with the lead's permission settings.

### Context and communication

Each teammate has its own context window. When spawned, a teammate loads the same project context as a regular session.

### Token usage

Agent teams use significantly more tokens than a single session. Each teammate has its own context window.

## Use case examples

### Run a parallel code review

```text
Create an agent team to review PR #142. Spawn three reviewers:
- One focused on security implications
- One checking performance impact
- One validating test coverage
```

### Investigate with competing hypotheses

```text
Users report the app exits after one message instead of staying connected.
Spawn 5 agent teammates to investigate different hypotheses. Have them talk to
each other to try to disprove each other's theories.
```

## Best practices

- Give teammates enough context
- Choose an appropriate team size (3-5 teammates for most workflows)
- Size tasks appropriately
- Wait for teammates to finish
- Start with research and review
- Avoid file conflicts
- Monitor and steer

## Troubleshooting

- Teammates not appearing
- Too many permission prompts
- Teammates stopping on errors
- Lead shuts down before work is done
- Orphaned tmux sessions

## Limitations

- No session resumption with in-process teammates
- Task status can lag
- Shutdown can be slow
- One team per session
- No nested teams
- Lead is fixed
- Permissions set at spawn
- Split panes require tmux or iTerm2

## Next steps

- Subagents for lightweight delegation
- Git worktrees for manual parallel sessions
- Compare approaches in the features overview
