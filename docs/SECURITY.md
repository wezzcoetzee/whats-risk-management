# Security

## Threat Model

This is a static site with no backend, no authentication, no user data storage, and no server-side processing. The attack surface is minimal.

## What We Protect Against

- **XSS**: CSP headers defined in next.config.ts restrict script sources to `'self'` and Google Tag Manager. `dangerouslySetInnerHTML` is used only for JSON-LD structured data with trusted static content.
- **Clickjacking**: `X-Frame-Options: DENY` and `frame-ancestors 'none'` in CSP
- **MIME sniffing**: `X-Content-Type-Options: nosniff`

Note: Security headers in next.config.ts only apply when served through a Node.js runtime. On Cloudflare Pages (static hosting), these must be configured separately via `_headers` file or Cloudflare dashboard.

## Secrets

- **Google Analytics**: `G-QJLE0NXT2D` — public measurement ID, safe in client code
- **Cloudflare credentials**: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` — GitHub Actions secrets only, never in client code
- No API keys, no auth tokens, no user credentials anywhere in the codebase

## External Connections

| Endpoint | Purpose | Protocol |
|----------|---------|----------|
| `api.hyperliquid.xyz` | Price data (HTTP + WebSocket) | HTTPS / WSS |
| `www.googletagmanager.com` | Analytics | HTTPS |
| `www.google-analytics.com` | Analytics | HTTPS |

All explicitly allowed in CSP `connect-src` and `script-src`.

## Data Privacy

No user data is collected, stored, or transmitted. Calculator inputs exist only in browser memory during the session. Google Analytics collects standard pageview data.
