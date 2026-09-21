import Link from "next/link";
import { Container } from "@/components/ui/Container";

export interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  brandName: string;
  brandTitle: string;
  description: string;
  homeHref: string;
  columns: { title: string; links: FooterLink[] }[];
  social: FooterLink[];
  socialTitle: string;
  disclaimer: string;
  rights: string;
}

export function Footer({
  brandName,
  brandTitle,
  description,
  homeHref,
  columns,
  social,
  socialTitle,
  disclaimer,
  rights,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-ink-200/70 bg-sand-50">
      <Container size="wide" className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href={homeHref} className="flex flex-col leading-tight">
              <span className="font-serif text-xl text-ink-900">{brandName}</span>
              <span className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-500">
                {brandTitle}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">{description}</p>
            {social.length ? (
              <div className="mt-6">
                <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
                  {socialTitle}
                </h2>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {social.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="text-sm text-ice-700 underline-offset-4 hover:underline"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-700 underline-offset-4 transition-colors hover:text-ice-800 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-ink-200/70 pt-6">
          <p className="max-w-3xl text-xs leading-relaxed text-ink-500">{disclaimer}</p>
          <p className="mt-4 text-xs text-ink-500">
            © {year} {brandName}. {rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
