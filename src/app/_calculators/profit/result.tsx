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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <p className="text-sm font-thin">potential roi</p>
          <p className="text-2xl font-bold">{usd.format(output.profit)}</p>
        </div>
        <div>
          <p className="text-sm font-thin">risk/reward</p>
          <p className="text-2xl font-bold">{output.tradeR.toFixed(2)} R</p>
        </div>

        <div>
          <p className="text-sm font-thin">potential loss</p>
          <p>
            {usd.format(output.riskAmount)} (
            {percentage.format(output.stopLossPercentage)})
          </p>
        </div>
        <div>
          <p className="text-sm font-thin">margin:</p>
          <p>{usd.format(output.margin)}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-md">
          profit at each take profit level (
          {percentage.format(output.percentageOfHoldingsSoldAtEachTakeProfit)}
          ):
        </p>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {output.profitAtEachTakeProfitLevel.map((profit, index) => (
            <li key={index}>
              <p className="text-sm font-thin">{`profit @ tp${index + 1}:`}</p>
              <p>{usd.format(profit)}</p>
            </li>
          ))}
        </ul>
      </div>
    </Output>
  );
}
