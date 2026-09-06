import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";

const starColors = ["text-lime", "text-cyan", "text-violet", "text-orange"];

interface ScrollBannerProps {
  words: string[];
  /** 1 moves left as you scroll down, -1 moves right. */
  direction?: 1 | -1;
}

/**
 * Full-bleed strip of giant type that slides horizontally, scrubbed by
 * scroll position — the separators spin with the same scrub.
 */
export default function ScrollBanner({ words, direction = 1 }: ScrollBannerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const scrub = {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      };
      // Both endpoints stay negative so the row always overhangs the left
      // edge; the extra repeats keep the right edge covered too.
      gsap.fromTo(
        ".banner-row",
        { xPercent: direction === 1 ? -6 : -20 },
        { xPercent: direction === 1 ? -20 : -6, ease: "none", scrollTrigger: scrub },
      );
      gsap.to(".banner-star", {
        rotate: direction * 360,
        ease: "none",
        scrollTrigger: scrub,
      });
    },
    { scope: ref },
  );

  // Repeat the word set so the row is wider than any viewport, with room
  // to spare for the scrubbed horizontal travel.
  const repeated = Array.from({ length: 6 }, () => words).flat();

  return (
    <div
      ref={ref}
      aria-hidden
      className="overflow-hidden border-y border-line py-6 sm:py-10 md:py-14"
    >
      <div className="banner-row flex w-max items-center gap-5 whitespace-nowrap sm:gap-8 md:gap-12">
        {repeated.map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center gap-5 sm:gap-8 md:gap-12">
            <span
              className={`font-display text-4xl font-bold uppercase tracking-tight sm:text-6xl md:text-8xl ${
                i % 2 === 0 ? "text-paper" : "text-outline"
              }`}
            >
              {word}
            </span>
            <span
              className={`banner-star inline-block text-2xl sm:text-4xl md:text-6xl ${starColors[i % starColors.length]}`}
            >
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
