export const SITE_CONFIG = {
  name: "VULCIRA",
  tagline: "Global fashion, made accessible",
  description:
    "VULCIRA is coming soon. Join the waitlist for early access to global fashion made accessible.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://vulcira.com",
  locale: "en_US",
  social: {
    instagram: "https://instagram.com/vulcira",
    tiktok: "https://www.tiktok.com/@vulcira",
  },
} as const;

export const EASING = [0.16, 1, 0.3, 1] as const;