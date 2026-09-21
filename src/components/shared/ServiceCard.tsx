import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  cta: string;
}

export function ServiceCard({ title, description, href, cta }: ServiceCardProps) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-ink-200/70 bg-white p-6 transition-colors duration-200 hover:border-ice-300">
      <h3 className="font-serif text-xl leading-snug text-ink-900">
        <Link href={href} className="after:absolute after:inset-0 after:content-['']">
          {title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-600">{description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ice-700 transition-colors group-hover:text-ice-900">
        {cta}
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </article>
  );
}
