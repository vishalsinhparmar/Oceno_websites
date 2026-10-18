import { MotionConfig, motion, type Variants } from "motion/react";
import Eyebrow from "@/components/ui/Eyebrow";
import { valuesContent } from "@/config/about";
import { assets } from "@/lib/assets";
import { easeOut, fraunces, rise, stagger } from "@/lib/motion";

const card: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: 12 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.85, ease: easeOut } },
};

/** About "What we stand for" (Section / Values), dark feature cards. */
export default function Values() {
  const { eyebrow, description, items } = valuesContent;

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="values-heading"
        className="relative isolate flex flex-col gap-10 overflow-hidden bg-oceno-deep px-5 py-16 sm:px-8 sm:py-20 lg:gap-[56px] lg:py-[120px] xl:px-10 2xl:px-[120px]"
      >
        <motion.img
          src={assets.valuesGlow}
          alt=""
          aria-hidden="true"
          width={900}
          height={700}
          className="pointer-events-none absolute top-[-300px] left-[-300px] -z-10 h-[700px] w-[900px] max-w-none"
          animate={{ x: [0, 120, 0], y: [0, 60, 0] }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
        />

        <motion.div
          className="flex max-w-[640px] flex-col items-start gap-[16px]"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div variants={rise}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>
          <motion.h2
            id="values-heading"
            variants={rise}
            className="font-fraunces-regular text-[34px] leading-[42px] font-normal tracking-[-0.44px] text-white sm:text-[44px] sm:leading-[52px]"
            style={fraunces}
          >
            <em className="font-fraunces-light-italic font-light text-oceno-blue-bright italic" style={fraunces}>
              Three promises
            </em>{" "}
            behind every piece.
          </motion.h2>
          <motion.p
            variants={rise}
            className="font-manrope-regular text-[16px] leading-[26px] font-normal text-oceno-muted sm:text-[18px] sm:leading-[30px]"
          >
            {description}
          </motion.p>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 items-start gap-4 [perspective:1200px] sm:gap-[24px] md:grid-cols-3"
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {items.map((item) => (
            <motion.li
              key={item.id}
              variants={card}
              className="group relative flex flex-col items-start gap-[16px] overflow-hidden rounded-[20px] border border-oceno-deep-line bg-[#0d1d45] px-[28px] py-[32px] transition-[border-color,translate,box-shadow] duration-300 ease-out hover:-translate-y-[4px] hover:border-oceno-blue/60 hover:shadow-[0_24px_60px_-24px_rgba(11,77,245,0.55)]"
            >
              {/* Hover sheen sweeps across the card. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 transition-[left,opacity] duration-700 ease-out group-hover:left-[120%] group-hover:opacity-100"
              />
              <span className="flex size-[56px] items-center justify-center rounded-[16px] bg-white/[0.08] transition-colors duration-300 group-hover:bg-oceno-blue">
                <img
                  src={assets[item.icon]}
                  alt=""
                  width={26}
                  height={26}
                  className="block size-[26px] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[-8deg]"
                />
              </span>
              <span aria-hidden="true" className="h-[8px] w-[10px]" />
              <h3 className="font-manrope-semibold text-[20px] leading-[28px] font-semibold tracking-[-0.06px] text-white">
                {item.title}
              </h3>
              <p className="font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-muted">{item.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </MotionConfig>
  );
}
