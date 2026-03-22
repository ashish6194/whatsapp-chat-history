---
paths:
  - "**/*test*"
  - "**/*spec*"
  - "**/test/**"
  - "**/tests/**"
  - "**/__tests__/**"
---

# Testing Rules

- Write tests that verify behavior, not implementation details
- Each test should be independent — no shared mutable state
- Name tests to describe what they verify: "should reject expired tokens"
- Prefer real implementations over mocks at system boundaries
- Test edge cases: empty inputs, nulls, boundaries, error paths
- A test that never fails is not testing anything
