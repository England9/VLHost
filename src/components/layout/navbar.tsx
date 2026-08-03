"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { SearchOverlay } from "./search-overlay";
import { CartDrawer } from "./cart-drawer";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled || !isHome
            ? "bg-background/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <nav
          className="container-luxury flex h-16 items-center justify-between md:h-20"
          aria-label="Main navigation"
        >
          <button
            className="md:hidden text-foreground hover:text-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[11px] tracking-luxury uppercase transition-colors duration-500",
                  pathname === item.href
                    ? "text-accent"
                    : "text-foreground/70 hover:text-accent"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/"
            className="font-display text-2xl md:text-3xl tracking-[0.15em] text-foreground hover:text-accent transition-colors duration-500"
          >
            {SITE_CONFIG.name}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.slice(3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[11px] tracking-luxury uppercase transition-colors duration-500",
                  pathname === item.href
                    ? "text-accent"
                    : "text-foreground/70 hover:text-accent"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-foreground/70 hover:text-accent transition-colors duration-500"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="text-foreground/70 hover:text-accent transition-colors duration-500"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <div className="container-luxury py-8 flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm tracking-luxury uppercase transition-colors",
                    pathname === item.href ? "text-accent" : "text-foreground/70"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
