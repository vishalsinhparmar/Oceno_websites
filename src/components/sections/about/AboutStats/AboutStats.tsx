import { MotionConfig, motion, type Variants } from "motion/react";
import { aboutStatsContent } from "@/config/about";
import { useCountUp } from "@/lib/useCountUp";
import { easeOut, fraunces } from "@/lib/motion";

const card: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: easeOut, staggerChildren: 0.1 } },
};

const stat: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

type StatProps = (typeof aboutStatsContent)[number] & { index: number };

/** Data / Stat (light tone): count-up value, red suffix, muted label. */
function Stat({ value, decimals, suffix, label, index }: StatProps) {
  const count = useCountUp<HTMLParagraphElement>(value, { decimals, delay: 0.2 + index * 0.12 });
  return (
    <motion.div variants={stat} className="flex flex-col items-start gap-[6px] whitespace-nowrap">
      <p
        ref={count.ref}
        className="flex items-start gap-[2px] font-fraunces-light text-[44px] leading-[52px] font-light tracking-[-1.12px] tabular-nums sm:text-[56px] sm:leading-[60px]"
        style={fraunces}
      >
        <span aria-hidden="true" className="text-oceno-deep">
          {count.display}
        </span>
        <span aria-hidden="true" className="text-oceno-red">
          {suffix}
        </span>
        <span className="sr-only">
          {value}
          {suffix}
        </span>
      </p>
      <p className="font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-slate">{label}</p>
    </motion.div>
  );
}

/** About stats card (Section / Stats). */
export default function AboutStats() {
  return (
    <MotionConfig reducedMotion="user">
      <section aria-label="OCENO at a glance" className="bg-white px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-[120px] xl:px-10 2xl:px-[120px]">
        <motion.div
          className="grid grid-cols-2 gap-x-6 gap-y-10 rounded-[24px] border border-oceno-line bg-oceno-surface px-6 py-10 sm:px-10 md:flex md:items-start md:justify-between lg:px-[56px] lg:py-[48px]"
          variants={card}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          {aboutStatsContent.map((s, i) => (
            <Stat key={s.label} {...s} index={i} />
          ))}
        </motion.div>
      </section>
    </MotionConfig>
  );
}

