import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { Float, CursorBit, BrowserBit, CodeBit } from "../components/decor";
import { site } from "../data/site";

const socials = [
  { label: "Upwork", href: site.links.upwork },
  { label: "GitHub", href: site.links.github },
  { label: "LinkedIn", href: site.links.linkedin },
];

const statColors = ["text-lime", "text-cyan", "text-violet", "text-orange"];

/**
 * Parses "100%", "5.0", "50+" into a tween target + display format.
 * Returns null for text stats like "Top Rated", which aren't counted up.
 */
function parseStat(value: string) {
  const num = parseFloat(value);
  if (Number.isNaN(num)) return null;
  const suffix = value.replace(/[\d.]/g, "");
  const decimals = value.includes(".") ? 1 : 0;
  return { num, suffix, decimals };
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const fadeUp = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.21, 0.65, 0.36, 1] as const },
  });

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Headline lines rise out of clipped wrappers on load.
      gsap.from(".hero-line", {
        yPercent: 110,
        duration: 1,
        stagger: 0.13,
        ease: "power4.out",
        delay: 0.15,
      });

      // The lime glow sinks and fades as the hero scrolls away.
      gsap.to(".hero-glow", {
        yPercent: 50,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Stats count up once they scroll into view.
      gsap.utils.toArray<HTMLElement>(".stat-value").forEach((el) => {
        const parsed = parseStat(el.dataset.value ?? "0");
        if (!parsed) return;
        const { num, suffix, decimals } = parsed;
        const proxy = { v: 0 };
        gsap.to(proxy, {
          v: num,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => {
            el.textContent = proxy.v.toFixed(decimals) + suffix;
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-16">
      {/* Lime glow anchoring the hero, helloupdigital-style. */}
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-lime/15 blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        {/* Floating industry props at different depths. */}
        <Float depth={0.5} className="absolute right-[4%] top-16 hidden -rotate-6 opacity-80 lg:block">
          <BrowserBit />
        </Float>
        <Float depth={1.4} className="absolute right-[16%] top-[44%] hidden md:block">
          <CursorBit label="design" colorClass="text-cyan" />
        </Float>
        <Float depth={1} className="absolute right-[6%] top-[64%] hidden md:block">
          <CursorBit label="code" colorClass="text-lime" />
        </Float>
        <Float depth={0.8} className="absolute right-[34%] top-24 hidden xl:block">
          <CodeBit token="</div>" className="text-xl text-violet/50" />
        </Float>
        <Float depth={1.2} className="absolute right-[28%] top-[58%] hidden xl:block">
          <CodeBit token="{ }" className="text-2xl text-orange/50" />
        </Float>

        <motion.div {...fadeUp(0)} className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-panel px-4 py-2 font-mono text-xs text-paper">
            <span className="h-2 w-2 rounded-full bg-lime animate-pulse-dot" />
            {site.availability}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            00 / {site.role}
          </span>
        </motion.div>

        <h1 className="mt-6 font-display text-[11vw] font-bold uppercase leading-[0.95] tracking-tight sm:mt-8 sm:text-7xl md:text-8xl">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="hero-line block">Headless CMS</span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="hero-line text-gradient block">sites you</span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="hero-line text-outline block">actually own.</span>
          </span>
        </h1>

        <motion.p {...fadeUp(0.35)} className="mt-6 max-w-xl leading-relaxed text-muted sm:mt-8 sm:text-lg">
          I'm {site.name} — a Next.js and Sanity developer for startups, SaaS
          teams, and agencies. I move sites off restrictive builders and
          AI-generated code onto clean, hand-coded architecture your team owns
          outright.
        </motion.p>

        <motion.div
          {...fadeUp(0.45)}
          className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <a
            href="/#contact"
            className="rounded-full bg-lime px-7 py-3.5 text-center font-display text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 sm:px-8 sm:py-4 sm:text-base"
          >
            Start a project
          </a>
          <a
            href="/#work"
            className="rounded-full border border-line px-7 py-3.5 text-center font-display text-sm font-semibold text-paper transition-colors hover:border-lime hover:text-lime sm:px-8 sm:py-4 sm:text-base"
          >
            See my work
          </a>
          <ul className="flex justify-center gap-4 pt-2 sm:justify-start sm:pt-0 sm:ml-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs uppercase tracking-wide text-muted underline decoration-line underline-offset-4 transition-colors hover:text-lime hover:decoration-lime"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.dl
          {...fadeUp(0.55)}
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:mt-16 sm:gap-y-8 md:grid-cols-4 md:pt-10"
        >
          {site.stats.map((stat, i) => (
            <div key={stat.label}>
              {/* Fluid below sm so the widest value ("Top Rated") stays on
                  one line on narrow phones. */}
              <dd
                className={`stat-value font-display text-[clamp(1.5rem,6.5vw,1.875rem)] font-bold sm:text-4xl md:text-5xl ${statColors[i % statColors.length]}`}
                data-value={stat.value}
              >
                {stat.value}
              </dd>
              <dt className="mt-1.5 text-sm text-muted">{stat.label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
