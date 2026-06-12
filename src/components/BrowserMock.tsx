import { motion, useReducedMotion } from "framer-motion";

/**
 * Decorative hero graphic: a browser window split into a Figma-style design
 * pane and a code pane — design and development, side by side.
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
        {/* Design pane */}
        <div className="relative border-b border-black/5 bg-mist/50 p-6 sm:border-b-0 sm:border-r sm:p-8">
          <span className="absolute left-4 top-4 rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-ink/50 shadow-sm">
            home.fig
          </span>

          {/* Selected frame */}
          <div className="relative mt-8 rounded-xl border-2 border-dashed border-accent/60 bg-white p-5">
            <span className="absolute -left-1 -top-1 h-2 w-2 rounded-sm border border-accent bg-white" />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-sm border border-accent bg-white" />
            <span className="absolute -bottom-1 -left-1 h-2 w-2 rounded-sm border border-accent bg-white" />
            <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-sm border border-accent bg-white" />

            <div className="h-14 w-14 rounded-full bg-linear-to-br from-accent via-accent-soft to-fuchsia-400" />
            <div className="mt-4 h-3.5 w-3/4 rounded-full bg-ink/85" />
            <div className="mt-2 h-3.5 w-1/2 rounded-full bg-ink/30" />
            <div className="mt-4 flex gap-2">
              <div className="h-8 w-24 rounded-full bg-accent" />
              <div className="h-8 w-24 rounded-full border border-ink/20" />
            </div>
          </div>

          {/* Swatches */}
          <div className="mt-5 flex items-center gap-2">
            {["#1d1d1f", "#0071e3", "#2997ff", "#f5f5f7"].map((c) => (
              <span
                key={c}
                className="h-5 w-5 rounded-full ring-1 ring-black/10"
                style={{ backgroundColor: c }}
              />
            ))}
            <span className="ml-1 text-[10px] font-medium text-ink/40">
              Aa · Inter
            </span>
          </div>

          {/* Multiplayer cursor */}
          <motion.div
            className="absolute right-12 top-16"
            animate={
              reduceMotion
                ? undefined
                : { x: [0, -48, -16, -64, 0], y: [0, 44, 88, 28, 0] }
            }
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 3l14 7.5-6.2 1.6L9.5 18 5 3z"
                fill="#0071e3"
                stroke="#fff"
                strokeWidth="1.4"
              />
            </svg>
            <span className="ml-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-white">
              Sr
            </span>
          </motion.div>
        </div>

        {/* Code pane */}
        <div className="relative bg-[#0d1017] p-6 sm:p-8">
          <span className="absolute left-4 top-4 rounded-md bg-white/10 px-2 py-1 font-mono text-[10px] font-medium text-white/50">
            index.html
          </span>

          <pre className="mt-8 overflow-x-auto font-mono text-[11px] leading-6 text-white/80 sm:text-xs">
            <code>
              <span className="text-white/30">{"1  "}</span>
              <span className="text-sky-300">{"<section "}</span>
              <span className="text-violet-300">class</span>
              <span className="text-white/60">=</span>
              <span className="text-emerald-300">"hero"</span>
              <span className="text-sky-300">{">"}</span>
              {"\n"}
              <span className="text-white/30">{"2    "}</span>
              <span className="text-sky-300">{"<h1>"}</span>
              <span>Pixel-perfect, by hand.</span>
              <span className="text-sky-300">{"</h1>"}</span>
              {"\n"}
              <span className="text-white/30">{"3    "}</span>
              <span className="text-sky-300">{"<p>"}</span>
              <span>Designed in Figma. Coded by me.</span>
              <span className="text-sky-300">{"</p>"}</span>
              {"\n"}
              <span className="text-white/30">{"4    "}</span>
              <span className="text-sky-300">{"<a "}</span>
              <span className="text-violet-300">class</span>
              <span className="text-white/60">=</span>
              <span className="text-emerald-300">"btn"</span>
              <span className="text-sky-300">{">"}</span>
              <span>Start a project</span>
              <span className="text-sky-300">{"</a>"}</span>
              {"\n"}
              <span className="text-white/30">{"5  "}</span>
              <span className="text-sky-300">{"</section>"}</span>
              <motion.span
                className="ml-1 inline-block h-3.5 w-[7px] translate-y-0.5 bg-accent-soft"
                animate={reduceMotion ? undefined : { opacity: [1, 0, 1] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              />
            </code>
          </pre>

          <div className="mt-5 flex items-center gap-2 text-[10px] font-medium text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Build passing · 0 templates used
          </div>
        </div>
      </div>
    </div>
  );
}
