import Link from "next/link";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/browse", label: "Browse musicians" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#event-types", label: "Event types" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Loftnote home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-pink)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/musicians/join"
            className="hidden text-xs font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-pink)] sm:inline"
          >
            Are you a musician?
          </Link>
          <Link
            href="/browse"
            className="inline-flex h-10 items-center rounded-full bg-[var(--color-pink)] px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[var(--color-blue)]"
          >
            Book live music
          </Link>
        </div>
      </nav>
    </header>
  );
}
