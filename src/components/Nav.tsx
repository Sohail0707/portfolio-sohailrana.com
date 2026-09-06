import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, site } from "../data/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  // Close the mobile menu on navigation and lock scroll while it's open.
  useEffect(() => setOpen(false), [pathname, hash]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link
          to="/"
          className="font-display text-2xl font-bold text-paper transition-colors hover:text-lime"
          aria-label={`${site.name} — home`}
        >
          {site.logo}
          <span className="text-lime">.</span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group font-mono text-[13px] uppercase tracking-wide text-muted transition-colors hover:text-paper"
              >
                <span className="mr-1 text-lime/70 transition-colors group-hover:text-lime">
                  {link.num}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="/#contact"
            className="hidden rounded-full bg-lime px-5 py-2 font-display text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 sm:block"
          >
            Hire me
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={`h-0.5 w-6 bg-paper transition-transform ${open ? "translate-y-1 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-paper transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>
    </header>

      {/* Mobile menu lives outside the header: its backdrop-blur would
          otherwise become the containing block for this fixed overlay. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-ink/95 backdrop-blur-lg lg:hidden"
          >
            <ul className="flex flex-col gap-2 px-6 py-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-3.5 font-display text-2xl font-bold uppercase text-paper"
                  >
                    <span className="font-mono text-sm font-normal text-lime">
                      {link.num}
                    </span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-6">
                <a
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-lime px-6 py-3.5 text-center font-display text-lg font-semibold text-ink"
                >
                  Hire me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
