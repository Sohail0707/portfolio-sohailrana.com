import Reveal from "../components/Reveal";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import { site } from "../data/site";

export default function Projects() {
  return (
    <section id="work" className="bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/40 sm:text-sm">
            Selected work
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            A small selection
            <br />
            of my work.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/55 sm:text-lg">
            Real client projects from Upwork — every one designed in Figma and
            hand-coded by me.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center sm:mt-14">
          <a
            href={site.links.upwork}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-ink sm:text-base"
          >
            More projects on my Upwork profile
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
