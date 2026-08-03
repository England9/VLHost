"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CollectionCard } from "@/components/cards/collection-card";
import { getFeaturedCollections } from "@/data";
import { fadeInUp } from "@/lib/animations";

export function FeaturedCollections() {
  const collections = getFeaturedCollections();

  return (
    <section className="section-padding">
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
              Curated
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground">
              Featured Collections
            </h2>
          </div>
          <Link
            href="/collections"
            className="text-[11px] tracking-luxury uppercase text-foreground-muted hover:text-accent transition-colors duration-500"
          >
            View All Collections
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={index === 0 ? "md:col-span-2" : ""}
            >
              <CollectionCard
                collection={collection}
                priority={index === 0}
                size={index === 0 ? "large" : "default"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
