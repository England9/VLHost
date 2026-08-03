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

      <section className="container-luxury -mt-4 pb-6">
        <div className="flex justify-center">
          <FilterDrawer
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </section>

      <section className="container-luxury section-padding pt-0">
        <p className="text-[11px] tracking-luxury uppercase text-foreground-muted mb-8 text-center">
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
