"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import {
  Link2,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  Sparkles,
  AlertCircle,
  Clock,
  Download,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools/registry";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Button } from "@/components/ui/Button";

interface ShortenResponse {
  shortCode: string;
  shortUrl: string;
}

export default function UrlShortenerPage() {
  const tool = getToolBySlug("url-shortener")!;
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expiresInDays, setExpiresInDays] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ShortenResponse | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (result?.shortUrl) {
      QRCode.toDataURL(result.shortUrl, { width: 200, margin: 1 })
        .then((url) => setQrDataUrl(url))
        .catch(console.error);
    }
  }, [result]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!longUrl.trim()) {
      setError("Please provide a destination URL.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalUrl: longUrl.trim(),
          customAlias: customAlias.trim() || undefined,
          expiresInDays: expiresInDays > 0 ? expiresInDays : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to shorten URL.");
      } else {
        setResult(data);
      }
    } catch {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result?.shortUrl) return;
    navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `qrcode-${result?.shortCode}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">
              Enter Long URL to Shorten:
            </label>
            <div className="relative">
              <input
                type="url"
                required
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="https://example.com/very/long/destination/path"
                className="w-full px-4 py-3 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                Custom Alias (Optional):
              </label>
              <div className="flex items-center rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
                <span className="px-3 text-xs text-neutral-400 bg-neutral-100 dark:bg-neutral-800 py-3 border-r border-neutral-200 dark:border-neutral-700 select-none">
                  /s/
                </span>
                <input
                  type="text"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  placeholder="my-link"
                  className="w-full px-3 py-2 text-sm bg-transparent text-neutral-900 dark:text-neutral-100 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                Expiration:
              </label>
              <select
                value={expiresInDays}
                onChange={(e) => setExpiresInDays(Number(e.target.value))}
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200"
              >
                <option value={0}>Never Expires (Permanent)</option>
                <option value={1}>Expires in 24 Hours</option>
                <option value={7}>Expires in 7 Days</option>
                <option value={30}>Expires in 30 Days</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-900/50">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isLoading}
          >
            <Link2 className="w-4 h-4" />
            <span>Shorten URL</span>
          </Button>
        </form>

        {/* Shortened Result Card */}
        {result && (
          <div className="rounded-2xl border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/40 dark:bg-indigo-950/30 p-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Your Short Link is Ready</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs">
              <a
                href={result.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg font-bold text-indigo-600 dark:text-indigo-400 hover:underline break-all"
              >
                {result.shortUrl}
              </a>

              <div className="flex items-center gap-2 shrink-0">
                <Button variant="primary" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </Button>
                <a
                  href={result.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500"
                  title="Test Link"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* QR Code and Quick Details */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
              <div className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                <p>
                  Destination: <span className="font-mono truncate block max-w-sm">{longUrl}</span>
                </p>
                <p>
                  Short Code: <code className="font-bold text-neutral-800 dark:text-neutral-200">{result.shortCode}</code>
                </p>
                <p className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <span>✓ Click tracking enabled</span>
                </p>
              </div>

              {qrDataUrl && (
                <div className="flex items-center gap-3 p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrDataUrl} alt="Short URL QR Code" className="w-16 h-16 rounded" />
                  <Button variant="outline" size="sm" onClick={handleDownloadQr}>
                    <Download className="w-3.5 h-3.5" />
                    <span>QR</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
