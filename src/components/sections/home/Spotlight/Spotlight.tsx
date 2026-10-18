import { useState } from "react";
import { AnimatePresence, MotionConfig, motion, type Variants } from "motion/react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { spotlightContent } from "@/config/home";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { easeOut, fraunces, rise, stagger } from "@/lib/motion";

type PieceId = (typeof spotlightContent.pieces)[number]["id"];

const thumbSurface = {
  backgroundImage: "radial-gradient(50% 50% at 50% 50%, #1b3270 0%, #12234f 50%, #08132e 100%)",
} as const;

const stageSurface = {
  backgroundImage: "radial-gradient(70% 58% at 50% 44%, #1b3270 0%, #12234f 50%, #08132e 100%)",
} as const;

const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut } },
};

const mediaReveal: Variants = {
  hidden: { clipPath: "inset(0% 0% 0% 100%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, delay: 0.2, ease: easeOut } },
};

/** Home "Collection spotlight" (Section / Collection Spotlight) with a piece picker. */
export default function Spotlight() {
  const { eyebrow, description, primaryCta, secondaryCta, pieces, defaultPiece } = spotlightContent;
  const [activeId, setActiveId] = useState<PieceId>(defaultPiece);
  const active = pieces.find((p) => p.id === activeId) ?? pieces[0];

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="spotlight-heading"
        className="bg-white px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-[120px] xl:px-10 2xl:px-[120px]"
      >
        <motion.div
          className="flex flex-col overflow-clip rounded-[24px] sm:rounded-[32px] lg:flex-row"
          variants={card}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="flex min-w-0 flex-1 flex-col items-start justify-center gap-[28px] px-6 py-12 sm:px-12 sm:py-16 lg:px-[64px] lg:py-[72px]"
            style={{ backgroundImage: "linear-gradient(134.69deg, #0d1d45 0%, #050b1f 71.43%)" }}
            variants={stagger(0.08, 0.25)}
          >
            <motion.div variants={rise}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </motion.div>
            <motion.h2
              id="spotlight-heading"
              variants={rise}
              className="font-fraunces-light text-[38px] leading-[46px] font-light tracking-[-0.72px] text-white sm:text-[48px] sm:leading-[56px]"
              style={fraunces}
            >
              The{" "}
              <em className="font-fraunces-light-italic text-oceno-blue-bright italic" style={fraunces}>
                Art Basin
              </em>{" "}
              Series.
            </motion.h2>
            <motion.p
              variants={rise}
              className="font-manrope-regular text-[16px] leading-[26px] font-normal text-oceno-muted sm:text-[18px] sm:leading-[30px]"
            >
              {description}
            </motion.p>

            <motion.div variants={rise} role="group" aria-label="Preview a piece" className="flex flex-wrap gap-[12px]">
              {pieces.map((piece) => {
                const selected = piece.id === activeId;
                return (
                  <button
                    key={piece.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveId(piece.id)}
                    className="group flex flex-col items-start gap-[8px] text-left focus-visible:outline-none"
                  >
                    <span
                      className={cn(
                        "relative block size-[92px] overflow-clip rounded-[16px] transition-[border-color,transform,box-shadow] duration-300 ease-out group-hover:-translate-y-[3px] group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-oceno-blue-bright sm:size-[112px]",
                        selected
                          ? "border-2 border-white/90 shadow-[0_12px_32px_-12px_rgba(61,114,255,0.7)]"
                          : "border border-white/[0.12] group-hover:border-white/40",
                      )}
                      style={thumbSurface}
                    >
                      <span aria-hidden="true" className="absolute top-[86%] right-1/4 bottom-[6.86%] left-1/4">
                        <span className="absolute inset-[-100%_-14.29%]">
                          <img src={assets.spotlightFloorShadow} alt="" className="block size-full max-w-none" />
                        </span>
                      </span>
                      <span className="absolute inset-[7%_9%_11%_9%] transition-transform duration-500 ease-out group-hover:scale-[1.06]">
                        <img
                          src={assets[piece.image]}
                          alt=""
                          width={940}
                          height={940}
                          loading="lazy"
                          className="pointer-events-none block size-full max-w-none object-contain"
                        />
                      </span>
                    </span>
                    <span
                      className={cn(
                        "font-manrope-semibold text-[13px] leading-[18px] font-semibold tracking-[0.026px] whitespace-nowrap transition-colors",
                        selected ? "text-white" : "text-oceno-muted group-hover:text-white",
                      )}
                    >
                      {piece.name}
                    </span>
                  </button>
                );
              })}
            </motion.div>

            <motion.div variants={rise} className="flex flex-wrap gap-[12px]">
              <Button
                href={primaryCta.href}
                icon={<img src={assets.iconArrowRight} alt="" width={18} height={18} className="block size-[18px]" />}
              >
                {primaryCta.label}
              </Button>
              <Button href={secondaryCta.href} variant="outline-light">
                {secondaryCta.label}
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={mediaReveal}
            className="relative aspect-[4/3] w-full shrink-0 overflow-clip bg-oceno-deep sm:aspect-[16/11] lg:aspect-auto lg:w-[46%] lg:self-stretch xl:w-[600px]"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={active.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: easeOut }}
              >
                {active.media === "photo" ? (
                  <img
                    src={assets.spotlightMedia}
                    alt={`${active.name} art basin on a stone plinth`}
                    width={1200}
                    height={1500}
                    loading="lazy"
                    className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                  />
                ) : (
                  <div className="absolute inset-0" style={stageSurface}>
                    <span aria-hidden="true" className="absolute top-[78%] right-[28%] bottom-[16%] left-[28%]">
                      <span className="absolute inset-[-100%_-14.29%]">
                        <img src={assets.spotlightFloorShadow} alt="" className="block size-full max-w-none opacity-80" />
                      </span>
                    </span>
                    <motion.div
                      className="absolute inset-[16%_18%_20%_18%]"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                    >
                      <img
                        src={assets[active.image]}
                        alt={`${active.name} art basin`}
                        width={940}
                        height={940}
                        className="pointer-events-none block size-full max-w-none object-contain"
                      />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            <p className="sr-only" aria-live="polite">
              Showing {active.name}, {active.finish}
            </p>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
