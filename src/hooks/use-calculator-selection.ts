"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Calculator, Shield, Target } from "lucide-react";

type CalculatorType = "profit" | "position";

const STORAGE_KEY = "selected-calculator";
const DEFAULT_CALCULATOR: CalculatorType = "profit";

export function useCalculatorSelection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [calculatorType, setCalculatorTypeState] =
    useState<CalculatorType>(DEFAULT_CALCULATOR);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize calculator selection from URL or localStorage
  useEffect(() => {
    const urlCalculator = searchParams.get("type") as CalculatorType;

    if (
      urlCalculator &&
      (urlCalculator === "profit" || urlCalculator === "position")
    ) {
      // URL parameter takes priority
      setCalculatorTypeState(urlCalculator);
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, urlCalculator);
    } else {
      // Check localStorage for last used calculator
      try {
        const saved = localStorage.getItem(STORAGE_KEY) as CalculatorType;
        if (saved && (saved === "profit" || saved === "position")) {
          setCalculatorTypeState(saved);
          // Update URL to reflect the loaded calculator
          const params = new URLSearchParams(searchParams.toString());
          params.set("type", saved);
          router.replace(`/calculator?${params.toString()}`, { scroll: false });
        } else {
          // Use default and update URL
          const params = new URLSearchParams(searchParams.toString());
          params.set("type", DEFAULT_CALCULATOR);
          router.replace(`/calculator?${params.toString()}`, { scroll: false });
        }
      } catch (error) {
        // localStorage not available or error, use default
        console.warn("localStorage not available:", error);
        setCalculatorTypeState(DEFAULT_CALCULATOR);
        const params = new URLSearchParams(searchParams.toString());
        params.set("type", DEFAULT_CALCULATOR);
        router.replace(`/calculator?${params.toString()}`, { scroll: false });
      }
    }

    setIsInitialized(true);
  }, [searchParams, router]);

  // Update calculator type with URL and localStorage sync
  const setCalculatorType = useCallback(
    (newType: CalculatorType) => {
      setCalculatorTypeState(newType);

      // Update URL
      const params = new URLSearchParams(searchParams.toString());
      params.set("type", newType);
      router.push(`/calculator?${params.toString()}`, { scroll: false });

      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, newType);
      } catch (error) {
        console.warn("Failed to save to localStorage:", error);
      }
    },
    [searchParams, router]
  );

  return {
    calculatorType,
    setCalculatorType,
    isInitialized,
  };
}

// Helper function to get calculator metadata
export function getCalculatorMetadata(type: CalculatorType) {
  switch (type) {
    case "profit":
      return {
        icon: Target,
        title: "Profit Calculator",
        description:
          "Analyze potential profits and risk/reward ratios across multiple take profit levels.",
        color: "text-green-600",
      };
    case "position":
      return {
        icon: Shield,
        title: "Position Size Calculator",
        description:
          "Calculate optimal position size based on your risk tolerance and stop loss levels.",
        color: "text-blue-600",
      };
    default:
      return {
        icon: Calculator,
        title: "Calculator",
        description: "Trading calculator",
        color: "text-primary",
      };
  }
}
