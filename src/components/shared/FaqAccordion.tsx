interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/** JavaScript gerektirmeyen, klavyeyle erişilebilir açılır-kapanır liste. */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-ink-200/70 border-y border-ink-200/70">
      {items.map((item) => (
        <details key={item.id} className="group py-1">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-left text-[1.02rem] font-medium text-ink-900 transition-colors hover:text-ice-800">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-ice-600 transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="pb-5 pr-8 text-[0.97rem] leading-relaxed text-ink-600">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
