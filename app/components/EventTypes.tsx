import Link from "next/link";

type EventTile = {
  name: string;
  blurb: string;
  bg: string;
  fg: string;
  emoji: string;
};

const tiles: EventTile[] = [
  {
    name: "Weddings",
    blurb: "Ceremony, cocktails, reception",
    bg: "bg-[var(--color-pink)]",
    fg: "text-white",
    emoji: "💍",
  },
  {
    name: "Restaurants",
    blurb: "Dinner service that hums",
    bg: "bg-[var(--color-orange)]",
    fg: "text-white",
    emoji: "🍷",
  },
  {
    name: "Corporate",
    blurb: "Launches & holiday parties",
    bg: "bg-[var(--color-blue)]",
    fg: "text-white",
    emoji: "🎤",
  },
  {
    name: "Birthdays",
    blurb: "Make the year unforgettable",
    bg: "bg-[var(--color-yellow)]",
    fg: "text-[var(--color-ink)]",
    emoji: "🎂",
  },
  {
    name: "Bars & lounges",
    blurb: "Weekly residencies & one-offs",
    bg: "bg-[var(--color-lime)]",
    fg: "text-[var(--color-ink)]",
    emoji: "🍸",
  },
  {
    name: "Hotels",
    blurb: "Lobbies, rooftops, brunch",
    bg: "bg-[var(--color-pink-soft)]",
    fg: "text-[var(--color-ink)]",
    emoji: "🏨",
  },
];

export function EventTypes() {
  return (
    <section id="event-types" className="bg-[var(--color-pink-blush)]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-24">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-pink)]">
              Browse by event
            </p>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-5xl">
              What are you planning?
            </h2>
          </div>
          <Link
            href="/browse"
            className="text-sm font-semibold text-[var(--color-pink)] underline-offset-4 hover:underline"
          >
            See all musicians →
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {tiles.map((t) => (
            <li key={t.name}>
              <Link
                href={`/browse?eventType=${encodeURIComponent(t.name)}`}
                className={`group flex h-44 flex-col justify-between rounded-[1.75rem] ${t.bg} ${t.fg} p-5 transition-transform hover:-translate-y-1 hover:rotate-[-1deg]`}
              >
                <span className="text-3xl" aria-hidden>
                  {t.emoji}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-extrabold leading-tight">
                    {t.name}
                  </h3>
                  <p className="mt-1 text-sm opacity-90">{t.blurb}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
