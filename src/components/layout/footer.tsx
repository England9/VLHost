import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Newsletter } from "@/components/sections/newsletter";
import { SITE_CONFIG } from "@/lib/constants";

const footerLinks = {
  explore: [
    { label: "Shop", href: "/shop" },
    { label: "Collections", href: "/collections" },
    { label: "Journal", href: "/journal" },
    { label: "About", href: "/about" },
  ],
  categories: [
    { label: "Fashion", href: "/collections/fashion" },
    { label: "Cosmetics", href: "/collections/cosmetics" },
    { label: "Lifestyle", href: "/collections/lifestyle" },
  ],
  service: [
    { label: "Contact", href: "/contact" },
    { label: "Shipping", href: "/contact#faq" },
    { label: "Returns", href: "/contact#faq" },
    { label: "Care Guide", href: "/about" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-border">
      <div className="container-luxury section-padding">
        <Newsletter variant="footer" />
      </div>

      <Separator />

      <div className="container-luxury py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-display text-2xl tracking-[0.15em] text-foreground"
            >
              {SITE_CONFIG.name}
            </Link>
            <p className="mt-4 text-sm text-foreground-muted leading-relaxed max-w-xs">
              {SITE_CONFIG.description}
            </p>
          </div>

          <div>
            <h3 className="text-[11px] tracking-luxury uppercase text-foreground-muted mb-6">
              Explore
            </h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-accent transition-colors duration-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] tracking-luxury uppercase text-foreground-muted mb-6">
              Categories
            </h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-accent transition-colors duration-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] tracking-luxury uppercase text-foreground-muted mb-6">
              Service
            </h3>
            <ul className="space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-accent transition-colors duration-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <address className="not-italic text-sm text-foreground-muted leading-relaxed">
            {SITE_CONFIG.address.street}
            <br />
            {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}{" "}
            {SITE_CONFIG.address.zip}
            <br />
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="hover:text-accent transition-colors"
            >
              {SITE_CONFIG.email}
            </a>
          </address>

          <div className="flex gap-6">
            {Object.entries(SITE_CONFIG.social).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-luxury uppercase text-foreground-muted hover:text-accent transition-colors duration-500"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[11px] text-foreground-muted tracking-wide">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
