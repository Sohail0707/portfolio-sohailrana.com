import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { site } from "../data/site";

const facts = [
  { label: "Working with", value: site.reach },
  { label: "Role", value: site.role },
  { label: "Previously", value: "Frontend Engineer & Designer, Dutrow LLC (3 yrs)" },
  { label: "Now", value: "Top Rated on Upwork — 100% Job Success" },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading num="03" title="Background" accent="violet" />
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <Reveal className="lg:col-span-3">
            <p className="font-display text-xl font-medium leading-snug sm:text-2xl md:text-3xl">
              Most sites break at the seams — between the design file, the
              build, and the CMS behind it. Mine don't, because{" "}
              <span className="text-gradient">I own all three</span>.
            </p>
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              <p>
                I spent three years as a Frontend Engineer &amp; Designer at
                Dutrow LLC, designing and shipping websites for clients across
                industries — over fifty sites passed through my hands in that
                time. That's where the two crafts fused: every design decision
                made knowing how it will be built, every line of code written
                knowing why the design looks the way it does.
              </p>
              <p>
                Now I work directly with founders, product teams, and agencies
                — mostly Next.js and Sanity builds, and getting sites off
                platforms that have stopped fitting. You deal with one person
                who owns the whole result: the content model, the design, the
                front end, and the migration that gets you there. No templates,
                no page builders, no telephone game.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <dl className="divide-y divide-line rounded-2xl border border-line bg-panel px-6">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <dt className="shrink-0 font-mono text-xs uppercase tracking-wide text-muted">
                    {fact.label}
                  </dt>
                  <dd className="text-sm text-paper sm:text-right">
                    {fact.href ? (
                      <a href={fact.href} className="text-lime hover:underline">
                        {fact.value}
                      </a>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
