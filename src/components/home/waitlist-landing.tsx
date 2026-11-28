"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HeroLightingScene } from "@/components/lighting/hero-lighting-scene";
import { WaitlistLightingScene } from "@/components/lighting/waitlist-lighting-scene";
import { useFoliageWind } from "@/hooks/use-foliage-wind";
import { useLightingControls } from "@/hooks/use-lighting-controls";
import { LightingControlPanel } from "@/components/lighting/lighting-control-panel";
import { VulciraLogoEntrance } from "@/components/brand/vulcira-logo-entrance";
import { SiteNav } from "@/components/brand/site-nav";
import { ENTRANCE_TOTAL_S } from "@/lib/intro-timing";
import { DEV_SHADOW_MENU_UNLOCK } from "@/lib/lighting-controls";
import { EASING } from "@/lib/constants";

const DEV_PANEL_UNLOCK = DEV_SHADOW_MENU_UNLOCK;

export function WaitlistLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { controls, update, reset } = useLightingControls();
  const [uiVisible, setUiVisible] = useState(false);
  const [windActive, setWindActive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setUiVisible(true);
      setWindActive(true);
      return;
    }
    const windAt = window.setTimeout(
      () => setWindActive(true),
      (ENTRANCE_TOTAL_S + 0.2) * 1000
    );
    return () => window.clearTimeout(windAt);
  }, [prefersReducedMotion]);

  const windRootRef = useFoliageWind(
    !prefersReducedMotion && controls.motionEnabled,
    windActive,
    controls
  );

  const showLightingPanel = email.trim() === DEV_PANEL_UNLOCK;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || value === DEV_PANEL_UNLOCK) return;
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
    <>
      <VulciraLogoEntrance onHandoff={() => setUiVisible(true)} />
      <div
        ref={windRootRef}
        data-foliage-wind
        data-invert-mask={controls.invertMask ? "1" : "0"}
        data-dev-mode={controls.devMode ? "1" : "0"}
        data-intro-gate
        className="landing-root relative flex min-h-[100dvh] flex-col bg-[#ded8d1] text-[#1a1a1a]"
      >
        <section className="landing-section-lit relative flex min-h-[58vh] flex-1 flex-col border-b border-[#1a1a1a]/8 overflow-hidden bg-[#0a0a0a] md:min-h-[62vh]">
          <HeroLightingScene />

          <motion.div
            className="contents"
            initial={false}
            animate={{ opacity: uiVisible ? 1 : 0 }}
            transition={{ duration: 0.35, ease: EASING }}
          >
            <header className="relative z-20 px-6 pt-6 md:px-10 md:pt-8 lg:px-14">
              <Link
                href="/"
                className="font-landing inline-block py-2 text-sm tracking-[0.55em] text-white md:text-base"
              >
                V U L C I R A
              </Link>
            </header>

            <SiteNav tone="light" />

            <div className="relative z-20 mt-auto px-6 pb-10 md:px-10 md:pb-14 lg:px-14">
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
            </div>
          </motion.div>
        </section>

        <section className="landing-waitlist-section landing-section-lit relative z-10 min-h-[38vh] overflow-hidden px-6 py-12 md:px-10 md:py-16 lg:px-14">
          <WaitlistLightingScene />

          <div className="relative z-20 mx-auto flex max-w-xl flex-col items-center text-center">
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
          </div>
        </section>

        {showLightingPanel && (
          <LightingControlPanel
            controls={controls}
            onChange={update}
            onReset={reset}
          />
        )}
      </div>
    </>
  );
}