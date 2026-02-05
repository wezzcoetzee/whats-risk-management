import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-border/30 bg-card/30 backdrop-blur-sm">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--profit-green)]/30 to-transparent" />

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-3">
          <div className="relative">
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--profit-green)]" />
            <div className="absolute inset-0 h-1.5 w-1.5 rounded-full bg-[var(--profit-green)] opacity-50 blur-sm" />
          </div>
          <span className="data-mono text-xs text-muted-foreground tracking-wider">
            © {currentYear}{" "}
            <Link
              href="https://wezzcoetzee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-foreground/80 hover:text-[var(--profit-green)] transition-colors"
            >
              wezzcoetzee.com
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
