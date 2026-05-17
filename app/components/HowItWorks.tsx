type Step = {
  n: string;
  title: string;
  body: string;
  bg: string;
  fg: string;
};

const steps: Step[] = [
  {
    n: "01",
    title: "Tell us about your event",
    body: "Share the date, location, vibe, and budget. Takes 60 seconds — no account needed to start.",
    bg: "bg-[var(--color-lime)]",
    fg: "text-[var(--color-ink)]",
  },
  {
    n: "02",
    title: "Match with musicians",
    body: "Browse curated matches near you with listen-now samples, reviews, and transparent pricing.",
    bg: "bg-[var(--color-pink)]",
    fg: "text-white",
  },
  {
    n: "03",
    title: "Book in minutes",
    body: "Message your favorite, lock in the date, and pay safely through Loftnote. We handle the contract.",
    bg: "bg-[var(--color-blue)]",
    fg: "text-white",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[var(--color-blue-soft)]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-orange)]">
            How Loftnote works
          </p>
          <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-5xl">
            Live music,{" "}
            <span className="bg-[var(--color-yellow)] px-2 py-0.5">
              minus the hassle.
            </span>
          </h2>
          <p className="mt-4 text-lg text-[var(--color-ink)]/70">
            Booking a great musician used to mean DMing friends-of-friends.
            Now it&apos;s three steps.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className={`flex h-full flex-col justify-between rounded-[1.75rem] ${s.bg} ${s.fg} p-7 transition-transform hover:-translate-y-1`}
            >
              <span className="font-display text-7xl font-extrabold opacity-90">
                {s.n}
              </span>
              <div className="mt-12">
                <h3 className="font-display text-2xl font-extrabold leading-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-base opacity-90">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
