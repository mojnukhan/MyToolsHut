import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generateToolMetadata("password-generator");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
