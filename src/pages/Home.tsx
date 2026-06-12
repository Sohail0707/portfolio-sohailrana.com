import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import About from "../sections/About";
import Contact from "../sections/Contact";
import usePageMeta from "../hooks/usePageMeta";
import { site } from "../data/site";

export default function Home() {
  usePageMeta(site.defaultTitle, site.defaultDescription);

  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Contact />
    </>
  );
}
