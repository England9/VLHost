"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const categories = [
  { label: "All", value: "all" },
  { label: "Fashion", value: "fashion" },
  { label: "Cosmetics", value: "cosmetics" },
  { label: "Lifestyle", value: "lifestyle" },
];

interface FilterDrawerProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function FilterDrawer({
  activeCategory,
  onCategoryChange,
}: FilterDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="md:hidden"
      >
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        Filter
      </Button>

      <div className="hidden md:flex items-center gap-6">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={cn(
              "text-[11px] tracking-luxury uppercase transition-colors duration-500",
              activeCategory === cat.value
                ? "text-accent"
                : "text-foreground-muted hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-auto bottom-0 left-0 right-0 translate-x-0 translate-y-0 max-w-full w-full border-t border-border bg-background-secondary sm:rounded-none">
          <DialogHeader>
            <DialogTitle>Filter</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  onCategoryChange(cat.value);
                  setOpen(false);
                }}
                className={cn(
                  "text-left text-sm tracking-wide py-2 transition-colors",
                  activeCategory === cat.value
                    ? "text-accent"
                    : "text-foreground-muted"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export { categories };
