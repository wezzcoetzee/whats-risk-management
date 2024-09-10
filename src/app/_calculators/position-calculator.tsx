"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import CalculatorHeader from "./header";
import { cardContainerStyles, formContainerStyles } from "@/styles/common";

const positionCalculatorSchema = z
  .object({
    entryPrice: z.coerce
      .number()
      .positive()
      .refine((val) => val > 0, {
        message: "Entry Price must be greater than 0",
      }),
    stopLoss: z.coerce
      .number()
      .positive()
      .refine((val) => val > 0, {
        message: "Stop Loss must be greater than 0",
      }),
    riskAmount: z.coerce
      .number()
      .positive()
      .refine((val) => val > 0, {
        message: "Risk Amount must be greater than 0",
      }),
    leaverageAmount: z.coerce
      .number()
      .positive()
      .refine((val) => val > 0, {
        message: "Leaverage Amount must be greater than 0",
      }),
  })
  .superRefine((data, ctx) => {
    if (data.entryPrice === data.stopLoss)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `entry price and stop loss cannot be the same`,
        path: ["entryPrice", "stopLoss"],
      });
  });

type PositionCalculatorInput = z.infer<typeof positionCalculatorSchema>;

export default function PositionCalculator() {
  const [showInfo, setShowInfo] = useState(false);

  const form = useForm<PositionCalculatorInput>({
    resolver: zodResolver(positionCalculatorSchema),
  });

  const { handleSubmit, reset } = form;

  const [output, setOutput] = useState<{
    stopLossPercentage: number;
    positionSize: number;
    margin: number;
  } | null>(null);

  const onSubmit = (data: PositionCalculatorInput) => {
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
    <Card className={cardContainerStyles}>
      <CalculatorHeader
        header="position size"
        subheader="calculate your trade position size, stop loss percentage and margin required."
        showInfo={showInfo}
        setShowInfo={() => setShowInfo(!showInfo)}
      />
      <div className={formContainerStyles}>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="entryPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>entry price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
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
                    <Input type="number" {...field} />
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
                    <Input type="number" {...field} />
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
                    <Input type="number" {...field} />
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
