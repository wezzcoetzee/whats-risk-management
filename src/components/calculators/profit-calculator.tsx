"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

const defaultFormValues = {
  default: {
    tradeType: "LONG" as const,
    entry: "",
    leverage: "",
    stopLoss: "",
    positionSize: "",
    tp1: "",
    tp2: "",
    tp3: "",
    tp4: "",
  },
  long_success: {
    tradeType: "LONG" as const,
    entry: "100",
    leverage: "2",
    stopLoss: "90",
    positionSize: "1000",
    tp1: "110",
    tp2: "120",
    tp3: "130",
    tp4: "140",
  },
  short_success: {
    tradeType: "SHORT" as const,
    entry: "100",
    leverage: "2",
    stopLoss: "110",
    positionSize: "1000",
    tp1: "90",
    tp2: "80",
    tp3: "70",
    tp4: "60",
  },
  long_error: {
    tradeType: "LONG" as const,
    entry: "100",
    leverage: "2",
    stopLoss: "110",
    positionSize: "1000",
    tp1: "80",
    tp2: "120",
    tp3: "140",
    tp4: "160",
  },
  short_error: {
    tradeType: "SHORT" as const,
    entry: "100",
    leverage: "2",
    stopLoss: "90",
    positionSize: "1000",
    tp1: "120",
    tp2: "90",
    tp3: "80",
    tp4: "60",
  },
}

const profitCalculatorSchema = z.object({
  tradeType: z.enum(["LONG", "SHORT"]),
  entry: z.string()
    .min(1, "Entry price is required")
    .refine((val) => !isNaN(parseFloat(val)), "Must be a valid number")
    .refine((val) => parseFloat(val) > 0, "Entry price must be greater than 0"),
  leverage: z.string()
    .min(1, "Leverage is required")
    .refine((val) => !isNaN(parseFloat(val)), "Must be a valid number")
    .refine((val) => parseFloat(val) > 0, "Leverage must be greater than 0"),
  stopLoss: z.string()
    .min(1, "Stop loss is required")
    .refine((val) => !isNaN(parseFloat(val)), "Must be a valid number")
    .refine((val) => parseFloat(val) > 0, "Stop loss must be greater than 0"),
  positionSize: z.string()
    .min(1, "Position size is required")
    .refine((val) => !isNaN(parseFloat(val)), "Must be a valid number")
    .refine((val) => parseFloat(val) > 0, "Position size must be greater than 0"),
  tp1: z.string()
    .min(1, "Take profit 1 is required")
    .refine((val) => !isNaN(parseFloat(val)), "Must be a valid number")
    .refine((val) => parseFloat(val) > 0, "Take profit 1 must be greater than 0"),
  tp2: z.string()
    .optional()
    .refine((val) => !val || !isNaN(parseFloat(val)), "Must be a valid number")
    .refine((val) => !val || parseFloat(val) > 0, "Take profit 2 must be greater than 0"),
  tp3: z.string()
    .optional()
    .refine((val) => !val || !isNaN(parseFloat(val)), "Must be a valid number")
    .refine((val) => !val || parseFloat(val) > 0, "Take profit 3 must be greater than 0"),
  tp4: z.string()
    .optional()
    .refine((val) => !val || !isNaN(parseFloat(val)), "Must be a valid number")
    .refine((val) => !val || parseFloat(val) > 0, "Take profit 4 must be greater than 0"),
}).refine((data) => {
  const entry = parseFloat(data.entry);
  const stopLoss = parseFloat(data.stopLoss);
  const tp1 = parseFloat(data.tp1);
  const tp2 = data.tp2 ? parseFloat(data.tp2) : null;
  const tp3 = data.tp3 ? parseFloat(data.tp3) : null;
  const tp4 = data.tp4 ? parseFloat(data.tp4) : null;

  if (data.tradeType === "LONG") {
    // For long positions:
    // - Stop loss must be below entry
    // - Take profits must be above entry
    // - Take profits must be in ascending order
    if (stopLoss >= entry) return false;
    if (tp1 <= entry) return false;
    if (tp2 !== null && tp2 <= tp1) return false;
    if (tp3 !== null && tp3 <= (tp2 ?? tp1)) return false;
    if (tp4 !== null && tp4 <= (tp3 ?? tp2 ?? tp1)) return false;
  } else {
    // For short positions:
    // - Stop loss must be above entry
    // - Take profits must be below entry
    // - Take profits must be in descending order
    if (stopLoss <= entry) return false;
    if (tp1 >= entry) return false;
    if (tp2 !== null && tp2 >= tp1) return false;
    if (tp3 !== null && tp3 >= (tp2 ?? tp1)) return false;
    if (tp4 !== null && tp4 >= (tp3 ?? tp2 ?? tp1)) return false;
  }
  return true;
}, {
  message: "Invalid price levels for the selected trade type",
  path: ["entry"], // This will show the error on the entry field
});

type ProfitCalculatorForm = z.infer<typeof profitCalculatorSchema>;

interface ProfitResults {
  roi: number;
  riskReward: number;
  averageRiskReward: number;
  potentialLoss: number;
  profits: {
    tp1: number;
    tp2: number;
    tp3: number;
    tp4: number;
  };
  averageTakeProfit: number;
  margin: number;
}

export function ProfitCalculator() {
  const [results, setResults] = useState<ProfitResults | null>(null);

  const form = useForm<ProfitCalculatorForm>({
    resolver: zodResolver(profitCalculatorSchema),
    defaultValues: defaultFormValues.default,
  });

  const calculateProfit = (data: ProfitCalculatorForm) => {
    const entryPrice = parseFloat(data.entry);
    const leverageValue = parseFloat(data.leverage);
    const stopLossPrice = parseFloat(data.stopLoss);
    const positionSizeValue = parseFloat(data.positionSize);
    const tp1Price = parseFloat(data.tp1);
    const tp2Price = data.tp2 ? parseFloat(data.tp2) : 0;
    const tp3Price = data.tp3 ? parseFloat(data.tp3) : 0;
    const tp4Price = data.tp4 ? parseFloat(data.tp4) : 0;

    const priceDifference = data.tradeType === "LONG" 
      ? stopLossPrice - entryPrice 
      : entryPrice - stopLossPrice;
    
    const potentialLoss = Math.abs((priceDifference / entryPrice) * positionSizeValue * leverageValue);

    const calculateProfitAtPrice = (targetPrice: number) => {
      const priceDiff = data.tradeType === "LONG" 
        ? targetPrice - entryPrice 
        : entryPrice - targetPrice;
      return (priceDiff / entryPrice) * positionSizeValue * leverageValue;
    };

    const profits = {
      tp1: calculateProfitAtPrice(tp1Price),
      tp2: tp2Price ? calculateProfitAtPrice(tp2Price) : 0,
      tp3: tp3Price ? calculateProfitAtPrice(tp3Price) : 0,
      tp4: tp4Price ? calculateProfitAtPrice(tp4Price) : 0,
    };

    const takeProfitLevels = [parseInt(data.tp1), parseInt(data.tp2 ?? "0"), parseInt(data.tp3 ?? "0"),parseInt(data.tp4 ?? "0")].filter(tp => tp > 0);
    const maxTakeProfit = Math.max(...takeProfitLevels);
    const averageTakeProfit = takeProfitLevels.reduce((acc, curr) => acc + curr, 0) / takeProfitLevels.length;

    const takeProfits = [profits.tp1, profits.tp2, profits.tp3, profits.tp4].filter(tp => tp > 0);
    const totalProfit = takeProfits.reduce((acc, curr) => acc + curr, 0);

    const margin = positionSizeValue / leverageValue;
    const roi = (totalProfit / margin) * 100;
    const riskReward = maxTakeProfit / potentialLoss;
    const averageRiskReward = averageTakeProfit / potentialLoss;

    setResults({
      roi,
      riskReward,
      averageRiskReward,
      potentialLoss,
      profits,
      averageTakeProfit,
      margin
    });
  };

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
                  <FormLabel>Entry Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
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
                  <FormLabel>Leverage</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1x" {...field} />
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
                  <FormLabel>Stop Loss</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
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
                  <FormLabel>Position Size</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
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
                  <FormLabel>Take Profit 1</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
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
                  <FormLabel>Take Profit 2</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
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
                  <FormLabel>Take Profit 3</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
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
                  <FormLabel>Take Profit 4</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" onClick={form.handleSubmit(calculateProfit)}>
            Calculate
          </Button>
        </div>

        {results && (
          <div className="mt-6 p-4 border rounded-lg space-y-4">
            <h3 className="text-lg font-semibold">Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">ROI</p>
                <p className="text-lg font-medium">{results.roi.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Risk/Reward</p>
                <p className="text-lg font-medium">{results.riskReward.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Risk/Reward</p>
                <p className="text-lg font-medium">{results.averageRiskReward.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Take Profit</p>
                <p className="text-lg font-medium">${results.averageTakeProfit.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Potential Loss</p>
                <p className="text-lg font-medium">${results.potentialLoss.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Margin</p>
                <p className="text-lg font-medium">${results.margin.toFixed(2)}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-3">Profits at Take Profit Levels</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-900 rounded-md">
                    <span className="text-sm font-medium">TP1</span>
                    <span className="text-sm font-medium text-green-600">${results.profits.tp1.toFixed(2)}</span>
                  </div>
                  {results.profits.tp2 !== 0 && (
                    <div className="flex justify-between items-center p-2 bg-gray-900 rounded-md">
                      <span className="text-sm font-medium">TP2</span>
                      <span className="text-sm font-medium text-green-600">${results.profits.tp2.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {results.profits.tp3 !== 0 && (
                    <div className="flex justify-between items-center p-2 bg-gray-900 rounded-md">
                      <span className="text-sm font-medium">TP3</span>
                      <span className="text-sm font-medium text-green-600">${results.profits.tp3.toFixed(2)}</span>
                    </div>
                  )}
                  {results.profits.tp4 !== 0 && (
                    <div className="flex justify-between items-center p-2 bg-gray-900 rounded-md">
                      <span className="text-sm font-medium">TP4</span>
                      <span className="text-sm font-medium text-green-600">${results.profits.tp4.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Form>
  );
} 