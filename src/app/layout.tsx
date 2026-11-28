import type { Metadata } from "next";
import { Inter, Instrument_Serif, Syne } from "next/font/google";
import { createMetadata, JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { IntroCoverTeardown } from "@/components/brand/intro-cover";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const editorial = Instrument_Serif({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = createMetadata({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${editorial.variable}`}
    >
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link
          rel="preload"
          href="/brand/reveal-white.svg"
          as="image"
          type="image/svg+xml"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `#vulcira-intro-cover{position:fixed;inset:0;z-index:110;background:#0a0a0a;pointer-events:none}html:not([data-intro]) .landing-root[data-intro-gate]{visibility:hidden}`,
          }}
        />
      </head>
      <body className="antialiased">
        <div
          id="vulcira-intro-cover"
          className="fixed inset-0 z-[110] bg-[#0a0a0a]"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 110,
            background: "#0a0a0a",
          }}
          aria-hidden
        />
        <IntroCoverTeardown />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        {children}
      </body>
    </html>
  );
}