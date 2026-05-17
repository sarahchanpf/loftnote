import Link from "next/link";
import { musicians } from "../data/musicians";
import { MusicianCard } from "./MusicianCard";

export function FeaturedMusicians() {
  const featured = musicians.slice(0, 4);
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-24">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-blue)]">
              Featured musicians
            </p>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-5xl">
              Real artists. <span className="text-[var(--color-pink)]">Booked fast.</span>
            </h2>
          </div>
          <Link
            href="/browse"
            className="text-sm font-semibold text-[var(--color-pink)] underline-offset-4 hover:underline"
          >
            Browse all musicians →
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((m) => (
            <li key={m.id}>
              <MusicianCard musician={m} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
