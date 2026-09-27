import { Link, useParams } from "react-router-dom";
import Reveal from "../components/Reveal";
import {
  caseStudySections,
  getProject,
  projects,
  type CaseStudySection,
  type ImageLayout,
} from "../data/projects";
import NotFound from "./NotFound";

/** Section rail colours, cycled. The first three keep the original trio's colours. */
const sectionAccents = ["text-cyan", "text-violet", "text-lime", "text-orange"];

/**
 * Column counts per gallery type. Heights come from each image's own aspect
 * ratio rather than a forced one, so UI screenshots are never cropped.
 */
const galleryColumns: Record<ImageLayout, string> = {
  wide: "grid-cols-1",
  phone: "grid-cols-2 sm:grid-cols-3",
  page: "grid-cols-1 sm:grid-cols-2",
};

function Section({
  num,
  section,
  color,
}: {
  num: string;
  section: CaseStudySection;
  color: string;
}) {
  return (
    <Reveal>
      <section className="border-t border-line py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          <p className={`font-mono text-sm ${color}`}>
            {num} / {section.label}
          </p>
          <div className="md:col-span-3">
            <h2 className="font-display text-xl font-bold sm:text-2xl md:text-3xl">
              {section.heading}
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-muted">
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            {section.bullets && (
              <ul className="mt-6 space-y-2.5">
                {section.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-sm text-paper">
                    <span aria-hidden className="text-lime">→</span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {section.images && section.images.length > 0 && (
              <ul
                className={`mt-8 grid items-start gap-4 ${
                  galleryColumns[section.imageLayout ?? "wide"]
                }`}
              >
                {section.images.map((image) => (
                  <li key={image.src}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      className="h-auto w-full rounded-2xl border border-line bg-panel"
                    />
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
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;

  if (!project) return <NotFound />;

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const sections = caseStudySections(project);
  const external = project.liveUrl
    ? { href: project.liveUrl, label: "Visit live site ↗" }
    : project.figmaUrl
      ? { href: project.figmaUrl, label: "View Figma design ↗" }
      : undefined;

  return (
    <article className="pt-16">
      <div className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20">
        <Reveal>
          <Link to="/#work" className="font-mono text-sm text-muted transition-colors hover:text-lime">
            ← All work
          </Link>
          <p className="mt-8 font-mono text-xs uppercase tracking-wide text-lime">
            {project.tag}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted sm:text-lg">{project.blurb}</p>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <dt className="font-mono text-xs uppercase tracking-wide text-muted">Year</dt>
              <dd className="mt-1 text-sm">{project.year}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wide text-muted">Role</dt>
              <dd className="mt-1 text-sm">{project.role}</dd>
            </div>
            {project.team && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-wide text-muted">Team</dt>
                <dd className="mt-1 text-sm">{project.team}</dd>
              </div>
            )}
            <div>
              <dt className="font-mono text-xs uppercase tracking-wide text-muted">Skills</dt>
              <dd className="mt-1 text-sm">{project.skills.join(" · ")}</dd>
            </div>
          </dl>

          {external && (
            <a
              href={external.href}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-full bg-lime px-7 py-3.5 font-display text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              {external.label}
            </a>
          )}
        </Reveal>

        <Reveal className="mt-12">
          <img
            src={project.thumbnail}
            alt={project.thumbnailAlt}
            className="aspect-video w-full rounded-2xl border border-line object-cover"
          />
        </Reveal>

        <div className="mt-12">
          {sections.map((section, i) => (
            <Section
              key={section.heading}
              num={String(i + 1).padStart(2, "0")}
              section={section}
              color={sectionAccents[i % sectionAccents.length]}
            />
          ))}
        </div>

        {project.results && (
          <Reveal>
            <ul className="grid gap-4 border-t border-line py-12 sm:grid-cols-2 md:py-16">
              {project.results.map((r) => (
                <li
                  key={r}
                  className="rounded-2xl border border-line bg-panel px-6 py-5 font-display font-semibold sm:text-lg"
                >
                  <span aria-hidden className="mr-2 text-lime">✦</span>
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {project.quote && (
          <Reveal>
            <figure className="rounded-2xl border border-lime/30 bg-lime-soft p-8 md:p-10">
              <p aria-hidden className="text-lime tracking-[0.3em]">★★★★★</p>
              <blockquote className="mt-4 font-display text-lg font-medium leading-snug sm:text-xl md:text-2xl">
                “{project.quote.text}”
              </blockquote>
              <figcaption className="mt-4 font-mono text-xs uppercase tracking-wide text-muted">
                {project.quote.author}
              </figcaption>
            </figure>
          </Reveal>
        )}

        <Reveal>
          <div className="mt-16 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <a
              href="/#contact"
              className="rounded-full bg-lime px-7 py-3.5 text-center font-display text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Start a project like this
            </a>
            <Link
              to={`/work/${next.slug}`}
              className="group font-mono text-sm text-muted transition-colors hover:text-lime"
            >
              Next project: <span className="text-paper group-hover:text-lime">{next.title}</span> →
            </Link>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
