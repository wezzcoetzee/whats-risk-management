"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <>
      {/* Terminal-style background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-red-500 opacity-5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-red-500 opacity-5 blur-3xl" />
      </div>

      <main className="flex flex-1 flex-col items-center justify-center p-8 relative z-10">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Error Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded text-xs data-mono text-red-500 tracking-wider">
            <AlertTriangle className="h-3 w-3" />
            SYSTEM_ERROR
          </div>

          {/* 404 Display */}
          <div className="space-y-4">
            <div className="relative">
              <h1 className="text-9xl md:text-[12rem] font-bold data-mono text-red-500/20 select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl md:text-4xl font-bold uppercase tracking-wider bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Not Found
                </span>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist in our trading terminal.
            </p>
            <p className="text-sm text-muted-foreground data-mono">
              ERROR: <span className="text-red-500">ROUTE_NOT_FOUND</span>
            </p>
          </div>

          {/* Terminal Output Style */}
          <div className="bg-card/50 border border-border/50 backdrop-blur-sm p-6 rounded text-left">
            <div className="space-y-2 data-mono text-xs">
              <div className="text-muted-foreground">
                <span className="text-red-500">{'>'}</span> Scanning routes...
              </div>
              <div className="text-muted-foreground">
                <span className="text-red-500">{'>'}</span> Route validation: <span className="text-red-500">FAILED</span>
              </div>
              <div className="text-muted-foreground">
                <span className="text-[var(--profit-green)]">{'>'}</span> Initiating redirect protocol...
              </div>
              <div className="text-muted-foreground">
                <span className="text-[var(--profit-green)]">{'>'}</span> Auto-redirect in: <span className="text-[var(--profit-green)] font-bold">{countdown}s</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/">
              <Button
                size="lg"
                className="gap-2 bg-[var(--profit-green)] hover:bg-[var(--profit-green)]/90 text-black font-bold uppercase tracking-wider"
              >
                <Home className="h-4 w-4" />
                Return to Terminal
              </Button>
            </Link>

            <Link href="/calculator">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-border/50 uppercase tracking-wider"
              >
                Launch Calculator
              </Button>
            </Link>
          </div>

          {/* Debug Info */}
          <div className="pt-8 border-t border-border/30">
            <p className="text-xs data-mono text-muted-foreground">
              STATUS: <span className="text-amber-500">REDIRECT_PENDING</span> |
              TARGET: <span className="text-[var(--data-cyan)]">/</span> |
              TIME: <span className="text-[var(--profit-green)]">{countdown}s</span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
