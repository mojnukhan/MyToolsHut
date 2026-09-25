import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/utils";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Contact Us — Support, Inquiries & Feedback | MyToolsHut",
  description:
    "Get in touch with the MyToolsHut engineering and support team. Send feature requests, bug reports, DMCA notices, or business inquiries.",
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: "Contact Us | MyToolsHut",
    description: "Get in touch with the MyToolsHut support team.",
    url: `${siteUrl}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
