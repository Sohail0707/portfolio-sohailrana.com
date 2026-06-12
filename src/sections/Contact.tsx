import Reveal from "../components/Reveal";
import ContactForm from "../components/ContactForm";
import { site } from "../data/site";

const socials = [
  { label: "Upwork", href: site.links.upwork, note: "Hire me with payment protection" },
  { label: "GitHub", href: site.links.github, note: "Code and experiments" },
  { label: "LinkedIn", href: site.links.linkedin, note: "The professional bits" },
] as const;

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-mist py-20 sm:py-28">
      {/* Aurora — yellow / blue / purple / orange on light backgrounds */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(36rem_24rem_at_8%_92%,rgba(251,191,36,0.14),transparent),radial-gradient(40rem_26rem_at_55%_104%,rgba(139,92,246,0.12),transparent),radial-gradient(34rem_24rem_at_94%_80%,rgba(58,162,255,0.13),transparent),radial-gradient(26rem_18rem_at_85%_6%,rgba(255,138,61,0.07),transparent)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="font-code text-xs font-semibold uppercase tracking-widest text-ink/40 sm:text-sm">
              Contact
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Let's build
              <br />
              something{" "}
              <span className="bg-linear-to-r from-accent-soft to-grape bg-clip-text text-transparent">
                exceptional.
              </span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink/55 sm:text-lg">
              Tell me where your project stands — a Figma file waiting to be
              coded, a dated site that needs a rebuild, or just an idea. I'll
              reply with a clear plan.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm font-medium text-ink/70 ring-1 ring-white/60 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-upwork opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-upwork" />
              </span>
              Currently taking on new projects
            </div>

            <a
              href={`mailto:${site.email}`}
              className="group mt-8 flex items-center gap-2 text-lg font-semibold text-ink transition-colors hover:text-accent sm:text-xl"
            >
              {site.email}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <ul className="mt-8 divide-y divide-black/5 border-y border-black/5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between py-4 transition-colors"
                  >
                    <span>
                      <span className="block text-base font-semibold text-ink transition-colors group-hover:text-accent">
                        {social.label}
                      </span>
                      <span className="block text-sm text-ink/45">
                        {social.note}
                      </span>
                    </span>
                    <span className="text-ink/30 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
