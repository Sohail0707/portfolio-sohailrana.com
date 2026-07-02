import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";

/** Thin gradient bar along the top edge that fills as you scroll the page. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.4 },
      },
    );
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-lime via-cyan to-violet"
    />
  );
}
