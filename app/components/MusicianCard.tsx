import Link from "next/link";
import { type Musician, formatRate } from "../data/musicians";

export function MusicianCard({ musician }: { musician: Musician }) {
  return (
    <Link
      href={`/musician/${musician.id}`}
      className="group block overflow-hidden rounded-[1.75rem] border border-[var(--color-line)] bg-white transition-all hover:-translate-y-1 hover:border-[var(--color-pink)] hover:shadow-[8px_8px_0_0_var(--color-pink)]"
    >
      <div
        className={`relative flex h-56 items-center justify-center overflow-hidden ${musician.bg}`}
      >
        {/* Initials sit underneath as a fallback */}
        <span
          aria-hidden
          className={`font-display text-7xl font-extrabold ${musician.fg} opacity-90`}
        >
          {musician.initials}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={musician.photo}
          alt={`Headshot of ${musician.name}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-[var(--color-ink)]">
          <StarIcon /> {musician.rating.toFixed(2)}
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-[var(--color-pink)]">
          {formatRate(musician)}
        </span>
      </div>
      <div className="bg-white p-5">
        <h3 className="font-display text-xl font-bold tracking-tight text-[var(--color-ink)]">
          {musician.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-[var(--color-muted)]">
          {musician.tagline}
        </p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          {musician.city}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {musician.genres.slice(0, 3).map((g) => (
            <span
              key={g}
              className="rounded-full bg-[var(--color-pink-blush)] px-2.5 py-0.5 text-xs font-semibold text-[var(--color-pink)]"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 fill-[var(--color-yellow)]"
      stroke="var(--color-ink)"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M12 2.5l2.95 6.5 6.55.95-4.75 4.6 1.1 6.45L12 17.9l-5.85 3.1 1.1-6.45L2.5 9.95 9.05 9z" />
    </svg>
  );
}
