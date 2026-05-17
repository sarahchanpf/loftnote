import { allEventTypes } from "../data/musicians";

const popularCities = [
  "New York",
  "Brooklyn",
  "Los Angeles",
  "Chicago",
  "Austin",
  "Nashville",
  "Miami",
  "San Francisco",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Floating shapes */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-10 top-20 h-24 w-24 rounded-full bg-[var(--color-lime)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-10 top-32 h-16 w-16 rounded-2xl bg-[var(--color-blue)] rotate-12"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/3 bottom-10 h-12 w-12 rounded-full bg-[var(--color-yellow)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-1/4 bottom-32 h-20 w-20 rounded-3xl bg-[var(--color-pink)]/40"
      />

      <div className="mx-auto max-w-7xl px-5 pt-16 pb-20 text-center sm:px-8 md:pt-24 md:pb-28">
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-yellow)] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--color-ink)]">
          <span className="h-2 w-2 rounded-full bg-[var(--color-pink)]" />
          12,400+ gigs booked this year
        </span>

        <h1 className="mt-7 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-[var(--color-ink)] md:text-7xl lg:text-[5.5rem]">
          Book live music
          <br />
          for any{" "}
          <span className="relative inline-block">
            <span className="relative z-10">event</span>
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 right-0 -z-0 h-4 rounded-full bg-[var(--color-lime)]"
            />
          </span>
          <span className="text-[var(--color-pink)]">.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)] md:text-xl">
          From weddings to wine bars, find amazing musicians near you and book
          them in minutes. No agencies, no awkward emails.
        </p>

        {/* Search card — submits to /browse */}
        <form
          action="/browse"
          method="get"
          className="mx-auto mt-10 grid w-full max-w-4xl gap-2 rounded-[2rem] border-2 border-[var(--color-pink)] bg-white p-2 text-left shadow-[6px_6px_0_0_var(--color-pink)] sm:grid-cols-[1.3fr_1.3fr_1fr_auto] sm:gap-0"
        >
          <Field label="Where" htmlFor="loc">
            <input
              id="loc"
              type="text"
              name="q"
              list="cities"
              placeholder="City or genre"
              className="w-full bg-transparent text-base font-medium text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:outline-none"
            />
            <datalist id="cities">
              {popularCities.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </Field>
          <Divider />
          <Field label="Event type" htmlFor="evt">
            <select
              id="evt"
              name="eventType"
              defaultValue=""
              className="w-full bg-transparent text-base font-medium text-[var(--color-ink)] focus:outline-none"
            >
              <option value="">Any event</option>
              {allEventTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Divider />
          <Field label="When" htmlFor="date">
            <input
              id="date"
              type="date"
              name="date"
              className="w-full bg-transparent text-base font-medium text-[var(--color-ink)] focus:outline-none"
            />
          </Field>
          <button
            type="submit"
            className="ml-0 inline-flex h-14 items-center justify-center rounded-3xl bg-[var(--color-pink)] px-7 text-base font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-[var(--color-blue)] sm:ml-2"
          >
            Search
            <ArrowRight />
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-[var(--color-muted)]">
          <span>Popular:</span>
          {["Wedding", "Restaurant", "Cocktail bar", "Corporate"].map((t) => (
            <a
              key={t}
              href={`/browse?eventType=${encodeURIComponent(t)}`}
              className="rounded-full border border-[var(--color-line)] bg-white px-3 py-1 text-xs font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-pink)] hover:text-[var(--color-pink)]"
            >
              {t}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex flex-col gap-1 rounded-2xl px-5 py-3 transition-colors hover:bg-[var(--color-pink-blush)]"
    >
      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)]">
        {label}
      </span>
      {children}
    </label>
  );
}

function Divider() {
  return (
    <span className="hidden self-center bg-[var(--color-line)] sm:block sm:h-8 sm:w-px" />
  );
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="ml-2 h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
