"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const TradeCalculatorSchema = z.object({
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

type TradeCalculatorInput = z.infer<typeof TradeCalculatorSchema>;

export default function TradeCalculator() {
  const [formData, setFormData] = useState<Partial<TradeCalculatorInput>>({});
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const parsedData = TradeCalculatorSchema.parse(formData);
      // Perform calculations here
      const riskPerTrade =
        (parsedData.riskAmount / parsedData.entryPrice) * 100;
      setOutput(`Risk per trade: ${riskPerTrade.toFixed(2)}%`);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
    setError(null);
  };

  return (
    <Card className="w-full max-w-sm mx-auto p-4 rounded-lg shadow-lg flex flex-col">
      {/* Top half for inputs */}
      <div className="flex-grow flex flex-col space-y-4">
        <Input
          type="number"
          name="entryPrice"
          value={formData.entryPrice || ""}
          onChange={handleChange}
          placeholder="Entry Price"
          className="w-full"
        />
        <Input
          type="number"
          name="stopLoss"
          value={formData.stopLoss || ""}
          onChange={handleChange}
          placeholder="Stop Loss"
          className="w-full"
        />
        <Input
          type="number"
          name="riskAmount"
          value={formData.riskAmount || ""}
          onChange={handleChange}
          placeholder="Risk Amount"
          className="w-full"
        />
        <Input
          type="number"
          name="leaverageAmount"
          value={formData.leaverageAmount || ""}
          onChange={handleChange}
          placeholder="Leaverage Amount"
          className="w-full"
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" onClick={handleSubmit} className="mt-2">
          Calculate
        </Button>
      </div>

      {/* Bottom half for outputs */}
      <div className="flex-grow bg-gray-100 mt-4 rounded-lg p-2 flex flex-col">
        <h2 className="text-sm font-bold mb-2">Calculation Outputs</h2>
        <div className="flex-grow overflow-y-auto">
          {output && <p>{output}</p>}
        </div>
      </div>
    </Card>
  );
}
