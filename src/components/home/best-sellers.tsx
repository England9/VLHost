"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/cards/product-card";
import { getBestsellers } from "@/data";
import { fadeInUp } from "@/lib/animations";

export function BestSellers() {
  const products = getBestsellers();

  return (
    <section className="section-padding bg-background-secondary">
      <div className="container-luxury">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4"
        >
          <div>
            <p className="text-[11px] tracking-luxury uppercase text-accent mb-4">
              Most Coveted
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-[11px] tracking-luxury uppercase text-foreground-muted hover:text-accent transition-colors duration-500"
          >
            Shop All
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
