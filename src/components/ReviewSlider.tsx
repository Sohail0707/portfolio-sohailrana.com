import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { reviews } from "../data/reviews";

const INTERVAL_MS = 5500;

/** Auto-rotating client reviews: text, name, and Upwork as the source. */
export default function ReviewSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % reviews.length),
      INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, [paused]);

  const review = reviews[index];

  return (
    <figure
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="flex h-full flex-col justify-between rounded-3xl bg-linear-to-br from-accent/25 to-grape/15 p-6 ring-1 ring-white/10 backdrop-blur-xl sm:p-8"
    >
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
            transition={{ duration: 0.45, ease: [0.21, 0.65, 0.36, 1] }}
            className="text-sm leading-relaxed text-white/85 sm:text-[15px]"
          >
            "{review.text}"
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <figcaption className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {review.name}
              </p>
              <p className="truncate text-xs text-white/50">{review.project}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs leading-none text-amber-400">★★★★★</p>
              <p className="mt-1.5 text-sm font-bold lowercase leading-none tracking-tight text-[#73e273]">
                upwork
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="mt-5 flex gap-1.5">
          {reviews.map((r, i) => (
            <button
              key={r.text.slice(0, 16)}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show review ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-6 bg-white/80" : "w-1.5 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </figcaption>
    </figure>
  );
}
