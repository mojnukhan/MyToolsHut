import type { Metadata } from "next";
import { generateToolsCatalogMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generateToolsCatalogMetadata();

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
