import { MotionConfig, motion, type Variants } from "motion/react";
import Eyebrow from "@/components/ui/Eyebrow";
import { whyOcenoContent } from "@/config/home";
import { assets } from "@/lib/assets";

const fraunces = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;
const easeOut = [0.22, 1, 0.36, 1] as const;

const heading: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeOut } },
};

const iconTile: Variants = {
  hidden: { scale: 0.6, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 320, damping: 20, delay: 0.2 } },
};

/** Home "Why partners choose OCENO" section (Section / Why OCENO). */
export default function WhyOceno() {
  const { eyebrow, description, features } = whyOcenoContent;

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="why-heading"
        className="flex flex-col gap-10 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:gap-[56px] lg:py-[120px] xl:px-10 2xl:px-[120px]"
      >
        <motion.div
          className="flex flex-col items-center gap-[16px] text-center"
          variants={heading}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div variants={rise}>
            <Eyebrow tone="light" align="center">
              {eyebrow}
            </Eyebrow>
          </motion.div>
          <motion.h2
            id="why-heading"
            variants={rise}
            className="max-w-[760px] font-fraunces-regular text-[34px] leading-[42px] font-normal tracking-[-0.44px] text-oceno-deep sm:text-[44px] sm:leading-[52px]"
            style={fraunces}
          >
            Built for showrooms,{" "}
            <em className="font-fraunces-light-italic font-light text-oceno-blue italic" style={fraunces}>
              specified
            </em>{" "}
            for projects.
          </motion.h2>
          <motion.p
            variants={rise}
            className="max-w-[680px] font-manrope-regular text-[16px] leading-[26px] font-normal text-oceno-slate sm:text-[18px] sm:leading-[30px]"
          >
            {description}
          </motion.p>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 sm:gap-[24px] lg:grid-cols-4"
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {features.map((f) => (
            <motion.li
              key={f.id}
              variants={card}
              className="group flex flex-col items-start gap-[16px] rounded-[20px] border border-oceno-line bg-white px-[28px] py-[32px] transition-[border-color,box-shadow,translate] duration-300 ease-out hover:-translate-y-[4px] hover:border-oceno-blue/30 hover:shadow-oceno-float"
            >
              <motion.span
                variants={iconTile}
                aria-hidden="true"
                className="flex size-[56px] items-center justify-center rounded-[16px] bg-oceno-blue-tint transition-colors duration-300 group-hover:bg-oceno-blue"
              >
                <img
                  src={assets[f.icon]}
                  alt=""
                  width={26}
                  height={26}
                  className="block size-[26px] transition-[transform,filter] duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6 group-hover:brightness-0 group-hover:invert"
                />
              </motion.span>
              <span aria-hidden="true" className="h-[8px] w-[10px]" />
              <h3 className="w-full font-manrope-semibold text-[20px] leading-[28px] font-semibold tracking-[-0.06px] text-oceno-deep">
                {f.title}
              </h3>
              <p className="w-full font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-slate">{f.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </MotionConfig>
  );
}
