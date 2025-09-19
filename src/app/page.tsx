import Link from "next/link";
import { Calculator, TrendingUp, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      {/* Background gradient effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-blue-500/10 to-primary/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/5 to-purple-500/5 blur-3xl" />
      </div>
      
      <main className="flex flex-1 flex-col items-center justify-center p-8 md:p-24 relative">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16">
          {/* Icon Container */}
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
            <Calculator className="h-10 w-10 text-primary-foreground" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              Risk Management Calculator
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[700px] mx-auto leading-relaxed">
              Master your trading strategy with professional-grade calculators. Calculate optimal position sizes, analyze profit potential, and manage risk like a pro trader.
            </p>
          </div>
          
          {/* Status indicator */}
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-sm font-medium">Ready to calculate</span>
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary delay-75" />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full mb-12">
          <Link href="/calculator?type=position">
            <Card className="group hover:shadow-lg transition-all duration-200 border-border/50 bg-background/50 backdrop-blur-sm cursor-pointer h-full">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">Position Size Calculator</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Calculate the optimal position size based on your risk tolerance and stop loss levels. Never risk more than you can afford to lose.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Risk-based position sizing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Leverage consideration
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Margin requirements
                  </li>
                </ul>
                <div className="mt-4 text-sm text-primary font-medium flex items-center gap-2">
                  <span>Try now</span>
                  <TrendingUp className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/calculator?type=profit">
            <Card className="group hover:shadow-lg transition-all duration-200 border-border/50 bg-background/50 backdrop-blur-sm cursor-pointer h-full">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                    <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl">Profit Calculator</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Analyze potential profits across multiple take profit levels. Calculate ROI, risk/reward ratios, and total profit potential.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Multi-level take profits
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    ROI analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Risk/reward ratios
                  </li>
                </ul>
                <div className="mt-4 text-sm text-primary font-medium flex items-center gap-2">
                  <span>Try now</span>
                  <TrendingUp className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <Button asChild size="lg" className="h-12 px-8 text-base font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200">
            <Link href="/calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Start Calculating
            </Link>
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Professional-grade tools used by traders worldwide
          </p>
        </div>

        {/* Key Benefits */}
        <div className="mt-20 max-w-4xl w-full">
          <h2 className="text-2xl font-bold text-center mb-8">Why Risk Management Matters</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Protect Capital</h3>
              <p className="text-sm text-muted-foreground">
                Never risk more than you can afford to lose with proper position sizing
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold">Maximize Returns</h3>
              <p className="text-sm text-muted-foreground">
                Optimize profit potential while maintaining reasonable risk levels
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto">
                <Calculator className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold">Data-Driven Decisions</h3>
              <p className="text-sm text-muted-foreground">
                Make informed trading decisions based on mathematical calculations
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
