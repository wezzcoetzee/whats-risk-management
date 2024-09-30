import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface CalculatorHeaderProps {
  header: string;
  subheader: string;
  showInfo: boolean;
  setShowInfo: (show: boolean) => void;
}

export default function CalculatorHeader({
  header,
  subheader,
  setShowInfo,
  showInfo,
}: CalculatorHeaderProps) {
  return (
    <div className="flex flex-row mb-4">
      <div className="flex-1">
        <h1 className="text-2xl font-bold pb-3">{header}</h1>
        <p className="text-sm">{subheader}</p>
      </div>
      {/* <div className="flex justify-end align-top">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowInfo(!showInfo)}
        >
          <Info className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Info className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Display Info</span>
        </Button>
      </div> */}
    </div>
  );
}
