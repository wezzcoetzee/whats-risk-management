import { percentage, usd } from "@/utils/formatters";
import Output from "../shared/output";

export default function CalculationResults({
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
}) {
  return (
    <Output>
      <div className="flex flex-col">
        <p className="text-xs font-thin">roi</p>
        <p className="text-2xl text-green-800 font-bold">{usd.format(output.profit)}</p>
      </div>
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
}
