import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { PageHeader } from "./PageHeader";
import { TableOfContents } from "./TableOfContents";
import { extractToc } from "@/lib/markdown";
import type { Crumb } from "./Breadcrumb";
import type { Page } from "@/lib/data/types";

interface ContentPageProps {
  page: Page;
  breadcrumb: { items: Crumb[]; label: string };
  tocTitle?: string;
  lastUpdatedLabel?: string;
  lastUpdatedValue?: string;
  children?: React.ReactNode;
}

/** Markdown gövdesi olan sabit sayfalar için ortak düzen. */
export function ContentPage({
  page,
  breadcrumb,
  tocTitle,
  lastUpdatedLabel,
  lastUpdatedValue,
  children,
}: ContentPageProps) {
  const toc = tocTitle && page.body ? extractToc(page.body) : [];

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        title={page.title}
        subtitle={page.subtitle}
        breadcrumb={breadcrumb}
      />
      <Container className="py-14 sm:py-16">
        <div
          className={
            toc.length >= 3
              ? "grid gap-12 lg:grid-cols-[1fr_16rem] lg:gap-16"
              : "mx-auto max-w-3xl"
          }
        >
          <div className={toc.length >= 3 ? "max-w-3xl" : undefined}>
            {lastUpdatedLabel && lastUpdatedValue ? (
              <p className="mb-8 text-sm text-ink-500">
                {lastUpdatedLabel}: {lastUpdatedValue}
              </p>
            ) : null}
            {page.body ? <Prose content={page.body} /> : null}
            {children}
          </div>
          {toc.length >= 3 && tocTitle ? (
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <TableOfContents items={toc} title={tocTitle} />
            </aside>
          ) : null}
        </div>
      </Container>
    </>
  );
}
