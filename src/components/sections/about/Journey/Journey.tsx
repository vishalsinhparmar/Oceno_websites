import { MotionConfig, motion, type Variants } from "motion/react";
import Eyebrow from "@/components/ui/Eyebrow";
import { journeyContent } from "@/config/about";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { easeOut, fraunces, rise } from "@/lib/motion";

const STEP = 0.32;

const timeline: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STEP } },
};

const milestone: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const dot: Variants = {
  hidden: { scale: 0 },
  show: { scale: 1, transition: { type: "spring", stiffness: 500, damping: 18 } },
};

/** Progress fill travels along each segment toward the next milestone. */
const fill: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: STEP + 0.1, delay: 0.15, ease: "linear" } },
};

/** About "Our journey" (Section / Journey): animated milestone timeline. */
export default function Journey() {
  const { eyebrow, milestones } = journeyContent;

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="journey-heading"
        className="flex flex-col gap-10 overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:gap-[56px] lg:py-[120px] xl:px-10 2xl:px-[120px]"
      >
        <motion.div
          className="flex max-w-[720px] flex-col items-start gap-[16px]"
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h2
            id="journey-heading"
            className="font-fraunces-regular text-[34px] leading-[42px] font-normal tracking-[-0.44px] text-oceno-deep sm:text-[44px] sm:leading-[52px]"
            style={fraunces}
          >
            From one kiln to{" "}
            <em className="font-fraunces-light-italic font-light text-oceno-blue italic" style={fraunces}>
              forty countries
            </em>
            .
          </h2>
        </motion.div>

        {/* Swipeable on small screens, five columns from lg. */}
        <motion.ol
          className="-mx-5 flex snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
          variants={timeline}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          {milestones.map((m, i) => {
            const highlight = "highlight" in m && m.highlight;
            return (
              <motion.li
                key={m.year}
                variants={milestone}
                className="group flex w-[240px] shrink-0 snap-start flex-col items-start gap-[14px] pr-[24px] sm:w-[260px] lg:w-auto lg:min-w-0"
              >
                <div className="flex w-full items-center">
                  <motion.span variants={dot} className="relative block size-[14px] shrink-0">
                    <span className="absolute inset-[-35.71%]">
                      <img
                        src={highlight ? assets.timelineDotRed : assets.timelineDot}
                        alt=""
                        width={24}
                        height={24}
                        className="block size-full max-w-none"
                      />
                    </span>
                    {highlight && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-oceno-red"
                        animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 2 }}
                      />
                    )}
                  </motion.span>
                  <span className="relative h-[2px] min-w-0 flex-1 bg-oceno-line">
                    {i < milestones.length - 1 && (
                      <motion.span variants={fill} className="absolute inset-0 origin-left bg-oceno-blue" />
                    )}
                  </span>
                </div>
                <p
                  className={cn(
                    "font-fraunces-light text-[44px] leading-[52px] font-light tracking-[-0.72px] whitespace-nowrap transition-transform duration-300 ease-out group-hover:-translate-y-[2px] sm:text-[48px] sm:leading-[56px]",
                    highlight ? "text-oceno-red" : "text-oceno-deep",
                  )}
                  style={fraunces}
                >
                  <time dateTime={m.year}>{m.year}</time>
                </p>
                <h3 className="font-manrope-semibold text-[20px] leading-[28px] font-semibold tracking-[-0.06px] text-oceno-deep">
                  {m.title}
                </h3>
                <p className="font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-slate">{m.body}</p>
              </motion.li>
            );
          })}
        </motion.ol>
      </section>
    </MotionConfig>
  );
}
