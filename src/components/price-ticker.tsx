"use client";

import { useHyperliquidPrices, type CoinPrice } from "@/hooks/use-hyperliquid-prices";
import { RollingNumber } from "./rolling-number";

function formatPrice(price: number): string {
  if (price >= 1000) {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  if (price >= 1) {
    return price.toFixed(2);
  }
  return price.toPrecision(4);
}

function TickerItem({ coin }: { coin: CoinPrice }) {
  const isPositive = coin.change24h >= 0;
  const priceFormatted = `$${formatPrice(coin.price)}`;
  const changeFormatted = `${isPositive ? "+" : ""}${coin.change24h.toFixed(2)}%`;

  return (
    <span className="inline-flex items-center gap-1.5 px-3">
      <span className="text-muted-foreground">{coin.symbol}</span>
      <RollingNumber value={priceFormatted} className="data-mono" />
      <RollingNumber
        value={changeFormatted}
        className={`data-mono ${
          isPositive ? "text-[var(--profit-green)]" : "text-[var(--loss-red)]"
        }`}
      />
    </span>
  );
}

function TickerContent({ coins }: { coins: CoinPrice[] }) {
  return (
    <>
      {coins.map((coin) => (
        <TickerItem key={coin.symbol} coin={coin} />
      ))}
    </>
  );
}

export function PriceTicker() {
  const { coinPrices, isConnected } = useHyperliquidPrices();

  if (!isConnected || coinPrices.length === 0) {
    return null;
  }

  return (
    <div className="hidden md:flex flex-1 mx-4 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        className="flex whitespace-nowrap text-xs items-center ticker-scroll"
        style={{ width: "max-content" }}
      >
        <TickerContent coins={coinPrices} />
        <span className="text-border px-2">|</span>
        <TickerContent coins={coinPrices} />
        <span className="text-border px-2">|</span>
      </div>
    </div>
  );
}
