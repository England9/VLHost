"use client";

import { useLayoutEffect } from "react";
import { finishIntroCover } from "@/components/brand/intro-cover";

/** Marks intro complete on routes that skip the logo entrance. */
export function SkipIntro() {
  useLayoutEffect(() => {
    finishIntroCover();
  }, []);

  return null;
}
