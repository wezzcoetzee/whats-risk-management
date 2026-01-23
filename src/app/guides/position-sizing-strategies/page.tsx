import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Calculator, ArrowRight, BarChart3, TrendingUp, AlertTriangle } from "lucide-react";
import { BreadcrumbStructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Position Sizing Strategies for Trading - Complete Guide (2024)",
  description: "Learn advanced position sizing strategies used by professional traders. Fixed fractional, Kelly Criterion, volatility-based sizing, and more. Protect your capital and maximize returns.",
  keywords: [
    "position sizing strategies",
    "trading position sizing",
    "fixed fractional position sizing",
    "kelly criterion trading",
    "volatility position sizing",
    "ATR position sizing",
    "risk management strategies",
    "professional trading strategies",
    "capital allocation trading",
    "money management trading",
  ],
  openGraph: {
    title: "Position Sizing Strategies for Trading - Complete Guide",
    description: "Learn advanced position sizing strategies used by professional traders. Fixed fractional, Kelly Criterion, volatility-based sizing, and more.",
    url: "https://whatsriskmanagement.com/guides/position-sizing-strategies",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Position Sizing Strategies - Professional Trading Guide",
    description: "Advanced position sizing techniques for serious traders. Learn what the pros use.",
  },
  alternates: {
    canonical: "https://whatsriskmanagement.com/guides/position-sizing-strategies",
  },
};

function ArticleStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Position Sizing Strategies for Trading - Complete Guide",
    "description": "Learn advanced position sizing strategies used by professional traders including fixed fractional, Kelly Criterion, and volatility-based sizing.",
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
    "mainEntityOfPage": "https://whatsriskmanagement.com/guides/position-sizing-strategies"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function PositionSizingStrategiesPage() {
  return (
    <>
      <ArticleStructuredData />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://whatsriskmanagement.com" },
          { name: "Guides", url: "https://whatsriskmanagement.com/guides" },
          { name: "Position Sizing Strategies", url: "https://whatsriskmanagement.com/guides/position-sizing-strategies" }
        ]}
      />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--data-cyan)] to-transparent opacity-50" />
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[var(--data-cyan)] opacity-5 blur-3xl" />
      </div>

      <article className="container mx-auto py-8 px-4 max-w-4xl relative z-10">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-card/50 border border-border/50 rounded mb-6">
            <BarChart3 className="h-4 w-4 text-[var(--data-cyan)]" />
            <span className="text-xs data-mono text-muted-foreground tracking-wider">ADVANCED_GUIDE</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Position Sizing Strategies for Traders
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed">
            Beyond the basic formula lies a world of sophisticated position sizing techniques.
            Learn the strategies used by hedge funds and professional traders to optimize returns
            while protecting capital.
          </p>

          <div className="mt-8 p-4 bg-[var(--data-cyan)]/5 border border-[var(--data-cyan)]/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Calculator className="h-5 w-5 text-[var(--data-cyan)]" />
              <span className="font-semibold">Apply These Strategies</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Use our calculator to implement any of these sizing strategies.
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
          <h2>Why Position Sizing Strategy Matters</h2>
          <p>
            Two traders with identical entry and exit signals can have vastly different results based
            solely on their position sizing strategy. The right approach can turn a mediocre system
            into a profitable one, while the wrong approach can destroy even the best edge.
          </p>
          <p>
            This guide covers the major position sizing methodologies, their pros and cons, and
            when to use each one.
          </p>

          <h2>1. Fixed Fractional Position Sizing</h2>
          <p>
            <strong>Fixed fractional</strong> (also called constant percentage risk) is the most
            widely used professional position sizing method. You risk a fixed percentage of your
            current account balance on every trade.
          </p>

          <div className="not-prose my-8">
            <div className="bg-card/50 border border-[var(--data-cyan)]/30 rounded-lg p-6">
              <code className="text-[var(--data-cyan)] text-lg block text-center">
                Position Size = (Account × Risk%) ÷ Risk Per Unit
              </code>
            </div>
          </div>

          <h3>How It Works</h3>
          <ul>
            <li>Choose a fixed risk percentage (typically 1-2%)</li>
            <li>Calculate risk amount from current account balance</li>
            <li>Position size automatically scales with account growth/decline</li>
          </ul>

          <div className="not-prose my-6">
            <div className="bg-card/50 border border-border/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Example:</p>
              <p>Account: $50,000 → Risk 1% = $500</p>
              <p>After growth to $60,000 → Risk 1% = $600</p>
              <p>After drawdown to $40,000 → Risk 1% = $400</p>
              <p className="text-[var(--profit-green)] mt-3 font-semibold">
                Automatic position scaling protects capital during drawdowns
              </p>
            </div>
          </div>

          <h3>Pros</h3>
          <ul>
            <li>Simple to implement and understand</li>
            <li>Automatically reduces risk during losing streaks</li>
            <li>Compounds gains during winning streaks</li>
            <li>Mathematically impossible to lose entire account (asymptotic to zero)</li>
          </ul>

          <h3>Cons</h3>
          <ul>
            <li>Slower recovery after drawdowns</li>
            <li>Doesn&apos;t account for trade quality differences</li>
            <li>May be too conservative for small accounts</li>
          </ul>

          <div className="not-prose my-6">
            <div className="p-4 bg-[var(--profit-green)]/5 border border-[var(--profit-green)]/30 rounded-lg">
              <p className="font-semibold">Best For:</p>
              <p className="text-sm text-muted-foreground mt-1">
                Most traders. This should be your default strategy unless you have specific reasons
                to use another method.
              </p>
            </div>
          </div>

          <h2>2. Kelly Criterion</h2>
          <p>
            The <strong>Kelly Criterion</strong> is a mathematical formula developed by John Kelly
            at Bell Labs in 1956. It calculates the optimal position size to maximize long-term
            growth rate while avoiding ruin.
          </p>

          <div className="not-prose my-8">
            <div className="bg-card/50 border border-[var(--data-cyan)]/30 rounded-lg p-6">
              <code className="text-[var(--data-cyan)] text-lg block text-center">
                Kelly % = W - [(1-W) / R]
              </code>
              <p className="text-sm text-muted-foreground text-center mt-3">
                Where W = Win Rate, R = Win/Loss Ratio
              </p>
            </div>
          </div>

          <h3>Example Calculation</h3>
          <div className="not-prose my-6">
            <div className="bg-card/50 border border-border/50 rounded-lg p-4">
              <p>Win Rate (W): 55%</p>
              <p>Average Win: $200, Average Loss: $100 (R = 2)</p>
              <p className="mt-2">Kelly % = 0.55 - [(1 - 0.55) / 2]</p>
              <p>Kelly % = 0.55 - 0.225</p>
              <p className="text-[var(--data-cyan)] font-semibold">Kelly % = 32.5%</p>
            </div>
          </div>

          <h3>The Problem with Full Kelly</h3>
          <p>
            Full Kelly is extremely aggressive. A 32.5% position size is far too risky for most traders.
            The formula assumes:
          </p>
          <ul>
            <li>You know your exact win rate (you don&apos;t)</li>
            <li>You know your exact win/loss ratio (estimates vary)</li>
            <li>You have infinite opportunities (you have limited capital and time)</li>
          </ul>

          <div className="not-prose my-6">
            <div className="p-4 bg-amber-500/5 border border-amber-500/30 rounded-lg flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Use Fractional Kelly</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Most professionals use &quot;half-Kelly&quot; (50%) or &quot;quarter-Kelly&quot; (25%).
                  Half-Kelly achieves 75% of the growth rate with much smoother equity curves.
                </p>
              </div>
            </div>
          </div>

          <h3>Pros</h3>
          <ul>
            <li>Mathematically optimal for long-term growth</li>
            <li>Accounts for edge quality</li>
            <li>Larger positions when edge is stronger</li>
          </ul>

          <h3>Cons</h3>
          <ul>
            <li>Requires accurate win rate and R:R estimates</li>
            <li>Full Kelly creates massive drawdowns</li>
            <li>Sensitive to estimation errors</li>
          </ul>

          <div className="not-prose my-6">
            <div className="p-4 bg-[var(--profit-green)]/5 border border-[var(--profit-green)]/30 rounded-lg">
              <p className="font-semibold">Best For:</p>
              <p className="text-sm text-muted-foreground mt-1">
                Experienced traders with well-documented track records who know their statistics.
                Always use fractional Kelly (25-50%).
              </p>
            </div>
          </div>

          <h2>3. Volatility-Based Position Sizing</h2>
          <p>
            <strong>Volatility-based sizing</strong> adjusts position size based on the asset&apos;s
            current volatility. Higher volatility = smaller positions. Lower volatility = larger positions.
          </p>
          <p>
            The most common implementation uses the Average True Range (ATR) indicator.
          </p>

          <div className="not-prose my-8">
            <div className="bg-card/50 border border-[var(--data-cyan)]/30 rounded-lg p-6">
              <code className="text-[var(--data-cyan)] text-lg block text-center">
                Position Size = (Account × Risk%) ÷ (ATR × ATR Multiplier)
              </code>
            </div>
          </div>

          <h3>Example</h3>
          <div className="not-prose my-6">
            <div className="bg-card/50 border border-border/50 rounded-lg p-4">
              <p>Account: $100,000</p>
              <p>Risk: 1% ($1,000)</p>
              <p>14-day ATR: $500</p>
              <p>ATR Multiplier: 2 (stop at 2× ATR)</p>
              <p className="mt-2">Position Size = $1,000 ÷ ($500 × 2)</p>
              <p className="text-[var(--data-cyan)] font-semibold">Position Size = 1 unit</p>
            </div>
          </div>

          <h3>Why This Works</h3>
          <p>
            During high volatility periods, your stop loss (in dollar terms) naturally gets wider.
            Volatility sizing compensates by reducing position size, keeping your actual dollar risk constant.
          </p>

          <h3>Pros</h3>
          <ul>
            <li>Normalizes risk across different market conditions</li>
            <li>Prevents oversized positions in volatile markets</li>
            <li>Allows larger positions in calm markets</li>
          </ul>

          <h3>Cons</h3>
          <ul>
            <li>More complex to calculate</li>
            <li>Requires volatility indicator</li>
            <li>May reduce positions just when opportunity is greatest</li>
          </ul>

          <div className="not-prose my-6">
            <div className="p-4 bg-[var(--profit-green)]/5 border border-[var(--profit-green)]/30 rounded-lg">
              <p className="font-semibold">Best For:</p>
              <p className="text-sm text-muted-foreground mt-1">
                Traders who trade multiple assets with different volatilities, or trade the same
                asset through varying market conditions.
              </p>
            </div>
          </div>

          <h2>4. Fixed Ratio Position Sizing</h2>
          <p>
            Developed by Ryan Jones, <strong>fixed ratio</strong> position sizing increases position
            size only after achieving a specific profit target (delta).
          </p>

          <div className="not-prose my-8">
            <div className="bg-card/50 border border-[var(--data-cyan)]/30 rounded-lg p-6">
              <code className="text-[var(--data-cyan)] text-lg block text-center">
                Next Level = Current Level + (Current Units × Delta)
              </code>
            </div>
          </div>

          <h3>Example</h3>
          <div className="not-prose my-6">
            <div className="bg-card/50 border border-border/50 rounded-lg p-4">
              <p>Starting: $10,000, 1 contract, Delta = $2,000</p>
              <p className="mt-2">Level 1: $10,000 (1 contract)</p>
              <p>Level 2: $12,000 (2 contracts) — after $2,000 profit</p>
              <p>Level 3: $16,000 (3 contracts) — after $4,000 more profit</p>
              <p>Level 4: $22,000 (4 contracts) — after $6,000 more profit</p>
              <p className="text-muted-foreground mt-2 text-sm">
                Required profit increases with each level, creating a smoother growth curve.
              </p>
            </div>
          </div>

          <h3>Pros</h3>
          <ul>
            <li>Smoother equity curve than fixed fractional</li>
            <li>Faster recovery from drawdowns</li>
            <li>More conservative scaling up</li>
          </ul>

          <h3>Cons</h3>
          <ul>
            <li>More complex to track</li>
            <li>Less mathematically optimal</li>
            <li>Slower compounding in strong uptrends</li>
          </ul>

          <h2>Comparing the Strategies</h2>

          <div className="not-prose my-8">
            <div className="overflow-x-auto">
              <table className="w-full border border-border/50 rounded-lg overflow-hidden text-sm">
                <thead className="bg-card/50">
                  <tr>
                    <th className="px-4 py-3 text-left">Strategy</th>
                    <th className="px-4 py-3 text-left">Complexity</th>
                    <th className="px-4 py-3 text-left">Risk Level</th>
                    <th className="px-4 py-3 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border/50">
                    <td className="px-4 py-3">Fixed Fractional</td>
                    <td className="px-4 py-3 text-[var(--profit-green)]">Low</td>
                    <td className="px-4 py-3">Moderate</td>
                    <td className="px-4 py-3">Everyone</td>
                  </tr>
                  <tr className="border-t border-border/50">
                    <td className="px-4 py-3">Kelly Criterion</td>
                    <td className="px-4 py-3 text-amber-500">Medium</td>
                    <td className="px-4 py-3">High (if full)</td>
                    <td className="px-4 py-3">Experienced traders</td>
                  </tr>
                  <tr className="border-t border-border/50">
                    <td className="px-4 py-3">Volatility-Based</td>
                    <td className="px-4 py-3 text-amber-500">Medium</td>
                    <td className="px-4 py-3">Moderate</td>
                    <td className="px-4 py-3">Multi-asset traders</td>
                  </tr>
                  <tr className="border-t border-border/50">
                    <td className="px-4 py-3">Fixed Ratio</td>
                    <td className="px-4 py-3 text-[var(--loss-red)]">High</td>
                    <td className="px-4 py-3">Conservative</td>
                    <td className="px-4 py-3">Futures traders</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2>Our Recommendation</h2>
          <p>
            For most traders, <strong>fixed fractional position sizing at 1-2% risk</strong> is the
            optimal choice. It&apos;s simple, effective, and time-tested. Start there and only consider
            more advanced methods after you have a documented track record of at least 100+ trades.
          </p>

          <div className="not-prose my-6">
            <div className="p-4 bg-[var(--data-cyan)]/5 border border-[var(--data-cyan)]/30 rounded-lg flex gap-3">
              <TrendingUp className="h-5 w-5 text-[var(--data-cyan)] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">The Most Important Rule</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Whatever strategy you choose, the key is consistency. Switching between methods
                  mid-drawdown or chasing &quot;optimal&quot; sizing will hurt your results more than any
                  sub-optimal strategy choice.
                </p>
              </div>
            </div>
          </div>

          <h2>Calculate Your Position Size Now</h2>
          <p>
            Ready to apply these strategies? Use our position size calculator to quickly calculate
            the optimal position size for your next trade.
          </p>

          <div className="not-prose mt-8">
            <Link
              href="/calculator/position-size"
              className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-[var(--data-cyan)] text-background font-semibold rounded-lg hover:bg-[var(--data-cyan)]/90 transition-colors"
            >
              <Shield className="h-5 w-5" />
              Open Position Size Calculator
            </Link>
          </div>
        </div>

        <footer className="mt-16 pt-8 border-t border-border/50">
          <h3 className="font-semibold mb-4">Related Guides</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/guides/how-to-calculate-position-size"
              className="p-4 bg-card/50 border border-border/50 rounded-lg hover:border-[var(--data-cyan)]/50 transition-colors"
            >
              <h4 className="font-medium">How to Calculate Position Size</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Master the basic position sizing formula with examples.
              </p>
            </Link>
            <Link
              href="/guides/risk-reward-ratio"
              className="p-4 bg-card/50 border border-border/50 rounded-lg hover:border-[var(--profit-green)]/50 transition-colors"
            >
              <h4 className="font-medium">Understanding Risk/Reward Ratios</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Learn how to evaluate trade quality using R:R ratios.
              </p>
            </Link>
          </div>
        </footer>
      </article>
    </>
  );
}
