"use client";

import { LIGHTING_ASSETS } from "@/lib/foliage-wind";
import { FoliageShadowLayers } from "@/components/lighting/foliage-shadow-layers";

export function HeroLightingScene() {
  return (
    <div className="hero-plate pointer-events-none absolute inset-0">
      {/* Stationary photograph */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LIGHTING_ASSETS.hero}
        alt=""
        className="hero-photo absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
        decoding="async"
      />

      {/* Fixed mask — does not move; only foliage inside moves */}
      <div
        className="hero-shadow-mask absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <FoliageShadowLayers variant="hero" />
      </div>
    </div>
  );
}