import { useCallback, useEffect, useRef, useState } from "react";
import { MotionConfig, motion, type Variants } from "motion/react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import FilterChip from "@/components/ui/FilterChip";
import IconButton from "@/components/ui/IconButton";
import { featuredContent } from "@/config/home";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/cn";
import ProductCard from "./ProductCard";

const fraunces = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;
const easeOut = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const track: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

type FilterId = (typeof featuredContent.filters)[number]["id"];

/** Home "Bestsellers & new arrivals" section (Section / Featured Products). */
export default function FeaturedProducts() {
  const { eyebrow, cta, filters, products } = featuredContent;
  const [filter, setFilter] = useState<FilterId>("all");
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const visible = filter === "all" ? products : products.filter((p) => p.filter === filter);

  /** One page = one viewport of cards plus the trailing gap. */
  const metrics = useCallback(() => {
    const el = trackRef.current;
    if (!el) return null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = el.clientWidth + gap;
    const max = el.scrollWidth - el.clientWidth;
    return { el, step, max };
  }, []);

  const sync = useCallback(() => {
    const m = metrics();
    if (!m) return;
    const count = m.max <= 1 ? 1 : Math.ceil(m.max / m.step - 0.02) + 1;
    const current = m.el.scrollLeft >= m.max - 2 ? count - 1 : Math.round(m.el.scrollLeft / m.step);
    setPages(count);
    setPage(Math.min(current, count - 1));
  }, [metrics]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [filter, sync]);

  const goTo = (index: number) => {
    const m = metrics();
    if (!m) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    m.el.scrollTo({ left: Math.min(index * m.step, m.max), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="featured-heading"
        className="flex flex-col gap-8 overflow-hidden bg-oceno-surface px-5 py-16 sm:px-8 sm:py-20 lg:gap-[40px] lg:py-[120px] xl:px-10 2xl:px-[120px]"
      >
        <motion.div
          className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between md:gap-[40px]"
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="flex max-w-[720px] flex-col items-start gap-[16px]">
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
            <h2
              id="featured-heading"
              className="font-fraunces-regular text-[34px] leading-[42px] font-normal tracking-[-0.44px] text-oceno-deep sm:text-[44px] sm:leading-[52px]"
              style={fraunces}
            >
              Pieces our partners{" "}
              <em className="font-fraunces-light-italic font-light text-oceno-blue italic" style={fraunces}>
                re-order
              </em>{" "}
              most.
            </h2>
          </div>
          <Button
            href={cta.href}
            variant="dark"
            icon={<img src={assets.iconArrowRight} alt="" width={18} height={18} className="block size-[18px]" />}
          >
            {cta.label}
          </Button>
        </motion.div>

        <motion.div
          role="group"
          aria-label="Filter products by category"
          className="-mx-5 flex gap-[10px] overflow-x-auto px-5 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0 [&::-webkit-scrollbar]:hidden"
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          {filters.map((f) => (
            <FilterChip
              key={f.id}
              label={f.label}
              appearance="solid"
              selected={filter === f.id}
              onClick={() => setFilter(f.id)}
            />
          ))}
        </motion.div>

        {/* Keyed by filter so each selection restarts at page one with a fresh stagger. */}
        <motion.div
          key={filter}
          ref={trackRef}
          onScroll={sync}
          aria-live="polite"
          className="-mx-5 -my-4 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 py-4 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:scroll-px-0 lg:gap-[24px] lg:px-0 [&::-webkit-scrollbar]:hidden"
          variants={track}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {visible.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              className="w-[80%] sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-48px)/3)] xl:w-[calc((100%-72px)/4)]"
            />
          ))}
        </motion.div>

        {pages > 1 && (
          <div className="flex items-center justify-center gap-[12px]">
            <IconButton label="Previous products" disabled={page === 0} onClick={() => goTo(page - 1)}>
              <img src={assets.iconChevronLeft} alt="" width={20} height={20} className="block size-[20px]" />
            </IconButton>
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to page ${i + 1} of ${pages}`}
                aria-current={i === page ? "true" : undefined}
                onClick={() => goTo(i)}
                className="group/dot flex h-[24px] items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oceno-blue"
              >
                <span
                  className={cn(
                    "block h-[8px] rounded-[4px] transition-[width,background-color] duration-300 ease-out",
                    i === page ? "w-[28px] bg-oceno-blue" : "w-[8px] bg-oceno-muted group-hover/dot:bg-oceno-subtle",
                  )}
                />
              </button>
            ))}
            <IconButton
              label="Next products"
              tone="dark"
              disabled={page >= pages - 1}
              onClick={() => goTo(page + 1)}
            >
              <img src={assets.iconChevronRightWhite} alt="" width={20} height={20} className="block size-[20px]" />
            </IconButton>
          </div>
        )}
      </section>
    </MotionConfig>
  );
}
