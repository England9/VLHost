"use client";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-0 right-0 left-auto translate-x-0 translate-y-0 h-full max-w-md w-full border-l border-border bg-background-secondary p-0 sm:rounded-none">
        <div className="flex flex-col h-full p-6">
          <DialogHeader>
            <DialogTitle>Your Selection</DialogTitle>
          </DialogHeader>

          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <p className="text-foreground-muted text-sm">
              Your selection is currently empty.
            </p>
            <p className="text-foreground-muted/60 text-xs mt-2 max-w-xs">
              Explore our curated world of fashion, cosmetics, and lifestyle
              objects.
            </p>
          </div>

          <Separator />

          <div className="pt-6 space-y-4">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/shop" onClick={() => onOpenChange(false)}>
                Continue Exploring
              </Link>
            </Button>
            <Button className="w-full" asChild>
              <Link href="/contact" onClick={() => onOpenChange(false)}>
                Contact Concierge
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
