import { MotionConfig, motion, type Variants } from "motion/react";
import Eyebrow from "@/components/ui/Eyebrow";
import { missionContent } from "@/config/about";
import { assets } from "@/lib/assets";
import { easeOut, fraunces, rise, stagger } from "@/lib/motion";

const quote: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: easeOut } },
};

/** Underline that sweeps under the italic accent once the quote lands. */
const accent: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, delay: 0.7, ease: easeOut } },
};

/** About "Our purpose" (Section / Mission): founder quote beside the origin story. */
export default function Mission() {
  const { eyebrow, signature, body } = missionContent;

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="mission-heading"
        className="bg-white px-5 pt-16 pb-12 sm:px-8 sm:pt-20 sm:pb-16 lg:pt-[120px] lg:pb-[96px] xl:px-10 2xl:px-[120px]"
      >
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[64px] xl:gap-[80px]">
          <motion.figure
            className="flex min-w-0 flex-1 flex-col items-start gap-[24px]"
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.div variants={rise}>
              <Eyebrow tone="light">{eyebrow}</Eyebrow>
            </motion.div>
            <motion.blockquote
              id="mission-heading"
              variants={quote}
              className="font-fraunces-regular text-[32px] leading-[40px] font-normal tracking-[-0.44px] text-oceno-deep sm:text-[44px] sm:leading-[52px]"
              style={fraunces}
            >
              “A bathroom is the most personal room in any building. We make the pieces that turn it into a{" "}
              <em className="relative inline-block font-fraunces-light-italic font-light text-oceno-blue italic" style={fraunces}>
                quiet luxury
                <motion.span
                  aria-hidden="true"
                  variants={accent}
                  className="absolute right-0 -bottom-[2px] left-0 h-[2px] origin-left rounded-full bg-oceno-blue/40"
                />
              </em>
              .”
            </motion.blockquote>
            <motion.figcaption variants={rise} className="flex items-center gap-[14px]">
              <img src={assets.avatarBlankLarge} alt="" width={48} height={48} className="block size-[48px] shrink-0" />
              <span className="flex flex-col whitespace-nowrap">
                <span className="font-manrope-semibold text-[15px] leading-[20px] font-semibold tracking-[0.03px] text-oceno-deep">
                  {signature.name}
                </span>
                <span className="font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-slate">
                  {signature.role}
                </span>
              </span>
            </motion.figcaption>
          </motion.figure>

          <motion.div
            className="flex min-w-0 flex-1 flex-col gap-[20px] lg:pt-[40px]"
            variants={stagger(0.14, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {body.map((paragraph) => (
              <motion.p
                key={paragraph.slice(0, 24)}
                variants={rise}
                className="font-manrope-regular text-[16px] leading-[28px] font-normal text-oceno-slate sm:text-[18px] sm:leading-[30px]"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
