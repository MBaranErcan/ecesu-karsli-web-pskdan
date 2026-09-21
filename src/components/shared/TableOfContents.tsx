import type { TocItem } from "@/lib/markdown";
import { cn } from "@/lib/utils";

export function TableOfContents({ items, title }: { items: TocItem[]; title: string }) {
  if (items.length < 3) return null;

  return (
    <nav aria-labelledby="toc-title" className="rounded-2xl border border-ink-200/70 bg-white p-5">
      <h2 id="toc-title" className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
        {title}
      </h2>
      <ol className="mt-4 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id} className={cn(item.level === 3 && "pl-4")}>
            <a
              href={`#${item.id}`}
              className="text-ink-600 underline-offset-4 transition-colors hover:text-ice-800 hover:underline"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
