import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import usePageMeta from "../hooks/usePageMeta";
import { site } from "../data/site";

const ease: [number, number, number, number] = [0.21, 0.65, 0.36, 1];

/** Custom success page Netlify redirects to after a form submission. */
export default function Thanks() {
  usePageMeta(`Message sent | ${site.name}`);

  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-28 text-center">
      {/* Faded grid for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(29,29,31,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(29,29,31,0.055)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(46rem_30rem_at_50%_42%,black,transparent)]"
      />
      {/* Aurora — yellow / blue / purple / orange */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(42rem_28rem_at_50%_78%,rgba(139,92,246,0.12),transparent),radial-gradient(30rem_20rem_at_10%_28%,rgba(251,191,36,0.12),transparent),radial-gradient(34rem_22rem_at_90%_32%,rgba(58,162,255,0.12),transparent),radial-gradient(24rem_16rem_at_78%_88%,rgba(255,138,61,0.08),transparent)]"
      />

      <div className="relative">
        <motion.div
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 16 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-linear-to-br from-accent to-grape shadow-xl shadow-accent/30"
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
            <motion.path
              d="M4.5 12.5l5 5 10-11"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.35, duration: 0.5, ease }}
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          <p className="mt-8 font-code text-xs font-semibold uppercase tracking-widest text-ink/40 sm:text-sm">
            Message received
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">
            Thank you.
            <br />
            <span className="bg-linear-to-r from-accent-soft to-grape bg-clip-text text-transparent">
              Talk soon.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-ink/55 sm:text-base">
            Your message is in my inbox — I'll get back to you shortly. In the
            meantime, my work is one click away.
          </p>

          <div className="mx-auto mt-9 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
            <Link
              to="/#work"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep sm:text-base"
            >
              See my work
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/60 px-6 py-3 text-sm font-semibold text-ink/70 ring-1 ring-black/10 backdrop-blur-md transition-colors hover:text-ink sm:text-base"
            >
              Back to home
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
