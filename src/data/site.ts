export const site = {
  name: "Sohail Rana",
  logo: "Sr",
  domain: "sohailrana.com",
  role: "Next.js & Headless CMS Developer",
  tagline: "Sanity, migrations, and code you own",
  reach: "Startups, SaaS teams & agencies — remote",
  email: "hello@sohailrana.com",
  availability: "Available for new projects",
  defaultTitle:
    "Sohail Rana — Next.js & Headless CMS Developer | Site Migrations",
  defaultDescription:
    "I build headless CMS websites with Next.js and Sanity, and migrate startups, SaaS teams, and agencies off restrictive site builders and AI-generated code onto clean, owned code. Top Rated on Upwork with 100% Job Success.",
  links: {
    upwork:
      "https://www.upwork.com/freelancers/~01de9d51fcee8a6c82?mp_source=share",
    github: "https://github.com/Sohail0707",
    linkedin: "https://www.linkedin.com/in/sohailrana07",
  },
  stats: [
    { value: "100%", label: "Job Success on Upwork" },
    { value: "5.0", label: "Average client rating" },
    { value: "50+", label: "Websites shipped" },
    { value: "Top Rated", label: "Freelancer on Upwork" },
  ],
  techStack: [
    "Next.js",
    "React",
    "TypeScript",
    "Sanity CMS",
    "Headless CMS",
    "Content Modeling",
    "Tailwind CSS",
    "JavaScript",
    "Figma",
    "API Integration",
    "Site Migration",
    "Jamstack",
    "Framer",
    "Netlify",
    "Vercel",
    "Git & GitHub",
  ],
} as const;

/** Numbered single-page sections, ozgur.design style. */
export const navLinks = [
  { num: "01", label: "Work", href: "/#work" },
  { num: "02", label: "Services", href: "/#services" },
  { num: "03", label: "About", href: "/#about" },
  { num: "04", label: "Approach", href: "/#approach" },
  { num: "05", label: "Reviews", href: "/#reviews" },
  { num: "06", label: "Contact", href: "/#contact" },
] as const;

export const services = [
  {
    title: "Headless CMS Websites",
    description:
      "Your content modelled properly and wired into Sanity, so your team edits pages, posts, and case studies without touching code — while the front end stays a fast, hand-coded Next.js app.",
    points: [
      "Next.js + Sanity builds",
      "Content modelling & structured data",
      "Self-serve editing for your team",
    ],
  },
  {
    title: "Platform Migration",
    description:
      "Moving off a slow, restrictive website builder onto code you own. Content, URLs, and search rankings come across intact — you keep the traffic and lose the subscription and the ceiling.",
    points: [
      "Content & URL migration",
      "Redirects and SEO preserved",
      "No platform lock-in, no monthly fee",
    ],
  },
  {
    title: "AI-Generated Site Rescue",
    description:
      "Sites shipped out of an AI app builder look fine until something needs to change. I rebuild them as clean, readable React or Next.js that you — or any developer you hire next — can actually maintain.",
    points: [
      "Rebuilt as maintainable code",
      "Real component structure",
      "Handed over in your own Git repo",
    ],
  },
  {
    title: "API & Integrations",
    description:
      "Booking flows, payments, CRM hooks, live data. Third-party services wired into your front end properly, so they match your brand instead of sitting in a mismatched embedded widget.",
    points: [
      "Booking & enquiry flows",
      "REST APIs and third-party services",
      "Custom-built over embedded widgets",
    ],
  },
  {
    title: "Feature & Component Work",
    description:
      "Already have a React or Next.js codebase? I come in for the piece you need — a page template, a new section, a design-system component — following the conventions your team already uses.",
    points: [
      "New pages, sections & components",
      "Figma handoff to production code",
      "Fits your existing patterns",
    ],
  },
  {
    title: "Framer Builds",
    description:
      "For founders and consultants who want to run their own site. Designed in Figma first, then built in Framer so you can edit copy and pages yourself, with no developer in the loop.",
    points: [
      "For self-managed sites only",
      "Designed properly before it's built",
      "Launch-ready in days, not months",
    ],
  },
] as const;

export const approach = [
  {
    title: "Audit & plan",
    description:
      "We start with what the site actually has to do and what's holding it back — the platform, the content model, the code someone else left behind. Sometimes the right answer is smaller than the brief.",
  },
  {
    title: "Design in Figma",
    description:
      "Every page is designed around your brand and approved by you before development starts. No surprises at delivery — you've already seen exactly what you're getting.",
  },
  {
    title: "Build in Next.js",
    description:
      "The approved design, hand-coded as a fast, responsive front end with content modelled in Sanity. Because I designed it, nothing gets lost in translation between designer and developer.",
  },
  {
    title: "Migrate & hand over",
    description:
      "Content moved across, redirects mapped, deployed and tested on real devices — then handed to you in your own repo. You own the code, the content, and the hosting. No lock-in, no retainer required.",
  },
] as const;
