import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { Header } from "./_header/header";
import Script from "next/script";
import { Suspense } from "react";
import Footer from "./_footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "whatsriskmanagement",
  description:
    "calculate your trade position size, stop loss percentage and margin required.",
  openGraph: {
    title: "whatsriskmanagement",
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
            <Header />
            <div className="pt-[90px] pb-[120px] md:pb-[80px]">{children}</div>
            <Footer />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
