import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import BrowserMock from "../components/BrowserMock";
import { site } from "../data/site";

const ease: [number, number, number, number] = [0.21, 0.65, 0.36, 1];

function FloatingPill({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, ease }}
      className={`absolute z-10 hidden lg:block ${className ?? ""}`}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        className="flex items-center gap-2 rounded-full bg-white/55 px-4 py-2 text-sm font-medium text-ink shadow-lg shadow-ink/10 ring-1 ring-white/60 backdrop-blur-xl"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mockY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90]);
  const mockScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.96]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40"
    >
      {/* Aurora background — diffused pink/violet core with side glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(52rem_28rem_at_50%_-6rem,rgba(0,113,227,0.10),transparent),radial-gradient(56rem_36rem_at_50%_72%,rgba(233,75,200,0.13),transparent),radial-gradient(34rem_26rem_at_6%_78%,rgba(250,196,80,0.12),transparent),radial-gradient(38rem_28rem_at_94%_64%,rgba(41,151,255,0.13),transparent),radial-gradient(30rem_22rem_at_82%_16%,rgba(123,91,255,0.09),transparent)]"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.a
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
            }}
            href={site.links.upwork}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-1.5 text-xs font-medium text-ink/70 shadow-sm ring-1 ring-white/60 backdrop-blur-xl transition-colors hover:text-ink sm:text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-upwork opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-upwork" />
            </span>
            Available for new projects · 100% Job Success
          </motion.a>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
            }}
            className="mt-6 text-5xl font-bold leading-[1.04] tracking-tight sm:text-7xl"
          >
            <span className="bg-linear-to-r from-accent via-[#7b5bff] to-[#e94bc8] bg-clip-text text-transparent">
              Pixel-perfect
            </span>
            <br />
            websites.
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
            }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg"
          >
            I'm {site.name} — designer and developer in one. I design your
            interface in Figma, then hand-code it into a fast, responsive
            website. No templates, no page builders, no handoff gap.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
            }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <motion.a
              href={site.links.upwork}
              target="_blank"
              rel="noreferrer"
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black sm:text-base"
            >
              Hire me on Upwork
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </motion.a>
            <motion.a
              href="/#work"
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-ink transition-colors hover:text-accent sm:text-base"
            >
              See my work
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </motion.a>
          </motion.div>

          <motion.p
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.8, ease } },
            }}
            className="mt-8 text-xs font-medium uppercase tracking-widest text-ink/40 sm:text-sm"
          >
            ★ 5.0 on Upwork · 50+ websites worked on · Rising Talent
          </motion.p>
        </motion.div>

        {/* Hero graphic */}
        <div className="relative mx-auto mt-14 max-w-4xl sm:mt-20">
          <FloatingPill delay={0.9} className="-left-10 top-10">
            <span className="h-2 w-2 rounded-full bg-upwork" /> 100% Job Success
          </FloatingPill>
          <FloatingPill delay={1.1} className="-right-12 top-24">
            ★★★★★ <span className="text-ink/50">5.0 rating</span>
          </FloatingPill>
          <FloatingPill delay={1.3} className="-left-14 bottom-16">
            <span className="font-mono text-accent">&lt;/&gt;</span> Hand-coded,
            always
          </FloatingPill>

          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease }}
            style={{ y: mockY, scale: mockScale }}
          >
            <BrowserMock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
