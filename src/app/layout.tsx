import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { Header } from "./_header/header";
import Script from "next/script";
import { Suspense } from "react";
import Footer from "./_footer/footer";
import ThemeSwitcher from "@/app/hooks/theme-switcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "whatsriskmanagement",
  description:
    "calculate your trade position size, stop loss percentage and margin required.",
  manifest: "/manifest.json",
  keywords: ["riskmanagement", "profit", "position", "trading", "crypto"],
  openGraph: {
    title: "whatsriskmanagement",
    description:
      "calculate your trade position size, stop loss percentage annpm run buildd margin required.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={(inter.className, "min-h-screen")}>
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-M18S2XK0BZ"
        />
        <Script strategy="lazyOnload" id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-F68S7CS24G');
        `}
        </Script>
        <Providers>
          <Suspense>
            <ThemeSwitcher />
            <Header />
            <main className="h-screen flex flex-col justify-between items-center">
              <div className="container mt-[90px]">{children}</div>
              <Footer />
            </main>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
