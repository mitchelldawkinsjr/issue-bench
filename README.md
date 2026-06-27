# issue-bench

Human-gated GitHub issue pipeline: OpenAI writes the spec, you add `ready`, a Cursor cloud agent opens a small draft PR. GitHub is the project manager.

Monorepo for [issue-bench](https://github.com/mitchelldawkinsjr/issue-bench) OSS.

## Packages

| Path | Purpose |
|------|---------|
| [`template/`](template/) | GitHub **Use this template** root |
| [`packages/dispatch`](packages/dispatch/) | `@issue-bench/dispatch` — Cursor cloud agent dispatch |
| [`packages/cli`](packages/cli/) | `npx issue-bench init` scaffolding CLI |
| [`workflows/`](workflows/) | Canonical workflow YAML (copied into template / CLI output) |
| [`context/`](context/) | Base context templates and stack presets |
| [`docs/`](docs/) | Setup, labels, optional Tier 2 recipes |

## Quick start

### Option A — GitHub template

1. [Use this template](https://github.com/mitchelldawkinsjr/issue-bench/generate) (select the `template/` folder as repo root, or copy `template/` contents into your app repo)
2. Follow [template/README.md](template/README.md)

### Option B — CLI

```bash
npx issue-bench init --preset vite-react --yes --dir ./my-app --name "My App" --repo owner/repo
```

## Development

```bash
npm install
npm run sync-template    # copy workflows + base context into template/
npm run validate         # structure + syntax checks
npm test
```

## License

MIT
