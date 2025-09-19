"use client";

import { useState } from "react";
import { Calculator, TrendingUp, Shield, Target } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfitCalculator } from "@/components/calculators/profit-calculator";
import { PositionSizeCalculator } from "@/components/calculators/position-size-calculator";

export default function CalculatorPage() {
  const [calculatorType, setCalculatorType] = useState<string>("profit");

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
          
          {/* Status indicator */}
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-sm font-medium">Calculator ready</span>
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary delay-75" />
          </div>
        </div>

        {/* Calculator Type Selector */}
        <div className="mb-8 flex justify-center">
          <div className="bg-background/50 backdrop-blur-sm border rounded-xl p-2">
            <Select
              value={calculatorType}
              onValueChange={setCalculatorType}
            >
              <SelectTrigger className="w-[300px] h-12 text-base bg-transparent border-0 focus:ring-0">
                <div className="flex items-center gap-2">
                  <SelectValue placeholder="Select calculator type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="profit" className="text-base">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-600" />
                    <span>Profit Calculator</span>
                  </div>
                </SelectItem>
                <SelectItem value="position" className="text-base">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span>Position Size Calculator</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Calculator Card */}
        <Card className="border-border/50 bg-background/50 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl">
              {calculatorType === "profit" ? (
                <>
                  <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  Profit Calculator
                </>
              ) : (
                <>
                  <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  Position Size Calculator
                </>
              )}
            </CardTitle>
            <p className="text-muted-foreground text-base">
              {calculatorType === "profit" 
                ? "Analyze potential profits and risk/reward ratios across multiple take profit levels."
                : "Calculate optimal position size based on your risk tolerance and stop loss levels."
              }
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