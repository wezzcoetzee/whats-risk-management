import { percentage, usd } from "@/utils/formatters";
import Output from "../shared/output";

export default function CalculationResults({
  output,
}: {
  output: {
    stopLossPercentage: number;
    actualPositionSize: number;
    effectivePositionSize: number;
  };
}) {
  return (
    <Output>
      <div className="flex flex-row">
        <div className="flex-grow">
          <p className="text-sm font-bold">stop loss:</p>
          <p>{percentage.format(output.stopLossPercentage)}</p>
        </div>
        <div className="flex-grow">
          <p className="text-sm font-bold">margin:</p>
          <p>{usd.format(output.actualPositionSize)}</p>
        </div>
        <div className="flex-grow">
          <p className="text-sm font-bold">position size:</p>
          <p>{usd.format(output.effectivePositionSize)}</p>
        </div>
      </div>
    </Output>
  );
}
