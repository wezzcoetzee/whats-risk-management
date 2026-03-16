# Design System

## Aesthetic

Terminal/hacker aesthetic inspired by Bloomberg terminals and retro CRT displays. Dark mode is the primary experience. Visual cues include scanline overlays, grid backgrounds, glow effects, and monospace data displays.

## Color Palette

Trading-specific CSS custom properties defined in `src/app/globals.css`:

| Token | Purpose | Dark value |
|-------|---------|-----------|
| `--profit-green` | Positive values, CTAs | `oklch(0.70 0.22 160)` |
| `--loss-red` | Negative values, errors | `oklch(0.65 0.25 25)` |
| `--data-cyan` | Neutral data, info | `oklch(0.70 0.18 200)` |
| `--terminal-bg` | Terminal backgrounds | `oklch(0.12 0.015 264)` |
| `--terminal-border` | Terminal borders | `oklch(0.25 0.02 264)` |
| `--grid-color` | Background grid pattern | `oklch(0.25 0.02 264 / 0.2)` |

Standard shadcn tokens (`--background`, `--foreground`, `--card`, `--muted`, etc.) use oklch color space.

## Typography

| Font | Variable | Usage |
|------|----------|-------|
| Geist Sans | `--font-geist-sans` | Body text (default) |
| Geist Mono | `--font-geist-mono` | Code blocks |
| JetBrains Mono | `--font-jetbrains-mono` | Data/numbers (`.data-mono` class) |
| Space Grotesk | `--font-space-grotesk` | Display headlines (`.font-display` class) |

The `.data-mono` class applies JetBrains Mono with `tabular-nums` and tight letter spacing for aligned numerical displays.

## Component Patterns

### ResultCard

`src/components/calculators/result-card.tsx`

Displays a single calculated metric with color-coded accent bar, animated value, and label. Colors: `cyan`, `green`, `red`, `amber`. Values animate via `useAnimatedNumber` hook. Cards stagger-animate on appearance using CSS `animation-delay`.

### RollingNumber

`src/components/rolling-number.tsx`

Per-character animated transitions for price displays. Each digit rolls up or down independently when the value changes.

### PriceTicker

`src/components/price-ticker.tsx`

Infinite-scrolling marquee of live crypto prices from Hyperliquid. Duplicated content for seamless loop. Shows skeleton placeholders during WebSocket connection. Pauses on hover.

## CSS Effects

- **Grid background**: `body::before` with linear gradient grid pattern
- **Scanline overlay**: `body::after` with repeating gradient, subtle CRT scanline effect
- **Terminal glow**: `.terminal-glow`, `.terminal-glow-cyan`, `.terminal-glow-red` box-shadow classes
- **Value glow**: `.value-glow-green`, `.value-glow-cyan`, etc. for text-shadow on data values
- **Noise texture**: `.noise-texture` SVG-based fractal noise overlay
- **Staggered animations**: `.stagger-1` through `.stagger-6` delay classes for sequential reveals

## Theming

Dark/light mode via `next-themes` with `class` strategy. Both themes define the same token names with different values. System preference is respected by default.
