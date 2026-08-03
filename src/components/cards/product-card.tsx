"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-background-secondary">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            className="object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ opacity: isHovered && product.hoverImage ? 0 : 1 }}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            priority={priority}
          />
          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt={`${product.name} — alternate view`}
              fill
              className="object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ opacity: isHovered ? 1 : 0 }}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          )}

          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Button
              variant="default"
              size="sm"
              className="w-full"
              onClick={(e) => e.preventDefault()}
            >
              Quick Add
            </Button>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-[10px] tracking-luxury uppercase text-foreground-muted">
            {product.category}
          </p>
          <h3 className="font-display text-lg text-foreground group-hover:text-accent transition-colors duration-500">
            {product.name}
          </h3>
          <p className="text-sm text-foreground-muted">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
