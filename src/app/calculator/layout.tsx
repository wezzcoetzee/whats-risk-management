import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trading Calculators - Position Size & Profit Analysis",
  description: "Professional trading calculators for position sizing and profit analysis. Calculate optimal position size based on risk tolerance, analyze P&L across multiple take-profit levels, calculate ROI and risk/reward ratios. Free trading risk management tools.",
  keywords: [
    "position size calculator",
    "profit calculator",
    "trading calculator",
    "risk calculator",
    "leverage calculator",
    "margin calculator",
    "stop loss calculator",
    "take profit calculator",
    "risk reward calculator",
    "ROI calculator",
    "trading position size",
    "forex position calculator",
    "crypto position calculator",
    "profit and loss calculator",
    "P&L calculator"
  ],
  openGraph: {
    title: 'Trading Calculators - Position Size & Profit Analysis | Risk Terminal',
    description: 'Professional trading calculators for position sizing and profit analysis. Calculate optimal positions, analyze P&L, and manage risk with institutional-level precision.',
    url: 'https://whatsriskmanagement.com/calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trading Calculators - Position Size & Profit Analysis',
    description: 'Professional trading calculators for position sizing and profit analysis. Free trading risk management tools.',
  },
  alternates: {
    canonical: 'https://whatsriskmanagement.com/calculator',
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
