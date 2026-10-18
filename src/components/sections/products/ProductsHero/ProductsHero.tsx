import { useState, type FormEvent } from "react";
import { MotionConfig, motion, type Variants } from "motion/react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import { productsHeroContent, type CategoryId } from "@/config/products";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { easeOut, fraunces, rise, stagger } from "@/lib/motion";

/** Each heading line slides up from behind a mask. */
const line: Variants = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 0.9, ease: easeOut } },
};

const tab: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const thumbSurface = {
  backgroundImage: "radial-gradient(55.55% 55.55% at 50% 44.44%, #ffffff 0%, #f2f5fa 60%, #e3e9f2 100%)",
} as const;

type ProductsHeroProps = {
  /** Highlighted tab: `all`, a single category, or `null` when several are filtered. */
  activeCategory: CategoryId | "all" | null;
  onCategory: (id: CategoryId | "all") => void;
  query: string;
  onSearch: (query: string) => void;
};

/** Products page hero (Section / Page Hero): breadcrumb, title, search and category strip. */
export default function ProductsHero({ activeCategory, onCategory, query, onSearch }: ProductsHeroProps) {
  const { breadcrumb, current, eyebrow, heading, searchPlaceholder, searchCta, categories } = productsHeroContent;
  const [draft, setDraft] = useState(query);
  const [synced, setSynced] = useState(query);
  // Keep the field in step when the query is cleared elsewhere (e.g. "Clear all").
  if (query !== synced) {
    setSynced(query);
    setDraft(query);
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(draft);
    document.getElementById("product-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="products-hero-heading"
        className="flex flex-col gap-[24px] bg-oceno-surface px-5 pt-8 pb-10 sm:px-8 sm:pt-10 lg:pt-[48px] lg:pb-[56px] xl:px-10 2xl:px-[120px]"
      >
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut }}>
          <Breadcrumb items={breadcrumb} current={current} tone="light" />
        </motion.div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <motion.div
            className="flex max-w-[720px] min-w-0 flex-col items-start gap-[12px]"
            variants={stagger(0.1, 0.05)}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={rise}>
              <Eyebrow tone="light">{eyebrow}</Eyebrow>
            </motion.div>
            <motion.h1
              id="products-hero-heading"
              className="font-fraunces-light text-[40px] leading-[46px] font-light tracking-[-1.28px] text-oceno-deep sm:text-[52px] sm:leading-[58px] xl:text-[64px] xl:leading-[70px]"
              style={fraunces}
              variants={stagger(0.12)}
            >
              <span className="block overflow-hidden pb-[6px]">
                <motion.span className="block" variants={line}>
                  {heading.before}
                  <em className="font-fraunces-light-italic text-oceno-blue italic" style={fraunces}>
                    {heading.accent}
                  </em>
                  {heading.after}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[6px]">
                <motion.span className="block" variants={line}>
                  {heading.secondLine}
                </motion.span>
              </span>
            </motion.h1>
          </motion.div>

          <motion.form
            role="search"
            onSubmit={submit}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: easeOut }}
            className="flex w-full shrink-0 items-center gap-[12px] rounded-full bg-white py-[8px] pr-[8px] pl-[20px] shadow-[0px_2px_3px_rgba(8,19,46,0.05),0px_12px_16px_rgba(8,19,46,0.1)] transition-shadow duration-300 focus-within:shadow-[0_0_0_2px_rgba(11,77,245,0.35),0px_12px_24px_rgba(8,19,46,0.14)] sm:pl-[24px] lg:mb-[6px] lg:w-[420px] xl:w-[480px]"
          >
            <img src={assets.iconSearchLarge} alt="" width={22} height={22} className="block size-[22px] shrink-0" />
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <input
              id="product-search"
              type="search"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                if (!e.target.value) onSearch("");
              }}
              placeholder={searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent font-manrope-regular text-[16px] leading-[26px] text-oceno-deep outline-none placeholder:text-oceno-subtle [&::-webkit-search-cancel-button]:hidden"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-oceno-blue px-[20px] py-[14px] font-manrope-semibold text-[15px] leading-[20px] font-semibold tracking-[0.03px] text-white transition-[background-color,box-shadow,transform] duration-200 hover:bg-oceno-blue-hover hover:shadow-[0_8px_20px_-8px_rgba(11,77,245,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oceno-blue active:scale-[0.98] sm:px-[26px]"
            >
              {searchCta}
            </button>
          </motion.form>
        </div>

        <motion.div
          role="group"
          aria-label="Browse by category"
          className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-[12px] overflow-x-auto px-5 pt-[16px] pb-1 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 xl:mx-0 xl:gap-[16px] xl:overflow-visible xl:px-0 [&::-webkit-scrollbar]:hidden"
          variants={stagger(0.06, 0.4)}
          initial="hidden"
          animate="show"
        >
          {categories.map((c) => {
            const active = activeCategory === c.id;
            return (
              <motion.button
                key={c.id}
                type="button"
                variants={tab}
                aria-pressed={active}
                onClick={() => onCategory(c.id)}
                className={cn(
                  "group flex min-w-[188px] flex-1 shrink-0 snap-start items-center gap-[12px] rounded-[16px] border py-[10px] pr-[16px] pl-[10px] text-left transition-[background-color,border-color,box-shadow,translate] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oceno-blue xl:min-w-0",
                  active
                    ? "border-oceno-deep bg-oceno-deep"
                    : "border-oceno-line bg-white hover:-translate-y-[2px] hover:border-oceno-muted hover:shadow-[0_10px_24px_-14px_rgba(8,19,46,0.35)]",
                )}
              >
                <span
                  className="relative size-[44px] shrink-0 overflow-clip rounded-[10px]"
                  style={c.thumb === "product" ? thumbSurface : undefined}
                >
                  {c.thumb === "photo" ? (
                    <img
                      src={assets[c.image]}
                      alt=""
                      width={88}
                      height={88}
                      className="absolute inset-0 size-full max-w-none rounded-[10px] object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <>
                      <span aria-hidden="true" className="absolute top-[86%] right-1/4 bottom-[-4.18%] left-1/4">
                        <span className="absolute inset-[-100%_-36.36%]">
                          <img src={assets.thumbFloorShadowDark} alt="" className="block size-full max-w-none" />
                        </span>
                      </span>
                      <span className="absolute inset-[3%_5%_7%_5%] transition-transform duration-500 ease-out group-hover:-translate-y-[2px] group-hover:scale-110">
                        <img
                          src={assets[c.image]}
                          alt=""
                          width={88}
                          height={88}
                          className="absolute inset-0 size-full max-w-none object-contain"
                        />
                      </span>
                    </>
                  )}
                </span>
                <span className="flex min-w-0 flex-col whitespace-nowrap">
                  <span
                    className={cn(
                      "font-manrope-semibold text-[13px] leading-[18px] font-semibold tracking-[0.026px] transition-colors",
                      active ? "text-white" : "text-oceno-deep",
                    )}
                  >
                    {c.label}
                  </span>
                  <span
                    className={cn(
                      "font-manrope-regular text-[14px] leading-[22px] transition-colors",
                      active ? "text-oceno-muted" : "text-oceno-slate",
                    )}
                  >
                    {c.count} designs
                  </span>
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </section>
    </MotionConfig>
  );
}
