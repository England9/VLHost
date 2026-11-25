"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Instagram } from "lucide-react";
import { HeroLightingScene } from "@/components/lighting/hero-lighting-scene";
import { WaitlistLightingScene } from "@/components/lighting/waitlist-lighting-scene";
import { useFoliageWind } from "@/hooks/use-foliage-wind";
import { SITE_CONFIG, EASING } from "@/lib/constants";

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

const linkClass =
  "relative z-10 inline-flex min-h-11 min-w-11 items-center justify-center text-[10px] tracking-[0.28em] text-white transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export function WaitlistLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [windActive, setWindActive] = useState(Boolean(prefersReducedMotion));

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setTimeout(() => setWindActive(true), 1000);
    return () => window.clearTimeout(id);
  }, [prefersReducedMotion]);

  const windRootRef = useFoliageWind(!prefersReducedMotion, windActive);

  const reveal = (delay: number, duration = 0.85) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay, duration, ease: EASING },
        };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;
    try {
      const list = JSON.parse(
        localStorage.getItem("vulcira-waitlist") ?? "[]"
      ) as string[];
      if (!list.includes(value)) {
        localStorage.setItem(
          "vulcira-waitlist",
          JSON.stringify([...list, value])
        );
      }
    } catch {
      /* ignore */
    }
    setSubmitted(true);
  };

  return (
    <div
      ref={windRootRef}
      data-foliage-wind
      className="landing-root relative flex min-h-[100dvh] flex-col bg-[#ded8d1] text-[#1a1a1a]"
    >
      <section className="relative flex min-h-[58vh] flex-1 flex-col border-b border-[#1a1a1a]/8 overflow-hidden md:min-h-[62vh]">
        <HeroLightingScene />

        {/* 0.3s — wordmark */}
        <motion.header
          className="relative z-20 px-6 pt-6 md:px-10 md:pt-8 lg:px-14"
          {...reveal(0.3, 0.65)}
        >
          <Link
            href="/"
            className="font-landing inline-block py-2 text-sm tracking-[0.55em] text-white md:text-base"
          >
            V U L C I R A
          </Link>
        </motion.header>

        {/* 1.6s — nav + social */}
        <motion.nav
          className="absolute right-4 top-4 z-30 flex items-center gap-2 md:right-10 md:top-8 lg:right-14"
          aria-label="Social links"
          {...reveal(1.6, 0.65)}
        >
          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} px-2`}
            aria-label="VULCIRA on Instagram"
          >
            <Instagram className="h-4 w-4 stroke-[1.5]" />
          </a>
          <a
            href={SITE_CONFIG.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} px-2`}
            aria-label="VULCIRA on TikTok"
          >
            <TikTokIcon className="h-4 w-4" />
          </a>
        </motion.nav>

        {/* 1.3s — headline */}
        <motion.div
          className="relative z-20 mt-auto px-6 pb-10 md:px-10 md:pb-14 lg:px-14"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: prefersReducedMotion ? 0 : 1.3,
            duration: 0.9,
            ease: EASING,
          }}
        >
          <div className="max-w-md">
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
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 min-h-[38vh] overflow-hidden px-6 py-12 md:px-10 md:py-16 lg:px-14">
        <WaitlistLightingScene />

        {/* 1.6s — waitlist */}
        <motion.div
          className="relative z-20 mx-auto flex max-w-xl flex-col items-center text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: prefersReducedMotion ? 0 : 1.6,
            duration: 0.85,
            ease: EASING,
          }}
        >
          <div className="mb-8 flex flex-col items-center gap-4">
            <span className="h-px w-10 bg-[#1a1a1a]/80" aria-hidden />
            <p className="text-[10px] tracking-[0.35em] text-[#1a1a1a]/90">
              BE THE FIRST TO KNOW
            </p>
          </div>

          {submitted ? (
            <p
              className="font-landing text-sm tracking-[0.2em] text-[#1a1a1a]"
              role="status"
            >
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
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="ENTER YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 min-h-12 flex-1 border border-[#1a1a1a] bg-[#e8e4df] px-4 text-center text-[10px] tracking-[0.22em] text-[#1a1a1a] placeholder:text-[#1a1a1a]/45 outline-none transition-colors focus:bg-[#f0ece8] sm:text-left"
              />
              <button
                type="submit"
                className="h-12 min-h-12 min-w-[9.5rem] shrink-0 cursor-pointer bg-[#1a1a1a] px-6 text-[10px] tracking-[0.28em] text-white transition-opacity hover:opacity-90 active:opacity-80"
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