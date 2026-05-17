import Link from "next/link";

export function CTA() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--color-yellow)] px-8 py-16 text-center md:px-16 md:py-24">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-6 left-8 h-20 w-20 rounded-full bg-[var(--color-lime)]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-8 right-12 h-28 w-28 rounded-3xl bg-[var(--color-pink)] rotate-12"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute top-12 right-20 h-10 w-10 rounded-full bg-[var(--color-blue)]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-16 left-16 h-12 w-12 rounded-2xl bg-[var(--color-orange)] -rotate-6"
          />

          <h2 className="relative font-display text-4xl font-extrabold leading-tight text-[var(--color-ink)] md:text-6xl">
            Got an event?
            <br />
            <span className="text-[var(--color-pink)]">Get the music.</span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-base text-[var(--color-ink)]/80 md:text-lg">
            Free to browse, no booking fees for guests, and a Vibe Guarantee on
            every booking.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/browse"
              className="inline-flex h-12 items-center rounded-full bg-[var(--color-pink)] px-7 text-base font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-[var(--color-blue)]"
            >
              Browse musicians
            </Link>
            <Link
              href="/#how-it-works"
              className="inline-flex h-12 items-center rounded-full border-2 border-[var(--color-blue)] bg-white px-7 text-base font-bold text-[var(--color-blue)] transition-transform hover:-translate-y-0.5 hover:bg-[var(--color-blue)] hover:text-white"
            >
              See how it works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
