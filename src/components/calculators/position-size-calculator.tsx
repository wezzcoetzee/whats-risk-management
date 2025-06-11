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

const positionSizeCalculatorSchema = z.object({
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
  riskAmount: z.string()
    .min(1, "Risk amount is required")
    .refine((val) => !isNaN(parseFloat(val)), "Must be a valid number")
    .refine((val) => parseFloat(val) > 0, "Risk amount must be greater than 0"),
}).refine((data) => {
  const entry = parseFloat(data.entry);
  const stopLoss = parseFloat(data.stopLoss);

  if (data.tradeType === "LONG") {
    // For long positions, stop loss must be below entry
    return stopLoss < entry;
  } else {
    // For short positions, stop loss must be above entry
    return stopLoss > entry;
  }
}, {
  message: "Invalid price levels for the selected trade type",
  path: ["entry"],
});

type PositionSizeCalculatorForm = z.infer<typeof positionSizeCalculatorSchema>;

interface PositionResults {
  positionSize: number;
  potentialLoss: number;
  margin: number;
}

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

  const calculatePositionSize = (data: PositionSizeCalculatorForm) => {
    const entryPrice = parseFloat(data.entry);
    const leverageValue = parseFloat(data.leverage);
    const stopLossPrice = parseFloat(data.stopLoss);
    const riskAmountValue = parseFloat(data.riskAmount);

    const priceDifference = data.tradeType === "LONG" 
      ? stopLossPrice - entryPrice 
      : entryPrice - stopLossPrice;
    
    const positionSize = Math.abs(riskAmountValue / priceDifference);
    const margin = (positionSize * entryPrice) / leverageValue;
    const potentialLoss = riskAmountValue;

    setResults({
      positionSize,
      potentialLoss,
      margin,
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
              name="riskAmount"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Risk Amount ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" onClick={form.handleSubmit(calculatePositionSize)}>
            Calculate
          </Button>
        </div>

        {results && (
          <div className="mt-6 p-4 border rounded-lg space-y-4">
            <h3 className="text-lg font-semibold">Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Position Size</p>
                <p className="text-lg font-medium">{results.positionSize.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Margin Required</p>
                <p className="text-lg font-medium">${results.margin.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Potential Loss</p>
                <p className="text-lg font-medium">${results.potentialLoss.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Form>
  );
} 