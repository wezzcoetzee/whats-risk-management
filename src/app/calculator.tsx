"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TradeCalculatorInput>({
    resolver: zodResolver(tradeCalculatorSchema),
  });

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

    const margin = positionSize * leaverageAmount;

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
      <div className="flex-grow flex flex-col space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="units">Entry Price</Label>
            <Input
              id="entryPrice"
              type="number"
              step="any"
              {...register("entryPrice", { valueAsNumber: true })}
            />
            {errors.entryPrice && (
              <p className="text-red-500 text-sm">
                {errors.entryPrice.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="cost">Stop Loss</Label>
            <Input
              id="stopLoss"
              type="number"
              step="any"
              {...register("stopLoss", { valueAsNumber: true })}
            />
            {errors.stopLoss && (
              <p className="text-red-500 text-sm">{errors.stopLoss.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="cost">Risk Amount</Label>
            <Input
              id="riskAmount"
              type="number"
              step="any"
              {...register("riskAmount", { valueAsNumber: true })}
            />
            {errors.riskAmount && (
              <p className="text-red-500 text-sm">
                {errors.riskAmount.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="cost">Leaverage Amount</Label>
            <Input
              id="leaverageAmount"
              type="number"
              step="any"
              {...register("leaverageAmount", { valueAsNumber: true })}
            />
            {errors.leaverageAmount && (
              <p className="text-red-500 text-sm">
                {errors.leaverageAmount.message}
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              className="w-full"
              variant="outline"
              onClick={onReset}
            >
              Reset
            </Button>
            <Button className="w-full" type="submit">
              Calculate
            </Button>
          </div>
        </form>
      </div>

      {/* Bottom half for outputs */}
      {output && (
        <div className="flex-grow  mt-4 rounded-lg p-2 flex flex-col">
          <h2 className="text-sm font-bold mb-2">Calculation Outputs</h2>
          <div className="flex-grow overflow-y-auto">
            <p>Position Size: {output.positionSize}</p>
            <p>Sopt Loss %: {output.stopLossPercentage}</p>
            <p>Margin Required: {output.margin}</p>
          </div>
        </div>
      )}
    </Card>
  );
}
