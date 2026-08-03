import { Hero } from "@/components/sections/hero";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { BrandPhilosophy } from "@/components/home/brand-philosophy";
import { BestSellers } from "@/components/home/best-sellers";
import { EditorialSection } from "@/components/sections/editorial-section";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/sections/newsletter";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: undefined,
  description:
    "VULCIRA — A luxury house of fashion, cosmetics, and lifestyle. Where quiet confidence meets architectural refinement.",
  path: "/",
});

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    alt: "Editorial fashion — model in structured tailoring",
  },
  {
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    alt: "Luxury watch and accessories flat lay",
  },
  {
    src: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80",
    alt: "Skincare ritual — minimalist beauty arrangement",
  },
  {
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    alt: "Interior detail — cashmere and ceramic objects",
  },
  {
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80",
    alt: "Fashion portrait — editorial styling",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        title="Quiet Confidence"
        subtitle="Spring / Summer 2026"
        description="A new chapter in understated luxury. Discover collections conceived with architectural precision and crafted for permanence."
        image="https://images.unsplash.com/photo-1483985988355-763728f19325?w=1920&q=80"
        imageAlt="VULCIRA Spring Summer 2026 — editorial fashion hero"
        cta={{ label: "Explore Collection", href: "/collections" }}
        secondaryCta={{ label: "Shop Now", href: "/shop" }}
      />
      <FeaturedCollections />
      <BrandPhilosophy />
      <BestSellers />
      <EditorialSection
        title="The Architecture of Style"
        subtitle="Editorial"
        content="Every VULCIRA piece begins as a study in proportion. Our design studio in Milan approaches fashion as architecture — considering structure, negative space, and the relationship between garment and body. The result is clothing that feels inevitable, as though it has always existed."
        image="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&q=80"
        imageAlt="VULCIRA design studio — architectural fashion process"
        cta={{ label: "Read the Story", href: "/journal/the-art-of-quiet-luxury" }}
      />
      <Gallery
        title="A Life in VULCIRA"
        subtitle="Lifestyle"
        images={galleryImages}
      />
      <Testimonials />
      <Newsletter />
    </>
  );
}
