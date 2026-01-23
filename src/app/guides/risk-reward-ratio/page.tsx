import type { Metadata } from "next";
import Link from "next/link";
import { Target, Calculator, ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { BreadcrumbStructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Risk Reward Ratio Explained - How to Calculate R:R in Trading (2024)",
  description: "Learn what risk/reward ratio is and how to calculate it for forex, crypto, and stock trading. Complete guide with examples, optimal ratios, and a free R:R calculator.",
  keywords: [
    "risk reward ratio",
    "risk to reward ratio",
    "R:R ratio trading",
    "how to calculate risk reward",
    "risk reward calculator",
    "trading risk reward",
    "forex risk reward",
    "crypto risk reward",
    "optimal risk reward ratio",
    "1:2 risk reward",
  ],
  openGraph: {
    title: "Risk Reward Ratio Explained - How to Calculate R:R in Trading",
    description: "Learn what risk/reward ratio is and how to calculate it. Complete guide with examples and a free calculator.",
    url: "https://whatsriskmanagement.com/guides/risk-reward-ratio",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Risk Reward Ratio - Complete Trading Guide",
    description: "Understand risk/reward ratios and learn to calculate them for any trade. Free calculator included.",
  },
  alternates: {
    canonical: "https://whatsriskmanagement.com/guides/risk-reward-ratio",
  },
};

function ArticleStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Risk Reward Ratio Explained - How to Calculate R:R in Trading",
    "description": "Complete guide to understanding and calculating risk/reward ratios for forex, crypto, and stock trading.",
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
    "mainEntityOfPage": "https://whatsriskmanagement.com/guides/risk-reward-ratio"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function RiskRewardRatioPage() {
  return (
    <>
      <ArticleStructuredData />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://whatsriskmanagement.com" },
          { name: "Guides", url: "https://whatsriskmanagement.com/guides" },
          { name: "Risk Reward Ratio", url: "https://whatsriskmanagement.com/guides/risk-reward-ratio" }
        ]}
      />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--profit-green)] to-transparent opacity-50" />
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[var(--profit-green)] opacity-5 blur-3xl" />
      </div>

      <article className="container mx-auto py-8 px-4 max-w-4xl relative z-10">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-card/50 border border-border/50 rounded mb-6">
            <Target className="h-4 w-4 text-[var(--profit-green)]" />
            <span className="text-xs data-mono text-muted-foreground tracking-wider">TRADING_GUIDE</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Risk Reward Ratio Explained
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed">
            The risk/reward ratio is the most important metric for evaluating trade quality.
            Learn how to calculate it and why professional traders never take trades below 1:2.
          </p>

          <div className="mt-8 p-4 bg-[var(--profit-green)]/5 border border-[var(--profit-green)]/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Calculator className="h-5 w-5 text-[var(--profit-green)]" />
              <span className="font-semibold">Quick Calculator</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Calculate your risk/reward ratio instantly with our profit calculator.
            </p>
            <Link
              href="/calculator/profit"
              className="inline-flex items-center gap-2 mt-3 text-[var(--profit-green)] hover:underline"
            >
              Open Profit Calculator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <div className="prose prose-invert max-w-none">
          <h2>What is Risk/Reward Ratio?</h2>
          <p>
            The risk/reward ratio (also written as R:R, RRR, or risk-to-reward) compares the potential
            profit of a trade to its potential loss. It answers the question: &quot;How much can I make
            for every dollar I risk?&quot;
          </p>
          <p>
            A risk/reward ratio of 1:2 means you stand to make $2 for every $1 you risk.
            A ratio of 1:3 means $3 profit for every $1 risked.
          </p>

          <h2>The Risk/Reward Formula</h2>
          <p>Calculating risk/reward is straightforward:</p>

          <div className="not-prose my-8">
            <div className="bg-card/50 border border-[var(--profit-green)]/30 rounded-lg p-6">
              <code className="text-[var(--profit-green)] text-xl block text-center">
                Risk/Reward Ratio = Potential Profit ÷ Potential Loss
              </code>
            </div>
          </div>

          <p>Or in terms of price levels:</p>

          <div className="not-prose my-8">
            <div className="bg-card/50 border border-[var(--profit-green)]/30 rounded-lg p-6">
              <code className="text-[var(--profit-green)] text-lg block text-center">
                R:R = |Take Profit - Entry| ÷ |Entry - Stop Loss|
              </code>
            </div>
          </div>

          <h2>Risk/Reward Calculation Examples</h2>

          <h3>Example 1: Long Trade</h3>
          <div className="not-prose my-6">
            <div className="bg-card/50 border border-border/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-[var(--profit-green)]" />
                <span className="font-semibold">Bitcoin Long Trade</span>
              </div>
              <p>Entry Price: $50,000</p>
              <p>Stop Loss: $48,000 (risking $2,000 per BTC)</p>
              <p>Take Profit: $56,000 (potential gain $6,000 per BTC)</p>
              <p className="mt-3">R:R = $6,000 ÷ $2,000</p>
              <p className="text-[var(--profit-green)] font-semibold">Risk/Reward = 1:3</p>
            </div>
          </div>

          <h3>Example 2: Short Trade</h3>
          <div className="not-prose my-6">
            <div className="bg-card/50 border border-border/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="h-5 w-5 text-[var(--loss-red)]" />
                <span className="font-semibold">EUR/USD Short Trade</span>
              </div>
              <p>Entry Price: 1.1000</p>
              <p>Stop Loss: 1.1050 (risking 50 pips)</p>
              <p>Take Profit: 1.0900 (potential gain 100 pips)</p>
              <p className="mt-3">R:R = 100 pips ÷ 50 pips</p>
              <p className="text-[var(--profit-green)] font-semibold">Risk/Reward = 1:2</p>
            </div>
          </div>

          <h2>Why Risk/Reward Ratio Matters</h2>
          <p>
            The risk/reward ratio determines your <strong>required win rate to be profitable</strong>.
            Here&apos;s the math:
          </p>

          <div className="not-prose my-8">
            <div className="overflow-x-auto">
              <table className="w-full border border-border/50 rounded-lg overflow-hidden">
                <thead className="bg-card/50">
                  <tr>
                    <th className="px-4 py-3 text-left">Risk/Reward</th>
                    <th className="px-4 py-3 text-left">Required Win Rate</th>
                    <th className="px-4 py-3 text-left">Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border/50">
                    <td className="px-4 py-3">1:1</td>
                    <td className="px-4 py-3">50%</td>
                    <td className="px-4 py-3 text-amber-500">Breakeven</td>
                  </tr>
                  <tr className="border-t border-border/50">
                    <td className="px-4 py-3">1:2</td>
                    <td className="px-4 py-3">33%</td>
                    <td className="px-4 py-3 text-[var(--profit-green)]">Good</td>
                  </tr>
                  <tr className="border-t border-border/50">
                    <td className="px-4 py-3">1:3</td>
                    <td className="px-4 py-3">25%</td>
                    <td className="px-4 py-3 text-[var(--profit-green)]">Excellent</td>
                  </tr>
                  <tr className="border-t border-border/50">
                    <td className="px-4 py-3">1:4</td>
                    <td className="px-4 py-3">20%</td>
                    <td className="px-4 py-3 text-[var(--profit-green)]">Outstanding</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p>
            With a 1:3 risk/reward ratio, you can be wrong 75% of the time and still break even.
            This is why professionals focus on finding high R:R setups rather than trying to be right
            on every trade.
          </p>

          <h2>What is a Good Risk/Reward Ratio?</h2>
          <p>
            Most professional traders have a minimum threshold of <strong>1:2</strong>. This means
            they won&apos;t take any trade where the potential profit isn&apos;t at least twice the risk.
          </p>
          <p>Some trading styles and their typical R:R ranges:</p>

          <div className="not-prose my-8 space-y-4">
            <div className="p-4 bg-card/50 border border-border/50 rounded-lg">
              <h4 className="font-semibold">Scalping</h4>
              <p className="text-sm text-muted-foreground mt-1">
                R:R typically 1:1 to 1:1.5. Relies on high win rate (70%+) due to lower ratios.
              </p>
            </div>
            <div className="p-4 bg-card/50 border border-border/50 rounded-lg">
              <h4 className="font-semibold">Day Trading</h4>
              <p className="text-sm text-muted-foreground mt-1">
                R:R typically 1:2 to 1:3. Balances win rate with reward potential.
              </p>
            </div>
            <div className="p-4 bg-card/50 border border-border/50 rounded-lg">
              <h4 className="font-semibold">Swing Trading</h4>
              <p className="text-sm text-muted-foreground mt-1">
                R:R typically 1:3 to 1:5. Holds positions longer for bigger moves.
              </p>
            </div>
            <div className="p-4 bg-card/50 border border-border/50 rounded-lg">
              <h4 className="font-semibold">Position Trading</h4>
              <p className="text-sm text-muted-foreground mt-1">
                R:R can exceed 1:10. Targets major trend moves over weeks/months.
              </p>
            </div>
          </div>

          <h2>Using Multiple Take Profit Levels</h2>
          <p>
            Many traders use multiple take profit targets to optimize their average R:R while
            locking in profits along the way. A common approach:
          </p>
          <ul>
            <li><strong>TP1 (50% of position)</strong>: 1:1 - Lock in some profit</li>
            <li><strong>TP2 (30% of position)</strong>: 1:2 - Secure good returns</li>
            <li><strong>TP3 (20% of position)</strong>: 1:4+ - Let winners run</li>
          </ul>
          <p>
            This strategy gives you an average R:R of around 1:1.8 while reducing the emotional
            impact of trades that reverse after being profitable.
          </p>

          <h2>Common Risk/Reward Mistakes</h2>

          <h3>Mistake 1: Moving Stop Loss to Improve R:R</h3>
          <p>
            Never move your stop loss further away to create a better-looking R:R.
            The stop loss should be placed at a level where your trade thesis is invalidated,
            not to hit an arbitrary ratio.
          </p>

          <h3>Mistake 2: Ignoring Market Structure</h3>
          <p>
            A 1:10 R:R means nothing if your take profit is above a major resistance level.
            Always ensure your targets are realistic based on support/resistance, previous highs/lows,
            and market structure.
          </p>

          <h3>Mistake 3: Only Looking at R:R</h3>
          <p>
            Risk/reward is important, but it&apos;s not everything. A 1:5 R:R trade with 10% probability
            of success is worse than a 1:2 R:R trade with 60% probability. Consider the complete picture.
          </p>

          <h2>Expected Value: The Complete Picture</h2>
          <p>
            To truly evaluate a trade, combine R:R with your estimated win probability to calculate
            Expected Value (EV):
          </p>

          <div className="not-prose my-8">
            <div className="bg-card/50 border border-[var(--profit-green)]/30 rounded-lg p-6">
              <code className="text-[var(--profit-green)] text-lg block text-center">
                EV = (Win Rate × Reward) - (Loss Rate × Risk)
              </code>
            </div>
          </div>

          <div className="not-prose my-6">
            <div className="bg-card/50 border border-border/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Example:</p>
              <p>Risk/Reward: 1:2 (risk $100 to make $200)</p>
              <p>Win Rate: 50%</p>
              <p className="mt-2">EV = (0.50 × $200) - (0.50 × $100)</p>
              <p className="mt-1">EV = $100 - $50</p>
              <p className="text-[var(--profit-green)] font-semibold">Expected Value: +$50 per trade</p>
            </div>
          </div>

          <h2>Calculate Your Risk/Reward Now</h2>
          <p>
            Ready to analyze your trades? Use our profit calculator to instantly see your
            risk/reward ratio, potential profits, and ROI for any trade setup.
          </p>

          <div className="not-prose mt-8">
            <Link
              href="/calculator/profit"
              className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-[var(--profit-green)] text-background font-semibold rounded-lg hover:bg-[var(--profit-green)]/90 transition-colors"
            >
              <Target className="h-5 w-5" />
              Open Profit Calculator
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
                Master the position sizing formula with our complete guide.
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
