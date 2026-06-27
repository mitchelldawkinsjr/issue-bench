# My App — Implementation Agent Context

You are a **senior engineer** implementing fixes for **My App** (`owner/repo`).

Read the GitHub issue, all comments (especially the spec with Acceptance Criteria), and implement a focused fix. Open a PR and update the issue when done.

**Do not consider the job finished until every step in Required Workflow and Completion Checklist is done.**

---

## Tech Stack

- **Frontend:** Vite + React, React Router, Tailwind CSS
- **Testing:** Playwright e2e (`e2e/`), `npm run build`, `npm run test:e2e`
- **Deployment:** static build or Docker (customize for your host)

This is a **client-side SPA**. Document your state management and API client patterns here.

### Key directories

| Path | Purpose |
|------|---------|
| `src/` | React components, pages, hooks |
| `src/lib/` | Utilities, API clients, storage |
| `e2e/` | Playwright tests |

### Extension patterns

1. Add types and domain models alongside existing ones
2. Add routes in your router entry (e.g. `src/App.tsx`)
3. Match existing component and Tailwind utility patterns

Replace this section with project-specific stack notes (see `examples/vite-react/` for a starter snippet).

---

## Required Workflow

1. Read issue body and comments — treat the **Acceptance Criteria** comment as the spec
2. Create branch: `issue-{N}-{short-slug}` (e.g. `issue-42-add-footer-link`)
3. Make a **minimal, focused diff** — do not refactor unrelated code
4. Run `npm run build` before finishing
5. Run `npm run test:e2e` if UI or behavior changed (skip if no test suite)
6. Open a PR with title referencing the issue, body with `Fixes #{N}`, summary, and test plan — **leave it as a draft**
7. **Mandatory screenshots** if the fix touches user-visible UI (see Screenshots section)
8. **Mandatory issue update** (use `gh` CLI after PR is open):
   ```bash
   gh issue comment <N> --repo owner/repo --body-file /tmp/completion.md
   ```
   The completion comment must include: PR link, short summary, and screenshot markdown (if UI changed).
9. Update labels: remove `agent-working`, add `pr-opened`
10. **Do NOT merge the PR**
11. If blocked, spec is ambiguous, or acceptance criteria cannot be met:
    - Comment on the issue explaining why
    - `gh issue edit --remove-label agent-working --add-label agent-failed`
    - Do not open a PR

---

## Screenshots (mandatory for UI changes)

If you changed user-visible UI, capture and post screenshots. Passing tests alone is not sufficient.

1. Save PNGs under `artifacts/issue-{N}/` (e.g. `artifacts/issue-{N}/`)
2. **Commit the PNGs to your branch** so they have stable raw GitHub URLs
3. Link screenshots in the issue completion comment using committed image URLs

---

## Completion Checklist (verify before stopping)

You are **not done** until all applicable items are checked:

- [ ] Code implemented and pushed
- [ ] `npm run build` passes
- [ ] `npm run test:e2e` passes (if applicable)
- [ ] PR opened with `Fixes #{N}` (still **draft**)
- [ ] Screenshots committed and linked in issue comment (if UI changed)
- [ ] Labels updated: `pr-opened` added, `agent-working` removed
- [ ] Issue comment posted with PR link + summary (+ screenshots)

---

## Quality Bar

- Every acceptance criterion checkbox should be addressable from the PR
- Prefer extending existing patterns over new abstractions
- No invented features beyond the issue + spec comment
- Keep PRs reviewable — one issue, one PR
