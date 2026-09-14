"use client";

import React, { useState, useRef } from "react";
import { Upload, ArrowRight, Download, Trash2, CheckCircle2 } from "lucide-react";
import { getToolBySlug } from "@/lib/tools/registry";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Button } from "@/components/ui/Button";
import { formatBytes } from "@/lib/utils";

interface ConvertedFile {
  id: string;
  name: string;
  originalSize: number;
  newSize: number;
  previewUrl: string;
  blob: Blob;
}

export default function JpgToPngPage() {
  const tool = getToolBySlug("jpg-to-png")!;
  const [files, setFiles] = useState<ConvertedFile[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (fileList: FileList | File[]) => {
    const valid = Array.from(fileList).filter((f) =>
      ["image/jpeg", "image/jpg"].includes(f.type) || f.name.toLowerCase().endsWith(".jpg") || f.name.toLowerCase().endsWith(".jpeg")
    );

    if (valid.length === 0) return;
    setIsConverting(true);

    const results: ConvertedFile[] = [];

    for (const file of valid) {
      await new Promise<void>((resolve) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
          URL.revokeObjectURL(url);
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
              if (blob) {
                const baseName = file.name.replace(/\.[^/.]+$/, "");
                results.push({
                  id: Math.random().toString(36).substring(2, 9),
                  name: `${baseName}.png`,
                  originalSize: file.size,
                  newSize: blob.size,
                  previewUrl: URL.createObjectURL(blob),
                  blob,
                });
              }
              resolve();
            }, "image/png");
          } else {
            resolve();
          }
        };

        img.onerror = () => {
          URL.revokeObjectURL(url);
          resolve();
        };

        img.src = url;
      });
    }

    setFiles((prev) => [...prev, ...results]);
    setIsConverting(false);
  };

  const handleDownload = (item: ConvertedFile) => {
    const a = document.createElement("a");
    a.href = item.previewUrl;
    a.download = item.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAll = () => {
    files.forEach((f) => handleDownload(f));
  };

  const handleClear = () => {
    files.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    setFiles([]);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Upload area */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-indigo-500 rounded-2xl p-10 text-center bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 transition-all cursor-pointer group"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/jpg"
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
            Upload JPG / JPEG images to convert to PNG
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Batch conversion supported. Lossless PNG output generated directly in your browser.
          </p>
        </div>

        {/* Action Header */}
        {files.length > 0 && (
          <div className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{files.length} {files.length === 1 ? "image" : "images"} converted to PNG</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleClear}>
                <Trash2 className="w-3.5 h-3.5 text-neutral-500" />
                Clear
              </Button>
              <Button variant="primary" size="sm" onClick={handleDownloadAll}>
                <Download className="w-3.5 h-3.5" />
                Download All ({files.length})
              </Button>
            </div>
          </div>
        )}

        {/* Converted Files List */}
        {files.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {files.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 overflow-hidden border border-neutral-200 dark:border-neutral-700 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.previewUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate max-w-[180px]">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      PNG • {formatBytes(item.newSize)}
                    </p>
                  </div>
                </div>

                <Button variant="outline" size="sm" onClick={() => handleDownload(item)}>
                  <Download className="w-3.5 h-3.5" />
                  Save
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
