# Reliability

## Static Site

The application is a static export served from Cloudflare Pages CDN. No server runtime to fail. Uptime depends entirely on Cloudflare's infrastructure.

## Hyperliquid WebSocket

The `useHyperliquidPrices` hook handles:

- **Connection failure**: Sets `error` state, `isConnected` to false. PriceTicker shows skeleton placeholders.
- **Cleanup**: Unsubscribes and closes transport on component unmount via effect cleanup.
- **Previous-day prices**: Fetched via HTTP, polled every 5 minutes. Failures are logged but don't break the UI — 24h change shows 0% as fallback.

The WebSocket connection does not implement automatic reconnection. If the connection drops, the user sees stale prices until page refresh.

## Build Pipeline

- GitHub Actions runs tests on PRs, build + deploy on `main` push
- Build failure blocks deployment — no partial deploys
- Static export means a successful `bun run build` guarantees the site works

## Error States

- **404**: Custom not-found page with 5-second auto-redirect to home
- **Calculator errors**: Zod validation catches invalid inputs before calculation
- **Price ticker loading**: Skeleton placeholders until WebSocket connects
