"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  Upload,
  Image as ImageIcon,
  Download,
  Trash2,
  Sliders,
  CheckCircle2,
  ArrowDown,
  RefreshCw,
  Eye,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools/registry";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Button } from "@/components/ui/Button";
import { formatBytes } from "@/lib/utils";

interface CompressedItem {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  compressedSize: number;
  compressedBlob: Blob | null;
  previewUrl: string;
  compressedUrl: string | null;
  savedPercent: number;
  width: number;
  height: number;
  status: "pending" | "processing" | "done" | "error";
}

export default function ImageCompressorPage() {
  const tool = getToolBySlug("image-compressor")!;
  const [items, setItems] = useState<CompressedItem[]>([]);
  const [quality, setQuality] = useState<number>(75);
  const [outputFormat, setOutputFormat] = useState<"image/jpeg" | "image/webp" | "image/png">("image/jpeg");
  const [isProcessingAll, setIsProcessingAll] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compress single image on Canvas
  const processImage = useCallback(
    async (file: File, q: number, format: string): Promise<{ blob: Blob; width: number; height: number }> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
          URL.revokeObjectURL(url);
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Canvas context unavailable"));
            return;
          }

          // If JPEG, fill white background for transparent PNG source
          if (format === "image/jpeg") {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          ctx.drawImage(img, 0, 0);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve({ blob, width: img.naturalWidth, height: img.naturalHeight });
              } else {
                reject(new Error("Compression failed"));
              }
            },
            format,
            q / 100
          );
        };

        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error("Failed to load image"));
        };

        img.src = url;
      });
    },
    []
  );

  const handleFiles = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter((f) =>
      ["image/jpeg", "image/png", "image/webp"].includes(f.type)
    );

    if (validFiles.length === 0) return;

    const newItems: CompressedItem[] = validFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      name: file.name,
      originalSize: file.size,
      compressedSize: 0,
      compressedBlob: null,
      previewUrl: URL.createObjectURL(file),
      compressedUrl: null,
      savedPercent: 0,
      width: 0,
      height: 0,
      status: "pending",
    }));

    setItems((prev) => [...prev, ...newItems]);

    // Automatically compress newly added items
    for (const item of newItems) {
      try {
        const { blob, width, height } = await processImage(item.file, quality, outputFormat);
        const compUrl = URL.createObjectURL(blob);
        const saved = Math.max(0, Math.round(((item.originalSize - blob.size) / item.originalSize) * 100));

        setItems((current) =>
          current.map((it) =>
            it.id === item.id
              ? {
                  ...it,
                  compressedSize: blob.size,
                  compressedBlob: blob,
                  compressedUrl: compUrl,
                  savedPercent: saved,
                  width,
                  height,
                  status: "done",
                }
              : it
          )
        );
      } catch (err) {
        setItems((current) =>
          current.map((it) => (it.id === item.id ? { ...it, status: "error" } : it))
        );
      }
    }
  };

  const handleRecompressAll = async (newQuality: number, newFormat: typeof outputFormat) => {
    setIsProcessingAll(true);
    for (const item of items) {
      try {
        const { blob, width, height } = await processImage(item.file, newQuality, newFormat);
        const compUrl = URL.createObjectURL(blob);
        const saved = Math.max(0, Math.round(((item.originalSize - blob.size) / item.originalSize) * 100));

        setItems((current) =>
          current.map((it) =>
            it.id === item.id
              ? {
                  ...it,
                  compressedSize: blob.size,
                  compressedBlob: blob,
                  compressedUrl: compUrl,
                  savedPercent: saved,
                  width,
                  height,
                  status: "done",
                }
              : it
          )
        );
      } catch (err) {
        console.error(err);
      }
    }
    setIsProcessingAll(false);
  };

  const handleDownload = (item: CompressedItem) => {
    if (!item.compressedUrl) return;
    const a = document.createElement("a");
    a.href = item.compressedUrl;
    const ext = outputFormat === "image/webp" ? ".webp" : outputFormat === "image/png" ? ".png" : ".jpg";
    const baseName = item.name.substring(0, item.name.lastIndexOf(".")) || item.name;
    a.download = `${baseName}-compressed${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAll = () => {
    items.forEach((item) => {
      if (item.status === "done") {
        handleDownload(item);
      }
    });
  };

  const handleClear = () => {
    items.forEach((it) => {
      if (it.previewUrl) URL.revokeObjectURL(it.previewUrl);
      if (it.compressedUrl) URL.revokeObjectURL(it.compressedUrl);
    });
    setItems([]);
  };

  const totalOriginal = items.reduce((acc, it) => acc + it.originalSize, 0);
  const totalCompressed = items.reduce((acc, it) => acc + (it.compressedSize || it.originalSize), 0);
  const totalSavedPercent =
    totalOriginal > 0 ? Math.max(0, Math.round(((totalOriginal - totalCompressed) / totalOriginal) * 100)) : 0;

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Upload Dropzone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className="relative border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl p-8 sm:p-12 text-center bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 transition-all cursor-pointer group"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) handleFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-7 h-7" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
            Drop your images here, or <span className="text-indigo-600 dark:text-indigo-400 underline underline-offset-2">browse</span>
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 max-w-sm mx-auto">
            Supports JPG, PNG, and WebP up to high resolutions. Multi-file upload supported.
          </p>
        </div>

        {/* Compression Settings Bar */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Compression Quality: {quality}%
              </span>
              <span className="text-neutral-500 font-normal">
                {quality > 85 ? "Maximum Fidelity" : quality > 60 ? "Balanced (Recommended)" : "High Compression"}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              value={quality}
              onChange={(e) => {
                const val = Number(e.target.value);
                setQuality(val);
                if (items.length > 0) handleRecompressAll(val, outputFormat);
              }}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Format:</span>
              <select
                value={outputFormat}
                onChange={(e) => {
                  const fmt = e.target.value as typeof outputFormat;
                  setOutputFormat(fmt);
                  if (items.length > 0) handleRecompressAll(quality, fmt);
                }}
                className="text-xs font-medium px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
              >
                <option value="image/jpeg">JPG (Smallest)</option>
                <option value="image/webp">WebP (Modern)</option>
                <option value="image/png">PNG</option>
              </select>
            </div>

            {items.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRecompressAll(quality, outputFormat)}
                isLoading={isProcessingAll}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Re-compress
              </Button>
            )}
          </div>
        </div>

        {/* Global Summary & Action Bar when files are loaded */}
        {items.length > 0 && (
          <div className="rounded-xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/30 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-neutral-500 dark:text-neutral-400 block text-[11px]">Total Original</span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">{formatBytes(totalOriginal)}</span>
              </div>
              <ArrowDown className="w-4 h-4 text-neutral-400 shrink-0" />
              <div>
                <span className="text-neutral-500 dark:text-neutral-400 block text-[11px]">Compressed Total</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">{formatBytes(totalCompressed)}</span>
              </div>
              <div className="border-l border-indigo-200 dark:border-indigo-800/80 pl-4">
                <span className="text-neutral-500 dark:text-neutral-400 block text-[11px]">Saved</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">-{totalSavedPercent}%</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleClear}>
                <Trash2 className="w-3.5 h-3.5 text-neutral-500" />
                Clear
              </Button>
              <Button variant="primary" size="sm" onClick={handleDownloadAll}>
                <Download className="w-3.5 h-3.5" />
                Download All ({items.length})
              </Button>
            </div>
          </div>
        )}

        {/* Compressed Items List */}
        {items.length > 0 && (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs"
              >
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-14 h-14 rounded-lg bg-neutral-100 dark:bg-neutral-800 overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.compressedUrl || item.previewUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="truncate flex-1">
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate max-w-xs">
                      {item.name}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {item.width && item.height ? `${item.width} × ${item.height} px` : "Processing..."}
                    </p>
                  </div>
                </div>

                {/* Size Stats */}
                <div className="flex items-center gap-4 text-xs w-full sm:w-auto justify-between sm:justify-start">
                  <div className="text-right">
                    <span className="text-neutral-400 block text-[10px]">Before</span>
                    <span className="text-neutral-600 dark:text-neutral-300 font-medium">
                      {formatBytes(item.originalSize)}
                    </span>
                  </div>

                  <ArrowDown className="w-3.5 h-3.5 text-neutral-400" />

                  <div className="text-left">
                    <span className="text-neutral-400 block text-[10px]">After</span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {item.compressedSize ? formatBytes(item.compressedSize) : "..."}
                    </span>
                  </div>

                  {item.savedPercent > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50">
                      -{item.savedPercent}%
                    </span>
                  )}

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleDownload(item)}
                    disabled={item.status !== "done"}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
