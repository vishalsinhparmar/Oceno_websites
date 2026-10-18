import { MotionConfig, motion, type Variants } from "motion/react";
import BrandWave from "@/components/brand/BrandWave";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { heroContent } from "@/config/home";
import { assets } from "@/lib/assets";
import HeroSearch from "./HeroSearch";
import HeroShowcase from "./HeroShowcase";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fraunces = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

/** Home hero (Section / Hero): headline, CTAs, trust stats, product showcase and search. */
export default function Hero() {
  const { eyebrow, description, primaryCta, secondaryCta, stats } = heroContent;

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="hero-heading"
        className="relative isolate flex flex-col gap-12 bg-oceno-deep px-5 pt-12 sm:px-8 sm:pt-16 lg:gap-[72px] xl:px-10 xl:pt-[80px] 2xl:px-[120px]"
      >
        {/* Background: glows are clipped; the white base lets the search card straddle the next section. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <img
            src={assets.heroGlowLeft}
            alt=""
            width={700}
            height={700}
            className="absolute top-[300px] left-[-300px] size-[700px] max-w-none"
          />
          <img
            src={assets.heroGlowRight}
            alt=""
            width={1000}
            height={900}
            className="absolute top-[-260px] left-[calc(50%-20px)] h-[900px] w-[1000px] max-w-none"
          />
          <div className="absolute right-0 bottom-0 left-0 h-[115px] bg-white" />
        </div>

        <div className="flex w-full flex-col items-center gap-12 lg:flex-row lg:gap-[64px]">
          <motion.div
            className="flex min-w-0 flex-1 flex-col items-start gap-[28px]"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </motion.div>
            <motion.h1
              id="hero-heading"
              variants={item}
              className="font-fraunces-light text-[46px] leading-[50px] font-light tracking-[-0.025em] text-white sm:text-[64px] sm:leading-[70px] lg:text-[64px] lg:leading-[70px] xl:text-[84px] xl:leading-[90px]"
              style={fraunces}
            >
              European elegance,{" "}
              <em className="font-fraunces-light-italic text-oceno-blue-bright italic" style={fraunces}>
                crafted
              </em>{" "}
              in Morbi.
            </motion.h1>
            <motion.div variants={item}>
              <BrandWave />
            </motion.div>
            <motion.p
              variants={item}
              className="max-w-[620px] font-manrope-regular text-[16px] leading-[26px] font-normal text-oceno-muted sm:text-[18px] sm:leading-[30px]"
            >
              {description}
            </motion.p>
            <motion.div variants={item} className="flex flex-wrap items-start gap-[12px]">
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
            <motion.dl
              variants={item}
              className="flex w-full flex-wrap gap-x-[48px] gap-y-5 border-t border-oceno-deep-line pt-[28px]"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-[4px] whitespace-nowrap">
                  <dt className="font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-muted">
                    {stat.label}
                  </dt>
                  <dd
                    className="font-fraunces-regular text-[34px] leading-[42px] font-normal tracking-[-0.17px] text-white"
                    style={fraunces}
                  >
                    {stat.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <HeroShowcase />
        </div>

        <HeroSearch />
      </section>
    </MotionConfig>
  );
}
