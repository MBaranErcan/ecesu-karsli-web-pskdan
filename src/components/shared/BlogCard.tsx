import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  excerpt: string;
  href: string;
  date: string;
  readingTime: string;
  categoryName?: string | null;
  categoryHref?: string | null;
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
}

export function BlogCard({
  title,
  excerpt,
  href,
  date,
  readingTime,
  categoryName,
  coverImageUrl,
  coverImageAlt,
}: BlogCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200/70 bg-white transition-colors duration-200 hover:border-ice-300">
      {coverImageUrl ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-ice-50">
          <Image
            src={coverImageUrl}
            alt={coverImageAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        {categoryName ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-ice-700">
            {categoryName}
          </p>
        ) : null}
        <h3 className="font-serif text-xl leading-snug text-ink-900">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-600">{excerpt}</p>
        <p className="mt-5 flex flex-wrap items-center gap-2 text-xs text-ink-500">
          <time>{date}</time>
          <span aria-hidden="true">·</span>
          <span>{readingTime}</span>
        </p>
      </div>
    </article>
  );
}
