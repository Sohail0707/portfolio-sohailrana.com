import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import ContactForm from "../components/ContactForm";
import { Float, CursorBit, CodeBit } from "../components/decor";
import { site } from "../data/site";

const socials = [
  { label: "Upwork", href: site.links.upwork },
  { label: "GitHub", href: site.links.github },
  { label: "LinkedIn", href: site.links.linkedin },
];

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden border-t border-line py-20 md:py-28">
      <Float depth={1.1} className="absolute right-[10%] top-16 hidden lg:block">
        <CursorBit label="let's talk" colorClass="text-lime" />
      </Float>
      <Float depth={0.7} className="absolute right-[24%] top-32 hidden xl:block">
        <CodeBit token="// say hi" className="text-lg text-cyan/50" />
      </Float>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading num="06" title="Let's Build Something" />
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <Reveal className="lg:col-span-2">
            <p className="font-display text-2xl font-medium leading-snug md:text-3xl">
              Have a project in mind? Tell me about it — I'll reply with an
              honest take on scope, timeline, and{" "}
              <span className="text-gradient">whether I'm the right fit</span>.
            </p>
            <div className="mt-8 space-y-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-muted">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-1 inline-block font-display text-xl font-semibold text-lime hover:underline"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-muted">Elsewhere</p>
                <ul className="mt-2 flex gap-5">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-paper underline decoration-line underline-offset-4 transition-colors hover:text-lime hover:decoration-lime"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-panel px-4 py-2 font-mono text-xs">
                <span className="h-2 w-2 rounded-full bg-lime animate-pulse-dot" />
                {site.availability}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
