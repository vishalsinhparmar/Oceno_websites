import { MotionConfig, motion, type Variants } from "motion/react";
import { statsContent } from "@/config/home";
import { assets } from "@/lib/assets";
import { useCountUp } from "@/lib/useCountUp";

const fraunces = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;
const easeOut = [0.22, 1, 0.36, 1] as const;

const row: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const stat: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

type StatProps = (typeof statsContent)[number] & { index: number };

/** Data / Stat: count-up value with a red suffix and a muted label. */
function Stat({ value, decimals, suffix, label, index }: StatProps) {
  const count = useCountUp<HTMLParagraphElement>(value, { decimals, delay: 0.15 + index * 0.12 });
  return (
    <motion.div variants={stat} className="flex flex-col items-start gap-[6px] whitespace-nowrap">
      <p
        ref={count.ref}
        className="flex items-start gap-[2px] font-fraunces-light text-[44px] leading-[52px] font-light tracking-[-1.12px] tabular-nums sm:text-[56px] sm:leading-[60px]"
        style={fraunces}
      >
        <span aria-hidden="true" className="text-white">
          {count.display}
        </span>
        {suffix && (
          <span aria-hidden="true" className="text-oceno-red">
            {suffix}
          </span>
        )}
        <span className="sr-only">
          {value}
          {suffix}
        </span>
      </p>
      <p className="font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-muted">{label}</p>
    </motion.div>
  );
}

/** Home stats band (Section / Stats). */
export default function Stats() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-label="OCENO in numbers"
        className="relative overflow-hidden bg-oceno-deep px-5 py-16 sm:px-8 lg:py-[88px] xl:px-10 2xl:px-[120px]"
      >
        <motion.img
          src={assets.statsGlow}
          alt=""
          aria-hidden="true"
          width={800}
          height={500}
          className="pointer-events-none absolute top-[-200px] left-[-200px] h-[500px] w-[800px] max-w-none"
          animate={{ x: [0, 140, 0], y: [0, 40, 0], opacity: [1, 0.75, 1] }}
          transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="relative grid grid-cols-2 gap-x-6 gap-y-10 md:flex md:items-start md:justify-between"
          variants={row}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          {statsContent.map((s, i) => (
            <Stat key={s.label} {...s} index={i} />
          ))}
        </motion.div>
      </section>
    </MotionConfig>
  );
}
