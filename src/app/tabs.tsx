"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PositionCalculator from "./position-calculator";
import ProfitCalculator from "./profit-calculator";

export default function TabsContainer() {
  return (
    <Tabs defaultValue="position-size" className="w-100">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="position-size">position size</TabsTrigger>
        <TabsTrigger value="profit">profit</TabsTrigger>
      </TabsList>
      <TabsContent value="position-size">
        <PositionCalculator />
      </TabsContent>
      <TabsContent value="profit">
        <ProfitCalculator />
      </TabsContent>
    </Tabs>
  );
}
