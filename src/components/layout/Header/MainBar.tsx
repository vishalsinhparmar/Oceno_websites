import { useCallback, useEffect, useRef, useState } from "react";
import { mainNav, siteConfig } from "@/config/site";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/cn";
import Logo from "@/components/brand/Logo";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import NavLink from "./NavLink";
import MobileMenu from "./MobileMenu";

type MainBarProps = {
  activeHref: string;
};

function MenuIcon({ open }: { open: boolean }) {
  // Drawn to match the OCENO line icon style (1.75 stroke, round caps).
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <g stroke="#081321" strokeWidth="1.75" strokeLinecap="round">
        {open ? (
          <path d="M5 5l10 10M15 5L5 15" />
        ) : (
          <path d="M3.333 5.833h13.334M3.333 10h13.334M3.333 14.167h13.334" />
        )}
      </g>
    </svg>
  );
}

/** Sticky white header bar (Navigation / Header Desktop) with responsive menu. */
export default function MainBar({ activeHref }: MainBarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Expose the bar height so the mobile backdrop can sit beneath it.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() =>
      document.documentElement.style.setProperty("--header-h", `${el.getBoundingClientRect().bottom}px`),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, scrolled]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 80rem)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "sticky top-0 z-50 border-b border-oceno-line bg-white/95 backdrop-blur-md transition-shadow duration-300 supports-[backdrop-filter]:bg-white/90",
        scrolled && "shadow-[0_8px_24px_-16px_rgba(5,11,31,0.25)]",
      )}
    >
      <div className="flex items-center justify-between gap-6 px-5 py-3 sm:px-8 sm:py-[16px] xl:px-10 2xl:px-[120px]">
        <Logo className="h-[40px] w-[133px] sm:h-[48px] sm:w-[160px]" />

        <nav aria-label="Primary" className="hidden items-center gap-[32px] xl:flex">
          {mainNav.map((item) => (
            <NavLink key={item.href} item={item} active={item.href === activeHref} />
          ))}
        </nav>

        <div className="flex items-center gap-[12px]">
          <IconButton label="Search">
            <img src={assets.iconSearch} alt="" width={20} height={20} className="block size-[20px]" />
          </IconButton>
          <IconButton
            label="Chat on WhatsApp"
            href={siteConfig.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex"
          >
            <img src={assets.iconWhatsapp} alt="" width={20} height={20} className="block size-[20px]" />
          </IconButton>
          <Button
            href={siteConfig.quoteHref}
            className="hidden sm:inline-flex"
            icon={<img src={assets.iconArrowRight} alt="" width={18} height={18} className="block size-[18px]" />}
          >
            Get a Quote
          </Button>
          <IconButton
            label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="xl:hidden"
          >
            <MenuIcon open={open} />
          </IconButton>
        </div>
      </div>

      <MobileMenu open={open} activeHref={activeHref} onClose={close} />
    </div>
  );
}
