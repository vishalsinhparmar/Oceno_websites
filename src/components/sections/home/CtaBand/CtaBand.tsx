import type { ReactNode } from "react";
import { MotionConfig, motion, type Variants } from "motion/react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { ctaBandContent } from "@/config/home";
import { siteConfig } from "@/config/site";
import { assets, type AssetKey } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { easeOut, fraunces, rise, stagger } from "@/lib/motion";

const card: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 32 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, ease: easeOut } },
};

const product: Variants = {
  hidden: { opacity: 0, y: 60, rotate: -6 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 1.1, delay: 0.35, ease: easeOut } },
};

type CtaBandProps = {
  content?: {
    eyebrow: string;
    description: string;
    quote: { label: string; href: string };
    whatsapp: { label: string };
  };
  /** Heading content; the italic accent is supplied by the caller. */
  heading?: ReactNode;
  product?: AssetKey;
  /** Positions the decorative product inside the card (xl+ only). */
  productClassName?: string;
};

const defaultHeading = (
  <>
    Planning a project or an{" "}
    <em className="font-fraunces-light-italic text-[#bcd0ff] italic" style={fraunces}>
      export order
    </em>
    ?
  </>
);

/** Quote CTA band (Section / CTA Band), shared by Home and About. */
export default function CtaBand({
  content = ctaBandContent,
  heading = defaultHeading,
  product: productImage = "productPedestalRed",
  productClassName = "top-[calc(50%-64px)] right-[282px] -translate-y-1/2",
}: CtaBandProps) {
  const { eyebrow, description, quote, whatsapp } = content;

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="cta-heading"
        className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:py-[120px] xl:px-10 2xl:px-[120px]"
      >
        <motion.div
          className="relative isolate flex flex-col gap-10 overflow-clip rounded-[24px] p-7 sm:rounded-[28px] sm:p-12 lg:flex-row lg:items-center lg:gap-[48px] lg:p-[64px]"
          style={{ backgroundImage: "linear-gradient(163.48deg, #0b4df5 0%, #0d1d45 39.29%, #08132e 71.43%)" }}
          variants={card}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.img
            src={assets.ctaGlow}
            alt=""
            aria-hidden="true"
            width={600}
            height={600}
            className="pointer-events-none absolute top-[-300px] left-[-200px] -z-10 size-[600px] max-w-none"
            animate={{ x: [0, 80, 0], y: [0, 50, 0] }}
            transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
          />
          <motion.div
            aria-hidden="true"
            variants={product}
            className={cn("pointer-events-none absolute -z-10 hidden size-[280px] xl:block", productClassName)}
          >
            <motion.img
              src={assets[productImage]}
              alt=""
              width={954}
              height={954}
              className="size-full object-contain"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            />
          </motion.div>

          <motion.div
            className="flex min-w-0 flex-col items-start gap-[20px] lg:max-w-[560px]"
            variants={stagger(0.09, 0.2)}
          >
            <motion.div variants={rise}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </motion.div>
            <motion.h2
              id="cta-heading"
              variants={rise}
              className="font-fraunces-light text-[36px] leading-[44px] font-light tracking-[-0.72px] text-white sm:text-[48px] sm:leading-[56px]"
              style={fraunces}
            >
              {heading}
            </motion.h2>
            <motion.p
              variants={rise}
              className="font-manrope-regular text-[16px] leading-[26px] font-normal text-oceno-muted sm:text-[18px] sm:leading-[30px]"
            >
              {description}
            </motion.p>
          </motion.div>

          <div aria-hidden="true" className="hidden flex-1 lg:block" />

          <motion.div
            className="flex w-full flex-col gap-[12px] sm:w-[240px] sm:shrink-0"
            variants={stagger(0.1, 0.45)}
          >
            <motion.div variants={rise}>
              <Button
                href={quote.href}
                variant="light"
                className="w-full justify-center"
                icon={<img src={assets.iconArrowRightDark} alt="" width={18} height={18} className="block size-[18px]" />}
              >
                {quote.label}
              </Button>
            </motion.div>
            <motion.div variants={rise}>
              <Button
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                className="w-full justify-center"
                leadIcon={
                  <img src={assets.iconWhatsappWhite} alt="" width={20} height={20} className="block size-[20px]" />
                }
              >
                {whatsapp.label}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
