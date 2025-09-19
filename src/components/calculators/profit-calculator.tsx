"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TrendingUp, Calculator, Shield, DollarSign, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  calculateProfitMetrics,
  validateTradingParameters,
  formatCurrency,
  formatPercentage,
  safeParseFloat,
  type ProfitCalculationResult
} from "@/lib/calculations";

// Default form values
const defaultFormValues = {
  tradeType: "LONG" as const,
  entry: "",
  leverage: "",
  stopLoss: "",
  positionSize: "",
  tp1: "",
  tp2: "",
  tp3: "",
  tp4: "",
};

const profitCalculatorSchema = z.object({
  tradeType: z.enum(["LONG", "SHORT"]),
  entry: z.string()
    .min(1, "Entry price is required")
    .refine((val) => !isNaN(safeParseFloat(val)), "Must be a valid number")
    .refine((val) => safeParseFloat(val) > 0, "Entry price must be greater than 0")
    .refine((val) => safeParseFloat(val) < 1000000, "Entry price too large"),
  leverage: z.string()
    .min(1, "Leverage is required")
    .refine((val) => !isNaN(safeParseFloat(val)), "Must be a valid number")
    .refine((val) => safeParseFloat(val) >= 1, "Leverage must be at least 1x")
    .refine((val) => safeParseFloat(val) <= 100, "Leverage cannot exceed 100x"),
  stopLoss: z.string()
    .min(1, "Stop loss is required")
    .refine((val) => !isNaN(safeParseFloat(val)), "Must be a valid number")
    .refine((val) => safeParseFloat(val) > 0, "Stop loss must be greater than 0")
    .refine((val) => safeParseFloat(val) < 1000000, "Stop loss price too large"),
  positionSize: z.string()
    .min(1, "Position size is required")
    .refine((val) => !isNaN(safeParseFloat(val)), "Must be a valid number")
    .refine((val) => safeParseFloat(val) > 0, "Position size must be greater than 0")
    .refine((val) => safeParseFloat(val) < 10000000, "Position size too large"),
  tp1: z.string()
    .min(1, "Take profit 1 is required")
    .refine((val) => !isNaN(safeParseFloat(val)), "Must be a valid number")
    .refine((val) => safeParseFloat(val) > 0, "Take profit 1 must be greater than 0")
    .refine((val) => safeParseFloat(val) < 1000000, "Take profit 1 price too large"),
  tp2: z.string()
    .optional()
    .refine((val) => !val || !isNaN(safeParseFloat(val)), "Must be a valid number")
    .refine((val) => !val || safeParseFloat(val) > 0, "Take profit 2 must be greater than 0")
    .refine((val) => !val || safeParseFloat(val) < 1000000, "Take profit 2 price too large"),
  tp3: z.string()
    .optional()
    .refine((val) => !val || !isNaN(safeParseFloat(val)), "Must be a valid number")
    .refine((val) => !val || safeParseFloat(val) > 0, "Take profit 3 must be greater than 0")
    .refine((val) => !val || safeParseFloat(val) < 1000000, "Take profit 3 price too large"),
  tp4: z.string()
    .optional()
    .refine((val) => !val || !isNaN(safeParseFloat(val)), "Must be a valid number")
    .refine((val) => !val || safeParseFloat(val) > 0, "Take profit 4 must be greater than 0")
    .refine((val) => !val || safeParseFloat(val) < 1000000, "Take profit 4 price too large"),
}).refine((data) => {
  const entry = safeParseFloat(data.entry);
  const stopLoss = safeParseFloat(data.stopLoss);
  const takeProfits = [
    safeParseFloat(data.tp1),
    data.tp2 ? safeParseFloat(data.tp2) : 0,
    data.tp3 ? safeParseFloat(data.tp3) : 0,
    data.tp4 ? safeParseFloat(data.tp4) : 0,
  ].filter(tp => tp > 0);
  
  const validation = validateTradingParameters(data.tradeType, entry, stopLoss, takeProfits);
  return validation.isValid;
}, {
  message: "Invalid price levels for the selected trade type",
  path: ["tp1"],
});

type ProfitCalculatorForm = z.infer<typeof profitCalculatorSchema>;

type ProfitResults = ProfitCalculationResult;

export function ProfitCalculator() {
  const [results, setResults] = useState<ProfitResults | null>(null);

  const form = useForm<ProfitCalculatorForm>({
    resolver: zodResolver(profitCalculatorSchema),
    defaultValues: defaultFormValues,
  });

  const handleCalculateProfit = useCallback((data: ProfitCalculatorForm) => {
    try {
      const input = {
        tradeType: data.tradeType,
        entryPrice: safeParseFloat(data.entry),
        stopLossPrice: safeParseFloat(data.stopLoss),
        leverage: safeParseFloat(data.leverage),
        positionSize: safeParseFloat(data.positionSize),
        takeProfits: [
          safeParseFloat(data.tp1),
          data.tp2 ? safeParseFloat(data.tp2) : 0,
          data.tp3 ? safeParseFloat(data.tp3) : 0,
          data.tp4 ? safeParseFloat(data.tp4) : 0,
        ],
      };
      
      // Validate parameters
      const validation = validateTradingParameters(
        input.tradeType,
        input.entryPrice,
        input.stopLossPrice,
        input.takeProfits.filter(tp => tp > 0)
      );
      
      if (!validation.isValid) {
        console.error('Validation errors:', validation.errors);
        return;
      }
      
      const result = calculateProfitMetrics(input);
      setResults(result);
      
    } catch (error) {
      console.error('Calculation error:', error);
      setResults(null);
    }
  }, []);

  return (
    <Form {...form}>
      <div className="space-y-12">
        <div className="space-y-10">
          <FormField
            control={form.control}
            name="tradeType"
            render={({ field }) => (
              <FormItem className="min-h-[80px]">
                <FormLabel>Trade Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="LONG" id="long" />
                      <FormLabel htmlFor="long">Long</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="SHORT" id="short" />
                      <FormLabel htmlFor="short">Short</FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="entry"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center gap-2 text-base font-medium">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Entry Price
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      step="0.01"
                      min="0"
                      className="h-11 text-base bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-200"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="leverage"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center gap-2 text-base font-medium">
                    <Calculator className="h-4 w-4 text-primary" />
                    Leverage
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="1" 
                      step="0.1"
                      min="1"
                      max="100"
                      className="h-11 text-base bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-200"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stopLoss"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center gap-2 text-base font-medium">
                    <Shield className="h-4 w-4 text-destructive" />
                    Stop Loss
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      step="0.01"
                      min="0"
                      className="h-11 text-base bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-200"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="positionSize"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center gap-2 text-base font-medium">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    Position Size
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="1000.00" 
                      step="0.01"
                      min="0"
                      className="h-11 text-base bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-200"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="tp1"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center gap-2 text-base font-medium">
                    <Target className="h-4 w-4 text-green-600" />
                    Take Profit 1 *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      step="0.01"
                      min="0"
                      className="h-11 text-base bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-200"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tp2"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center gap-2 text-base font-medium">
                    <Target className="h-4 w-4 text-green-600" />
                    Take Profit 2
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0.00 (optional)" 
                      step="0.01"
                      min="0"
                      className="h-11 text-base bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-200"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tp3"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center gap-2 text-base font-medium">
                    <Target className="h-4 w-4 text-green-600" />
                    Take Profit 3
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0.00 (optional)" 
                      step="0.01"
                      min="0"
                      className="h-11 text-base bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-200"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tp4"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center gap-2 text-base font-medium">
                    <Target className="h-4 w-4 text-green-600" />
                    Take Profit 4
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0.00 (optional)" 
                      step="0.01"
                      min="0"
                      className="h-11 text-base bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-200"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200" 
            onClick={form.handleSubmit(handleCalculateProfit)}
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Profit Metrics
          </Button>
        </div>

        {results && (
          <div className="mt-8 p-6 border rounded-xl bg-gradient-to-br from-background to-muted/20 space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Profit Analysis Results</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-card border">
                  <p className="text-sm text-muted-foreground font-medium">Return on Investment</p>
                  <p className="text-2xl font-bold text-green-600">{formatPercentage(results.roi)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Average profit vs margin</p>
                </div>
                
                <div className="p-4 rounded-lg bg-card border">
                  <p className="text-sm text-muted-foreground font-medium">Primary Risk/Reward</p>
                  <p className="text-2xl font-bold text-blue-600">{results.riskReward.toFixed(2)}:1</p>
                  <p className="text-xs text-muted-foreground mt-1">First take profit vs max loss</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-card border">
                  <p className="text-sm text-muted-foreground font-medium">Average Profit</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(results.averageProfit)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Per take profit level</p>
                </div>
                
                <div className="p-4 rounded-lg bg-card border">
                  <p className="text-sm text-muted-foreground font-medium">Margin Required</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.margin)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Capital needed for position</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-card border">
                  <p className="text-sm text-muted-foreground font-medium">Average Risk/Reward</p>
                  <p className="text-2xl font-bold text-purple-600">{results.averageRiskReward.toFixed(2)}:1</p>
                  <p className="text-xs text-muted-foreground mt-1">Average profit vs max loss</p>
                </div>
                
                <div className="p-4 rounded-lg bg-card border">
                  <p className="text-sm text-muted-foreground font-medium">Maximum Loss</p>
                  <p className="text-2xl font-bold text-destructive">{formatCurrency(results.potentialLoss)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Risk if stop loss hit</p>
                </div>
              </div>
            </div>
            
            {results.profits.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  <h4 className="text-lg font-semibold">Individual Take Profit Levels</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.profits.map((profit, index) => {
                    if (profit <= 0) return null;
                    return (
                      <div 
                        key={index}
                        className="flex justify-between items-center p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center">
                            {index + 1}
                          </div>
                          <span className="font-medium">Take Profit {index + 1}</span>
                        </div>
                        <span className="text-lg font-bold text-green-700 dark:text-green-400">
                          {formatCurrency(profit)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Form>
  );
} 