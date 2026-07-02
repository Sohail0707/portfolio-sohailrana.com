import { Link } from "react-router-dom";
import { navLinks, site } from "../data/site";

const socials = [
  { label: "Upwork", href: site.links.upwork },
  { label: "GitHub", href: site.links.github },
  { label: "LinkedIn", href: site.links.linkedin },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link to="/" className="font-display text-3xl font-bold text-paper">
              {site.logo}
              <span className="text-lime">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted">
              {site.role} — {site.tagline}.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-[13px] uppercase tracking-wide text-muted transition-colors hover:text-lime"
                  >
                    <span className="mr-1 text-lime/70">{link.num}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-5">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted underline decoration-line underline-offset-4 transition-colors hover:text-lime hover:decoration-lime"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Designed in Figma. Hand-coded with React &amp; Tailwind.</p>
        </div>
      </div>
    </footer>
  );
}
