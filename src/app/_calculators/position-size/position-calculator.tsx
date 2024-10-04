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
  formFields,
} from "./form";
import CalculationResults from "./result";

export default function PositionCalculator() {
  const form = useForm<PositionCalculatorInput>({
    resolver: zodResolver(positionCalculatorSchema),
    defaultValues:
      process.env.NODE_ENV === "test"
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
            {formFields.map((formRow, index) => (
              <FormRow key={index}>
                {formRow.map((input) => (
                  <FormField
                    key={input.name}
                    control={form.control}
                    name={
                      input.name as
                        | "entryPrice"
                        | "stopLoss"
                        | "riskAmount"
                        | "leverage"
                    }
                    render={({ field }) => (
                      <FormInputNumber title={input.title} {...field} />
                    )}
                  />
                ))}
              </FormRow>
            ))}
            {output && <CalculationResults output={output} />}
            <Buttons onReset={onReset} />
          </form>
        </Form>
      </div>
    </Card>
  );
}
