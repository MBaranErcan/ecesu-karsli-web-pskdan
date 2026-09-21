"use client";

import { useState } from "react";

export function CopyableUrl({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        } catch {
          setCopied(false);
        }
      }}
      className="w-full truncate rounded-lg bg-ink-50 px-3 py-2 text-left text-xs text-ink-600 transition-colors hover:bg-ink-100"
      title={url}
    >
      {copied ? "Bağlantı kopyalandı" : url}
    </button>
  );
}
