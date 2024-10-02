"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import CalculatorHeader from "../shared/header";
import { cardContainerStyles, formContainerStyles } from "@/styles/common";
import FormRow from "../shared/form-row";
import Buttons from "../shared/buttons";
import { FormInputNumber } from "../shared/form-number-input";
import {
  defaultFormValues,
  developmentFormValues,
  PositionCalculatorInput,
  positionCalculatorSchema,
} from "./form";
import CalculationResults from "./result";

export default function PositionCalculator() {
  const form = useForm<PositionCalculatorInput>({
    resolver: zodResolver(positionCalculatorSchema),
    defaultValues:
      process.env.NODE_ENV === "development"
        ? developmentFormValues
        : defaultFormValues,
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

    const effectivePositionSize = riskAmount / stopLossPercentage;
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
                name="riskAmount"
                render={({ field }) => (
                  <FormInputNumber
                    title="risk amount"
                    description="the amount you are willing to lose on this trade."
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
            {output && <CalculationResults output={output} />}
            <Buttons onReset={onReset} />
          </form>
        </Form>
      </div>
    </Card>
  );
}
