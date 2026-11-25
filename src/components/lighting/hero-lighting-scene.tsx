"use client";

import { LIGHTING_ASSETS } from "@/lib/foliage-wind";
import { FoliageShadowLayers } from "@/components/lighting/foliage-shadow-layers";

export function HeroLightingScene() {
  return (
    <div className="hero-plate pointer-events-none absolute inset-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LIGHTING_ASSETS.hero}
        alt=""
        className="hero-photo absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
        decoding="async"
      />

      {/* Fixed mask (overscanned) — foliage moves inside; mask stays aligned to photo */}
      <div className="hero-shadow-field absolute" aria-hidden>
        <FoliageShadowLayers />
      </div>
    </div>
  );
}