import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";

/* Radial gradients instead of filter:blur — a fraction of the paint cost,
   which matters because these are full-screen fixed layers animated forever. */
const blobs = [
  {
    cls: "left-[-14%] top-[10%] h-[36rem] w-[36rem]",
    bg: "radial-gradient(circle, rgba(167,139,250,0.14) 0%, rgba(167,139,250,0) 65%)",
  },
  {
    cls: "right-[-16%] top-[40%] h-[40rem] w-[40rem]",
    bg: "radial-gradient(circle, rgba(75,225,236,0.12) 0%, rgba(75,225,236,0) 65%)",
  },
  {
    cls: "left-[15%] bottom-[-14%] h-[34rem] w-[34rem]",
    bg: "radial-gradient(circle, rgba(255,169,77,0.10) 0%, rgba(255,169,77,0) 65%)",
  },
];

/* Deterministic star field: pos %, px size, animation delay s. */
const stars = [
  [6, 18, 2, 0], [14, 62, 1.5, 1.8], [21, 9, 1.5, 3.1], [28, 44, 2, 0.7],
  [33, 81, 1.5, 2.4], [41, 27, 1.5, 4.0], [48, 66, 2, 1.2], [55, 12, 1.5, 2.9],
  [61, 51, 1.5, 0.4], [67, 88, 2, 3.6], [72, 33, 1.5, 1.5], [78, 70, 1.5, 2.1],
  [84, 21, 2, 4.3], [89, 57, 1.5, 0.9], [94, 38, 1.5, 3.3], [10, 90, 1.5, 2.7],
] as const;

/**
 * Fixed, slowly drifting color blobs behind the page content. Sits at
 * negative z-index so opaque panels cover it while open sections let
 * the color bleed through.
 */
export default function Aurora() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".aurora-blob").forEach((blob, i) => {
        gsap.to(blob, {
          x: () => gsap.utils.random(-90, 90),
          y: () => gsap.utils.random(-70, 70),
          scale: () => gsap.utils.random(0.85, 1.2),
          duration: 13 + i * 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          repeatRefresh: true,
        });
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {blobs.map((blob) => (
        <div
          key={blob.cls}
          className={`aurora-blob absolute will-change-transform ${blob.cls}`}
          style={{ background: blob.bg }}
        />
      ))}
      {stars.map(([left, top, size, delay]) => (
        <span
          key={`${left}-${top}`}
          className="animate-twinkle absolute rounded-full bg-paper"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            height: size,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </div>
  );
}
