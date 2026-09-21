"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  url: string;
  title: string;
  labels: { share: string; copyLink: string; copied: string };
}

export function ShareButtons({ url, title, labels }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const targets = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
  ];

  const itemClass =
    "rounded-full border border-ink-200 px-3.5 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-ice-300 hover:text-ice-800";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">
        {labels.share}
      </span>
      {targets.map((target) => (
        <a
          key={target.label}
          href={target.href}
          target="_blank"
          rel="noopener noreferrer"
          className={itemClass}
        >
          {target.label}
        </a>
      ))}
      <button type="button" onClick={copy} className={cn(itemClass, copied && "border-ice-400 text-ice-800")}>
        {copied ? labels.copied : labels.copyLink}
      </button>
    </div>
  );
}
