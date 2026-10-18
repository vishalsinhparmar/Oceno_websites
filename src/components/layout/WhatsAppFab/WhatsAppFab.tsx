import { MotionConfig, motion } from "motion/react";
import { siteConfig } from "@/config/site";
import { assets } from "@/lib/assets";

/** Floating WhatsApp button (Contact / WhatsApp FAB). Hover or focus expands the label. */
export default function WhatsAppFab() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.a
        href={siteConfig.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with OCENO on WhatsApp"
        className="group fixed right-4 bottom-4 z-50 flex items-center rounded-full bg-oceno-whatsapp p-[16px] text-white [filter:drop-shadow(0px_4px_6px_rgba(8,19,46,0.06))_drop-shadow(0px_24px_32px_rgba(8,19,46,0.16))] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oceno-whatsapp sm:right-6 sm:bottom-6"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 22, delay: 1.2 }}
        whileTap={{ scale: 0.94 }}
      >
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full bg-oceno-whatsapp"
          animate={{ scale: [1, 1.55], opacity: [0.45, 0] }}
          transition={{ duration: 2.2, ease: "easeOut", repeat: Infinity, repeatDelay: 1.6, delay: 2 }}
        />
        <img src={assets.iconWhatsappFab} alt="" width={28} height={28} className="block size-[28px] shrink-0" />
        <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-out group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
          <span className="overflow-hidden">
            <span className="block pr-[6px] pl-[10px] font-manrope-semibold text-[15px] leading-[20px] font-semibold tracking-[0.03px] whitespace-nowrap">
              Chat with us
            </span>
          </span>
        </span>
      </motion.a>
    </MotionConfig>
  );
}
