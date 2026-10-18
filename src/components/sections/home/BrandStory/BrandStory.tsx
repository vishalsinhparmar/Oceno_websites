import { useRef } from "react";
import { MotionConfig, motion, useScroll, useTransform, type Variants } from "motion/react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { brandStoryContent } from "@/config/home";
import { assets } from "@/lib/assets";
import { useCountUp } from "@/lib/useCountUp";

const fraunces = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;
const easeOut = [0.22, 1, 0.36, 1] as const;

const media: Variants = {
  hidden: { clipPath: "inset(18% 12% 18% 12% round 28px)", opacity: 0 },
  show: {
    clipPath: "inset(0% 0% 0% 0% round 28px)",
    opacity: 1,
    transition: { duration: 1.1, ease: easeOut },
  },
};

const mediaImage: Variants = {
  hidden: { scale: 1.18 },
  show: { scale: 1, transition: { duration: 1.6, ease: easeOut } },
};

const badge: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, delay: 0.55, ease: easeOut } },
};

const text: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const tick: Variants = {
  hidden: { scale: 0, rotate: -45 },
  show: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 420, damping: 18, delay: 0.15 } },
};

/** Home "Our story" section (Section / Brand Story). */
export default function BrandStory() {
  const { eyebrow, body, checklist, badge: years, primaryCta, secondaryCta } = brandStoryContent;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const count = useCountUp<HTMLParagraphElement>(years.value, { delay: 0.7 });

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        aria-labelledby="story-heading"
        className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:py-[120px] xl:px-10 2xl:px-[120px]"
      >
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-[64px] xl:gap-[80px]">
          <motion.div
            className="relative aspect-[560/620] w-full max-w-[560px] shrink-0 overflow-clip rounded-[28px] lg:w-[46%] xl:w-[560px]"
            variants={media}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            {/* Oversized so the parallax drift never reveals the edges. */}
            <motion.div className="absolute inset-x-0 -inset-y-[8%]" style={{ y: parallax }}>
              <motion.img
                src={assets.storyMedia}
                alt="OCENO glossy white table-top basin on a stone plinth"
                width={1200}
                height={1500}
                loading="lazy"
                variants={mediaImage}
                className="pointer-events-none size-full max-w-none object-cover"
              />
            </motion.div>

            <motion.div
              variants={badge}
              className="absolute bottom-4 left-4 flex flex-col gap-[2px] rounded-[20px] bg-white px-[24px] py-[20px] whitespace-nowrap shadow-oceno-float sm:bottom-[14px] sm:left-[28px]"
            >
              <p
                ref={count.ref}
                className="font-fraunces-light text-[56px] leading-[60px] font-light tracking-[-1.12px] text-oceno-deep tabular-nums"
                style={fraunces}
              >
                <span aria-hidden="true">
                  {count.display}
                  {years.suffix}
                </span>
                <span className="sr-only">
                  {years.value}
                  {years.suffix}
                </span>
              </p>
              <p className="font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-slate">{years.label}</p>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex min-w-0 flex-1 flex-col items-start gap-[24px]"
            variants={text}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={item}>
              <Eyebrow tone="light">{eyebrow}</Eyebrow>
            </motion.div>
            <motion.h2
              id="story-heading"
              variants={item}
              className="font-fraunces-regular text-[34px] leading-[42px] font-normal tracking-[-0.44px] text-oceno-deep sm:text-[44px] sm:leading-[52px]"
              style={fraunces}
            >
              Where Morbi craftsmanship meets{" "}
              <em className="font-fraunces-light-italic font-light text-oceno-blue italic" style={fraunces}>
                European design
              </em>
              .
            </motion.h2>
            <motion.p
              variants={item}
              className="font-manrope-regular text-[16px] leading-[26px] font-normal text-oceno-slate sm:text-[18px] sm:leading-[30px]"
            >
              {body}
            </motion.p>
            <ul className="flex w-full flex-col gap-[14px]">
              {checklist.map((point) => (
                <motion.li key={point} variants={item} className="flex items-start gap-[12px] sm:items-center">
                  <motion.span
                    variants={tick}
                    aria-hidden="true"
                    className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-oceno-blue-tint"
                  >
                    <img src={assets.iconCheckBlue} alt="" width={14} height={14} className="block size-[14px]" />
                  </motion.span>
                  <span className="font-manrope-regular text-[16px] leading-[26px] font-normal text-oceno-ink">{point}</span>
                </motion.li>
              ))}
            </ul>
            <motion.div variants={item} className="flex flex-wrap items-center gap-x-[12px] gap-y-3">
              <Button
                href={primaryCta.href}
                variant="dark"
                icon={<img src={assets.iconArrowRight} alt="" width={18} height={18} className="block size-[18px]" />}
              >
                {primaryCta.label}
              </Button>
              <Button
                href={secondaryCta.href}
                variant="link"
                icon={
                  <img src={assets.iconArrowRightBlue} alt="" width={18} height={18} className="block size-[18px]" />
                }
              >
                {secondaryCta.label}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
