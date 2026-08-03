import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";
import { CollectionCard } from "@/components/cards/collection-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { collections } from "@/data";

export const metadata: Metadata = createMetadata({
  title: "Collections",
  description:
    "Explore VULCIRA's curated collections spanning fashion, cosmetics, and lifestyle — each conceived with architectural precision.",
  path: "/collections",
});

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        title="Collections"
        subtitle="Curated"
        description="Six distinct worlds, united by a commitment to quiet luxury. Each collection tells a story of material, craft, and intention."
        image="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1920&q=80"
        imageAlt="VULCIRA collections — editorial fashion"
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Collections" },
        ]}
      />

      <section className="container-luxury section-padding pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              priority={index < 2}
              size={index % 3 === 0 ? "large" : "default"}
            />
          ))}
        </div>
      </section>
    </>
  );
}
