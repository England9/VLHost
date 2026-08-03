"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data";
import { fadeInUp } from "@/lib/animations";

export function Testimonials() {
  return (
    <section className="section-padding bg-background-secondary">
      <div className="container-luxury">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[11px] tracking-luxury uppercase text-accent mb-4">
            Voices
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            What They Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.blockquote
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-center md:text-left"
            >
              <div className="w-8 h-px bg-accent mx-auto md:mx-0 mb-6" />
              <p className="font-display text-lg md:text-xl text-foreground leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="mt-6">
                <cite className="not-italic">
                  <p className="text-sm text-foreground">{testimonial.author}</p>
                  <p className="text-xs text-foreground-muted mt-1">
                    {testimonial.title}
                  </p>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
