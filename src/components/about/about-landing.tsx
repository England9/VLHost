"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { AboutLightingScene } from "@/components/lighting/about-lighting-scene";
import { useFoliageWind } from "@/hooks/use-foliage-wind";
import { useLightingControls } from "@/hooks/use-lighting-controls";
import { SiteNav } from "@/components/brand/site-nav";
import { SkipIntro } from "@/components/brand/skip-intro";

const PILLARS = [
  {
    label: "SOURCING",
    body: "Direct relationships with Japanese factories and wholesalers.",
  },
  {
    label: "DISTRIBUTION",
    body: "Bridging Japanese product with international markets, starting in the United States.",
  },
  {
    label: "FOCUS",
    body: "Quality, affordability and long-term partnerships.",
  },
] as const;

export function AboutLanding() {
  const prefersReducedMotion = useReducedMotion();
  const { controls } = useLightingControls();
  const [windActive, setWindActive] = useState(false);

  useEffect(() => {
    setWindActive(true);
  }, []);

  const windRootRef = useFoliageWind(
    !prefersReducedMotion && controls.motionEnabled,
    windActive,
    controls
  );

  return (
    <>
      <SkipIntro />
      <div
        ref={windRootRef}
        data-foliage-wind
        data-invert-mask={controls.invertMask ? "1" : "0"}
        data-dev-mode={controls.devMode ? "1" : "0"}
        data-mask-flip="1"
        className="about-root relative flex min-h-[100dvh] flex-col bg-[#ded8d1] text-[#1a1a1a]"
        style={
          {
            "--foliage-texture":
              "url(/lighting/vulcira_layers/foliage-shadow-flip.webp)",
            "--sun-reveal-mask":
              "url(/lighting/vulcira_layers/foliage-sun-reveal-flip.webp)",
          } as CSSProperties
        }
      >
        <section className="landing-section-lit relative flex min-h-[52vh] flex-1 flex-col overflow-hidden bg-[#0a0a0a] md:min-h-[58vh]">
          <AboutLightingScene />

          <header className="relative z-20 px-6 pt-6 md:px-10 md:pt-8 lg:px-14">
            <Link
              href="/"
              className="font-landing inline-block py-2 text-sm tracking-[0.55em] text-white md:text-base"
            >
              V U L C I R A
            </Link>
          </header>

          <SiteNav tone="light" />
        </section>

        <section className="relative z-10 border-t border-[#1a1a1a]/10 bg-[#ded8d1] px-6 py-14 md:px-10 md:py-20 lg:px-14">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-0">
            <div className="lg:pr-14 xl:pr-20">
              <div className="mb-6 flex flex-col gap-4">
                <span className="h-px w-10 bg-[#1a1a1a]" aria-hidden />
                <h1 className="font-landing text-3xl font-normal tracking-[0.42em] text-[#1a1a1a] md:text-4xl">
                  ABOUT
                </h1>
              </div>
              <div className="max-w-md space-y-5 text-sm leading-relaxed text-[#1a1a1a]/80">
                <p>
                  VULCIRA is a Hawaii-based company focused on sourcing quality
                  Japanese apparel and accessories for international markets.
                </p>
                <p>
                  We work directly with trusted factories and wholesalers to
                  bring well-made product to buyers who value craft,
                  consistency, and fair access.
                </p>
              </div>
            </div>

            <div className="border-[#1a1a1a]/15 lg:border-l lg:pl-14 xl:pl-20">
              <dl className="divide-y divide-[#1a1a1a]/15">
                {PILLARS.map(({ label, body }) => (
                  <div
                    key={label}
                    className="grid gap-3 py-6 first:pt-0 last:pb-0 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
                  >
                    <dt className="text-[10px] tracking-[0.28em] text-[#1a1a1a]">
                      {label}
                    </dt>
                    <dd className="text-sm leading-relaxed text-[#1a1a1a]/80">
                      {body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
