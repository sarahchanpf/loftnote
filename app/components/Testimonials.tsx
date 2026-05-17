type Quote = {
  text: string;
  author: string;
  role: string;
  bg: string;
  fg: string;
};

const quotes: Quote[] = [
  {
    text: "I booked a jazz trio for our wine bar in 12 minutes. They've been our Thursday residency for 6 months now. Loftnote pays for itself every week.",
    author: "Daniela Marsh",
    role: "Owner, The Velvet Room",
    bg: "bg-[var(--color-pink)]",
    fg: "text-white",
  },
  {
    text: "Planned a 200-person corporate launch in 3 weeks. Loftnote matched us with a DJ + live percussion set that our clients are STILL talking about.",
    author: "Marcus Lee",
    role: "Event Director, Aether Studios",
    bg: "bg-[var(--color-yellow)]",
    fg: "text-[var(--color-ink)]",
  },
  {
    text: "As a wedding planner I used to spend hours sourcing musicians. Now it's one tab, listen, book, done. My brides think I'm a wizard.",
    author: "Priya Shah",
    role: "Founder, Wildflower Weddings",
    bg: "bg-[var(--color-blue)]",
    fg: "text-white",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-pink)]">
            From people who book
          </p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-5xl">
            Loved by venues
            <br />& event planners.
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {quotes.map((q) => (
            <li
              key={q.author}
              className={`flex h-full flex-col justify-between rounded-[1.75rem] ${q.bg} ${q.fg} p-7`}
            >
              <p className="font-display text-2xl font-bold leading-snug">
                “{q.text}”
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-[var(--color-pink)]">
                  {q.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div>
                  <p className="font-semibold">{q.author}</p>
                  <p className="text-sm opacity-80">{q.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
