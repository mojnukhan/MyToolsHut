import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mytoolshut.com"),
  title: {
    default: "MyToolsHut — Free Online Tools for Everyone",
    template: "%s | MyToolsHut",
  },
  description:
    "Compress images, convert files, shorten URLs, download YouTube thumbnails, and use developer & SEO utilities — all free and fast.",
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
  ],
  authors: [{ name: "MyToolsHut Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mytoolshut.com",
    siteName: "MyToolsHut",
    title: "MyToolsHut — Free Online Tools for Everyone",
    description:
      "Compress images, convert files, shorten URLs, download YouTube thumbnails and more — all in one place.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyToolsHut — Free Online Tools for Everyone",
    description:
      "Compress images, convert files, shorten URLs, download YouTube thumbnails and more — all in one place.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
