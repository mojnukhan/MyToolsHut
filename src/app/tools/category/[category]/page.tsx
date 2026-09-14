import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import {
  CATEGORIES,
  ToolCategoryKey,
  getToolsByCategory,
  TOOLS,
} from "@/lib/tools/registry";
import { ToolCard } from "@/components/tools/ToolCard";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { AdSlot } from "@/components/ui/AdSlot";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return (Object.keys(CATEGORIES) as ToolCategoryKey[]).map((category) => ({
    category,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES[category as ToolCategoryKey];
  if (!cat) return { title: "Category Not Found" };

  return {
    title: `${cat.name} — Free Online Utilities | ToolNest`,
    description: `Discover free online ${cat.name.toLowerCase()} on ToolNest. ${cat.shortDescription}`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const catKey = category as ToolCategoryKey;
  const categoryData = CATEGORIES[catKey];

  if (!categoryData) {
    notFound();
  }

  const categoryTools = getToolsByCategory(catKey);

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mb-6">
          <Link href="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <Link href="/tools" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            Tools
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            {categoryData.name}
          </span>
        </nav>

        {/* Category Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs">
              <DynamicIcon name={categoryData.iconName} className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
                {categoryData.name}
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5">
                {categoryTools.length} {categoryTools.length === 1 ? "utility available" : "utilities available"}
              </p>
            </div>
          </div>
          <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            {categoryData.shortDescription}
          </p>
        </div>

        <AdSlot slot="header" />

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-8">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        {/* Other Categories */}
        <div className="mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            Explore Other Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(CATEGORIES) as ToolCategoryKey[])
              .filter((k) => k !== catKey)
              .map((k) => (
                <Link
                  key={k}
                  href={`/tools/category/${k}`}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <DynamicIcon name={CATEGORIES[k].iconName} className="w-4 h-4 text-neutral-500" />
                  <span>{CATEGORIES[k].name}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
