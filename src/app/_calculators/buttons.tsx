import { Button } from "@/components/ui/button";

interface ButtonsProps {
  onReset: () => void;
}

export default function Buttons({ onReset }: ButtonsProps) {
  return (
    <div className="flex justify-end gap-4">
      <Button
        type="button"
        className="w-full"
        variant="outline"
        onClick={onReset}
      >
        reset
      </Button>
      <Button className="w-full" type="submit">
        calculate
      </Button>
    </div>
  );
}
