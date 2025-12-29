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
import { RadioGroup } from "@/components/ui/radio-group";
import {
  calculateProfitMetrics,
  validateTradingParameters,
  formatCurrency,
  formatPercentage,
  safeParseFloat,
  type ProfitCalculationResult
} from "@/lib/calculations";

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
                        id="profit-long"
                        value="LONG"
                        checked={field.value === "LONG"}
                        onChange={() => field.onChange("LONG")}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor="profit-long"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border bg-background/50 rounded cursor-pointer transition-all peer-checked:border-[var(--profit-green)] peer-checked:bg-[var(--profit-green)]/5 peer-checked:text-[var(--profit-green)] hover:border-[var(--profit-green)]/50"
                      >
                        <TrendingUp className="h-4 w-4" />
                        <span className="data-mono text-sm font-medium">LONG</span>
                      </label>
                    </div>
                    <div className="flex-1">
                      <input
                        type="radio"
                        id="profit-short"
                        value="SHORT"
                        checked={field.value === "SHORT"}
                        onChange={() => field.onChange("SHORT")}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor="profit-short"
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
                        className="h-12 data-mono text-lg bg-background border-border/50 focus:border-[var(--profit-green)] focus:ring-1 focus:ring-[var(--profit-green)]/20 transition-all pl-3"
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
                        className="h-12 data-mono text-lg bg-background border-border/50 focus:border-[var(--profit-green)] focus:ring-1 focus:ring-[var(--profit-green)]/20 transition-all pl-3"
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
              name="positionSize"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="data-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Position Size
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="1000.00"
                        step="0.01"
                        min="0"
                        className="h-12 data-mono text-lg bg-background border-border/50 focus:border-[var(--profit-green)] focus:ring-1 focus:ring-[var(--profit-green)]/20 transition-all pl-3"
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

          <div className="flex items-baseline gap-2 mt-6 mb-4">
            <span className="data-mono text-xs text-[var(--profit-green)] uppercase tracking-wider">TARGET_LEVELS</span>
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="tp1"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="data-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Take Profit 1 <span className="text-[var(--profit-green)]">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="h-12 data-mono text-lg bg-background border-border/50 focus:border-[var(--profit-green)] focus:ring-1 focus:ring-[var(--profit-green)]/20 transition-all pl-3"
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
              name="tp2"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="data-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Take Profit 2
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Optional"
                        step="0.01"
                        min="0"
                        className="h-12 data-mono text-lg bg-background border-border/50 focus:border-[var(--profit-green)] focus:ring-1 focus:ring-[var(--profit-green)]/20 transition-all pl-3"
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
              name="tp3"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="data-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Take Profit 3
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Optional"
                        step="0.01"
                        min="0"
                        className="h-12 data-mono text-lg bg-background border-border/50 focus:border-[var(--profit-green)] focus:ring-1 focus:ring-[var(--profit-green)]/20 transition-all pl-3"
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
              name="tp4"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="data-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Take Profit 4
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Optional"
                        step="0.01"
                        min="0"
                        className="h-12 data-mono text-lg bg-background border-border/50 focus:border-[var(--profit-green)] focus:ring-1 focus:ring-[var(--profit-green)]/20 transition-all pl-3"
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
            className="w-full h-14 data-mono text-sm font-bold uppercase tracking-wider bg-[var(--profit-green)] text-background hover:bg-[var(--profit-green)]/90 border border-[var(--profit-green)] hover:shadow-[0_0_20px_-5px_var(--profit-green)] transition-all duration-300 relative overflow-hidden group"
            onClick={form.handleSubmit(handleCalculateProfit)}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Execute Analysis
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Button>
        </div>

        {results && (
          <div className="border-t border-border/30 pt-6 space-y-6">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="data-mono text-xs text-[var(--profit-green)] uppercase tracking-wider">P&L_ANALYSIS</span>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
              <span className="data-mono text-[10px] text-muted-foreground">// CALCULATED</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Total Profit */}
              <div className="relative border border-[var(--profit-green)]/30 bg-[var(--profit-green)]/5 backdrop-blur-sm p-5 rounded group hover:border-[var(--profit-green)]/50 transition-all">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--profit-green)]" />
                <div className="flex items-start justify-between mb-3">
                  <span className="data-mono text-[10px] text-muted-foreground uppercase tracking-wider">Total Profit</span>
                  <div className="h-1 w-1 rounded-full bg-[var(--profit-green)] animate-pulse" />
                </div>
                <div className="space-y-1">
                  <p className="data-mono text-3xl font-bold text-[var(--profit-green)] number-update">
                    {formatCurrency(results.totalProfit)}
                  </p>
                  <p className="data-mono text-xs text-muted-foreground">AGGREGATE_PNL</p>
                </div>
              </div>

              {/* Average Profit */}
              <div className="relative border border-[var(--profit-green)]/30 bg-[var(--profit-green)]/5 backdrop-blur-sm p-5 rounded group hover:border-[var(--profit-green)]/50 transition-all">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--profit-green)]" />
                <div className="flex items-start justify-between mb-3">
                  <span className="data-mono text-[10px] text-muted-foreground uppercase tracking-wider">Average Profit</span>
                  <div className="h-1 w-1 rounded-full bg-[var(--profit-green)] animate-pulse" />
                </div>
                <div className="space-y-1">
                  <p className="data-mono text-3xl font-bold text-[var(--profit-green)] number-update">
                    {formatCurrency(results.averageProfit)}
                  </p>
                  <p className="data-mono text-xs text-muted-foreground">PER_TARGET</p>
                </div>
              </div>

              {/* ROI */}
              <div className="relative border border-[var(--data-cyan)]/30 bg-[var(--data-cyan)]/5 backdrop-blur-sm p-5 rounded group hover:border-[var(--data-cyan)]/50 transition-all">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--data-cyan)]" />
                <div className="flex items-start justify-between mb-3">
                  <span className="data-mono text-[10px] text-muted-foreground uppercase tracking-wider">ROI</span>
                  <div className="h-1 w-1 rounded-full bg-[var(--data-cyan)] animate-pulse" />
                </div>
                <div className="space-y-1">
                  <p className="data-mono text-3xl font-bold text-[var(--data-cyan)] number-update">
                    {formatPercentage(results.roi)}
                  </p>
                  <p className="data-mono text-xs text-muted-foreground">RETURN_ON_MARGIN</p>
                </div>
              </div>

              {/* Potential Loss */}
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
                  <p className="data-mono text-xs text-muted-foreground">DOWNSIDE_RISK</p>
                </div>
              </div>

              {/* Primary R:R */}
              <div className="relative border border-[var(--data-cyan)]/30 bg-[var(--data-cyan)]/5 backdrop-blur-sm p-5 rounded group hover:border-[var(--data-cyan)]/50 transition-all">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--data-cyan)]" />
                <div className="flex items-start justify-between mb-3">
                  <span className="data-mono text-[10px] text-muted-foreground uppercase tracking-wider">Primary R:R</span>
                  <div className="h-1 w-1 rounded-full bg-[var(--data-cyan)] animate-pulse" />
                </div>
                <div className="space-y-1">
                  <p className="data-mono text-3xl font-bold text-[var(--data-cyan)] number-update">
                    {results.primaryRiskReward.toFixed(2)}:1
                  </p>
                  <p className="data-mono text-xs text-muted-foreground">FIRST_TARGET</p>
                </div>
              </div>

              {/* Average R:R */}
              <div className="relative border border-[var(--data-cyan)]/30 bg-[var(--data-cyan)]/5 backdrop-blur-sm p-5 rounded group hover:border-[var(--data-cyan)]/50 transition-all">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--data-cyan)]" />
                <div className="flex items-start justify-between mb-3">
                  <span className="data-mono text-[10px] text-muted-foreground uppercase tracking-wider">Average R:R</span>
                  <div className="h-1 w-1 rounded-full bg-[var(--data-cyan)] animate-pulse" />
                </div>
                <div className="space-y-1">
                  <p className="data-mono text-3xl font-bold text-[var(--data-cyan)] number-update">
                    {results.averageRiskReward.toFixed(2)}:1
                  </p>
                  <p className="data-mono text-xs text-muted-foreground">ALL_TARGETS</p>
                </div>
              </div>
            </div>

            {/* Take Profit Breakdown */}
            {results.takeProfitBreakdown.length > 0 && (
              <div className="mt-6 space-y-3">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="data-mono text-xs text-muted-foreground uppercase tracking-wider">TARGET_BREAKDOWN</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                </div>

                <div className="space-y-2">
                  {results.takeProfitBreakdown.map((tp, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-border/30 bg-card/30 backdrop-blur-sm rounded hover:border-[var(--profit-green)]/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="data-mono text-xs text-muted-foreground w-12">
                          TP{index + 1}
                        </div>
                        <div className="data-mono text-sm font-medium">
                          {formatCurrency(tp.price)}
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="data-mono text-sm font-bold text-[var(--profit-green)]">
                            {formatCurrency(tp.profit)}
                          </div>
                          <div className="data-mono text-[10px] text-muted-foreground">
                            PROFIT
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="data-mono text-sm font-bold text-[var(--data-cyan)]">
                            {tp.riskReward.toFixed(2)}:1
                          </div>
                          <div className="data-mono text-[10px] text-muted-foreground">
                            R:R
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Form>
  );
}
