import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title = "BROKERCORESOLUTION | Expert Forex Broker Solutions", 
  description = "Turnkey Forex Brokerage solutions, trading platforms, licensing, CRM, and digital marketing strategies by BrokerCoreSolution.", 
  keywords = "Forex Broker, Turnkey Solutions, MT5, cTrader, Forex Licensing, Crypto Broker, Trading Platform",
  image = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
  url = "https://brokercoresolution.com",
  type = "website"
}) => {
  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Schema for B2B Financial Services SEO */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://www.brokercoresolution.com/#organization",
                "name": "BrokerCore Solution",
                "url": "https://www.brokercoresolution.com",
                "logo": "https://www.brokercoresolution.com/logo.png",
                "description": "B2B provider of Forex Brokerage Turnkey Solutions, White-Label Trading Platforms, and Tier-1 Liquidity integration.",
                "sameAs": [
                  "https://www.linkedin.com/company/brokercoresolution",
                  "https://twitter.com/brokercoresolution",
                  "https://www.instagram.com/brokercoresolution_official"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+971-55-752-279",
                  "contactType": "sales",
                  "areaServed": "Worldwide"
                }
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://www.brokercoresolution.com/#forexcrm",
                "name": "BrokerCore Forex CRM",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web-based",
                "provider": {
                  "@id": "https://www.brokercoresolution.com/#organization"
                },
                "featureList": [
                  "Multi-tier IB Management",
                  "Automated KYC Verification",
                  "MT4/MT5 Manager API Integration",
                  "Crypto & Fiat Payment Gateways"
                ]
              },
              {
                "@type": "Product",
                "@id": "https://www.brokercoresolution.com/#turnkeysolution",
                "name": "Forex Broker Turnkey Solution",
                "category": "Financial Technology Infrastructure",
                "manufacturer": {
                  "@id": "https://www.brokercoresolution.com/#organization"
                },
                "description": "A comprehensive deployable infrastructure for retail brokers including MT5 White Label, Liquidity Bridge, and Forex CRM."
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is a Forex Brokerage Turnkey Solution?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A Forex Brokerage Turnkey Solution is a complete, pre-configured software and infrastructure package that allows an entity to launch a retail Forex brokerage instantly. BrokerCore Solution provides this by combining a white-label trading platform (MT5 or cTrader), a specialized Forex CRM, Tier-1 liquidity aggregation, and integrated payment gateways into a single deployable ecosystem."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How does a White-Label Forex CRM integrate with MT5?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A White-Label Forex CRM integrates with the MetaTrader 5 (MT5) server via the MT5 Manager API. This connection allows real-time synchronization of client trading accounts, automated deposit and withdrawal processing, multi-tier Introducing Broker (IB) rebate calculations, and KYC/AML compliance tracking directly from the CRM dashboard to the MT5 trading terminal."
                    }
                  }
                ]
              }
            ]
          }
        `}
      </script>
    </Helmet>
  );
};

export default SEOHead;
