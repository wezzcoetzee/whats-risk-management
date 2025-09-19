"use client";

import { Calculator, TrendingUp, } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfitCalculator } from "@/components/calculators/profit-calculator";
import { PositionSizeCalculator } from "@/components/calculators/position-size-calculator";
import { useCalculatorSelection, getCalculatorMetadata } from "@/hooks/use-calculator-selection";

export default function CalculatorPage() {
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
      {/* Background gradient effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-blue-500/10 to-primary/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/5 to-purple-500/5 blur-3xl" />
      </div>
      
      <div className="container mx-auto py-8 px-4 max-w-4xl relative">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
            <Calculator className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Trading Calculator Suite</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional risk management tools to optimize your trading strategy and protect your capital.
            </p>
          </div>
        </div>

        {/* Calculator Card */}
        <Card className="border-border/50 bg-background/50 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl">
              <div className={`h-10 w-10 rounded-lg ${calculatorType === "profit" ? "bg-green-100 dark:bg-green-900/30" : "bg-blue-100 dark:bg-blue-900/30"} flex items-center justify-center`}>
                <currentCalculator.icon className={`h-5 w-5 ${currentCalculator.color} dark:${currentCalculator.color.replace('text-', 'text-').replace('-600', '-400')}`} />
              </div>
              {currentCalculator.title}
            </CardTitle>
            <p className="text-muted-foreground text-base">
              {currentCalculator.description}
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            {calculatorType === "profit" ? (
              <ProfitCalculator />
            ) : (
              <PositionSizeCalculator />
            )}
          </CardContent>
        </Card>
        
        {/* Educational Note */}
        <div className="mt-12 text-center space-y-3">
          <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto">
            <TrendingUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            <strong>Professional Tip:</strong> Always use proper risk management. Never risk more than 1-2% of your account on a single trade, and always have a clear exit strategy before entering any position.
          </p>
        </div>
      </div>
    </>
  );
} 