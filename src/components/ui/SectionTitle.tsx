import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Heading = "h2",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ice-700">
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={cn(
          "font-serif text-ink-900",
          Heading === "h1"
            ? "text-[2.1rem] leading-[1.15] sm:text-[2.7rem] lg:text-[3.1rem]"
            : "text-[1.7rem] leading-[1.2] sm:text-[2.05rem]",
        )}
      >
        {title}
      </Heading>
      {lead ? <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-600">{lead}</p> : null}
    </div>
  );
}
