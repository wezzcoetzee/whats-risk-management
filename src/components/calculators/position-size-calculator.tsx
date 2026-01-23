"use client";

import { useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calculator, TrendingUp, Loader2 } from "lucide-react";
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
import { RadioGroup } from "@/components/ui/radio-group";
import { ResultCard } from "@/components/calculators/result-card";
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
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

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
    setIsCalculating(true);
    setShowResults(false);

    setTimeout(() => {
      try {
        const input = {
          tradeType: data.tradeType,
          entryPrice: safeParseFloat(data.entry),
          stopLossPrice: safeParseFloat(data.stopLoss),
          leverage: safeParseFloat(data.leverage),
          riskAmount: safeParseFloat(data.riskAmount),
        };

        const validation = validateTradingParameters(
          input.tradeType,
          input.entryPrice,
          input.stopLossPrice
        );

        if (!validation.isValid) {
          console.error('Validation errors:', validation.errors);
          setIsCalculating(false);
          return;
        }

        const result = calculatePositionSize(input);
        setResults(result);
        setIsCalculating(false);

        requestAnimationFrame(() => {
          setShowResults(true);
        });

      } catch (error) {
        console.error('Calculation error:', error);
        setResults(null);
        setIsCalculating(false);
      }
    }, 300);
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
                        aria-describedby="entry-price-hint"
                        className="h-12 data-mono text-lg bg-background border-border/50 focus-visible:border-[var(--data-cyan)] focus-visible:ring-[var(--data-cyan)]/30 transition-all pl-3 pr-12"
                        {...field}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 data-mono text-xs text-muted-foreground pointer-events-none">USD</div>
                    </div>
                  </FormControl>
                  <FormMessage className="mt-1 text-xs" role="alert" />
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
                        aria-describedby="leverage-hint"
                        className="h-12 data-mono text-lg bg-background border-border/50 focus-visible:border-[var(--data-cyan)] focus-visible:ring-[var(--data-cyan)]/30 transition-all pl-3 pr-8"
                        {...field}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 data-mono text-xs text-muted-foreground pointer-events-none">×</div>
                    </div>
                  </FormControl>
                  <FormMessage className="mt-1 text-xs" role="alert" />
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
                        aria-describedby="stoploss-hint"
                        className="h-12 data-mono text-lg bg-background border-border/50 focus-visible:border-[var(--loss-red)] focus-visible:ring-[var(--loss-red)]/30 transition-all pl-3 pr-12"
                        {...field}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 data-mono text-xs text-muted-foreground pointer-events-none">USD</div>
                    </div>
                  </FormControl>
                  <FormMessage className="mt-1 text-xs" role="alert" />
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
                        aria-describedby="risk-amount-hint"
                        className="h-12 data-mono text-lg bg-background border-border/50 focus-visible:border-[var(--data-cyan)] focus-visible:ring-[var(--data-cyan)]/30 transition-all pl-3 pr-12"
                        {...field}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 data-mono text-xs text-muted-foreground pointer-events-none">USD</div>
                    </div>
                  </FormControl>
                  <FormMessage className="mt-1 text-xs" role="alert" />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isCalculating}
            className="w-full h-14 data-mono text-sm font-bold uppercase tracking-wider bg-[var(--data-cyan)] text-background hover:bg-[var(--data-cyan)]/90 border border-[var(--data-cyan)] hover:shadow-[0_0_20px_-5px_var(--data-cyan)] transition-all duration-300 relative overflow-hidden group btn-press focus-glow-cyan disabled:opacity-70"
            onClick={form.handleSubmit(handleCalculatePosition)}
            aria-busy={isCalculating}
          >
            <span className="relative z-10 flex items-center gap-2">
              {isCalculating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Calculator className="h-4 w-4" />
                  Execute Calculation
                </>
              )}
            </span>
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ${isCalculating ? 'btn-processing' : 'translate-x-[-100%] group-hover:translate-x-[100%]'}`} />
          </Button>
        </div>

        {results && (
          <div
            ref={resultsRef}
            className="border-t border-border/30 pt-6 space-y-6"
            role="region"
            aria-live="polite"
            aria-label="Calculation results"
          >
            <div className={`flex items-baseline gap-2 mb-4 ${showResults ? 'animate-fade-slide-in' : 'opacity-0'}`}>
              <span className="data-mono text-xs text-[var(--data-cyan)] uppercase tracking-wider">OUTPUT_RESULTS</span>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
              <span className="data-mono text-[10px] text-muted-foreground">{'// CALCULATED'}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ResultCard
                label="Position Size"
                value={results.positionSize}
                unit="UNITS"
                color="cyan"
                formatFn={(v) => v.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                showResults={showResults}
                staggerIndex={1}
              />

              <ResultCard
                label="Margin Required"
                value={results.margin}
                unit="CAPITAL_REQUIRED"
                color="cyan"
                formatFn={formatCurrency}
                showResults={showResults}
                staggerIndex={2}
              />

              <ResultCard
                label="Risk Distance"
                value={results.riskPercentage}
                unit="TO_STOPLOSS"
                color="amber"
                formatFn={formatPercentage}
                showResults={showResults}
                staggerIndex={3}
              />

              <ResultCard
                label="Maximum Loss"
                value={results.potentialLoss}
                unit="MAX_RISK"
                color="red"
                formatFn={formatCurrency}
                showResults={showResults}
                staggerIndex={4}
              />
            </div>
          </div>
        )}
      </div>
    </Form>
  );
} 