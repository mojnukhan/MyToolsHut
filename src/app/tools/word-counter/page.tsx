"use client";

import React, { useState, useMemo } from "react";
import {
  Copy,
  Check,
  Trash2,
  Clock,
  Mic,
  AlignLeft,
  Sparkles,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools/registry";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Button } from "@/components/ui/Button";

export default function WordCounterPage() {
  const tool = getToolBySlug("word-counter")!;
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();

    // Words
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;

    // Characters
    const characters = text.length;

    // Characters without spaces
    const charactersNoSpaces = text.replace(/\s/g, "").length;

    // Sentences
    const sentences = trimmed
      ? (trimmed.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || 1
      : 0;

    // Paragraphs
    const paragraphs = trimmed
      ? trimmed.split(/\n+/).filter((line) => line.trim().length > 0).length
      : 0;

    // Reading time: avg 200 WPM
    const readingMinutes = Math.ceil(words / 200);

    // Speaking time: avg 130 WPM
    const speakingMinutes = Math.ceil(words / 130);

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingMinutes,
      speakingMinutes,
    };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpperCase = () => setText((prev) => prev.toUpperCase());
  const handleLowerCase = () => setText((prev) => prev.toLowerCase());
  const handleTitleCase = () => {
    setText((prev) =>
      prev.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
      )
    );
  };
  const handleRemoveExtraSpaces = () => {
    setText((prev) => prev.replace(/[ \t]+/g, " ").replace(/\n\s*\n/g, "\n\n").trim());
  };
  const handleClear = () => setText("");

  const statCards = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.characters },
    { label: "No Spaces", value: stats.charactersNoSpaces },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
  ];

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Real-time stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50 text-center"
            >
              <span className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
                {card.value}
              </span>
              <span className="block text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-1">
                {card.label}
              </span>
            </div>
          ))}
        </div>

        {/* Time estimate bar */}
        <div className="flex flex-wrap items-center gap-4 p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/40 dark:bg-indigo-950/20 text-xs text-indigo-900 dark:text-indigo-300">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Reading time: <strong>~{stats.readingMinutes} min</strong> (200 WPM)</span>
          </div>
          <span className="text-indigo-300 dark:text-indigo-700">•</span>
          <div className="flex items-center gap-1.5">
            <Mic className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Speaking time: <strong>~{stats.speakingMinutes} min</strong> (130 WPM)</span>
          </div>
        </div>

        {/* Text Input Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Type or paste your text below:
            </label>
            <span className="text-xs text-neutral-400">
              {stats.characters} chars
            </span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            placeholder="Start typing or paste your content here to inspect words, characters, sentences, paragraphs, and reading speed..."
            className="w-full p-4 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y leading-relaxed font-sans"
          />
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Transforms */}
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleUpperCase} disabled={!text}>
              UPPERCASE
            </Button>
            <Button variant="outline" size="sm" onClick={handleLowerCase} disabled={!text}>
              lowercase
            </Button>
            <Button variant="outline" size="sm" onClick={handleTitleCase} disabled={!text}>
              Title Case
            </Button>
            <Button variant="outline" size="sm" onClick={handleRemoveExtraSpaces} disabled={!text}>
              Strip Extra Spaces
            </Button>
          </div>

          {/* Utility buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={!text}>
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClear} disabled={!text}>
              <Trash2 className="w-3.5 h-3.5 text-neutral-500" />
              <span>Clear</span>
            </Button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
