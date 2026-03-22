# Security Rules

- Never hardcode secrets, API keys, or credentials in source code
- Validate all user input at system boundaries
- Use parameterized queries — never concatenate user input into SQL
- Sanitize output to prevent XSS
- Check authorization on every endpoint, not just the frontend
- Log security events but never log sensitive data (passwords, tokens, PII)
- Use HTTPS for all external communications
