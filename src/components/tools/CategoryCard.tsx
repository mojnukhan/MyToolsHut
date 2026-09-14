import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ToolCategory, getToolsByCategory } from "@/lib/tools/registry";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { cn } from "@/lib/utils";

export function CategoryCard({
  category,
  className,
}: {
  category: ToolCategory;
  className?: string;
}) {
  const tools = getToolsByCategory(category.key);
  const count = tools.length;

  return (
    <Link
      href={`/tools/category/${category.key}`}
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm hover:shadow-md dark:shadow-none dark:hover:border-neutral-700 transition-all duration-200 hover:-translate-y-0.5",
        className
      )}
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
            <DynamicIcon name={category.iconName} className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
            {count} {count === 1 ? "tool" : "tools"}
          </span>
        </div>

        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1">
          {category.name}
          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </h3>

        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
          {category.shortDescription}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs font-medium text-indigo-600 dark:text-indigo-400 flex items-center justify-between">
        <span>Explore category</span>
        <span>→</span>
      </div>
    </Link>
  );
}
