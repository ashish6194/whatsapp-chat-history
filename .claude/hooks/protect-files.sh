#!/bin/bash
# protect-files.sh — Block edits to sensitive files
# Used by PreToolUse hook (Edit|Write matcher)
# Exit 0 = allow, Exit 2 = block

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

PROTECTED_PATTERNS=(".env" ".env." "package-lock.json" "yarn.lock" "pnpm-lock.yaml" "pubspec.lock" "Podfile.lock" "Cargo.lock" ".git/" "node_modules/")

for pattern in "${PROTECTED_PATTERNS[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "Blocked: $FILE_PATH matches protected pattern '$pattern'. Edit manually if needed." >&2
    exit 2
  fi
done

exit 0
