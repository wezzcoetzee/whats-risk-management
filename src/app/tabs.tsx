"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PositionCalculator from "./_calculators/position-size/position-calculator";
import ProfitCalculator from "./_calculators/profit/profit-calculator";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function TabsContainer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const param = searchParams.get("type");
  const defaultValue = param === "position-size" ? "position-size" : "profit";

  const updateQuery = (value: string) => {
    const newQuery = new URLSearchParams(window.location.search);
    newQuery.set("type", value);
    const url = `${pathname}?${newQuery.toString()}`;
    router.push(url);
  };

  return (
    <Tabs
      defaultValue={defaultValue}
      onValueChange={(value) => updateQuery(value)}
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
