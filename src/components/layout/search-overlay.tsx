"use client";

import { useState } from "react";
import Link from "next/link";
import { ContentImage } from "@/components/ui/content-image";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { products, collections, journalArticles } from "@/data";

interface SearchOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchOverlay({ open, onOpenChange }: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  const q = query.toLowerCase();

  const productResults =
    query.length > 1
      ? products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        )
      : [];

  const collectionResults =
    query.length > 1
      ? collections.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q)
        )
      : [];

  const journalResults =
    query.length > 1
      ? journalArticles.filter(
          (a) =>
            a.title.toLowerCase().includes(q) ||
            a.excerpt.toLowerCase().includes(q)
        )
      : [];

  const hasResults =
    productResults.length > 0 ||
    collectionResults.length > 0 ||
    journalResults.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-0 left-0 right-0 translate-x-0 translate-y-0 max-w-full w-full border-0 border-b border-border bg-background/95 backdrop-blur-md p-0 sm:rounded-none">
        <DialogTitle className="sr-only">Search</DialogTitle>
        <div className="container-luxury py-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground-muted" />
            <Input
              placeholder="Search the house..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-8 text-lg border-0 border-b-2 border-border focus:border-accent h-14 text-center"
              autoFocus
            />
          </div>

          {productResults.length > 0 && (
            <div className="max-w-2xl mx-auto mt-8 space-y-4">
              <p className="text-[10px] tracking-luxury uppercase text-foreground-muted">
                Pieces
              </p>
              {productResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-4 p-3 hover:bg-background-secondary transition-colors group"
                >
                  <div className="relative w-16 h-20 overflow-hidden bg-background-secondary shrink-0">
                    <ContentImage
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                    />
                  </div>
                  <div>
                    <p className="text-sm group-hover:text-accent transition-colors">
                      {product.name}
                    </p>
                    <p className="text-xs text-foreground-muted mt-1 capitalize">
                      {product.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {collectionResults.length > 0 && (
            <div className="max-w-2xl mx-auto mt-8 space-y-4">
              <p className="text-[10px] tracking-luxury uppercase text-foreground-muted">
                Collections
              </p>
              {collectionResults.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.slug}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-4 p-3 hover:bg-background-secondary transition-colors group"
                >
                  <div className="relative w-16 h-20 overflow-hidden bg-background-secondary shrink-0">
                    <ContentImage
                      src={collection.image}
                      alt={collection.imageAlt}
                    />
                  </div>
                  <p className="text-sm group-hover:text-accent transition-colors">
                    {collection.name}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {journalResults.length > 0 && (
            <div className="max-w-2xl mx-auto mt-8 space-y-4">
              <p className="text-[10px] tracking-luxury uppercase text-foreground-muted">
                Journal
              </p>
              {journalResults.map((article) => (
                <Link
                  key={article.id}
                  href={`/journal/${article.slug}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-4 p-3 hover:bg-background-secondary transition-colors group"
                >
                  <div className="relative w-16 h-20 overflow-hidden bg-background-secondary shrink-0">
                    <ContentImage
                      src={article.image}
                      alt={article.imageAlt}
                    />
                  </div>
                  <p className="text-sm group-hover:text-accent transition-colors">
                    {article.title}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {query.length > 1 && !hasResults && (
            <p className="text-center text-foreground-muted mt-8 text-sm">
              No results found for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
