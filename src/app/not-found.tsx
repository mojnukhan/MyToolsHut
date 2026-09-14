import React from "react";
import Link from "next/link";
import { Wrench, Home, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-md shadow-indigo-500/10">
            <Wrench className="w-10 h-10 -rotate-45" />
          </div>
          <span className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
            404
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
            Oops! This tool seems to be missing.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed">
            The page or utility you requested does not exist or has been relocated to a new category.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back Home</span>
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs font-semibold transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Explore Tools</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
