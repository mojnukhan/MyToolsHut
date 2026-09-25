import type { Metadata } from "next";
import { getToolBySlug, ToolDefinition } from "@/lib/tools/registry";
import { getSiteUrl } from "@/lib/utils";

export function generateToolMetadata(slug: string): Metadata {
  const tool = getToolBySlug(slug);
  const baseUrl = getSiteUrl();

  if (!tool) {
    return {
      title: "Tool Not Found | MyToolsHut",
      description: "The requested free online tool could not be found.",
    };
  }

  const title = tool.seoTitle || `${tool.name} — Free Online Tool | MyToolsHut`;
  const description =
    tool.seoDescription ||
    `${tool.description} Free, fast, and secure online utility by MyToolsHut.`;
  const url = `${baseUrl}/tools/${tool.slug}`;

  return {
    title,
    description,
    keywords: tool.keywords || [],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "MyToolsHut",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateToolsCatalogMetadata(): Metadata {
  const baseUrl = getSiteUrl();
  const title = "All Free Online Tools Catalog — 100% Free Utilities | MyToolsHut";
  const description =
    "Explore our complete directory of free online tools. Compress images, resize graphics, convert formats, shorten URLs, download YouTube thumbnails, and use developer tools.";
  const url = `${baseUrl}/tools`;

  return {
    title,
    description,
    keywords: [
      "free online tools",
      "web utilities",
      "image compression",
      "url shortener",
      "youtube thumbnail downloader",
      "developer tools",
      "online calculators",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "MyToolsHut",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
