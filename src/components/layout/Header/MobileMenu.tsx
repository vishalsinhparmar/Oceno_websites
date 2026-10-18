import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { mainNav, siteConfig } from "@/config/site";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";

type MobileMenuProps = {
  open: boolean;
  activeHref: string;
  onClose: () => void;
};

/** Slide-down navigation panel for viewports below the desktop breakpoint. */
export default function MobileMenu({ open, activeHref, onClose }: MobileMenuProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 top-[var(--header-h)] z-40 bg-oceno-navy/40 backdrop-blur-[2px] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.nav
            key="panel"
            id="mobile-menu"
            aria-label="Mobile"
            className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-b border-oceno-line bg-white shadow-[0_24px_48px_-24px_rgba(5,11,31,0.35)] xl:hidden"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col px-5 py-3 sm:px-8">
              {mainNav.map((item, i) => {
                const active = item.href === activeHref;
                return (
                  <motion.li
                    key={item.href}
                    initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.2 }}
                    className="border-b border-oceno-line last:border-b-0"
                  >
                    <a
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={onClose}
                      className="flex items-center justify-between py-4"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className={cn("h-[18px] w-[2px] rounded-[2px]", active ? "bg-oceno-red" : "bg-transparent")}
                        />
                        <span
                          className={cn(
                            "font-manrope-medium text-[15px] leading-[20px] font-medium",
                            active ? "text-oceno-blue" : "text-oceno-ink",
                          )}
                        >
                          {item.label}
                        </span>
                      </span>
                      {item.hasDropdown && (
                        <img
                          src={active ? assets.chevronActive : assets.chevronDefault}
                          alt=""
                          aria-hidden="true"
                          width={16}
                          height={16}
                          className="block size-[16px] -rotate-90"
                        />
                      )}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
            <div className="flex flex-col gap-3 border-t border-oceno-line px-5 py-5 sm:hidden">
              <Button
                href={siteConfig.quoteHref}
                className="justify-center"
                icon={<img src={assets.iconArrowRight} alt="" width={18} height={18} className="block size-[18px]" />}
              >
                Get a Quote
              </Button>
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-[10px] rounded-full border border-oceno-line px-[26px] py-[13px] font-manrope-semibold text-[15px] leading-[20px] font-semibold tracking-[0.03px] text-oceno-ink"
              >
                <img src={assets.iconWhatsapp} alt="" width={20} height={20} className="block size-[20px]" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
