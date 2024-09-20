"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PositionCalculator from "./_calculators/position-calculator";
import ProfitCalculator from "./_calculators/profit-calculator";
import { useSearchParams } from "next/navigation";

export default function TabsContainer() {
  const searchParams = useSearchParams();
  const param = searchParams.get("type");
  const defaultValue = param === "position-size" ? "position-size" : "profit";

  return (
    <Tabs
      defaultValue={defaultValue}
      className="w-[360px] sm:w-[400px] md:w-[760px]"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="profit">profit</TabsTrigger>
        <TabsTrigger value="position-size">position size</TabsTrigger>
      </TabsList>
      <TabsContent value="profit">
        <ProfitCalculator />
      </TabsContent>
      <TabsContent value="position-size">
        <PositionCalculator />
      </TabsContent>
    </Tabs>
  );
}
