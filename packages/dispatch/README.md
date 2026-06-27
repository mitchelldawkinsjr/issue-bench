# @issue-bench/dispatch

Dispatches a Cursor cloud agent when the `ready` label is applied to a GitHub issue.

Used by [issue-bench](https://github.com/mitchelldawkinsjr/issue-bench) workflows. Reads `.github/ai-implement-context.md` and optional `.github/issue-bench.yml` from the consumer repo.

## Install

```bash
npm install @issue-bench/dispatch
```

Or from GitHub before npm publish:

```bash
npm install github:mitchelldawkinsjr/issue-bench#packages/dispatch
```

## Workflow usage

```yaml
- run: node node_modules/@issue-bench/dispatch/dispatch-cursor-agent.mjs
  env:
    CURSOR_API_KEY: ${{ secrets.CURSOR_API_KEY }}
    GH_TOKEN: ${{ github.token }}
    ISSUE_NUMBER: ${{ github.event.issue.number }}
    REPO: ${{ github.repository }}
```

## Configuration

Optional `.github/issue-bench.yml` — see [docs/SETUP.md](../../docs/SETUP.md) in the repo root.
