import React from "react";
import Link from "next/link";
import { Wrench, Heart, Shield } from "lucide-react";
import { CATEGORIES, ToolCategoryKey } from "@/lib/tools/registry";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/60 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Mission Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-600/30">
                <Wrench className="w-4 h-4 -rotate-12" />
              </div>
              <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                MyTools<span className="text-indigo-600 dark:text-indigo-400">Hut</span>
              </span>
            </Link>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3 max-w-sm leading-relaxed">
              MyToolsHut is a modern, high-speed online tools platform built for everyone.
              Process files right in your browser with zero bloat and maximum privacy.
            </p>
            <div className="flex items-center gap-3 mt-4 text-neutral-400 dark:text-neutral-500">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-200/50 dark:border-emerald-800/50">
                <Shield className="w-3 h-3" />
                Browser-side processing
              </span>
              <span className="text-xs text-neutral-400">•</span>
              <span className="text-xs text-neutral-400">100% Free Forever</span>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200 mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {(Object.keys(CATEGORIES) as ToolCategoryKey[]).slice(0, 5).map((key) => (
                <li key={key}>
                  <Link
                    href={`/tools/category/${key}`}
                    className="text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {CATEGORIES[key].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200 mb-3">
              Popular Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/tools/image-compressor"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/image-resizer"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Image Resizer
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/youtube-thumbnail-downloader"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  YouTube Thumbnails
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/url-shortener"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  URL Shortener
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/word-counter"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Word Counter
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/qr-code-generator"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  QR Code Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200 mb-3">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/about"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  About MyToolsHut
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <p>© 2026 MyToolsHut. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              Engineered with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for creators & developers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
