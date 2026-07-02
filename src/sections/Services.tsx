import { useRef } from "react";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { LayoutIcon, CodeIcon, DatabaseIcon } from "../components/icons";
import { Float, FrameBit, CursorBit } from "../components/decor";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { services } from "../data/site";

/** Per-card accent + icon so the three services each get their own color. */
const cardAccents = [
  { Icon: LayoutIcon, text: "text-cyan", border: "hover:border-cyan/50" },
  { Icon: CodeIcon, text: "text-violet", border: "hover:border-violet/50" },
  { Icon: DatabaseIcon, text: "text-orange", border: "hover:border-orange/50" },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Icons draw themselves stroke-by-stroke when scrolled into view,
      // then float gently forever.
      gsap.utils.toArray<SVGSVGElement>(".icon-draw").forEach((svg, i) => {
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
          duration: 1.2,
          stagger: 0.12,
          ease: "power2.inOut",
          scrollTrigger: { trigger: svg, start: "top 88%", once: true },
        });
        gsap.to(svg, {
          y: -5,
          duration: 2.2 + i * 0.3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="services"
      className="relative scroll-mt-16 overflow-hidden border-t border-line py-20 md:py-28"
    >
      <Float depth={0.7} className="absolute right-[7%] top-14 hidden rotate-3 xl:block">
        <div className="relative">
          <FrameBit />
          <div className="absolute -bottom-4 -right-6">
            <CursorBit label="client" colorClass="text-violet" />
          </div>
        </div>
      </Float>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          num="02"
          title="What I Do"
          accent="cyan"
          intro="One person, the whole pipeline — from the first Figma frame to the live site."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service, i) => {
            const accent = cardAccents[i % cardAccents.length];
            return (
              <Reveal key={service.title} delay={i * 0.1}>
                <article
                  className={`group h-full rounded-2xl border border-line bg-panel p-7 transition-colors md:p-8 ${accent.border}`}
                >
                  <div className="flex items-start justify-between">
                    <accent.Icon className={`icon-draw h-10 w-10 ${accent.text}`} />
                    <span className={`font-mono text-sm ${accent.text}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold">{service.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5 text-sm text-paper">
                        <span aria-hidden className={accent.text}>→</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
