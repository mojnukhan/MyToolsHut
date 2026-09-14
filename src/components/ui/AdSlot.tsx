import React from "react";
import { cn } from "@/lib/utils";

interface AdSlotProps {
  slot: "header" | "tool-top" | "tool-bottom" | "sidebar" | "in-content";
  className?: string;
}

export function AdSlot({ slot, className }: AdSlotProps) {
  const slotDimensions = {
    header: "h-20 max-w-3xl",
    "tool-top": "h-24 max-w-4xl",
    "tool-bottom": "h-28 max-w-4xl",
    sidebar: "h-64 w-full",
    "in-content": "h-32 max-w-2xl",
  };

  return (
    <div
      className={cn(
        "my-6 mx-auto w-full flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 text-neutral-400 dark:text-neutral-500 text-xs select-none",
        slotDimensions[slot],
        className
      )}
      aria-label="Advertisement placeholder"
    >
      <span className="font-medium tracking-wider uppercase text-[11px] opacity-75">
        Advertisement
      </span>
      <span className="text-[10px] text-neutral-400/60 dark:text-neutral-500/60 mt-0.5">
        Non-intrusive sponsor slot
      </span>
    </div>
  );
}
