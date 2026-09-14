"use client";

import React, { useState } from "react";
import {
  Braces,
  Check,
  Copy,
  Trash2,
  AlertCircle,
  Minimize2,
  Maximize2,
  FileCode,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools/registry";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Button } from "@/components/ui/Button";

export default function JsonFormatterPage() {
  const tool = getToolBySlug("json-formatter")!;
  const [inputJson, setInputJson] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState<number>(2);

  const handleBeautify = (spaces = indentSize) => {
    setError(null);
    if (!inputJson.trim()) return;
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, spaces));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid JSON format");
      }
    }
  };

  const handleMinify = () => {
    setError(null);
    if (!inputJson.trim()) return;
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid JSON format");
      }
    }
  };

  const handleCopy = () => {
    if (!inputJson) return;
    navigator.clipboard.writeText(inputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputJson("");
    setError(null);
  };

  const handleSample = () => {
    const sample = {
      project: "ToolNest",
      tagline: "Free Online Tools for Everyone",
      features: ["Client-side processing", "Instant downloads", "Dark mode"],
      stats: {
        totalTools: 12,
        isFree: true,
        year: 2026,
      },
    };
    setInputJson(JSON.stringify(sample, null, 2));
    setError(null);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-4">
        {/* Top Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="primary" size="sm" onClick={() => handleBeautify(indentSize)}>
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Beautify</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleMinify}>
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Minify</span>
            </Button>
            <div className="flex items-center gap-1 text-xs text-neutral-500 pl-2">
              <span>Indent:</span>
              <select
                value={indentSize}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setIndentSize(val);
                  handleBeautify(val);
                }}
                className="px-2 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={1}>Tab</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleSample}>
              Load Sample
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={!inputJson}>
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClear} disabled={!inputJson}>
              <Trash2 className="w-3.5 h-3.5 text-neutral-500" />
            </Button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 p-3 text-xs text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-900/50">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-mono">Syntax Error: {error}</span>
          </div>
        )}

        {/* Editor Textarea */}
        <div className="relative">
          <textarea
            rows={16}
            value={inputJson}
            onChange={(e) => {
              setInputJson(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Paste your JSON payload here (e.g. { &quot;key&quot;: &quot;value&quot; })..."
            className="w-full p-4 font-mono text-xs sm:text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
          <span>Processed 100% locally in your browser</span>
          <span>{inputJson ? `${inputJson.length} characters` : ""}</span>
        </div>
      </div>
    </ToolLayout>
  );
}
