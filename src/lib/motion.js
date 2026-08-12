/**
 * Motion tokens, per BRAND.md section 4 and tangison-motion-master.
 * Only transform and opacity are animated so every animation stays on the compositor.
 */

export const EASE = [0.22, 1, 0.36, 1];

export const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: EASE },
  }),
};

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: EASE },
  }),
};

export const headingReveal = {
  hidden: { y: '110%' },
  visible: (i = 0) => ({
    y: 0,
    transition: { delay: 0.4 + i * 0.14, duration: 0.7, ease: EASE },
  }),
};

export const sectionRise = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: EASE },
  }),
};

/** Collapse a variant set to its resting state when the user asks for reduced motion. */
export function resolveVariants(variants, reduced) {
  if (!reduced) return variants;
  const still = {};
  for (const key of Object.keys(variants)) {
    still[key] = { opacity: 1, y: 0, transition: { duration: 0 } };
  }
  return still;
}

/** Shared in-view configuration. Fires once, never replays. Frequency gate per BRAND.md. */
export const inView = { once: true, amount: 0.2, margin: '0px 0px -80px 0px' };
