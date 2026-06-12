import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Project } from "../data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const caseStudyPath = `/work/${project.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10">
      <Link
        to={caseStudyPath}
        aria-label={`${project.title} — case study`}
        className="relative block overflow-hidden"
      >
        <div className="aspect-video w-full overflow-hidden bg-mist">
          <img
            src={project.thumbnail}
            alt={project.thumbnailAlt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="font-code text-xs font-semibold uppercase tracking-widest text-ink/40">
          {project.tag}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Link to={caseStudyPath} className="transition-colors hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink/55">
          {project.blurb}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-ink/60"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4 border-t border-black/5 pt-5">
          <motion.span whileTap={{ scale: 0.96 }}>
            <Link
              to={caseStudyPath}
              className="group/cs inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-deep"
            >
              Case study
              <span className="transition-transform duration-300 group-hover/cs:translate-x-0.5">
                →
              </span>
            </Link>
          </motion.span>
          {(project.liveUrl ?? project.figmaUrl) && (
            <a
              href={project.liveUrl ?? project.figmaUrl}
              target="_blank"
              rel="noreferrer"
              className="group/live inline-flex items-center gap-1 text-sm font-medium text-ink/60 transition-colors hover:text-accent"
            >
              {project.liveUrl ? "Live site" : "Figma design"}
              <span className="transition-transform duration-300 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5">
                ↗
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
