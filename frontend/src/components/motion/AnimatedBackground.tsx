/**
 * The global ZUNO background: a single flat surface behind the page.
 * Deliberately decoration-free — no drifting gradient blobs, dot grids or
 * glow layers — so the layout and content carry the visual weight.
 */
export function AnimatedBackground() {
  return <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-zuno-950" />;
}
