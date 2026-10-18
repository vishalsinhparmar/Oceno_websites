export const heroContent = {
  eyebrow: "Vitreous china · Made in Morbi",
  description:
    "Designer basins, pedestal sets and water closets in premium vitreous china — engineered in Morbi, Gujarat and shipped to homes, hotels and projects across 40+ countries.",
  primaryCta: { label: "Explore Collections", href: "/products" },
  secondaryCta: { label: "Download Catalogue", href: "/catalogue" },
  stats: [
    { value: "40+", label: "Export countries" },
    { value: "250+", label: "Designs in range" },
    { value: "ISO 9001", label: "Certified plant" },
  ],
  /**
   * Products rotated through the hero slider. `filter` tints the shared Marina render to preview
   * glaze variants; swap `image` for dedicated product renders as they become available.
   */
  slides: [
    {
      id: "marina-ocean",
      name: "Marina Art Basin",
      detail: "Hand-glazed · Ocean Blue",
      code: "OC-AB-214",
      image: "productMarina",
      filter: "none",
      swatch: "#3f86c8",
      glow: "rgba(11, 77, 245, 0.55)",
    },
    {
      id: "marina-onyx",
      name: "Onyx Vessel Basin",
      detail: "Matte glaze · Charcoal",
      code: "OC-AB-221",
      image: "productMarina",
      filter: "grayscale(1) brightness(0.62) contrast(1.25)",
      swatch: "#2b3036",
      glow: "rgba(148, 163, 184, 0.35)",
    },
    {
      id: "marina-ivory",
      name: "Ivory Bloom Basin",
      detail: "Gloss glaze · Pure Ivory",
      code: "OC-AB-232",
      image: "productMarina",
      filter: "grayscale(1) sepia(0.18) brightness(1.28) contrast(0.92)",
      swatch: "#f4f5f7",
      glow: "rgba(255, 244, 222, 0.32)",
    },
    {
      id: "marina-jade",
      name: "Jade Ripple Basin",
      detail: "Hand-glazed · Jade Green",
      code: "OC-AB-245",
      image: "productMarina",
      filter: "hue-rotate(-58deg) saturate(1.15)",
      swatch: "#2fa58a",
      glow: "rgba(16, 185, 129, 0.4)",
    },
  ],
  qcBadge: { title: "Export grade", detail: "14-point QC" },
} as const;

export const productSearch = {
  title: "Find the right product for your space",
  browseAll: { label: "Browse all 250+ designs", href: "/products" },
  placeholder: "Search basins, closets, collections or product codes…",
  action: "/products",
  popular: [
    { label: "Table-Top Basins", count: 48 },
    { label: "Designer Art Basins", count: 36 },
    { label: "Pedestal Sets", count: 22 },
    { label: "Water Closets", count: 18 },
    { label: "Squatting Pans", count: 12 },
  ],
} as const;

export const categoriesContent = {
  eyebrow: "Shop by category",
  description:
    "From sculpted table-top basins to export-grade closets — every OCENO piece shares the same vitreous body, glaze and QC.",
  cta: { label: "View all products", href: "/products" },
  items: [
    {
      id: "table-top-basins",
      name: "Table-Top Basins",
      count: 48,
      href: "/products/table-top-basins",
      image: "categoryTableTop",
      media: "product",
      shadow: "categoryFloorShadow",
    },
    {
      id: "designer-art-basins",
      name: "Designer Art Basins",
      count: 36,
      href: "/products/designer-art-basins",
      image: "categoryDesignerArt",
      media: "product",
      shadow: "categoryFloorShadow",
    },
    {
      id: "pedestal-basins",
      name: "Pedestal Basins",
      count: 22,
      href: "/products/pedestal-basins",
      image: "categoryPedestal",
      media: "product",
      shadow: "categoryFloorShadow",
    },
    {
      id: "water-closets",
      name: "Water Closets",
      count: 18,
      href: "/products/water-closets",
      image: "categoryWaterClosets",
      media: "photo",
    },
    {
      id: "squatting-pans",
      name: "Squatting Pans",
      count: 12,
      href: "/products/squatting-pans",
      image: "categorySquatting",
      media: "product",
      shadow: "categoryFloorShadowAlt",
    },
  ],
} as const;

export const featuredContent = {
  eyebrow: "Bestsellers & new arrivals",
  cta: { label: "Shop all products", href: "/products" },
  filters: [
    { id: "all", label: "All products" },
    { id: "table-top", label: "Table-Top" },
    { id: "designer-art", label: "Designer Art" },
    { id: "pedestal", label: "Pedestal" },
    { id: "water-closets", label: "Water Closets" },
    { id: "squatting-pans", label: "Squatting Pans" },
  ],
  /**
   * `media: "product"` renders a cut-out on the radial surface with a floor shadow;
   * `media: "photo"` renders a full-bleed lifestyle shot.
   */
  products: [
    {
      id: "marina-art-basin",
      filter: "designer-art",
      category: "Designer Art Basin",
      name: "Marina Art Basin",
      size: "410 × 410 × 190 mm",
      finish: "Ocean Blue",
      swatch: "swatchOceanBlue",
      badge: "new",
      image: "productMarina",
      media: "product",
      shadow: "productFloorShadow",
      href: "/products/marina-art-basin",
    },
    {
      id: "elba-oval-basin",
      filter: "table-top",
      category: "Table-Top Basin",
      name: "Elba Oval Basin",
      size: "520 × 400 × 145 mm",
      finish: "Glossy White",
      swatch: "swatchWhite",
      badge: "new",
      image: "categoryTableTop",
      media: "product",
      shadow: "productFloorShadowWide",
      href: "/products/elba-oval-basin",
    },
    {
      id: "firenze-noir-pedestal",
      filter: "pedestal",
      category: "One-Piece Pedestal",
      name: "Firenze Noir Pedestal",
      size: "450 × 450 × 850 mm",
      finish: "Black Floral",
      swatch: "swatchBlack",
      badge: "bestseller",
      image: "productPedestalNoir",
      media: "product",
      shadow: "productFloorShadow",
      href: "/products/firenze-noir-pedestal",
    },
    {
      id: "monaco-one-piece-wc",
      filter: "water-closets",
      category: "Water Closet",
      name: "Monaco One-Piece WC",
      size: "680 × 370 × 720 mm",
      finish: "Glossy White",
      swatch: "swatchWhite",
      badge: "bestseller",
      image: "categoryWaterClosets",
      media: "photo",
      href: "/products/monaco-one-piece-wc",
    },
    {
      id: "capri-vessel-basin",
      filter: "designer-art",
      category: "Designer Art Basin",
      name: "Capri Vessel Basin",
      size: "420 × 420 × 160 mm",
      finish: "Glossy White",
      swatch: "swatchWhite",
      image: "categoryDesignerArt",
      media: "product",
      shadow: "productFloorShadow",
      href: "/products/capri-vessel-basin",
    },
    {
      id: "verona-pedestal-set",
      filter: "pedestal",
      category: "Pedestal Set",
      name: "Verona Pedestal Set",
      size: "550 × 440 × 830 mm",
      finish: "Glossy White",
      swatch: "swatchWhite",
      badge: "bestseller",
      image: "categoryPedestal",
      media: "product",
      shadow: "productFloorShadow",
      href: "/products/verona-pedestal-set",
    },
    {
      id: "orissa-squatting-pan",
      filter: "squatting-pans",
      category: "Squatting Pan",
      name: "Orissa Squatting Pan",
      size: "580 × 440 × 210 mm",
      finish: "Glossy White",
      swatch: "swatchWhite",
      image: "categorySquatting",
      media: "product",
      shadow: "productFloorShadowWide",
      href: "/products/orissa-squatting-pan",
    },
    {
      id: "lucca-round-basin",
      filter: "table-top",
      category: "Table-Top Basin",
      name: "Lucca Round Basin",
      size: "460 × 460 × 150 mm",
      finish: "Glossy White",
      swatch: "swatchWhite",
      badge: "new",
      image: "categoryTableTop",
      media: "product",
      shadow: "productFloorShadowWide",
      href: "/products/lucca-round-basin",
    },
  ],
} as const;

export const brandStoryContent = {
  eyebrow: "Our story",
  body: "OCENO — The European Treasures — was born in Morbi, the ceramic capital of India. We pair generations of local kiln expertise with the clean proportions of European bathroom design, producing sanitaryware that feels at home in a Mumbai apartment, a Dubai hotel or a Milan showroom.",
  checklist: [
    "High-density vitreous china fired above 1200 °C",
    "Lead-free glazes with anti-stain finish",
    "In-house design studio for OEM & private label",
  ],
  badge: { value: 15, suffix: "+", label: "years of ceramic craft" },
  primaryCta: { label: "About OCENO", href: "/about" },
  secondaryCta: { label: "Inside our plant", href: "/about#plant" },
} as const;

/** `decimals` drives the count-up formatting so "1.2" animates as 0.0 → 1.2. */
export const statsContent = [
  { value: 40, decimals: 0, suffix: "+", label: "Countries we export to" },
  { value: 250, decimals: 0, suffix: "+", label: "Designs across 5 families" },
  { value: 1.2, decimals: 1, suffix: "M", label: "Pieces produced every year" },
  { value: 14, decimals: 0, suffix: "", label: "Quality checks per piece" },
] as const;

export const whyOcenoContent = {
  eyebrow: "Why partners choose OCENO",
  description:
    "Whether you are stocking a retail floor or fitting out a 300-key hotel, we make the supply chain feel effortless.",
  features: [
    {
      id: "quality",
      icon: "iconShield",
      title: "Export-grade quality",
      body: "Every piece is fired above 1200 °C and passes 14 quality checks before it leaves Morbi.",
    },
    {
      id: "design",
      icon: "iconSparkle",
      title: "Design-led collections",
      body: "A European design language with 250+ models across basins, pedestals and closets.",
    },
    {
      id: "logistics",
      icon: "iconShip",
      title: "Container-ready logistics",
      body: "Mixed 20 ft / 40 ft loads, export packing and documentation handled in-house.",
    },
    {
      id: "oem",
      icon: "iconLayers",
      title: "OEM & private label",
      body: "Custom glazes, logos and packaging for distributors and retail brands.",
    },
  ],
} as const;

/**
 * Pieces in the spotlight picker. `photo` shows the styled scene; `product` stages the cut-out
 * on the navy radial surface until a dedicated photograph is available.
 */
export const spotlightContent = {
  eyebrow: "Collection spotlight · 2026",
  description:
    "Hand-glazed vessels in ocean blue, stone black and marble finishes — each one a small sculpture for the bathroom counter.",
  primaryCta: { label: "Explore the series", href: "/products/designer-art-basins" },
  secondaryCta: { label: "Request samples", href: "/contact?topic=samples" },
  defaultPiece: "nero",
  pieces: [
    { id: "marina", name: "Marina", finish: "Ocean Blue glaze", image: "productMarina", media: "product" },
    { id: "nero", name: "Nero Marmo", finish: "Stone black marble", image: "categoryDesignerArt", media: "photo" },
    { id: "elba", name: "Elba", finish: "Glossy white", image: "categoryTableTop", media: "product" },
  ],
} as const;

export const projectsContent = {
  eyebrow: "Projects & installations",
  cta: { label: "View all projects", href: "/projects" },
  projects: [
    {
      id: "riviera",
      title: "The Riviera Residences",
      location: "Ahmedabad, India",
      meta: "Residential · 240 apartments · Art basins",
      image: "projectRiviera",
      href: "/projects/riviera-residences",
    },
    {
      id: "azure",
      title: "Hotel Azure Marina",
      location: "Dubai, UAE",
      meta: "Hospitality · 180 keys · Pedestal sets",
      image: "projectAzure",
      href: "/projects/hotel-azure-marina",
    },
    {
      id: "lakeview",
      title: "Lakeview Corporate Park",
      location: "Nairobi, Kenya",
      meta: "Commercial · 12 floors · Closets & basins",
      image: "projectLakeview",
      href: "/projects/lakeview-corporate-park",
    },
  ],
} as const;

/** Replace the `href` values with the hosted PDF / XLSX files when they are published. */
export const catalogueContent = {
  eyebrow: "Catalogue & downloads",
  description:
    "Get the 2026 product catalogue, technical datasheets and installation guides. Ideal for dealers, architects and procurement teams.",
  documents: [
    { id: "datasheets", label: "Technical datasheets", meta: "PDF · 6.2 MB", href: "/catalogue#datasheets" },
    { id: "installation", label: "Installation guides", meta: "PDF · 3.8 MB", href: "/catalogue#installation" },
    { id: "price-list", label: "Export price list (on request)", meta: "XLSX · Dealer access", href: "/contact?topic=price-list" },
  ],
  catalogues: [
    {
      id: "basins",
      coverTitle: "Basin Collection",
      cover: "categoryDesignerArt",
      meta: "PDF · 18.4 MB · 64 pages",
      title: "Table-Top & Art Basins 2026",
      downloadHref: "/catalogue#basins",
      previewHref: "/catalogue#basins",
    },
    {
      id: "pedestals",
      coverTitle: "Pedestal Collection",
      cover: "productPedestalRed",
      meta: "PDF · 22.6 MB · 48 pages",
      title: "Pedestal & One-Piece Sets 2026",
      downloadHref: "/catalogue#pedestals",
      previewHref: "/catalogue#pedestals",
    },
  ],
} as const;

export const testimonialsContent = {
  eyebrow: "Trusted by partners",
  items: [
    {
      id: "rashid",
      quote:
        "“Consistent glaze, accurate dimensions and on-time containers. OCENO has become our first call for basins across three Gulf markets.”",
      name: "Rashid Al-Mansoori",
      role: "Procurement Head · Dubai, UAE",
    },
    {
      id: "priya",
      quote:
        "“The art basin range sells itself on our showroom floor. Packaging is export-grade — zero breakage in our last six loads.”",
      name: "Priya Nair",
      role: "Director, Aqua Living · Kochi",
    },
    {
      id: "daniel",
      quote:
        "“They customised glaze colours and private-label boxes for our brand in under eight weeks. A genuinely responsive manufacturer.”",
      name: "Daniel Okafor",
      role: "Founder, Lagos Bath Co. · Nigeria",
    },
  ],
} as const;

export const ctaBandContent = {
  eyebrow: "Request a quote",
  description:
    "Share your BOQ or product list — our export desk replies with pricing, MOQ and container plans within 24 hours.",
  quote: { label: "Request a Quote", href: "/contact" },
  whatsapp: { label: "Chat on WhatsApp" },
} as const;
