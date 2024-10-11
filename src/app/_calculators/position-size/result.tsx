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
      <div className="flex flex-row gap-5">
        <div className="flex-1 flex flex-col">
          <p className="text-sm font-thin">position size</p>
          <p className="text-2xl font-bold">
            {usd.format(output.effectivePositionSize)}
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-2 sm:flex-row">
          <div className="flex-grow flex flex-col">
            <p className="text-sm font-thin">potential loss</p>
            <p>{percentage.format(output.stopLossPercentage)}</p>
          </div>
          <div className="flex-grow flex flex-col">
            <p className="text-sm font-thin">margin</p>
            <p>{usd.format(output.actualPositionSize)}</p>
          </div>
        </div>
      </div>
    </Output>
  );
}
