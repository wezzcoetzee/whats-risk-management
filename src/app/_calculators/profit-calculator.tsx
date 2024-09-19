"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus, Minus } from "lucide-react";
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

const profitCalculatorSchema = z
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
    effectivePositionSize: z.coerce
      .number()
      .positive()
      .refine((val) => val > 0, {
        message: "Risk Amount must be greater than 0",
      }),
    leverage: z.coerce
      .number()
      .positive()
      .refine((val) => val > 0, {
        message: "Leaverage Amount must be greater than 0",
      }),
    takeProfitLevels: z.array(z.coerce.number()).max(4),
  })
  .superRefine((data, ctx) => {
    if (data.entryPrice === data.stopLoss)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `entry price and stop loss cannot be the same`,
        path: ["entryPrice", "stopLoss"],
      });
  });

type ProfitCalculatorInput = z.infer<typeof profitCalculatorSchema>;

export default function ProfitCalculator() {
  const [takeProfits, setTakeProfits] = useState<number[]>([0]);
  const [showInfo, setShowInfo] = useState(false);

  const form = useForm<ProfitCalculatorInput>({
    resolver: zodResolver(profitCalculatorSchema),
    defaultValues: {
      entryPrice: 55000,
      stopLoss: 54000,
      effectivePositionSize: 1000,
      leverage: 10,
      takeProfitLevels: [59000, 62000, 69000, 72420],
    },
  });

  const { handleSubmit, reset } = form;

  const [output, setOutput] = useState<{
    stopLossPercentage: number;
    effectivePositionSize: number;
    riskAmount: number;
    profitAtEachTakeProfitLevel: number[];
    margin: number;
    profit: number;
    percentageOfHoldingsSoldAtEachTakeProfit: number;
  } | null>(null);

  const addTakeProfit = () => {
    if (takeProfits.length < 4) {
      setTakeProfits([...takeProfits, takeProfits.length]);
    }
  };

  const removeTakeProfit = (index: number) => {
    if (takeProfits.length === 1) {
      return;
    }
    setTakeProfits(takeProfits.filter((_, i) => i !== index));
  };

  const onSubmit = (data: ProfitCalculatorInput) => {
    console.log(data);

    const {
      entryPrice,
      stopLoss,
      effectivePositionSize,
      leverage,
      takeProfitLevels,
    } = data;

    const difference = Math.abs(entryPrice - stopLoss);

    const stopLossPercentage = difference / entryPrice;

    const margin = effectivePositionSize / leverage;

    const riskAmount = effectivePositionSize * stopLossPercentage;

    const percentageOfHoldingsSoldAtEachTakeProfit =
      effectivePositionSize / takeProfitLevels.length / effectivePositionSize;

    const profitAtEachTakeProfitLevel = takeProfitLevels.map(
      (level) =>
        percentageOfHoldingsSoldAtEachTakeProfit *
        effectivePositionSize *
        (Math.abs(level - entryPrice) / entryPrice)
    );

    const profit = profitAtEachTakeProfitLevel.reduce(
      (acc, curr) => acc + curr,
      0
    );

    setOutput({
      stopLossPercentage,
      effectivePositionSize,
      riskAmount,
      profitAtEachTakeProfitLevel,
      margin,
      profit,
      percentageOfHoldingsSoldAtEachTakeProfit,
    });
  };

  const onReset = () => {
    // reset form
    reset({
      entryPrice: 0,
      stopLoss: 0,
      effectivePositionSize: 0,
      leverage: 1,
    });
    setOutput(null);
  };

  return (
    <Card className={cardContainerStyles}>
      <CalculatorHeader
        header="profit"
        subheader="calculate the total profit you will make on a trade."
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
              name="effectivePositionSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>position size</FormLabel>
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
              name="leverage"
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
            <div className="flex items-center space-x-2 justify-between">
              <h2>take profit</h2>
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={addTakeProfit}
              >
                <Plus className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Plus className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">add take profit</span>
              </Button>
            </div>
            {takeProfits.map((_, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`takeProfitLevels.${index}`}
                render={({ field }) => (
                  <div className="flex items-end space-x-2">
                    <div className="flex-grow">
                      <FormItem>
                        <FormLabel>{`take profit ${index + 1}`}</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        {showInfo && (
                          <FormDescription>
                            the amount of prfit you want to take at this level.
                          </FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => removeTakeProfit(index)}
                    >
                      <Minus className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Minus className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">remove take profit</span>
                    </Button>
                  </div>
                )}
              />
            ))}
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
            <p>position size: {usd.format(output.effectivePositionSize)}</p>
            <p>stop loss %: {percentage.format(output.stopLossPercentage)}</p>
            <p>lost at stop loss: {usd.format(output.riskAmount)}</p>
            <p>margin required: {usd.format(output.margin)}</p>
            <p>
              percentage sold at each take profit level:{" "}
              {percentage.format(
                output.percentageOfHoldingsSoldAtEachTakeProfit
              )}
            </p>
            <p>profit at each take profit level:</p>
            <ul>
              {output.profitAtEachTakeProfitLevel.map((profit, index) => (
                <li key={index}>
                  {`take profit ${index + 1}: ${usd.format(profit)}`}
                </li>
              ))}
            </ul>
            <p>total profit: {usd.format(output.profit)}</p>
          </div>
        </div>
      )}
    </Card>
  );
}
