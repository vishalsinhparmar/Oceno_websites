import { MotionConfig, motion, type Variants } from "motion/react";
import Eyebrow from "@/components/ui/Eyebrow";
import { testimonialsContent } from "@/config/home";
import { assets } from "@/lib/assets";
import { fraunces, rise, riseLarge, stagger } from "@/lib/motion";

const star: Variants = {
  hidden: { scale: 0, rotate: -60, opacity: 0 },
  show: { scale: 1, rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 480, damping: 16 } },
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

/** Home "Trusted by partners" section (Section / Testimonials). */
export default function Testimonials() {
  const { eyebrow, items } = testimonialsContent;

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="testimonials-heading"
        className="flex flex-col gap-10 bg-oceno-surface px-5 py-16 sm:px-8 sm:py-20 lg:gap-[48px] lg:py-[120px] xl:px-10 2xl:px-[120px]"
      >
        <motion.div
          className="flex flex-col items-center gap-[16px] text-center"
          variants={stagger(0.1)}
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
            id="testimonials-heading"
            variants={rise}
            className="max-w-[760px] font-fraunces-regular text-[34px] leading-[42px] font-normal tracking-[-0.44px] text-oceno-deep sm:text-[44px] sm:leading-[52px]"
            style={fraunces}
          >
            Dealers and developers in{" "}
            <em className="font-fraunces-light-italic font-light text-oceno-blue italic" style={fraunces}>
              40+ countries
            </em>
            .
          </motion.h2>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 gap-4 sm:gap-[24px] md:grid-cols-3"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {items.map((item) => (
            <motion.li
              key={item.id}
              variants={riseLarge}
              className="flex flex-col items-start gap-[20px] rounded-[20px] border border-oceno-line bg-white p-[28px] transition-[box-shadow,translate] duration-300 ease-out hover:-translate-y-[4px] hover:shadow-oceno-float sm:p-[32px]"
            >
              <figure className="flex w-full flex-1 flex-col gap-[20px]">
                <motion.div
                  className="flex gap-[4px]"
                  role="img"
                  aria-label="Rated 5 out of 5"
                  variants={stagger(0.06, 0.25)}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <motion.img
                      key={i}
                      variants={star}
                      src={assets.iconStar}
                      alt=""
                      width={18}
                      height={18}
                      className="block size-[18px]"
                    />
                  ))}
                </motion.div>
                <blockquote className="flex-1 font-manrope-regular text-[17px] leading-[28px] font-normal text-oceno-deep sm:text-[18px] sm:leading-[30px]">
                  {item.quote}
                </blockquote>
                <div aria-hidden="true" className="h-px w-full bg-oceno-line" />
                <figcaption className="flex w-full items-center gap-[12px]">
                  <span aria-hidden="true" className="relative size-[44px] shrink-0">
                    <img src={assets.avatarBlank} alt="" width={44} height={44} className="absolute inset-0 block size-full" />
                    <span className="absolute inset-0 flex items-center justify-center font-manrope-semibold text-[14px] font-semibold text-oceno-blue">
                      {initials(item.name)}
                    </span>
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
                    <span className="font-manrope-semibold text-[15px] leading-[20px] font-semibold tracking-[0.03px] text-oceno-deep">
                      {item.name}
                    </span>
                    <span className="font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-slate">
                      {item.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </MotionConfig>
  );
}
