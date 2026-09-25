"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a consent choice
    const consent = localStorage.getItem("mytoolshut_cookie_consent");
    if (!consent) {
      // Small delay for smooth entrance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("mytoolshut_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("mytoolshut_cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md p-5 shadow-2xl dark:shadow-neutral-950/80 text-neutral-800 dark:text-neutral-200">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-4 h-4" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                Cookie & Privacy Choices
              </h3>
              <button
                type="button"
                onClick={handleDecline}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1 -mr-1"
                aria-label="Close cookie consent banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We use cookies to remember your theme preferences. Third-party partners like{" "}
              <strong>Google AdSense</strong> use cookies to serve non-intrusive, relevant ads that keep all tools 100% free.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap items-center justify-between gap-2">
          <Link
            href="/cookies"
            className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            Learn more in Cookie Policy →
          </Link>
          <div className="flex items-center gap-2 ml-auto">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs py-1 px-3 h-8"
              onClick={handleDecline}
            >
              Essential Only
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              className="text-xs py-1 px-3 h-8 shadow-xs"
              onClick={handleAccept}
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
