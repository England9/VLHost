import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbItem } from "@/types";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="container-luxury py-6 pt-24 md:pt-28">
      <ol className="flex flex-wrap items-center justify-center gap-2 text-[11px] tracking-luxury uppercase text-foreground-muted">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-3 w-3" />}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-accent transition-colors duration-500"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
