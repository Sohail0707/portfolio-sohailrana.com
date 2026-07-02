import { useRef } from "react";
import Reveal from "./Reveal";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";

export type Accent = "lime" | "cyan" | "violet" | "orange";

const accentText: Record<Accent, string> = {
  lime: "text-lime",
  cyan: "text-cyan",
  violet: "text-violet",
  orange: "text-orange",
};

const accentLine: Record<Accent, string> = {
  lime: "from-lime",
  cyan: "from-cyan",
  violet: "from-violet",
  orange: "from-orange",
};

interface SectionHeadingProps {
  num: string;
  title: string;
  /** Optional short line under the title. */
  intro?: string;
  accent?: Accent;
}

/** Numbered section header — "01 / SELECTED WORK" with a rule line that draws in. */
export default function SectionHeading({
  num,
  title,
  intro,
  accent = "lime",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".heading-line", {
        scaleX: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Reveal className="mb-12 md:mb-16">
      <div ref={ref} className="flex items-baseline gap-4">
        <span className={`font-mono text-sm md:text-base ${accentText[accent]}`}>{num}</span>
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">
          {title}
        </h2>
        <span aria-hidden className="relative ml-2 hidden h-px flex-1 self-center sm:block">
          <span className="absolute inset-0 bg-line" />
          <span
            className={`heading-line absolute inset-0 origin-left bg-gradient-to-r to-transparent ${accentLine[accent]}`}
          />
        </span>
      </div>
      {intro && <p className="mt-4 max-w-xl text-muted md:ml-10">{intro}</p>}
    </Reveal>
  );
}
