"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, ShieldCheck } from "lucide-react";
import { searchTools, ToolDefinition, CATEGORIES } from "@/lib/tools/registry";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ToolDefinition[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setResults(searchTools("").slice(0, 8));
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      setResults(searchTools(query).slice(0, 10));
    } else {
      setResults(searchTools("").slice(0, 8));
    }
  }, [query]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered from parent or global listener
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden z-10">
        {/* Search input bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-200 dark:border-neutral-800">
          <Search className="w-5 h-5 text-neutral-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search all tools (e.g. compress, youtube, word counter, json)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm md:text-base text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-neutral-100 dark:divide-neutral-800/60">
          {results.length > 0 ? (
            results.map((tool) => {
              const cat = CATEGORIES[tool.category];
              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <DynamicIcon name={tool.iconName} className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          {tool.name}
                        </span>
                        <span className="text-[11px] px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                          {cat?.name}
                        </span>
                        {tool.localProcessing && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                            <ShieldCheck className="w-3 h-3" />
                            Client-side
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </Link>
              );
            })
          ) : (
            <div className="py-12 text-center text-neutral-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">No tools found matching &quot;{query}&quot;</p>
              <p className="text-xs text-neutral-500 mt-1">
                Try searching for image, url, youtube, pdf, or text
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950/60 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
          <span>Tip: Browse categories with the top navigation bar</span>
          <span className="hidden sm:inline">Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
