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
