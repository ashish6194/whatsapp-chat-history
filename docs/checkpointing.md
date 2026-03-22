<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/checkpointing -->

# Checkpointing

> Track, rewind, and summarize Claude's edits and conversation to manage session state.

Claude Code automatically tracks Claude's file edits as you work, allowing you to quickly undo changes and rewind to previous states.

## How checkpoints work

### Automatic tracking

- Every user prompt creates a new checkpoint
- Checkpoints persist across sessions
- Automatically cleaned up along with sessions after 30 days (configurable)

### Rewind and summarize

Press `Esc` twice or use `/rewind` to open the rewind menu. Actions:

- **Restore code and conversation**: revert both to that point
- **Restore conversation**: rewind to that message while keeping current code
- **Restore code**: revert file changes while keeping conversation
- **Summarize from here**: compress conversation from this point forward
- **Never mind**: return without changes

## Common use cases

- Exploring alternatives
- Recovering from mistakes
- Iterating on features
- Freeing context space

## Limitations

### Bash command changes not tracked

Only direct file edits made through Claude's file editing tools are tracked, not bash commands like `rm`, `mv`, `cp`.

### External changes not tracked

Only files edited within the current session are captured.

### Not a replacement for version control

Checkpoints are designed for quick, session-level recovery. Continue using Git for permanent history.

## See also

- Interactive mode
- Built-in commands (`/rewind`)
- CLI reference
