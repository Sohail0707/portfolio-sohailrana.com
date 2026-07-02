import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import Carousel from "../components/Carousel";
import { projects } from "../data/projects";

export default function Work() {
  return (
    <section id="work" className="scroll-mt-16 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          num="01"
          title="Selected Work"
          intro="Real client projects from Upwork — each one designed in Figma and hand-coded, end to end."
        />
        <Carousel ariaLabel="Selected projects" itemClassName="w-[86vw] max-w-[520px]">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i * 0.06, 0.2)} className="h-full">
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
