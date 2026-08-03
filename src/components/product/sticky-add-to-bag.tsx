"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface StickyAddToBagProps {
  product: Product;
}

export function StickyAddToBag({ product }: StickyAddToBagProps) {
  const [added, setAdded] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md md:hidden">
      <div className="container-luxury flex items-center justify-between py-4 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-12 h-14 shrink-0 overflow-hidden bg-background-secondary">
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm truncate">{product.name}</p>
            <p className="text-xs text-foreground-muted">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>
        <Button
          size="sm"
          onClick={() => setAdded(true)}
          disabled={added}
        >
          {added ? "Added" : "Add to Bag"}
        </Button>
      </div>
    </div>
  );
}
