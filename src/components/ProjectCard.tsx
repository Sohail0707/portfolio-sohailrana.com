import { Link } from "react-router-dom";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      to={`/work/${project.slug}`}
      draggable={false}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel transition-all duration-300 hover:-translate-y-1 hover:border-lime/50"
    >
      <div className="relative aspect-video">
        <img
          src={project.thumbnail}
          alt={project.thumbnailAlt}
          loading={index > 1 ? "lazy" : undefined}
          draggable={false}
          className="h-full w-full object-cover"
        />
        <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-lime font-display text-lg text-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
          ↗
        </span>
      </div>

      <div className="p-6 md:p-7">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-wide text-lime">
            {project.tag}
          </p>
          <p className="font-mono text-xs text-muted">{project.year}</p>
        </div>
        <h3 className="mt-3 font-display text-xl font-bold transition-colors group-hover:text-lime sm:text-2xl md:text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.blurb}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
