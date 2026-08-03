"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface NewsletterProps {
  variant?: "default" | "footer" | "inline";
  title?: string;
  description?: string;
}

export function Newsletter({
  variant = "default",
  title = "The VULCIRA Letter",
  description = "Receive curated edits, private previews, and invitations to our most intimate events.",
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (variant === "footer") {
    return (
      <div className="max-w-xl">
        <h3 className="font-display text-2xl md:text-3xl text-foreground">
          {title}
        </h3>
        <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
          {description}
        </p>
        {submitted ? (
          <p className="mt-6 text-sm text-accent">
            Thank you for subscribing. Welcome to VULCIRA.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex gap-4">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
              aria-label="Email address"
            />
            <Button type="submit" variant="outline">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    );
  }

  return (
    <section
      className={cn(
        "section-padding",
        variant === "default" && "bg-background-secondary"
      )}
    >
      <div className="container-luxury text-center max-w-2xl mx-auto">
        <p className="text-[11px] tracking-luxury uppercase text-accent mb-4">
          Newsletter
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-foreground text-balance">
          {title}
        </h2>
        <p className="mt-4 text-foreground-muted leading-relaxed">
          {description}
        </p>
        {submitted ? (
          <p className="mt-8 text-sm text-accent">
            Thank you for subscribing. Welcome to VULCIRA.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 text-center sm:text-left"
              aria-label="Email address"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        )}
      </div>
    </section>
  );
}
