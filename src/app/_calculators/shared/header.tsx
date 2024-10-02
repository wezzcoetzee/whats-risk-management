interface CalculatorHeaderProps {
  header: string;
  subheader: string;
}

export default function CalculatorHeader({
  header,
  subheader,
}: CalculatorHeaderProps) {
  return (
    <div className="flex flex-row mb-4">
      <div className="flex-1">
        <h1 className="text-2xl font-bold pb-3">{header}</h1>
        <p className="text-sm">{subheader}</p>
      </div>
    </div>
  );
}
