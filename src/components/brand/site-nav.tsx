"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const pages = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
] as const;

const iconClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center text-white transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export function SiteNav({ tone = "light" }: { tone?: "light" | "dark" }) {
  const pathname = usePathname();
  const text =
    tone === "light"
      ? "text-white"
      : "text-[#1a1a1a]";
  const outline =
    tone === "light"
      ? "focus-visible:outline-white"
      : "focus-visible:outline-[#1a1a1a]";

  return (
    <nav
      className="absolute right-4 top-4 z-30 flex items-center gap-1 md:right-10 md:top-8 md:gap-2 lg:right-14"
      aria-label="Primary"
    >
      {pages.map(({ href, label }) => {
        const active =
          href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={`relative z-10 hidden min-h-11 items-center px-2 text-[10px] tracking-[0.28em] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 sm:inline-flex ${text} ${outline} ${
              active ? "underline underline-offset-8 decoration-1" : ""
            }`}
          >
            {label}
          </Link>
        );
      })}
      <a
        href={SITE_CONFIG.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={`${iconClass} ${text} ${outline} px-2`}
        aria-label="VULCIRA on Instagram"
      >
        <Instagram className="h-4 w-4 stroke-[1.5]" />
      </a>
      <a
        href={SITE_CONFIG.social.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className={`${iconClass} ${text} ${outline} px-2`}
        aria-label="VULCIRA on TikTok"
      >
        <TikTokIcon className="h-4 w-4" />
      </a>
    </nav>
  );
}
