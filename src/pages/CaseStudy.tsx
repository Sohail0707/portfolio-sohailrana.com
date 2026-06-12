import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import usePageMeta from "../hooks/usePageMeta";
import { getProject, projects, type CaseStudySection } from "../data/projects";
import { site } from "../data/site";

const ease: [number, number, number, number] = [0.21, 0.65, 0.36, 1];

function Section({
  index,
  label,
  section,
}: {
  index: string;
  label: string;
  section: CaseStudySection;
}) {
  return (
    <Reveal>
      <section className="border-t border-black/5 py-12 sm:py-16">
        <div className="grid gap-6 md:grid-cols-12">
          <p className="font-code text-xs font-semibold uppercase tracking-widest text-ink/35 md:col-span-3">
            <span className="mr-2 text-accent">{index}</span>
            {label}
          </p>
          <div className="md:col-span-9">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="mt-4 text-base leading-relaxed text-ink/60 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-6 space-y-3">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-[15px] text-ink/70 sm:text-base">
                    <span aria-hidden className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/10 text-[10px] font-bold text-accent">
                      ✓
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;

  usePageMeta(
    project ? `${project.title} — Case Study | ${site.name}` : site.defaultTitle,
    project?.blurb,
  );

  if (!project) return <Navigate to="/404" replace />;

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="pb-20 pt-28 sm:pb-28 sm:pt-36">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <Link
            to="/#work"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink/50 transition-colors hover:text-ink"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
              ←
            </span>
            All work
          </Link>

          <p className="mt-8 font-code text-xs font-semibold uppercase tracking-widest text-ink/40 sm:text-sm">
            {project.tag}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            {project.title}
          </h1>
        </motion.div>

        {/* Meta row */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-10 grid grid-cols-2 gap-6 border-y border-black/5 py-6 sm:grid-cols-4"
        >
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-ink/40">Year</dt>
            <dd className="mt-1 text-sm font-semibold sm:text-base">{project.year}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-ink/40">Role</dt>
            <dd className="mt-1 text-sm font-semibold sm:text-base">{project.role}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-ink/40">Stack</dt>
            <dd className="mt-1 text-sm font-semibold sm:text-base">
              {project.skills.slice(0, 3).join(" · ")}
            </dd>
          </div>
          {project.liveUrl || project.figmaUrl ? (
            <div className="flex items-end">
              <a
                href={project.liveUrl ?? project.figmaUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-deep"
              >
                {project.liveUrl ? "Visit live site" : "View Figma design"}
                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>
          ) : (
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-ink/40">
                Deliverable
              </dt>
              <dd className="mt-1 text-sm font-semibold sm:text-base">
                Figma design
              </dd>
            </div>
          )}
        </motion.dl>

        {/* Thumbnail */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.18, ease }}
          className="mt-10 overflow-hidden rounded-3xl ring-1 ring-black/5"
        >
          <img
            src={project.thumbnail}
            alt={project.thumbnailAlt}
            className="aspect-video w-full object-cover"
          />
        </motion.div>

        {/* Skills */}
        <Reveal className="mt-10">
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-mist px-3.5 py-1.5 text-xs font-medium text-ink/60 sm:text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Story */}
        <div className="mt-12 sm:mt-16">
          <Section index="01" label="The problem" section={project.problem} />
          <Section index="02" label="The solution" section={project.solution} />
          <Section index="03" label="The outcome" section={project.outcome} />
        </div>

        {/* Results + quote */}
        {(project.results || project.quote) && (
          <Reveal>
            <div className="grid gap-4 border-t border-black/5 pt-10 md:grid-cols-2">
              {project.results && (
                <ul className="space-y-3">
                  {project.results.map((result) => (
                    <li
                      key={result}
                      className="flex items-center gap-3 rounded-2xl bg-mist px-5 py-4 text-sm font-medium text-ink/75 sm:text-base"
                    >
                      <span aria-hidden className="text-accent">✦</span>
                      {result}
                    </li>
                  ))}
                </ul>
              )}
              {project.quote && (
                <figure className="flex flex-col justify-between rounded-3xl bg-linear-to-br from-accent/10 to-[#7b5bff]/10 p-6 ring-1 ring-accent/10 sm:p-8">
                  <blockquote className="text-base leading-relaxed text-ink/75 sm:text-lg">
                    "{project.quote.text}"
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-medium text-ink/45">
                    <span className="text-amber-500">★★★★★</span> ·{" "}
                    {project.quote.author}
                  </figcaption>
                </figure>
              )}
            </div>
          </Reveal>
        )}

        {/* CTA */}
        <Reveal className="mt-14 sm:mt-20">
          <div className="rounded-3xl bg-night px-6 py-12 text-center text-white sm:px-12 sm:py-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Want results like this?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">
              I take on a few projects at a time so each one gets full
              attention. Let's talk about yours.
            </p>
            <div className="mx-auto mt-7 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
              <motion.a
                href={site.links.upwork}
                target="_blank"
                rel="noreferrer"
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep sm:text-base"
              >
                Hire me on Upwork
                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </motion.a>
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white/80 ring-1 ring-white/20 transition-colors hover:text-white sm:text-base"
              >
                Send a message
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Next project */}
        <Reveal className="mt-12">
          <Link
            to={`/work/${next.slug}`}
            className="group flex items-center justify-between rounded-3xl bg-mist p-6 transition-colors hover:bg-[#ebebf0] sm:p-8"
          >
            <span>
              <span className="block font-code text-xs font-semibold uppercase tracking-widest text-ink/40">
                Next project
              </span>
              <span className="mt-1 block text-xl font-semibold tracking-tight sm:text-2xl">
                {next.title}
              </span>
            </span>
            <span className="text-2xl text-ink/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
