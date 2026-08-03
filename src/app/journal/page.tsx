import type { Metadata } from "next";
import Link from "next/link";
import { JournalCard } from "@/components/cards/journal-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { createMetadata } from "@/lib/seo";
import { journalArticles } from "@/data";

export const metadata: Metadata = createMetadata({
  title: "Journal",
  description:
    "Stories of craft, philosophy, and the VULCIRA world. Editorial content from the house of quiet luxury.",
  path: "/journal",
});

export default function JournalPage() {
  const featured = journalArticles[0];
  const rest = journalArticles.slice(1);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Journal" },
        ]}
      />

      <section className="container-luxury pb-6">
        <p className="text-[11px] tracking-luxury uppercase text-accent mb-4">
          Editorial
        </p>
        <h1 className="font-display text-4xl md:text-6xl text-foreground">
          Journal
        </h1>
        <p className="mt-4 text-foreground-muted max-w-2xl leading-relaxed">
          Stories of craft, philosophy, and the world of VULCIRA — written with
          the same intention we bring to everything we create.
        </p>
      </section>

      <section className="container-luxury pb-12">
        <Link href={`/journal/${featured.slug}`} className="group block">
          <JournalCard article={featured} priority />
        </Link>
      </section>

      <section className="container-luxury section-padding pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {rest.map((article) => (
            <JournalCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </>
  );
}
