"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { products } from "@/data";
import { formatPrice } from "@/lib/utils";

interface SearchOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchOverlay({ open, onOpenChange }: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  const results = query.length > 1
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-0 left-0 right-0 translate-x-0 translate-y-0 max-w-full w-full border-0 border-b border-border bg-background/95 backdrop-blur-md p-0 sm:rounded-none">
        <DialogTitle className="sr-only">Search</DialogTitle>
        <div className="container-luxury py-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground-muted" />
            <Input
              placeholder="Search products, collections..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-8 text-lg border-0 border-b-2 border-border focus:border-accent h-14"
              autoFocus
            />
          </div>

          {results.length > 0 && (
            <div className="max-w-2xl mx-auto mt-8 space-y-4">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-4 p-3 hover:bg-background-secondary transition-colors group"
                >
                  <div className="relative w-16 h-20 overflow-hidden bg-background-secondary">
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <p className="text-sm group-hover:text-accent transition-colors">
                      {product.name}
                    </p>
                    <p className="text-xs text-foreground-muted mt-1">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {query.length > 1 && results.length === 0 && (
            <p className="text-center text-foreground-muted mt-8 text-sm">
              No results found for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
