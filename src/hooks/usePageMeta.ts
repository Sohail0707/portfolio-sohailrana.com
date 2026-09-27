import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_URL, seoForPath } from "../data/seo";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Keeps title, description, canonical and social tags in sync with the current
 * route. Each route is already served as prerendered HTML carrying these tags,
 * so this exists to correct them during client-side navigation — without it,
 * every route after the first would keep the entry page's canonical.
 */
export function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description, path, noindex } = seoForPath(pathname);
    const url = `${SITE_URL}${path === "/" ? "/" : path}`;

    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    setCanonical(url);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
  }, [pathname]);
}
