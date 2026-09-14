"use client";

import React, { useState } from "react";
import {
  Search,
  Download,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools/registry";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Button } from "@/components/ui/Button";

interface ThumbnailTier {
  name: string;
  resolution: string;
  filename: string;
  url: string;
  isMaxRes?: boolean;
}

export default function YouTubeThumbnailDownloaderPage() {
  const tool = getToolBySlug("youtube-thumbnail-downloader")!;
  const [urlInput, setUrlInput] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const extractVideoId = (url: string): string | null => {
    const clean = url.trim();
    if (!clean) return null;

    // Standard: https://www.youtube.com/watch?v=dQw4w9WgXcQ
    const vMatch = clean.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (vMatch) return vMatch[1];

    // Short link: https://youtu.be/dQw4w9WgXcQ
    const shortMatch = clean.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) return shortMatch[1];

    // Shorts: https://www.youtube.com/shorts/dQw4w9WgXcQ
    const shortsMatch = clean.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (shortsMatch) return shortsMatch[1];

    // Embed: https://www.youtube.com/embed/dQw4w9WgXcQ
    const embedMatch = clean.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch) return embedMatch[1];

    // Direct ID input (11 chars)
    if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) return clean;

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const id = extractVideoId(urlInput);
    if (!id) {
      setError("Please enter a valid YouTube video or Shorts link (e.g. youtube.com/watch?v=... or youtu.be/...)");
      setVideoId(null);
      return;
    }

    setVideoId(id);
  };

  const tiers: ThumbnailTier[] = videoId
    ? [
        {
          name: "Maximum Resolution (HD)",
          resolution: "1920 × 1080 / 1280 × 720 px",
          filename: "maxresdefault.jpg",
          url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          isMaxRes: true,
        },
        {
          name: "Standard Definition",
          resolution: "640 × 480 px",
          filename: "sddefault.jpg",
          url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
        },
        {
          name: "High Quality",
          resolution: "480 × 360 px",
          filename: "hqdefault.jpg",
          url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        },
        {
          name: "Medium Quality",
          resolution: "320 × 180 px",
          filename: "mqdefault.jpg",
          url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        },
      ]
    : [];

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDownload = async (tier: ThumbnailTier) => {
    setIsDownloading(tier.name);
    try {
      // Fetch image through canvas or blob
      const res = await fetch(tier.url, { mode: "cors" }).catch(() => null);
      if (res && res.ok) {
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `youtube-${videoId}-${tier.filename}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      } else {
        // Direct open fallback if direct CORS download is restricted
        window.open(tier.url, "_blank");
      }
    } catch {
      window.open(tier.url, "_blank");
    } finally {
      setIsDownloading(null);
    }
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-8">
        {/* Form input */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            Paste YouTube Video or Shorts URL:
          </label>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                className="w-full px-4 py-3 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <Button variant="primary" size="lg" type="submit" className="sm:w-auto">
              <Search className="w-4 h-4" />
              <span>Get Thumbnails</span>
            </Button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 mt-2 bg-red-50 dark:bg-red-950/40 p-3 rounded-lg border border-red-200 dark:border-red-900/50">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </form>

        {/* Results */}
        {videoId && (
          <div className="space-y-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  Available Thumbnail Resolutions
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Video ID: <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">{videoId}</code>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="p-4 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                            {tier.name}
                          </h4>
                          {tier.isMaxRes && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50">
                              <Sparkles className="w-3 h-3" />
                              Best Quality
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-neutral-400 font-mono mt-0.5 block">
                          {tier.resolution}
                        </span>
                      </div>
                    </div>

                    {/* Image Preview */}
                    <div className="aspect-video bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tier.url}
                        alt={tier.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Hide broken fallback if 1080p is unavailable for older video
                          const target = e.currentTarget;
                          target.style.opacity = "0.3";
                        }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 bg-neutral-50/50 dark:bg-neutral-950/50 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDownload(tier)}
                      isLoading={isDownloading === tier.name}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyLink(tier.url)}
                      title="Copy direct image URL"
                    >
                      {copiedUrl === tier.url ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </Button>
                    <a
                      href={tier.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
