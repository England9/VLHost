import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { EditorialSection } from "@/components/sections/editorial-section";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Discover the story of VULCIRA — a luxury house founded on the principles of quiet confidence, architectural refinement, and enduring craftsmanship.",
  path: "/about",
});

const timeline = [
  {
    year: "2018",
    title: "Foundation",
    description:
      "VULCIRA is founded in Milan with a singular vision: to create a luxury house defined by restraint rather than excess.",
  },
  {
    year: "2020",
    title: "First Collection",
    description:
      "The debut Nocturne collection launches to critical acclaim, establishing VULCIRA's architectural approach to fashion.",
  },
  {
    year: "2022",
    title: "Beauty Division",
    description:
      "Lumière skincare and Essence fragrance collections debut, extending the VULCIRA philosophy into beauty.",
  },
  {
    year: "2024",
    title: "New York Flagship",
    description:
      "The Madison Avenue atelier opens — a space conceived as gallery, workshop, and sanctuary.",
  },
  {
    year: "2026",
    title: "Today",
    description:
      "VULCIRA continues to grow while remaining true to its founding principles: quiet luxury, timeless design, and uncompromising craft.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      <section className="container-luxury pb-6">
        <p className="text-[11px] tracking-luxury uppercase text-accent mb-4">
          Our Story
        </p>
        <h1 className="font-display text-4xl md:text-7xl text-foreground max-w-4xl leading-[1.05]">
          A House Built on Restraint
        </h1>
        <p className="mt-6 text-foreground-muted text-lg leading-relaxed max-w-2xl">
          VULCIRA was born from a conviction that true luxury speaks in whispers,
          not shouts. We create for those who understand that permanence is the
          ultimate sophistication.
        </p>
      </section>

      <section className="relative aspect-[21/9] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
          alt="VULCIRA flagship atelier interior — minimalist luxury retail space"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </section>

      <EditorialSection
        title="Craft as Philosophy"
        subtitle="Philosophy"
        content="We do not chase trends. We pursue permanence. Every decision at VULCIRA — from the selection of raw materials to the architecture of our retail spaces — is guided by a single question: will this endure? Our ateliers in Milan and Paris employ master craftspeople whose skills have been refined over decades. We source fabrics from mills we visit personally. We compose fragrances over years, not months."
        image="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&q=80"
        imageAlt="Master tailor at work in VULCIRA atelier"
        reversed
      />

      <section className="section-padding bg-background-secondary">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-luxury uppercase text-accent mb-4">
              Milestones
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground">
              Our Journey
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-0">
            {timeline.map((item) => (
              <div
                key={item.year}
                className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-12 py-8 border-b border-border last:border-0"
              >
                <p className="font-display text-2xl md:text-3xl text-accent">
                  {item.year}
                </p>
                <div>
                  <h3 className="font-display text-xl md:text-2xl text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EditorialSection
        title="The Madison Avenue Atelier"
        subtitle="Flagship"
        content="Our New York flagship is more than a store — it is an experience. Conceived by architect Renzo Caletti, the space blurs the boundary between gallery and atelier. Natural light floods through floor-to-ceiling windows. Garments are displayed as sculpture. Private appointments offer an intimate introduction to the VULCIRA world."
        image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
        imageAlt="VULCIRA Madison Avenue flagship interior"
        cta={{ label: "Book an Appointment", href: "/contact" }}
      />
    </>
  );
}
