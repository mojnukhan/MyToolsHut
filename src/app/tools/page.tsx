"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, ArrowDownAZ, Sparkles, Layers } from "lucide-react";
import {
  TOOLS,
  CATEGORIES,
  ToolCategoryKey,
  ToolDefinition,
} from "@/lib/tools/registry";
import { ToolCard } from "@/components/tools/ToolCard";
import { AdSlot } from "@/components/ui/AdSlot";

export default function ToolsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [onlyPopular, setOnlyPopular] = useState(false);
  const [sortOrder, setSortOrder] = useState<"default" | "az">("default");

  const filteredTools = useMemo(() => {
    let list = [...TOOLS];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.keywords.some((k) => k.toLowerCase().includes(q)) ||
          CATEGORIES[t.category].name.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      list = list.filter((t) => t.category === selectedCategory);
    }

    // Filter by popular
    if (onlyPopular) {
      list = list.filter((t) => t.popular);
    }

    // Sort
    if (sortOrder === "az") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [searchQuery, selectedCategory, onlyPopular, sortOrder]);

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Complete Tools Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            All Online Tools
          </h1>
          <p className="text-base text-neutral-600 dark:text-neutral-400 mt-2">
            Explore our entire suite of free, client-side, and cloud utilities. Fast, privacy-friendly, and accessible on any device.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by tool name, format, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Controls Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Category selector */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-xs font-medium bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Categories ({TOOLS.length})</option>
                {(Object.keys(CATEGORIES) as ToolCategoryKey[]).map((key) => (
                  <option key={key} value={key}>
                    {CATEGORIES[key].name}
                  </option>
                ))}
              </select>

              {/* Popular toggle */}
              <button
                type="button"
                onClick={() => setOnlyPopular(!onlyPopular)}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  onlyPopular
                    ? "bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300"
                    : "bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Popular</span>
              </button>

              {/* A-Z Sort */}
              <button
                type="button"
                onClick={() => setSortOrder(sortOrder === "default" ? "az" : "default")}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  sortOrder === "az"
                    ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300"
                    : "bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                <ArrowDownAZ className="w-3.5 h-3.5" />
                <span>{sortOrder === "az" ? "Sorted A-Z" : "Sort A-Z"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Ad slot */}
        <AdSlot slot="header" />

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-neutral-500 dark:text-neutral-400">
          <span>
            Showing <strong className="text-neutral-900 dark:text-neutral-100">{filteredTools.length}</strong> {filteredTools.length === 1 ? "tool" : "tools"}
          </span>
          {(searchQuery || selectedCategory !== "all" || onlyPopular) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setOnlyPopular(false);
              }}
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Tool Cards Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
            <Search className="w-10 h-10 text-neutral-400 mx-auto mb-3 opacity-40" />
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              No matching tools found
            </h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any tool matching your filters. Try clearing your search query or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setOnlyPopular(false);
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              Show all tools
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
