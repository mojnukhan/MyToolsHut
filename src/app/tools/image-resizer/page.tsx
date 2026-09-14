"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Maximize2,
  Lock,
  Unlock,
  Download,
  Trash2,
  RotateCw,
  Sparkles,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools/registry";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Button } from "@/components/ui/Button";
import { formatBytes } from "@/lib/utils";

const PRESETS = [
  { name: "Instagram Square", w: 1080, h: 1080 },
  { name: "Instagram Story / Reel", w: 1080, h: 1920 },
  { name: "YouTube Thumbnail", w: 1280, h: 720 },
  { name: "YouTube Banner", w: 2560, h: 1440 },
  { name: "Facebook Cover", w: 820, h: 312 },
  { name: "TikTok Video", w: 1080, h: 1920 },
  { name: "LinkedIn Banner", w: 1584, h: 396 },
  { name: "Twitter / X Header", w: 1500, h: 500 },
];

export default function ImageResizerPage() {
  const tool = getToolBySlug("image-resizer")!;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg");
  const [quality, setQuality] = useState<number>(90);
  const [isResizing, setIsResizing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImageSrc(url);

    const img = new Image();
    img.onload = () => {
      setOriginalWidth(img.naturalWidth);
      setOriginalHeight(img.naturalHeight);
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
    };
    img.src = url;
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockAspectRatio && originalWidth > 0 && originalHeight > 0) {
      const ratio = originalHeight / originalWidth;
      setHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockAspectRatio && originalWidth > 0 && originalHeight > 0) {
      const ratio = originalWidth / originalHeight;
      setWidth(Math.round(val * ratio));
    }
  };

  const handlePresetSelect = (w: number, h: number) => {
    setWidth(w);
    setHeight(h);
    setLockAspectRatio(false);
  };

  const handlePercentageScale = (percent: number) => {
    if (originalWidth > 0 && originalHeight > 0) {
      setWidth(Math.round((originalWidth * percent) / 100));
      setHeight(Math.round((originalHeight * percent) / 100));
    }
  };

  const handleDownload = () => {
    if (!imageSrc || width <= 0 || height <= 0) return;
    setIsResizing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setIsResizing(false);
        return;
      }

      // Smooth resizing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      if (format === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          setIsResizing(false);
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          const ext = format === "image/webp" ? ".webp" : format === "image/png" ? ".png" : ".jpg";
          const baseName = imageFile?.name ? imageFile.name.substring(0, imageFile.name.lastIndexOf(".")) : "resized";
          a.download = `${baseName}-${width}x${height}${ext}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        },
        format,
        quality / 100
      );
    };
    img.src = imageSrc;
  };

  const handleClear = () => {
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    setImageFile(null);
    setImageSrc(null);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setWidth(0);
    setHeight(0);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {!imageSrc ? (
          /* Dropzone */
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files?.[0]) handleFileChange(e.dataTransfer.files[0]);
            }}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-indigo-500 rounded-2xl p-10 sm:p-16 text-center bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 transition-all cursor-pointer group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFileChange(e.target.files[0]);
                e.target.value = "";
              }}
            />
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-7 h-7" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Drop an image to resize, or <span className="text-indigo-600 dark:text-indigo-400 underline underline-offset-2">browse</span>
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Supports JPG, PNG, WebP. High-res files processed locally without uploading.
            </p>
          </div>
        ) : (
          /* Resizer Controls & Preview */
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Controls Column */}
              <div className="lg:col-span-5 space-y-6">
                {/* Dimensions Controls */}
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      Dimensions (Pixels)
                    </h3>
                    <button
                      type="button"
                      onClick={() => setLockAspectRatio(!lockAspectRatio)}
                      className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                        lockAspectRatio
                          ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400"
                          : "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-500"
                      }`}
                      title="Toggle aspect ratio lock"
                    >
                      {lockAspectRatio ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                      <span>{lockAspectRatio ? "Locked Ratio" : "Unlocked"}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 block mb-1">
                        Width (px)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10000"
                        value={width}
                        onChange={(e) => handleWidthChange(Math.max(1, Number(e.target.value)))}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 font-mono text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 block mb-1">
                        Height (px)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10000"
                        value={height}
                        onChange={(e) => handleHeightChange(Math.max(1, Number(e.target.value)))}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 font-mono text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Percentage Quick Scaling */}
                  <div>
                    <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 block mb-1.5">
                      Quick Percentage Resize
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {[25, 50, 75, 150, 200].map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => handlePercentageScale(pct)}
                          className="px-2.5 py-1 text-xs font-medium rounded-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Social Media Presets */}
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-5 space-y-3">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    Social Media Presets
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => handlePresetSelect(preset.w, preset.h)}
                        className="text-left p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors"
                      >
                        <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block truncate">
                          {preset.name}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {preset.w} × {preset.h}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Output Options */}
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 block mb-1">
                        Format
                      </label>
                      <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value as typeof format)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                      >
                        <option value="image/jpeg">JPG</option>
                        <option value="image/png">PNG</option>
                        <option value="image/webp">WebP</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 block mb-1">
                        Quality: {quality}%
                      </label>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={quality}
                        onChange={(e) => setQuality(Number(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer mt-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    className="flex-1"
                    onClick={handleDownload}
                    isLoading={isResizing}
                  >
                    <Download className="w-4 h-4" />
                    Download Resized Image
                  </Button>
                  <Button variant="ghost" size="md" onClick={handleClear}>
                    <Trash2 className="w-4 h-4 text-neutral-500" />
                  </Button>
                </div>
              </div>

              {/* Live Preview Column */}
              <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-5">
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs text-neutral-500">
                    <span>
                      Original: <strong>{originalWidth} × {originalHeight} px</strong> ({imageFile ? formatBytes(imageFile.size) : ""})
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      Target: {width} × {height} px
                    </span>
                  </div>

                  {/* Preview container */}
                  <div className="w-full aspect-video rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-200/50 dark:bg-neutral-900 flex items-center justify-center overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageSrc}
                      alt="Preview"
                      className="max-w-full max-h-full object-contain transition-all"
                    />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                  <span>Processed on client-side canvas</span>
                  <span>Zero image uploads</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
