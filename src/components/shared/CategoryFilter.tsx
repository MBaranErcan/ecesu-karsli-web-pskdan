import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  allLabel: string;
  allHref: string;
  items: { name: string; href: string; slug: string }[];
  activeSlug?: string | null;
  label: string;
}

export function CategoryFilter({
  allLabel,
  allHref,
  items,
  activeSlug,
  label,
}: CategoryFilterProps) {
  const chip = "rounded-full px-4 py-2 text-sm transition-colors";

  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href={allHref}
            aria-current={!activeSlug ? "page" : undefined}
            className={cn(
              chip,
              !activeSlug ? "bg-ice-700 text-white" : "bg-white text-ink-600 ring-1 ring-ink-200 hover:ring-ice-300",
            )}
          >
            {allLabel}
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={item.href}
              aria-current={activeSlug === item.slug ? "page" : undefined}
              className={cn(
                chip,
                activeSlug === item.slug
                  ? "bg-ice-700 text-white"
                  : "bg-white text-ink-600 ring-1 ring-ink-200 hover:ring-ice-300",
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
