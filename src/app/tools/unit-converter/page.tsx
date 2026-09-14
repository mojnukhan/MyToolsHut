"use client";

import React, { useState, useMemo } from "react";
import { Scale, ArrowRightLeft, Ruler, Thermometer, HardDrive } from "lucide-react";
import { getToolBySlug } from "@/lib/tools/registry";
import { ToolLayout } from "@/components/tools/ToolLayout";

type UnitType = "length" | "weight" | "temperature" | "storage";

export default function UnitConverterPage() {
  const tool = getToolBySlug("unit-converter")!;
  const [type, setType] = useState<UnitType>("length");
  const [inputValue, setInputValue] = useState<string>("10");
  const [fromUnit, setFromUnit] = useState<string>("km");
  const [toUnit, setToUnit] = useState<string>("miles");

  const unitsByType: Record<UnitType, { id: string; label: string }[]> = {
    length: [
      { id: "m", label: "Meters (m)" },
      { id: "km", label: "Kilometers (km)" },
      { id: "cm", label: "Centimeters (cm)" },
      { id: "mm", label: "Millimeters (mm)" },
      { id: "miles", label: "Miles (mi)" },
      { id: "yards", label: "Yards (yd)" },
      { id: "feet", label: "Feet (ft)" },
      { id: "inches", label: "Inches (in)" },
    ],
    weight: [
      { id: "kg", label: "Kilograms (kg)" },
      { id: "g", label: "Grams (g)" },
      { id: "mg", label: "Milligrams (mg)" },
      { id: "lbs", label: "Pounds (lbs)" },
      { id: "oz", label: "Ounces (oz)" },
      { id: "ton", label: "Metric Ton (t)" },
    ],
    temperature: [
      { id: "c", label: "Celsius (°C)" },
      { id: "f", label: "Fahrenheit (°F)" },
      { id: "k", label: "Kelvin (K)" },
    ],
    storage: [
      { id: "b", label: "Bytes (B)" },
      { id: "kb", label: "Kilobytes (KB)" },
      { id: "mb", label: "Megabytes (MB)" },
      { id: "gb", label: "Gigabytes (GB)" },
      { id: "tb", label: "Terabytes (TB)" },
    ],
  };

  const handleTypeChange = (newType: UnitType) => {
    setType(newType);
    const available = unitsByType[newType];
    setFromUnit(available[0].id);
    setToUnit(available[1]?.id || available[0].id);
  };

  const convertedValue = useMemo(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return 0;

    // 1. Length (base: meters)
    if (type === "length") {
      const toMeters: Record<string, number> = {
        m: 1,
        km: 1000,
        cm: 0.01,
        mm: 0.001,
        miles: 1609.344,
        yards: 0.9144,
        feet: 0.3048,
        inches: 0.0254,
      };
      const meters = val * (toMeters[fromUnit] || 1);
      return meters / (toMeters[toUnit] || 1);
    }

    // 2. Weight (base: grams)
    if (type === "weight") {
      const toGrams: Record<string, number> = {
        kg: 1000,
        g: 1,
        mg: 0.001,
        lbs: 453.59237,
        oz: 28.349523,
        ton: 1000000,
      };
      const grams = val * (toGrams[fromUnit] || 1);
      return grams / (toGrams[toUnit] || 1);
    }

    // 3. Temperature
    if (type === "temperature") {
      let celsius = val;
      if (fromUnit === "f") celsius = ((val - 32) * 5) / 9;
      if (fromUnit === "k") celsius = val - 273.15;

      if (toUnit === "c") return celsius;
      if (toUnit === "f") return (celsius * 9) / 5 + 32;
      if (toUnit === "k") return celsius + 273.15;
      return celsius;
    }

    // 4. Digital Storage (base: bytes)
    if (type === "storage") {
      const toBytes: Record<string, number> = {
        b: 1,
        kb: 1024,
        mb: 1024 ** 2,
        gb: 1024 ** 3,
        tb: 1024 ** 4,
      };
      const bytes = val * (toBytes[fromUnit] || 1);
      return bytes / (toBytes[toUnit] || 1);
    }

    return 0;
  }, [type, inputValue, fromUnit, toUnit]);

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const tabs = [
    { id: "length", label: "Length", icon: Ruler },
    { id: "weight", label: "Weight", icon: Scale },
    { id: "temperature", label: "Temperature", icon: Thermometer },
    { id: "storage", label: "Digital Storage", icon: HardDrive },
  ];

  return (
    <ToolLayout tool={tool}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Category Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = type === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTypeChange(tab.id as UnitType)}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  active
                    ? "bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Converter Card */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-5 items-center gap-4">
            {/* From input */}
            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 block">
                From
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-3.5 py-2.5 text-base font-bold rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-mono text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 font-medium text-neutral-800 dark:text-neutral-200"
              >
                {unitsByType[type].map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center sm:col-span-1 pt-4 sm:pt-0">
              <button
                type="button"
                onClick={handleSwap}
                className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 transition-colors cursor-pointer"
                title="Swap units"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* To output */}
            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 block">
                To (Result)
              </label>
              <input
                type="text"
                readOnly
                value={
                  isNaN(convertedValue)
                    ? "0"
                    : parseFloat(convertedValue.toFixed(6)).toString()
                }
                className="w-full px-3.5 py-2.5 text-base font-bold rounded-xl border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/50 dark:bg-indigo-950/30 font-mono text-indigo-600 dark:text-indigo-400 select-all"
              />
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 font-medium text-neutral-800 dark:text-neutral-200"
              >
                {unitsByType[type].map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Formula summary */}
          <div className="p-3.5 rounded-xl border border-neutral-100 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-950/50 text-center text-xs text-neutral-500 font-mono">
            {inputValue || 0} {fromUnit} = {parseFloat(convertedValue.toFixed(6))} {toUnit}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
