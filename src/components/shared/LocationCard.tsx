export function LocationCard({ name, note }: { name: string; note: string }) {
  return (
    <div className="rounded-2xl border border-ink-200/70 bg-white px-5 py-5">
      <p className="font-serif text-lg text-ink-900">{name}</p>
      <p className="mt-1.5 text-sm text-ink-500">{note}</p>
    </div>
  );
}
