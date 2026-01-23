import Link from "next/link";
import { ChevronDown, Calculator, Shield, Target } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { RiskTerminalLogo } from "./risk-terminal-logo";
import { PriceTicker } from "./price-ticker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between md:contents">
            <RiskTerminalLogo />
            <PriceTicker className="hidden md:flex flex-1 mx-4" />
            <div className="flex items-center gap-4 md:gap-6 shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 border border-border/50 bg-card/30 rounded hover:border-[var(--profit-green)]/50 hover:bg-card/50 transition-all data-mono text-xs uppercase tracking-wider">
                  <Calculator className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Calculators</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 border-border/50 bg-card/95 backdrop-blur-sm">
                  <DropdownMenuItem asChild>
                    <Link href="/calculator/position-size" className="flex items-center gap-3 w-full p-3 cursor-pointer group">
                      <div className="h-8 w-8 border border-[var(--data-cyan)]/30 bg-[var(--data-cyan)]/5 flex items-center justify-center group-hover:border-[var(--data-cyan)]/50 transition-colors">
                        <Shield className="h-4 w-4 text-[var(--data-cyan)]" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Position Size Calculator</div>
                        <div className="data-mono text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Risk-Based Sizing</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/calculator/profit" className="flex items-center gap-3 w-full p-3 cursor-pointer group">
                      <div className="h-8 w-8 border border-[var(--profit-green)]/30 bg-[var(--profit-green)]/5 flex items-center justify-center group-hover:border-[var(--profit-green)]/50 transition-colors">
                        <Target className="h-4 w-4 text-[var(--profit-green)]" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Profit Calculator</div>
                        <div className="data-mono text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">P&L Analysis</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ThemeToggle />
            </div>
          </div>
          <PriceTicker className="flex md:hidden" />
        </nav>
      </div>
    </header>
  );
}
