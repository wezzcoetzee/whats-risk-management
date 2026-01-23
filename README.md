# What's Risk Management

An educational trading risk management calculator designed to help traders learn how to manage their risk and trade safely. This tool teaches position sizing principles, profit potential analysis, and risk/reward ratio management for financial trading.

> **Disclaimer**: This application is for educational purposes only and does not constitute financial advice. Trading involves substantial risk of loss. Always consult with a qualified financial advisor before making trading decisions.

## What This Project Does

**What's Risk Management** provides two core calculation tools:

- **Position Size Calculator**: Determines optimal position size based on risk tolerance, entry/stop loss levels, and leverage
- **Profit Calculator**: Analyzes profit potential and risk/reward ratios for trading positions with multiple take-profit levels

The application also includes educational guides on position sizing strategies, risk-reward ratios, and calculation methods. A live price ticker displays real-time cryptocurrency prices from Hyperliquid.

The application features mathematical accuracy with corrected formulas, comprehensive input validation, and a modern glassmorphism UI with dark/light theme support.

## Technologies Used

### Core Framework

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features and concurrent rendering
- **TypeScript** - Type-safe development

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI primitives
- **Lucide React** - Modern icon library
- **next-themes** - Dark/light theme management

### Form Management & Validation

- **react-hook-form** - Performant form library
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation integration

### Development Tools

- **ESLint** - Code linting with Next.js configuration
- **TypeScript** - Static type checking

## Getting Started

### Prerequisites

- Node.js 18+ or Bun (recommended)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd whats-risk-management
   ```

2. **Install dependencies**

   ```bash
   # Using Bun (recommended)
   bun install
   
   # Or using npm
   npm install
   ```

3. **Start the development server**

   ```bash
   # Using Bun
   bun dev
   
   # Or using npm
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Available Commands

### Development

```bash
bun dev          # Start development server
npm run dev      # Alternative with npm
```

### Production

```bash
bun run build    # Build for production (static export)
bun start        # Start production server (if not using static export)
npm run build    # Alternative with npm
npm start        # Alternative with npm
```

### Code Quality

```bash
bun run lint     # Run ESLint checks
npm run lint     # Alternative with npm
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── calculator/         # Calculator section
│   │   ├── page.tsx        # Calculator hub/selection
│   │   ├── position-size/  # Position size calculator page
│   │   ├── profit/         # Profit calculator page
│   │   └── opengraph-image.tsx
│   ├── guides/             # Educational content
│   │   ├── how-to-calculate-position-size/
│   │   ├── position-sizing-strategies/
│   │   └── risk-reward-ratio/
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── not-found.tsx       # 404 page
│   ├── sitemap.ts          # SEO sitemap
│   ├── robots.ts           # SEO robots.txt
│   └── opengraph-image.tsx # OG image generation
├── components/
│   ├── calculators/        # Calculator components
│   │   ├── position-size-calculator.tsx
│   │   ├── profit-calculator.tsx
│   │   └── result-card.tsx
│   ├── ui/                 # shadcn/ui components
│   ├── header.tsx          # App header
│   ├── price-ticker.tsx    # Live price ticker
│   ├── rolling-number.tsx  # Animated number display
│   ├── risk-terminal-logo.tsx
│   ├── theme-provider.tsx  # Theme context provider
│   ├── theme-toggle.tsx    # Dark/light toggle
│   └── structured-data.tsx # JSON-LD SEO data
├── hooks/
│   ├── use-animated-number.ts   # Number animation hook
│   └── use-hyperliquid-prices.ts # Live price data hook
└── lib/
    ├── calculations.ts      # Core calculation logic
    ├── calculations.test.ts # Calculation tests
    ├── formatters.ts        # Number/currency formatting
    └── utils.ts             # Utility functions
```

## Key Features

### Mathematical Accuracy

- **Corrected Position Sizing**: `Risk Amount / (Risk Per Unit × Leverage)`
- **Fixed Profit Calculations**: No double leverage counting
- **Comprehensive Validation**: Prevents division by zero and overflow errors

### Security

- **Content Security Policy (CSP)** headers
- **Input sanitization** and validation
- **Environment variable protection**

### User Experience

- **Glassmorphism UI** with gradient effects
- **Dark/Light theme** support with system preference detection
- **Responsive design** optimized for all devices
- **Real-time validation** with user-friendly error messages
- **Live price ticker** with real-time Hyperliquid data
- **Animated number transitions** for smooth value updates

### Educational Content

- **Position sizing strategies** guide
- **Risk-reward ratio** fundamentals
- **Step-by-step calculation** tutorials

### SEO Optimization

- **Dynamic OpenGraph images** for social sharing
- **Structured data (JSON-LD)** for rich search results
- **Auto-generated sitemap** and robots.txt
- **Semantic HTML** and meta tags

## Deployment

The application is configured for deployment on Azure Static Web Apps with automatic CI/CD via GitHub Actions. The build process generates static files for optimal performance and global distribution.

## Contributing

1. Follow the existing code patterns and architecture
2. Use TypeScript strictly (no `any` types)
3. Test calculations manually with known values
4. Run linting before committing: `bun run lint`

## License

Private repository - All rights reserved.
