export type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

export const siteConfig = {
  name: "OCENO",
  tagline: "Manufacturer & exporter of premium sanitaryware",
  location: "Morbi, Gujarat, India",
  phone: { display: "+91 98250 00000", href: "tel:+919825000000" },
  email: { display: "export@oceno.in", href: "mailto:export@oceno.in" },
  whatsappHref: "https://wa.me/919825000000",
  language: "EN",
  quoteHref: "/contact",
} as const;

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "Projects", href: "/projects" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Contact", href: "/contact" },
];

export const footerContent = {
  newsletter: { eyebrow: "Stay in the loop", title: "New collections and export price lists, first." },
  about:
    "OCENO crafts vitreous-china sanitaryware in Morbi, India — designed with European restraint, built for homes, hotels and projects in 40+ countries.",
  address: "8-A, National Highway 8A, Morbi 363642, Gujarat, India",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "iconLinkedin" },
    { label: "Instagram", href: "https://www.instagram.com/", icon: "iconInstagram" },
    { label: "Facebook", href: "https://www.facebook.com/", icon: "iconFacebook" },
    { label: "YouTube", href: "https://www.youtube.com/", icon: "iconYoutube" },
  ],
  columns: [
    {
      title: "Products",
      links: [
        { label: "Table-Top Basins", href: "/products/table-top-basins" },
        { label: "Designer Art Basins", href: "/products/designer-art-basins" },
        { label: "Pedestal Basins", href: "/products/pedestal-basins" },
        { label: "Water Closets", href: "/products/water-closets" },
        { label: "Squatting Pans", href: "/products/squatting-pans" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About OCENO", href: "/about" },
        { label: "Manufacturing", href: "/manufacturing" },
        { label: "Projects", href: "/projects" },
        { label: "Quality & Certifications", href: "/about#quality" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Catalogue 2026", href: "/catalogue" },
        { label: "Technical Datasheets", href: "/catalogue#datasheets" },
        { label: "Installation Guides", href: "/catalogue#installation" },
        { label: "Export Enquiry", href: "/contact" },
        { label: "FAQ", href: "/faq" },
      ],
    },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Sitemap", href: "/sitemap" },
  ],
  copyright: "© 2026 OCENO Ceramic Pvt. Ltd. All rights reserved.",
  madeIn: "Made in Morbi, India",
} as const;
