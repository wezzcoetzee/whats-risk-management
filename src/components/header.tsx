import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Risk Management
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-gray-600 transition-colors">
              Home
            </Link>
            <Link href="/calculator" className="hover:text-gray-600 transition-colors">
              Calculators
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
} 