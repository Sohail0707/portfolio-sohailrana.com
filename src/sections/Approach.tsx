import { useRef } from "react";
import SectionHeading from "../components/SectionHeading";
import { SearchIcon, PenToolIcon, CodeIcon, PlaneIcon } from "../components/icons";
import { Float, ChatBit, FrameBit, TerminalBit, StatusBit } from "../components/decor";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { approach } from "../data/site";

/** Themed prop shown in each step's empty half of the timeline. */
const stepDecor = [
  <ChatBit text="We're stuck on a platform we can't customise…" />,
  <FrameBit label="Homepage / 1440×900" />,
  <TerminalBit />,
  <StatusBit text="Live — deployed to production" />,
];

const stepStyles = [
  {
    Icon: SearchIcon,
    text: "text-lime",
    dotBorder: "border-lime",
    dotFill: "bg-lime",
    glow: "shadow-[0_0_28px_rgba(201,242,75,0.5)]",
    cardBorder: "hover:border-lime/50",
  },
  {
    Icon: PenToolIcon,
    text: "text-cyan",
    dotBorder: "border-cyan",
    dotFill: "bg-cyan",
    glow: "shadow-[0_0_28px_rgba(75,225,236,0.5)]",
    cardBorder: "hover:border-cyan/50",
  },
  {
    Icon: CodeIcon,
    text: "text-violet",
    dotBorder: "border-violet",
    dotFill: "bg-violet",
    glow: "shadow-[0_0_28px_rgba(167,139,250,0.5)]",
    cardBorder: "hover:border-violet/50",
  },
  {
    Icon: PlaneIcon,
    text: "text-orange",
    dotBorder: "border-orange",
    dotFill: "bg-orange",
    glow: "shadow-[0_0_28px_rgba(255,169,77,0.5)]",
    cardBorder: "hover:border-orange/50",
  },
];

/**
 * Scroll-driven vertical timeline: the center line fills and a glowing
 * orb rides it as you scroll; each step's dot pops and its card lights
 * up when reached (and dims again when you scroll back).
 */
export default function Approach() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const timeline = ref.current!.querySelector<HTMLElement>(".timeline");
      const scrub = {
        trigger: timeline,
        start: "top 60%",
        end: "bottom 60%",
        scrub: 0.4,
      };

      gsap.fromTo(
        ".timeline-fill",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: scrub },
      );
      gsap.fromTo(
        ".timeline-orb",
        { y: 0 },
        {
          y: () => (timeline?.offsetHeight ?? 0) - 20,
          ease: "none",
          scrollTrigger: { ...scrub, invalidateOnRefresh: true },
        },
      );

      gsap.utils.toArray<HTMLElement>(".timeline-step").forEach((step) => {
        const activate = {
          trigger: step,
          start: "top 65%",
          toggleActions: "play none none reverse",
        };
        gsap.fromTo(
          step.querySelector("article"),
          { opacity: 0.25, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", scrollTrigger: activate },
        );
        gsap.fromTo(
          step.querySelector(".timeline-dot"),
          { scale: 0.3, opacity: 0.4 },
          { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2.5)", scrollTrigger: activate },
        );
      });

      // Step icons draw themselves in when their card activates.
      gsap.utils.toArray<SVGSVGElement>(".icon-draw").forEach((svg) => {
        const shapes = svg.querySelectorAll<SVGGeometryElement>(
          "path, circle, rect, line, polyline, ellipse",
        );
        shapes.forEach((shape) => {
          const len = shape.getTotalLength();
          shape.style.strokeDasharray = `${len}`;
          shape.style.strokeDashoffset = `${len}`;
        });
        gsap.to(shapes, {
          strokeDashoffset: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "power2.inOut",
          scrollTrigger: { trigger: svg, start: "top 75%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="approach"
      className="scroll-mt-16 border-t border-line py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          num="04"
          title="How I Work"
          accent="orange"
          intro="A process built to remove surprises — you approve the design before development starts, and you leave owning the code."
        />

        <div className="timeline relative">
          {/* Center line (left-aligned on mobile) with scroll-driven fill. */}
          <div aria-hidden className="absolute inset-y-0 left-5 w-px -translate-x-1/2 bg-line md:left-1/2">
            <div className="timeline-fill absolute inset-0 origin-top bg-gradient-to-b from-lime via-cyan via-violet to-orange" />
          </div>

          {/* Glowing orb that rides the line as you scroll. */}
          <div
            aria-hidden
            className="timeline-orb absolute left-5 top-0 z-10 -translate-x-1/2 md:left-1/2"
          >
            <div className="h-10 w-px bg-gradient-to-t from-lime/70 to-transparent absolute bottom-full left-1/2 -translate-x-1/2" />
            <div className="h-5 w-5 rounded-full bg-lime shadow-[0_0_30px_rgba(201,242,75,0.8)]" />
          </div>

          <ol>
            {approach.map((step, i) => {
              const s = stepStyles[i % stepStyles.length];
              const even = i % 2 === 0;
              return (
                <li
                  key={step.title}
                  className="timeline-step relative py-6 pl-14 md:grid md:grid-cols-2 md:gap-24 md:py-10 md:pl-0"
                >
                  <span
                    className={`timeline-dot absolute left-5 top-12 z-10 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full border-2 bg-ink md:left-1/2 md:top-16 ${s.dotBorder} ${s.glow}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${s.dotFill}`} />
                    <span
                      aria-hidden
                      className={`absolute top-1/2 hidden h-px w-12 bg-line md:block ${even ? "left-full" : "right-full"}`}
                    />
                  </span>

                  <div
                    className={`hidden md:row-start-1 md:flex md:items-center ${
                      even ? "md:col-start-2 md:justify-start md:pl-6" : "md:col-start-1 md:justify-end md:pr-6"
                    }`}
                  >
                    <Float depth={0.5}>{stepDecor[i % stepDecor.length]}</Float>
                  </div>

                  <article
                    className={`rounded-2xl border border-line bg-panel p-6 transition-colors sm:p-7 md:row-start-1 md:p-8 ${s.cardBorder} ${even ? "md:col-start-1" : "md:col-start-2"}`}
                  >
                    <div className="flex items-center gap-4">
                      <s.Icon className={`icon-draw h-9 w-9 ${s.text}`} />
                      <span className={`font-display text-3xl font-bold sm:text-4xl ${s.text}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
