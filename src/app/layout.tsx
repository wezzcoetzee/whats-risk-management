import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://whatsriskmanagement.com'),
  title: {
    default: "Risk Terminal - Professional Trading Risk Management Calculators",
    template: "%s | Risk Terminal"
  },
  description: "Professional-grade trading risk management calculators for position sizing and profit analysis. Calculate optimal positions, analyze P&L, manage capital with institutional-level precision. Free trading tools.",
  keywords: [
    "trading risk management",
    "position size calculator",
    "profit calculator",
    "trading calculator",
    "risk management tools",
    "position sizing",
    "trading risk calculator",
    "leverage calculator",
    "stop loss calculator",
    "take profit calculator",
    "ROI calculator",
    "risk reward ratio",
    "trading tools",
    "forex calculator",
    "crypto trading calculator",
    "stock trading calculator",
    "margin calculator",
    "professional trading tools"
  ],
  authors: [{ name: "Risk Terminal" }],
  creator: "Risk Terminal",
  publisher: "Risk Terminal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://whatsriskmanagement.com',
    siteName: 'Risk Terminal',
    title: 'Risk Terminal - Professional Trading Risk Management Calculators',
    description: 'Professional-grade trading risk management calculators for position sizing and profit analysis. Calculate optimal positions, analyze P&L, manage capital with institutional-level precision.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Risk Terminal - Professional Trading Risk Management Calculators',
    description: 'Professional-grade trading risk management calculators for position sizing and profit analysis. Free trading tools for institutional-level precision.',
    creator: '@riskterminal',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  category: 'finance',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Risk Terminal',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased min-h-screen flex flex-col`}>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=G-QJLE0NXT2D`}
        />
        <Script strategy="lazyOnload" id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
     
              gtag('config', 'G-QJLE0NXT2D');
            `}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
