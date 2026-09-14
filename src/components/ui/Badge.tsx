import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "success" | "warning" | "outline";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border transition-colors";

  const variants = {
    default:
      "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700",
    primary:
      "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
    success:
      "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    warning:
      "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    outline:
      "bg-transparent text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
