# Position Size Calculator

## Purpose

Calculate optimal position size based on risk tolerance so traders never risk more than they intend on a single trade.

## Inputs

| Field | Type | Validation |
|-------|------|-----------|
| Trade Type | LONG / SHORT | Required |
| Entry Price | number > 0 | Required |
| Stop Loss Price | number > 0 | Required. Below entry for LONG, above for SHORT |
| Leverage | number ≥ 1 | Required |
| Risk Amount | number > 0 | Required. Dollar amount willing to lose |

## Outputs

| Metric | Formula | Color |
|--------|---------|-------|
| Position Size | `riskAmount / abs(stopLoss - entry)` | cyan |
| Margin Required | `(positionSize × entryPrice) / leverage` | green |
| Potential Loss | `= riskAmount` (by definition) | red |
| Risk Percentage | `abs(stopLoss - entry) / entryPrice × 100` | amber |

## Implementation

- Component: `src/components/calculators/position-size-calculator.tsx`
- Math: `calculatePositionSize()` in `src/lib/calculations.ts`
- Page: `src/app/calculator/position-size/page.tsx`

## Behavior

1. User fills form and submits
2. Zod schema validates inputs
3. `calculatePositionSize()` computes results
4. Four `ResultCard` components animate in with staggered delays
5. Results update on re-submit without page navigation
