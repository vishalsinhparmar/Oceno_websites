import { useState } from "react";
import { motion, type Variants } from "motion/react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { assets, type AssetKey } from "@/lib/assets";

export type Product = {
  id: string;
  category: string;
  name: string;
  size: string;
  finish: string;
  swatch: AssetKey;
  badge?: "new" | "bestseller" | "export";
  image: AssetKey;
  /** `product` = cut-out on the radial surface with a floor shadow; `photo` = full-bleed shot. */
  media: "product" | "photo";
  shadow?: AssetKey;
  href: string;
};

/** Floor shadow SVGs carry blur padding; these insets keep the ellipse in its 50% × 5% slot. */
const shadowInset: Partial<Record<AssetKey, string>> = {
  productFloorShadow: "inset-[-86.67%_-8.91%]",
  productFloorShadowWide: "inset-[-86.67%_-8.05%]",
  productFloorShadowSoft: "inset-[-86.67%_-9.07%]",
  productFloorShadowDeep: "inset-[-86.67%_-9.07%]",
};

const badges = {
  new: { label: "New", className: "bg-oceno-red text-white" },
  bestseller: { label: "Bestseller", className: "bg-oceno-deep text-white" },
  export: { label: "Export Grade", className: "bg-oceno-blue-tint text-oceno-blue" },
} as const;

const surface = {
  backgroundImage: "radial-gradient(55.55% 55.55% at 50% 44.44%, #ffffff 0%, #f2f5fa 60%, #e3e9f2 100%)",
} as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/** Product card (Card / Product). Hover lifts the product and reveals Quick view / Enquire. */
export default function ProductCard({
  category,
  name,
  size,
  finish,
  swatch,
  badge,
  image,
  media,
  shadow,
  href,
  layout = "grid",
  className,
}: Product & { className?: string; layout?: "grid" | "list" }) {
  const list = layout === "list";
  const [saved, setSaved] = useState(false);

  return (
    <motion.article
      variants={cardVariants}
      className={cn(
        "group relative flex shrink-0 snap-start overflow-clip rounded-[20px] border border-oceno-line bg-white transition-[border-color,box-shadow,translate] duration-300 ease-out hover:-translate-y-[4px] hover:border-oceno-muted hover:shadow-oceno-float has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-oceno-blue",
        list ? "flex-col sm:flex-row" : "flex-col",
        className,
      )}
    >
      <div
        className={cn("relative h-[288px] w-full shrink-0 overflow-clip", list && "sm:h-auto sm:min-h-[248px] sm:w-[44%] sm:max-w-[340px]")}
        style={media === "product" ? surface : undefined}>
        {media === "photo" ? (
          <img
            src={assets[image]}
            alt=""
            width={1000}
            height={1000}
            loading="lazy"
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <>
            {shadow && (
              <div aria-hidden="true" className="absolute top-[86%] right-1/4 bottom-[9%] left-1/4">
                <div className={cn("absolute", shadowInset[shadow])}>
                  <img
                    src={assets[shadow]}
                    alt=""
                    className="block size-full max-w-none transition-[transform,opacity] duration-500 ease-out group-hover:scale-x-[0.86] group-hover:opacity-80"
                  />
                </div>
              </div>
            )}
            <div className="absolute inset-[11.92%_14%_16.08%_14%] transition-transform duration-500 ease-out group-hover:-translate-y-[10px] group-hover:scale-[1.04]">
              <img
                src={assets[image]}
                alt=""
                width={940}
                height={940}
                loading="lazy"
                className="pointer-events-none absolute inset-0 size-full max-w-none object-contain"
              />
            </div>
          </>
        )}

        {badge && (
          <span
            className={cn(
              "absolute top-[16px] left-[16px] rounded-full px-[10px] py-[5px] font-manrope-bold text-[11px] leading-[16px] font-bold tracking-[0.33px] whitespace-nowrap uppercase",
              badges[badge].className,
            )}
          >
            {badges[badge].label}
          </span>
        )}

        <button
          type="button"
          aria-pressed={saved}
          aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
          onClick={() => setSaved((v) => !v)}
          className={cn(
            "absolute top-[16px] right-[14px] z-10 flex size-[44px] items-center justify-center rounded-full border transition-[background-color,border-color,transform] duration-200 ease-out active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oceno-blue",
            saved ? "border-oceno-red bg-oceno-red" : "border-oceno-line bg-white hover:border-oceno-ink/30",
          )}
        >
          <img
            src={assets.iconHeart}
            alt=""
            width={20}
            height={20}
            className={cn("block size-[20px]", saved && "brightness-0 invert")}
          />
        </button>

        {/* Revealed on hover / keyboard focus; the Details link covers touch devices. */}
        <div className="absolute bottom-[16px] left-1/2 z-10 flex -translate-x-1/2 translate-y-[72px] gap-[8px] opacity-0 transition-[translate,opacity] duration-300 ease-out group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
          <Button href={href} variant="dark">
            Quick view
          </Button>
          <Button
            href={`/enquiry?product=${encodeURIComponent(name)}`}
            icon={<img src={assets.iconArrowRight} alt="" width={18} height={18} className="block size-[18px]" />}
          >
            Enquire
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "flex w-full flex-col items-start gap-[8px] px-[22px] pt-[20px] pb-[22px] text-left",
          list && "sm:justify-center sm:px-[32px] sm:py-[28px]",
        )}
      >
        <p className="font-manrope-medium text-[12px] leading-[16px] font-medium tracking-[0.36px] whitespace-nowrap text-oceno-blue uppercase">
          {category}
        </p>
        <h3 className="w-full font-manrope-semibold text-[20px] leading-[28px] font-semibold tracking-[-0.06px] text-oceno-deep">
          {name}
        </h3>
        <div className="flex w-full items-center gap-[8px]">
          <img src={assets.iconRuler} alt="" width={16} height={16} className="block size-[16px] shrink-0" />
          <p className="font-manrope-regular text-[14px] leading-[22px] font-normal whitespace-nowrap text-oceno-slate">
            <span className="sr-only">Dimensions: </span>
            {size}
          </p>
        </div>
        <div aria-hidden="true" className="h-[4px] w-[10px]" />
        <div aria-hidden="true" className="h-px w-full bg-oceno-line" />
        <div className="flex w-full items-center justify-between gap-3 pt-[4px]">
          <div className="flex min-w-0 items-center gap-[8px]">
            <img src={assets[swatch]} alt="" width={14} height={14} className="block size-[14px] shrink-0" />
            <p className="truncate font-manrope-semibold text-[13px] leading-[18px] font-semibold tracking-[0.026px] text-oceno-ink">
              {finish}
            </p>
          </div>
          {/* Stretched link: the whole card opens the product page. */}
          <a
            href={href}
            aria-label={`${name} details`}
            className="inline-flex shrink-0 items-center gap-[10px] py-[6px] text-oceno-blue outline-none after:absolute after:inset-0 after:content-[''] hover:text-oceno-deep"
          >
            <span className="font-manrope-semibold text-[15px] leading-[20px] font-semibold tracking-[0.03px] whitespace-nowrap">
              Details
            </span>
            <img
              src={assets.iconArrowRightBlue}
              alt=""
              width={18}
              height={18}
              className="block size-[18px] transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
            />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
