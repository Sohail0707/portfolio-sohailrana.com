import { site } from "./site";
import { projects } from "./projects";

/** Absolute origin, used for canonicals, OG URLs and the sitemap. */
export const SITE_URL = "https://sohailrana.com";

export interface RouteSeo {
  /** Path as served — no trailing slash except for the root. */
  path: string;
  title: string;
  description: string;
  /** Kept out of the sitemap and served with a noindex robots tag. */
  noindex?: boolean;
}

const caseStudies: RouteSeo[] = projects.map((project) => ({
  path: `/work/${project.slug}`,
  title: `${project.metaTitle} | ${site.name}`,
  description: project.metaDescription,
}));

/**
 * Every URL the site serves. The prerender script builds one HTML file per
 * entry and lists the indexable ones in sitemap.xml, so adding a project to
 * projects.ts is enough to get it crawled — nothing here needs editing.
 */
export const routeSeo: RouteSeo[] = [
  { path: "/", title: site.defaultTitle, description: site.defaultDescription },
  ...caseStudies,
  {
    path: "/thanks",
    title: `Message sent | ${site.name}`,
    description: "Thanks for reaching out — your message is in my inbox.",
    noindex: true,
  },
];

/** Served for any path with no entry above. Never indexed, never in the sitemap. */
export const notFoundSeo: RouteSeo = {
  path: "/404",
  title: `Page not found | ${site.name}`,
  description: "This page doesn't exist. Everything worth seeing is on the home page.",
  noindex: true,
};

/** Resolves a pathname to its metadata, tolerating a trailing slash. */
export function seoForPath(pathname: string): RouteSeo {
  const normalised =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return routeSeo.find((route) => route.path === normalised) ?? notFoundSeo;
}
