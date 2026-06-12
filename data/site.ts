export interface NavLink {
  label: string;
  href: string;
  /** Section id used for active-state highlighting on the home page */
  sectionId: string;
}

export interface MarqueeItem {
  text: string;
  /** Render with the Arabic display font */
  arabic?: boolean;
}

export const SITE = {
  name: "poco loco.",
  tagline: "drink a little crazy",
  description:
    "Cold-pressed juice from Amman. Fruit goes in. Nothing else does. Pressed every morning, gone by sunset.",
  /** TODO: replace with poco loco's real WhatsApp number */
  whatsappNumber: "962700000000",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Menu", href: "/#menu", sectionId: "menu" },
  { label: "Order fresh", href: "/#order-fresh", sectionId: "order-fresh" },
  { label: "Weekly press", href: "/#weekly", sectionId: "weekly" },
  { label: "Wholesale", href: "/#go", sectionId: "go" },
];

export const HERO = {
  kicker: "Cold-pressed in Amman",
  kickerArabic: "شوية جنون",
  lede: "Fruit goes in. Nothing else does. Pressed every morning in Amman, gone by sunset — pick a flavor and watch the whole place change.",
  bottleTagline: "cold-pressed · 330ml",
  flavorLabel: "Pour the site in:",
};

export const MARQUEE: MarqueeItem[] = [
  { text: "pressed at dawn" },
  { text: "عصير طازج", arabic: true },
  { text: "zero added sugar" },
  { text: "seasonal only" },
  { text: "من عمّان بحب", arabic: true },
  { text: "bottles back = discount" },
];

export const MENU_SECTION = {
  kicker: "This season's press",
  title: "six bottles, no boring ones",
  lede: "The menu follows Jordan's seasons — when the fruit changes, so do we.",
};

export const ORDER_SECTION = {
  kicker: "Order fresh",
  title: ["direct to your door.", "across amman."],
  lede: "Build your own mix or grab the sampler — orders before 10am arrive the same day.",
  deliveryNote:
    "We deliver fresh across Amman. Orders placed before 10am are delivered same day.",
  weeklySaveNote: "Switch to weekly and save 10%",
};

export const WEEKLY_SECTION = {
  kicker: "The weekly press",
  title: "a bottle for every morning",
  days: ["Sun", "Mon", "Tue", "Wed", "Thu"],
  pitch:
    "Five bottles, delivered chilled to your door or office every Sunday across Amman. Pause anytime, swap flavors weekly, and return your empties for 10% off — the bottles get washed, refilled, and live another week.",
  cta: { label: "Start at 16 JD / week", href: "/#go" },
};

export const CTA_SECTION = {
  lines: ["your fridge is", "painfully sane.", "fix that."],
  /** Index of the line rendered in the juice accent color */
  accentLine: 1,
  actions: [
    { label: "Order on WhatsApp", href: "/#order-fresh", variant: "fill" as const },
    { label: "Wholesale & cafés", href: "/#go", variant: "ghost" as const },
  ],
  micro: "Pressed in Amman · delivered cold",
  microArabic: "من عمّان بحب",
};

export const FOOTER = {
  blurb: "poco loco. — a little crazy since day one",
  links: [
    { label: "Instagram", href: "#" },
    { label: "WhatsApp", href: "#" },
    { label: "Wholesale", href: "#" },
  ],
};
