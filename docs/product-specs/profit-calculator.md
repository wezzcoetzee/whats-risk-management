# Profit Calculator

## Purpose

Analyze profit potential and risk/reward ratios across multiple take-profit levels for a planned trade.

## Inputs

| Field | Type | Validation |
|-------|------|-----------|
| Trade Type | LONG / SHORT | Required |
| Entry Price | number > 0 | Required |
| Stop Loss Price | number > 0 | Required. Below entry for LONG, above for SHORT |
| Leverage | number ≥ 1 | Required |
| Position Size | number > 0 | Required. Dollar notional value |
| Take Profit 1-4 | number > 0 | At least 1 required. Above entry for LONG, below for SHORT |

## Outputs

| Metric | Formula |
|--------|---------|
| Profit per TP | `priceMovement% × (positionSize / numTPs)` |
| Total Profit | Sum of all TP profits |
| Average Profit | `totalProfit / numTPs` |
| ROI | `(totalProfit / margin) × 100` |
| Primary R:R | `totalProfit / potentialLoss` |
| Average R:R | `averageProfit / potentialLoss` |
| Potential Loss | `riskPercentage × positionSize` |
| Margin | `positionSize / leverage` |

Position is split equally across all take-profit levels (e.g., 2 TPs = 50% each).

## Implementation

- Component: `src/components/calculators/profit-calculator.tsx`
- Math: `calculateProfitMetrics()` in `src/lib/calculations.ts`
- Validation: `validateTradingParameters()` in `src/lib/calculations.ts`
- Page: `src/app/calculator/profit/page.tsx`

## Take Profit Breakdown

Each take-profit level shows:
- Target price
- Dollar profit for that slice
- Individual R:R ratio for that level
