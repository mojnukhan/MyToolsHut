import React from "react";
import {
  Minimize2,
  Maximize2,
  ArrowRightLeft,
  ArrowLeftRight,
  Link,
  Link2,
  FileSpreadsheet,
  QrCode,
  KeyRound,
  Braces,
  Binary,
  Scale,
  FileCode,
  Image,
  Type,
  Code,
  Search,
  RefreshCw,
  Wrench,
  FileText,
  HelpCircle,
  LucideProps,
} from "lucide-react";

function YoutubeIcon(props: LucideProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={props.size || 24}
      height={props.size || 24}
      className={props.className}
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Minimize2,
  Maximize2,
  ArrowRightLeft,
  ArrowLeftRight,
  Youtube: YoutubeIcon,
  Link,
  Link2,
  FileSpreadsheet,
  QrCode,
  KeyRound,
  Braces,
  Binary,
  Scale,
  FileCode,
  Image,
  Type,
  Code,
  Search,
  RefreshCw,
  Wrench,
  FileText,
};

export function DynamicIcon({
  name,
  className = "w-5 h-5",
  ...props
}: {
  name: string;
  className?: string;
} & LucideProps) {
  const IconComponent = ICON_MAP[name] || HelpCircle;
  return <IconComponent className={className} {...props} />;
}
