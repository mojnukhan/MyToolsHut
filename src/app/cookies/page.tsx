import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | ToolNest",
  description: "Information regarding cookie usage and local storage on ToolNest.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
            Cookie Policy
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Last Updated: September 14, 2026
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 space-y-6 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              What Are Cookies?
            </h2>
            <p>
              Cookies and local browser storage are small text files placed on your device by websites that you visit. They are widely used to make websites work efficiently and remember your interface preferences.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              How ToolNest Uses Cookies
            </h2>
            <p>
              ToolNest maintains a minimal cookie footprint. We use cookies and local storage exclusively for:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>UI Preferences:</strong> Storing your preferred color theme (Light vs. Dark Mode) in local storage.</li>
              <li><strong>Admin Session Security:</strong> Storing an authenticated HTTP-only session token when an authorized administrator logs into the admin portal.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              Managing Your Cookies
            </h2>
            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent through your browser settings. However, our website will continue to function normally even with non-essential cookies disabled.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
