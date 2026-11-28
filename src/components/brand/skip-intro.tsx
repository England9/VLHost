"use client";

import { useLayoutEffect } from "react";
import { finishIntroCover } from "@/components/brand/intro-cover";

/** Dismisses the home logo veil on routes that skip the entrance. */
export function SkipIntro() {
  useLayoutEffect(() => {
    finishIntroCover();
    document.getElementById("vulcira-intro-cover")?.remove();
  }, []);

  return null;
}
