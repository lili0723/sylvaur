export const COMPANY = {
  name: "Sylvaur Textile",
  shortName: "Sylvaur",
  location: "Guangzhou, Guangdong, China",
  email: "aigptline@outlook.com",
  whatsapp: "",  // Add your WhatsApp number when ready, e.g. "+86-13800138000"
  founded: 2010,
  exportMarkets: ["Southeast Asia", "Europe", "New Zealand"] as const,
} as const;

export const SITE_URL = "https://sylvaur.cn";

export const NAV_LINKS = [
  { href: "/", labelKey: "home" },
  { href: "/products/pillows", labelKey: "homeSeries" },
  { href: "/products/scarves", labelKey: "fashionAccessories" },
  { href: "/about", labelKey: "about" },
  { href: "/certifications", labelKey: "certifications" },
  { href: "/contact", labelKey: "contact" },
] as const;

export const SOCIAL_LINKS = {
  linkedin: "#",
  facebook: "#",
  instagram: "#",
  twitter: "#",
} as const;
