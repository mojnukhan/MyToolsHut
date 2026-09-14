import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  Info,
} from "lucide-react";
import {
  ToolDefinition,
  CATEGORIES,
  getRelatedTools,
} from "@/lib/tools/registry";
import { ToolCard } from "@/components/tools/ToolCard";
import { AdSlot } from "@/components/ui/AdSlot";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { ToolJsonLd } from "@/components/seo/JsonLd";

export function ToolLayout({
  tool,
  children,
}: {
  tool: ToolDefinition;
  children: React.ReactNode;
}) {
  const category = CATEGORIES[tool.category];
  const relatedTools = getRelatedTools(tool, 4);

  return (
    <div className="min-h-screen py-6 md:py-10">
      <ToolJsonLd tool={tool} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mb-6"
        >
          <Link
            href="/"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <Link
            href={`/tools/category/${tool.category}`}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            {category?.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            {tool.name}
          </span>
        </nav>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
              <DynamicIcon name={category.iconName} className="w-3.5 h-3.5" />
              {category.name}
            </span>

            {tool.localProcessing ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                100% In-Browser • Files Never Uploaded
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                High-Speed Cloud Tool
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            {tool.name}
          </h1>
          <p className="text-base text-neutral-600 dark:text-neutral-400 mt-2 max-w-3xl leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Top Ad slot */}
        <AdSlot slot="tool-top" />

        {/* Main Interactive Tool Card */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 sm:p-6 lg:p-8 shadow-sm dark:shadow-none mb-10 transition-colors">
          {children}
        </div>

        {/* Bottom Ad slot */}
        <AdSlot slot="tool-bottom" />

        {/* Educational / Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          {/* How to use */}
          {tool.steps && tool.steps.length > 0 && (
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/40 p-6">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                How to Use {tool.name}
              </h2>
              <ol className="space-y-3">
                {tool.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                    <span className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Key Features */}
          {tool.features && tool.features.length > 0 && (
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/40 p-6">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Key Features & Benefits
              </h2>
              <ul className="space-y-2.5">
                {tool.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* FAQs */}
        {tool.faqs && tool.faqs.length > 0 && (
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/40 p-6 my-10">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {tool.faqs.map((faq, idx) => (
                <div key={idx} className={idx > 0 ? "pt-4" : ""}>
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="my-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  Related Tools
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Other free utilities you might find useful
                </p>
              </div>
              <Link
                href="/tools"
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View all tools →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedTools.map((relTool) => (
                <ToolCard key={relTool.slug} tool={relTool} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
