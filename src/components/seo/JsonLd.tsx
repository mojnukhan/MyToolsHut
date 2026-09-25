import React from "react";
import { ToolDefinition, CATEGORIES } from "@/lib/tools/registry";
import { getSiteUrl } from "@/lib/utils";

export function ToolJsonLd({ tool }: { tool: ToolDefinition }) {
  const baseUrl = getSiteUrl();
  const category = CATEGORIES[tool.category];

  // 1. SoftwareApplication Schema
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    operatingSystem: "All",
    applicationCategory: "WebApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: tool.description,
    url: `${baseUrl}/tools/${tool.slug}`,
  };

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: `${baseUrl}/tools/category/${tool.category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: `${baseUrl}/tools/${tool.slug}`,
      },
    ],
  };

  // 3. FAQPage Schema ONLY if real visible FAQs exist
  const faqSchema =
    tool.faqs && tool.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: tool.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}

export function WebsiteJsonLd() {
  const baseUrl = getSiteUrl();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MyToolsHut",
    alternateName: ["My Tools Hut", "MyToolsHut Online Utilities"],
    url: baseUrl,
    description:
      "Compress images, convert files, shorten URLs, download YouTube thumbnails, and use developer & SEO utilities — all free, fast, and browser-processed.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/tools?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MyToolsHut",
    url: baseUrl,
    logo: `${baseUrl}/icon.png`,
    description:
      "Modern online utilities platform engineered for privacy, speed, and 100% free accessibility.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "support@mytoolshut.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}

