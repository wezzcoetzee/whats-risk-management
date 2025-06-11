"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfitCalculator } from "@/components/calculators/profit-calculator";
import { PositionSizeCalculator } from "@/components/calculators/position-size-calculator";

export default function CalculatorPage() {
  const [calculatorType, setCalculatorType] = useState<string>("profit");

  return (
    <div className="container mx-auto py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-8">Risk Management Calculator</h1>
      
      <div className="mb-6">
        <Select
          value={calculatorType}
          onValueChange={setCalculatorType}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select calculator type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="profit">Profit Calculator</SelectItem>
            <SelectItem value="position">Position Size Calculator</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {calculatorType === "profit" ? "Profit Calculator" : "Position Size Calculator"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {calculatorType === "profit" ? (
            <ProfitCalculator />
          ) : (
            <PositionSizeCalculator />
          )}
        </CardContent>
      </Card>
    </div>
  );
} 