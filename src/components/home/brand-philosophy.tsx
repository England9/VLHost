"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export function BrandPhilosophy() {
  return (
    <section className="section-padding">
      <div className="container-luxury">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-[11px] tracking-luxury uppercase text-accent mb-6">
            Our Philosophy
          </p>
          <blockquote className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] text-balance">
            &ldquo;Luxury is not about having more. It is about choosing more
            carefully.&rdquo;
          </blockquote>
          <p className="mt-8 text-foreground-muted leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
            At VULCIRA, we believe in the enduring power of restraint. Every
            garment, every formulation, every object in our world is conceived
            with permanence in mind — designed to become part of your life, not
            part of a season.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
