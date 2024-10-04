import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forwardRef } from "react";

interface CalculatorHeaderProps {
  title: string;
}

const FormInputNumber = forwardRef<HTMLInputElement, CalculatorHeaderProps>(
  ({ title, ...props }, ref) => {
    return (
      <FormItem className="flex-1">
        <FormLabel>{title}</FormLabel>
        <FormControl>
          <Input type="number" {...props} ref={ref} />
        </FormControl>
      </FormItem>
    );
  }
);
FormInputNumber.displayName = "FormInputNumber";

export { FormInputNumber };
