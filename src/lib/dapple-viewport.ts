/** Reference artboard — mask pixel size stays tied to this width on every viewport. */
export const DAPPLE_REF_WIDTH = 1280;

export function applyDappleViewport(
  el: HTMLElement,
  maskScalePercent: number
): void {
  const w = window.innerWidth;
  const maskPx = DAPPLE_REF_WIDTH * (maskScalePercent / 100);
  // Tie mask pixels to viewport so foliage scales with the plate — never scale
  // `.dapple-orient` alone (that zooms lit copies off the stationary base).
  const viewportRatio = Math.max(w / DAPPLE_REF_WIDTH, 0.32);

  el.style.setProperty("--mask-size-px", `${maskPx * viewportRatio}px`);
  el.style.setProperty("--mask-rotate", "0deg");
  el.style.setProperty("--dapple-orient-scale", "1");
}