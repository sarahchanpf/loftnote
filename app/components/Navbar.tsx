import Link from "next/link";
import { Logo } from "./Logo";
import { allCities, allEventTypes } from "../data/musicians";

type NavbarProps = {
  defaults?: {
    city?: string;
    eventType?: string;
    date?: string;
    genres?: string[];
  };
};

export function Navbar({ defaults = {} }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-paper)]/95 backdrop-blur">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center gap-4 px-5 sm:px-8">
        <Link href="/" aria-label="Loftnote home" className="shrink-0">
          <Logo />
        </Link>

        <form
          action="/"
          method="get"
          className="mx-auto hidden w-full max-w-xl md:flex"
        >
          {(defaults.genres ?? []).map((g) => (
            <input key={g} type="hidden" name="genre" value={g} />
          ))}
          <div className="flex h-12 w-full items-stretch rounded-full border border-[var(--color-line)] bg-white shadow-[0_1px_3px_rgba(20,20,30,0.04)] transition-shadow focus-within:shadow-[0_4px_14px_rgba(20,20,30,0.08)]">
            <SearchField label="Where" className="flex-1 rounded-l-full">
              <select
                name="city"
                defaultValue={defaults.city ?? ""}
                className="w-full cursor-pointer appearance-none bg-transparent text-sm font-medium text-[var(--color-ink)] focus:outline-none"
              >
                <option value="">Anywhere</option>
                {allCities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </SearchField>
            <Divider />
            <SearchField label="Event" className="flex-1">
              <select
                name="eventType"
                defaultValue={defaults.eventType ?? ""}
                className="w-full cursor-pointer appearance-none bg-transparent text-sm font-medium text-[var(--color-ink)] focus:outline-none"
              >
                <option value="">Any event</option>
                {allEventTypes.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </SearchField>
            <Divider />
            <SearchField label="Date" className="flex-1">
              <input
                type="date"
                name="date"
                defaultValue={defaults.date ?? ""}
                className="w-full cursor-pointer appearance-none bg-transparent text-sm font-medium text-[var(--color-ink)] focus:outline-none"
              />
            </SearchField>
            <button
              type="submit"
              aria-label="Search"
              className="my-1 mr-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-ink)] text-white transition-transform hover:-translate-y-0.5"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
          </div>
        </form>

        <Link
          href="/musicians/join"
          className="ml-auto inline-flex h-10 shrink-0 items-center rounded-full border border-[var(--color-line)] bg-white px-4 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
        >
          List your talent
        </Link>
      </nav>
    </header>
  );
}

function SearchField({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={`flex cursor-pointer flex-col justify-center px-4 hover:bg-[var(--color-cream)]/40 ${className}`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
        {label}
      </span>
      <div className="mt-0.5">{children}</div>
    </label>
  );
}

function Divider() {
  return <span className="my-3 w-px self-stretch bg-[var(--color-line)]" />;
}
