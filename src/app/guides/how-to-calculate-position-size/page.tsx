import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Calculator, ArrowRight, CheckCircle2 } from "lucide-react";
import { BreadcrumbStructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "How to Calculate Position Size in Trading - Complete Guide (2024)",
  description: "Learn how to calculate position size for forex, crypto, and stock trading. Step-by-step guide with formulas, examples, and a free position size calculator. Master risk management today.",
  keywords: [
    "how to calculate position size",
    "position size formula",
    "position sizing guide",
    "trading position size",
    "forex position size",
    "crypto position sizing",
    "stock position size",
    "risk management trading",
    "lot size calculation",
    "position size example",
  ],
  openGraph: {
    title: "How to Calculate Position Size in Trading - Complete Guide",
    description: "Learn how to calculate position size for forex, crypto, and stock trading. Step-by-step guide with formulas, examples, and a free calculator.",
    url: "https://whatsriskmanagement.com/guides/how-to-calculate-position-size",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Calculate Position Size - Trading Guide",
    description: "Step-by-step guide to calculating position size for any market. Includes formulas, examples, and free calculator.",
  },
  alternates: {
    canonical: "https://whatsriskmanagement.com/guides/how-to-calculate-position-size",
  },
};

function ArticleStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Calculate Position Size in Trading - Complete Guide",
    "description": "Learn how to calculate position size for forex, crypto, and stock trading with step-by-step instructions, formulas, and examples.",
    "author": {
      "@type": "Organization",
      "name": "Risk Terminal"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Risk Terminal",
      "url": "https://whatsriskmanagement.com"
    },
    "datePublished": "2024-01-15",
    "dateModified": new Date().toISOString().split('T')[0],
    "mainEntityOfPage": "https://whatsriskmanagement.com/guides/how-to-calculate-position-size"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

function HowToStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Position Size for Trading",
    "description": "Calculate your optimal position size based on risk tolerance, stop loss, and leverage.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Determine Your Risk Amount",
        "text": "Decide how much money you're willing to risk on this trade. Most professionals risk 1-2% of their account per trade."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Calculate Risk Per Unit",
        "text": "Find the difference between your entry price and stop loss price. This is your risk per unit."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Apply the Formula",
        "text": "Divide your risk amount by (risk per unit × leverage) to get your position size."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Verify Margin Requirements",
        "text": "Ensure you have enough margin in your account to open the calculated position size."
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function HowToCalculatePositionSizePage() {
  return (
    <>
      <ArticleStructuredData />
      <HowToStructuredData />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://whatsriskmanagement.com" },
          { name: "Guides", url: "https://whatsriskmanagement.com/guides" },
          { name: "How to Calculate Position Size", url: "https://whatsriskmanagement.com/guides/how-to-calculate-position-size" }
        ]}
      />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--data-cyan)] to-transparent opacity-50" />
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[var(--data-cyan)] opacity-5 blur-3xl" />
      </div>

      <article className="container mx-auto py-8 px-4 max-w-4xl relative z-10">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-card/50 border border-border/50 rounded mb-6">
            <Calculator className="h-4 w-4 text-[var(--data-cyan)]" />
            <span className="text-xs data-mono text-muted-foreground tracking-wider">TRADING_GUIDE</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            How to Calculate Position Size in Trading
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed">
            Position sizing is the single most important skill in trading. Learn the exact formula
            professional traders use to protect their capital and maximize returns.
          </p>

          <div className="mt-8 p-4 bg-[var(--data-cyan)]/5 border border-[var(--data-cyan)]/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-[var(--data-cyan)]" />
              <span className="font-semibold">Quick Calculator</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Skip the math and use our free position size calculator.
            </p>
            <Link
              href="/calculator/position-size"
              className="inline-flex items-center gap-2 mt-3 text-[var(--data-cyan)] hover:underline"
            >
              Open Position Size Calculator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <div className="prose prose-invert max-w-none">
          <h2>What is Position Sizing?</h2>
          <p>
            Position sizing determines how many units of an asset (shares, contracts, lots, or coins)
            you should buy or sell on any given trade. It&apos;s the cornerstone of risk management and
            the difference between professional traders and gamblers.
          </p>
          <p>
            Without proper position sizing, even a strategy with a 70% win rate can blow up your account.
            With proper position sizing, even a strategy with a 40% win rate can be profitable.
          </p>

          <h2>The Position Size Formula</h2>
          <p>The formula for calculating position size is:</p>

          <div className="not-prose my-8">
            <div className="bg-card/50 border border-[var(--data-cyan)]/30 rounded-lg p-6">
              <code className="text-[var(--data-cyan)] text-xl block text-center">
                Position Size = Risk Amount ÷ (Risk Per Unit × Leverage)
              </code>
            </div>
          </div>

          <p>Where:</p>
          <ul>
            <li><strong>Risk Amount</strong> = The dollar amount you&apos;re willing to lose on this trade</li>
            <li><strong>Risk Per Unit</strong> = |Entry Price - Stop Loss Price|</li>
            <li><strong>Leverage</strong> = Your leverage multiplier (1x for spot trading)</li>
          </ul>

          <h2>Step-by-Step Position Size Calculation</h2>

          <h3>Step 1: Determine Your Risk Amount</h3>
          <p>
            First, decide how much of your account you&apos;re willing to risk on this single trade.
            The industry standard is <strong>1-2% of your total account</strong>.
          </p>

          <div className="not-prose my-6">
            <div className="bg-card/50 border border-border/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Example:</p>
              <p>Account Size: $10,000</p>
              <p>Risk Percentage: 1%</p>
              <p className="text-[var(--data-cyan)] font-semibold">Risk Amount: $100</p>
            </div>
          </div>

          <h3>Step 2: Calculate Risk Per Unit</h3>
          <p>
            Find the absolute difference between your entry price and stop loss price.
            This tells you how much you&apos;ll lose per unit if your stop loss is hit.
          </p>

          <div className="not-prose my-6">
            <div className="bg-card/50 border border-border/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Example (Long Trade):</p>
              <p>Entry Price: $50,000</p>
              <p>Stop Loss: $49,000</p>
              <p className="text-[var(--data-cyan)] font-semibold">Risk Per Unit: $1,000</p>
            </div>
          </div>

          <h3>Step 3: Apply the Formula</h3>
          <p>Now plug your numbers into the formula:</p>

          <div className="not-prose my-6">
            <div className="bg-card/50 border border-border/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Continuing our example:</p>
              <p>Risk Amount: $100</p>
              <p>Risk Per Unit: $1,000</p>
              <p>Leverage: 10x</p>
              <p className="mt-2">Position Size = $100 ÷ ($1,000 × 10)</p>
              <p className="text-[var(--data-cyan)] font-semibold">Position Size = 0.01 BTC</p>
            </div>
          </div>

          <h3>Step 4: Verify Your Margin</h3>
          <p>
            Make sure you have enough capital to open this position. With 10x leverage,
            0.01 BTC at $50,000 requires $50 in margin.
          </p>

          <h2>Why the 1% Rule Matters</h2>
          <p>
            Professional traders follow the 1% rule because it provides a mathematical edge
            against ruin. Here&apos;s why:
          </p>

          <div className="not-prose my-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[var(--loss-red)]/5 border border-[var(--loss-red)]/30 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Risking 10% Per Trade</h4>
                <p className="text-sm text-muted-foreground">
                  After 7 consecutive losses (common in trading), you&apos;ve lost 52% of your account.
                  You need a 108% return just to break even.
                </p>
              </div>
              <div className="bg-[var(--profit-green)]/5 border border-[var(--profit-green)]/30 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Risking 1% Per Trade</h4>
                <p className="text-sm text-muted-foreground">
                  After 7 consecutive losses, you&apos;ve lost only 6.8% of your account.
                  You need just a 7.3% return to break even.
                </p>
              </div>
            </div>
          </div>

          <h2>Position Sizing for Different Markets</h2>

          <h3>Forex Position Sizing</h3>
          <p>
            In forex, position size is measured in lots. A standard lot is 100,000 units of the base currency.
            Most brokers also offer mini lots (10,000 units) and micro lots (1,000 units).
          </p>
          <p>
            The pip value depends on the currency pair and lot size. For USD pairs, a standard lot
            has a pip value of approximately $10.
          </p>

          <h3>Crypto Position Sizing</h3>
          <p>
            Cryptocurrency exchanges typically allow fractional positions, making precise position
            sizing easier. Always account for high volatility by using wider stop losses.
          </p>

          <h3>Stock Position Sizing</h3>
          <p>
            For stocks, round your position size to whole shares. If the calculation gives you
            123.7 shares, either round down to 123 or accept slightly higher risk at 124 shares.
          </p>

          <h2>Common Position Sizing Mistakes</h2>

          <div className="not-prose my-8 space-y-4">
            {[
              {
                mistake: "Not using a stop loss",
                solution: "Always define your exit before entering a trade. No stop loss = no way to calculate position size."
              },
              {
                mistake: "Risking too much per trade",
                solution: "Stick to 1-2% maximum. Even with a 60% win rate, you'll face losing streaks."
              },
              {
                mistake: "Ignoring leverage in calculations",
                solution: "Leverage affects both your position size and margin requirements. Always include it in your formula."
              },
              {
                mistake: "Moving stop losses further away",
                solution: "If you move your stop, you must reduce your position size proportionally to maintain the same risk."
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-4 p-4 bg-card/50 border border-border/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-[var(--profit-green)] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{item.mistake}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>

          <h2>Advanced Position Sizing Strategies</h2>

          <h3>Fixed Fractional Position Sizing</h3>
          <p>
            Always risk a fixed percentage of your current account balance. As your account grows,
            your position sizes grow. As it shrinks, positions shrink automatically.
          </p>

          <h3>Kelly Criterion</h3>
          <p>
            A mathematical formula that calculates the optimal position size based on your
            win rate and average win/loss ratio. Most traders use a &quot;half-Kelly&quot; approach
            for more conservative sizing.
          </p>

          <h3>Volatility-Based Position Sizing</h3>
          <p>
            Adjust position sizes based on the asset&apos;s volatility. Higher volatility means
            smaller positions. The ATR (Average True Range) indicator is commonly used for this.
          </p>

          <h2>Calculate Your Position Size Now</h2>
          <p>
            Ready to apply what you&apos;ve learned? Use our free position size calculator to
            instantly calculate the optimal position size for your next trade.
          </p>

          <div className="not-prose mt-8">
            <Link
              href="/calculator/position-size"
              className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-[var(--data-cyan)] text-background font-semibold rounded-lg hover:bg-[var(--data-cyan)]/90 transition-colors"
            >
              <Calculator className="h-5 w-5" />
              Open Position Size Calculator
            </Link>
          </div>
        </div>

        <footer className="mt-16 pt-8 border-t border-border/50">
          <h3 className="font-semibold mb-4">Related Guides</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/guides/risk-reward-ratio"
              className="p-4 bg-card/50 border border-border/50 rounded-lg hover:border-[var(--profit-green)]/50 transition-colors"
            >
              <h4 className="font-medium">Understanding Risk/Reward Ratios</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Learn how to evaluate trade quality using R:R ratios.
              </p>
            </Link>
            <Link
              href="/guides/position-sizing-strategies"
              className="p-4 bg-card/50 border border-border/50 rounded-lg hover:border-[var(--data-cyan)]/50 transition-colors"
            >
              <h4 className="font-medium">Position Sizing Strategies</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Advanced techniques for optimal capital allocation.
              </p>
            </Link>
          </div>
        </footer>
      </article>
    </>
  );
}
