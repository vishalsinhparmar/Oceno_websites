import { MotionConfig, motion, type Variants } from "motion/react";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import { aboutHeroContent } from "@/config/about";
import { assets } from "@/lib/assets";
import { easeOut, fraunces, rise, stagger } from "@/lib/motion";
import HeroSlider from "./HeroSlider";

/** Each heading line slides up from behind a mask. */
const line: Variants = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 0.9, ease: easeOut } },
};

const wave: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.9, ease: easeOut } },
};

const headingClass =
  "font-fraunces-light text-[44px] leading-[50px] font-light tracking-[-1.28px] text-white sm:text-[56px] sm:leading-[62px] xl:text-[64px] xl:leading-[70px]";

/** About page hero (Section / Page Hero): breadcrumb, intro copy and photo slider. */
export default function AboutHero() {
  const { breadcrumb, current, eyebrow, description, primaryCta, secondaryCta } = aboutHeroContent;

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="about-hero-heading"
        className="relative isolate flex flex-col gap-8 overflow-hidden bg-oceno-deep px-5 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-20 lg:gap-[40px] lg:pt-[72px] lg:pb-[96px] xl:px-10 2xl:px-[120px]"
      >
        <motion.img
          src={assets.aboutHeroGlow}
          alt=""
          aria-hidden="true"
          width={900}
          height={700}
          className="pointer-events-none absolute top-[-300px] left-[20%] -z-10 h-[700px] w-[900px] max-w-none md:left-[47%]"
          animate={{ x: [0, -70, 0], y: [0, 40, 0], opacity: [1, 0.75, 1] }}
          transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
        />

        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut }}>
          <Breadcrumb items={breadcrumb} current={current} />
        </motion.div>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-[48px] xl:gap-[64px]">
          <motion.div
            className="flex min-w-0 flex-1 flex-col items-start gap-[24px]"
            variants={stagger(0.1, 0.1)}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={rise}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </motion.div>

            <motion.h1 id="about-hero-heading" className={headingClass} style={fraunces} variants={stagger(0.12)}>
              <span className="block overflow-hidden pb-[6px]">
                <motion.span className="block" variants={line}>
                  European{" "}
                  <em className="font-fraunces-light-italic text-oceno-blue-bright italic" style={fraunces}>
                    treasures
                  </em>
                  ,
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[6px]">
                <motion.span className="block" variants={line}>
                  made in India.
                </motion.span>
              </span>
            </motion.h1>

            <motion.img
              variants={wave}
              src={assets.brandWave}
              alt=""
              aria-hidden="true"
              width={160}
              height={24}
              className="block h-[18px] w-[120px] origin-left"
            />

            <motion.p
              variants={rise}
              className="max-w-[600px] font-manrope-regular text-[16px] leading-[26px] font-normal text-oceno-muted sm:text-[18px] sm:leading-[30px]"
            >
              {description}
            </motion.p>

            <motion.div variants={rise} className="flex flex-wrap gap-[12px]">
              <Button
                href={primaryCta.href}
                icon={<img src={assets.iconArrowRight} alt="" width={18} height={18} className="block size-[18px]" />}
              >
                {primaryCta.label}
              </Button>
              <Button
                href={secondaryCta.href}
                variant="outline-light"
                icon={
                  <img
                    src={assets.iconDownloadWhite}
                    alt=""
                    width={18}
                    height={18}
                    className="block size-[18px]"
                  />
                }
              >
                {secondaryCta.label}
              </Button>
            </motion.div>
          </motion.div>

          <HeroSlider />
        </div>
      </section>
    </MotionConfig>
  );
}
