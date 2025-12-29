"use client";

import { Suspense } from "react";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfitCalculator } from "@/components/calculators/profit-calculator";
import { PositionSizeCalculator } from "@/components/calculators/position-size-calculator";
import { useCalculatorSelection, getCalculatorMetadata } from "@/hooks/use-calculator-selection";

function CalculatorContent() {
  const { calculatorType, isInitialized } = useCalculatorSelection();
  const currentCalculator = getCalculatorMetadata(calculatorType);

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl relative">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Terminal-style background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Edge glow effects */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--profit-green)] to-transparent opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--data-cyan)] to-transparent opacity-50" />

        {/* Corner accent glows */}
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[var(--profit-green)] opacity-5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[var(--data-cyan)] opacity-5 blur-3xl" />
      </div>

      <div className="container mx-auto py-8 px-4 max-w-6xl relative z-10">
        {/* Header Section - Terminal Style */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-card/50 border border-border/50 rounded">
                <div className="h-2 w-2 rounded-full bg-[var(--profit-green)] animate-pulse" />
                <span className="text-xs data-mono text-muted-foreground tracking-wider">ACTIVE_SESSION</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">
                <span className="data-mono text-muted-foreground text-base">CALC/</span>
                {calculatorType === "profit" ? (
                  <span className="bg-gradient-to-r from-[var(--profit-green)] to-foreground bg-clip-text text-transparent">P&L ANALYSIS</span>
                ) : (
                  <span className="bg-gradient-to-r from-[var(--data-cyan)] to-foreground bg-clip-text text-transparent">POSITION SIZING</span>
                )}
              </h1>
            </div>

            <div className="hidden md:flex flex-col items-end gap-1">
              <span className="text-xs data-mono text-muted-foreground">TERMINAL v2.0</span>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-[var(--profit-green)]" />
                <span className="text-xs data-mono text-muted-foreground">REAL-TIME</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

          <p className="text-sm text-muted-foreground max-w-3xl">
            {currentCalculator.description}
          </p>
        </div>

        {/* Calculator Terminal Card */}
        <Card className="relative overflow-hidden border border-border/50 bg-card/80 backdrop-blur-sm shadow-2xl noise-texture">
          {/* Top accent line with color based on calculator type */}
          <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent ${
            calculatorType === "profit"
              ? "via-[var(--profit-green)]"
              : "via-[var(--data-cyan)]"
          } to-transparent`} />

          <CardHeader className="border-b border-border/30 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`relative h-10 w-10 border ${
                  calculatorType === "profit"
                    ? "border-[var(--profit-green)]/30 bg-[var(--profit-green)]/5"
                    : "border-[var(--data-cyan)]/30 bg-[var(--data-cyan)]/5"
                } flex items-center justify-center`}>
                  <currentCalculator.icon className={`h-5 w-5 ${
                    calculatorType === "profit" ? "text-[var(--profit-green)]" : "text-[var(--data-cyan)]"
                  }`} />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold uppercase tracking-wide">{currentCalculator.title}</CardTitle>
                  <p className="text-xs data-mono text-muted-foreground mt-0.5">CALCULATION_ENGINE</p>
                </div>
              </div>

              <div className={`px-3 py-1 border rounded data-mono text-xs ${
                calculatorType === "profit"
                  ? "border-[var(--profit-green)]/30 bg-[var(--profit-green)]/5 text-[var(--profit-green)]"
                  : "border-[var(--data-cyan)]/30 bg-[var(--data-cyan)]/5 text-[var(--data-cyan)]"
              }`}>
                {calculatorType === "profit" ? "P&L" : "RISK"}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            {calculatorType === "profit" ? (
              <ProfitCalculator />
            ) : (
              <PositionSizeCalculator />
            )}
          </CardContent>
        </Card>

        {/* Terminal Warning Banner */}
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
                  <span className="data-mono text-[10px] text-muted-foreground">{'// IMPORTANT'}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Professional risk management protocol: Maximum 1-2% account risk per position. Always define exit parameters before trade execution. Capital preservation is paramount.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function CalculatorPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto py-8 px-4 max-w-4xl relative">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    }>
      <CalculatorContent />
    </Suspense>
  );
} 