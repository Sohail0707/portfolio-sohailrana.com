import { useRef, type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import BrowserMock from "../components/BrowserMock";
import { site } from "../data/site";

const ease: [number, number, number, number] = [0.21, 0.65, 0.36, 1];

function FloatingPill({
  children,
  className,
  delay = 0,
  depth = 22,
  mouseX,
  mouseY,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Parallax distance in px at the hero's edge; negative inverts direction. */
  depth?: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const spring = { stiffness: 50, damping: 16, mass: 0.8 };
  const x = useSpring(
    useTransform(mouseX, (v) => (reduceMotion ? 0 : v * depth)),
    spring,
  );
  const y = useSpring(
    useTransform(mouseY, (v) => (reduceMotion ? 0 : v * depth)),
    spring,
  );

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, ease }}
      style={{ x, y }}
      className={`absolute z-10 hidden lg:block ${className ?? ""}`}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 1.6,
        }}
        style={{ willChange: "transform" }}
        className="flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm font-medium text-ink shadow-lg shadow-ink/10 ring-1 ring-white/60 backdrop-blur-md"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mockY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90]);
  const mockScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.96]);

  // Normalized cursor position within the hero (-0.5 … 0.5) driving the pills.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40"
    >
      {/* Faded grid for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(29,29,31,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(29,29,31,0.055)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(62rem_38rem_at_50%_26%,black,transparent)]"
      />
      {/* Aurora — yellow / blue / purple / orange only on light backgrounds */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(52rem_28rem_at_50%_-6rem,rgba(58,162,255,0.10),transparent),radial-gradient(56rem_36rem_at_50%_74%,rgba(139,92,246,0.13),transparent),radial-gradient(34rem_26rem_at_5%_80%,rgba(251,191,36,0.13),transparent),radial-gradient(38rem_28rem_at_95%_62%,rgba(58,162,255,0.13),transparent),radial-gradient(28rem_20rem_at_88%_14%,rgba(255,138,61,0.08),transparent)]"
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
            <span className="bg-linear-to-r from-accent-soft via-accent to-grape bg-clip-text text-transparent">
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
            I'm {site.name} — one person for design and code. Figma to fast,
            hand-coded websites. No templates, no handoff gap.
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
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep sm:text-base"
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
          <FloatingPill
            delay={0.9}
            depth={26}
            mouseX={mouseX}
            mouseY={mouseY}
            className="-left-10 top-10"
          >
            <span className="h-2 w-2 rounded-full bg-upwork" /> 100% Job Success
          </FloatingPill>
          <FloatingPill
            delay={1.1}
            depth={-20}
            mouseX={mouseX}
            mouseY={mouseY}
            className="-right-12 top-24"
          >
            ★★★★★ <span className="text-ink/50">5.0 rating</span>
          </FloatingPill>
          <FloatingPill
            delay={1.3}
            depth={32}
            mouseX={mouseX}
            mouseY={mouseY}
            className="-left-14 bottom-16"
          >
            <span className="font-code text-accent">&lt;/&gt;</span> Hand-coded,
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
