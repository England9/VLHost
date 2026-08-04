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

  const navLinkClass = (href: string) =>
    cn(
      "text-[11px] tracking-luxury uppercase transition-colors duration-500",
      pathname === href
        ? "text-accent"
        : "text-foreground/70 hover:text-accent"
    );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 overflow-visible transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled || !isHome
            ? "bg-background/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <nav className="container-luxury" aria-label="Main navigation">
          {/* Mobile */}
          <div className="flex md:hidden h-16 items-center justify-between gap-3">
            <button
              className="shrink-0 text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            <Link
              href="/"
              className="font-display text-2xl tracking-[0.15em] text-foreground hover:text-accent transition-colors duration-500"
            >
              {SITE_CONFIG.name}
            </Link>

            <div className="flex shrink-0 items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1 text-foreground/70 hover:text-accent transition-colors"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="p-1 text-foreground/70 hover:text-accent transition-colors"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Desktop — symmetric grid keeps logo centered and icons fully visible */}
          <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-4 lg:gap-8 py-5 lg:py-6">
            <div aria-hidden="true" />

            <div className="flex flex-col items-center min-w-0">
              <Link
                href="/"
                className="font-display text-3xl lg:text-4xl tracking-[0.2em] text-foreground hover:text-accent transition-colors duration-500"
              >
                {SITE_CONFIG.name}
              </Link>

              <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 lg:gap-x-10 gap-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={navLinkClass(item.href)}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-4 lg:gap-5 shrink-0 pt-1 pr-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1.5 text-foreground/70 hover:text-accent transition-colors duration-500"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="p-1.5 text-foreground/70 hover:text-accent transition-colors duration-500"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="h-4 w-4" />
              </button>
            </div>
          </div>
        </nav>

        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <div className="container-luxury py-8 flex flex-col items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm tracking-luxury uppercase transition-colors",
                    pathname === item.href
                      ? "text-accent"
                      : "text-foreground/70"
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
