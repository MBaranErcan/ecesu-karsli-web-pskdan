import { cn } from "@/lib/utils";

const controlBase =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-[0.98rem] text-ink-900 placeholder:text-ink-400 transition-colors focus:border-ice-500 focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-red-400";

export function Label({
  htmlFor,
  children,
  hint,
  className,
}: {
  htmlFor: string;
  children: React.ReactNode;
  hint?: string;
  className?: string;
}) {
  return (
    <label htmlFor={htmlFor} className={cn("block text-sm font-medium text-ink-800", className)}>
      {children}
      {hint ? <span className="ml-1.5 font-normal text-ink-400">({hint})</span> : null}
    </label>
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlBase, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(controlBase, "min-h-32 resize-y", className)} {...props} />;
}

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(controlBase, "appearance-none pr-10", className)} {...props} />;
}

export function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-red-600">
      {children}
    </p>
  );
}

export function FieldHint({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm leading-relaxed text-ink-500">
      {children}
    </p>
  );
}

export function RadioCard({
  name,
  value,
  label,
  defaultChecked,
}: {
  name: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-ink-200 bg-white px-4 py-3 text-[0.95rem] text-ink-800 transition-colors hover:border-ice-300 has-[:checked]:border-ice-500 has-[:checked]:bg-ice-50">
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="h-4 w-4 shrink-0 accent-[var(--color-ice-700)]"
      />
      <span>{label}</span>
    </label>
  );
}
