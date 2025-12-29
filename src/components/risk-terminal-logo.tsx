import Link from "next/link";

export function RiskTerminalLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* Logo Icon - Stylized Risk Chart */}
      <div className="relative h-9 w-9 flex items-center justify-center">
        {/* Outer border frame */}
        <div className="absolute inset-0 border border-[var(--profit-green)]/40 rounded-sm group-hover:border-[var(--profit-green)]/70 transition-colors">
          {/* Corner accents */}
          <div className="absolute -top-px -left-px h-1.5 w-1.5 border-t border-l border-[var(--profit-green)]" />
          <div className="absolute -top-px -right-px h-1.5 w-1.5 border-t border-r border-[var(--profit-green)]" />
          <div className="absolute -bottom-px -left-px h-1.5 w-1.5 border-b border-l border-[var(--profit-green)]" />
          <div className="absolute -bottom-px -right-px h-1.5 w-1.5 border-b border-r border-[var(--profit-green)]" />
        </div>

        {/* Chart visualization */}
        <svg
          className="relative z-10 h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Risk curve going up */}
          <path
            d="M3 20 L8 14 L12 16 L16 10 L21 4"
            stroke="var(--profit-green)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-80 group-hover:opacity-100 transition-opacity"
          />
          {/* Data points */}
          <circle cx="8" cy="14" r="1.5" fill="var(--data-cyan)" className="opacity-90" />
          <circle cx="12" cy="16" r="1.5" fill="var(--data-cyan)" className="opacity-90" />
          <circle cx="16" cy="10" r="1.5" fill="var(--profit-green)" className="opacity-90" />
          {/* Stop loss line */}
          <line
            x1="2"
            y1="22"
            x2="22"
            y2="22"
            stroke="var(--loss-red)"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            className="opacity-60"
          />
        </svg>

        {/* Pulsing indicator */}
        <div className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-[var(--profit-green)] animate-pulse">
          <div className="absolute inset-0 rounded-full bg-[var(--profit-green)] opacity-50 blur-sm" />
        </div>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-bold tracking-tight uppercase">
            <span className="text-foreground">Risk</span>
            <span className="text-[var(--profit-green)]">Terminal</span>
          </span>
        </div>
        <div className="data-mono text-[9px] text-muted-foreground tracking-widest uppercase -mt-0.5 opacity-70">
          Pro Analytics
        </div>
      </div>
    </Link>
  );
}
