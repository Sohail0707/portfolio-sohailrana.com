import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";
import { site } from "../data/site";

export default function NotFound() {
  usePageMeta(`Page not found | ${site.name}`);

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-16 text-center">
      <p className="bg-linear-to-r from-accent-soft to-grape bg-clip-text text-7xl font-bold tracking-tight text-transparent sm:text-8xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
        This page took a detour.
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/55 sm:text-base">
        The page you're looking for doesn't exist — but the work does.
      </p>
      <Link
        to="/"
        className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
      >
        Back to home
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          →
        </span>
      </Link>
    </section>
  );
}
