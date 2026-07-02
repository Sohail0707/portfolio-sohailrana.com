import { useRef } from "react";
import type { ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";

interface FloatProps {
  children: ReactNode;
  /** Parallax strength — bigger = closer to the viewer, moves more. */
  depth?: number;
  className?: string;
}

/**
 * Decorative floating element: the wrapper parallaxes with scroll
 * (speed scaled by depth) while the inner layer bobs and tilts forever.
 * Purely visual — hidden from pointer events and screen readers.
 */
export function Float({ children, depth = 1, className }: FloatProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current,
        { y: 34 * depth },
        {
          y: -34 * depth,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
      gsap.to(".float-inner", {
        y: gsap.utils.random(-8, -14),
        rotate: gsap.utils.random(-4, 4),
        duration: gsap.utils.random(2.6, 4.2),
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none z-0 ${className ?? ""}`}>
      <div className="float-inner">{children}</div>
    </div>
  );
}

/** Figma-style multiplayer cursor with a name chip. */
export function CursorBit({ label, colorClass }: { label: string; colorClass: string }) {
  return (
    <div className="flex items-start gap-1">
      <svg viewBox="0 0 24 24" className={`h-5 w-5 ${colorClass}`} fill="currentColor" aria-hidden>
        <path d="M5 3l14 8-6.5 1.5L9 19z" />
      </svg>
      <span
        className={`mt-3 rounded-full border border-line bg-panel px-2.5 py-1 font-mono text-[11px] shadow-lg ${colorClass}`}
      >
        {label}
      </span>
    </div>
  );
}

/** Mini browser window mock. */
export function BrowserBit() {
  return (
    <div className="w-44 rounded-xl border border-line bg-panel/80 shadow-xl backdrop-blur-sm">
      <div className="flex gap-1.5 border-b border-line px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-orange/70" />
        <span className="h-2 w-2 rounded-full bg-lime/70" />
        <span className="h-2 w-2 rounded-full bg-cyan/70" />
      </div>
      <div className="space-y-1.5 p-3">
        <div className="h-2 w-3/4 rounded bg-lime/40" />
        <div className="h-2 w-1/2 rounded bg-muted/25" />
        <div className="h-9 rounded bg-gradient-to-r from-cyan/25 to-violet/25" />
      </div>
    </div>
  );
}

/** Figma selection frame with corner handles and a size label. */
export function FrameBit({ label = "Hero / 1440×810" }: { label?: string }) {
  const handle = "absolute h-2 w-2 border border-cyan bg-panel";
  return (
    <div className="relative h-24 w-40 border-2 border-cyan/70">
      <span className={`${handle} -left-1 -top-1`} />
      <span className={`${handle} -right-1 -top-1`} />
      <span className={`${handle} -left-1 -bottom-1`} />
      <span className={`${handle} -right-1 -bottom-1`} />
      <span className="absolute -top-6 left-0 font-mono text-[10px] text-cyan">{label}</span>
    </div>
  );
}

/** Terminal window running a build. */
export function TerminalBit() {
  return (
    <div className="w-52 rounded-xl border border-line bg-panel/90 p-3.5 font-mono text-[11px] shadow-xl">
      <p>
        <span className="text-lime">~$</span>{" "}
        <span className="text-paper">npm run build</span>
      </p>
      <p className="mt-1.5 text-muted">✓ built in 1.2s — 0 errors</p>
    </div>
  );
}

/** Client chat bubble. */
export function ChatBit({ text }: { text: string }) {
  return (
    <div className="max-w-56 rounded-2xl rounded-bl-sm border border-line bg-panel px-4 py-3 font-mono text-xs leading-relaxed text-muted shadow-lg">
      “{text}”
    </div>
  );
}

/** Deployment status pill. */
export function StatusBit({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-full border border-line bg-panel px-4 py-2.5 font-mono text-xs text-paper shadow-lg">
      <span className="h-2 w-2 rounded-full bg-lime animate-pulse-dot" />
      {text}
    </div>
  );
}

/** Loose code token. */
export function CodeBit({ token, className }: { token: string; className: string }) {
  return <span className={`font-mono ${className}`}>{token}</span>;
}
