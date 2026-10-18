import type { Variants } from "motion/react";

/** Shared motion primitives so every section enters with the same rhythm. */
export const easeOut = [0.22, 1, 0.36, 1] as const;

/** Fraunces axis settings used by every display heading in the design. */
export const fraunces = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

export const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export const riseLarge: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

export const stagger = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});
