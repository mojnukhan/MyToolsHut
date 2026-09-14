"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeftRight, Copy, Check, Trash2, Binary } from "lucide-react";
import { getToolBySlug } from "@/lib/tools/registry";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Button } from "@/components/ui/Button";

export default function Base64ConverterPage() {
  const tool = getToolBySlug("base64-converter")!;
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // UTF-8 safe base64 encoding/decoding
  useEffect(() => {
    setError(null);
    if (!input) {
      setOutput("");
      return;
    }

    try {
      if (mode === "encode") {
        // UTF-8 encode
        const encoded = btoa(
          encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (_, p1) =>
            String.fromCharCode(parseInt(p1, 16))
          )
        );
        setOutput(encoded);
      } else {
        // UTF-8 decode
        const decoded = decodeURIComponent(
          Array.from(atob(input.trim()))
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        setOutput(decoded);
      }
    } catch {
      setError(mode === "decode" ? "Invalid Base64 string" : "Encoding failed");
      setOutput("");
    }
  }, [input, mode]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    if (output) {
      setInput(output);
      setMode(mode === "encode" ? "decode" : "encode");
    }
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Mode Selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <button
              type="button"
              onClick={() => setMode("encode")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === "encode"
                  ? "bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              Encode (Text → Base64)
            </button>
            <button
              type="button"
              onClick={() => setMode("decode")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === "decode"
                  ? "bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              Decode (Base64 → Text)
            </button>
          </div>

          <Button variant="outline" size="sm" onClick={handleSwap} disabled={!output}>
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Swap</span>
          </Button>
        </div>

        {/* Input Textarea */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            {mode === "encode" ? "Plain Text to Encode:" : "Base64 String to Decode:"}
          </label>
          <textarea
            rows={6}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "encode"
                ? "Enter plain text, code, or characters here..."
                : "Paste Base64 encoded string (e.g. VGVzdA==)..."
            }
            className="w-full p-3.5 font-mono text-xs sm:text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {error && (
          <div className="text-xs text-red-600 dark:text-red-400 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50">
            {error}
          </div>
        )}

        {/* Output Textarea */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              {mode === "encode" ? "Base64 Output:" : "Decoded Plain Text:"}
            </label>
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={!output}>
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Output"}</span>
            </Button>
          </div>
          <textarea
            rows={6}
            readOnly
            value={output}
            placeholder="Result will appear here automatically..."
            className="w-full p-3.5 font-mono text-xs sm:text-sm rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 focus:outline-none select-all"
          />
        </div>
      </div>
    </ToolLayout>
  );
}
