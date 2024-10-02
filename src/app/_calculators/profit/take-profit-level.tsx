import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ProfitCalculatorInput } from "./form";
import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function TakeProfitLevel({
  form,
  index,
  showInfo,
  removeTakeProfit,
}: {
  form: UseFormReturn<ProfitCalculatorInput>;
  index: number;
  showInfo: boolean;
  removeTakeProfit: (index: number) => void;
}) {
  return (
    <FormField
      control={form.control}
      name={`takeProfitLevels.${index}`}
      render={({ field }) => (
        <div className="flex flex-col gap-4">
          <FormItem>
            <FormLabel>{`take profit ${index + 1}`}</FormLabel>
            <div className="flex flex-row gap-4">
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={() => removeTakeProfit(index)}
              >
                <Minus className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Minus className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">remove take profit</span>
              </Button>
            </div>
            <FormMessage />
          </FormItem>
          {showInfo && (
            <div className="flex-1">
              <FormDescription>
                the amount of profit you will make at this level.
              </FormDescription>
            </div>
          )}
        </div>
      )}
    />
  );
}
