<!-- Last fetched: 2026-03-22 from https://code.claude.com/docs/en/chrome -->

# Use Claude Code with Chrome (beta)

> Connect Claude Code to your Chrome browser to test web apps, debug with console logs, automate form filling, and extract data from web pages.

Claude Code integrates with the Claude in Chrome browser extension for browser automation from the CLI or VS Code.

## Capabilities

- **Live debugging**: read console errors and DOM state, then fix the code
- **Design verification**: build a UI, then verify it in the browser
- **Web app testing**: test form validation, check for regressions
- **Authenticated web apps**: interact with Google Docs, Gmail, Notion
- **Data extraction**: pull structured information from web pages
- **Task automation**: automate repetitive browser tasks
- **Session recording**: record browser interactions as GIFs

## Prerequisites

- Google Chrome or Microsoft Edge
- Claude in Chrome extension v1.0.36+
- Claude Code v2.0.73+
- A direct Anthropic plan (Pro, Max, Teams, or Enterprise)

## Get started in the CLI

```bash
claude --chrome
```

Then ask Claude to use the browser:

```text
Go to code.claude.com/docs, click on the search box,
type "hooks", and tell me what results appear
```

Run `/chrome` to check connection status, manage permissions, or reconnect.

### Enable Chrome by default

Run `/chrome` and select "Enabled by default".

## Example workflows

### Test a local web application

```text
I just updated the login form validation. Can you open localhost:3000,
try submitting the form with invalid data, and check if the error
messages appear correctly?
```

### Debug with console logs

```text
Open the dashboard page and check the console for any errors when
the page loads.
```

### Automate form filling

```text
I have a spreadsheet of customer contacts in contacts.csv. For each row,
go to the CRM, click "Add Contact", and fill in the fields.
```

### Extract data from web pages

```text
Go to the product listings page and extract the name, price, and
availability for each item. Save as CSV.
```

### Record a demo GIF

```text
Record a GIF showing how to complete the checkout flow.
```

## Troubleshooting

| Error                                | Cause                                            | Fix                                                             |
| ------------------------------------ | ------------------------------------------------ | --------------------------------------------------------------- |
| "Browser extension is not connected" | Native messaging host cannot reach the extension | Restart Chrome and Claude Code, then run `/chrome` to reconnect |
| "Extension not detected"             | Chrome extension is not installed or is disabled | Install or enable the extension in `chrome://extensions`        |
| "No tab available"                   | Claude tried to act before a tab was ready       | Ask Claude to create a new tab and retry                        |
| "Receiving end does not exist"       | Extension service worker went idle               | Run `/chrome` and select "Reconnect extension"                  |

## See also

- VS Code browser automation
- CLI reference
- Common workflows
- Data and privacy
