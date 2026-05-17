import Link from "next/link";
import { Footer } from "./components/Footer";
import { MusicianCard } from "./components/MusicianCard";
import { Navbar } from "./components/Navbar";
import { allGenres, musicians, type Musician } from "./data/musicians";

type SearchParams = {
  q?: string;
  eventType?: string;
  city?: string;
  date?: string;
  genre?: string | string[];
};

function asArray(v: string | string[] | undefined): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function filterMusicians(params: SearchParams): Musician[] {
  const q = params.q?.toLowerCase().trim();
  const eventType = params.eventType?.trim();
  const city = params.city?.trim();
  const genres = asArray(params.genre);

  return musicians.filter((m) => {
    if (q) {
      const hay =
        `${m.name} ${m.tagline} ${m.city} ${m.genres.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (eventType && !m.eventTypes.includes(eventType)) return false;
    if (city && m.city !== city) return false;
    if (genres.length > 0 && !genres.some((g) => m.genres.includes(g)))
      return false;
    return true;
  });
}

const POPULAR_EVENT_TYPES = ["Wedding", "Corporate", "Restaurant", "Cocktail bar", "Hotel"];

function buildHref(
  current: SearchParams,
  toggle: { key: "genre" | "eventType"; value: string },
): string {
  const params = new URLSearchParams();
  if (current.city) params.set("city", current.city);
  if (current.date) params.set("date", current.date);

  const genres = asArray(current.genre);
  if (toggle.key === "genre") {
    const next = genres.includes(toggle.value)
      ? genres.filter((g) => g !== toggle.value)
      : [...genres, toggle.value];
    next.forEach((g) => params.append("genre", g));
    if (current.eventType) params.set("eventType", current.eventType);
  } else {
    genres.forEach((g) => params.append("genre", g));
    if (current.eventType !== toggle.value) {
      params.set("eventType", toggle.value);
    }
  }

  const s = params.toString();
  return s ? `/?${s}` : "/";
}

function hasActiveFilters(params: SearchParams): boolean {
  return Boolean(
    params.city ||
      params.eventType ||
      params.date ||
      params.q ||
      asArray(params.genre).length > 0,
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const results = filterMusicians(params);
  const activeGenres = new Set(asArray(params.genre));
  const activeEventType = params.eventType ?? "";

  return (
    <>
      <Navbar
        defaults={{
          city: params.city,
          eventType: params.eventType,
          date: params.date,
          genres: asArray(params.genre),
        }}
      />

      <main className="flex-1 bg-[var(--color-paper)]">
        {/* Filter pills */}
        <section className="border-b border-[var(--color-line)] bg-[var(--color-paper)]/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="scrollbar-hidden flex items-center gap-2 overflow-x-auto py-4">
              {allGenres.map((g) => {
                const active = activeGenres.has(g);
                return (
                  <FilterPill
                    key={`g-${g}`}
                    label={g}
                    active={active}
                    href={buildHref(params, { key: "genre", value: g })}
                  />
                );
              })}
              <span className="mx-1 h-5 w-px shrink-0 bg-[var(--color-line)]" />
              {POPULAR_EVENT_TYPES.map((e) => {
                const active = activeEventType === e;
                return (
                  <FilterPill
                    key={`e-${e}`}
                    label={e}
                    active={active}
                    href={buildHref(params, { key: "eventType", value: e })}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* Active filter summary */}
        {hasActiveFilters(params) ? (
          <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
            <div className="flex items-center justify-between gap-3 text-sm text-[var(--color-muted)]">
              <p>
                <span className="font-semibold text-[var(--color-ink)]">
                  {results.length}
                </span>{" "}
                musician{results.length === 1 ? "" : "s"} available
                {params.city ? (
                  <>
                    {" "}in <span className="text-[var(--color-ink)]">{params.city}</span>
                  </>
                ) : null}
                {params.eventType ? (
                  <>
                    {" "}for{" "}
                    <span className="text-[var(--color-ink)]">{params.eventType}</span>
                  </>
                ) : null}
                {params.date ? (
                  <>
                    {" "}on <span className="text-[var(--color-ink)]">{params.date}</span>
                  </>
                ) : null}
              </p>
              <Link
                href="/"
                className="rounded-full border border-[var(--color-line)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)] hover:border-[var(--color-ink)]"
              >
                Clear all
              </Link>
            </div>
          </div>
        ) : null}

        {/* Grid */}
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--color-line)] bg-white p-16 text-center">
              <p className="font-display text-2xl font-bold text-[var(--color-ink)]">
                No musicians match those filters.
              </p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Try removing a filter, or browse all artists.
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex h-10 items-center rounded-full bg-[var(--color-ink)] px-5 text-sm font-semibold text-white"
              >
                Show all
              </Link>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {results.map((m) => (
                <li key={m.id}>
                  <MusicianCard musician={m} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function FilterPill({
  label,
  active,
  href,
}: {
  label: string;
  active: boolean;
  href: string;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      className={`inline-flex shrink-0 items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white"
          : "border-[var(--color-line)] bg-white text-[var(--color-ink)] hover:border-[var(--color-ink)]"
      }`}
    >
      {label}
    </Link>
  );
}

