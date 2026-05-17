export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--color-pink)]">
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[var(--color-lime)]" />
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-white"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9 3v11.2A3.8 3.8 0 1 0 11 17.5V7l8-2v8.2A3.8 3.8 0 1 0 21 16V3z" />
        </svg>
      </span>
      <span className="font-display text-2xl font-extrabold tracking-tight text-[var(--color-ink)]">
        loftnote
      </span>
    </span>
  );
}
