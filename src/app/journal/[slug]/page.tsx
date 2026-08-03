import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JournalCard } from "@/components/cards/journal-card";
import {
  createMetadata,
  JsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { journalArticles, getArticleBySlug } from "@/data";

interface JournalArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return journalArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: JournalArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return createMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/journal/${article.slug}`,
    image: article.image,
    type: "article",
  });
}

export default async function JournalArticlePage({
  params,
}: JournalArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedArticles = journalArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Journal", href: "/journal" },
    { label: article.title },
  ];

  const paragraphs = article.content.split("\n\n");

  return (
    <>
      <JsonLd
        data={[articleJsonLd(article), breadcrumbJsonLd(breadcrumbs)]}
      />

      <Breadcrumbs items={breadcrumbs} />

      <article>
        <header className="container-luxury pt-8 pb-12 max-w-4xl">
          <div className="flex items-center gap-3 text-[11px] tracking-luxury uppercase text-foreground-muted mb-6">
            <span>{article.category}</span>
            <span className="w-1 h-1 rounded-full bg-accent" />
            <span>{article.readTime}</span>
            <span className="w-1 h-1 rounded-full bg-accent" />
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-foreground leading-tight">
            {article.title}
          </h1>
          <p className="mt-4 text-foreground-muted text-lg leading-relaxed">
            {article.excerpt}
          </p>
          <p className="mt-6 text-sm text-foreground-muted">
            By {article.author}
          </p>
        </header>

        <div className="relative aspect-[21/9] overflow-hidden">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        <div className="container-luxury section-padding max-w-3xl">
          <div className="prose-luxury space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-foreground-muted leading-relaxed text-base md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className="section-padding bg-background-secondary">
          <div className="container-luxury">
            <h2 className="font-display text-3xl text-foreground mb-12">
              Continue Reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {relatedArticles.map((a) => (
                <JournalCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
