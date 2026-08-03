"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { JournalArticle } from "@/types";

interface JournalCardProps {
  article: JournalArticle;
  priority?: boolean;
}

export function JournalCard({ article, priority = false }: JournalCardProps) {
  return (
    <motion.article className="group">
      <Link href={`/journal/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-background-secondary">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
          />
        </div>
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-[10px] tracking-luxury uppercase text-foreground-muted">
            <span>{article.category}</span>
            <span className="w-1 h-1 rounded-full bg-accent" />
            <span>{article.readTime}</span>
          </div>
          <h3 className="font-display text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors duration-500">
            {article.title}
          </h3>
          <p className="text-sm text-foreground-muted line-clamp-2">
            {article.excerpt}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
