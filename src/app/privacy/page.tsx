import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | MyToolsHut",
  description: "Learn how MyToolsHut protects your data and enforces browser-side processing privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Last Updated: September 14, 2026
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 space-y-6 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              1. Overview & Core Philosophy
            </h2>
            <p>
              At MyToolsHut (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we believe privacy is a fundamental human right. Our platform is architected to eliminate unnecessary server-side data collection. We prioritize client-side execution in your browser whenever technically possible.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              2. Browser-Side File Processing
            </h2>
            <p>
              Tools marked as <strong>Client-Side / Local</strong> (including the Image Compressor, Image Resizer, JPG to PNG Converter, PNG to JPG Converter, Word Counter, QR Code Generator, and Password Generator) execute exclusively within your local browser environment via JavaScript and the HTML5 Canvas API.
            </p>
            <p>
              Your uploaded images, photos, passwords, and text strings are never transmitted to our web servers, stored in databases, or logged in any format.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              3. URL Shortener & Link Data
            </h2>
            <p>
              When you use our URL Shortener, we store the original destination URL, generated short code, custom alias (if provided), creation timestamp, and aggregate redirect click counts in our secure database to enable redirection functionality. We do not correlate shortened links with individual personally identifiable information (PII).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              4. Cookies and Local Storage
            </h2>
            <p>
              We use local storage solely to remember your UI theme preferences (Light vs. Dark Mode). We do not employ third-party tracking cookies or sell your browsing history to third-party ad networks.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              5. Contact Us
            </h2>
            <p>
              If you have any questions or concerns regarding our privacy practices, please contact us via our Contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
