"use client";

import { LIGHTING_ASSETS } from "@/lib/foliage-wind";
import { DualExposurePlate } from "@/components/lighting/dual-exposure-plate";

export function WaitlistLightingScene() {
  return (
    <div className="waitlist-plate pointer-events-none absolute inset-0 overflow-hidden">
      <DualExposurePlate
        photoSrc={LIGHTING_ASSETS.waitlist}
        photoClass="waitlist-photo"
        plateClass="waitlist-plate-inner"
      />
    </div>
  );
}