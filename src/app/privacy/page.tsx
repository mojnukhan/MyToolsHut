import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | MyToolsHut",
  description:
    "Learn how MyToolsHut protects your data, enforces browser-side processing privacy, and complies with Google AdSense, GDPR, and CCPA standards.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Transparency & Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Last Updated: September 25, 2026 • Effective Date: September 25, 2026
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-10 space-y-8 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed shadow-sm">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                1
              </span>
              Overview & Core Philosophy
            </h2>
            <p>
              At MyToolsHut (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we believe that online privacy is a fundamental human right. Our platform is purposefully architected to eliminate unnecessary server-side data collection. We prioritize client-side execution in your browser whenever technically possible.
            </p>
            <p>
              This Privacy Policy explains how information is handled when you visit our website (<strong>mytoolshut.com</strong>), use our online tools, and interact with our advertisements.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                2
              </span>
              Browser-Side File Processing (100% Client-Side)
            </h2>
            <p>
              Tools labeled as <strong>Client-Side / Local</strong> (including the Image Compressor, Image Resizer, JPG to PNG Converter, PNG to JPG Converter, Word Counter, QR Code Generator, Base64 Converter, JSON Formatter, and Password Generator) execute exclusively within your local browser environment using JavaScript and HTML5 Canvas APIs.
            </p>
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Zero File Uploads
              </div>
              <p>
                Your photos, graphics, text documents, passwords, and code never leave your device, are never transmitted across our network, are never stored on our servers, and cannot be viewed by our team or third parties.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                3
              </span>
              Google AdSense & Third-Party Advertising Policy
            </h2>
            <p>
              To keep our tools 100% free for everyone without subscription paywalls, we display advertisements provided by <strong>Google AdSense</strong> and other verified advertising networks.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Third-Party Vendors & Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites across the Internet.
              </li>
              <li>
                <strong>Google DART Cookie:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve personalized advertisements to our users based on their visit to MyToolsHut and/or other websites on the Internet.
              </li>
              <li>
                <strong>Opting Out of Personalized Advertising:</strong> Users may opt out of personalized advertising at any time by visiting{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 underline font-medium"
                >
                  Google Ads Settings
                </a>
                . Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{" "}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 underline font-medium"
                >
                  aboutads.info
                </a>{" "}
                or the{" "}
                <a
                  href="https://optout.networkadvertising.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 underline font-medium"
                >
                  Network Advertising Initiative (NAI) Opt-Out Page
                </a>
                .
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                4
              </span>
              Cookies & Local Storage Usage
            </h2>
            <p>
              We maintain a minimal cookie footprint. Our first-party cookies and local storage items are strictly functional:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Theme Preferences:</strong> Local storage key <code>theme</code> stores whether you prefer Dark Mode or Light Mode.
              </li>
              <li>
                <strong>Admin Security:</strong> An HTTP-only secure cookie is used exclusively when authenticated administrators log into the administrative management console.
              </li>
            </ul>
            <p>
              For complete details, please read our dedicated{" "}
              <Link href="/cookies" className="text-indigo-600 dark:text-indigo-400 underline font-medium">
                Cookie Policy
              </Link>
              .
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                5
              </span>
              URL Shortener & Server-Side Data
            </h2>
            <p>
              When utilizing our URL Shortener tool, we store the original destination URL, generated short code, custom alias, creation timestamp, and aggregate redirect counts in our secure database to enable redirection functionality. We do not correlate shortened links with personally identifiable information (PII) or user identities.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                6
              </span>
              GDPR & European Privacy Rights (EEA & UK)
            </h2>
            <p>
              If you reside in the European Economic Area (EEA) or the United Kingdom, you have guaranteed rights under the General Data Protection Regulation (GDPR):
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>The right to access, update, or delete information we possess about you.</li>
              <li>The right of rectification (correcting inaccurate data).</li>
              <li>The right to object to or restrict processing of your personal data.</li>
              <li>The right to data portability.</li>
              <li>The right to withdraw consent at any time without affecting lawful prior processing.</li>
            </ul>
            <p>
              To exercise any GDPR rights, contact our Data Protection representative at{" "}
              <a href="mailto:privacy@mytoolshut.com" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
                privacy@mytoolshut.com
              </a>
              .
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                7
              </span>
              California Consumer Privacy Act (CCPA / CPRA)
            </h2>
            <p>
              Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California residents have specific statutory rights:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>The right to know what categories of personal data we collect, use, and share.</li>
              <li>The right to request the deletion of your personal data.</li>
              <li>The right to non-discrimination for exercising your privacy rights.</li>
              <li>
                <strong>Notice of No Sale:</strong> MyToolsHut does not sell your personal information or personal data to data brokers or third parties for monetary compensation.
              </li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                8
              </span>
              Children&apos;s Privacy (COPPA Compliance)
            </h2>
            <p>
              Protecting the privacy of young children is especially important. MyToolsHut is a general audience utility and is not directed to children under 13 years of age. We do not knowingly collect or solicit personal information from anyone under the age of 13. If we discover we have inadvertently received personal data from a minor under 13, we delete such information immediately.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                9
              </span>
              Contact Information
            </h2>
            <p>
              If you have any questions, feedback, or concerns regarding this Privacy Policy or our compliance with Google AdSense, GDPR, or CCPA, please contact us:
            </p>
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 text-xs space-y-1">
              <div><strong>Website:</strong> MyToolsHut (mytoolshut.com)</div>
              <div><strong>Email:</strong> <a href="mailto:privacy@mytoolshut.com" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">privacy@mytoolshut.com</a></div>
              <div><strong>Support Desk:</strong> <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">Contact Us Page</Link></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

