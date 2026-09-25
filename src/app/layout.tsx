import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { WebsiteJsonLd } from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();
const adSenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MyToolsHut — Free Online Tools for Everyone",
    template: "%s | MyToolsHut",
  },
  description:
    "Compress images, convert files, shorten URLs, download YouTube thumbnails, and use developer & SEO utilities — all free, private, and fast.",
  keywords: [
    "online tools",
    "free tools",
    "image compressor",
    "image resizer",
    "youtube thumbnail downloader",
    "url shortener",
    "word counter",
    "qr code generator",
    "password generator",
    "developer tools",
    "seo tools",
    "json formatter",
    "unit converter",
  ],
  authors: [{ name: "MyToolsHut Team" }],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "MyToolsHut",
    title: "MyToolsHut — Free Online Tools for Everyone",
    description:
      "Compress images, convert files, shorten URLs, download YouTube thumbnails, and use developer & SEO utilities — all free, private, and fast.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyToolsHut — Free Online Tools for Everyone",
    description:
      "Compress images, convert files, shorten URLs, download YouTube thumbnails, and use developer & SEO utilities — all free, private, and fast.",
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
  other: adSenseClientId
    ? {
        "google-adsense-account": adSenseClientId,
      }
    : {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <WebsiteJsonLd />
        {adSenseClientId && adSenseClientId !== "ca-pub-0000000000000000" && (
          <Script
            id="google-adsense"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased selection:bg-indigo-500 selection:text-white transition-colors duration-150`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </ThemeProvider>

      </body>
    </html>
  );
}

