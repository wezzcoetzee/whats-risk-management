"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus, Info } from "lucide-react";
import { Form, FormField } from "@/components/ui/form";
import CalculatorHeader from "../shared/header";
import FormRow from "../shared/form-row";
import { cardContainerStyles, formContainerStyles } from "@/styles/common";
import Buttons from "../shared/buttons";
import { FormInputNumber } from "../shared/form-number-input";
import {
  defaultFormValues,
  developmentFormValues,
  formFields,
  ProfitCalculatorInput,
  profitCalculatorSchema,
} from "./form";
import CalculationResults from "./result";
import TakeProfitLevel from "./take-profit-level";

export default function ProfitCalculator() {
  const [showInfo, setShowInfo] = useState(false);

  const form = useForm<ProfitCalculatorInput>({
    resolver: zodResolver(profitCalculatorSchema),
    defaultValues:
      process.env.NODE_ENV === "development"
        ? developmentFormValues
        : defaultFormValues,
  });

  const { handleSubmit, reset, watch, setValue } = form;

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
    if (watch("takeProfitLevels").length < 4) {
      const currentTakeProfits = watch("takeProfitLevels");
      setValue("takeProfitLevels", [...currentTakeProfits, 0]);
    }
  };

  const removeTakeProfit = (index: number) => {
    if (watch("takeProfitLevels").length === 1) {
      return;
    }
    const currentTakeProfits = watch("takeProfitLevels");
    const takeProfits = currentTakeProfits.filter((_, i) => i !== index);
    setValue("takeProfitLevels", takeProfits);
  };

  const onSubmit = (data: ProfitCalculatorInput) => {
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
                        | "effectivePositionSize"
                        | "leverage"
                    }
                    render={({ field }) => (
                      <FormInputNumber
                        title={input.title}
                        description={input.description as string}
                        {...field}
                      />
                    )}
                  />
                ))}
              </FormRow>
            ))}
            <div className="flex items-center space-x-2 justify-between">
              <div className="flex flex-row gap-4 justify-center items-center">
                <h2>take profit</h2>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  className="w-[14px] h-[14px] radius-full"
                  onClick={() => setShowInfo(!showInfo)}
                >
                  <Info className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Info className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Display Info take profit</span>
                </Button>
              </div>
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
              {watch("takeProfitLevels").map((_, index) => (
                <TakeProfitLevel
                  key={index}
                  form={form}
                  index={index}
                  showInfo={showInfo}
                  removeTakeProfit={removeTakeProfit}
                />
              ))}
            </div>
            {output && <CalculationResults output={output} />}
            <Buttons onReset={onReset} />
          </form>
        </Form>
      </div>
    </Card>
  );
}
