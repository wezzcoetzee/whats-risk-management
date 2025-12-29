import Link from "next/link";
import { Shield, Target, Activity, BarChart3, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      {/* Terminal-style background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Edge glow effects - terminal monitor style */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--profit-green)] to-transparent opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--data-cyan)] to-transparent opacity-50" />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[var(--profit-green)] to-transparent opacity-30" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[var(--data-cyan)] to-transparent opacity-30" />

        {/* Corner accent glows */}
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[var(--profit-green)] opacity-5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[var(--data-cyan)] opacity-5 blur-3xl" />
      </div>

      <main className="flex flex-1 flex-col items-center justify-center p-8 md:p-24 relative z-10">
        {/* Hero Section - Terminal Style */}
        <div className="text-center space-y-8 mb-20">
          {/* Terminal Status Indicator */}
          <div className="mb-6 inline-flex items-center gap-3 px-4 py-2 border border-[var(--profit-green)]/30 rounded bg-card/50 backdrop-blur-sm">
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-[var(--profit-green)] animate-pulse" />
              <div className="absolute inset-0 h-2 w-2 rounded-full bg-[var(--profit-green)] opacity-50 blur-sm" />
            </div>
            <span className="text-xs data-mono text-muted-foreground tracking-wider">SYSTEM ONLINE</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight uppercase">
              <span className="bg-gradient-to-r from-foreground via-[var(--profit-green)] to-foreground bg-clip-text text-transparent">
                Risk Terminal
              </span>
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-[var(--profit-green)] to-transparent" />
            <p className="text-base md:text-lg text-muted-foreground max-w-[650px] mx-auto leading-relaxed">
              Professional-grade trading calculators for institutional-level risk management. Calculate positions, analyze P&L, and manage capital with precision.
            </p>
          </div>
        </div>

        {/* Feature Cards - Terminal Style */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl w-full mb-20">
          <Link href="/calculator?type=position" className="group">
            <Card className="relative overflow-hidden border border-[var(--data-cyan)]/30 bg-card/80 backdrop-blur-sm cursor-pointer h-full transition-all duration-300 hover:border-[var(--data-cyan)]/60 hover:shadow-[0_0_30px_-5px_var(--data-cyan)] noise-texture">
              {/* Top accent line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--data-cyan)] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

              <CardHeader className="space-y-4 pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-2 py-1 bg-[var(--data-cyan)]/10 border border-[var(--data-cyan)]/30 rounded text-xs data-mono text-[var(--data-cyan)] tracking-wider">
                      <Shield className="h-3 w-3" />
                      RISK-CALC
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Position Sizing</CardTitle>
                  </div>
                  <div className="text-4xl data-mono text-[var(--data-cyan)]/30 font-bold">01</div>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  Calculate optimal position size based on risk tolerance and stop loss levels. Institutional-grade capital allocation.
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
                  <span className="text-xs data-mono text-muted-foreground uppercase tracking-wider">Launch Terminal</span>
                  <Activity className="h-4 w-4 text-[var(--data-cyan)] group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/calculator?type=profit" className="group">
            <Card className="relative overflow-hidden border border-[var(--profit-green)]/30 bg-card/80 backdrop-blur-sm cursor-pointer h-full transition-all duration-300 hover:border-[var(--profit-green)]/60 hover:shadow-[0_0_30px_-5px_var(--profit-green)] noise-texture">
              {/* Top accent line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--profit-green)] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

              <CardHeader className="space-y-4 pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-2 py-1 bg-[var(--profit-green)]/10 border border-[var(--profit-green)]/30 rounded text-xs data-mono text-[var(--profit-green)] tracking-wider">
                      <Target className="h-3 w-3" />
                      P&L-CALC
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Profit Analysis</CardTitle>
                  </div>
                  <div className="text-4xl data-mono text-[var(--profit-green)]/30 font-bold">02</div>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  Analyze profit potential across multiple take-profit levels. Calculate ROI, risk/reward ratios, and expected returns.
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
                  <span className="text-xs data-mono text-muted-foreground uppercase tracking-wider">Launch Terminal</span>
                  <Activity className="h-4 w-4 text-[var(--profit-green)] group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Terminal Stats - Benefits Section */}
        <div className="max-w-5xl w-full">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-2">
              <span className="data-mono text-muted-foreground text-sm">SYSTEM_</span>
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">CAPABILITIES</span>
            </h2>
            <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Capital Protection */}
            <div className="group relative border border-border/50 bg-card/50 backdrop-blur-sm p-6 rounded hover:border-[var(--data-cyan)]/50 transition-all duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--data-cyan)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="h-10 w-10 border border-[var(--data-cyan)]/30 bg-[var(--data-cyan)]/5 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-[var(--data-cyan)]" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 border border-[var(--data-cyan)]/30 bg-background" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="data-mono text-xs text-muted-foreground">01_</span>
                    <h3 className="font-bold text-sm uppercase tracking-wide">Capital Protection</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Algorithmic position sizing ensures you never risk more than predefined thresholds. Institutional-grade capital preservation.
                  </p>
                </div>
              </div>
            </div>

            {/* Return Optimization */}
            <div className="group relative border border-border/50 bg-card/50 backdrop-blur-sm p-6 rounded hover:border-[var(--profit-green)]/50 transition-all duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--profit-green)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="h-10 w-10 border border-[var(--profit-green)]/30 bg-[var(--profit-green)]/5 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-[var(--profit-green)]" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 border border-[var(--profit-green)]/30 bg-background" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="data-mono text-xs text-muted-foreground">02_</span>
                    <h3 className="font-bold text-sm uppercase tracking-wide">Return Optimization</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Multi-level profit analysis with R:R optimization. Maximize upside while maintaining strict risk parameters.
                  </p>
                </div>
              </div>
            </div>

            {/* Precision Analytics */}
            <div className="group relative border border-border/50 bg-card/50 backdrop-blur-sm p-6 rounded hover:border-foreground/50 transition-all duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-foreground to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="h-10 w-10 border border-foreground/30 bg-foreground/5 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 border border-foreground/30 bg-background" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="data-mono text-xs text-muted-foreground">03_</span>
                    <h3 className="font-bold text-sm uppercase tracking-wide">Precision Analytics</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Real-time mathematical calculations with zero latency. Data-driven decision making at institutional velocity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
