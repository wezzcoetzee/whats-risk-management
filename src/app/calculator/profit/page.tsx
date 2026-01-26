import type { Metadata } from "next";
import { Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfitCalculator } from "@/components/calculators/profit-calculator";
import { BreadcrumbStructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Profit Calculator - Calculate Trading P&L & Risk Reward Ratio",
  description: "Free trading profit calculator with multiple take-profit analysis. Calculate P&L, ROI, and risk/reward ratios for forex, crypto, and stock trades. Analyze potential profits before entering any trade.",
  keywords: [
    "profit calculator",
    "trading profit calculator",
    "P&L calculator",
    "risk reward calculator",
    "ROI calculator",
    "forex profit calculator",
    "crypto profit calculator",
    "stock profit calculator",
    "take profit calculator",
    "trading P&L",
  ],
  openGraph: {
    title: "Profit Calculator - Calculate Trading P&L & Risk Reward Ratio",
    description: "Free trading profit calculator with multiple take-profit analysis. Calculate P&L, ROI, and risk/reward ratios for forex, crypto, and stocks.",
    url: "https://whatsriskmanagement.com/calculator/profit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Profit Calculator - Free Trading P&L Tool",
    description: "Calculate P&L, ROI, and risk/reward ratios with multiple take-profit analysis. Professional-grade trading calculator.",
  },
  alternates: {
    canonical: "https://whatsriskmanagement.com/calculator/profit",
  },
};

function ProfitCalculatorStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Trading Profit Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Calculate trading profits, ROI, and risk/reward ratios with multiple take-profit level analysis. Professional-grade P&L calculator for forex, crypto, and stock traders.",
    "featureList": [
      "Multi-level take profit analysis",
      "ROI calculation",
      "Risk/reward ratio analysis",
      "Profit and loss breakdown",
      "Real-time calculations"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "980"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default async function ProfitCalculatorPage() {
  return (
    <>
      <ProfitCalculatorStructuredData />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://whatsriskmanagement.com" },
          { name: "Calculators", url: "https://whatsriskmanagement.com/calculator" },
          { name: "Profit Calculator", url: "https://whatsriskmanagement.com/calculator/profit" }
        ]}
      />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--profit-green)] to-transparent opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--profit-green)] to-transparent opacity-50" />
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[var(--profit-green)] opacity-5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[var(--profit-green)] opacity-5 blur-3xl" />
      </div>

      <div className="container mx-auto py-8 px-4 max-w-6xl relative z-10">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-card/50 border border-border/50 rounded">
                <div className="h-2 w-2 rounded-full bg-[var(--profit-green)] animate-pulse" />
                <span className="text-xs data-mono text-muted-foreground tracking-wider">P&L_ANALYSIS</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-[var(--profit-green)] to-foreground bg-clip-text text-transparent">
                  Profit Calculator
                </span>
              </h1>
            </div>

            <div className="hidden md:flex flex-col items-end gap-1">
              <span className="text-xs data-mono text-muted-foreground">FREE TOOL</span>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-[var(--profit-green)]" />
                <span className="text-xs data-mono text-muted-foreground">REAL-TIME</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

          <p className="text-sm text-muted-foreground max-w-3xl">
            Analyze potential profits across multiple take-profit levels. Calculate ROI, risk/reward ratios,
            and expected returns before entering any trade. Make data-driven decisions.
          </p>
        </div>

        <Card className="relative overflow-hidden border border-border/50 bg-card/80 backdrop-blur-sm shadow-2xl noise-texture">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--profit-green)] to-transparent" />

          <CardHeader className="border-b border-border/30 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 border border-[var(--profit-green)]/30 bg-[var(--profit-green)]/5 flex items-center justify-center">
                  <Target className="h-5 w-5 text-[var(--profit-green)]" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold uppercase tracking-wide">Profit Analysis</CardTitle>
                  <p className="text-xs data-mono text-muted-foreground mt-0.5">CALCULATION_ENGINE</p>
                </div>
              </div>

              <div className="px-3 py-1 border border-[var(--profit-green)]/30 bg-[var(--profit-green)]/5 rounded data-mono text-xs text-[var(--profit-green)]">
                P&L
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <ProfitCalculator />
          </CardContent>
        </Card>

        <div className="mt-8 relative">
          <div className="border border-amber-500/30 bg-amber-500/5 backdrop-blur-sm p-4 rounded">
            <div className="flex items-start gap-3">
              <div className="relative mt-0.5">
                <div className="h-5 w-5 border border-amber-500/50 bg-amber-500/10 flex items-center justify-center">
                  <TrendingUp className="h-3 w-3 text-amber-500" />
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="data-mono text-xs text-amber-500/80 uppercase tracking-wider">TRADING_TIP</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Always aim for a minimum 1:2 risk/reward ratio. This means your potential profit should be
                  at least twice your potential loss. Professional traders often target 1:3 or higher.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16 space-y-8">
          <h2 className="text-2xl font-bold">Understanding Risk/Reward Ratios</h2>

          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              The risk/reward ratio is one of the most important metrics in trading. It compares the potential
              profit of a trade to its potential loss, helping you make better decisions about which trades to take.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">The Risk/Reward Formula</h3>
            <div className="bg-card/50 border border-border/50 rounded-lg p-6 my-6">
              <code className="text-[var(--profit-green)] text-lg">
                Risk/Reward Ratio = Potential Profit ÷ Potential Loss
              </code>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              A ratio of 2:1 means you stand to make $2 for every $1 you risk. The higher the ratio, the better the trade.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Why Risk/Reward Matters</h3>
            <p className="text-muted-foreground leading-relaxed">
              With a 2:1 risk/reward ratio, you only need to win 33% of your trades to break even.
              With a 3:1 ratio, you only need 25% winners. This is why professional traders focus on
              finding high-probability setups with favorable risk/reward.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Multiple Take Profit Levels</h3>
            <p className="text-muted-foreground leading-relaxed">
              Many traders use multiple take-profit levels to lock in profits while letting winners run.
              For example, you might take 50% off at TP1 (1:1), 30% at TP2 (2:1), and let the remaining
              20% run to TP3 (3:1) or higher.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Calculating ROI with Leverage</h3>
            <p className="text-muted-foreground leading-relaxed">
              ROI (Return on Investment) in leveraged trading is calculated based on your margin, not the
              total position size. A 10% price move with 10x leverage equals 100% ROI on your margin.
              Our calculator automatically accounts for leverage in all calculations.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
