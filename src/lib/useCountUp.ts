import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type Options = { decimals?: number; duration?: number; delay?: number };

/**
 * Counts from 0 to `target` the first time the returned ref scrolls into view.
 * Jumps straight to the final value when the user prefers reduced motion.
 */
export function useCountUp<T extends Element>(target: number, { decimals = 0, duration = 1.8, delay = 0 }: Options = {}) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(target);
      return;
    }
    const controls = animate(0, target, { duration, delay, ease: [0.16, 1, 0.3, 1], onUpdate: setValue });
    return () => controls.stop();
  }, [inView, reduce, target, duration, delay]);

  return { ref, display: value.toFixed(decimals) };
}
