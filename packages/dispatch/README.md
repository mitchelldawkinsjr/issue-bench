# @issue-bench/dispatch

Source of truth for the Cursor cloud agent dispatch script used by [issue-bench](https://github.com/mitchelldawkinsjr/issue-bench).

## Consumer install

**Recommended:** copy via CLI or template sync (vendored into `scripts/`):

```bash
npx issue-bench init
npm install   # installs @cursor/sdk
```

Workflows run `node scripts/dispatch-cursor-agent.mjs`.

## npm package (optional)

When published to npm:

```bash
npm install @issue-bench/dispatch @cursor/sdk
node node_modules/@issue-bench/dispatch/dispatch-cursor-agent.mjs
```

Until published, use vendored scripts from `template/scripts/` or `npx issue-bench init`.

## Configuration

Optional `.github/issue-bench.yml` in the consumer repo — see [docs/SETUP.md](../../docs/SETUP.md).
