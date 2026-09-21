import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/i18n";
import { defaultLocale } from "@/i18n/config";
import { href } from "@/i18n/routes";

/**
 * Bu boundary, dil segmenti çözümlendikten sonra devreye girer.
 * Metinler varsayılan dilde gösterilir; bağlantılar site geneline yönlendirir.
 */
export default function NotFound() {
  const locale = defaultLocale;
  const dict = getDictionary(locale);

  const links = [
    { label: dict.nav.services, href: href(locale, "services") },
    { label: dict.nav.blog, href: href(locale, "blog") },
    { label: dict.nav.faq, href: href(locale, "faq") },
    { label: dict.nav.contact, href: href(locale, "contact") },
  ];

  return (
    <Container size="narrow" className="py-24 text-center sm:py-32">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ice-700">404</p>
      <h1 className="mt-4 font-serif text-[2rem] leading-tight text-ink-900 sm:text-[2.5rem]">
        {dict.notFound.title}
      </h1>
      <p className="mx-auto mt-5 max-w-lg text-[1.05rem] leading-relaxed text-ink-600">
        {dict.notFound.body}
      </p>
      <div className="mt-8">
        <ButtonLink href={href(locale, "home")} size="lg">
          {dict.notFound.cta}
        </ButtonLink>
      </div>
      <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-ice-700 underline-offset-4 hover:text-ice-900 hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
