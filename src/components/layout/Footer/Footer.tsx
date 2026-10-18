import { MotionConfig, motion } from "motion/react";
import Logo from "@/components/brand/Logo";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import IconButton from "@/components/ui/IconButton";
import { footerContent, siteConfig } from "@/config/site";
import { assets } from "@/lib/assets";
import { fraunces, rise, stagger } from "@/lib/motion";
import Newsletter from "./Newsletter";

const linkClass =
  "font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-muted transition-[color,translate] duration-200 ease-out hover:translate-x-[2px] hover:text-white focus-visible:text-white focus-visible:outline-none";

const headingClass =
  "font-manrope-medium text-[12px] leading-[16px] font-medium tracking-[0.36px] text-white uppercase";

/** Site footer: newsletter, link columns, contact and legal bar. */
export default function Footer() {
  const { newsletter, about, address, social, columns, legal, copyright, madeIn } = footerContent;

  return (
    <MotionConfig reducedMotion="user">
      <footer className="relative isolate overflow-hidden bg-oceno-navy px-5 pt-16 pb-8 sm:px-8 lg:pt-[80px] lg:pb-[32px] xl:px-10 2xl:px-[120px]">
        <motion.img
          src={assets.footerGlow}
          alt=""
          aria-hidden="true"
          width={900}
          height={600}
          className="pointer-events-none absolute top-[-260px] left-[30%] -z-10 h-[600px] w-[900px] max-w-none md:left-[51%]"
          animate={{ x: [0, -90, 0], opacity: [1, 0.7, 1] }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
        />

        <motion.div
          className="flex flex-col gap-12 lg:gap-[56px]"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div variants={rise} className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-[40px]">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-[10px]">
              <Eyebrow>{newsletter.eyebrow}</Eyebrow>
              <h2
                className="font-fraunces-regular text-[32px] leading-[40px] font-normal tracking-[-0.44px] text-white sm:text-[44px] sm:leading-[52px]"
                style={fraunces}
              >
                {newsletter.title}
              </h2>
            </div>
            <Newsletter />
          </motion.div>

          <div aria-hidden="true" className="h-px w-full bg-oceno-deep-line" />

          <motion.div
            variants={rise}
            className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:flex lg:items-start lg:gap-[40px]"
          >
            <div className="col-span-2 flex flex-col items-start gap-[20px] md:col-span-3 lg:w-[300px] lg:shrink-0">
              <Logo tone="white" className="h-[51px] w-[170px]" />
              <p className="max-w-[360px] font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-muted">
                {about}
              </p>
              <ul className="flex gap-[10px]">
                {social.map((s) => (
                  <li key={s.label}>
                    <IconButton
                      href={s.href}
                      label={`OCENO on ${s.label}`}
                      tone="glass"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:-translate-y-[2px]"
                    >
                      <img src={assets[s.icon]} alt="" width={20} height={20} className="block size-[20px]" />
                    </IconButton>
                  </li>
                ))}
              </ul>
            </div>

            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title} className="flex min-w-0 flex-col gap-[14px] lg:flex-1">
                <p className={headingClass}>{col.title}</p>
                <ul className="flex flex-col gap-[14px]">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className={`inline-block ${linkClass}`}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="col-span-2 flex flex-col items-start gap-[14px] md:col-span-3 lg:w-[240px] lg:shrink-0">
              <p className={headingClass}>Get in touch</p>
              <address className="flex w-full flex-col gap-[14px] not-italic">
                <p className="flex w-full items-start gap-[10px]">
                  <img src={assets.iconMapPinBlue} alt="" width={18} height={18} className="mt-[2px] block size-[18px] shrink-0" />
                  <span className="font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-muted">{address}</span>
                </p>
                <a href={siteConfig.phone.href} className={`flex items-start gap-[10px] ${linkClass}`}>
                  <img src={assets.iconPhoneBlue} alt="" width={18} height={18} className="mt-[2px] block size-[18px] shrink-0" />
                  {siteConfig.phone.display}
                </a>
                <a href={siteConfig.email.href} className={`flex items-start gap-[10px] ${linkClass}`}>
                  <img src={assets.iconMailBlue} alt="" width={18} height={18} className="mt-[2px] block size-[18px] shrink-0" />
                  {siteConfig.email.display}
                </a>
              </address>
              <Button
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                leadIcon={<img src={assets.iconWhatsappWhite} alt="" width={20} height={20} className="block size-[20px]" />}
                icon={<img src={assets.iconArrowRight} alt="" width={18} height={18} className="block size-[18px]" />}
              >
                Chat on WhatsApp
              </Button>
            </div>
          </motion.div>

          <div aria-hidden="true" className="h-px w-full bg-oceno-deep-line" />
        </motion.div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between lg:mt-[32px]">
          <p className="font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-subtle">{copyright}</p>
          <nav aria-label="Legal">
            <ul className="flex items-center gap-[10px] font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-subtle">
              {legal.map((item, i) => (
                <li key={item.label} className="flex items-center gap-[10px]">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  <a href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="flex items-center gap-[8px] font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-muted">
            <img src={assets.brandWave} alt="" aria-hidden="true" width={160} height={24} className="block h-[6px] w-[40px]" />
            {madeIn}
          </p>
        </div>
      </footer>
    </MotionConfig>
  );
}
