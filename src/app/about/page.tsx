import React from "react";
import Link from "next/link";
import {
  Wrench,
  Shield,
  Zap,
  Heart,
  CheckCircle2,
  ArrowRight,
  Users,
  Code2,
  Award,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Our Mission & Engineering Standards | MyToolsHut",
  description:
    "Learn about MyToolsHut's mission to provide fast, private, accessible, and 100% free online tools for creators, developers, and everyday users worldwide.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-sm">
            <Wrench className="w-6 h-6 -rotate-12" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            About MyToolsHut
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Free online utilities engineered for speed, simplicity, and an uncompromising respect for user privacy.
          </p>
        </div>

        {/* Mission Content */}
        <div className="space-y-6 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {/* Card 1 */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 space-y-4 shadow-sm">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-600" />
              Our Mission: Fast, Clean, Frictionless Tools
            </h2>
            <p>
              The web is full of tool websites that are cluttered with pop-up traps, deceptive fake &quot;Download&quot; buttons, forced account registrations, and slow server queues. MyToolsHut was founded to provide a refreshing alternative: clean, beautiful, and reliable utilities that simply do their job — instantly and for free.
            </p>
            <p>
              Whether you are optimizing images for a web project, resizing assets for social media campaigns, shortening trackable links, or inspecting developer payloads, MyToolsHut delivers desktop-grade utility right inside your web browser.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 space-y-4 shadow-sm">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              Privacy by Design: 100% Client-Side Processing
            </h2>
            <p>
              We firmly believe your personal documents, photos, text, and passwords belong exclusively to you. Whenever technically feasible, our tools process your data <strong>100% inside your web browser</strong> using modern HTML5 Canvas, Web Crypto, and JavaScript APIs.
            </p>
            <p>
              When using our browser-based tools, your files never leave your device, never touch our servers, and cannot be intercepted, monitored, or stored by anyone.
            </p>
          </div>

          {/* Card 3: Engineering & Editorial Standards */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 space-y-4 shadow-sm">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-amber-600" />
              Our Technology & Quality Standards
            </h2>
            <p>
              MyToolsHut is built with high-performance modern web technologies including Next.js, TypeScript, and modern browser APIs. Every single tool is tested for computational accuracy, cross-browser compatibility (Chrome, Firefox, Safari, Edge), and full mobile responsiveness.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-800">
                <div className="font-bold text-neutral-900 dark:text-white text-sm">Zero Latency</div>
                <div className="text-xs text-neutral-500 mt-1">Local processing eliminates cloud upload and server queue delays.</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-800">
                <div className="font-bold text-neutral-900 dark:text-white text-sm">Mobile Optimized</div>
                <div className="text-xs text-neutral-500 mt-1">Responsive touch controls designed for phones and tablets.</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-800">
                <div className="font-bold text-neutral-900 dark:text-white text-sm">Always Free</div>
                <div className="text-xs text-neutral-500 mt-1">Supported by non-intrusive ads; no paywalls or credit cards required.</div>
              </div>
            </div>
          </div>

          {/* Card 4: How We Support The Service */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 space-y-4 shadow-sm">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-rose-600" />
              How We Sustain Our Free Service
            </h2>
            <p>
              Maintaining fast hosting, SSL certificates, continuous tool updates, and development requires resources. We sustain MyToolsHut through non-intrusive banner advertisements served through <strong>Google AdSense</strong>.
            </p>
            <p>
              We adhere to strict ad placement standards: we never use misleading download buttons, deceptive overlays, or intrusive pop-ups that degrade your user experience.
            </p>
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

