import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | MyToolsHut",
  description: "MyToolsHut legal disclaimer regarding third-party services and tool accuracy.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
            Disclaimer
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Last Updated: September 14, 2026
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 space-y-6 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              1. Third-Party Trademarks & YouTube
            </h2>
            <p>
              MyToolsHut is an independent online tools platform and is not affiliated, associated, authorized, endorsed by, or in any way officially connected with YouTube, Google LLC, Meta Platforms, Instagram, Twitter/X, or any of their subsidiaries or affiliates.
            </p>
            <p>
              The YouTube Thumbnail Downloader tool retrieves only publicly accessible cover images that are openly distributed by YouTube. MyToolsHut does not host, download, convert, or distribute copyrighted video or audio streams.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              2. Accuracy of Calculations
            </h2>
            <p>
              While all unit conversions, word counts, and cryptographic routines have been programmed in accordance with recognized mathematical and computational standards, MyToolsHut makes no guarantee of absolute fitness for mission-critical, legal, medical, or financial purposes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
