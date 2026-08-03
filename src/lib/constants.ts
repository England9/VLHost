export const SITE_CONFIG = {
  name: "VULCIRA",
  tagline: "Luxury Fashion • Cosmetics • Lifestyle",
  description:
    "VULCIRA is a luxury house of fashion, cosmetics, and lifestyle — where quiet confidence meets architectural refinement.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://vulcira.com",
  locale: "en_US",
  email: "concierge@vulcira.com",
  phone: "+1 (212) 555-0198",
  address: {
    street: "740 Madison Avenue",
    city: "New York",
    state: "NY",
    zip: "10065",
    country: "United States",
  },
  social: {
    instagram: "https://instagram.com/vulcira",
    pinterest: "https://pinterest.com/vulcira",
    linkedin: "https://linkedin.com/company/vulcira",
  },
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const EASING = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.4,
  normal: 0.6,
  slow: 0.9,
} as const;
