import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";
import { JournalCard } from "@/components/cards/journal-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
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
      <PageHero
        title="Journal"
        subtitle="Editorial"
        description="Stories of craft, philosophy, and the world of VULCIRA — written with the same intention we bring to everything we create."
        image="https://images.unsplash.com/photo-1483985988355-763728f19325?w=1920&q=80"
        imageAlt="VULCIRA journal — editorial fashion"
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Journal" },
        ]}
      />

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
