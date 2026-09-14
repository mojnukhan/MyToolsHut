import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { ToolDefinition, CATEGORIES } from "@/lib/tools/registry";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { cn } from "@/lib/utils";

export function ToolCard({
  tool,
  className,
}: {
  tool: ToolDefinition;
  className?: string;
}) {
  const category = CATEGORIES[tool.category];

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-900 p-5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.1)] dark:shadow-none dark:hover:border-neutral-700 transition-all duration-200 hover:-translate-y-0.5",
        className
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
              <DynamicIcon name={tool.iconName} className="w-5 h-5" />
            </div>
            <div>
              <Link
                href={`/tools/${tool.slug}`}
                className="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
              >
                {tool.name}
              </Link>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {category?.name}
                </span>
                {tool.localProcessing && (
                  <span
                    className="inline-flex items-center gap-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded"
                    title="Processed locally in your browser"
                  >
                    <ShieldCheck className="w-3 h-3" />
                    Local
                  </span>
                )}
              </div>
            </div>
          </div>
          {tool.popular && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-900/60">
              <Sparkles className="w-3 h-3" />
              Popular
            </span>
          )}
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4 leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-400">
          {tool.localProcessing ? "100% Client-Side" : "Fast & Free"}
        </span>
        <Link
          href={`/tools/${tool.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform"
        >
          Use Tool
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
