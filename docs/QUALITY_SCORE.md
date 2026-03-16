# Quality Score

## TypeScript

- Strict mode enabled
- No `any`, `@ts-ignore`, or `@ts-expect-error`
- Explicit return types on exported functions in `src/lib/`
- Zod schemas for all form validation

## Testing

- **Framework**: Vitest with v8 coverage provider
- **Test files**: Colocated (`*.test.ts`)
- **Current coverage**: `src/lib/calculations.ts` has unit tests
- **CI**: `bun run test:coverage` runs on every PR via GitHub Actions

## Linting

- ESLint with `next/core-web-vitals` and `next/typescript` configs
- lint-staged runs ESLint `--fix` on staged `.ts/.tsx/.js/.jsx` files via Husky pre-commit hook

## Build Integrity

- `bun run build` must succeed (static export to `/out`)
- CI deploys only from `main` branch after successful build
- PR checks: test with coverage, no deploy

## Code Standards

- No commented-out code
- No redundant comments — code should be self-documenting
- Named exports preferred over default exports
- Imports grouped: external → internal → relative
- File names: kebab-case
- Components: PascalCase
- Functions/variables: camelCase
- Constants: SCREAMING_SNAKE_CASE
