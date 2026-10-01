export const site = {
  name: "Sohail Rana",
  logo: "Sr",
  domain: "sohailrana.com",
  role: "Front-End Developer & Designer",
  tagline: "Figma to code, Sanity CMS, and code you own",
  reach: "Founders, product teams & agencies — remote",
  email: "hello@sohailrana.com",
  availability: "Available for new projects",
  defaultTitle:
    "Sohail Rana — Front-End Developer & Designer | Figma to Code, React & Sanity CMS",
  defaultDescription:
    "I design websites in Figma and build them as fast, hand-coded React front ends on Sanity CMS, or build your finished Figma file exactly as drawn. Top Rated on Upwork with 100% Job Success.",
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
    "React",
    "Sanity CMS",
    "Headless CMS",
    "Content Modeling",
    "Tailwind CSS",
    "JavaScript",
    "HTML5",
    "CSS",
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
    title: "Figma to Code",
    description:
      "Already have a design, or an existing React codebase? I build your Figma file exactly as drawn, to your spacing, type scale and components, and raise the states a design leaves out (empty, loading, error, long text, small screens) before they become a revision round. Fast and stable from the first commit, checked with Lighthouse before handoff.",
    points: [
      "Pixel-accurate builds from Figma",
      "New pages, sections & components in your codebase",
      "Lighthouse-checked performance",
    ],
  },
  {
    title: "Design in Figma",
    description:
      "No design yet? I design the full site in Figma around your brand first. You approve every page before any code is written, so nothing changes by surprise at build time. Because I build it too, nothing gets lost between design and code.",
    points: [
      "Full-site design in Figma",
      "Approved before development starts",
      "Designed knowing how it will be built",
    ],
  },
  {
    title: "Sanity CMS",
    description:
      "Your content modelled as reusable blocks in Sanity, so your team adds pages, services, events and posts without touching code, while the front end stays fast and hand-coded.",
    points: [
      "Content modelling & structured data",
      "Reusable page blocks",
      "Self-serve editing for your team",
    ],
  },
  {
    title: "Rebuilds & Migrations",
    description:
      "Moving off a restrictive website builder, or stuck with an AI-generated or inherited codebase nobody can maintain? I rebuild it as clean, readable code on your own domain and in your own GitHub repo. Content, URLs and search rankings come across intact.",
    points: [
      "Content & URL migration, redirects preserved",
      "AI-generated and inherited code rebuilt cleanly",
      "Handed over in your own Git repo",
    ],
  },
  {
    title: "Custom Features & Integrations",
    description:
      "Multi-step booking and order flows, forms, payments, CRM hooks and live data, written as custom front-end code instead of plugins, so they match your brand rather than looking like third-party software.",
    points: [
      "Booking & order flows",
      "REST APIs and third-party services",
      "Custom-built over embedded widgets",
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
    title: "Build in code",
    description:
      "The approved design, hand-coded as a fast, responsive React front end with content modelled in Sanity. Because I designed it, nothing gets lost in translation between designer and developer.",
  },
  {
    title: "Migrate & hand over",
    description:
      "Content moved across, redirects mapped, deployed and tested on real devices — then handed to you in your own repo. You own the code, the content, and the hosting. No lock-in.",
  },
] as const;
