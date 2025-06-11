"use client";

import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

interface ProfitResults {
  roi: number;
  riskReward: number;
  potentialLoss: number;
  profits: {
    tp1: number;
    tp2: number;
    tp3: number;
    tp4: number;
  };
}

export function ProfitCalculator() {
  const [tradeType, setTradeType] = useState<"LONG" | "SHORT">("LONG");
  const [entry, setEntry] = useState<string>("");
  const [leverage, setLeverage] = useState<string>("");
  const [stopLoss, setStopLoss] = useState<string>("");
  const [positionSize, setPositionSize] = useState<string>("");
  const [tp1, setTp1] = useState<string>("");
  const [tp2, setTp2] = useState<string>("");
  const [tp3, setTp3] = useState<string>("");
  const [tp4, setTp4] = useState<string>("");
  const [results, setResults] = useState<ProfitResults | null>(null);

  const calculateProfit = () => {
    const entryPrice = parseFloat(entry);
    const leverageValue = parseFloat(leverage);
    const stopLossPrice = parseFloat(stopLoss);
    const positionSizeValue = parseFloat(positionSize);
    const tp1Price = parseFloat(tp1);
    const tp2Price = parseFloat(tp2);
    const tp3Price = parseFloat(tp3);
    const tp4Price = parseFloat(tp4);

    if (isNaN(entryPrice) || isNaN(leverageValue) || isNaN(stopLossPrice) || 
        isNaN(positionSizeValue) || isNaN(tp1Price)) {
      return;
    }

    const priceDifference = tradeType === "LONG" 
      ? stopLossPrice - entryPrice 
      : entryPrice - stopLossPrice;
    
    const potentialLoss = Math.abs((priceDifference / entryPrice) * positionSizeValue * leverageValue);

    const calculateProfitAtPrice = (targetPrice: number) => {
      const priceDiff = tradeType === "LONG" 
        ? targetPrice - entryPrice 
        : entryPrice - targetPrice;
      return (priceDiff / entryPrice) * positionSizeValue * leverageValue;
    };

    const profits = {
      tp1: calculateProfitAtPrice(tp1Price),
      tp2: tp2Price ? calculateProfitAtPrice(tp2Price) : 0,
      tp3: tp3Price ? calculateProfitAtPrice(tp3Price) : 0,
      tp4: tp4Price ? calculateProfitAtPrice(tp4Price) : 0,
    };

    const margin = positionSizeValue / leverageValue;
    const roi = (profits.tp1 / margin) * 100;
    const riskReward = profits.tp1 / potentialLoss;

    setResults({
      roi,
      riskReward,
      potentialLoss,
      profits,
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
            <Label htmlFor="positionSize">Position Size</Label>
            <Input
              id="positionSize"
              type="number"
              value={positionSize}
              onChange={handleInputChange(setPositionSize)}
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tp1">Take Profit 1</Label>
            <Input
              id="tp1"
              type="number"
              value={tp1}
              onChange={handleInputChange(setTp1)}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tp2">Take Profit 2</Label>
            <Input
              id="tp2"
              type="number"
              value={tp2}
              onChange={handleInputChange(setTp2)}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tp3">Take Profit 3</Label>
            <Input
              id="tp3"
              type="number"
              value={tp3}
              onChange={handleInputChange(setTp3)}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tp4">Take Profit 4</Label>
            <Input
              id="tp4"
              type="number"
              value={tp4}
              onChange={handleInputChange(setTp4)}
              placeholder="0.00"
            />
          </div>
        </div>

        <Button onClick={calculateProfit} className="w-full">
          Calculate
        </Button>
      </div>

      {results && (
        <div className="mt-6 p-4 border rounded-lg space-y-4">
          <h3 className="text-lg font-semibold">Results</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">ROI</p>
              <p className="text-lg font-medium">{results.roi.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Risk/Reward</p>
              <p className="text-lg font-medium">{results.riskReward.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Potential Loss</p>
              <p className="text-lg font-medium">${results.potentialLoss.toFixed(2)}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Profits at Take Profit Levels</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm">TP1: ${results.profits.tp1.toFixed(2)}</p>
                {results.profits.tp2 !== 0 && (
                  <p className="text-sm">TP2: ${results.profits.tp2.toFixed(2)}</p>
                )}
              </div>
              <div>
                {results.profits.tp3 !== 0 && (
                  <p className="text-sm">TP3: ${results.profits.tp3.toFixed(2)}</p>
                )}
                {results.profits.tp4 !== 0 && (
                  <p className="text-sm">TP4: ${results.profits.tp4.toFixed(2)}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 