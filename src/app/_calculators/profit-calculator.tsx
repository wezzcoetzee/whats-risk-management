"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
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
import FormRow from "./form-row";
import { cardContainerStyles, formContainerStyles } from "@/styles/common";
import Output from "./output";
import Buttons from "./buttons";
import FormInputNumber from "./form-number-input";

const profitCalculatorSchema = z
  .object({
    entryPrice: z.coerce
      .number({
        required_error: "entry price is required",
        invalid_type_error: "entry price must be a number",
      })
      .refine((val) => val > 0, {
        message: "entry price must be greater than 0",
      }),
    stopLoss: z.coerce
      .number({
        required_error: "stop loss is required",
        invalid_type_error: "stop loss must be a number",
      })
      .refine((val) => val > 0, {
        message: "stop loss must be greater than 0",
      }),
    effectivePositionSize: z.coerce
      .number({
        required_error: "position size is required",
        invalid_type_error: "position size must be a number",
      })
      .refine((val) => val > 0, {
        message: "position size must be greater than 0",
      }),
    leverage: z.coerce
      .number({
        required_error: "leverage is required",
        invalid_type_error: "leverage must be a number",
      })
      .refine((val) => val > 0, {
        message: "leverage amount must be greater than 0",
      }),
    takeProfitLevels: z
      .array(
        z.coerce
          .number({
            required_error: "take profit is required",
            invalid_type_error: "take profit must be a number",
          })
          .refine((val) => val > 0, {
            message: "take profit amount must be greater than 0",
          })
      )
      .max(4),
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

const defaultFormValues: ProfitCalculatorInput = {
  entryPrice: 55000,
  stopLoss: 54000,
  effectivePositionSize: 1000,
  leverage: 10,
  takeProfitLevels: [59000, 62000, 69000, 72420],
};

const takeProfitsDefault = () => {
  return defaultFormValues.takeProfitLevels.map((_, index) => index);
};

export default function ProfitCalculator() {
  const [takeProfits, setTakeProfits] = useState<number[]>(
    process.env.NODE_ENV === "development" ? takeProfitsDefault() : [0]
  );
  const [showInfo, setShowInfo] = useState(false);

  const form = useForm<ProfitCalculatorInput>({
    resolver: zodResolver(profitCalculatorSchema),
    defaultValues:
      process.env.NODE_ENV === "development" ? defaultFormValues : {},
  });

  const { handleSubmit, reset } = form;

  const [output, setOutput] = useState<{
    stopLossPercentage: number;
    riskAmount: number;
    profitAtEachTakeProfitLevel: number[];
    margin: number;
    profit: number;
    percentageOfHoldingsSoldAtEachTakeProfit: number;
    tradeR: number;
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

    const tradeR = profit / riskAmount;

    setOutput({
      stopLossPercentage,
      riskAmount,
      profitAtEachTakeProfitLevel,
      margin,
      profit,
      percentageOfHoldingsSoldAtEachTakeProfit,
      tradeR,
    });
  };

  const onReset = () => {
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormRow>
              <FormField
                control={form.control}
                name="entryPrice"
                render={({ field }) => (
                  <FormInputNumber
                    title="entry price"
                    description="the price at which you will enter the trade."
                    {...field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="stopLoss"
                render={({ field }) => (
                  <FormInputNumber
                    title="stop loss"
                    description="the price at which you will exit the trade if the trade goes against you."
                    {...field}
                  />
                )}
              />
            </FormRow>
            <FormRow>
              <FormField
                control={form.control}
                name="effectivePositionSize"
                render={({ field }) => (
                  <FormInputNumber
                    title="position size"
                    description="the amount you are willing to risk/lose on this trade."
                    {...field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="leverage"
                render={({ field }) => (
                  <FormInputNumber
                    title="leaverage amount"
                    description="leverage is the use of borrowed capital or debt to increase the potential return on investment."
                    {...field}
                  />
                )}
              />
            </FormRow>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {takeProfits.map((_, index) => (
                <TakeProfitLevel
                  key={index}
                  form={form}
                  index={index}
                  showInfo={showInfo}
                  removeTakeProfit={removeTakeProfit}
                />
              ))}
            </div>
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
    riskAmount: number;
    profitAtEachTakeProfitLevel: number[];
    margin: number;
    profit: number;
    percentageOfHoldingsSoldAtEachTakeProfit: number;
    tradeR: number;
  };
}) => (
  <Output>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <p className="text-sm font-bold">risk/reward (r):</p>
        <p>{output.tradeR.toFixed(2)}</p>
      </div>
      <div>
        <p className="text-sm font-bold">risk:</p>
        <p>
          {usd.format(output.riskAmount)} (
          {percentage.format(output.stopLossPercentage)})
        </p>
      </div>
      <div>
        <p className="text-sm font-bold">margin:</p>
        <p>{usd.format(output.margin)}</p>
      </div>
      <div>
        <p className="text-sm font-bold">profit:</p>
        <p>{usd.format(output.profit)}</p>
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <p className="text-sm font-bold">
        profit at each take profit level (
        {percentage.format(output.percentageOfHoldingsSoldAtEachTakeProfit)}
        ):
      </p>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {output.profitAtEachTakeProfitLevel.map((profit, index) => (
          <li key={index}>
            <p className="text-sm font-bold">{`Take Profit ${index + 1}:`}</p>
            <p>{usd.format(profit)}</p>
          </li>
        ))}
      </ul>
    </div>
  </Output>
);

const TakeProfitLevel = ({
  form,
  index,
  showInfo,
  removeTakeProfit,
}: {
  form: UseFormReturn<ProfitCalculatorInput>;
  index: number;
  showInfo: boolean;
  removeTakeProfit: (index: number) => void;
}) => (
  <FormField
    control={form.control}
    name={`takeProfitLevels.${index}`}
    render={({ field }) => (
      <div className="flex flex-col gap-4">
        <FormItem>
          <FormLabel>{`take profit ${index + 1}`}</FormLabel>
          <div className="flex flex-row gap-4">
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
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
          <FormMessage />
        </FormItem>
        {showInfo && (
          <div className="flex-1">
            <FormDescription>
              the amount of profit you will make at this level.
            </FormDescription>
          </div>
        )}
      </div>
    )}
  />
);
