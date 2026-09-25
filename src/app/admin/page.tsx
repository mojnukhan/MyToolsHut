"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  Lock,
  Key,
  Layers,
  Link2,
  MousePointerClick,
  Activity,
  LogOut,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Database,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AdminData {
  totalShortUrls: number;
  totalClicks: number;
  recentUrls: Array<{
    id: string;
    originalUrl: string;
    shortCode: string;
    customAlias: string | null;
    clicks: number;
    createdAt: string;
  }>;
  totalTools: number;
  implementedTools: number;
  localTools: number;
  categoryStats: Array<{
    name: string;
    key: string;
    count: number;
  }>;
  systemHealth: {
    database: string;
    nodeVersion: string;
    platform: string;
    memoryHeapUsed: string;
    uptimeSeconds: number;
  };
}

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminKey, setAdminKey] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [data, setData] = useState<AdminData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  const fetchDashboardData = async () => {
    setIsLoadingData(true);
    try {
      const res = await fetch("/api/admin/data");
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setIsAuthenticated(true);
      } else if (res.status === 401) {
        setIsAuthenticated(false);
      }
    } catch {
      // Don't flip isAuthenticated to false on transient network error if already authenticated
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const trimmedKey = adminKey.trim();
    if (!trimmedKey) {
      setAuthError("Please enter the admin secret key.");
      return;
    }
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: trimmedKey }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        setAdminKey("");
        await fetchDashboardData();
      } else {
        const errJson = await res.json();
        setAuthError(errJson.error || "Authentication failed. Invalid secret key.");
      }
    } catch {
      setAuthError("Network error. Could not authenticate.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setData(null);
  };

  // If unauthenticated: Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl space-y-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-neutral-900 dark:text-white">
              MyToolsHut Admin Portal
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Enter your administrative secret key to access system metrics and link management.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                Admin Secret Key:
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="Enter secret key..."
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <Key className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 p-3 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-900/50">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoggingIn}
            >
              <Lock className="w-4 h-4" />
              <span>Unlock Admin Dashboard</span>
            </Button>
          </form>

          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 text-center">
            <Link
              href="/"
              className="text-xs text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              ← Return to MyToolsHut Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated: Full Dashboard
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-2xl font-black text-neutral-900 dark:text-white">
                Admin Control Center
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50">
                ADMIN ROLE
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              Real-time platform statistics, short URL tracking, and database telemetry.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchDashboardData}
              isLoading={isLoadingData}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-semibold">Total Tools</span>
              <Layers className="w-4 h-4 text-indigo-600" />
            </div>
            <span className="text-3xl font-black text-neutral-900 dark:text-white">
              {data?.totalTools ?? 0}
            </span>
            <span className="block text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
              {data?.implementedTools ?? 0} active & working
            </span>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-semibold">Short URLs Created</span>
              <Link2 className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-3xl font-black text-neutral-900 dark:text-white">
              {data?.totalShortUrls ?? 0}
            </span>
            <span className="block text-[11px] text-neutral-400 mt-1">
              Active in database
            </span>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-semibold">Total URL Clicks</span>
              <MousePointerClick className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-3xl font-black text-neutral-900 dark:text-white">
              {data?.totalClicks ?? 0}
            </span>
            <span className="block text-[11px] text-neutral-400 mt-1">
              Redirects tracked
            </span>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-semibold">Client-Side Tools</span>
              <CheckCircle2 className="w-4 h-4 text-cyan-600" />
            </div>
            <span className="text-3xl font-black text-neutral-900 dark:text-white">
              {data?.localTools ?? 0}
            </span>
            <span className="block text-[11px] text-neutral-400 mt-1">
              100% in-browser privacy
            </span>
          </div>
        </div>

        {/* Short URLs Management Table */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                Recent Short URLs & Click Stats
              </h2>
              <p className="text-xs text-neutral-500">
                Latest shortened links generated through MyToolsHut
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 font-semibold">
                <tr>
                  <th className="pb-3">Short Code</th>
                  <th className="pb-3">Original URL</th>
                  <th className="pb-3 text-center">Clicks</th>
                  <th className="pb-3">Created</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                {data?.recentUrls && data.recentUrls.length > 0 ? (
                  data.recentUrls.map((link) => (
                    <tr key={link.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                      <td className="py-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        /s/{link.shortCode}
                      </td>
                      <td className="py-3 truncate max-w-xs text-neutral-600 dark:text-neutral-300 font-mono text-[11px]">
                        {link.originalUrl}
                      </td>
                      <td className="py-3 text-center">
                        <span className="px-2 py-0.5 rounded-full font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                          {link.clicks}
                        </span>
                      </td>
                      <td className="py-3 text-neutral-400 text-[11px]">
                        {new Date(link.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-right">
                        <a
                          href={`/s/${link.shortCode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          <span>Test</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-neutral-400">
                      No shortened URLs created yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health */}
        {data?.systemHealth && (
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 p-6 space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span>System & Database Health</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-400 block mb-1">Database Provider</span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-1">
                  <Database className="w-3.5 h-3.5 text-indigo-500" />
                  {data.systemHealth.database}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-400 block mb-1">Node Environment</span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono">
                  {data.systemHealth.nodeVersion}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-400 block mb-1">Heap Memory Used</span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono">
                  {data.systemHealth.memoryHeapUsed}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-400 block mb-1">Process Uptime</span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono">
                  {data.systemHealth.uptimeSeconds}s
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
