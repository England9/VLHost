"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Instagram } from "lucide-react";
import { TreeShadowOverlay } from "@/components/home/tree-shadow-overlay";
import { SITE_CONFIG } from "@/lib/constants";
import { EASING } from "@/lib/constants";

const HERO_IMAGE = "/images/vulcira-hero.jpg";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export function WaitlistLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const fade = (delay: number, duration = 0.85) =>
    prefersReducedMotion
      ? { initial: false as const, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay, duration, ease: EASING },
        };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="landing-root relative flex min-h-screen flex-col bg-[#ded8d1] text-[#1a1a1a]">
      {/* 0.0s — warm neutral base */}
      <section className="relative flex min-h-[58vh] flex-1 flex-col overflow-hidden md:min-h-[62vh]">
        {/* 0.7s — hero photograph */}
        <motion.div
          className="absolute inset-0 z-0"
          {...fade(0.7, 1.1)}
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-[center_20%] bg-no-repeat"
            style={{ backgroundImage: `url("${HERO_IMAGE}")` }}
            initial={prefersReducedMotion ? false : { scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, duration: 1.4, ease: EASING }}
            role="img"
            aria-label="Editorial portrait — model against a concrete wall"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#ded8d1]/30" />
        </motion.div>

        {/* 1.0s — moving tree shadows */}
        <TreeShadowOverlay visible className="z-[1]" />

        {/* 0.3s — wordmark */}
        <header className="relative z-20 px-6 pt-6 md:px-10 md:pt-8 lg:px-14">
          <motion.div {...fade(0.3)}>
            <Link
              href="/"
              className="font-landing text-sm tracking-[0.55em] text-white md:text-base"
              aria-label="VULCIRA home"
            >
              V U L C I R A
            </Link>
          </motion.div>
        </header>

        {/* 1.3s — headline */}
        <div className="relative z-20 mt-auto px-6 pb-10 md:px-10 md:pb-14 lg:px-14">
          <motion.div
            className="max-w-md"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.9, ease: EASING }}
          >
            <h1 className="font-landing text-2xl font-normal leading-snug tracking-[0.06em] text-white md:text-3xl lg:text-[2rem]">
              Global fashion,
              <br />
              made accessible.
            </h1>
            <div className="mt-6 flex items-center gap-4">
              <span className="h-px w-10 bg-white/90" aria-hidden />
              <p className="text-[10px] tracking-[0.35em] text-white/95">
                COMING SOON
              </p>
            </div>
          </motion.div>
        </div>

        {/* 1.6s — navigation */}
        <motion.nav
          className="absolute right-6 top-6 z-20 flex items-center gap-5 md:right-10 md:top-8 lg:right-14"
          aria-label="Landing navigation"
          {...fade(1.6, 0.7)}
        >
          <Link
            href="/about"
            className="text-[10px] tracking-[0.28em] text-white transition-opacity hover:opacity-70"
          >
            ABOUT
          </Link>
          <Link
            href="/journal"
            className="text-[10px] tracking-[0.28em] text-white transition-opacity hover:opacity-70"
          >
            JOURNAL
          </Link>
          <span
            className="mx-1 h-4 w-px bg-white/50"
            aria-hidden
          />
          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-opacity hover:opacity-70"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4 stroke-[1.5]" />
          </a>
          <a
            href="https://tiktok.com/@vulcira"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-opacity hover:opacity-70"
            aria-label="TikTok"
          >
            <TikTokIcon className="h-4 w-4" />
          </a>
        </motion.nav>
      </section>

      {/* Waitlist — shadows continue */}
      <section className="relative overflow-hidden border-t border-black/5 bg-[#ded8d1] px-6 py-12 md:px-10 md:py-16 lg:px-14">
        <TreeShadowOverlay
          visible
          className="z-0 opacity-60 mix-blend-multiply"
        />

        <motion.div
          className="relative z-10 mx-auto flex max-w-xl flex-col items-center text-center"
          {...fade(1.6, 0.85)}
        >
          <motion.div
            className="mb-8 flex flex-col items-center gap-4"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8, ease: EASING }}
          >
            <span className="h-px w-10 bg-[#1a1a1a]/80" aria-hidden />
            <p className="text-[10px] tracking-[0.35em] text-[#1a1a1a]/90">
              BE THE FIRST TO KNOW
            </p>
          </motion.div>

          {submitted ? (
            <p className="font-landing text-sm tracking-[0.2em] text-[#1a1a1a]">
              Thank you — you&apos;re on the list.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md flex-col gap-0 sm:flex-row"
            >
              <label className="sr-only" htmlFor="waitlist-email">
                Email address
              </label>
              <input
                id="waitlist-email"
                type="email"
                required
                autoComplete="email"
                placeholder="ENTER YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 flex-1 border border-[#1a1a1a] bg-[#e8e4df] px-4 text-center text-[10px] tracking-[0.22em] text-[#1a1a1a] placeholder:text-[#1a1a1a]/45 outline-none transition-colors focus:bg-[#f0ece8] sm:text-left"
              />
              <button
                type="submit"
                className="h-12 shrink-0 bg-[#1a1a1a] px-6 text-[10px] tracking-[0.28em] text-white transition-opacity hover:opacity-90"
              >
                JOIN WAITLIST
              </button>
            </form>
          )}
        </motion.div>
      </section>
    </div>
  );
}