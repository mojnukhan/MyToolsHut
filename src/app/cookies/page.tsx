import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, Settings, ShieldCheck, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | MyToolsHut",
  description:
    "Information regarding cookie usage, Google AdSense advertising cookies, and local storage controls on MyToolsHut.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 mb-3">
            <Cookie className="w-3.5 h-3.5" />
            <span>Cookie & Storage Information</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white">
            Cookie Policy
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
              What Are Cookies and Local Storage?
            </h2>
            <p>
              Cookies are tiny text files stored on your computer or mobile device by websites you visit. Local Storage is a modern web standard enabling websites to store key-value data inside your browser with no expiration date. They allow websites to remember your settings and provide tailored functionality.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                2
              </span>
              Types of Cookies We Use
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40">
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm mb-1">
                  A. Strictly Essential & Functional (First-Party)
                </h3>
                <ul className="list-disc pl-5 text-xs space-y-1">
                  <li>
                    <strong>Theme Preference (Local Storage):</strong> Remembers whether you chose Dark Mode or Light Mode across page visits.
                  </li>
                  <li>
                    <strong>Admin Session Token:</strong> An encrypted HTTP-only session cookie utilized exclusively when administrators authenticate to manage the website.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40">
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm mb-1">
                  B. Advertising & Monetization Cookies (Third-Party)
                </h3>
                <p className="text-xs mb-2">
                  We partner with <strong>Google AdSense</strong> to display non-intrusive advertisements that help fund our free server and development costs.
                </p>
                <ul className="list-disc pl-5 text-xs space-y-1.5">
                  <li>
                    Google and third-party advertising vendors place and read cookies on your browser, or use web beacons to collect information as a result of ad serving on our website.
                  </li>
                  <li>
                    These cookies (including Google DART cookies) allow Google and its partners to serve ads based on your visit to MyToolsHut and/or other websites on the Internet.
                  </li>
                  <li>
                    These cookies do not convey personal details such as your name, email address, physical address, or telephone number.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                3
              </span>
              How to Control and Opt Out of Cookies
            </h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences in multiple ways:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Google Ads Personalization:</strong> You can manage or turn off personalized advertising by visiting{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 font-semibold underline inline-flex items-center gap-1"
                >
                  Google Ad Settings <ExternalLink className="w-3 h-3" />
                </a>
                .
              </li>
              <li>
                <strong>Industry-Wide Opt-Out:</strong> Visit{" "}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 font-semibold underline inline-flex items-center gap-1"
                >
                  Digital Advertising Alliance (DAA) <ExternalLink className="w-3 h-3" />
                </a>{" "}
                or the{" "}
                <a
                  href="https://optout.networkadvertising.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 font-semibold underline inline-flex items-center gap-1"
                >
                  Network Advertising Initiative (NAI) <ExternalLink className="w-3 h-3" />
                </a>
                .
              </li>
              <li>
                <strong>Browser Settings:</strong> You can configure your browser to block or delete cookies:
                <ul className="list-circle pl-5 mt-1 space-y-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Third-party cookies</li>
                  <li><strong>Firefox:</strong> Settings → Privacy & Security → Enhanced Tracking Protection</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Block all cookies</li>
                  <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
                </ul>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                4
              </span>
              Updates to this Cookie Policy
            </h2>
            <p>
              We may update this Cookie Policy periodically to reflect changes in our operational, legal, or regulatory requirements. Any updates will be posted directly to this page with an updated &quot;Last Updated&quot; revision timestamp.
            </p>
            <p>
              For further inquiries regarding our cookie use, please refer to our{" "}
              <Link href="/privacy" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
                Privacy Policy
              </Link>{" "}
              or contact us via our{" "}
              <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
                Contact Page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

