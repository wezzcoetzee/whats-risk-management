# Core Beliefs

## No Backend

The entire application runs client-side. No server, no database, no API routes. This eliminates infrastructure cost, operational burden, and data liability. The only external dependency is Hyperliquid's public API for live prices, which is optional — calculators work without it.

## Leverage Math Correctness

The most common error in trading calculators is double-counting leverage. Our formula:

```
positionSize = riskAmount / riskPerUnit
margin = (positionSize × entryPrice) / leverage
```

Leverage affects how much capital you need (margin), not your profit or loss. When computing P&L, we use the actual position size and price movement — leverage is already baked into the position size via the margin constraint. This matches how exchanges actually work.

## Terminal Aesthetic

The design intentionally evokes Bloomberg terminals, trading dashboards, and retro CRT displays. This is a deliberate product decision:

- Traders trust interfaces that look like professional tools
- Monospace numbers with tabular alignment signal precision
- Dark mode with green/red/cyan creates immediate visual language for profit/loss/data
- Scanline and grid effects reinforce the "terminal" brand identity

## Free and Open

No accounts, no paywalls, no premium features. The site exists to be useful. Revenue comes from organic traffic and potential future affiliate/referral integrations, not from gating features.
