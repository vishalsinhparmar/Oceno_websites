import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import IconButton from "@/components/ui/IconButton";
import { aboutHeroContent } from "@/config/about";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";

const SLIDE_MS = 5500;
const SWIPE_PX = 60;

/** Enter wipes in from the travel direction; the outgoing slide stays underneath until covered. */
const slideVariants = {
  enter: (dir: number) => ({
    clipPath: dir > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
    zIndex: 2,
  }),
  center: {
    clipPath: "inset(0% 0% 0% 0%)",
    zIndex: 2,
    transition: { duration: 0.95, ease: easeOut },
  },
  exit: { zIndex: 1, opacity: 0.6, transition: { duration: 0.95 } },
};

/** Hero Media as an autoplaying, swipeable photo slider with caption tag and progress. */
export default function HeroSlider() {
  const { slides } = aboutHeroContent;
  const reduce = useReducedMotion();
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const paused = hovered || hidden || !!reduce;
  const slide = slides[index];

  const go = useCallback(
    (target: number, direction?: number) => {
      setState(([current]) => {
        const next = (target + slides.length) % slides.length;
        return [next, direction ?? (next > current ? 1 : -1)];
      });
    },
    [slides.length],
  );
  const next = useCallback(() => setState(([i]) => [(i + 1) % slides.length, 1]), [slides.length]);
  const prev = useCallback(() => setState(([i]) => [(i - 1 + slides.length) % slides.length, -1]), [slides.length]);

  // Pause autoplay while the tab is in the background.
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_PX || info.velocity.x < -400) next();
    else if (info.offset.x > SWIPE_PX || info.velocity.x > 400) prev();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") next();
    if (event.key === "ArrowLeft") prev();
  };

  return (
    <motion.div
      role="region"
      aria-roledescription="carousel"
      aria-label="OCENO in pictures"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="relative aspect-[520/460] w-full shrink-0 overflow-clip rounded-[24px] bg-oceno-deep-line shadow-[0_40px_80px_-32px_rgba(0,0,0,0.6)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oceno-blue-bright sm:rounded-[28px] lg:w-[46%] lg:max-w-[520px] xl:w-[520px]"
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.25, ease: easeOut }}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={slide.id}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
        >
          <motion.img
            src={assets[slide.image]}
            alt={slide.alt}
            width={1200}
            height={1500}
            draggable={false}
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
            initial={{ scale: 1.14 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: SLIDE_MS / 1000 + 1, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Swipe surface */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={onDragEnd}
      />

      {/* Legibility scrims for controls and tag */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[96px] bg-gradient-to-b from-[rgba(5,11,31,0.35)] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[140px] bg-gradient-to-t from-[rgba(5,11,31,0.45)] to-transparent"
      />

      {/* Counter + arrows */}
      <div className="absolute top-4 right-4 left-4 z-20 flex items-center justify-between sm:top-[20px] sm:right-[20px] sm:left-[24px]">
        <p className="rounded-full bg-white/[0.14] px-[12px] py-[6px] font-manrope-semibold text-[13px] leading-[18px] font-semibold tracking-[0.026px] text-white tabular-nums backdrop-blur-[12px]">
          <span className="sr-only">Slide </span>
          {String(index + 1).padStart(2, "0")}
          <span className="text-white/60"> / {String(slides.length).padStart(2, "0")}</span>
        </p>
        <div className="flex gap-[8px]">
          <IconButton label="Previous photo" tone="glass" onClick={prev} className="backdrop-blur-[12px]">
            <img
              src={assets.iconChevronRightWhite}
              alt=""
              width={20}
              height={20}
              className="block size-[20px] -scale-x-100"
            />
          </IconButton>
          <IconButton label="Next photo" tone="glass" onClick={next} className="backdrop-blur-[12px]">
            <img src={assets.iconChevronRightWhite} alt="" width={20} height={20} className="block size-[20px]" />
          </IconButton>
        </div>
      </div>

      {/* Caption tag */}
      <div className="pointer-events-none absolute bottom-[44px] left-4 z-20 sm:bottom-[46px] sm:left-[24px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.id}
            className="flex items-center gap-[10px] overflow-clip rounded-full bg-white py-[12px] pr-[18px] pl-[12px] shadow-oceno-float"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, delay: 0.35, ease: easeOut } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
          >
            <span className="flex size-[36px] shrink-0 items-center justify-center rounded-full bg-oceno-blue-tint">
              <img src={assets[slide.icon]} alt="" width={18} height={18} className="block size-[18px]" />
            </span>
            <span className="flex flex-col whitespace-nowrap">
              <span className="font-manrope-semibold text-[13px] leading-[18px] font-semibold tracking-[0.026px] text-oceno-deep">
                {slide.title}
              </span>
              <span className="font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-slate">
                {slide.detail}
              </span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Segmented progress; the active segment's fill drives autoplay. */}
      <div className="absolute right-4 bottom-[18px] left-4 z-20 flex gap-[6px] sm:right-[24px] sm:left-[24px]">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Show photo ${i + 1}: ${s.title}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => go(i)}
            className="group flex h-[12px] flex-1 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/30 transition-[height] duration-200 group-hover:h-[5px]">
              {i < index && <span className="absolute inset-0 bg-white" />}
              {i === index && (
                <span
                  key={`${s.id}-${index}`}
                  className={cn("absolute inset-0 origin-left bg-white", reduce && "scale-x-100")}
                  style={
                    reduce
                      ? undefined
                      : {
                          animation: `oceno-slide-progress ${SLIDE_MS}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }
                  }
                  onAnimationEnd={next}
                />
              )}
            </span>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {slide.title}. {slide.detail}
      </p>
    </motion.div>
  );
}
