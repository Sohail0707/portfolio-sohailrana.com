import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";

export { routeSeo, notFoundSeo, SITE_URL, OG_IMAGE } from "./data/seo";
export { site } from "./data/site";
export { projects } from "./data/projects";

/**
 * Renders one route to static HTML for scripts/prerender.mjs.
 *
 * GSAP needs no special handling — every animation runs inside useGSAP, and
 * effects never fire during renderToString, so the markup comes out at its
 * natural position.
 *
 * framer-motion is different: Reveal and the hero's fadeUp both set an
 * `initial` state, so their wrappers prerender as `opacity:0`. That is left
 * alone deliberately. The text sits in the DOM either way (~9.5k characters on
 * the homepage) so crawlers and text extractors read it fine, and Googlebot
 * runs the JS that reveals it. Stripping the style would only trade that for a
 * visible flash — main.tsx mounts with createRoot, not hydrateRoot, so React
 * discards this markup on mount and would re-hide the content a moment later.
 */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
