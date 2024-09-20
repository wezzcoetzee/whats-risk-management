import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { Header } from "./_header/header";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "positions",
  description:
    "calculate your trade position size, stop loss percentage and margin required.",
  openGraph: {
    title: "positions",
    description:
      "calculate your trade position size, stop loss percentage and margin required.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
          <Header />
          <div className="pt-24">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
