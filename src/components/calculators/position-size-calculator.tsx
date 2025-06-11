"use client";

import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

interface PositionResults {
  positionSize: number;
  potentialLoss: number;
  margin: number;
}

export function PositionSizeCalculator() {
  const [tradeType, setTradeType] = useState<"LONG" | "SHORT">("LONG");
  const [entry, setEntry] = useState<string>("");
  const [leverage, setLeverage] = useState<string>("");
  const [stopLoss, setStopLoss] = useState<string>("");
  const [riskAmount, setRiskAmount] = useState<string>("");
  const [results, setResults] = useState<PositionResults | null>(null);

  const calculatePositionSize = () => {
    const entryPrice = parseFloat(entry);
    const leverageValue = parseFloat(leverage);
    const stopLossPrice = parseFloat(stopLoss);
    const riskAmountValue = parseFloat(riskAmount);

    if (isNaN(entryPrice) || isNaN(leverageValue) || isNaN(stopLossPrice) || isNaN(riskAmountValue)) {
      return;
    }

    const priceDifference = tradeType === "LONG" 
      ? stopLossPrice - entryPrice 
      : entryPrice - stopLossPrice;
    
    const positionSize = Math.abs(riskAmountValue / priceDifference);
    const margin = positionSize / leverageValue;
    const potentialLoss = riskAmountValue;

    setResults({
      positionSize,
      potentialLoss,
      margin,
    });
  };

  const handleInputChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Trade Type</Label>
          <RadioGroup
            value={tradeType}
            onValueChange={(value: "LONG" | "SHORT") => setTradeType(value)}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="LONG" id="long" />
              <Label htmlFor="long">Long</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="SHORT" id="short" />
              <Label htmlFor="short">Short</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="entry">Entry Price</Label>
            <Input
              id="entry"
              type="number"
              value={entry}
              onChange={handleInputChange(setEntry)}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="leverage">Leverage</Label>
            <Input
              id="leverage"
              type="number"
              value={leverage}
              onChange={handleInputChange(setLeverage)}
              placeholder="1x"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stopLoss">Stop Loss</Label>
            <Input
              id="stopLoss"
              type="number"
              value={stopLoss}
              onChange={handleInputChange(setStopLoss)}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="riskAmount">Risk Amount ($)</Label>
            <Input
              id="riskAmount"
              type="number"
              value={riskAmount}
              onChange={handleInputChange(setRiskAmount)}
              placeholder="0.00"
            />
          </div>
        </div>

        <Button onClick={calculatePositionSize} className="w-full">
          Calculate
        </Button>
      </div>

      {results && (
        <div className="mt-6 p-4 border rounded-lg space-y-4">
          <h3 className="text-lg font-semibold">Results</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Position Size</p>
              <p className="text-lg font-medium">{results.positionSize.toFixed(4)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Margin Required</p>
              <p className="text-lg font-medium">${results.margin.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Potential Loss</p>
              <p className="text-lg font-medium">${results.potentialLoss.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 