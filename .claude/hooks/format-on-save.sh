#!/bin/bash
# format-on-save.sh — Auto-format files after Claude edits them
# Used by PostToolUse hook (Edit|Write matcher)
# Detects file type and runs the appropriate formatter

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ] || [ ! -f "$FILE_PATH" ]; then
  exit 0
fi

EXTENSION="${FILE_PATH##*.}"

case "$EXTENSION" in
  ts|tsx|js|jsx|json|css|scss|html|md|yaml|yml)
    if command -v npx &> /dev/null && [ -f "node_modules/.bin/prettier" ]; then
      npx prettier --write "$FILE_PATH" 2>/dev/null
    fi
    ;;
  dart)
    if command -v dart &> /dev/null; then
      dart format "$FILE_PATH" 2>/dev/null
    fi
    ;;
  py)
    if command -v black &> /dev/null; then
      black --quiet "$FILE_PATH" 2>/dev/null
    elif command -v ruff &> /dev/null; then
      ruff format "$FILE_PATH" 2>/dev/null
    fi
    ;;
  rs)
    if command -v rustfmt &> /dev/null; then
      rustfmt "$FILE_PATH" 2>/dev/null
    fi
    ;;
  go)
    if command -v gofmt &> /dev/null; then
      gofmt -w "$FILE_PATH" 2>/dev/null
    fi
    ;;
esac

exit 0
