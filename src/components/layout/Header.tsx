"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/i18n/config";

export interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  locale: Locale;
  brandName: string;
  brandTitle: string;
  homeHref: string;
  items: NavItem[];
  ctaLabel: string;
  ctaHref: string;
  labels: {
    openMenu: string;
    closeMenu: string;
    mainNav: string;
    language: string;
  };
}

export function Header({
  locale,
  brandName,
  brandTitle,
  homeHref,
  items,
  ctaLabel,
  ctaHref,
  labels,
}: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === homeHref ? pathname === href : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-ink-200/80 bg-white/90 backdrop-blur-md"
          : "border-transparent bg-canvas",
      )}
    >
      <Container size="wide">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <Link href={homeHref} className="group flex flex-col leading-tight">
            <span className="font-serif text-lg text-ink-900 sm:text-xl">{brandName}</span>
            <span className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-500">
              {brandTitle}
            </span>
          </Link>

          <nav aria-label={labels.mainNav} className="hidden items-center gap-0.5 lg:flex">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-2 text-[0.92rem] transition-colors",
                  isActive(item.href)
                    ? "text-ice-800"
                    : "text-ink-600 hover:bg-ice-50 hover:text-ice-800",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LanguageSwitcher locale={locale} label={labels.language} />
            </div>
            <Link
              href={ctaHref}
              data-analytics="randevu_cta"
              className={cn(buttonClasses("primary", "sm"), "hidden whitespace-nowrap sm:inline-flex")}
            >
              {ctaLabel}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? labels.closeMenu : labels.openMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ice-50 lg:hidden"
            >
              <span className="relative block h-4 w-5" aria-hidden="true">
                <span
                  className={cn(
                    "absolute left-0 block h-[1.5px] w-5 bg-current transition-transform duration-200",
                    open ? "top-1/2 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1/2 block h-[1.5px] w-5 -translate-y-1/2 bg-current transition-opacity duration-200",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-[1.5px] w-5 bg-current transition-transform duration-200",
                    open ? "top-1/2 -rotate-45" : "bottom-0",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-ink-200/70 bg-white lg:hidden">
          <Container size="wide">
            <nav aria-label={labels.mainNav} className="flex flex-col py-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-3 py-3 text-[1.02rem] transition-colors",
                    isActive(item.href) ? "bg-ice-50 text-ice-800" : "text-ink-700 hover:bg-ink-50",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3 border-t border-ink-100 pt-4">
                <LanguageSwitcher locale={locale} label={labels.language} />
                <Link
                  href={ctaHref}
                  data-analytics="randevu_cta"
                  onClick={() => setOpen(false)}
                  className={buttonClasses("primary", "md", "w-full")}
                >
                  {ctaLabel}
                </Link>
              </div>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
