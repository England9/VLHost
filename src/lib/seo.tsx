import type { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

const { name, description, url } = SITE_CONFIG;

export function createMetadata({
  title,
  description: desc,
  path = "",
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const pageTitle = title
    ? `${title} | ${name}`
    : `${name} — ${SITE_CONFIG.tagline}`;
  const pageDescription = desc || description;
  const canonical = `${url}${path}`;
  const ogImage = image || `${url}/images/vulcira-hero-editorial.jpg`;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(url),
    alternates: { canonical },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonical,
      siteName: name,
      locale: SITE_CONFIG.locale,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: name }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.svg`,
    description: SITE_CONFIG.description,
    sameAs: Object.values(SITE_CONFIG.social),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
  };
}

export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}