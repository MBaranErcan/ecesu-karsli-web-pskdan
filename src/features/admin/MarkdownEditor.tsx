"use client";

import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FieldHint, Label } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

interface MarkdownEditorProps {
  name: string;
  label: string;
  hint?: string;
  required?: boolean;
  defaultValue?: string | null;
  rows?: number;
}

type Tool =
  | { kind: "wrap"; label: string; title: string; before: string; after: string }
  | { kind: "prefix"; label: string; title: string; prefix: string };

const tools: Tool[] = [
  { kind: "prefix", label: "H2", title: "Ana başlık", prefix: "## " },
  { kind: "prefix", label: "H3", title: "Alt başlık", prefix: "### " },
  { kind: "wrap", label: "K", title: "Kalın", before: "**", after: "**" },
  { kind: "wrap", label: "İ", title: "İtalik", before: "_", after: "_" },
  { kind: "prefix", label: "•", title: "Madde listesi", prefix: "- " },
  { kind: "prefix", label: "1.", title: "Numaralı liste", prefix: "1. " },
  { kind: "prefix", label: "❝", title: "Alıntı", prefix: "> " },
  { kind: "wrap", label: "🔗", title: "Bağlantı", before: "[", after: "](/tr/)" },
];

/** Markdown yazmayı kolaylaştıran araç çubuğu ve canlı önizleme. */
export function MarkdownEditor({
  name,
  label,
  hint,
  required,
  defaultValue,
  rows = 20,
}: MarkdownEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(defaultValue ?? "");
  const [preview, setPreview] = useState(false);

  const apply = (tool: Tool) => {
    const textarea = ref.current;
    if (!textarea) return;

    const { selectionStart: start, selectionEnd: end } = textarea;
    const selected = value.slice(start, end);
    let next: string;
    let cursor: number;

    if (tool.kind === "wrap") {
      next = `${value.slice(0, start)}${tool.before}${selected}${tool.after}${value.slice(end)}`;
      cursor = start + tool.before.length + selected.length;
    } else {
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      next = `${value.slice(0, lineStart)}${tool.prefix}${value.slice(lineStart)}`;
      cursor = end + tool.prefix.length;
    }

    setValue(next);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(cursor, cursor);
    });
  };

  const buttonClass =
    "rounded-lg px-2.5 py-1.5 text-sm text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900";

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <Label htmlFor={name}>{label}</Label>
        <button
          type="button"
          onClick={() => setPreview((current) => !current)}
          className={cn(buttonClass, preview && "bg-ink-900 text-white hover:bg-ink-800 hover:text-white")}
        >
          {preview ? "Düzenlemeye dön" : "Önizleme"}
        </button>
      </div>

      {!preview ? (
        <div className="mb-2 flex flex-wrap gap-1 rounded-xl border border-ink-200 bg-ink-50 p-1.5">
          {tools.map((tool) => (
            <button
              key={tool.label}
              type="button"
              title={tool.title}
              aria-label={tool.title}
              onClick={() => apply(tool)}
              className={buttonClass}
            >
              {tool.label}
            </button>
          ))}
        </div>
      ) : null}

      {preview ? (
        <div className="prose-content min-h-64 rounded-xl border border-ink-200 bg-white px-5 py-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
        </div>
      ) : null}

      <textarea
        ref={ref}
        id={name}
        name={name}
        rows={rows}
        required={required}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-describedby={hint ? `${name}-hint` : undefined}
        className={cn(
          "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 font-mono text-[0.9rem] leading-relaxed text-ink-900 transition-colors focus:border-ice-500 focus:outline-none",
          preview && "sr-only",
        )}
      />

      {hint ? <FieldHint id={`${name}-hint`}>{hint}</FieldHint> : null}
    </div>
  );
}
