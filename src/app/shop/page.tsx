import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";
import { ShopClient } from "./shop-client";

export const metadata: Metadata = createMetadata({
  title: "Shop",
  description:
    "Explore VULCIRA's curated selection of luxury fashion, cosmetics, and lifestyle objects. Each piece crafted for permanence.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <>
      <PageHero
        title="Shop"
        subtitle="The Edit"
        description="Fashion, cosmetics, and lifestyle objects — curated with intention, crafted for permanence."
        image="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
        imageAlt="VULCIRA shop — luxury fashion editorial"
      />
      <ShopClient />
    </>
  );
}
