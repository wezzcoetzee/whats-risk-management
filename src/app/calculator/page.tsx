import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Target, Calculator } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbStructuredData, WebApplicationStructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Trading Calculators - Free Position Size & Profit Calculators",
  description: "Free professional trading calculators for risk management. Position size calculator, profit calculator, risk/reward analysis, and more. Tools used by institutional traders worldwide.",
  keywords: [
    "trading calculators",
    "position size calculator",
    "profit calculator",
    "risk calculator",
    "forex calculator",
    "crypto calculator",
    "stock calculator",
    "leverage calculator",
    "margin calculator",
    "risk reward calculator",
  ],
  openGraph: {
    title: "Trading Calculators - Free Position Size & Profit Calculators",
    description: "Free professional trading calculators for risk management. Position size calculator, profit calculator, and risk/reward analysis tools.",
    url: "https://whatsriskmanagement.com/calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trading Calculators - Free Risk Management Tools",
    description: "Professional trading calculators for position sizing and profit analysis. Free tools for forex, crypto, and stock traders.",
  },
  alternates: {
    canonical: "https://whatsriskmanagement.com/calculator",
  },
};

export default function CalculatorIndexPage() {
  return (
    <>
      <WebApplicationStructuredData />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://whatsriskmanagement.com" },
          { name: "Calculators", url: "https://whatsriskmanagement.com/calculator" }
        ]}
      />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--profit-green)] to-transparent opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--data-cyan)] to-transparent opacity-50" />
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[var(--profit-green)] opacity-5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[var(--data-cyan)] opacity-5 blur-3xl" />
      </div>

      <div className="container mx-auto py-8 px-4 max-w-6xl relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-card/50 border border-border/50 rounded mb-6">
            <Calculator className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs data-mono text-muted-foreground tracking-wider">FREE_TOOLS</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-[var(--data-cyan)] via-foreground to-[var(--profit-green)] bg-clip-text text-transparent">
              Trading Calculators
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional-grade risk management tools for forex, crypto, and stock traders.
            Calculate position sizes, analyze profits, and optimize your risk/reward ratios.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/calculator/position-size" className="group">
            <Card className="relative overflow-hidden border border-[var(--data-cyan)]/30 bg-card/80 backdrop-blur-sm cursor-pointer h-full transition-all duration-300 hover:border-[var(--data-cyan)]/60 hover:shadow-[0_0_30px_-5px_var(--data-cyan)] noise-texture card-hover-lift">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--data-cyan)] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

              <CardHeader className="space-y-4 pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-2 py-1 bg-[var(--data-cyan)]/10 border border-[var(--data-cyan)]/30 rounded text-xs data-mono text-[var(--data-cyan)] tracking-wider">
                      <Shield className="h-3 w-3" />
                      RISK-CALC
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Position Size Calculator</CardTitle>
                  </div>
                  <div className="text-4xl data-mono text-[var(--data-cyan)]/30 font-bold">01</div>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  Calculate optimal position size based on risk tolerance, stop loss levels, and leverage.
                  Never risk more than you can afford to lose.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="px-3 py-2 bg-background/50 border border-border/50 rounded">
                    <div className="text-[10px] data-mono text-muted-foreground uppercase tracking-wider">Feature</div>
                    <div className="text-xs font-medium mt-0.5">Risk-Based Sizing</div>
                  </div>
                  <div className="px-3 py-2 bg-background/50 border border-border/50 rounded">
                    <div className="text-[10px] data-mono text-muted-foreground uppercase tracking-wider">Feature</div>
                    <div className="text-xs font-medium mt-0.5">Leverage Control</div>
                  </div>
                  <div className="px-3 py-2 bg-background/50 border border-border/50 rounded">
                    <div className="text-[10px] data-mono text-muted-foreground uppercase tracking-wider">Feature</div>
                    <div className="text-xs font-medium mt-0.5">Margin Analysis</div>
                  </div>
                  <div className="px-3 py-2 bg-background/50 border border-border/50 rounded">
                    <div className="text-[10px] data-mono text-muted-foreground uppercase tracking-wider">Feature</div>
                    <div className="text-xs font-medium mt-0.5">Loss Protection</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <span className="text-xs data-mono text-muted-foreground uppercase tracking-wider">Open Calculator</span>
                  <Shield className="h-4 w-4 text-[var(--data-cyan)] group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/calculator/profit" className="group">
            <Card className="relative overflow-hidden border border-[var(--profit-green)]/30 bg-card/80 backdrop-blur-sm cursor-pointer h-full transition-all duration-300 hover:border-[var(--profit-green)]/60 hover:shadow-[0_0_30px_-5px_var(--profit-green)] noise-texture card-hover-lift">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--profit-green)] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

              <CardHeader className="space-y-4 pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-2 py-1 bg-[var(--profit-green)]/10 border border-[var(--profit-green)]/30 rounded text-xs data-mono text-[var(--profit-green)] tracking-wider">
                      <Target className="h-3 w-3" />
                      P&L-CALC
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Profit Calculator</CardTitle>
                  </div>
                  <div className="text-4xl data-mono text-[var(--profit-green)]/30 font-bold">02</div>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  Analyze profit potential across multiple take-profit levels. Calculate ROI,
                  risk/reward ratios, and expected returns.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="px-3 py-2 bg-background/50 border border-border/50 rounded">
                    <div className="text-[10px] data-mono text-muted-foreground uppercase tracking-wider">Feature</div>
                    <div className="text-xs font-medium mt-0.5">Multi-TP Analysis</div>
                  </div>
                  <div className="px-3 py-2 bg-background/50 border border-border/50 rounded">
                    <div className="text-[10px] data-mono text-muted-foreground uppercase tracking-wider">Feature</div>
                    <div className="text-xs font-medium mt-0.5">ROI Calculator</div>
                  </div>
                  <div className="px-3 py-2 bg-background/50 border border-border/50 rounded">
                    <div className="text-[10px] data-mono text-muted-foreground uppercase tracking-wider">Feature</div>
                    <div className="text-xs font-medium mt-0.5">R:R Ratios</div>
                  </div>
                  <div className="px-3 py-2 bg-background/50 border border-border/50 rounded">
                    <div className="text-[10px] data-mono text-muted-foreground uppercase tracking-wider">Feature</div>
                    <div className="text-xs font-medium mt-0.5">Expected Value</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <span className="text-xs data-mono text-muted-foreground uppercase tracking-wider">Open Calculator</span>
                  <Target className="h-4 w-4 text-[var(--profit-green)] group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <section className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Why Use Trading Calculators?</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="h-12 w-12 mx-auto border border-[var(--data-cyan)]/30 bg-[var(--data-cyan)]/5 flex items-center justify-center rounded">
                <Shield className="h-6 w-6 text-[var(--data-cyan)]" />
              </div>
              <h3 className="font-semibold">Protect Your Capital</h3>
              <p className="text-sm text-muted-foreground">
                Proper position sizing ensures you never risk more than a small percentage of your account on any single trade.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="h-12 w-12 mx-auto border border-[var(--profit-green)]/30 bg-[var(--profit-green)]/5 flex items-center justify-center rounded">
                <Target className="h-6 w-6 text-[var(--profit-green)]" />
              </div>
              <h3 className="font-semibold">Maximize Returns</h3>
              <p className="text-sm text-muted-foreground">
                Analyze potential profits and risk/reward ratios to only take trades that are worth the risk.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="h-12 w-12 mx-auto border border-foreground/30 bg-foreground/5 flex items-center justify-center rounded">
                <Calculator className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="font-semibold">Trade Like a Pro</h3>
              <p className="text-sm text-muted-foreground">
                Use the same risk management techniques as institutional traders and hedge fund managers.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
