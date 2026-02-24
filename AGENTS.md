# AGENTS.md

See [ARCHITECTURE.md](ARCHITECTURE.md) for system design. See [docs/](docs/) for detailed documentation.

## Commands

```bash
bun dev          # Start development server (localhost:3000)
bun run build    # Build for production (static export to /out)
bun run lint     # Run ESLint
bun run test     # Run Vitest in watch mode
bun run test:run # Run Vitest once
```

## Agent Roles

### Coding Agent

You write code in this repo. Follow these rules:

- **Package manager**: Bun only (`bun install`, `bun run`, `bunx`)
- **Path alias**: `@/*` maps to `./src/*`
- **Components**: shadcn/ui new-york style (`bunx --bun shadcn@latest add [component]`)
- **Forms**: react-hook-form + Zod via `@hookform/resolvers`
- **Styling**: Tailwind CSS v4, CSS custom properties for trading colors
- **No `any`**, no `@ts-ignore`, no `@ts-expect-error`
- **Static export**: All pages must work with `output: 'export'`. No server-side features (API routes, SSR, middleware)
- **Leverage math**: `positionSize = riskAmount / riskPerUnit`. Leverage only affects margin, not P&L. Never double-count leverage.

### Explore Agent

Search this codebase. Key locations:

| What | Where |
|------|-------|
| Pages | `src/app/**/page.tsx` |
| Calculators | `src/components/calculators/` |
| Core math | `src/lib/calculations.ts` |
| Formatters | `src/lib/formatters.ts` |
| Hooks | `src/hooks/` |
| UI primitives | `src/components/ui/` |
| Design tokens | `src/app/globals.css` (:root, .dark) |
| Structured data | `src/components/structured-data.tsx` |
| CI/CD | `.github/workflows/cloudflare-pages.yml` |

### Test Agent

- Framework: Vitest
- Test files: colocated as `*.test.ts` (e.g. `src/lib/calculations.test.ts`)
- Run: `bun run test:run`
- Coverage: `bun run test:coverage` (v8 provider)
