import { useCallback, useState } from "react";
import { AnimatePresence, motion, type PanInfo, type Variants } from "motion/react";
import { heroContent } from "@/config/home";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/cn";

const easeOut = [0.22, 1, 0.36, 1] as const;
const SLIDE_DURATION_MS = 5500;
const SWIPE_THRESHOLD = 60;

const productVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction * 140,
    rotate: direction * 14,
    scale: 0.78,
    filter: "blur(14px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeOut },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -140,
    rotate: direction * -14,
    scale: 0.78,
    filter: "blur(14px)",
    transition: { duration: 0.55, ease: [0.55, 0, 0.78, 0.2] },
  }),
};

const textVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, y: direction * 14 }),
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
  exit: (direction: number) => ({ opacity: 0, y: direction * -14, transition: { duration: 0.25 } }),
};

/** Product stage: ring, orbit glow and an auto-playing product slider with info cards (Hero Showcase). */
export default function HeroShowcase() {
  const { slides, qcBadge } = heroContent;
  const [[index, direction], setSlide] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const slide = slides[index];
  const total = slides.length;

  const goTo = useCallback(
    (next: number, dir?: number) => {
      const wrapped = (next + total) % total;
      setSlide(([current]) => [wrapped, dir ?? (wrapped >= current ? 1 : -1)]);
    },
    [total],
  );
  const next = () => goTo(index + 1, 1);
  const prev = () => goTo(index - 1, -1);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) next();
    else if (info.offset.x > SWIPE_THRESHOLD) prev();
  };

  const glazeLabel = slide.detail.split("·").pop()?.trim();

  return (
    // Children are positioned as percentages of the 560 × 600 Figma frame so the stage scales fluidly.
    <section
      aria-roledescription="carousel"
      aria-label="Featured products"
      className="relative mx-auto aspect-[560/600] w-full max-w-[560px] lg:mx-0 lg:w-[46%] lg:shrink-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Per-product glow that crossfades with the active glaze. */}
      <div aria-hidden="true" className="absolute inset-[8%] rounded-full">
        {slides.map((s, i) => (
          <motion.div
            key={s.id}
            className="absolute inset-0 rounded-full blur-[60px]"
            style={{ background: `radial-gradient(circle at 50% 45%, ${s.glow} 0%, transparent 65%)` }}
            initial={false}
            animate={{ opacity: i === index ? 1 : 0, scale: i === index ? 1 : 0.85 }}
            transition={{ duration: 1.1, ease: easeOut }}
          />
        ))}
      </div>

      <motion.img
        src={assets.heroRing}
        alt=""
        aria-hidden="true"
        width={520}
        height={520}
        className="absolute top-[5%] left-[3.571%] h-[86.667%] w-[92.857%] max-w-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />
      <motion.img
        src={assets.heroOrbit}
        alt=""
        aria-hidden="true"
        width={540}
        height={540}
        className="absolute top-[3.333%] left-[1.786%] h-[90%] w-[96.429%] max-w-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: easeOut }}
      />
      <div aria-hidden="true" className="absolute top-[78.333%] left-[23.214%] h-[5.667%] w-[53.571%]">
        <motion.img
          src={assets.heroFloorShadow}
          alt=""
          width={348}
          height={82}
          className="absolute inset-[-70.59%_-8%] block h-[241.18%] w-[116%] max-w-none"
          animate={{ scaleX: [1, 0.9, 1], opacity: [1, 0.75, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />
      </div>

      {/* Product stage */}
      <motion.div
        className="absolute top-[6.667%] left-[8.036%] h-[78.333%] w-[83.929%]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: easeOut }}
      >
        <motion.div
          className="relative size-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${total}: ${slide.name}`}
              className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
              custom={direction}
              variants={productVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.35}
              onDragEnd={handleDragEnd}
            >
              <img
                src={assets[slide.image]}
                alt={`${slide.name} in ${glazeLabel}`}
                width={470}
                height={470}
                draggable={false}
                className="pointer-events-none size-full max-w-none object-contain select-none"
                style={{ filter: slide.filter }}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Slide counter + arrows */}
      <motion.div
        className="absolute top-[1%] left-0 flex items-center gap-[10px] sm:top-[3%] sm:left-[-2%]"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: easeOut }}
      >
        <p className="font-manrope-semibold text-[13px] leading-[18px] font-semibold tracking-[0.08em] text-white tabular-nums">
          <span className="relative inline-block h-[18px] w-[18px] overflow-hidden align-top">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.span
                key={index}
                className="absolute inset-0"
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {String(index + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="text-oceno-muted"> / {String(total).padStart(2, "0")}</span>
        </p>
        <div className="flex gap-[6px]">
          {[
            { label: "Previous product", onClick: prev, flip: true },
            { label: "Next product", onClick: next, flip: false },
          ].map(({ label, onClick, flip }) => (
            <motion.button
              key={label}
              type="button"
              aria-label={label}
              onClick={onClick}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="flex size-[36px] items-center justify-center rounded-full border border-white/22 bg-white/10 backdrop-blur-[12px] transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <img
                src={assets.iconArrowRight}
                alt=""
                width={16}
                height={16}
                className={cn("block size-[16px]", flip && "rotate-180")}
              />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Float / Product */}
      <motion.div
        className="absolute bottom-0 left-0 flex items-center gap-[10px] overflow-clip rounded-[18px] border border-white/22 bg-white/10 py-[14px] pr-[16px] pl-[14px] sm:gap-[14px] sm:pr-[20px] backdrop-blur-[12px] sm:top-[78.333%] sm:bottom-auto sm:left-[-5.357%]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: easeOut }}
      >
        <div
          className="relative size-[48px] shrink-0 overflow-clip rounded-[12px] sm:size-[56px]"
          style={{ background: "radial-gradient(circle 31.11px at 28px 24.89px, #fff 0%, #f2f5fa 60%, #e3e9f2 100%)" }}
        >
          <div aria-hidden="true" className="absolute top-[86%] right-1/4 bottom-[-0.29%] left-1/4">
            <img
              src={assets.thumbFloorShadow}
              alt=""
              width={44}
              height={24}
              className="absolute inset-[-100%_-28.57%] block h-[300%] w-[157.14%] max-w-none"
            />
          </div>
          <AnimatePresence initial={false}>
            <motion.img
              key={slide.id}
              src={assets[slide.image]}
              alt=""
              width={50}
              height={50}
              className="pointer-events-none absolute top-[3%] left-[5%] h-[90%] w-[90%] max-w-none object-contain"
              style={{ filter: slide.filter }}
              initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 20 }}
              transition={{ duration: 0.5, ease: easeOut }}
            />
          </AnimatePresence>
        </div>

        <div aria-live={paused ? "polite" : "off"} className="relative min-w-[150px] overflow-hidden sm:min-w-[176px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={slide.id}
              className="flex flex-col gap-[2px] whitespace-nowrap"
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <p className="font-manrope-semibold text-[15px] leading-[20px] font-semibold tracking-[0.03px] text-white">
                {slide.name}
              </p>
              <p className="font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-muted">
                {slide.detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Glaze swatches double as slide indicators. */}
        <div className="flex shrink-0 items-center gap-[2px] sm:gap-[6px]">
          {slides.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.id}
                type="button"
                aria-label={`Show ${s.name}`}
                aria-current={active}
                onClick={() => goTo(i)}
                className="group relative flex size-[18px] items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white"
              >
                {active && (
                  <motion.span
                    layoutId="hero-swatch-ring"
                    className="absolute inset-0 rounded-full border-[1.5px] border-white"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span
                  className={cn(
                    "block size-[12px] rounded-full border border-white/50 transition-transform duration-300 group-hover:scale-110",
                    active ? "scale-100" : "scale-[0.85]",
                  )}
                  style={{ backgroundColor: s.swatch }}
                />
              </button>
            );
          })}
        </div>

        {/* Autoplay progress; finishing the animation advances the slider, and hover/focus pauses it. */}
        <span aria-hidden="true" className="absolute right-0 bottom-0 left-0 h-[2px] bg-white/10">
          <span
            key={slide.id}
            className="block h-full origin-left bg-gradient-to-r from-oceno-blue to-white/80"
            style={{
              animation: `oceno-slide-progress ${SLIDE_DURATION_MS}ms linear forwards`,
              animationPlayState: paused ? "paused" : "running",
            }}
            onAnimationEnd={next}
          />
        </span>
      </motion.div>

      {/* Float / QC */}
      <motion.div
        className="absolute top-[11.667%] right-0 flex items-center gap-[10px] overflow-clip rounded-full bg-white py-[12px] pr-[18px] pl-[12px] shadow-oceno-float sm:right-auto sm:left-[67.857%]"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.9, ease: easeOut },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.7 },
        }}
      >
        <div className="flex size-[36px] shrink-0 items-center justify-center rounded-full bg-oceno-red-soft">
          <img src={assets.iconShieldRed} alt="" width={18} height={18} className="block size-[18px]" />
        </div>
        <div className="flex flex-col whitespace-nowrap">
          <p className="font-manrope-semibold text-[13px] leading-[18px] font-semibold tracking-[0.026px] text-oceno-deep">
            {qcBadge.title}
          </p>
          <p className="font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-slate">{qcBadge.detail}</p>
        </div>
      </motion.div>
    </section>
  );
}
