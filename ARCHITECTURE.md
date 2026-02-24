# Architecture

## Overview

Risk Terminal is a static Next.js application that provides trading risk management calculators with live Hyperliquid price feeds. No backend, no database, no auth.

**Live site**: https://whatsriskmanagement.com

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, static export) |
| Language | TypeScript 5.9, React 19 |
| Styling | Tailwind CSS v4, CSS custom properties |
| Components | shadcn/ui (new-york style), Radix primitives |
| Forms | react-hook-form + Zod 4 |
| Price data | Hyperliquid WebSocket + HTTP API (`@nktkas/hyperliquid`) |
| Fonts | Geist Sans, Geist Mono, JetBrains Mono, Space Grotesk |
| Theming | next-themes (system/dark/light) |
| Testing | Vitest + v8 coverage |
| Linting | ESLint (next/core-web-vitals + next/typescript) |
| Git hooks | Husky + lint-staged |
| CI/CD | GitHub Actions → Cloudflare Pages |
| Analytics | Google Analytics (G-QJLE0NXT2D) |

## Directory Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, GA, ThemeProvider)
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Design tokens, animations, terminal effects
│   ├── not-found.tsx           # 404 with auto-redirect
│   ├── sitemap.ts              # Static sitemap generation
│   ├── robots.ts               # Robots.txt generation
│   ├── calculator/
│   │   ├── page.tsx            # Calculator index (card links)
│   │   ├── position-size/      # Position size calculator page
│   │   └── profit/             # Profit calculator page
│   └── guides/
│       ├── how-to-calculate-position-size/
│       ├── position-sizing-strategies/
│       └── risk-reward-ratio/
├── components/
│   ├── calculators/
│   │   ├── position-size-calculator.tsx
│   │   ├── profit-calculator.tsx
│   │   └── result-card.tsx
│   ├── ui/                     # shadcn/ui primitives
│   ├── header.tsx
│   ├── footer.tsx
│   ├── price-ticker.tsx        # Live Hyperliquid price marquee
│   ├── rolling-number.tsx      # Animated digit transitions
│   ├── structured-data.tsx     # JSON-LD schema components
│   ├── risk-terminal-logo.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── hooks/
│   ├── use-hyperliquid-prices.ts  # WebSocket + HTTP price feeds
│   └── use-animated-number.ts     # Smooth number transitions
└── lib/
    ├── calculations.ts         # Core trading math
    ├── calculations.test.ts    # Unit tests
    ├── formatters.ts           # Currency/percentage formatting
    └── utils.ts                # cn() helper
```

## Key Architectural Decisions

### Static Export

The app uses `output: 'export'` in next.config.ts, producing a fully static site deployed to Cloudflare Pages. No server runtime. All interactivity is client-side. This means:

- No API routes, no middleware, no SSR
- `headers()` in next.config.ts are defined but only apply if served through a non-static host
- Images use `unoptimized: true`
- Sitemap and robots.txt are generated at build time

See [docs/design-docs/static-export.md](docs/design-docs/static-export.md) for the full decision record.

### Hyperliquid Integration

Live crypto prices come from Hyperliquid's public API:

1. **WebSocket** (`allMids` subscription): Real-time mid-prices for all perpetual pairs
2. **HTTP** (`metaAndAssetCtxs`): Previous day prices for 24h change calculation, polled every 5 minutes

The `useHyperliquidPrices` hook manages connection lifecycle, reconnection, and cleanup. The `PriceTicker` component renders a scrolling marquee of ~23 coins.

### Leverage Math

Position sizing formula: `positionSize = riskAmount / riskPerUnit`

Leverage **only** affects margin requirements (`margin = notionalValue / leverage`), never the P&L calculation. This avoids the common mistake of double-counting leverage in profit/loss computations.

### Form Architecture

Each calculator is a standalone client component using react-hook-form with Zod schemas. No global state store — form state is local, results are derived. The `ResultCard` component animates value transitions via `useAnimatedNumber`.
