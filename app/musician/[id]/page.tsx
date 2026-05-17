import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "../../components/Footer";
import { MusicianCard } from "../../components/MusicianCard";
import { Navbar } from "../../components/Navbar";
import { formatRate, getMusician, musicians } from "../../data/musicians";

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
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <Breadcrumbs name={m.name} />

        <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
          <div className="grid grid-cols-1 gap-6 rounded-[2rem] border-2 border-[var(--color-pink)] bg-white p-6 shadow-[8px_8px_0_0_var(--color-pink)] md:grid-cols-[280px_1fr] md:gap-8 md:p-8">
            <div
              className={`relative flex h-72 items-center justify-center overflow-hidden rounded-[1.5rem] ${m.bg} md:h-full`}
            >
              <span
                aria-hidden
                className={`font-display text-8xl font-extrabold ${m.fg} opacity-90`}
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
              <div className="flex flex-wrap gap-2">
                {m.genres.map((g) => (
                  <span
                    key={g}
                    className="rounded-full bg-[var(--color-yellow)] px-3 py-1 text-xs font-bold text-[var(--color-ink)]"
                  >
                    {g}
                  </span>
                ))}
              </div>
              <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-[var(--color-ink)] md:text-6xl">
                {m.name}
              </h1>
              <p className="mt-3 max-w-xl text-lg text-[var(--color-muted)] md:text-xl">
                {m.tagline}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm font-semibold">
                <Pill bg="bg-[var(--color-lime)]" fg="text-[var(--color-ink)]">
                  📍 {m.city}
                </Pill>
                <Pill bg="bg-[var(--color-yellow)]" fg="text-[var(--color-ink)]">
                  <Star /> {m.rating.toFixed(2)} · {m.reviewsCount} reviews
                </Pill>
                <Pill bg="bg-[var(--color-pink)]" fg="text-white">
                  {formatRate(m)}
                </Pill>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-12">
            <Section title="About the artist">
              <p className="text-lg leading-relaxed text-[var(--color-ink)]/85">
                {m.about}
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {m.highlights.map((h, i) => {
                  const tones = [
                    "bg-[var(--color-yellow)]",
                    "bg-[var(--color-lime)]",
                    "bg-[var(--color-pink-soft)]",
                  ];
                  return (
                    <li
                      key={h}
                      className={`rounded-2xl ${tones[i % tones.length]} px-4 py-3 text-sm font-semibold text-[var(--color-ink)]`}
                    >
                      ✓ {h}
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
                    className="flex items-center gap-3 rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3"
                  >
                    <span className="font-display text-lg font-extrabold text-[var(--color-pink)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-[var(--color-ink)]">
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
                    className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-6"
                  >
                    <div className="flex items-center gap-1 text-[var(--color-yellow)]">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} />
                      ))}
                    </div>
                    <p className="mt-3 font-display text-xl font-bold leading-snug text-[var(--color-ink)]">
                      “{r.text}”
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
            <div className="rounded-[1.75rem] border-2 border-[var(--color-pink)] bg-white p-6 shadow-[6px_6px_0_0_var(--color-pink)]">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-pink)]">
                Request to book
              </p>
              <p className="mt-1 font-display text-3xl font-extrabold tracking-tight text-[var(--color-ink)]">
                {formatRate(m)}
              </p>
              <p className="text-xs text-[var(--color-muted)]">
                Final quote sent within 24 hours
              </p>

              <form className="mt-5 space-y-3">
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)]">
                    Event date
                  </span>
                  <input
                    type="date"
                    className="mt-1 w-full rounded-2xl border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm text-[var(--color-ink)] focus:border-[var(--color-pink)] focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)]">
                    Event type
                  </span>
                  <select
                    defaultValue=""
                    className="mt-1 w-full rounded-2xl border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm text-[var(--color-ink)] focus:border-[var(--color-pink)] focus:outline-none"
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
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)]">
                    Hours needed
                  </span>
                  <input
                    type="number"
                    min={1}
                    defaultValue={2}
                    className="mt-1 w-full rounded-2xl border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm text-[var(--color-ink)] focus:border-[var(--color-pink)] focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)]">
                    Message
                  </span>
                  <textarea
                    rows={4}
                    placeholder="Tell the artist about your event…"
                    className="mt-1 w-full resize-none rounded-2xl border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm text-[var(--color-ink)] focus:border-[var(--color-pink)] focus:outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--color-pink)] text-base font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-[var(--color-blue)]"
                >
                  Request to book
                </button>
                <p className="text-center text-xs text-[var(--color-muted)]">
                  You won&apos;t be charged yet.
                </p>
              </form>
            </div>

            <div className="mt-4 rounded-2xl bg-[var(--color-lime)] p-4 text-sm font-semibold text-[var(--color-ink)]">
              <span className="font-display text-lg font-extrabold">
                Vibe Guarantee
              </span>
              <p className="mt-1 text-sm font-normal text-[var(--color-ink)]/80">
                Not vibing on the day? We&apos;ll re-book a comparable act on us.
              </p>
            </div>
          </aside>
        </div>

        {related.length > 0 ? (
          <section className="bg-[var(--color-pink-blush)]">
            <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-4xl">
                Similar musicians for your event
              </h2>
              <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      <h2 className="font-display text-2xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-3xl">
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
          <Link href="/" className="hover:text-[var(--color-pink)]">
            Home
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li>
          <Link href="/browse" className="hover:text-[var(--color-pink)]">
            Musicians
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li className="font-semibold text-[var(--color-ink)]">{name}</li>
      </ol>
    </nav>
  );
}

function Pill({
  children,
  bg,
  fg,
}: {
  children: React.ReactNode;
  bg: string;
  fg: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 ${bg} ${fg}`}
    >
      {children}
    </span>
  );
}

function Star() {
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
