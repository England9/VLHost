"use client";

import { LIGHTING_ASSETS } from "@/lib/foliage-wind";
import { FoliageShadowLayers } from "@/components/lighting/foliage-shadow-layers";

export function WaitlistLightingScene() {
  return (
    <div className="waitlist-plate pointer-events-none absolute inset-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LIGHTING_ASSETS.waitlist}
        alt=""
        className="waitlist-photo absolute inset-0 h-full w-full object-cover object-center"
        decoding="async"
      />
      <div className="waitlist-shadow-field absolute" aria-hidden>
        <FoliageShadowLayers />
      </div>
    </div>
  );
}