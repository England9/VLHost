"use client";

import { ContentImage } from "@/components/ui/content-image";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ImageGridProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

export function ImageGrid({ images, columns = 3 }: ImageGridProps) {
  const colClass = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  }[columns];

  return (
    <motion.div
      className={`grid ${colClass} gap-2 md:gap-4`}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          variants={staggerItem}
          className={`relative overflow-hidden bg-background-secondary ${
            index === 0 && columns === 3 ? "md:row-span-2 md:aspect-auto aspect-[3/4]" : "aspect-[3/4]"
          }`}
        >
          <ContentImage
            src={image.src}
            alt={image.alt}
            className="hover:scale-105 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

interface GalleryProps {
  title?: string;
  subtitle?: string;
  images: GalleryImage[];
}

export function Gallery({ title, subtitle, images }: GalleryProps) {
  return (
    <section className="section-padding">
      <div className="container-luxury">
        {(title || subtitle) && (
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            {subtitle && (
              <p className="text-[11px] tracking-luxury uppercase text-accent mb-4">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="font-display text-3xl md:text-5xl text-foreground text-balance">
                {title}
              </h2>
            )}
          </div>
        )}
        <ImageGrid images={images} />
      </div>
    </section>
  );
}
