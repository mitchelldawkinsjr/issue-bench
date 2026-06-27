# issue-bench template

Human-gated GitHub issue pipeline: OpenAI writes the spec, you add `ready`, a Cursor cloud agent opens a small draft PR.

**Tier 1 only** — spec → implement → draft PR → human merge. Optional CI and review-bot recipes live in [docs/recipes/](../docs/recipes/).

## Prerequisites

- GitHub Actions enabled
- `OPENAI_API_KEY` and `CURSOR_API_KEY` secrets
- Cursor cloud agent access to this repository

## Quick start

1. **Use this template** — create a new repo from [github.com/mitchelldawkinsjr/issue-bench](https://github.com/mitchelldawkinsjr/issue-bench) and copy the `template/` directory contents into your repo root (or run `npx issue-bench init` in an existing project).

2. **Customize context** — edit `.github/ai-spec-context.md` and `.github/ai-implement-context.md` with your stack. Replace `My App` / `owner/repo` placeholders. See `examples/vite-react/` for snippets.

3. **Install dispatch package** — run `npm install` (installs `@issue-bench/dispatch`).

4. **Add secrets** — `OPENAI_API_KEY`, `CURSOR_API_KEY` under Settings → Secrets → Actions.

5. **Run the pipeline:**
   - Create a GitHub issue with a clear description
   - Add label `needs-spec` — wait for spec comment (~30s)
   - Review acceptance criteria
   - Add label `ready` — Cursor cloud agent implements
   - Review draft PR when `pr-opened` appears → merge manually

6. **Iterate** — gaps in agent behavior become new items in `ai-implement-context.md`.

## Alternative: CLI init

```bash
npx issue-bench init --preset vite-react --yes --name "My App" --repo owner/repo
npm install
```

## Files included

| File | Purpose |
|------|---------|
| `.github/workflows/issue-spec.yml` | Stage 1: `needs-spec` → OpenAI spec |
| `.github/workflows/issue-implement.yml` | Stage 2: `ready` → cloud agent |
| `.github/ai-spec-context.md` | Repo context for spec generation |
| `.github/ai-implement-context.md` | Implement agent prompt + checklist |
| `.github/issue-bench.yml` | Optional dispatch config |
| `package.json` | `@issue-bench/dispatch` dependency |

## Labels

| Label | Applied by |
|-------|------------|
| `needs-spec` | Human |
| `spec-added` | Stage 1 auto |
| `ready` | Human |
| `agent-working` | Stage 2 auto |
| `pr-opened` | Agent |
| `agent-failed` | Stage 2 on failure |

See [docs/LABELS.md](../docs/LABELS.md) for the full state machine.

## Learn more

- [Setup guide](../docs/SETUP.md)
- [Blog: Building a Team of Engineers](https://mitchelldawkins.com/blog/team-of-engineers-cursor-agent-pipeline)
