"use client";

import React, { useState } from "react";
import {
  FileCode,
  Copy,
  Check,
  Globe,
  Share2,
  Sparkles,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools/registry";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Button } from "@/components/ui/Button";

export default function MetaTagGeneratorPage() {
  const tool = getToolBySlug("meta-tag-generator")!;
  const [title, setTitle] = useState("ToolNest — Free Online Tools for Everyone");
  const [description, setDescription] = useState(
    "Compress images, convert files, shorten URLs, and use developer tools online for free. Fast and 100% private."
  );
  const [url, setUrl] = useState("https://toolnest.site");
  const [imageUrl, setImageUrl] = useState("https://toolnest.site/og-image.jpg");
  const [siteName, setSiteName] = useState("ToolNest");
  const [twitterHandle, setTwitterHandle] = useState("@toolnest");
  const [copied, setCopied] = useState(false);

  // Generate HTML tags
  const generatedHtml = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${description}" />
<link rel="canonical" href="${url}" />

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:site_name" content="${siteName}" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="${url}" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${imageUrl}" />
${twitterHandle ? `<meta name="twitter:site" content="${twitterHandle}" />` : ""}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Inputs Column */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
            Metadata Inputs
          </h3>

          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              <span>Page Title:</span>
              <span className={title.length > 60 ? "text-amber-500" : "text-neutral-400"}>
                {title.length}/60 chars
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. My Website — The Best Platform"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            />
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              <span>Meta Description:</span>
              <span className={description.length > 160 ? "text-amber-500" : "text-neutral-400"}>
                {description.length}/160 chars
              </span>
            </div>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Summary of page content for search engines..."
              className="w-full p-3 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                Canonical URL:
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                Site Name:
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="Brand / Site Name"
                className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                Social Image (OG Image URL):
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/og.jpg"
                className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                Twitter Handle:
              </label>
              <input
                type="text"
                value={twitterHandle}
                onChange={(e) => setTwitterHandle(e.target.value)}
                placeholder="@username"
                className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
              />
            </div>
          </div>
        </div>

        {/* Live Previews Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Google SERP Preview */}
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 space-y-1 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-2">
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>Google Search Preview</span>
            </div>
            <div className="text-[11px] text-neutral-500 truncate">{url}</div>
            <h4 className="text-base text-blue-700 dark:text-blue-400 hover:underline font-medium cursor-pointer truncate">
              {title || "Page Title Here"}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
              {description || "Meta description will appear here..."}
            </p>
          </div>

          {/* Social Share Preview Card */}
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-2xs">
            <div className="p-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-1.5 text-xs text-neutral-400">
              <Share2 className="w-3.5 h-3.5 text-indigo-500" />
              <span>Social Media Card Preview (Facebook, LinkedIn, Twitter)</span>
            </div>
            <div className="aspect-video bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center overflow-hidden">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt="OG Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <span className="text-xs text-neutral-400">No Image Specified</span>
              )}
            </div>
            <div className="p-3 bg-neutral-50/50 dark:bg-neutral-950/50">
              <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold truncate">
                {new URL(url || "https://example.com").hostname}
              </div>
              <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate mt-0.5">
                {title}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code Output */}
      <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <FileCode className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Generated HTML Meta Tags
          </h3>
          <Button variant="primary" size="sm" onClick={handleCopy}>
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied Tags!" : "Copy HTML"}</span>
          </Button>
        </div>

        <pre className="p-4 rounded-xl bg-neutral-900 text-neutral-100 font-mono text-xs overflow-x-auto leading-relaxed border border-neutral-800">
          <code>{generatedHtml}</code>
        </pre>
      </div>
    </ToolLayout>
  );
}
