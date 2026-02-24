# Frontend Architecture

## Framework

Next.js 16 App Router with static export (`output: 'export'`). All pages are statically generated at build time. Client-side interactivity via `"use client"` components.

## Pages

| Route | Description |
|-------|------------|
| `/` | Landing page with hero, features, FAQ |
| `/calculator/` | Calculator index with card links |
| `/calculator/position-size/` | Position size calculator |
| `/calculator/profit/` | Profit & loss calculator |
| `/guides/how-to-calculate-position-size/` | SEO guide article |
| `/guides/risk-reward-ratio/` | SEO guide article |
| `/guides/position-sizing-strategies/` | SEO guide article |

All routes use `trailingSlash: true` for static file compatibility.

## Component Conventions

- **UI primitives** (`src/components/ui/`): shadcn/ui components, never modified directly
- **Feature components** (`src/components/calculators/`): Calculator-specific, `"use client"`
- **Layout components** (`src/components/`): Header, Footer, PriceTicker, ThemeProvider
- **SEO components** (`src/components/structured-data.tsx`): JSON-LD schema emitters

## Form Patterns

Calculators use react-hook-form with Zod schemas:

1. Define Zod schema with `z.coerce.number()` for numeric inputs
2. Initialize `useForm` with `zodResolver`
3. Render via `<Form>` + `<FormField>` wrappers
4. Compute results on submit, store in local state
5. Display via `ResultCard` components with animated values

No global state management. Each calculator is self-contained.

## Hooks

### `useHyperliquidPrices`

Manages WebSocket connection to Hyperliquid for real-time mid-prices. Also fetches previous-day prices via HTTP for 24h change percentages (polled every 5 minutes). Returns `{ prices, coinPrices, isConnected, error }`.

### `useAnimatedNumber`

Animates a number from its previous value to a new value using `requestAnimationFrame` with cubic ease-out. Used by `ResultCard` for smooth value transitions.

## Data Fetching

No server-side data fetching. All external data comes from client-side Hyperliquid connections:

- **WebSocket**: `wss://api.hyperliquid.xyz` for real-time prices
- **HTTP**: `https://api.hyperliquid.xyz` for metadata and previous-day prices

CSP in next.config.ts explicitly allows these origins.

## SEO

- Per-page `Metadata` exports with canonical URLs, OpenGraph, Twitter cards
- JSON-LD structured data: WebSite, Organization, WebApplication, SoftwareApplication, FAQ, Breadcrumb, Article, HowTo
- Static sitemap.ts and robots.ts
- Guide pages target informational keywords
