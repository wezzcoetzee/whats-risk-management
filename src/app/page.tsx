import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold tracking-tight">
          What&apos;s Risk Management?
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px]">
          Learn about risk management in trading and use our tools to calculate your position sizes and potential profits.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/calculator">
              Try Calculator
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
