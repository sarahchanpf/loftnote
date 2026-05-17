import Link from "next/link";
import { Footer } from "../components/Footer";
import { MusicianCard } from "../components/MusicianCard";
import { Navbar } from "../components/Navbar";
import {
  allCities,
  allEventTypes,
  allGenres,
  musicians,
  type Musician,
} from "../data/musicians";

type SearchParams = {
  q?: string;
  eventType?: string;
  city?: string;
  genre?: string | string[];
  minPrice?: string;
  maxPrice?: string;
};

function asArray(v: string | string[] | undefined): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function normalizedRate(m: Musician): number {
  return m.rate;
}

function filterMusicians(params: SearchParams): Musician[] {
  const q = params.q?.toLowerCase().trim();
  const eventType = params.eventType?.trim();
  const city = params.city?.trim();
  const genres = asArray(params.genre);
  const min = params.minPrice ? Number(params.minPrice) : undefined;
  const max = params.maxPrice ? Number(params.maxPrice) : undefined;

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
    const rate = normalizedRate(m);
    if (min !== undefined && rate < min) return false;
    if (max !== undefined && rate > max) return false;
    return true;
  });
}

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const results = filterMusicians(params);
  const selectedGenres = new Set(asArray(params.genre));

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        {/* Search bar header */}
        <section className="border-b border-[var(--color-line)] bg-[var(--color-pink-blush)]">
          <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-display text-4xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-5xl">
                  Browse musicians
                </h1>
                <p className="mt-2 text-[var(--color-muted)]">
                  <span className="font-semibold text-[var(--color-pink)]">
                    {results.length}
                  </span>{" "}
                  artists match your search
                  {params.eventType ? (
                    <>
                      {" "}
                      for{" "}
                      <span className="font-semibold text-[var(--color-pink)]">
                        {params.eventType}
                      </span>
                    </>
                  ) : null}
                  .
                </p>
              </div>
              <Link
                href="/browse"
                className="self-start rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-xs font-semibold text-[var(--color-ink)] hover:border-[var(--color-pink)] hover:text-[var(--color-pink)] sm:self-auto"
              >
                Clear filters
              </Link>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[280px_1fr]">
          {/* Filters */}
          <form
            method="get"
            className="h-fit rounded-[1.75rem] border-2 border-[var(--color-blue)] bg-white p-6 shadow-[6px_6px_0_0_var(--color-blue)]"
          >
            <h2 className="font-display text-xl font-extrabold text-[var(--color-ink)]">
              Filters
            </h2>

            <FilterBlock label="Keyword">
              <input
                type="text"
                name="q"
                defaultValue={params.q ?? ""}
                placeholder="Search by name, genre…"
                className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-pink)] focus:outline-none"
              />
            </FilterBlock>

            <FilterBlock label="Event type">
              <select
                name="eventType"
                defaultValue={params.eventType ?? ""}
                className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-pink)] focus:outline-none"
              >
                <option value="">Any event</option>
                {allEventTypes.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </FilterBlock>

            <FilterBlock label="Location">
              <select
                name="city"
                defaultValue={params.city ?? ""}
                className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-pink)] focus:outline-none"
              >
                <option value="">Anywhere</option>
                {allCities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </FilterBlock>

            <FilterBlock label="Price (per hour)">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--color-muted)]">$</span>
                <input
                  type="number"
                  name="minPrice"
                  min={0}
                  step={20}
                  placeholder="Min"
                  defaultValue={params.minPrice ?? ""}
                  className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-pink)] focus:outline-none"
                />
                <span className="text-xs text-[var(--color-muted)]">to $</span>
                <input
                  type="number"
                  name="maxPrice"
                  min={0}
                  step={20}
                  placeholder="Max"
                  defaultValue={params.maxPrice ?? ""}
                  className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-pink)] focus:outline-none"
                />
              </div>
            </FilterBlock>

            <FilterBlock label="Genre">
              <ul className="grid grid-cols-2 gap-1">
                {allGenres.map((g) => {
                  const active = selectedGenres.has(g);
                  return (
                    <li key={g}>
                      <label
                        className={`flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 text-sm transition-colors ${
                          active
                            ? "bg-[var(--color-lime)] text-[var(--color-ink)] font-semibold"
                            : "text-[var(--color-ink)] hover:bg-[var(--color-pink-blush)]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="genre"
                          value={g}
                          defaultChecked={active}
                          className="h-3.5 w-3.5 accent-[var(--color-pink)]"
                        />
                        {g}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </FilterBlock>

            <button
              type="submit"
              className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--color-pink)] text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-[var(--color-blue)]"
            >
              Apply filters
            </button>
          </form>

          {/* Results */}
          <section>
            {results.length === 0 ? (
              <div className="rounded-[1.75rem] border-2 border-dashed border-[var(--color-line)] bg-white p-16 text-center">
                <p className="font-display text-3xl font-extrabold text-[var(--color-ink)]">
                  No matches yet.
                </p>
                <p className="mt-2 text-[var(--color-muted)]">
                  Try loosening a filter or browsing all musicians.
                </p>
                <Link
                  href="/browse"
                  className="mt-6 inline-flex h-11 items-center rounded-full bg-[var(--color-pink)] px-6 text-sm font-bold text-white hover:bg-[var(--color-blue)]"
                >
                  Show all
                </Link>
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((m) => (
                  <li key={m.id}>
                    <MusicianCard musician={m} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function FilterBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 border-t border-[var(--color-line)] pt-5 first-of-type:mt-5 first-of-type:border-t-0 first-of-type:pt-3">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)]">
        {label}
      </p>
      {children}
    </div>
  );
}
