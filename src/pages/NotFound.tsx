import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";

export default function NotFound() {
  usePageMeta("Page not found");
  return (
    <section className="flex min-h-screen items-center pt-16">
      <div className="mx-auto max-w-2xl px-5 py-20 text-center md:px-8">
        <p className="font-display text-8xl font-bold text-outline md:text-9xl">404</p>
        <h1 className="mt-6 font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">
          This page doesn't exist<span className="text-lime">.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The link may be old or mistyped. Everything worth seeing is back on
          the home page.
        </p>
        <Link
          to="/"
          className="mt-10 inline-block rounded-full bg-lime px-7 py-3.5 font-display text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
