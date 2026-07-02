import Hero from "../sections/Hero";
import Work from "../sections/Work";
import Services from "../sections/Services";
import About from "../sections/About";
import Approach from "../sections/Approach";
import Reviews from "../sections/Reviews";
import Tools from "../sections/Tools";
import Contact from "../sections/Contact";
import ScrollBanner from "../components/ScrollBanner";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Home() {
  usePageMeta();
  return (
    <>
      <Hero />
      <Work />
      <ScrollBanner words={["Design", "Develop", "Deploy"]} />
      <Services />
      <About />
      <Approach />
      <Reviews />
      <Tools />
      <ScrollBanner words={["Let's", "Work", "Together"]} direction={-1} />
      <Contact />
    </>
  );
}
