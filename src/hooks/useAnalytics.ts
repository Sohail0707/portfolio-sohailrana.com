import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends one GA4 page_view per route.
 *
 * The snippet in index.html sets `send_page_view: false`, so this is the only
 * thing reporting views — the first one included. It exists because neither of
 * gtag's built-in options works properly for this app:
 *
 * - The default `config` call fires a page_view on load only, so client-side
 *   route changes would never be counted at all.
 * - GA4's "page changes based on browser history events" does catch them, but
 *   it reads document.title at the moment history changes — before React has
 *   rendered the new route — so every route change gets logged under the
 *   *previous* page's title. That setting must be turned off in the GA admin,
 *   or views will also be double-counted against what this hook sends.
 *
 * Call it after usePageMeta(). Effects run in declaration order, and that
 * ordering is what guarantees document.title is already correct here.
 *
 * The hash is deliberately excluded from the dependencies and the reported
 * URL: /#work is the same page as /, not a second view of it.
 */
export function useAnalytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: `${pathname}${search}`,
      page_location: `${window.location.origin}${pathname}${search}`,
      page_title: document.title,
    });
  }, [pathname, search]);
}
