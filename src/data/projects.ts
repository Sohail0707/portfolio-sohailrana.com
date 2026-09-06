export interface CaseStudySection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Project {
  slug: string;
  title: string;
  /** Short category line shown above titles. */
  tag: string;
  /** One-liner used on the project card. */
  blurb: string;
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
  problem: CaseStudySection;
  solution: CaseStudySection;
  outcome: CaseStudySection;
  results?: string[];
  quote?: { text: string; author: string };
}

export const projects: Project[] = [
  {
    slug: "seetha-the-comic",
    title: "Seetha The Comic",
    tag: "Platform migration · Sanity CMS",
    blurb:
      "A $100 tweak on a subscription website builder that became a full migration to owned code — content restructured in Sanity, hosting bill gone, and a site the client edits herself.",
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
    tag: "Web app · Structured content",
    blurb:
      "A mobile-first ordering app where the weekly menu is structured, editable data instead of images pasted into a chat thread — designed in Figma and built around one clean ordering flow.",
    skills: ["Figma", "UI/UX Design", "JavaScript", "REST APIs", "Structured Content"],
    thumbnail: "/images/projects/alejandras-kitchen.svg",
    thumbnailAlt: "Alejandra's Kitchen — mobile-first ordering web app",
    figmaUrl:
      "https://www.figma.com/design/ds0TIkTWUVgrAIhwUzpPex/Alexandra-s-Kitchen?node-id=0-1&t=w2OQC8oDKB53D1Tw-1",
    year: "2025",
    role: "Design + development",
    problem: {
      heading: "A growing kitchen run from a chat thread",
      paragraphs: [
        "Alejandra's homestyle meal service was growing faster than the tools running it. The weekly menu went out as images in chats, orders came back as free-form messages, and every week meant re-answering the same questions — what's available, what it costs, how to order. Mistakes crept in, and time that belonged in the kitchen went to admin.",
      ],
    },
    solution: {
      heading: "A menu-first app designed for phones",
      paragraphs: [
        "I designed a warm, appetizing interface in Figma and built it as a mobile-first web app, because customers order from their phones. The heart of it is a content model: dishes are structured data on a weekly rotation, so updating the menu is a quick edit instead of a new round of image exports.",
        "Customers browse the week's dishes, build an order, and submit it in one flow — every order arrives complete and consistent.",
      ],
      bullets: [
        "Appetite-driven UI designed in Figma",
        "Weekly menu modelled as structured, editable content",
        "Guided ordering flow replacing free-form DMs",
        "Mobile-first, responsive build",
      ],
    },
    outcome: {
      heading: "Orders without the back-and-forth",
      paragraphs: [
        "The weekly menu now updates in minutes, orders arrive structured instead of scattered across chats, and regulars reorder without asking a single question. The kitchen got its hours back — and a content model that can grow into payments and delivery tracking.",
      ],
    },
    results: [
      "Menu updates in minutes",
      "Structured orders, fewer mistakes",
      "Ready to grow into payments",
    ],
  },
  {
    slug: "tysons-roofing",
    title: "Tyson's Roofing",
    tag: "Marketing site · Static build",
    blurb:
      "A lean, hand-coded static site shipped in days — no builder, no subscription — built around a single job: turning a visit into a complete quote request.",
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
