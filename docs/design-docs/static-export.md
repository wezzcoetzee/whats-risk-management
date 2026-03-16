# Decision: Static Export

## Status

Accepted

## Context

The application is a set of trading calculators with no backend logic. All calculations happen client-side. The only server-like feature is live price data, which comes from Hyperliquid's WebSocket API directly in the browser.

## Decision

Use Next.js static export (`output: 'export'`) and deploy to Cloudflare Pages.

## Rationale

1. **No server-side logic needed**: Calculators are pure client-side. No database, no auth, no API routes.
2. **Performance**: Static files served from CDN edge are faster than any server-rendered solution.
3. **Cost**: Cloudflare Pages free tier handles the traffic. No server infrastructure to pay for.
4. **Reliability**: No server runtime means no server crashes, no cold starts, no scaling issues.
5. **Simplicity**: Build produces HTML/CSS/JS files. Deploy is a file copy.

## Tradeoffs

- **No middleware**: Can't do server-side redirects or auth checks. Not needed.
- **No API routes**: Can't proxy requests. Not needed — Hyperliquid API is public.
- **Security headers**: `next.config.ts` headers don't apply in static hosting. Must configure via Cloudflare dashboard or `_headers` file.
- **No ISR/SSR**: All pages are fully static. Guide content updates require a rebuild. Acceptable for current content velocity.

## Deployment

GitHub Actions builds on push to `main`, deploys `/out` directory to Cloudflare Pages via `wrangler pages deploy`.
