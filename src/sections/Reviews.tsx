import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import Carousel from "../components/Carousel";
import { reviews } from "../data/reviews";
import { site } from "../data/site";

const cardBorders = [
  "hover:border-lime/50",
  "hover:border-cyan/50",
  "hover:border-violet/50",
  "hover:border-orange/50",
];

export default function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-16 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          num="05"
          title="Client Reviews"
          intro="Every word below is from a real Upwork review — the record behind a Top Rated badge and 100% Job Success."
        />
        <Carousel ariaLabel="Client reviews" itemClassName="w-[86vw] max-w-[420px]">
          {reviews.map((review, i) => (
            <Reveal key={review.name + review.project} delay={Math.min(i * 0.06, 0.2)} className="h-full">
              <figure
                className={`flex h-full flex-col justify-between rounded-2xl border border-line bg-panel p-6 transition-colors sm:p-7 md:p-8 ${cardBorders[i % cardBorders.length]}`}
              >
                <div>
                  <p aria-hidden className="text-lime tracking-[0.3em]">★★★★★</p>
                  <blockquote className="mt-4 leading-relaxed text-paper">
                    “{review.text}”
                  </blockquote>
                </div>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <p className="font-display font-semibold">{review.name}</p>
                  <p className="mt-0.5 font-mono text-xs uppercase tracking-wide text-muted">
                    {review.project}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </Carousel>

        <Reveal delay={0.2}>
          <a
            href={site.links.upwork}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-lime hover:underline"
          >
            Read them all on Upwork ↗
          </a>
        </Reveal>
      </div>
    </section>
  );
}
