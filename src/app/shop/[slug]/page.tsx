import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProductCard } from "@/components/cards/product-card";
import { StickyAddToBag } from "@/components/product/sticky-add-to-bag";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  createMetadata,
  JsonLd,
  productJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { getProductBySlug, products } from "@/data";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return createMetadata({
    title: product.name,
    description: product.description,
    path: `/shop/${product.slug}`,
    image: product.images[0].src,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: product.name },
  ];

  return (
    <>
      <JsonLd
        data={[productJsonLd(product), breadcrumbJsonLd(breadcrumbs)]}
      />

      <Breadcrumbs items={breadcrumbs} />

      <article className="container-luxury section-padding pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start space-y-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-[3/4] overflow-hidden bg-background-secondary"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          <div className="lg:py-8">
            <p className="text-[11px] tracking-luxury uppercase text-accent mb-3">
              {product.category}
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground">
              {product.name}
            </h1>
            <p className="mt-6 text-foreground-muted leading-relaxed">
              {product.longDescription}
            </p>

            <div className="mt-8 hidden md:block">
              <Button size="lg" className="w-full max-w-sm" asChild>
                <Link href="/contact">Inquire with Concierge</Link>
              </Button>
            </div>

            <div className="mt-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="craftsmanship">
                  <AccordionTrigger>Craftsmanship</AccordionTrigger>
                  <AccordionContent>{product.craftsmanship}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="materials">
                  <AccordionTrigger>Materials</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {product.materials.map((material) => (
                        <li key={material}>{material}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="care">
                  <AccordionTrigger>Care</AccordionTrigger>
                  <AccordionContent>{product.care}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                  <AccordionTrigger>Shipping</AccordionTrigger>
                  <AccordionContent>{product.shipping}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </article>

      {relatedProducts.length > 0 && (
        <section className="section-padding bg-background-secondary">
          <div className="container-luxury">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-12">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <StickyAddToBag product={product} />
    </>
  );
}
