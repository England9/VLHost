"use client";

import Link from "next/link";
import { ContentImage } from "@/components/ui/content-image";
import { motion } from "framer-motion";
import type { Collection } from "@/types";

interface CollectionCardProps {
  collection: Collection;
  priority?: boolean;
  size?: "default" | "large";
}

export function CollectionCard({
  collection,
  priority = false,
  size = "default",
}: CollectionCardProps) {
  return (
    <motion.article className="group">
      <Link href={`/collections/${collection.slug}`} className="block">
        <div
          className={`relative overflow-hidden bg-background-secondary ${
            size === "large" ? "aspect-[16/10]" : "aspect-[4/5]"
          }`}
        >
          <ContentImage
            src={collection.image}
            alt={collection.imageAlt}
            priority={priority}
            className="transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <p className="text-[10px] tracking-luxury uppercase text-accent mb-2">
              {collection.productCount} Pieces
            </p>
            <h3 className="font-display text-2xl md:text-3xl text-foreground">
              {collection.name}
            </h3>
            <p className="mt-2 text-sm text-foreground-muted line-clamp-2 max-w-md">
              {collection.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
