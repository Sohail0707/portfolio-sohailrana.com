import { motion, useReducedMotion } from "framer-motion";

/**
 * Decorative hero graphic: a browser window split into a Figma-style design
 * pane and a code pane — design and development, side by side.
 * Graphics are multicolor (Stripe-style); blurple marks actionable elements.
 */
export default function BrowserMock() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="overflow-hidden rounded-2xl bg-white/70 shadow-2xl shadow-ink/10 ring-1 ring-white/60 backdrop-blur-2xl sm:rounded-3xl"
    >
      {/* Title bar */}
      <div className="relative flex h-10 items-center border-b border-black/5 bg-white/40 px-4 sm:h-11">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black/5 px-4 py-1 text-[11px] font-medium text-ink/50">
          <span className="mr-1">🔒</span>sohailrana.com
        </div>
      </div>

      <div className="grid sm:grid-cols-2">
        {/* ── Design pane ───────────────────────────────────────────── */}
        <div className="relative border-b border-black/5 bg-mist/50 p-5 pt-12 sm:border-b-0 sm:border-r sm:p-7 sm:pt-14">
          <span className="absolute left-4 top-4 rounded-md bg-white px-2 py-1 font-code text-[10px] font-medium text-ink/50 shadow-sm">
            home.fig
          </span>

          {/* Artboard */}
          <div className="relative rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
            {/* mini nav */}
            <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-md bg-ink" />
                <span className="h-1.5 w-8 rounded-full bg-ink/15" />
                <span className="h-1.5 w-6 rounded-full bg-ink/15" />
              </div>
              <span className="h-4 w-12 rounded-full bg-accent" />
            </div>

            {/* mini hero: copy left, gradient art right */}
            <div className="mt-3.5 flex gap-3">
              <div className="min-w-0 flex-1">
                <div className="h-3 w-11/12 rounded-full bg-ink/85" />
                <div className="mt-1.5 h-3 w-3/5 rounded-full bg-ink/85" />
                <div className="mt-2.5 h-1.5 w-4/5 rounded-full bg-ink/20" />
                <div className="mt-1.5 h-1.5 w-3/5 rounded-full bg-ink/15" />

                {/* selected buttons */}
                <div className="relative mt-3.5 inline-flex gap-2">
                  <div className="absolute -inset-1.5 rounded-lg border border-dashed border-accent-soft">
                    <span className="absolute -left-1 -top-1 h-1.5 w-1.5 rounded-[2px] border border-accent-soft bg-white" />
                    <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-[2px] border border-accent-soft bg-white" />
                    <span className="absolute -bottom-1 -left-1 h-1.5 w-1.5 rounded-[2px] border border-accent-soft bg-white" />
                    <span className="absolute -bottom-1 -right-1 h-1.5 w-1.5 rounded-[2px] border border-accent-soft bg-white" />
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-accent-soft px-1.5 py-0.5 font-code text-[8px] font-medium text-white">
                      128 × 36
                    </span>
                  </div>
                  <div className="h-6 w-20 rounded-full bg-accent" />
                  <div className="h-6 w-16 rounded-full border border-ink/20 bg-white" />
                </div>
              </div>

              {/* gradient art tile — multicolor, Stripe-style */}
              <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-linear-to-br from-[#ffb44d] via-[#ff8a3d] to-grape sm:h-32 sm:w-28">
                <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-accent-soft/70 blur-md" />
                <div className="absolute -bottom-5 -left-3 h-14 w-14 rounded-full bg-grape/80 blur-md" />
                <div className="absolute inset-x-2.5 bottom-2.5 rounded-md bg-white/85 p-1.5 backdrop-blur-sm">
                  <div className="h-1 w-3/4 rounded-full bg-ink/40" />
                  <div className="mt-1 h-1 w-1/2 rounded-full bg-ink/20" />
                </div>
              </div>
            </div>

            {/* mini card row */}
            <div className="mt-6 grid grid-cols-3 gap-2">
              {["#fbbf24", "#3aa2ff", "#8b5cf6"].map((dot) => (
                <div key={dot} className="rounded-lg bg-mist/80 p-2 ring-1 ring-black/5">
                  <span
                    className="block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: dot }}
                  />
                  <div className="mt-1.5 h-1 w-4/5 rounded-full bg-ink/25" />
                  <div className="mt-1 h-1 w-3/5 rounded-full bg-ink/10" />
                </div>
              ))}
            </div>

            {/* spacing measurement */}
            <div className="absolute -left-2.5 top-12 bottom-16 hidden w-px bg-accent-soft/60 sm:block">
              <span className="absolute -left-0.5 top-0 h-px w-1.5 bg-accent-soft/60" />
              <span className="absolute -left-0.5 bottom-0 h-px w-1.5 bg-accent-soft/60" />
              <span className="absolute -left-6 top-1/2 -translate-y-1/2 font-code text-[8px] font-medium text-accent-soft">
                24
              </span>
            </div>
          </div>

          {/* Swatches */}
          <div className="mt-4 flex items-center gap-2">
            {["#635bff", "#3aa2ff", "#8b5cf6", "#ff8a3d", "#fbbf24"].map((c) => (
              <span
                key={c}
                className="h-5 w-5 rounded-full ring-1 ring-black/10"
                style={{ backgroundColor: c }}
              />
            ))}
            <span className="ml-1 text-[10px] font-medium text-ink/40">
              Aa · SF Pro
            </span>
          </div>

          {/* Multiplayer cursor */}
          <motion.div
            className="absolute right-14 top-20"
            animate={
              reduceMotion
                ? undefined
                : { x: [0, -52, -18, -70, 0], y: [0, 52, 110, 36, 0] }
            }
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 3l14 7.5-6.2 1.6L9.5 18 5 3z"
                fill="#635bff"
                stroke="#fff"
                strokeWidth="1.4"
              />
            </svg>
            <span className="ml-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-white">
              Sr
            </span>
          </motion.div>
        </div>

        {/* ── Code pane ─────────────────────────────────────────────── */}
        <div className="relative bg-[#0d1017] p-5 pt-12 sm:p-7 sm:pt-14">
          <span className="absolute left-4 top-4 rounded-md bg-white/10 px-2 py-1 font-code text-[10px] font-medium text-white/50">
            index.html
          </span>

          <pre className="overflow-x-auto font-code text-[11px] leading-7 text-white/80 sm:text-xs">
            <code>
              <span className="text-white/25">{"1  "}</span>
              <span className="text-sky-300">{"<nav "}</span>
              <span className="text-violet-300">class</span>
              <span className="text-white/60">=</span>
              <span className="text-emerald-300">"nav"</span>
              <span className="text-sky-300">{">"}</span>
              {"\n"}
              <span className="text-white/25">{"2    "}</span>
              <span className="text-sky-300">{"<a "}</span>
              <span className="text-violet-300">class</span>
              <span className="text-white/60">=</span>
              <span className="text-emerald-300">"logo"</span>
              <span className="text-sky-300">{">"}</span>
              <span>Sr</span>
              <span className="text-sky-300">{"</a>"}</span>
              {"\n"}
              <span className="text-white/25">{"3  "}</span>
              <span className="text-sky-300">{"</nav>"}</span>
              {"\n"}
              <span className="text-white/25">{"4  "}</span>
              <span className="text-sky-300">{"<section "}</span>
              <span className="text-violet-300">class</span>
              <span className="text-white/60">=</span>
              <span className="text-emerald-300">"hero"</span>
              <span className="text-sky-300">{">"}</span>
              {"\n"}
              <span className="text-white/25">{"5    "}</span>
              <span className="text-sky-300">{"<h1>"}</span>
              <span>Design, shipped 1:1.</span>
              <span className="text-sky-300">{"</h1>"}</span>
              {"\n"}
              <span className="text-white/25">{"6    "}</span>
              <span className="text-sky-300">{"<p>"}</span>
              <span>Pixel-perfect, hand-coded.</span>
              <span className="text-sky-300">{"</p>"}</span>
              {"\n"}
              <span className="text-white/25">{"7    "}</span>
              <span className="text-sky-300">{"<a "}</span>
              <span className="text-violet-300">class</span>
              <span className="text-white/60">=</span>
              <span className="text-emerald-300">"btn"</span>
              <span className="text-sky-300">{">"}</span>
              <span>Start a project</span>
              <span className="text-sky-300">{"</a>"}</span>
              {"\n"}
              <span className="text-white/25">{"8  "}</span>
              <span className="text-sky-300">{"</section>"}</span>
              {"\n"}
              <span className="text-white/25">{"9  "}</span>
              <span className="text-sky-300">{"<ul "}</span>
              <span className="text-violet-300">class</span>
              <span className="text-white/60">=</span>
              <span className="text-emerald-300">"cards"</span>
              <span className="text-sky-300">{">"}</span>
              <span className="text-white/40">…</span>
              <span className="text-sky-300">{"</ul>"}</span>
              <motion.span
                className="ml-1 inline-block h-3.5 w-[7px] translate-y-0.5 bg-accent-soft"
                animate={reduceMotion ? undefined : { opacity: [1, 0, 1] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              />
            </code>
          </pre>

          <div className="mt-6 flex items-center justify-between text-[10px] font-medium text-white/40">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Build passing · 0 templates used
            </span>
            <span className="font-code">100 · Lighthouse</span>
          </div>
        </div>
      </div>
    </div>
  );
}
