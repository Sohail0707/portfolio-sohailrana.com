import Reveal from "../components/Reveal";
import { site } from "../data/site";

const capabilities = [
  {
    title: "Pixel-perfect from Figma",
    body: "Your design ships exactly as drawn — spacing, type, states and motion included. No 'that's not how I designed it'.",
    graphic: (
      <div aria-hidden className="flex items-end gap-2">
        <div className="h-10 w-10 rounded-lg border-2 border-dashed border-accent-soft/70" />
        <span className="pb-2 text-white/30">→</span>
        <div className="h-10 w-10 rounded-lg bg-linear-to-br from-accent to-accent-soft" />
      </div>
    ),
  },
  {
    title: "Clean, hand-written code",
    body: "Semantic HTML, tidy class naming, zero page-builder bloat. Easy to maintain, easy to extend.",
    graphic: (
      <div aria-hidden className="space-y-1.5 font-mono text-[11px] leading-none">
        <p className="text-sky-300/80">&lt;ul&gt;</p>
        <p className="pl-3 text-white/60">&lt;li&gt;Semantic HTML.&lt;/li&gt;</p>
        <p className="pl-3 text-white/60">&lt;li&gt;Naming system.&lt;/li&gt;</p>
        <p className="text-sky-300/80">&lt;/ul&gt;</p>
      </div>
    ),
  },
  {
    title: "Jamstack & headless CMS",
    body: "Sanity + Netlify builds you can edit yourself — often for $0/month hosting instead of a subscription.",
    graphic: (
      <div aria-hidden className="flex items-center gap-2 text-[11px] font-semibold">
        <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/70">Sanity</span>
        <span className="text-white/30">+</span>
        <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/70">Netlify</span>
        <span className="text-white/30">=</span>
        <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-emerald-300">$0/mo</span>
      </div>
    ),
  },
  {
    title: "Fast by default",
    body: "Static-first builds with lean assets that load in a blink — performance is a feature, not an upsell.",
    graphic: (
      <div aria-hidden className="flex items-center gap-2">
        <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-emerald-400/70 text-xs font-bold text-emerald-300">
          100
        </span>
        <span className="text-[11px] font-medium text-white/40">
          Performance
        </span>
      </div>
    ),
  },
] as const;

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-night py-20 text-white sm:py-28"
    >
      {/* Aurora glow behind the glass tiles */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(42rem_26rem_at_12%_18%,rgba(41,151,255,0.14),transparent),radial-gradient(38rem_24rem_at_88%_42%,rgba(123,91,255,0.13),transparent),radial-gradient(46rem_28rem_at_45%_96%,rgba(241,63,160,0.10),transparent)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 sm:text-sm">
            About me
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Design and code,
            <br />
            <span className="bg-linear-to-r from-accent-soft via-[#9d7bff] to-[#f06ad6] bg-clip-text text-transparent">
              under one roof.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
            Most clients hire a designer and a developer, then pay for the gap
            between them. I'm both. Because I own the design and the code, one
            person turns your rough idea into a polished product — and spots
            the things that make it better along the way.
          </p>
        </Reveal>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-4">
          {site.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.08] sm:p-8">
                <p className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {stat.value}
                  {stat.value === "5.0" && (
                    <span className="ml-1 align-middle text-2xl text-amber-400">★</span>
                  )}
                </p>
                <p className="mt-2 text-sm text-white/50">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Capabilities */}
        <div className="mt-4 grid gap-3 sm:gap-4 md:grid-cols-2">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.title} delay={(i % 2) * 0.08}>
              <div className="flex h-full flex-col justify-between gap-6 rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.08] sm:p-8">
                <div>
                  <h3 className="text-lg font-semibold sm:text-xl">{cap.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {cap.body}
                  </p>
                </div>
                {cap.graphic}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Story + quote */}
        <div className="mt-4 grid gap-3 sm:gap-4 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <div className="h-full rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur-xl sm:p-8">
              <h3 className="text-lg font-semibold sm:text-xl">
                The short version
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-[15px]">
                I spent close to three years as the go-to designer-developer at
                a US agency, working across its portfolio of 50+ client
                websites — designing booking flows, menu systems and service
                pages in Figma, then implementing them directly in live
                codebases. Full delivery, end to end: design, code, and the
                server in between.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-[15px]">
                Now I bring that same end-to-end ownership to client work on
                Upwork: landing pages that convert, redesigns and rebuilds,
                Jamstack builds, and CMS migrations that cut costs instead of
                adding them.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-2">
            <figure className="flex h-full flex-col justify-between rounded-3xl bg-linear-to-br from-accent/25 to-[#f06ad6]/15 p-6 ring-1 ring-white/10 backdrop-blur-xl sm:p-8">
              <blockquote className="text-sm leading-relaxed text-white/85 sm:text-[15px]">
                "I had an absolutely fantastic experience working with Sohail on
                my website. From the very beginning, Sohail took the time to
                truly understand my brand."
              </blockquote>
              <figcaption className="mt-5 text-xs font-medium text-white/50">
                <span className="text-amber-400">★★★★★</span> · Client review on
                Upwork
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* Tech marquee */}
        <Reveal className="mt-14 sm:mt-16">
          <div
            className="marquee relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            }}
          >
            <div className="animate-marquee flex w-max">
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex shrink-0 items-center"
                >
                  {site.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="flex items-center whitespace-nowrap px-4 text-sm font-medium text-white/45"
                    >
                      <span aria-hidden className="mr-8 text-accent-soft/60">✦</span>
                      {tech}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
