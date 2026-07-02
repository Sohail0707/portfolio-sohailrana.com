import { site } from "../data/site";

const starColors = ["text-lime", "text-cyan", "text-violet", "text-orange"];

/** Chip strip used by the two marquee rows. */
function Row({ items, animation }: { items: readonly string[]; animation: string }) {
  // 6 copies: the loop shifts by 50% (3 copies), so the visible half must
  // stay wider than ultrawide viewports or the right edge empties out.
  const doubled = Array.from({ length: 6 }, () => items).flat();
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <ul className={`flex w-max shrink-0 gap-3 pr-3 ${animation}`}>
        {doubled.map((item, i) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= items.length || undefined}
            className="whitespace-nowrap rounded-full border border-line bg-panel px-5 py-2.5 font-mono text-sm text-muted"
          >
            <span className={`mr-2 ${starColors[i % starColors.length]}`}>✦</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Two counter-scrolling marquee rows of the tech stack. */
export default function Tools() {
  const mid = Math.ceil(site.techStack.length / 2);
  return (
    <section aria-label="Tools and technologies" className="border-t border-line py-14 md:py-16">
      <div className="space-y-3">
        <Row items={site.techStack.slice(0, mid)} animation="animate-marquee-left" />
        <Row items={site.techStack.slice(mid)} animation="animate-marquee-right" />
      </div>
    </section>
  );
}
