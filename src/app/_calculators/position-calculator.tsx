"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
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
import FormRow from "./form-row";
import Output from "./output";
import Buttons from "./buttons";

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
    leverage: z.coerce
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

const defaultFormValues: PositionCalculatorInput = {
  entryPrice: 55000,
  stopLoss: 54000,
  riskAmount: 100,
  leverage: 10,
};

export default function PositionCalculator() {
  const [showInfo, setShowInfo] = useState(false);

  const form = useForm<PositionCalculatorInput>({
    resolver: zodResolver(positionCalculatorSchema),
    defaultValues:
      process.env.NODE_ENV === "development" ? defaultFormValues : {},
  });

  const { handleSubmit, reset } = form;

  const [output, setOutput] = useState<{
    stopLossPercentage: number;
    actualPositionSize: number;
    effectivePositionSize: number;
  } | null>(null);

  const onSubmit = (data: PositionCalculatorInput) => {
    const { entryPrice, stopLoss, riskAmount, leverage } = data;
    const difference = Math.abs(entryPrice - stopLoss);

    const stopLossPercentage = difference / entryPrice;
    const riskMagnified = riskAmount * leverage;

    const effectivePositionSize = riskMagnified / stopLossPercentage;
    const actualPositionSize = effectivePositionSize / leverage;

    setOutput({
      stopLossPercentage,
      actualPositionSize,
      effectivePositionSize,
    });
  };

  const onReset = () => {
    reset({
      entryPrice: 0,
      stopLoss: 0,
      riskAmount: 0,
      leverage: 1,
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormRow>
              <FormField
                control={form.control}
                name="entryPrice"
                render={({ field }) => (
                  <FormItem className="flex-1">
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
                  <FormItem className="flex-1">
                    <FormLabel>stop loss</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    {showInfo && (
                      <FormDescription>
                        the price at which you will exit the trade if the trade
                        goes against you.
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormRow>
            <FormRow>
              <FormField
                control={form.control}
                name="riskAmount"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>risk amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    {showInfo && (
                      <FormDescription>
                        the amount you are willing to lose on this trade.
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
                  <FormItem className="flex-1">
                    <FormLabel>leaverage amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    {showInfo && (
                      <FormDescription>
                        leverage is the use of borrowed capital or debt to
                        increase the potential return on investment.
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormRow>
            {output && <ResultOuput output={output} />}
            <Buttons onReset={onReset} />
          </form>
        </Form>
      </div>
    </Card>
  );
}

const ResultOuput = ({
  output,
}: {
  output: {
    stopLossPercentage: number;
    actualPositionSize: number;
    effectivePositionSize: number;
  };
}) => {
  return (
    <Output>
      <div className="flex flex-row">
        <div className="flex-1">
          <p className="text-sm font-bold">stop loss:</p>
          <p>{percentage.format(output.stopLossPercentage)}</p>
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold">margin:</p>
          <p>{usd.format(output.actualPositionSize)}</p>
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold">position size:</p>
          <p>{usd.format(output.effectivePositionSize)}</p>
        </div>
      </div>
    </Output>
  );
};
