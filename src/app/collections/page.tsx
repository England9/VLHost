import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
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
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Collections" },
        ]}
      />

      <section className="container-luxury pb-6">
        <p className="text-[11px] tracking-luxury uppercase text-accent mb-4">
          Curated
        </p>
        <h1 className="font-display text-4xl md:text-6xl text-foreground">
          Collections
        </h1>
        <p className="mt-4 text-foreground-muted max-w-2xl leading-relaxed">
          Six distinct worlds, united by a commitment to quiet luxury. Each
          collection tells a story of material, craft, and intention.
        </p>
      </section>

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
