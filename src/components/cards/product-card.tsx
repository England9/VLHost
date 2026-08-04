"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ContentImage } from "@/components/ui/content-image";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const primaryImage = product.images[0];

  if (!primaryImage) return null;

  return (
    <motion.article
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-background-secondary">
          <ContentImage
            src={primaryImage.src}
            alt={primaryImage.alt}
            priority={priority}
            className="transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={
              isHovered && product.hoverImage
                ? { opacity: 0 }
                : { opacity: 1 }
            }
          />
          {product.hoverImage && (
            <ContentImage
              src={product.hoverImage}
              alt=""
              aria-hidden
              className="transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ opacity: isHovered ? 1 : 0 }}
            />
          )}

          <div className="absolute inset-x-0 bottom-0 z-10 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Button
              variant="default"
              size="sm"
              className="w-full"
              onClick={(e) => e.preventDefault()}
            >
              Discover
            </Button>
          </div>
        </div>

        <div className="mt-4 space-y-1 text-center md:text-left">
          <p className="text-[10px] tracking-luxury uppercase text-foreground-muted">
            {product.category}
          </p>
          <h3 className="font-display text-lg text-foreground group-hover:text-accent transition-colors duration-500">
            {product.name}
          </h3>
          <p className="text-sm text-foreground-muted line-clamp-2">
            {product.description}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
