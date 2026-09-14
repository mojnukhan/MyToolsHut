"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Smartphone,
  Sparkles,
  CheckCircle,
  HelpCircle,
  Wrench,
  Flame,
  Globe,
  DownloadCloud,
} from "lucide-react";
import {
  CATEGORIES,
  ToolCategoryKey,
  getPopularTools,
  searchTools,
} from "@/lib/tools/registry";
import { ToolCard } from "@/components/tools/ToolCard";
import { CategoryCard } from "@/components/tools/CategoryCard";
import { AdSlot } from "@/components/ui/AdSlot";

export default function HomePage() {
  const [heroSearch, setHeroSearch] = useState("");
  const popularTools = getPopularTools();
  const searchResults = heroSearch.trim() ? searchTools(heroSearch) : [];

  const whyChooseUs = [
    {
      icon: ShieldCheck,
      title: "100% Free & Unlimited",
      desc: "Every single tool is completely free with no hidden paywalls, trials, or credit card requirements.",
    },
    {
      icon: Lock,
      title: "Privacy First",
      desc: "Your photos and files are processed locally inside your web browser whenever possible. Nothing gets uploaded.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Built with modern Web APIs and instant client-side execution. Zero server queue waits.",
    },
    {
      icon: DownloadCloud,
      title: "No Installation Needed",
      desc: "Works directly in your modern web browser on any device without installing software or extensions.",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      desc: "Fully responsive, touch-friendly UI designed for seamless one-handed use on phones and tablets.",
    },
    {
      icon: Sparkles,
      title: "Clean & Simple",
      desc: "A distraction-free, professional SaaS interface with zero intrusive popups or deceptive download links.",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Choose a Tool",
      desc: "Browse our comprehensive directory or use instant search to find the exact utility you need.",
    },
    {
      step: "02",
      title: "Enter Data or Select Files",
      desc: "Paste your text, enter a URL, or drop your images. Processing happens instantly and securely.",
    },
    {
      step: "03",
      title: "Download or Copy Result",
      desc: "Get your compressed images, shortened links, formatted code, or QR codes with one click.",
    },
  ];

  const homeFaqs = [
    {
      q: "Is MyToolsHut really 100% free to use?",
      a: "Yes! All tools on MyToolsHut are completely free to use with no hidden fees, subscriptions, or limits. You can process as many files as you need.",
    },
    {
      q: "Are my files uploaded to your servers?",
      a: "For tools labeled 'Client-side' or 'Local' (such as Image Compressor, Resizer, Word Counter, QR Generator, and Format Converters), all processing runs 100% inside your browser using JavaScript and HTML5 Canvas. Your files never touch our servers.",
    },
    {
      q: "Do I need to create an account or sign in?",
      a: "No account or registration is required to use any of the public tools. You can use them immediately with zero friction.",
    },
    {
      q: "Can I use MyToolsHut on my smartphone?",
      a: "Yes! MyToolsHut is built with responsive mobile-first architecture and touch controls, working smoothly on iOS, Android, and tablets.",
    },
    {
      q: "How does the URL Shortener work?",
      a: "Our URL shortener generates a clean, permanent link (e.g. mytoolshut.com/s/code) that redirects visitors to your destination URL while recording anonymous click statistics.",
    },
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 pb-8 overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-40 dark:opacity-20 pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-500/30 to-purple-500/20 blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 shadow-2xs mb-6 animate-in fade-in slide-in-from-bottom-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Over 12+ Free High-Speed Online Utilities</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.1] max-w-4xl mx-auto">
            Free Online Tools. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400">
              Simple, Fast & Powerful.
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-5 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Compress images, convert files, shorten URLs, download YouTube thumbnails, and analyze text — all free, private, and in one place.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="relative flex items-center rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-lg shadow-neutral-200/50 dark:shadow-none p-1.5 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
              <Search className="w-5 h-5 text-neutral-400 ml-3 shrink-0" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Search tools (e.g. image compressor, url, word counter)..."
                className="w-full bg-transparent px-3 py-2 text-sm md:text-base text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none"
              />
              <Link
                href="/tools"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shrink-0"
              >
                <span>Browse</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Live dropdown results when searching */}
            {heroSearch.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-2 text-left z-30 max-h-72 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.slice(0, 6).map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {tool.name}
                      </span>
                      <span className="text-xs text-neutral-400">
                        {CATEGORIES[tool.category]?.name} →
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-neutral-400">
                    No tools found matching &quot;{heroSearch}&quot;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all hover:-translate-y-0.5"
            >
              <Wrench className="w-4 h-4" />
              <span>Explore All Tools</span>
            </Link>
            <a
              href="#popular"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm font-semibold transition-all hover:-translate-y-0.5"
            >
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Popular Tools</span>
            </a>
          </div>

          {/* Privacy pledge micro-banner */}
          <div className="mt-10 flex items-center justify-center gap-6 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Client-side Processing Available
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-indigo-500" />
              Zero Sign-Up Required
            </span>
          </div>
        </div>
      </section>

      {/* Header Ad placeholder */}
      <div className="max-w-5xl mx-auto px-4 w-full">
        <AdSlot slot="header" />
      </div>

      {/* 2. POPULAR TOOLS */}
      <section id="popular" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>Most Used</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
              Popular Tools
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              The most requested online utilities, ready for instant use.
            </p>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
          >
            <span>View All Tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {popularTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* 3. TOOL CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Organized Directory
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white mt-1">
            Browse by Category
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
            Find the right utility for image optimization, SEO, coding, URL shortening, and text editing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(Object.keys(CATEGORIES) as ToolCategoryKey[]).map((key) => (
            <CategoryCard key={key} category={CATEGORIES[key]} />
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE MYTOOLSHUT */}
      <section className="bg-neutral-50 dark:bg-neutral-900/40 py-16 border-y border-neutral-200 dark:border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Why MyToolsHut?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white mt-1">
              Built for Speed, Privacy & Simplicity
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
              We engineered MyToolsHut to be the tools platform we always wanted to use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm dark:shadow-none"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Simple Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white mt-1">
            How It Works
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
            Zero complex steps. Get your results in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorks.map((step, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-start p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
            >
              <span className="text-4xl font-black text-indigo-100 dark:text-indigo-950/80 mb-4 select-none">
                {step.step}
              </span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
            Everything you need to know about MyToolsHut services and privacy.
          </p>
        </div>

        <div className="space-y-4">
          {homeFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-2xs"
            >
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-900 dark:to-violet-900 p-8 sm:p-12 text-center text-white shadow-xl shadow-indigo-600/10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Ready to optimize your workflow?
          </h2>
          <p className="mt-3 text-indigo-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Start using our free online tools today. No credit cards, no sign-ups, and no waiting.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-600 font-bold text-sm shadow-md hover:bg-indigo-50 transition-colors"
            >
              <span>Explore All Tools</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
