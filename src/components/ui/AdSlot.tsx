"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AdSlotProps {
  slot: "header" | "tool-top" | "tool-bottom" | "sidebar" | "in-content";
  slotId?: string;
  className?: string;
}

export function AdSlot({ slot, slotId, className }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isPushed = useRef(false);

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const isAdSenseConfigured =
    Boolean(clientId) && clientId !== "ca-pub-0000000000000000";

  useEffect(() => {
    if (isAdSenseConfigured && !isPushed.current && adRef.current) {
      try {
        // @ts-expect-error - window.adsbygoogle is injected by AdSense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushed.current = true;
      } catch (err) {
        console.error("AdSense push error:", err);
      }
    }
  }, [isAdSenseConfigured]);

  // Hide ad slot completely when AdSense is not active or during review
  // This prevents Google reviewers from flagging the site as "Under Construction" or "Blank Ad Units"
  if (!isAdSenseConfigured) {
    return null;
  }

  const slotDimensions = {
    header: "min-h-[90px] max-w-4xl",
    "tool-top": "min-h-[90px] max-w-4xl",
    "tool-bottom": "min-h-[90px] max-w-4xl",
    sidebar: "min-h-[250px] w-full",
    "in-content": "min-h-[120px] max-w-3xl",
  };

  return (
    <div
      className={cn(
        "my-6 mx-auto w-full flex flex-col items-center justify-center overflow-hidden transition-all",
        slotDimensions[slot],
        className
      )}
      aria-label="Advertisement"
    >
      <div className="w-full text-center mb-1.5">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400 dark:text-neutral-500 select-none">
          Advertisement
        </span>
      </div>

      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center", width: "100%" }}
        data-ad-client={clientId}
        data-ad-slot={slotId || "0000000000"}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}


