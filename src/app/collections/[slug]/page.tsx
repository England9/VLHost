import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProductCard } from "@/components/cards/product-card";
import {
  createMetadata,
  JsonLd,
  collectionJsonLd,
  breadcrumbJsonLd,
  itemListJsonLd,
} from "@/lib/seo";
import {
  collections,
  getCollectionBySlug,
  getProductsByCollection,
} from "@/data";
import { SITE_CONFIG } from "@/lib/constants";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

const categoryCollections: Record<string, { name: string; description: string }> = {
  fashion: {
    name: "Fashion",
    description:
      "Architectural tailoring and fluid silhouettes — garments conceived for permanence and quiet confidence.",
  },
  cosmetics: {
    name: "Cosmetics",
    description:
      "Formulations developed with rare ingredients and olfactory compositions of singular beauty.",
  },
  lifestyle: {
    name: "Lifestyle",
    description:
      "Objects of permanence for the considered home — ceramics, textiles, and sculptural vessels.",
  },
};

export async function generateStaticParams() {
  const collectionSlugs = collections.map((c) => ({ slug: c.slug }));
  const categorySlugs = Object.keys(categoryCollections).map((slug) => ({
    slug,
  }));
  return [...collectionSlugs, ...categorySlugs];
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  const category = categoryCollections[slug];

  if (collection) {
    return createMetadata({
      title: collection.name,
      description: collection.description,
      path: `/collections/${collection.slug}`,
      image: collection.image,
    });
  }

  if (category) {
    return createMetadata({
      title: category.name,
      description: category.description,
      path: `/collections/${slug}`,
    });
  }

  return {};
}

export default async function CollectionDetailPage({
  params,
}: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  const category = categoryCollections[slug];

  if (!collection && !category) notFound();

  if (category) {
    const categoryProducts = (
      await import("@/data")
    ).getProductsByCategory(slug);

    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Collections", href: "/collections" },
      { label: category.name },
    ];

    return (
      <>
        <Breadcrumbs items={breadcrumbs} />
        <section className="container-luxury pb-6">
          <p className="text-[11px] tracking-luxury uppercase text-accent mb-4">
            Category
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-foreground">
            {category.name}
          </h1>
          <p className="mt-4 text-foreground-muted max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </section>
        <section className="container-luxury section-padding pt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categoryProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>
        </section>
      </>
    );
  }

  const collectionProducts = getProductsByCollection(slug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/collections" },
    { label: collection!.name },
  ];

  return (
    <>
      <JsonLd
        data={[
          collectionJsonLd(collection!),
          breadcrumbJsonLd(breadcrumbs),
          itemListJsonLd(
            collectionProducts.map((p) => ({
              name: p.name,
              url: `${SITE_CONFIG.url}/shop/${p.slug}`,
              image: p.images[0].src,
            })),
            collection!.name
          ),
        ]}
      />

      <Breadcrumbs items={breadcrumbs} />

      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={collection!.image}
            alt={collection!.imageAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        <div className="relative container-luxury pb-16 pt-32">
          <p className="text-[11px] tracking-luxury uppercase text-accent mb-4">
            Collection
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-foreground">
            {collection!.name}
          </h1>
          <p className="mt-4 text-foreground-muted max-w-2xl leading-relaxed text-lg">
            {collection!.longDescription}
          </p>
        </div>
      </section>

      <section className="container-luxury section-padding">
        <p className="text-[11px] tracking-luxury uppercase text-foreground-muted mb-8">
          {collectionProducts.length}{" "}
          {collectionProducts.length === 1 ? "Piece" : "Pieces"}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {collectionProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 4}
            />
          ))}
        </div>
      </section>
    </>
  );
}
