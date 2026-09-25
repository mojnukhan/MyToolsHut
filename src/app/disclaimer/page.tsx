import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ShieldCheck, DollarSign, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer | MyToolsHut",
  description:
    "MyToolsHut legal disclaimer regarding third-party services, Google AdSense advertisements, and tool calculation accuracy.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60 mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Legal Disclaimers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white">
            Disclaimer
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Last Updated: September 25, 2026
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-10 space-y-8 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed shadow-sm">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                1
              </span>
              Advertising & Sponsorship Disclosure (FTC & AdSense)
            </h2>
            <p>
              MyToolsHut is a free-to-use utility platform funded through online advertising. We display advertisements served by <strong>Google AdSense</strong> and other verified programmatic ad exchanges.
            </p>
            <p>
              These third-party ad networks automatically select and display ads based on algorithmic auction models. MyToolsHut does not explicitly endorse, guarantee, or sponsor the individual products, goods, or claims made by commercial advertisers whose banners appear on our website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                2
              </span>
              Third-Party Trademarks & YouTube Fair Use
            </h2>
            <p>
              All product names, logos, brands, trademarks, and registered trademarks mentioned on this website (such as YouTube, Google, Instagram, Facebook, TikTok, and Twitter/X) are the property of their respective owners. Their mention on MyToolsHut is strictly for descriptive identification purposes only and does not imply any affiliation, sponsorship, or endorsement.
            </p>
            <p>
              Specifically, our <strong>YouTube Thumbnail Downloader</strong> queries YouTube&apos;s public content delivery networks (CDN) to retrieve publicly viewable cover graphics for videos that creators have shared publicly on the Internet. MyToolsHut does not download, convert, extract, or distribute proprietary video or audio streams.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                3
              </span>
              Accuracy of Tool Calculations & Results
            </h2>
            <p>
              While all conversion algorithms, compression routines, word counting engines, and cryptographic routines have been programmed in accordance with recognized mathematical and computational standards, MyToolsHut makes no warranty that the tools will be completely bug-free or suitable for mission-critical, legal, medical, or financial decision-making.
            </p>
            <p>
              Users are encouraged to verify important calculations or results independently before relying on them for critical commercial applications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                4
              </span>
              External Links Disclaimer
            </h2>
            <p>
              MyToolsHut may contain links to external third-party websites (especially via shortened links created by users). We have no control over the content, privacy practices, or availability of those external destinations and assume no responsibility for them.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

