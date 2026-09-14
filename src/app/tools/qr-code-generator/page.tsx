"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import {
  QrCode as QrCodeIcon,
  Download,
  Copy,
  Check,
  Globe,
  FileText,
  Wifi,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import { getToolBySlug } from "@/lib/tools/registry";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Button } from "@/components/ui/Button";

type QRDataType = "url" | "text" | "wifi" | "email" | "phone";

export default function QrCodeGeneratorPage() {
  const tool = getToolBySlug("qr-code-generator")!;
  const [dataType, setDataType] = useState<QRDataType>("url");
  const [url, setUrl] = useState("https://toolnest.site");
  const [text, setText] = useState("");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState("WPA");
  const [email, setEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [phone, setPhone] = useState("");

  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrSize, setQrSize] = useState<number>(300);
  const [errorCorrection, setErrorCorrection] = useState<"L" | "M" | "Q" | "H">("M");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Compute raw payload based on type
  const getPayload = (): string => {
    switch (dataType) {
      case "url":
        return url.trim() || "https://toolnest.site";
      case "text":
        return text.trim() || "ToolNest Free Online Tools";
      case "wifi":
        return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;`;
      case "email":
        return `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case "phone":
        return `tel:${phone}`;
      default:
        return url;
    }
  };

  useEffect(() => {
    const payload = getPayload();
    if (!payload) return;

    QRCode.toDataURL(payload, {
      width: qrSize,
      margin: 2,
      color: {
        dark: fgColor,
        light: bgColor,
      },
      errorCorrectionLevel: errorCorrection,
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error(err));
  }, [dataType, url, text, wifiSsid, wifiPassword, wifiEncryption, email, emailSubject, emailBody, phone, fgColor, bgColor, qrSize, errorCorrection]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `toolnest-qrcode-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopy = () => {
    if (!qrDataUrl) return;
    // Copy image blob to clipboard
    fetch(qrDataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        navigator.clipboard.writeText(getPayload());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  };

  const tabs: { type: QRDataType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { type: "url", label: "Website URL", icon: Globe },
    { type: "text", label: "Plain Text", icon: FileText },
    { type: "wifi", label: "WiFi Network", icon: Wifi },
    { type: "email", label: "Email", icon: Mail },
    { type: "phone", label: "Phone", icon: Phone },
  ];

  return (
    <ToolLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Data type tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = dataType === tab.type;
              return (
                <button
                  key={tab.type}
                  type="button"
                  onClick={() => setDataType(tab.type)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Type-specific inputs */}
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 p-5 space-y-4">
            {dataType === "url" && (
              <div>
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                  Target Website URL:
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            )}

            {dataType === "text" && (
              <div>
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                  Plain Text Content:
                </label>
                <textarea
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type any message, instructions, or notes to encode in the QR code..."
                  className="w-full p-3 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            )}

            {dataType === "wifi" && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Network Name (SSID):
                  </label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    placeholder="MyHomeWifi"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Password:
                    </label>
                    <input
                      type="text"
                      value={wifiPassword}
                      onChange={(e) => setWifiPassword(e.target.value)}
                      placeholder="WifiPassword123"
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Encryption:
                    </label>
                    <select
                      value={wifiEncryption}
                      onChange={(e) => setWifiEncryption(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                    >
                      <option value="WPA">WPA/WPA2/WPA3</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None (Open)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {dataType === "email" && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Recipient Email:
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@example.com"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Subject:
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Inquiry from QR"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                  />
                </div>
              </div>
            )}

            {dataType === "phone" && (
              <div>
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                />
              </div>
            )}
          </div>

          {/* Customization Options (Colors, Resolution) */}
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Style & Colors
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">
                  Foreground Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-neutral-200 dark:border-neutral-700 p-0.5 cursor-pointer"
                  />
                  <span className="text-xs font-mono">{fgColor}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-neutral-200 dark:border-neutral-700 p-0.5 cursor-pointer"
                  />
                  <span className="text-xs font-mono">{bgColor}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-1.5">
                  Error Correction
                </label>
                <select
                  value={errorCorrection}
                  onChange={(e) => setErrorCorrection(e.target.value as typeof errorCorrection)}
                  className="w-full px-2.5 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview Column */}
        <div className="lg:col-span-5 flex flex-col items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6">
          <div className="w-full flex flex-col items-center">
            <span className="text-xs font-semibold text-neutral-400 mb-4 uppercase tracking-wider">
              Live QR Preview
            </span>

            {/* QR Card Container */}
            <div
              className="p-4 rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-800 transition-all flex items-center justify-center"
              style={{ backgroundColor: bgColor }}
            >
              {qrDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrDataUrl}
                  alt="Generated QR Code"
                  className="w-56 h-56 object-contain"
                />
              ) : (
                <div className="w-56 h-56 flex items-center justify-center text-neutral-400">
                  Generating...
                </div>
              )}
            </div>
          </div>

          <div className="w-full mt-6 space-y-2.5">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4" />
              <span>Download High-Res PNG</span>
            </Button>
            <Button
              variant="outline"
              size="md"
              className="w-full"
              onClick={handleCopy}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied to Clipboard" : "Copy to Clipboard"}</span>
            </Button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
