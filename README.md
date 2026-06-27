# issue-bench

Human-gated GitHub issue pipeline: OpenAI writes the spec, you add `ready`, a Cursor cloud agent opens a small draft PR. GitHub is the project manager.

## Start here

**New to issue-bench?** Read the blog post first — it explains the problem, the architecture, a production run on [Fasted](https://github.com/mitchelldawkinsjr/Fasted), and why small reversible PRs matter:

**[Building a Team of Engineers: From GitHub Issues to Small, Reversible PRs](https://www.mitchelldawkins.com/blog/team-of-engineers-cursor-agent-pipeline)**

That post is the narrative. This repo is the artifact: workflows, agent context templates, and a CLI to drop the pipeline into your project.

## What you get (Tier 1)

```text
Issue → needs-spec → OpenAI spec comment → ready → Cursor cloud agent → draft PR → you merge
```

| Stage | Trigger | Who |
|-------|---------|-----|
| Spec | `needs-spec` label | OpenAI via GitHub Actions |
| Gate | You review the spec | Human |
| Implement | `ready` label | Cursor cloud agent |
| Gate | You review the PR | Human |

Tier 2 (optional CI gates, Bugbot/Ponytail, deploy health) is documented in [docs/recipes/](docs/recipes/) — see [Fasted #47](https://github.com/mitchelldawkinsjr/Fasted/issues/47) for a reference implementation.

## Quick start

### Option A — CLI (fastest)

```bash
npx issue-bench init --preset vite-react --yes --name "My App" --repo owner/repo
npm install
```

Add `OPENAI_API_KEY` and `CURSOR_API_KEY` to GitHub Actions secrets. See [docs/SETUP.md](docs/SETUP.md).

### Option B — Copy the template

Copy [`template/`](template/) into your repo (workflows, `.github/ai-*-context.md`, `scripts/`, `package.json`). Details in [template/README.md](template/README.md).

Enable **Use this template** instructions: [docs/TEMPLATE_REPOSITORY.md](docs/TEMPLATE_REPOSITORY.md).

## Repo layout

| Path | Purpose |
|------|---------|
| [`template/`](template/) | Consumer-facing template (copy into your app) |
| [`packages/dispatch`](packages/dispatch/) | `@issue-bench/dispatch` — canonical dispatch script source |
| [`packages/cli`](packages/cli/) | `npx issue-bench init` |
| [`workflows/`](workflows/) | Canonical workflow YAML |
| [`context/`](context/) | Base context templates and stack presets |
| [`docs/`](docs/) | Setup, labels, recipes |

## Development

```bash
npm install
npm run sync-template    # copy workflows + context + scripts into template/
npm run validate
npm test
```

## Learn more

- [Blog: Building a Team of Engineers](https://www.mitchelldawkins.com/blog/team-of-engineers-cursor-agent-pipeline) — architecture, production test, lessons learned
- [Setup guide](docs/SETUP.md) — secrets, Cursor repo access, config schema
- [Label state machine](docs/LABELS.md)
- [Fasted pipeline docs (issue #30)](https://github.com/mitchelldawkinsjr/Fasted/issues/30) — live reference repo

## License

MIT
