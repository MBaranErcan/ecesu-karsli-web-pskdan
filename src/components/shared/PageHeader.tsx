import { Container } from "@/components/ui/Container";
import { Breadcrumb, type Crumb } from "./Breadcrumb";

interface PageHeaderProps {
  eyebrow?: string | null;
  title: string;
  subtitle?: string | null;
  breadcrumb?: { items: Crumb[]; label: string };
}

export function PageHeader({ eyebrow, title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <div className="border-b border-ink-200/60 bg-gradient-to-b from-ice-50/80 to-canvas">
      <Container className="pb-12 pt-10 sm:pb-16 sm:pt-14">
        {breadcrumb ? <Breadcrumb items={breadcrumb.items} label={breadcrumb.label} /> : null}
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ice-700">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl font-serif text-[2rem] leading-[1.15] text-ink-900 sm:text-[2.6rem]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-ink-600">{subtitle}</p>
        ) : null}
      </Container>
    </div>
  );
}
