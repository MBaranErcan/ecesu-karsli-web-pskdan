export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ice-800 focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
    >
      {label}
    </a>
  );
}
