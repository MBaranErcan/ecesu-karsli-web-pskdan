export interface ProcessStep {
  title: string;
  body: string;
}

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
      {steps.map((step, index) => (
        <li key={step.title} className="relative pl-14">
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-ice-100 font-serif text-lg text-ice-800"
          >
            {index + 1}
          </span>
          <h3 className="font-serif text-lg text-ink-900">{step.title}</h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-600">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
