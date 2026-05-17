export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--color-blush)]">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-[var(--color-blush-deep)]"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9 3v11.2A3.8 3.8 0 1 0 11 17.5V7l8-2v8.2A3.8 3.8 0 1 0 21 16V3z" />
        </svg>
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-[var(--color-ink)]">
        loftnote
      </span>
    </span>
  );
}
