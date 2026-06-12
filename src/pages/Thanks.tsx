import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import usePageMeta from "../hooks/usePageMeta";
import { site } from "../data/site";

/** Success page Netlify redirects to after a form submission. */
export default function Thanks() {
  usePageMeta(`Message sent | ${site.name}`);

  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-5 pt-16 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_26rem_at_50%_70%,rgba(139,92,246,0.10),transparent),radial-gradient(30rem_20rem_at_12%_30%,rgba(251,191,36,0.10),transparent),radial-gradient(32rem_22rem_at_88%_36%,rgba(58,162,255,0.10),transparent)]"
      />

      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 18 }}
        className="grid h-16 w-16 place-items-center rounded-full bg-upwork/10 text-3xl text-upwork"
      >
        ✓
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.21, 0.65, 0.36, 1] }}
      >
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Message sent.
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink/55 sm:text-base">
          Thanks for reaching out — I'll get back to you shortly. In the
          meantime, my work is one click away.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/#work"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
          >
            See my work
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-ink/70 ring-1 ring-black/10 transition-colors hover:text-ink"
          >
            Back to home
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
