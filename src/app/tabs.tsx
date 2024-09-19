"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PositionCalculator from "./_calculators/position-calculator";
import ProfitCalculator from "./_calculators/profit-calculator";

export default function TabsContainer() {
  return (
    <Tabs defaultValue="profit" className="w-[320px] md:w-[400px]">
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
