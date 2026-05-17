import Link from "next/link";
import { Logo } from "./Logo";

const cols: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Book",
    links: [
      { href: "/browse", label: "Browse musicians" },
      { href: "/browse?eventType=Wedding", label: "Weddings" },
      { href: "/browse?eventType=Restaurant", label: "Restaurants" },
      { href: "/browse?eventType=Corporate", label: "Corporate" },
    ],
  },
  {
    title: "Loftnote",
    links: [
      { href: "/about", label: "About us" },
      { href: "/trust", label: "Trust & safety" },
      { href: "/help", label: "Help center" },
    ],
  },
  {
    title: "Musicians",
    links: [
      { href: "/musicians/join", label: "List your act" },
      { href: "/musicians/resources", label: "Resources" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-paper)]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-[var(--color-muted)]">
              The easiest way to book live music for any event.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--color-ink)]">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-2">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--color-line)] pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-[var(--color-muted)]">
            © {new Date().getFullYear()} Loftnote, Inc.
          </p>
          <ul className="flex gap-5 text-xs text-[var(--color-muted)]">
            <li>
              <Link href="/privacy" className="hover:text-[var(--color-ink)]">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[var(--color-ink)]">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-[var(--color-ink)]">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
