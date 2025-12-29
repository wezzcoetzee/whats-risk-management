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
      <div className="space-y-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="data-mono text-xs text-muted-foreground uppercase tracking-wider">INPUT_PARAMETERS</span>
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
          </div>

          <FormField
            control={form.control}
            name="tradeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="data-mono text-xs uppercase tracking-wider text-muted-foreground">Trade Direction</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-3 mt-2"
                  >
                    <div className="flex-1">
                      <input
                        type="radio"
                        id="long"
                        value="LONG"
                        checked={field.value === "LONG"}
                        onChange={() => field.onChange("LONG")}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor="long"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border bg-background/50 rounded cursor-pointer transition-all peer-checked:border-[var(--profit-green)] peer-checked:bg-[var(--profit-green)]/5 peer-checked:text-[var(--profit-green)] hover:border-[var(--profit-green)]/50"
                      >
                        <TrendingUp className="h-4 w-4" />
                        <span className="data-mono text-sm font-medium">LONG</span>
                      </label>
                    </div>
                    <div className="flex-1">
                      <input
                        type="radio"
                        id="short"
                        value="SHORT"
                        checked={field.value === "SHORT"}
                        onChange={() => field.onChange("SHORT")}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor="short"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border bg-background/50 rounded cursor-pointer transition-all peer-checked:border-[var(--loss-red)] peer-checked:bg-[var(--loss-red)]/5 peer-checked:text-[var(--loss-red)] hover:border-[var(--loss-red)]/50"
                      >
                        <TrendingUp className="h-4 w-4 rotate-180" />
                        <span className="data-mono text-sm font-medium">SHORT</span>
                      </label>
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
                  <FormLabel className="data-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Entry Price
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="h-12 data-mono text-lg bg-background border-border/50 focus:border-[var(--data-cyan)] focus:ring-1 focus:ring-[var(--data-cyan)]/20 transition-all pl-3"
                        {...field}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 data-mono text-xs text-muted-foreground">USD</div>
                    </div>
                  </FormControl>
                  <FormMessage className="mt-1 text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="leverage"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="data-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Leverage
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="1"
                        step="0.1"
                        min="1"
                        max="100"
                        className="h-12 data-mono text-lg bg-background border-border/50 focus:border-[var(--data-cyan)] focus:ring-1 focus:ring-[var(--data-cyan)]/20 transition-all pl-3"
                        {...field}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 data-mono text-xs text-muted-foreground">×</div>
                    </div>
                  </FormControl>
                  <FormMessage className="mt-1 text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stopLoss"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="data-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Stop Loss
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="h-12 data-mono text-lg bg-background border-border/50 focus:border-[var(--loss-red)] focus:ring-1 focus:ring-[var(--loss-red)]/20 transition-all pl-3"
                        {...field}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 data-mono text-xs text-muted-foreground">USD</div>
                    </div>
                  </FormControl>
                  <FormMessage className="mt-1 text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="riskAmount"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="data-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Risk Amount
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="100.00"
                        step="0.01"
                        min="0"
                        className="h-12 data-mono text-lg bg-background border-border/50 focus:border-[var(--data-cyan)] focus:ring-1 focus:ring-[var(--data-cyan)]/20 transition-all pl-3"
                        {...field}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 data-mono text-xs text-muted-foreground">USD</div>
                    </div>
                  </FormControl>
                  <FormMessage className="mt-1 text-xs" />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-14 data-mono text-sm font-bold uppercase tracking-wider bg-[var(--data-cyan)] text-background hover:bg-[var(--data-cyan)]/90 border border-[var(--data-cyan)] hover:shadow-[0_0_20px_-5px_var(--data-cyan)] transition-all duration-300 relative overflow-hidden group"
            onClick={form.handleSubmit(handleCalculatePosition)}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Execute Calculation
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Button>
        </div>

        {results && (
          <div className="border-t border-border/30 pt-6 space-y-6">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="data-mono text-xs text-[var(--data-cyan)] uppercase tracking-wider">OUTPUT_RESULTS</span>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
              <span className="data-mono text-[10px] text-muted-foreground">// CALCULATED</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Position Size */}
              <div className="relative border border-[var(--data-cyan)]/30 bg-[var(--data-cyan)]/5 backdrop-blur-sm p-5 rounded group hover:border-[var(--data-cyan)]/50 transition-all">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--data-cyan)]" />
                <div className="flex items-start justify-between mb-3">
                  <span className="data-mono text-[10px] text-muted-foreground uppercase tracking-wider">Position Size</span>
                  <div className="h-1 w-1 rounded-full bg-[var(--data-cyan)] animate-pulse" />
                </div>
                <div className="space-y-1">
                  <p className="data-mono text-3xl font-bold text-[var(--data-cyan)] number-update">
                    {results.positionSize.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </p>
                  <p className="data-mono text-xs text-muted-foreground">UNITS</p>
                </div>
              </div>

              {/* Margin Required */}
              <div className="relative border border-[var(--data-cyan)]/30 bg-[var(--data-cyan)]/5 backdrop-blur-sm p-5 rounded group hover:border-[var(--data-cyan)]/50 transition-all">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--data-cyan)]" />
                <div className="flex items-start justify-between mb-3">
                  <span className="data-mono text-[10px] text-muted-foreground uppercase tracking-wider">Margin Required</span>
                  <div className="h-1 w-1 rounded-full bg-[var(--data-cyan)] animate-pulse" />
                </div>
                <div className="space-y-1">
                  <p className="data-mono text-3xl font-bold text-[var(--data-cyan)] number-update">
                    {formatCurrency(results.margin)}
                  </p>
                  <p className="data-mono text-xs text-muted-foreground">CAPITAL_REQUIRED</p>
                </div>
              </div>

              {/* Risk Percentage */}
              <div className="relative border border-amber-500/30 bg-amber-500/5 backdrop-blur-sm p-5 rounded group hover:border-amber-500/50 transition-all">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                <div className="flex items-start justify-between mb-3">
                  <span className="data-mono text-[10px] text-muted-foreground uppercase tracking-wider">Risk Distance</span>
                  <div className="h-1 w-1 rounded-full bg-amber-500 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <p className="data-mono text-3xl font-bold text-amber-500 number-update">
                    {formatPercentage(results.riskPercentage)}
                  </p>
                  <p className="data-mono text-xs text-muted-foreground">TO_STOPLOSS</p>
                </div>
              </div>

              {/* Maximum Loss */}
              <div className="relative border border-[var(--loss-red)]/30 bg-[var(--loss-red)]/5 backdrop-blur-sm p-5 rounded group hover:border-[var(--loss-red)]/50 transition-all">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--loss-red)]" />
                <div className="flex items-start justify-between mb-3">
                  <span className="data-mono text-[10px] text-muted-foreground uppercase tracking-wider">Maximum Loss</span>
                  <div className="h-1 w-1 rounded-full bg-[var(--loss-red)] animate-pulse" />
                </div>
                <div className="space-y-1">
                  <p className="data-mono text-3xl font-bold text-[var(--loss-red)] number-update">
                    {formatCurrency(results.potentialLoss)}
                  </p>
                  <p className="data-mono text-xs text-muted-foreground">MAX_RISK</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Form>
  );
} 