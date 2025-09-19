"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calculator, TrendingUp, Shield, DollarSign } from "lucide-react";
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
  calculatePositionSize,
  validateTradingParameters,
  formatCurrency,
  formatPercentage,
  safeParseFloat,
  type PositionCalculationResult
} from "@/lib/calculations";

const positionSizeCalculatorSchema = z.object({
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
  riskAmount: z.string()
    .min(1, "Risk amount is required")
    .refine((val) => !isNaN(safeParseFloat(val)), "Must be a valid number")
    .refine((val) => safeParseFloat(val) > 0, "Risk amount must be greater than 0")
    .refine((val) => safeParseFloat(val) < 1000000, "Risk amount too large"),
}).refine((data) => {
  const entry = safeParseFloat(data.entry);
  const stopLoss = safeParseFloat(data.stopLoss);
  
  const validation = validateTradingParameters(data.tradeType, entry, stopLoss);
  return validation.isValid;
}, {
  message: "Invalid price levels for the selected trade type",
  path: ["stopLoss"],
});

type PositionSizeCalculatorForm = z.infer<typeof positionSizeCalculatorSchema>;

type PositionResults = PositionCalculationResult;

export function PositionSizeCalculator() {
  const [results, setResults] = useState<PositionResults | null>(null);

  const form = useForm<PositionSizeCalculatorForm>({
    resolver: zodResolver(positionSizeCalculatorSchema),
    defaultValues: {
      tradeType: "LONG",
      entry: "",
      leverage: "",
      stopLoss: "",
      riskAmount: "",
    },
  });

  const handleCalculatePosition = useCallback((data: PositionSizeCalculatorForm) => {
    try {
      const input = {
        tradeType: data.tradeType,
        entryPrice: safeParseFloat(data.entry),
        stopLossPrice: safeParseFloat(data.stopLoss),
        leverage: safeParseFloat(data.leverage),
        riskAmount: safeParseFloat(data.riskAmount),
      };
      
      // Validate parameters
      const validation = validateTradingParameters(
        input.tradeType,
        input.entryPrice,
        input.stopLossPrice
      );
      
      if (!validation.isValid) {
        console.error('Validation errors:', validation.errors);
        return;
      }
      
      const result = calculatePositionSize(input);
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
              name="riskAmount"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center gap-2 text-base font-medium">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    Risk Amount
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="100.00" 
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
            onClick={form.handleSubmit(handleCalculatePosition)}
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Position Size
          </Button>
        </div>

        {results && (
          <div className="mt-8 p-6 border rounded-xl bg-gradient-to-br from-background to-muted/20 space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calculator className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Position Calculation Results</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-card border">
                  <p className="text-sm text-muted-foreground font-medium">Position Size</p>
                  <p className="text-2xl font-bold text-foreground">{results.positionSize.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
                  <p className="text-xs text-muted-foreground mt-1">Units to trade</p>
                </div>
                
                <div className="p-4 rounded-lg bg-card border">
                  <p className="text-sm text-muted-foreground font-medium">Price Movement</p>
                  <p className="text-2xl font-bold text-orange-600">{formatPercentage(results.riskPercentage)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Distance to stop loss</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-card border">
                  <p className="text-sm text-muted-foreground font-medium">Margin Required</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.margin)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Capital needed for position</p>
                </div>
                
                <div className="p-4 rounded-lg bg-card border">
                  <p className="text-sm text-muted-foreground font-medium">Maximum Loss</p>
                  <p className="text-2xl font-bold text-destructive">{formatCurrency(results.potentialLoss)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Risk amount if stop loss hit</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Form>
  );
} 