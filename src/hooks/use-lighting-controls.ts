"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_LIGHTING,
  loadLightingControls,
  saveLightingControls,
  type LightingControls,
} from "@/lib/lighting-controls";

export function useLightingControls() {
  const [controls, setControls] = useState<LightingControls>(DEFAULT_LIGHTING);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setControls(loadLightingControls());
    setHydrated(true);
  }, []);

  const update = useCallback((patch: Partial<LightingControls>) => {
    setControls((prev) => {
      const next = { ...prev, ...patch };
      saveLightingControls(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setControls({ ...DEFAULT_LIGHTING });
    saveLightingControls(DEFAULT_LIGHTING);
  }, []);

  return { controls, update, reset, hydrated };
}