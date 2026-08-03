import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { ShopClient } from "./shop-client";

export const metadata: Metadata = createMetadata({
  title: "Shop",
  description:
    "Explore VULCIRA's curated selection of luxury fashion, cosmetics, and lifestyle objects. Each piece crafted for permanence.",
  path: "/shop",
});

export default function ShopPage() {
  return <ShopClient />;
}
