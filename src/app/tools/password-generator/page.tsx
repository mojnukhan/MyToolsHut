"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  KeyRound,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools/registry";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Button } from "@/components/ui/Button";

export default function PasswordGeneratorPage() {
  const tool = getToolBySlug("password-generator")!;
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (excludeAmbiguous) {
      upper = upper.replace(/[IO]/g, "");
      lower = lower.replace(/[lo]/g, "");
      numbers = numbers.replace(/[01]/g, "");
    }

    let charPool = "";
    if (includeUpper) charPool += upper;
    if (includeLower) charPool += lower;
    if (includeNumbers) charPool += numbers;
    if (includeSymbols) charPool += symbols;

    if (!charPool) {
      setPassword("");
      return;
    }

    // Cryptographically secure random selection
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    let result = "";
    for (let i = 0; i < length; i++) {
      result += charPool[array[i] % charPool.length];
    }

    setPassword(result);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols, excludeAmbiguous]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // Calculate password strength & entropy
  const getStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "None", color: "text-neutral-400", bg: "bg-neutral-200" };
    let poolSize = 0;
    if (/[A-Z]/.test(pass)) poolSize += 26;
    if (/[a-z]/.test(pass)) poolSize += 26;
    if (/[0-9]/.test(pass)) poolSize += 10;
    if (/[^A-Za-z0-9]/.test(pass)) poolSize += 30;

    const entropy = Math.round(pass.length * Math.log2(poolSize || 1));

    if (entropy < 40) return { score: 1, label: "Weak", color: "text-red-500", bg: "bg-red-500", entropy };
    if (entropy < 65) return { score: 2, label: "Fair", color: "text-amber-500", bg: "bg-amber-500", entropy };
    if (entropy < 85) return { score: 3, label: "Strong", color: "text-indigo-500", bg: "bg-indigo-500", entropy };
    return { score: 4, label: "Very Strong", color: "text-emerald-500", bg: "bg-emerald-500", entropy };
  };

  const strength = getStrength(password);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Password Display Box */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 p-4 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-neutral-900 dark:text-white break-all text-center sm:text-left select-all">
              {password || "Select at least one character type"}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="md"
                onClick={generatePassword}
                title="Generate new password"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Button variant="primary" size="md" onClick={handleCopy}>
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </Button>
            </div>
          </div>

          {/* Strength Meter Bar */}
          <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-medium text-neutral-500">
                Password Strength: <strong className={strength.color}>{strength.label}</strong>
              </span>
              {strength.entropy && (
                <span className="font-mono text-neutral-400">
                  {strength.entropy} bits of entropy
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-1.5 h-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`rounded-full h-full transition-colors ${
                    step <= strength.score ? strength.bg : "bg-neutral-200 dark:bg-neutral-800"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Configuration Controls */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-6">
          {/* Length Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Password Length
              </label>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 font-mono font-bold text-sm text-indigo-600 dark:text-indigo-400 border border-indigo-200/50">
                {length} chars
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
              <span>8</span>
              <span>16 (Recommended)</span>
              <span>32</span>
              <span>64</span>
            </div>
          </div>

          {/* Checkbox Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <label className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={(e) => setIncludeUpper(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 accent-indigo-600 cursor-pointer"
              />
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                Uppercase Letters (A-Z)
              </span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={includeLower}
                onChange={(e) => setIncludeLower(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 accent-indigo-600 cursor-pointer"
              />
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                Lowercase Letters (a-z)
              </span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 accent-indigo-600 cursor-pointer"
              />
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                Numbers (0-9)
              </span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 accent-indigo-600 cursor-pointer"
              />
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                Symbols (!@#$%^&*)
              </span>
            </label>

            <label className="sm:col-span-2 flex items-center gap-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={excludeAmbiguous}
                onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 accent-indigo-600 cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  Exclude Ambiguous Characters
                </span>
                <span className="text-[11px] text-neutral-400">
                  Avoids easily confused characters such as 1, l, I, 0, O
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
