import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generateToolMetadata("url-shortener");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
