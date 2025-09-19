import Link from "next/link";
import { ChevronDown, Calculator, Shield, Target } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Risk Management
          </Link>
          <div className="flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 hover:text-gray-600 transition-colors">
                <Calculator className="h-4 w-4" />
                Calculators
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuItem asChild>
                  <Link href="/calculator?type=position" className="flex items-center gap-3 w-full">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <div>
                      <div className="font-medium">Position Size Calculator</div>
                      <div className="text-sm text-muted-foreground">Calculate optimal position size</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/calculator?type=profit" className="flex items-center gap-3 w-full">
                    <Target className="h-4 w-4 text-green-600" />
                    <div>
                      <div className="font-medium">Profit Calculator</div>
                      <div className="text-sm text-muted-foreground">Analyze potential profits</div>
                    </div>
                  </Link>
                </DropdownMenuItem>          
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
} 