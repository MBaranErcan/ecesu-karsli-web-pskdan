import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: "default" | "muted" | "sand";
  size?: "narrow" | "default" | "wide";
}

const tones = {
  default: "",
  muted: "bg-ice-50/60",
  sand: "bg-sand-50",
};

export function Section({
  tone = "default",
  size = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-20", tones[tone], className)} {...props}>
      <Container size={size}>{children}</Container>
    </section>
  );
}
