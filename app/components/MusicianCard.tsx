import Link from "next/link";
import { type Musician, genreTone } from "../data/musicians";

export function MusicianCard({ musician }: { musician: Musician }) {
  const tone = genreTone(musician.genres[0]);
  return (
    <Link href={`/musician/${musician.id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--color-cream)]">
        <span
          aria-hidden
          className={`absolute inset-0 flex items-center justify-center font-display text-7xl font-bold ${musician.bg} ${musician.fg}`}
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
        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex translate-y-2 justify-center opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[var(--color-ink)] shadow-[0_4px_12px_rgba(20,20,30,0.12)]">
            View profile
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>

      <div className="pt-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold text-[var(--color-ink)]">
            {musician.name}
          </h3>
          <span className="inline-flex shrink-0 items-center gap-1 text-xs text-[var(--color-ink)]">
            <StarIcon />
            {musician.rating.toFixed(2)}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-[var(--color-muted)]">
          {musician.city}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${tone.bg} ${tone.fg}`}
          >
            {musician.genres[0]}
          </span>
        </div>
        <p className="mt-2 text-sm text-[var(--color-ink)]">
          <span className="font-semibold">${musician.rate}</span>
          <span className="text-[var(--color-muted)]"> / hour</span>
        </p>
      </div>
    </Link>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3 w-3 fill-[var(--color-ink)]"
      aria-hidden="true"
    >
      <path d="M12 2.5l2.95 6.5 6.55.95-4.75 4.6 1.1 6.45L12 17.9l-5.85 3.1 1.1-6.45L2.5 9.95 9.05 9z" />
    </svg>
  );
}
