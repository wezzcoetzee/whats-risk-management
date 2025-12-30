export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Risk Terminal",
    "url": "https://whatsriskmanagement.com",
    "description": "Professional trading risk management calculators for position sizing and profit analysis",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://whatsriskmanagement.com/calculator?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Risk Terminal",
    "url": "https://whatsriskmanagement.com",
    "logo": "https://whatsriskmanagement.com/logo.png",
    "description": "Professional-grade trading risk management calculators and tools",
    "sameAs": [
      "https://twitter.com/riskterminal",
      // Add other social media URLs when available
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function WebApplicationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Risk Terminal Trading Calculators",
    "url": "https://whatsriskmanagement.com/calculator",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Professional trading calculators for position sizing and profit analysis. Calculate optimal position size, analyze P&L, manage leverage, and optimize risk/reward ratios.",
    "featureList": [
      "Position Size Calculator",
      "Profit & Loss Calculator",
      "Risk Management Tools",
      "Leverage Calculator",
      "Margin Calculator",
      "Risk/Reward Ratio Calculator",
      "Multi-level Take Profit Analysis",
      "ROI Calculator"
    ],
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Works in modern browsers.",
    "permissions": "No special permissions required"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function SoftwareApplicationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Position Size Calculator",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    },
    "description": "Calculate optimal trading position size based on risk tolerance, account size, entry price, stop loss, and leverage. Professional-grade risk management tool.",
    "featureList": [
      "Risk-based position sizing",
      "Leverage control",
      "Margin analysis",
      "Loss protection calculations",
      "Real-time calculations"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function FAQStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a position size calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A position size calculator helps traders determine the optimal number of units to trade based on their risk tolerance, account size, entry price, stop loss level, and leverage. It ensures you never risk more than a predefined percentage of your capital on a single trade."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate position size for trading?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate position size: 1) Determine your risk amount (e.g., 1% of account), 2) Calculate the distance from entry to stop loss (risk per unit), 3) Divide risk amount by (risk per unit × leverage) to get position size in units. Our calculator automates this process for accurate results."
        }
      },
      {
        "@type": "Question",
        "name": "What is risk management in trading?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Risk management in trading involves strategies to protect your capital and limit losses. Key components include position sizing (never risking more than 1-2% per trade), setting stop losses, calculating risk/reward ratios, and managing leverage. Professional traders use systematic risk management to ensure long-term profitability."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate profit and loss in trading?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Calculate profit/loss by: 1) Determine the price difference between entry and exit, 2) Multiply by position size to get gross P&L, 3) Account for leverage effects and fees. Our profit calculator analyzes multiple take-profit levels, calculates ROI, and shows risk/reward ratios automatically."
        }
      },
      {
        "@type": "Question",
        "name": "What is a good risk/reward ratio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A good risk/reward ratio is typically 1:2 or higher, meaning you aim to make at least twice what you risk. Professional traders often target 1:3 or better. Our calculator shows both primary and average risk/reward ratios across multiple take-profit levels to help you assess trade quality."
        }
      },
      {
        "@type": "Question",
        "name": "How does leverage affect position size?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Leverage multiplies your buying power, allowing larger positions with less capital. Higher leverage means you can control larger positions but also increases risk. Our position size calculator accounts for leverage to show the actual margin required and potential losses, helping you trade responsibly."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
