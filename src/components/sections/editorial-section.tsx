"use client";

import { ContentImage } from "@/components/ui/content-image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeInUp } from "@/lib/animations";

interface EditorialSectionProps {
  title: string;
  subtitle?: string;
  content: string;
  image: string;
  imageAlt: string;
  cta?: { label: string; href: string };
  reversed?: boolean;
}

export function EditorialSection({
  title,
  subtitle,
  content,
  image,
  imageAlt,
  cta,
  reversed = false,
}: EditorialSectionProps) {
  return (
    <section className="section-padding">
      <div className="container-luxury">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            reversed ? "lg:[direction:rtl]" : ""
          }`}
        >
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="lg:[direction:ltr]"
          >
            {subtitle && (
              <p className="text-[11px] tracking-luxury uppercase text-accent mb-4">
                {subtitle}
              </p>
            )}
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight text-balance">
              {title}
            </h2>
            <p className="mt-6 text-foreground-muted leading-relaxed text-base md:text-lg">
              {content}
            </p>
            {cta && (
              <Button variant="link" asChild className="mt-8">
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] overflow-hidden bg-background-secondary lg:[direction:ltr]"
          >
            <ContentImage src={image} alt={imageAlt} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
