import { Link } from "react-router-dom";
import Logo from "./Logo";
import { navLinks, site } from "../data/site";

const socials = [
  { label: "Upwork", href: site.links.upwork },
  { label: "GitHub", href: site.links.github },
  { label: "LinkedIn", href: site.links.linkedin },
] as const;

export default function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo tone="light" />
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Design and code, one person. Figma to pixel-perfect, hand-coded
              websites.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Site
              </p>
              <ul className="mt-3 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Elsewhere
              </p>
              <ul className="mt-3 space-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {s.label}
                      <span className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {site.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.domain}
          </p>
          <p>Designed in Figma. Hand-coded by me — naturally.</p>
        </div>
      </div>
    </footer>
  );
}
