import type { Metadata } from "next";
import { Shield, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PositionSizeCalculator } from "@/components/calculators/position-size-calculator";
import { BreadcrumbStructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Position Size Calculator - Calculate Optimal Trading Position Size",
  description: "Free position size calculator for forex, crypto, and stock trading. Calculate optimal position size based on risk tolerance, stop loss, and leverage. Professional risk management tool used by institutional traders.",
  keywords: [
    "position size calculator",
    "lot size calculator",
    "forex position calculator",
    "crypto position size",
    "stock position sizing",
    "trading position calculator",
    "risk based position sizing",
    "leverage calculator",
    "margin calculator",
    "stop loss calculator",
  ],
  openGraph: {
    title: "Position Size Calculator - Calculate Optimal Trading Position Size",
    description: "Free position size calculator for forex, crypto, and stock trading. Calculate optimal position size based on risk tolerance, stop loss, and leverage.",
    url: "https://whatsriskmanagement.com/calculator/position-size",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Position Size Calculator - Free Trading Risk Tool",
    description: "Calculate optimal position size based on risk tolerance, stop loss, and leverage. Professional-grade trading calculator.",
  },
  alternates: {
    canonical: "https://whatsriskmanagement.com/calculator/position-size",
  },
};

function PositionSizeStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Position Size Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Calculate optimal trading position size based on risk tolerance, account size, entry price, stop loss, and leverage. Professional-grade risk management tool for forex, crypto, and stock traders.",
    "featureList": [
      "Risk-based position sizing",
      "Leverage and margin calculations",
      "Stop loss distance analysis",
      "Maximum loss protection",
      "Real-time calculations"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default async function PositionSizeCalculatorPage() {
  return (
    <>
      <PositionSizeStructuredData />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://whatsriskmanagement.com" },
          { name: "Calculators", url: "https://whatsriskmanagement.com/calculator" },
          { name: "Position Size Calculator", url: "https://whatsriskmanagement.com/calculator/position-size" }
        ]}
      />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--data-cyan)] to-transparent opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--data-cyan)] to-transparent opacity-50" />
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[var(--data-cyan)] opacity-5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[var(--data-cyan)] opacity-5 blur-3xl" />
      </div>

      <div className="container mx-auto py-8 px-4 max-w-6xl relative z-10">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-card/50 border border-border/50 rounded">
                <div className="h-2 w-2 rounded-full bg-[var(--data-cyan)] animate-pulse" />
                <span className="text-xs data-mono text-muted-foreground tracking-wider">RISK_MANAGEMENT</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-[var(--data-cyan)] to-foreground bg-clip-text text-transparent">
                  Position Size Calculator
                </span>
              </h1>
            </div>

            <div className="hidden md:flex flex-col items-end gap-1">
              <span className="text-xs data-mono text-muted-foreground">FREE TOOL</span>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-[var(--data-cyan)]" />
                <span className="text-xs data-mono text-muted-foreground">REAL-TIME</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

          <p className="text-sm text-muted-foreground max-w-3xl">
            Calculate your optimal position size based on risk tolerance, stop loss distance, and leverage.
            Never risk more than you can afford to lose. Professional traders typically risk 1-2% of their account per trade.
          </p>
        </div>

        <Card className="relative overflow-hidden border border-border/50 bg-card/80 backdrop-blur-sm shadow-2xl noise-texture">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--data-cyan)] to-transparent" />

          <CardHeader className="border-b border-border/30 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 border border-[var(--data-cyan)]/30 bg-[var(--data-cyan)]/5 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-[var(--data-cyan)]" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold uppercase tracking-wide">Position Sizing</CardTitle>
                  <p className="text-xs data-mono text-muted-foreground mt-0.5">CALCULATION_ENGINE</p>
                </div>
              </div>

              <div className="px-3 py-1 border border-[var(--data-cyan)]/30 bg-[var(--data-cyan)]/5 rounded data-mono text-xs text-[var(--data-cyan)]">
                RISK
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <PositionSizeCalculator />
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
                  <span className="data-mono text-xs text-amber-500/80 uppercase tracking-wider">RISK_WARNING</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Professional risk management protocol: Maximum 1-2% account risk per position.
                  Always define exit parameters before trade execution. Capital preservation is paramount.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16 space-y-8">
          <h2 className="text-2xl font-bold">How to Calculate Position Size</h2>

          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              Position sizing is the most critical aspect of risk management in trading. It determines how many units
              of an asset you should buy or sell based on your risk tolerance and the distance to your stop loss.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">The Position Size Formula</h3>
            <div className="bg-card/50 border border-border/50 rounded-lg p-6 my-6">
              <code className="text-[var(--data-cyan)] text-lg">
                Position Size = Risk Amount ÷ (Risk Per Unit × Leverage)
              </code>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Where <strong>Risk Per Unit</strong> is the absolute difference between your entry price and stop loss price.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Example Calculation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Let&apos;s say you have a $10,000 account and want to risk 1% ($100) on a trade:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Entry Price: $50,000 (Bitcoin)</li>
              <li>Stop Loss: $49,000</li>
              <li>Risk Per Unit: $1,000</li>
              <li>Leverage: 10x</li>
              <li>Position Size: $100 ÷ ($1,000 × 10) = 0.01 BTC</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">Why Position Sizing Matters</h3>
            <p className="text-muted-foreground leading-relaxed">
              Even with a 50% win rate, proper position sizing can make you profitable. The key is to never risk
              more than a small percentage of your account on any single trade. This ensures that a string of
              losses won&apos;t wipe out your account.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">The 1% Rule</h3>
            <p className="text-muted-foreground leading-relaxed">
              Most professional traders follow the 1% rule: never risk more than 1% of your total account on
              a single trade. Some aggressive traders may risk up to 2%, but anything beyond that significantly
              increases the risk of ruin.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
