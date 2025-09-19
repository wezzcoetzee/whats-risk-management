# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development Server

```bash
npm run dev
# or
bun dev
```

Starts the Next.js development server at <http://localhost:3000>

### Build & Production

```bash
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint checks
```

## Project Architecture

This is a **Next.js 15** professional trading risk management calculator application built with TypeScript, React 19, and Tailwind CSS, following enterprise-grade patterns and security standards.

### Key Architecture Patterns

**Clean Architecture Implementation**:

- **Domain Layer**: Pure calculation logic in `src/lib/calculations.ts`
- **Application Layer**: React components with separated concerns
- **Presentation Layer**: Modern glassmorphism UI with gradient effects
- **Infrastructure Layer**: Next.js configuration with security headers

**App Router Structure**: Uses Next.js App Router with pages in `src/app/`

- `/` - Modern landing page with feature cards and gradient effects
- `/calculator` - Interactive calculator suite with advanced UI/UX

**Component Architecture**:

- **Calculator Components**: Two main calculators in `src/components/calculators/`:
  - `position-size-calculator.tsx` - Calculates optimal position size with risk management
  - `profit-calculator.tsx` - Analyzes profit potential and risk/reward ratios
- **Calculation Engine**: Centralized business logic in `src/lib/calculations.ts`
- **Form Validation**: Enhanced react-hook-form with Zod schemas and edge case handling
- **Error Handling**: Comprehensive validation with user-friendly error messages

**Mathematical Accuracy**:

- **Corrected Formulas**: Fixed critical calculation errors identified in code review
- **Position Sizing**: `Risk Amount / (Risk Per Unit × Leverage)`
- **Profit Analysis**: No double leverage counting - leverage already in position size
- **Risk/Reward**: Primary R:R uses first TP, Average R:R uses mean of all TPs
- **Input Validation**: Prevents division by zero, overflow, and invalid trade scenarios

**State Management**:

- Local component state with React hooks and useCallback optimization
- Form state managed by react-hook-form with debounced calculations
- Theme state via next-themes provider with system preference detection

**Design System**:

- **Modern UI**: Glassmorphism effects with backdrop blur and gradients
- **Tailwind CSS**: Utility-first styling with semantic color tokens
- **shadcn/ui**: Consistent component library with accessibility built-in
- **Dark/Light Mode**: Comprehensive theme support with smooth transitions
- **Icons**: Lucide React with contextual meanings (Shield for risk, Target for profits)

**Security Implementation**:

- **CSP Headers**: Content Security Policy preventing XSS attacks
- **Environment Variables**: Secure handling of sensitive data (GA ID)
- **Input Sanitization**: Comprehensive validation beyond client-side checks
- **No Exposed Secrets**: Environment-based configuration

### Key Technical Details

**Import Alias**: Uses `@/*` path mapping to `./src/*` for clean imports

**Form Validation Logic**:

- Cross-field validation ensures logical trading parameters
- Trade-specific rules (LONG vs SHORT) with proper error messaging
- Numerical bounds checking and overflow prevention
- Real-time validation with user feedback

**Calculation Engine Features**:

- **Type Safety**: Full TypeScript coverage with proper interfaces
- **Error Handling**: Try-catch blocks with graceful degradation
- **Edge Cases**: Handles zero values, extreme numbers, and invalid scenarios
- **Internationalization**: Currency formatting with Intl.NumberFormat
- **Validation**: Separate validation functions for trading parameters

**Performance Optimizations**:

- **useCallback**: Prevents unnecessary re-renders
- **Debounced Calculations**: Optimized form interactions
- **Tree Shaking**: Optimized imports for bundle size
- **Static Generation**: Pre-rendered pages for faster loading

**User Experience**:

- **Progressive Enhancement**: Works without JavaScript
- **Loading States**: Visual feedback during calculations
- **Error States**: Clear error messages with correction guidance
- **Responsive Design**: Mobile-first approach with touch-friendly targets
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

### Calculation Formulas (Corrected)

**Position Size Calculator** (Correct Formula):

```typescript
riskPerUnit = |stopLoss - entry|  // Price distance
riskPercentage = (riskPerUnit / entry) × 100  // For display
positionSize = riskAmount / (riskPerUnit × leverage)  // Units to trade
notionalValue = positionSize × entryPrice  // Total position value
margin = notionalValue / leverage  // Capital required
potentialLoss = riskAmount  // Maximum loss
```

**Example**: Risk $1,000, Entry $10, Stop $9, Leverage 2x

- riskPerUnit = $1, positionSize = $1,000 / ($1 × 2) = 500 units
- notionalValue = 500 × $10 = $5,000, margin = $5,000 / 2 = $2,500
- Actual loss if stopped: 500 units × $1 × 2x leverage = $1,000 ✓

**Profit Calculator** (Fixed leverage double-counting):

```typescript
riskPerUnit = |stopLoss - entry|  // Price distance
potentialLoss = riskPerUnit × positionSize  // NO leverage multiplication
profitPercentage = (takeProfit - entry) / entry  // For LONG
profit = profitPercentage × positionSize  // NO leverage multiplication
notionalValue = positionSize × entryPrice
margin = notionalValue / leverage  // Consistent with position calculator
roi = (averageProfit / margin) × 100
primaryRiskReward = firstTakeProfitAmount / potentialLoss
averageRiskReward = averageProfit / potentialLoss
```

**Key Fix**: Leverage effect is already incorporated in the position size calculation, so it should NOT be multiplied again in profit/loss calculations. This was causing inflated profit and loss amounts.

## Dependencies

**Core Framework**: Next.js 15 with React 19 and TypeScript
**Form Management**: react-hook-form + @hookform/resolvers + zod
**UI Components**: Radix UI primitives via shadcn/ui
**Styling**: Tailwind CSS with glassmorphism and gradient effects
**Utilities**: clsx + tailwind-merge for className composition
**Icons**: lucide-react with contextual trading icons
**Security**: CSP headers and environment variable protection

## Development Guidelines

1. **Always use the centralized calculation functions** from `src/lib/calculations.ts`
2. **Validate all numerical inputs** using the provided validation utilities
3. **Handle edge cases** like zero values and extreme numbers
4. **Follow the existing form patterns** for consistency
5. **Test calculations manually** with known values before deployment
6. **Use TypeScript strictly** - no `any` types allowed
7. **Implement proper error boundaries** for calculation failures
