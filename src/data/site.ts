export const site = {
  name: "Sohail Rana",
  logo: "Sr",
  domain: "sohailrana.com",
  role: "Web Developer & Designer",
  tagline: "Figma to pixel-perfect code",
  reach: "Working with clients worldwide",
  email: "hello@sohailrana.com",
  availability: "Available for new projects",
  defaultTitle:
    "Sohail Rana — Web Developer & Designer | Figma to Pixel-Perfect Code",
  defaultDescription:
    "Designer and developer in one. I design interfaces in Figma and hand-code them into fast, pixel-perfect, responsive websites. 100% Job Success on Upwork.",
  links: {
    upwork:
      "https://www.upwork.com/freelancers/~01de9d51fcee8a6c82?mp_source=share",
    github: "https://github.com/Sohail0707",
    linkedin: "https://www.linkedin.com/in/sohailrana07",
  },
  stats: [
    { value: "100%", label: "Job Success on Upwork" },
    { value: "5.0", label: "Average client rating" },
    { value: "50+", label: "Websites worked on" },
    { value: "3+", label: "Years designing & coding" },
  ],
  techStack: [
    "Figma",
    "UI/UX Design",
    "Design Systems",
    "JavaScript",
    "TypeScript",
    "React",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Sanity CMS",
    "Headless CMS",
    "Netlify",
    "Jamstack",
    "REST APIs",
    "Git & GitHub",
    "Responsive Design",
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
    title: "Web Design",
    description:
      "Interfaces designed in Figma around your brand and your users — not a template with your logo dropped in. You approve the design before a single line of code is written.",
    points: ["Figma design & prototypes", "UI/UX & design systems", "Brand-first layouts"],
  },
  {
    title: "Web Development",
    description:
      "The design, hand-coded into a fast, responsive, pixel-perfect website. No page builders, no bloat — just clean code that loads instantly on every device.",
    points: ["Hand-coded front ends", "React & Tailwind CSS", "Responsive on every screen"],
  },
  {
    title: "CMS & Launch",
    description:
      "Content wired into a clean CMS so you can edit everything yourself, deployed on modern hosting that often costs nothing to run. You own the whole platform.",
    points: ["Sanity CMS setup", "Netlify deployment", "Self-serve editing"],
  },
] as const;

export const approach = [
  {
    title: "Understand",
    description:
      "We start with the problem behind the request — your brand, your customers, and what the site actually needs to do. Sometimes the best answer is bigger (or smaller) than the original brief.",
  },
  {
    title: "Design in Figma",
    description:
      "Every page is designed around your brand and approved by you before development starts. No surprises at delivery — you've already seen exactly what you're getting.",
  },
  {
    title: "Hand-code it",
    description:
      "I build the approved design from scratch — pixel-perfect, responsive, and fast. Because I designed it, nothing gets lost in translation between designer and developer.",
  },
  {
    title: "Launch & hand over",
    description:
      "Deployed, tested on real devices, and handed over with a CMS you can edit yourself. You own the code, the content, and the platform — no lock-in, no retainer required.",
  },
] as const;
