import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ShieldAlert, Copyright, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | MyToolsHut",
  description:
    "Terms and conditions governing the use of MyToolsHut online utilities, DMCA notice, and service policies.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white">
            Terms of Service
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
              Acceptance of Terms
            </h2>
            <p>
              By accessing and utilizing MyToolsHut (&quot;MyToolsHut&quot;, &quot;the Service&quot;, &quot;we&quot;, &quot;us&quot;), accessible via <strong>mytoolshut.com</strong>, you agree to be legally bound by these Terms of Service, all applicable laws, and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                2
              </span>
              Acceptable Use Policy & Restrictions
            </h2>
            <p>
              You agree to use MyToolsHut solely for lawful purposes. You agree NOT to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Use the URL Shortener to distribute malware, spyware, phishing links, or fraudulent content.</li>
              <li>Attempt to compromise, overload, reverse engineer, or launch denial-of-service (DoS) attacks against our servers.</li>
              <li>Use automated scrapers, bots, or data-extraction tools that violate our rate limits.</li>
              <li>Upload or process materials that promote violence, hate speech, child exploitation, or illegal acts.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                3
              </span>
              Intellectual Property & User Ownership
            </h2>
            <p>
              <strong>Your Content:</strong> You retain complete, unrestricted ownership of all files, images, code, and text you process using MyToolsHut. Because our image, converter, and code utilities execute locally in your browser, we do not claim any copyright, license, or rights to your processed creations.
            </p>
            <p>
              <strong>Our Content:</strong> The design, structure, brand name, logos, and custom source code of MyToolsHut are protected by international copyright, trademark, and intellectual property laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                4
              </span>
              DMCA & Copyright Infringement Takedown Notice
            </h2>
            <p>
              MyToolsHut respects the intellectual property rights of others and strictly complies with the Digital Millennium Copyright Act (DMCA).
            </p>
            <p>
              If you believe that any material or link accessible through MyToolsHut infringes upon your copyright, please submit a written DMCA notice to our designated Copyright Agent at{" "}
              <a href="mailto:dmca@mytoolshut.com" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
                dmca@mytoolshut.com
              </a>{" "}
              including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>A physical or electronic signature of the copyright owner or authorized representative.</li>
              <li>Identification of the copyrighted work claimed to have been infringed.</li>
              <li>Identification of the infringing material and URL on MyToolsHut to be removed.</li>
              <li>Your contact information (name, address, telephone number, and email).</li>
              <li>A good-faith statement that the use is not authorized by the copyright owner.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                5
              </span>
              Advertisements & Third-Party Services
            </h2>
            <p>
              MyToolsHut displays third-party advertisements via <strong>Google AdSense</strong>. We do not endorse or control the products, services, or claims displayed in third-party advertisements. Clicking on an advertisement directs you to a third-party website governed by their independent terms and privacy policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                6
              </span>
              Disclaimer of Warranties & Limitation of Liability
            </h2>
            <p>
              All tools, calculators, converters, and utilities on MyToolsHut are provided strictly on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind. Under no circumstances shall MyToolsHut or its developers be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our tools.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                7
              </span>
              Modifications & Contact
            </h2>
            <p>
              We reserve the right to revise these Terms of Service at any time without prior notice. For questions concerning these Terms, contact us at{" "}
              <a href="mailto:support@mytoolshut.com" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
                support@mytoolshut.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

