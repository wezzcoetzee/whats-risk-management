import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import { useState } from "react";

export default function FormInputNumber({
  title,
  description,
  ...props
}: {
  title: string;
  description: string;
}) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <FormItem className="flex-1">
      <div className="mb-[18px]">
        <FormLabel>
          <div className="flex flex-row gap-4 justify-start items-center">
            <span>{title}</span>
            <Button
              variant="outline"
              type="button"
              size="icon"
              className="w-[14px] h-[14px] radius-full"
              onClick={() => setShowInfo(!showInfo)}
            >
              <Info className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Info className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Display Info {title}</span>
            </Button>
          </div>
        </FormLabel>
      </div>

      <FormControl>
        <Input type="number" {...props} />
      </FormControl>
      {showInfo && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}
