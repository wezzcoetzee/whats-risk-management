# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start development server (localhost:3000)
bun run build    # Build for production (static export to /out)
bun run lint     # Run ESLint
```

## Architecture

This is a Next.js 15 App Router application with static export, deployed to Azure Static Web Apps.

### Core Structure

- `src/app/` - Next.js App Router pages
  - `/` - Landing page
  - `/calculator/` - Main calculator application
- `src/components/calculators/` - Calculator implementations
  - `position-size-calculator.tsx` - Position size based on risk tolerance
  - `profit-calculator.tsx` - Profit potential and R:R analysis
- `src/lib/calculations.ts` - Core trading math (position sizing, profit metrics, validation)
- `src/hooks/use-calculator-selection.ts` - URL + localStorage state sync for calculator selection

### Key Patterns

**Path alias**: `@/*` maps to `./src/*`

**UI Components**: shadcn/ui with new-york style, Radix primitives, Tailwind CSS v4

**Forms**: react-hook-form + Zod validation via @hookform/resolvers

**Theming**: next-themes for dark/light mode

### Static Export Configuration

`next.config.ts` sets `output: 'export'` with `trailingSlash: true`. Images are unoptimized. Security headers (CSP, X-Frame-Options, etc.) are configured but only apply in non-static hosting contexts.

### Calculation Logic

Position sizing formula: `positionSize = riskAmount / (riskPerUnit × leverage)`

The calculations intentionally avoid double-counting leverage - it's already factored into position size when computing profit/loss metrics.
