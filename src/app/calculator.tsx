"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Info } from "lucide-react";
import { percentage, usd } from "@/utils/formatters";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const tradeCalculatorSchema = z.object({
  entryPrice: z
    .number()
    .positive()
    .refine((val) => val > 0, {
      message: "Entry Price must be greater than 0",
    }),
  stopLoss: z
    .number()
    .positive()
    .refine((val) => val > 0, {
      message: "Stop Loss must be greater than 0",
    }),
  riskAmount: z
    .number()
    .positive()
    .refine((val) => val > 0, {
      message: "Risk Amount must be greater than 0",
    }),
  leaverageAmount: z
    .number()
    .positive()
    .refine((val) => val > 0, {
      message: "Leaverage Amount must be greater than 0",
    }),
});

type TradeCalculatorInput = z.infer<typeof tradeCalculatorSchema>;

export default function TradeCalculator() {
  const [showInfo, setShowInfo] = useState(false);

  const form = useForm<TradeCalculatorInput>({
    resolver: zodResolver(tradeCalculatorSchema),
  });

  const { handleSubmit, reset } = form;

  const [output, setOutput] = useState<{
    stopLossPercentage: number;
    positionSize: number;
    margin: number;
  } | null>(null);

  const onSubmit = (data: TradeCalculatorInput) => {
    const { entryPrice, stopLoss, riskAmount, leaverageAmount } = data;
    const difference = Math.abs(entryPrice - stopLoss);

    const stopLossPercentage = (difference / entryPrice) * 100;
    const positionSize = (riskAmount / stopLossPercentage) * 100;

    const margin = positionSize / leaverageAmount;

    setOutput({
      stopLossPercentage,
      positionSize,
      margin,
    });
  };

  const onReset = () => {
    // reset form
    reset({
      entryPrice: 0,
      stopLoss: 0,
      riskAmount: 0,
      leaverageAmount: 1,
    });
    setOutput(null);
  };

  return (
    <Card className="w-full max-w-sm mx-auto p-4 rounded-lg shadow-lg flex flex-col">
      <div className="relative">
        <h1 className="text-2xl font-bold pb-3">position size</h1>
        <p className="text-sm text-gray-500">
          calculate your trade position size, stop loss percentage and margin
          required.
        </p>
        <div className="absolute top-0 right-0">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowInfo(!showInfo)}
          >
            <Info className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Info className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Display Info</span>
          </Button>
        </div>
      </div>
      <div className="flex-grow flex flex-col space-y-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="entryPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>entry price</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  {showInfo && (
                    <FormDescription>
                      the price at which you will enter the trade.
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stopLoss"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>stop loss</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  {showInfo && (
                    <FormDescription>
                      the price at which you will exit the trade. If the trade
                      is going in the opposite direction.
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="riskAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>risk amount</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  {showInfo && (
                    <FormDescription>
                      the amount you are willing to risk/lose on this trade.
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="leaverageAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>leaverage amount</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  {showInfo && (
                    <FormDescription>
                      the amount of leverage you are using for this trade.
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                className="w-full"
                variant="outline"
                onClick={onReset}
              >
                reset
              </Button>
              <Button className="w-full" type="submit">
                calculate
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Bottom half for outputs */}
      {output && (
        <div className="flex-grow  mt-4 rounded-lg p-2 flex flex-col">
          <h2 className="text-sm font-bold mb-2">Calculation Outputs</h2>
          <div className="flex-grow overflow-y-auto">
            <p>position size: {usd.format(output.positionSize)}</p>
            <p>stop loss %: {percentage.format(output.stopLossPercentage)}</p>
            <p>margin required: {usd.format(output.margin)}</p>
          </div>
        </div>
      )}
    </Card>
  );
}
