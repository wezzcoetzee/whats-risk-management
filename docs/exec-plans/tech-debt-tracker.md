# Tech Debt Tracker

## Active

### CLAUDE.md says Next.js 15, actual is Next.js 16
- **Location**: `CLAUDE.md` (now migrated to `AGENTS.md` / `ARCHITECTURE.md`)
- **Impact**: Low. Documentation-only mismatch.
- **Fix**: Updated in new docs. Old CLAUDE.md reference corrected.

### Security headers don't apply on static hosting
- **Location**: `next.config.ts` `headers()` config
- **Impact**: Medium. CSP, X-Frame-Options, etc. are defined but never served by Cloudflare Pages.
- **Fix**: Add `public/_headers` file for Cloudflare Pages, or configure in Cloudflare dashboard.

### No WebSocket reconnection
- **Location**: `src/hooks/use-hyperliquid-prices.ts`
- **Impact**: Low. Prices go stale on disconnect until page refresh.
- **Fix**: Add exponential backoff reconnection in the `useEffect`.

### Guide dates are stale
- **Location**: `src/app/guides/*/page.tsx`
- **Impact**: Low. `datePublished` says 2025, `dateModified` is dynamic.
- **Fix**: Update published dates or remove them.

## Resolved

(none yet)
