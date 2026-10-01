/**
 * Turns the SPA build into one static HTML file per route.
 *
 * Why this exists: served as a pure SPA, every URL returned the same shell —
 * the same <title>, and critically the same `<link rel="canonical">` pointing
 * at the homepage, which told Google every case study was a duplicate of "/".
 * Each page now ships its own head and its own server-rendered body, and
 * unmatched paths get a real 404.html instead of a 200.
 *
 * Run after `vite build` and `vite build --ssr`. See package.json.
 */
import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const { render, routeSeo, notFoundSeo, SITE_URL, OG_IMAGE, site, projects } = await import(
  pathToFileURL(ssrEntry).href
);

const template = await readFile(path.join(dist, "index.html"), "utf8");

const SEO_BLOCK = /<!--seo-->[\s\S]*?<!--\/seo-->/;
const ROOT_DIV = '<div id="root"></div>';

if (!SEO_BLOCK.test(template)) {
  throw new Error("index.html is missing its <!--seo--> block — nothing to replace.");
}
if (!template.includes(ROOT_DIV)) {
  throw new Error(`index.html is missing ${ROOT_DIV} — cannot inject markup.`);
}

const attr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** JSON-LD has to survive being inlined in a <script>, so escape the '<'. */
const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

const absolute = (routePath) => `${SITE_URL}${routePath === "/" ? "/" : routePath}`;

function structuredData(route) {
  if (route.path === "/") {
    return jsonLd({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      url: absolute("/"),
      mainEntity: {
        "@type": "Person",
        name: site.name,
        url: absolute("/"),
        jobTitle: site.role,
        email: `mailto:${site.email}`,
        knowsAbout: [...site.techStack],
        sameAs: [site.links.upwork, site.links.github, site.links.linkedin],
      },
    });
  }

  const project = projects.find((p) => `/work/${p.slug}` === route.path);
  if (!project) return "";

  return jsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absolute("/") },
      { "@type": "ListItem", position: 2, name: project.title, item: absolute(route.path) },
    ],
  });
}

function head(route) {
  const url = absolute(route.path);
  return [
    "<!--seo-->",
    `<title>${attr(route.title)}</title>`,
    `<meta name="description" content="${attr(route.description)}" />`,
    `<meta name="robots" content="${route.noindex ? "noindex, follow" : "index, follow"}" />`,
    `<link rel="canonical" href="${attr(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${attr(site.name)}" />`,
    `<meta property="og:url" content="${attr(url)}" />`,
    `<meta property="og:title" content="${attr(route.title)}" />`,
    `<meta property="og:description" content="${attr(route.description)}" />`,
    OG_IMAGE ? `<meta property="og:image" content="${attr(SITE_URL + OG_IMAGE)}" />` : "",
    OG_IMAGE ? `<meta property="og:image:width" content="1200" />` : "",
    OG_IMAGE ? `<meta property="og:image:height" content="630" />` : "",
    OG_IMAGE ? `<meta name="twitter:image" content="${attr(SITE_URL + OG_IMAGE)}" />` : "",
    `<meta name="twitter:card" content="${OG_IMAGE ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:description" content="${attr(route.description)}" />`,
    structuredData(route),
    "<!--/seo-->",
  ]
    .filter(Boolean)
    .join("\n    ");
}

/**
 * "/" -> index.html, "/work/x" -> work/x.html
 *
 * Flat files, not directories. Netlify's asset server resolves a bare path to
 * `<path>.html` and serves it 200, but with `work/x/index.html` it instead
 * 301s /work/x to /work/x/ — so every sitemap URL was a redirect whose target
 * carried a canonical pointing back at the redirecting URL. Search Console
 * reads that contradiction as "Page with redirect" and drops the page.
 */
const outputFile = (routePath) =>
  routePath === "/" ? "index.html" : `${routePath.replace(/^\//, "")}.html`;

async function emit(route, file) {
  const body = render(route.path);
  const html = template
    .replace(SEO_BLOCK, head(route))
    .replace(ROOT_DIV, `<div id="root">${body}</div>`);

  const target = path.join(dist, file);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");
  return { file, bytes: html.length };
}

const written = [];
for (const route of routeSeo) {
  written.push(await emit(route, outputFile(route.path)));
}
// Netlify serves this with a real 404 status for anything that matched no file.
written.push(await emit(notFoundSeo, "404.html"));

/*
 * lastmod tells Google whether a recrawl is worth it. Take it from the last
 * commit touching src/data — where every page's content actually lives —
 * rather than the build time, which would claim a change on every deploy and
 * get the signal discounted. Omitted entirely when git isn't available: no
 * date is better than a wrong one.
 */
function lastContentChange() {
  try {
    const iso = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", "src/data"],
      { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    return /^\d{4}-\d{2}-\d{2}T/.test(iso) ? iso.slice(0, 10) : null;
  } catch {
    return null;
  }
}

const lastmod = lastContentChange();
const indexable = routeSeo.filter((route) => !route.noindex);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map(
    (route) =>
      `  <url><loc>${absolute(route.path)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`,
  )
  .join("\n")}
</urlset>
`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap, "utf8");

/*
 * Netlify serves every prerendered page at both /path and /path.html. Nothing
 * links to the .html twin, but Search Console had already discovered
 * /index.html as a duplicate of /, so collapse them all onto the canonical
 * path. Generated from routeSeo so the list can't drift from the real routes.
 * 404.html is deliberately excluded — Netlify needs it reachable.
 */
const redirectsPath = path.join(dist, "_redirects");
const baseRedirects = await readFile(redirectsPath, "utf8");
const htmlAliases = routeSeo.map((route) => {
  const alias = `/${outputFile(route.path)}`;
  return `${alias.padEnd(36)}${route.path.padEnd(28)}301`;
});
await writeFile(
  redirectsPath,
  [
    "# Generated by scripts/prerender.mjs - edit public/_redirects instead.",
    ...htmlAliases,
    "",
    baseRedirects.trimStart(),
  ].join("\n"),
  "utf8",
);

console.log(`prerendered ${written.length} pages:`);
for (const { file, bytes } of written) {
  console.log(`  ${file.padEnd(34)} ${(bytes / 1024).toFixed(1)} kB`);
}
console.log(
  `sitemap.xml  ${indexable.length} indexable URLs${lastmod ? ` (lastmod ${lastmod})` : ""}`,
);
