/** Reference artboard — mask pixel size stays tied to this width on every viewport. */
export const DAPPLE_REF_WIDTH = 1280;

export function applyDappleViewport(
  el: HTMLElement,
  maskScalePercent: number
): void {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const portrait = h > w * 1.05;
  const maskPx = DAPPLE_REF_WIDTH * (maskScalePercent / 100);
  const cover = Math.max(w, h) / Math.min(w, h);

  el.style.setProperty("--mask-size-px", `${maskPx}px`);
  el.style.setProperty("--mask-rotate", "0deg");
  el.style.setProperty(
    "--dapple-orient-scale",
    portrait ? String(Math.max(1.12, cover * 0.72)) : "1"
  );
}