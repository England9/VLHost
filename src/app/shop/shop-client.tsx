"use client";

import { useState } from "react";
import { ProductCard } from "@/components/cards/product-card";
import { FilterDrawer } from "@/components/shop/filter-drawer";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { getProductsByCategory } from "@/data";

export function ShopClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredProducts = getProductsByCategory(activeCategory);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
      />

      <section className="container-luxury pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl md:text-6xl text-foreground">
              Shop
            </h1>
            <p className="mt-3 text-foreground-muted max-w-lg">
              A curated selection of fashion, cosmetics, and lifestyle objects —
              each chosen for its enduring beauty and exceptional craftsmanship.
            </p>
          </div>
          <FilterDrawer
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </section>

      <section className="container-luxury section-padding pt-0">
        <p className="text-[11px] tracking-luxury uppercase text-foreground-muted mb-8">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "Piece" : "Pieces"}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 4}
            />
          ))}
        </div>
      </section>
    </>
  );
}
