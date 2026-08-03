"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeInUp } from "@/lib/animations";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  imageAlt: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  fullScreen?: boolean;
}

export function Hero({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  cta,
  secondaryCta,
  fullScreen = true,
}: HeroProps) {
  return (
    <section
      className={`relative flex items-end overflow-hidden ${
        fullScreen ? "min-h-screen" : "min-h-[70vh]"
      }`}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
      </div>

      <div className="relative container-luxury pb-20 md:pb-32 pt-32 w-full">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="max-w-2xl"
        >
          {subtitle && (
            <p className="text-[11px] tracking-luxury uppercase text-accent mb-4">
              {subtitle}
            </p>
          )}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.95] text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-base md:text-lg text-foreground/70 leading-relaxed max-w-lg">
              {description}
            </p>
          )}
          {(cta || secondaryCta) && (
            <div className="mt-10 flex flex-wrap gap-4">
              {cta && (
                <Button asChild>
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              )}
              {secondaryCta && (
                <Button variant="outline" asChild>
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
