/**
 * ZUNO motion system.
 *
 * Every animation in the product pulls values from here so the feel stays
 * consistent: micro interactions are snappy, storytelling is deliberate,
 * and nothing ever fights the user.
 */

export const duration = {
  micro: 0.16, // 160ms hover tints, active states
  normal: 0.34, // 340ms default UI transitions
  emphasis: 0.68, // 680ms section / card reveals
  cinematic: 1.2, // 1200ms journey / page transitions
  loop: 1.6, // fast ambient loops
  ambient: 3.8, // slow ambient loops
  drift: 14, // long background drift cycles
} as const;

/** Cubic-bezier easing presets used across GSAP + Motion. */
export const ease = {
  out: [0.16, 1, 0.3, 1] as const, // expo-out
  inOut: [0.65, 0, 0.35, 1] as const, // expo-in-out
  soft: [0.33, 1, 0.68, 1] as const, // ease-out-cubic
  squish: [0.34, 1.56, 0.64, 1] as const, // overshoot
} as const;

/** Spring presets for Framer Motion physics. */
export const spring = {
  gentle: { type: 'spring' as const, stiffness: 260, damping: 24, mass: 0.8 },
  card: { type: 'spring' as const, stiffness: 220, damping: 22, mass: 0.9 },
  magnetic: { type: 'spring' as const, stiffness: 320, damping: 18, mass: 0.5 },
  snappy: { type: 'spring' as const, stiffness: 420, damping: 30, mass: 0.4 },
  float: { type: 'spring' as const, stiffness: 90, damping: 14, mass: 1.1 },
} as const;

/** Shared spacing / transform amounts. */
export const distance = {
  micro: 4,
  small: 12,
  normal: 24,
  large: 40,
  stagger: 80,
} as const;

export const stagger = {
  tight: 0.05,
  normal: 0.09,
  relaxed: 0.14,
} as const;

export const blur = {
  none: 0,
  subtle: 4,
  soft: 8,
  heavy: 14,
} as const;

/** Timing buckets — keep these aligned with the durations above. */
export const timing = {
  MICRO_MS: 120,
  NORMAL_MS: 340,
  EMPHASIS_MS: 680,
  CINEMATIC_MS: 1200,
} as const;

export const motionConfig = {
  duration,
  ease,
  spring,
  distance,
  stagger,
  blur,
  timing,
} as const;

/** Default entrance for section-level reveals. */
export const revealTransition = {
  duration: duration.emphasis,
  ease: ease.out,
} as const;

export type Ease = (typeof ease)[keyof typeof ease] | string;