# sohailrana.com

Personal portfolio for **Sohail Rana** — designer-developer, Figma to pixel-perfect code.

Single-page site (Hero · Projects · About · Contact) with a separate case-study
page per project, built to send visitors to the Upwork profile.

**Stack:** Vite · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · React Router · Netlify Forms

## Commands

```bash
npm install      # once
npm run dev      # local dev server (http://localhost:5173)
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
```

## Editing content

All links are wired up. Everything below is data-driven — no component changes
needed for content edits:

- **Profile links** (Upwork, GitHub, LinkedIn, email, stats, tech stack) live
  in [`src/data/site.ts`](src/data/site.ts).
- **Projects and case studies** live in
  [`src/data/projects.ts`](src/data/projects.ts). Projects with a `liveUrl`
  (Pentagon Detailing, Seetha The Comic) show a "Live site" link; design-only
  projects with a `figmaUrl` (Tyson's Roofing, Alejandra's Kitchen) show a
  "Figma design" link instead.
- **Thumbnails** live in `public/images/projects/` (16:9, 1440×810). Each
  project's `accent` color is sampled from its thumbnail and drives the glow
  behind the card and the case-study hero — keep it in sync if you swap a
  thumbnail.

## Deploying to Netlify

1. Push this folder to a Git repository (GitHub/GitLab).
2. In Netlify: **Add new site → Import an existing project** and pick the repo.
   Build command (`npm run build`) and publish directory (`dist`) are already
   configured in [`netlify.toml`](netlify.toml), along with the SPA redirect
   that makes `/work/:slug` routes work.
3. Add your custom domain `sohailrana.com` under **Domain management**.

### Contact form

The form uses **Netlify Forms** (default setup):

- A hidden static `<form name="contact">` in [`index.html`](index.html) lets
  Netlify's build bots register the form; the React form in
  `src/components/ContactForm.tsx` posts url-encoded data to `/`.
- Submissions appear in the Netlify dashboard under **Forms → contact**.
- To receive submissions by email, add a notification in
  **Site configuration → Forms → Form notifications** pointing to
  `hello@sohailrana.com`.
- The form only works on the deployed site — locally it shows the fallback
  error with a direct mailto link (expected).

## Where things live

```
src/
  data/site.ts        ← name, email, social links, stats, tech stack
  data/projects.ts    ← projects + case-study content (problem/solution/outcome)
  sections/           ← Hero, Projects, About, Contact
  components/         ← Nav, Footer, ProjectCard, ContactForm, BrowserMock, …
  pages/              ← Home, CaseStudy (/work/:slug), NotFound
public/images/projects/  ← thumbnails (16:9)
```
