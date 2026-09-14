import React from "react";
import Link from "next/link";
import { Wrench, Shield, Zap, Heart, CheckCircle2, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About MyToolsHut — Free Online Tools for Everyone",
  description:
    "Learn about MyToolsHut's mission to provide fast, private, accessible, and 100% free online tools for creators, developers, and everyday users.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
            <Wrench className="w-6 h-6 -rotate-12" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white">
            About MyToolsHut
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Free online tools for everyone. Simple, lightning-fast, and engineered with an uncompromising respect for user privacy.
          </p>
        </div>

        {/* Mission Content */}
        <div className="prose dark:prose-invert max-w-none space-y-6 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-600" />
              Our Mission
            </h2>
            <p>
              The internet is saturated with utility websites weighed down by intrusive ads, deceptive download links, forced account registrations, and slow server queues. MyToolsHut was founded with a singular purpose: to deliver clean, modern, and reliable utilities that simply work — instantly and for free.
            </p>
            <p>
              Whether you need to compress a photograph for an application, resize a graphic for social media, shorten an ugly URL, or format a messy JSON document, MyToolsHut provides accessible tools designed for both professionals and beginners.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              Our Privacy Philosophy
            </h2>
            <p>
              We believe your personal documents, photos, and texts belong exclusively to you. Whenever technically feasible, our tools process your data <strong>100% inside your web browser</strong> using modern HTML5 Canvas, Web Crypto, and JavaScript APIs.
            </p>
            <p>
              When using our browser-based tools, your files never leave your device, never touch our servers, and cannot be intercepted or stored by third parties.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Future Roadmap
            </h2>
            <ul className="space-y-2 list-none p-0">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Expansion into browser-based PDF manipulation (merging, splitting, compressing)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Additional developer formatters (YAML, XML, SQL, Markdown)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Multi-language localization (including Bengali language support)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-colors"
          >
            <span>Explore All Free Tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
