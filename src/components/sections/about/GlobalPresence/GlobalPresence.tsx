import { MotionConfig, motion, type Variants } from "motion/react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { globalPresenceContent } from "@/config/about";
import { assets } from "@/lib/assets";
import { useCountUp } from "@/lib/useCountUp";
import { easeOut, fraunces, rise, riseLarge, stagger } from "@/lib/motion";

const pill: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 380, damping: 22 } },
};

type Region = (typeof globalPresenceContent.regions)[number];

/** Region card: spinning globe on hover and a count-up of markets served. */
function RegionCard({ name, count, markets, index }: Region & { index: number }) {
  const counter = useCountUp<HTMLParagraphElement>(count, { duration: 1.2, delay: 0.3 + index * 0.1 });
  return (
    <motion.li
      variants={riseLarge}
      className="group flex flex-col items-start gap-[10px] overflow-clip rounded-[20px] border border-oceno-line bg-white p-[28px] transition-[border-color,box-shadow,translate] duration-300 ease-out hover:-translate-y-[4px] hover:border-oceno-blue/30 hover:shadow-oceno-float"
    >
      <img
        src={assets.iconGlobeBlue}
        alt=""
        width={24}
        height={24}
        className="block size-[24px] transition-transform duration-[900ms] ease-out group-hover:rotate-[360deg]"
      />
      <h3 className="font-manrope-semibold text-[24px] leading-[32px] font-semibold tracking-[-0.12px] whitespace-nowrap text-oceno-deep">
        {name}
      </h3>
      <p
        ref={counter.ref}
        className="font-manrope-semibold text-[13px] leading-[18px] font-semibold tracking-[0.026px] whitespace-nowrap text-oceno-red tabular-nums"
      >
        <span aria-hidden="true">{counter.display} countries</span>
        <span className="sr-only">{count} countries</span>
      </p>
      <p className="font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-slate">{markets}</p>
    </motion.li>
  );
}

/** About "Global presence" (Section / Global Presence): regions and certifications. */
export default function GlobalPresence() {
  const { eyebrow, cta, regions, certificationsLabel, certifications } = globalPresenceContent;

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="presence-heading"
        className="flex flex-col gap-10 bg-oceno-surface px-5 py-16 sm:px-8 sm:py-20 lg:gap-[48px] lg:py-[120px] xl:px-10 2xl:px-[120px]"
      >
        <motion.div
          className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between md:gap-[40px]"
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="flex max-w-[720px] flex-col items-start gap-[16px]">
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
            <h2
              id="presence-heading"
              className="font-fraunces-regular text-[34px] leading-[42px] font-normal tracking-[-0.44px] text-oceno-deep sm:text-[44px] sm:leading-[52px]"
              style={fraunces}
            >
              Trusted in markets that{" "}
              <em className="font-fraunces-light-italic font-light text-oceno-blue italic" style={fraunces}>
                expect more
              </em>
              .
            </h2>
          </div>
          <Button
            href={cta.href}
            variant="outline"
            icon={<img src={assets.iconArrowRightDark} alt="" width={18} height={18} className="block size-[18px]" />}
          >
            {cta.label}
          </Button>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 sm:gap-[24px] lg:grid-cols-4"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {regions.map((region, i) => (
            <RegionCard key={region.id} {...region} index={i} />
          ))}
        </motion.ul>

        <motion.div
          className="flex flex-col items-start gap-5 rounded-[20px] border border-oceno-line bg-white px-6 py-6 sm:px-[32px] sm:py-[28px] lg:flex-row lg:items-center lg:justify-between lg:gap-[16px]"
          variants={stagger(0.07, 0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.p
            variants={rise}
            className="font-manrope-semibold text-[15px] leading-[20px] font-semibold tracking-[0.03px] whitespace-nowrap text-oceno-deep"
          >
            {certificationsLabel}
          </motion.p>
          <ul className="flex flex-wrap gap-[8px] lg:justify-end">
            {certifications.map((cert) => (
              <motion.li
                key={cert}
                variants={pill}
                className="flex items-center gap-[8px] rounded-full bg-oceno-surface py-[10px] pr-[16px] pl-[12px] transition-colors duration-200 hover:bg-oceno-blue-tint"
              >
                <img src={assets.iconAwardBlue} alt="" width={18} height={18} className="block size-[18px]" />
                <span className="font-manrope-semibold text-[13px] leading-[18px] font-semibold tracking-[0.026px] whitespace-nowrap text-oceno-ink">
                  {cert}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
