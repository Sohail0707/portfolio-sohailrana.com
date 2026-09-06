import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { site } from "../data/site";

export default function Thanks() {
  usePageMeta("Message sent", "Thanks for reaching out — I'll get back to you soon.");
  return (
    <section className="flex min-h-screen items-center pt-16">
      <div className="mx-auto max-w-2xl px-5 py-20 text-center md:px-8">
        <p className="font-mono text-sm text-lime">✓ MESSAGE SENT</p>
        <h1 className="mt-6 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-6xl">
          Thanks for
          <br />
          reaching out<span className="text-lime">.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md leading-relaxed text-muted">
          Your message is in my inbox. I'll read it carefully and get back to
          you at the email you provided — usually with a few questions and an
          honest take on your project.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="rounded-full bg-lime px-7 py-3.5 font-display text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            Back to home
          </Link>
          <a
            href={site.links.upwork}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-7 py-3.5 font-display text-sm font-semibold text-paper transition-colors hover:border-lime hover:text-lime"
          >
            Hire me on Upwork ↗
          </a>
        </div>
      </div>
    </section>
  );
}
