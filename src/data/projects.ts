export interface CaseStudyImage {
  /** Path under /public. */
  src: string;
  alt: string;
  /**
   * The file's real pixel dimensions. Required: the galleries lazy-load, and
   * without an intrinsic ratio to reserve space the images collapse to zero
   * height and shove the page around as they arrive.
   */
  width: number;
  height: number;
}

/**
 * Column count for a section's gallery. Heights are left to the images' own
 * aspect ratios so UI screenshots are never cropped.
 */
export type ImageLayout = "wide" | "phone" | "page";

export interface CaseStudySection {
  /** Rail label, e.g. "Problem". Defaults to the trio labels for older entries. */
  label?: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  images?: CaseStudyImage[];
  imageLayout?: ImageLayout;
}

interface ProjectBase {
  slug: string;
  title: string;
  /** Short category line shown above titles. */
  tag: string;
  /** One-liner used on the project card. */
  blurb: string;
  /** <title> for the case-study page — keyword-led, brand appended by seo.ts. */
  metaTitle: string;
  /** Meta description, kept under ~155 chars so it isn't truncated in results. */
  metaDescription: string;
  skills: string[];
  /** 16:9 thumbnail in /public/images/projects. */
  thumbnail: string;
  thumbnailAlt: string;
  /** Omit for design-only projects (no public site to link). */
  liveUrl?: string;
  /** Public Figma file — linked instead of a live site for design-only projects. */
  figmaUrl?: string;
  year: string;
  role: string;
  /** Who else worked on it. Omit for solo projects. */
  team?: string;
  results?: string[];
  quote?: { text: string; author: string };
}

/** Entries built on the fixed Problem / Solution / Outcome trio. */
interface TrioProject extends ProjectBase {
  problem: CaseStudySection;
  solution: CaseStudySection;
  outcome: CaseStudySection;
  sections?: never;
}

/** Entries that define their own ordered sections and can carry galleries. */
interface SectionsProject extends ProjectBase {
  sections: CaseStudySection[];
  problem?: never;
  solution?: never;
  outcome?: never;
}

export type Project = TrioProject | SectionsProject;

/** Normalises both shapes into the ordered list the case-study page renders. */
export function caseStudySections(project: Project): CaseStudySection[] {
  if (project.sections) return project.sections;
  return [
    { label: "Problem", ...project.problem },
    { label: "Solution", ...project.solution },
    { label: "Outcome", ...project.outcome },
  ];
}

export const projects: Project[] = [
  {
    slug: "seetha-the-comic",
    title: "Seetha The Comic",
    tag: "Platform migration · Sanity CMS",
    blurb:
      "A $100 tweak on a subscription website builder that became a full migration to owned code — content restructured in Sanity, hosting bill gone, and a site the client edits herself.",
    metaTitle: "Site Builder to Sanity CMS Migration — Seetha The Comic",
    metaDescription:
      "How a small redesign request became a full migration off a subscription site builder onto a hand-coded Jamstack front end with Sanity CMS.",
    skills: ["Figma", "Jamstack", "Sanity CMS", "Content Migration", "Netlify"],
    thumbnail: "/images/projects/seetha-the-comic.svg",
    thumbnailAlt:
      "Seetha The Comic — website migrated off a site builder onto a headless CMS",
    liveUrl: "https://seethathecomic.com/",
    year: "2025–2026",
    role: "Design + development",
    problem: {
      heading: "A small fix on a platform working against her",
      paragraphs: [
        "Seetha came to Upwork with a modest request: a small redesign of her existing site. But the real problem ran deeper. She was paying a monthly subscription for a template that didn't feel like her brand, fighting a restrictive editor every time she wanted to change something, and the site did little to showcase a growing comedy career.",
        "A quick cosmetic patch would have closed the ticket — and left her stuck with the same costs, the same platform ceiling, and the same generic look.",
      ],
    },
    solution: {
      heading: "A rebrand and a platform she actually owns",
      paragraphs: [
        "Instead of patching the template, I proposed a different path: redesign the site around her brand in Figma, hand-code it as a fast Jamstack front end, and model her content in Sanity CMS so she could edit everything herself — hosted on Netlify for free.",
        "Once she saw the direction, the scope grew to four times the original job. I designed every page around her voice and material, built the front end from scratch with no page builder in sight, and wired up a clean Sanity studio where shows, clips, and pages are simple structured content.",
      ],
      bullets: [
        "Full brand-first redesign in Figma, approved before a line of code",
        "Hand-coded, responsive Jamstack front end — no templates",
        "Site-builder content migrated into a modelled Sanity CMS",
        "Free Netlify hosting replacing the monthly subscription",
      ],
    },
    outcome: {
      heading: "Lower costs, full control, and a 5-star review",
      paragraphs: [
        "The subscription bill went to zero, the site loads fast everywhere, and Seetha updates her own content in minutes — no developer required. What started as a $100 ticket ended as a complete platform she owns outright.",
      ],
    },
    results: [
      "Scope grew 4× on merit",
      "$0/month hosting on Netlify",
      "Client edits content herself",
      "5.0 ★ review",
    ],
    quote: {
      text: "I had an absolutely fantastic experience working with Sohail on my website. From the very beginning, Sohail took the time to truly understand my brand as Seetha The Comic.",
      author: "Client review · Upwork",
    },
  },
  {
    slug: "pentagon-detailing",
    title: "Pentagon Detailing",
    tag: "Custom booking flow · Integration",
    blurb:
      "A hand-coded site with a custom multi-step booking flow built into the product rather than bolted on — matching the brand pixel for pixel and carrying no third-party widget fees.",
    metaTitle: "Custom Multi-Step Booking System Build — Pentagon Detailing",
    metaDescription:
      "A multi-step booking flow designed in Figma and hand-coded into the site: brand-matched, structured bookings, live pricing, and no third-party widget fees.",
    skills: ["Figma", "JavaScript", "Tailwind CSS", "API Integration", "Netlify"],
    thumbnail: "/images/projects/pentagon-detailing.svg",
    thumbnailAlt:
      "Pentagon Detailing — custom-coded website with a multi-step booking system",
    liveUrl: "https://pentagondetailing.com/",
    year: "2025",
    role: "Design + development",
    problem: {
      heading: "Bookings stuck in phone tag",
      paragraphs: [
        "Pentagon Detailing ran a quality operation with a booking process that didn't match it. Every appointment started as a phone call or DM, followed by back-and-forth about vehicle type, packages, add-ons, and timing. After-hours enquiries went cold — and the obvious off-the-shelf fix, an embedded scheduling widget, would have meant a monthly fee and an interface that looked nothing like the brand.",
      ],
    },
    solution: {
      heading: "A booking system built into the site, not bolted onto it",
      paragraphs: [
        "I designed the brand experience in Figma first — dark, glossy, automotive — and hand-coded it into a fast, responsive front end. The centerpiece is a custom multi-step booking flow: pick a vehicle, choose a package, add extras, pick a slot. Pricing updates live at every step, so customers reach the confirmation screen already knowing the cost.",
        "Because the flow is custom-built rather than an embedded third-party widget, it matches the brand pixel for pixel, sends structured data straight through to the studio, and adds no recurring cost.",
      ],
      bullets: [
        "Brand-forward UI designed in Figma",
        "Custom multi-step booking flow with live price summary",
        "Structured booking requests instead of free-form calls",
        "Fast, responsive, hand-coded front end on Netlify",
      ],
    },
    outcome: {
      heading: "Structured bookings around the clock",
      paragraphs: [
        "Booking requests now arrive complete — vehicle, package, add-ons, preferred time — ready to confirm in one reply. The site captures after-hours leads the phone used to lose, with no scheduling subscription in the stack.",
      ],
    },
    results: [
      "Custom booking flow, no widget fees",
      "Complete requests, no phone tag",
      "After-hours leads captured",
    ],
  },
  {
    slug: "alejandras-kitchen",
    title: "Alejandra's Kitchen",
    tag: "Brand, web & app design · In-house",
    blurb:
      "Brand, website, printable menu and customer app for a homestyle meal-delivery service.",
    metaTitle: "Brand, Website & App Design — Alejandra's Kitchen",
    metaDescription:
      "Brand system, marketing website, two-page printable menu and customer app design for a homestyle meal-delivery service launched by Dutrow LLC.",
    skills: ["Figma", "UI Design", "HTML", "CSS", "JavaScript"],
    thumbnail: "/images/projects/alejandras-kitchen.svg",
    thumbnailAlt:
      "Alejandra's Kitchen — marketing website design for a meal-delivery service",
    year: "Aug 2024 – Mar 2025",
    role: "Frontend Developer & UI Designer",
    team: "Backend developer built the server and app",
    sections: [
      {
        label: "Challenge",
        heading: "A new food business with nothing in place",
        paragraphs: [
          "Dutrow LLC, a US company running several local service brands, was launching a homestyle meal-delivery business called Alejandra's Kitchen. I worked there full-time as Frontend Developer & UI Designer.",
          "It needed to launch with a complete customer experience: a site to explain the service, a menu customers could scan or print, and an app to schedule deliveries and order meals.",
        ],
      },
      {
        label: "Approach",
        heading: "One visual system, applied three times",
        paragraphs: [
          "I designed the visual system first and settled it before building anything — dark UI, a hot-pink accent, and food photography shot on dark plates.",
          "Then I applied it across all three touchpoints, so the brand feels the same wherever a customer meets it: on the website, on a printed menu, or in the app.",
        ],
      },
      {
        label: "Website",
        heading: "Marketing website",
        paragraphs: [
          "The site explains the service and points people at ordering. A hero with a clear call to action, then how it works in four steps: select a day, create a meal, customise it, add items.",
          "Below that sits the weekly menu in tabs — Daily Specials, Sides, Drinks, Dessert — followed by testimonials, an FAQ and a contact form. I designed it in Figma and built it in HTML, CSS and JavaScript.",
        ],
        imageLayout: "wide",
      },
      {
        label: "Print",
        heading: "Two-page printable menu",
        paragraphs: [
          "A two-page layout split into Entree, Extra, Drinks and Dessert, with sale pricing shown alongside the standard prices.",
          "Dietary icons run through it — sugar-free, contains sugar, vegan, keto, spicy, not spicy — so a customer can read one row and know what they are ordering. A scan-to-order QR code sits next to a promo for daily notifications. I built this in code as well.",
        ],
        imageLayout: "page",
      },
      {
        label: "App",
        heading: "Customer app",
        paragraphs: [
          "I designed the app in Figma. A backend developer on the team built the server and the web app itself.",
          "It opens on a calendar for choosing delivery days. From there customers browse meals by category and open a meal detail with a description, nutrition facts and price. The order summary carries subtotal, tax and discount, with promo cards for the Family Plan and a combo offer.",
          "The account area covers saved addresses and saved cards, including the empty states for a customer with no address or no card saved yet.",
        ],
        imageLayout: "phone",
      },
      {
        label: "Reflection",
        heading: "What I took from it",
        paragraphs: [
          "Designing one system for web, print and mobile made me settle it properly up front — a hot-pink accent that reads well on a dark screen behaves differently in print, and a layout that breathes on a page has to survive a fixed sheet size.",
          "Working alongside a backend developer also changed how I handed work over: the screens mattered less than the states between them, and designing the empty cases explicitly saved a lot of back-and-forth. The business has since closed, so this is design and frontend work rather than a live product.",
        ],
      },
    ],
  },
  {
    slug: "tysons-roofing",
    title: "Tyson's Roofing",
    tag: "Marketing site · Static build",
    blurb:
      "A lean, hand-coded static site shipped in days — no builder, no subscription — built around a single job: turning a visit into a complete quote request.",
    metaTitle: "Fast Hand-Coded Static Marketing Site — Tyson's Roofing",
    metaDescription:
      "A lean, hand-coded static marketing site shipped in days, built around one job: turning a visit into a complete quote request.",
    skills: ["Web Design", "HTML5", "CSS3", "JavaScript", "Netlify"],
    thumbnail: "/images/projects/tysons-roofing.svg",
    thumbnailAlt: "Tyson's Roofing — fast, hand-coded static marketing website",
    figmaUrl:
      "https://www.figma.com/design/9kpvvjsYKu3ZQ3mCCZJ13D/Tysons-Roofing?node-id=0-1&t=IJvaLPhMo4cGHHHN-1",
    year: "2023",
    role: "Design + development",
    problem: {
      heading: "Word of mouth doesn't scale",
      paragraphs: [
        "Tyson's Roofing won jobs on reputation, but online there was nothing to back it up — no place to see services, check the service area, or request a quote. Prospects comparing contractors moved on to companies that looked established, and the budget and timeline left no room for a drawn-out agency project.",
      ],
    },
    solution: {
      heading: "A focused static site, shipped fast",
      paragraphs: [
        "I designed and hand-coded a lean static site built around one job: turning a visit into a quote request. Services, service area, proof of work, and a prominent quote form — nothing that slows the site or distracts from the goal.",
        "Static hosting means it loads instantly, costs almost nothing to run, and has nothing to break or maintain.",
      ],
      bullets: [
        "Conversion-focused one-page design",
        "Hand-coded static build — instant loads",
        "Prominent quote form capturing complete leads",
        "Delivered within days on a fixed budget",
      ],
    },
    outcome: {
      heading: "A credible web presence in under two weeks",
      paragraphs: [
        "The client went from invisible to credible: a fast site that ranks for the basics, presents the company properly, and turns visitors into detailed quote requests. The client's review said it best.",
      ],
    },
    results: ["Live within days", "5.0 ★ review", "Quote requests with full details"],
    quote: {
      text: "Love it, thanks so much!",
      author: "Client review · Upwork",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
