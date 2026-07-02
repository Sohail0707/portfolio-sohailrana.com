import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, MouseEvent as ReactMouseEvent, ReactNode } from "react";

interface CarouselProps {
  children: ReactNode[];
  /** Width classes applied to each slide (e.g. "w-[86vw] max-w-[520px]"). */
  itemClassName: string;
  ariaLabel: string;
}

/**
 * Horizontal scroll carousel: native touch swipe on mobile, drag-to-scroll
 * with the mouse on desktop, snap alignment, and arrow buttons that page
 * by one slide. Clicks are suppressed after a real drag so card links
 * don't fire on release.
 */
export default function Carousel({ children, itemClassName, ariaLabel }: CarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, captured: false, startX: 0, startLeft: 0, moved: 0 });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 8);
      setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const page = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.firstElementChild;
    const step = first ? first.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return; // touch gets native momentum scroll
    const el = scrollerRef.current!;
    drag.current = {
      down: true,
      captured: false,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: 0,
    };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.startX;
    // Capture only once a real drag starts — capturing on pointerdown would
    // retarget the eventual click to the scroller and break card links.
    if (!d.captured && Math.abs(dx) > 6) {
      try {
        scrollerRef.current!.setPointerCapture(e.pointerId);
      } catch {
        // Stale pointer id (e.g. button released off-window) — drag still works.
      }
      d.captured = true;
    }
    if (d.captured) {
      d.moved = Math.max(d.moved, Math.abs(dx));
      scrollerRef.current!.scrollLeft = d.startLeft - dx;
    }
  };

  const endDrag = () => {
    drag.current.down = false;
    drag.current.captured = false;
  };

  const onClickCapture = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (drag.current.moved > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
    drag.current.moved = 0;
  };

  const buttonClasses =
    "grid h-11 w-11 place-items-center rounded-full border border-line text-paper transition-colors hover:border-lime hover:text-lime disabled:pointer-events-none disabled:opacity-25";

  return (
    <div>
      <div ref={scrollerRef} role="region" aria-label={ariaLabel} className="no-scrollbar flex cursor-grab snap-x snap-proximity gap-6 overflow-x-auto pb-2 select-none active:cursor-grabbing" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag} onClickCapture={onClickCapture}>
        {children.map((child, i) => (
          <div key={i} className={`shrink-0 snap-start ${itemClassName}`}>
            {child}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-wide text-muted">
          Drag, swipe, or use the arrows
        </p>
        <div className="flex gap-3">
          <button type="button" onClick={() => page(-1)} disabled={!canPrev} aria-label="Previous" className={buttonClasses}>
            ←
          </button>
          <button type="button" onClick={() => page(1)} disabled={!canNext} aria-label="Next" className={buttonClasses}>
            →
          </button>
        </div>
      </div>
    </div>
  );
}
