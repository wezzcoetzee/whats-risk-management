"use client";

import { useAnimatedNumber } from "@/hooks/use-animated-number";

export type ResultColor = "cyan" | "green" | "red" | "amber";

interface ResultCardProps {
  label: string;
  value: number;
  unit: string;
  color: ResultColor;
  formatFn: (value: number) => string;
  showResults: boolean;
  staggerIndex: number;
}

const COLOR_CLASSES: Record<
  ResultColor,
  { border: string; bg: string; text: string; glow: string }
> = {
  cyan: {
    border: "border-[var(--data-cyan)]/30 hover:border-[var(--data-cyan)]/50",
    bg: "bg-[var(--data-cyan)]/5",
    text: "text-[var(--data-cyan)]",
    glow: "value-glow-cyan",
  },
  green: {
    border:
      "border-[var(--profit-green)]/30 hover:border-[var(--profit-green)]/50",
    bg: "bg-[var(--profit-green)]/5",
    text: "text-[var(--profit-green)]",
    glow: "value-glow-green",
  },
  red: {
    border: "border-[var(--loss-red)]/30 hover:border-[var(--loss-red)]/50",
    bg: "bg-[var(--loss-red)]/5",
    text: "text-[var(--loss-red)]",
    glow: "value-glow-red",
  },
  amber: {
    border: "border-amber-500/30 hover:border-amber-500/50",
    bg: "bg-amber-500/5",
    text: "text-amber-500",
    glow: "value-glow-amber",
  },
};

const ACCENT_COLORS: Record<ResultColor, string> = {
  cyan: "bg-[var(--data-cyan)]",
  green: "bg-[var(--profit-green)]",
  red: "bg-[var(--loss-red)]",
  amber: "bg-amber-500",
};

export function ResultCard({
  label,
  value,
  unit,
  color,
  formatFn,
  showResults,
  staggerIndex,
}: ResultCardProps) {
  const animatedValue = useAnimatedNumber(value, 600);
  const styles = COLOR_CLASSES[color];
  const accentColor = ACCENT_COLORS[color];

  return (
    <div
      className={`relative ${styles.border} ${styles.bg} backdrop-blur-sm p-5 rounded card-hover-lift transition-all ${showResults ? `animate-fade-slide-in stagger-${staggerIndex}` : "opacity-0"}`}
    >
      <div className={`absolute top-0 left-0 w-1 h-full ${accentColor}`} />
      <div className="flex items-start justify-between mb-3">
        <span className="data-mono text-[10px] text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        <div className={`h-1 w-1 rounded-full ${accentColor} animate-pulse`} />
      </div>
      <div className="space-y-1">
        <p
          className={`data-mono text-3xl font-bold ${styles.text} ${styles.glow}`}
        >
          {formatFn(animatedValue)}
        </p>
        <p className="data-mono text-xs text-muted-foreground">{unit}</p>
      </div>
    </div>
  );
}
