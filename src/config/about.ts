export const aboutHeroContent = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Company", href: "/about" },
  ],
  current: "About OCENO",
  eyebrow: "About OCENO",
  description:
    "OCENO is a Morbi-based manufacturer of vitreous-china sanitaryware. We combine local kiln mastery with European proportions to create basins, pedestals and closets that travel well — to homes, hotels and projects worldwide.",
  primaryCta: { label: "Explore products", href: "/products" },
  secondaryCta: { label: "Download company profile", href: "/catalogue#company-profile" },
  /** Hero media slider. Each slide pairs a photograph with its floating caption tag. */
  slides: [
    {
      id: "morbi",
      image: "aboutHeroPedestal",
      alt: "Floral hand-painted OCENO pedestal basin",
      icon: "iconMapPinBlueSmall",
      title: "Morbi, Gujarat",
      detail: "The ceramic capital of India",
    },
    {
      id: "studio",
      image: "storyMedia",
      alt: "OCENO table-top basin on a stone plinth",
      icon: "iconSparkle",
      title: "In-house design studio",
      detail: "European proportions, Indian craft",
    },
    {
      id: "glaze",
      image: "spotlightMedia",
      alt: "Nero Marmo hand-glazed art basin",
      icon: "iconShield",
      title: "Fired above 1200 °C",
      detail: "Hand-glazed, 14-point QC",
    },
    {
      id: "export",
      image: "projectAzure",
      alt: "OCENO pedestal set installed at Hotel Azure Marina",
      icon: "iconShip",
      title: "Shipped to 40+ countries",
      detail: "Export-grade packing & logistics",
    },
  ],
} as const;

export const missionContent = {
  eyebrow: "Our purpose",
  signature: { name: "Founding Director", role: "OCENO Ceramic Pvt. Ltd." },
  body: [
    "OCENO began with a single question: why should world-class sanitaryware cost the earth or come from the other side of it? Morbi already fired a large share of India’s ceramics — we set out to give that craft a premium, design-led voice.",
    "Today our plant combines high-pressure casting, robotic glazing and computer-controlled tunnel kilns with a hands-on finishing team. Every piece is inspected, logged and export-packed under one roof.",
    "The name says it: the European treasures. Clean lines, honest materials and finishes that last — made accessible to dealers, developers and homeowners in more than 40 countries.",
  ],
} as const;

export const aboutStatsContent = [
  { value: 15, decimals: 0, suffix: "+", label: "Years of ceramic craft" },
  { value: 40, decimals: 0, suffix: "+", label: "Export countries" },
  { value: 2.5, decimals: 1, suffix: "L", label: "Sq ft manufacturing campus" },
  { value: 600, decimals: 0, suffix: "+", label: "Skilled team members" },
] as const;

export const valuesContent = {
  eyebrow: "What we stand for",
  description: "They shape how we design, how we fire and how we ship.",
  items: [
    {
      id: "design",
      icon: "iconSparkleWhite",
      title: "Design with restraint",
      body: "European proportions, quiet curves and finishes that stay relevant for decades — never trend-chasing.",
    },
    {
      id: "quality",
      icon: "iconShieldWhite",
      title: "Quality you can measure",
      body: "High-density vitreous body, water absorption below 0.5% and 14 documented QC checkpoints.",
    },
    {
      id: "partnership",
      icon: "iconUserWhite",
      title: "Partnership, not just supply",
      body: "Dedicated export managers, transparent pricing and container plans built around your market.",
    },
  ],
} as const;

/** `highlight` marks the current milestone (red year and dot). */
export const journeyContent = {
  eyebrow: "Our journey",
  milestones: [
    { year: "2011", title: "Founded in Morbi", body: "First production line for table-top basins." },
    { year: "2014", title: "First export container", body: "Shipped to Dubai — the start of our Gulf partnerships." },
    { year: "2018", title: "Design studio opens", body: "Launch of the hand-glazed Art Basin series." },
    { year: "2022", title: "New tunnel kiln", body: "Capacity crosses 1 million pieces a year." },
    {
      year: "2026",
      title: "40+ countries",
      body: "Distribution across the Middle East, Africa, Europe & Asia.",
      highlight: true,
    },
  ],
} as const;

export const globalPresenceContent = {
  eyebrow: "Global presence",
  cta: { label: "Become a distributor", href: "/contact?topic=distributor" },
  regions: [
    { id: "me", name: "Middle East", count: 12, markets: "UAE · Saudi Arabia · Oman · Qatar" },
    { id: "africa", name: "Africa", count: 14, markets: "Kenya · Nigeria · Tanzania · Ghana" },
    { id: "europe", name: "Europe", count: 6, markets: "Italy · Poland · UK · Portugal" },
    { id: "apac", name: "Asia-Pacific", count: 8, markets: "Sri Lanka · Nepal · Vietnam · Australia" },
  ],
  certificationsLabel: "Certified & compliant",
  certifications: ["ISO 9001:2015", "ISO 14001", "CE Marked", "BIS / ISI", "WaterMark Ready"],
} as const;

export const aboutCtaContent = {
  eyebrow: "Partner with OCENO",
  description:
    "Distributors, dealers and developers — tell us about your market and we will tailor a collection, price list and container plan.",
  quote: { label: "Request a Quote", href: "/contact" },
  whatsapp: { label: "Chat on WhatsApp" },
} as const;
