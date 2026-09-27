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
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const { render, routeSeo, notFoundSeo, SITE_URL, site, projects } = await import(
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
    `<meta name="twitter:card" content="summary" />`,
    structuredData(route),
    "<!--/seo-->",
  ]
    .filter(Boolean)
    .join("\n    ");
}

/** "/" -> index.html, "/work/x" -> work/x/index.html (Netlify serves these as pretty URLs). */
const outputFile = (routePath) =>
  routePath === "/" ? "index.html" : path.join(routePath.replace(/^\//, ""), "index.html");

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

const indexable = routeSeo.filter((route) => !route.noindex);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((route) => `  <url><loc>${absolute(route.path)}</loc></url>`).join("\n")}
</urlset>
`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap, "utf8");

console.log(`prerendered ${written.length} pages:`);
for (const { file, bytes } of written) {
  console.log(`  ${file.padEnd(34)} ${(bytes / 1024).toFixed(1)} kB`);
}
console.log(`sitemap.xml  ${indexable.length} indexable URLs`);
