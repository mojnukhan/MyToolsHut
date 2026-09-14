import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | ToolNest",
  description: "Terms and conditions governing the use of ToolNest online utilities and services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Last Updated: September 14, 2026
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 space-y-6 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and utilizing ToolNest (&quot;ToolNest&quot;, &quot;the Service&quot;), you agree to be bound by these Terms of Service. If you disagree with any portion of these terms, you must discontinue using our services immediately.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              2. Acceptable Use Policy
            </h2>
            <p>
              You agree not to use ToolNest for any unlawful or prohibited purpose. Specifically, with respect to our URL Shortener and developer utilities, you may not:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Shorten URLs pointing to malware, phishing sites, or fraudulent services.</li>
              <li>Attempt to overload, flood, or launch denial-of-service attacks against our infrastructure.</li>
              <li>Circumvent rate limiting or authentication mechanisms.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              3. Disclaimer of Warranties
            </h2>
            <p>
              All tools and utilities on ToolNest are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, whether express or implied. ToolNest does not warrant that files processed will meet your exact requirements or that the service will be uninterrupted or error-free.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              4. Termination
            </h2>
            <p>
              ToolNest reserves the right to disable any shortened URL or restrict access to any IP address found to be in violation of these terms without prior notice.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
