import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "../../components/Footer";
import { MusicianCard } from "../../components/MusicianCard";
import { Navbar } from "../../components/Navbar";
import {
  formatRate,
  genreTone,
  getMusician,
  musicians,
} from "../../data/musicians";

export function generateStaticParams() {
  return musicians.map((m) => ({ id: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const m = getMusician(id);
  if (!m) return { title: "Musician not found — Loftnote" };
  return {
    title: `${m.name} — Book on Loftnote`,
    description: m.tagline,
  };
}

export default async function MusicianProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const m = getMusician(id);
  if (!m) notFound();

  const related = musicians
    .filter(
      (x) =>
        x.id !== m.id && x.eventTypes.some((e) => m.eventTypes.includes(e)),
    )
    .slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[var(--color-paper)]">
        <Breadcrumbs name={m.name} />

        <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
          <div className="grid grid-cols-1 gap-6 rounded-3xl border border-[var(--color-line)] bg-white p-6 shadow-[0_4px_20px_rgba(20,20,30,0.04)] md:grid-cols-[320px_1fr] md:gap-10 md:p-8">
            <div
              className={`relative flex h-72 items-center justify-center overflow-hidden rounded-2xl ${m.bg} md:h-full`}
            >
              <span
                aria-hidden
                className={`font-display text-8xl font-bold ${m.fg} opacity-90`}
              >
                {m.initials}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.photo}
                alt={`Headshot of ${m.name}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap gap-1.5">
                {m.genres.map((g) => {
                  const tone = genreTone(g);
                  return (
                    <span
                      key={g}
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${tone.bg} ${tone.fg}`}
                    >
                      {g}
                    </span>
                  );
                })}
              </div>
              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-[var(--color-ink)] md:text-5xl">
                {m.name}
              </h1>
              <p className="mt-3 max-w-xl text-lg text-[var(--color-muted)]">
                {m.tagline}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--color-muted)]">
                <span className="inline-flex items-center gap-1.5 text-[var(--color-ink)]">
                  <PinIcon /> {m.city}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[var(--color-ink)]">
                  <StarFilled /> {m.rating.toFixed(2)} · {m.reviewsCount} reviews
                </span>
                <span className="inline-flex items-center gap-1.5 text-[var(--color-ink)]">
                  <span className="font-semibold">{formatRate(m)}</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-12">
            <Section title="About the artist">
              <p className="text-base leading-relaxed text-[var(--color-ink)]/85">
                {m.about}
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {m.highlights.map((h, i) => {
                  const tones = [
                    "bg-[var(--color-blush)] text-[var(--color-blush-deep)]",
                    "bg-[var(--color-sage)] text-[var(--color-sage-deep)]",
                    "bg-[var(--color-butter)] text-[var(--color-butter-deep)]",
                  ];
                  return (
                    <li
                      key={h}
                      className={`rounded-xl ${tones[i % tones.length]} px-4 py-3 text-sm font-medium`}
                    >
                      {h}
                    </li>
                  );
                })}
              </ul>
            </Section>

            <Section title="Sample setlist">
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {m.setlist.map((song, i) => (
                  <li
                    key={song}
                    className="flex items-center gap-3 rounded-xl border border-[var(--color-line)] bg-white px-4 py-3"
                  >
                    <span className="font-display text-sm font-semibold text-[var(--color-muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-[var(--color-ink)]">
                      {song}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="What event planners say">
              <ul className="space-y-4">
                {m.reviews.map((r) => (
                  <li
                    key={r.author}
                    className="rounded-2xl border border-[var(--color-line)] bg-white p-6"
                  >
                    <div className="flex items-center gap-0.5 text-[var(--color-butter-deep)]">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <StarFilled key={i} />
                      ))}
                    </div>
                    <p className="mt-3 text-lg leading-snug text-[var(--color-ink)]">
                      &ldquo;{r.text}&rdquo;
                    </p>
                    <p className="mt-3 text-sm text-[var(--color-muted)]">
                      <span className="font-semibold text-[var(--color-ink)]">
                        {r.author}
                      </span>{" "}
                      · {r.role}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          {/* Booking widget */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-[0_4px_20px_rgba(20,20,30,0.04)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                Request to book
              </p>
              <p className="mt-1 font-display text-3xl font-bold tracking-tight text-[var(--color-ink)]">
                {formatRate(m)}
              </p>
              <p className="text-xs text-[var(--color-muted)]">
                Final quote sent within 24 hours
              </p>

              <form className="mt-5 space-y-3">
                <label className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                    Event date
                  </span>
                  <input
                    type="date"
                    className="mt-1 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm text-[var(--color-ink)] focus:border-[var(--color-ink)] focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                    Event type
                  </span>
                  <select
                    defaultValue=""
                    className="mt-1 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm text-[var(--color-ink)] focus:border-[var(--color-ink)] focus:outline-none"
                  >
                    <option value="" disabled>
                      Pick one
                    </option>
                    {m.eventTypes.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                    Hours needed
                  </span>
                  <input
                    type="number"
                    min={1}
                    defaultValue={2}
                    className="mt-1 w-full rounded-xl border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm text-[var(--color-ink)] focus:border-[var(--color-ink)] focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                    Message
                  </span>
                  <textarea
                    rows={4}
                    placeholder="Tell the artist about your event…"
                    className="mt-1 w-full resize-none rounded-xl border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm text-[var(--color-ink)] focus:border-[var(--color-ink)] focus:outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--color-ink)] text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  Request to book
                </button>
                <p className="text-center text-xs text-[var(--color-muted)]">
                  You won&apos;t be charged yet.
                </p>
              </form>
            </div>

            <div className="mt-4 rounded-2xl bg-[var(--color-sage)] p-5 text-sm text-[var(--color-sage-deep)]">
              <p className="font-display text-base font-semibold">
                Vibe Guarantee
              </p>
              <p className="mt-1 text-sm leading-relaxed">
                Not vibing on the day? We&apos;ll re-book a comparable act on us.
              </p>
            </div>
          </aside>
        </div>

        {related.length > 0 ? (
          <section className="border-t border-[var(--color-line)] bg-[var(--color-paper)]">
            <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-3xl">
                Similar musicians for your event
              </h2>
              <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {related.map((r) => (
                  <li key={r.id}>
                    <MusicianCard musician={r} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-3xl">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Breadcrumbs({ name }: { name: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto max-w-7xl px-5 pt-6 pb-4 text-sm text-[var(--color-muted)] sm:px-8"
    >
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-[var(--color-ink)]">
            Home
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li className="font-medium text-[var(--color-ink)]">{name}</li>
      </ol>
    </nav>
  );
}

function StarFilled() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 fill-current"
      aria-hidden="true"
    >
      <path d="M12 2.5l2.95 6.5 6.55.95-4.75 4.6 1.1 6.45L12 17.9l-5.85 3.1 1.1-6.45L2.5 9.95 9.05 9z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
