import { MotionConfig, motion, type Variants } from "motion/react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { categoriesContent } from "@/config/home";
import { assets } from "@/lib/assets";
import CategoryCard from "./CategoryCard";

const fraunces = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;
const easeOut = [0.22, 1, 0.36, 1] as const;

const heading: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/** Home "Shop by category" section (Section / Categories). */
export default function Categories() {
  const { eyebrow, description, cta, items } = categoriesContent;

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="categories-heading"
        className="flex flex-col gap-10 bg-white px-5 pt-16 pb-20 sm:px-8 sm:pt-20 lg:gap-[48px] lg:pt-[104px] lg:pb-[120px] xl:px-10 2xl:px-[120px]"
      >
        <motion.div
          className="flex flex-col items-start gap-8 md:flex-row md:items-end md:gap-[40px]"
          variants={heading}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="flex max-w-[720px] flex-col items-start gap-[16px]">
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
            <h2
              id="categories-heading"
              className="font-fraunces-regular text-[34px] leading-[42px] font-normal tracking-[-0.44px] text-oceno-deep sm:text-[44px] sm:leading-[52px]"
              style={fraunces}
            >
              Five families,{" "}
              <em className="font-fraunces-light-italic font-light text-oceno-blue italic" style={fraunces}>
                one standard
              </em>{" "}
              of finish.
            </h2>
            <p className="font-manrope-regular text-[16px] leading-[26px] font-normal text-oceno-slate sm:text-[18px] sm:leading-[30px]">
              {description}
            </p>
          </div>
          <Button
            href={cta.href}
            variant="outline"
            icon={<img src={assets.iconArrowRightDark} alt="" width={18} height={18} className="block size-[18px]" />}
          >
            {cta.label}
          </Button>
        </motion.div>

        {/* Swipeable row on small screens, five-up grid from lg. */}
        <motion.div
          className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pt-1 pb-6 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-[24px] lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {items.map((item) => (
            <CategoryCard key={item.id} {...item} />
          ))}
        </motion.div>
      </section>
    </MotionConfig>
  );
}
