# Setup guide

## Prerequisites

- GitHub repository with Actions enabled
- [OpenAI API key](https://platform.openai.com/api-keys) (Stage 1 spec generation)
- [Cursor API key](https://cursor.com/settings) with **cloud agents** enabled
- Cursor cloud agent access to your GitHub repo (Settings → Integrations → GitHub)

## Secrets

Add under **Settings → Secrets and variables → Actions**:

| Secret | Used by | Required |
|--------|---------|----------|
| `OPENAI_API_KEY` | `issue-spec.yml` | Yes |
| `CURSOR_API_KEY` | `issue-implement.yml` | Yes |

`GITHUB_TOKEN` is provided automatically by Actions.

## Install into an existing repo

### Option A — CLI (recommended)

```bash
npx issue-bench init
cd your-app && npm install
git add .github package.json && git commit -m "Add issue-bench pipeline"
```

### Option B — Copy template

Copy from [`template/`](../../template/):

- `.github/workflows/issue-spec.yml`
- `.github/workflows/issue-implement.yml`
- `.github/ai-spec-context.md`
- `.github/ai-implement-context.md`
- `.github/issue-bench.yml`
- `package.json` dependency on `@issue-bench/dispatch`

Run `npm install` to install the dispatch package.

## Customize context files

Edit `.github/ai-spec-context.md` and `.github/ai-implement-context.md` with your stack, directories, and conventions. The agents read these on every run — treat them as an employee handbook.

Optional: adjust `.github/issue-bench.yml` for model, default branch, and custom post-implement reminders.

### issue-bench.yml schema (v1)

```yaml
project:
  name: "My App"
  defaultBranch: main
agent:
  model: composer-2.5
  startingRef: main
commands:
  build: "npm run build"
  test: "npm run test:e2e"
prompt:
  postImplementReminders: |
    Multi-line reminders appended to the agent prompt.
    Use {N} for the issue number.
  agentStartedComment: |
    Optional custom text for the issue comment when the agent starts.
```

## Branch protection (optional)

After your first successful CI run, enable branch protection on `main` and require status checks before merge. See [recipes/ci-gates.md](recipes/ci-gates.md) for a full quality-gate setup used in production on [Fasted](https://github.com/mitchelldawkinsjr/Fasted).

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Stage 2 fails immediately | Issue needs `spec-added` before `ready` |
| Agent fails to start | Verify `CURSOR_API_KEY` and Cursor repo access |
| Empty spec comment | Check `OPENAI_API_KEY` and `ai-spec-context.md` size |
| `npm ci` fails in Actions | Ensure `package.json` lists `@issue-bench/dispatch` |
