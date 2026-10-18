import { motion, type Variants } from "motion/react";
import { assets, type AssetKey } from "@/lib/assets";

export type Category = {
  id: string;
  name: string;
  count: number;
  href: string;
  image: AssetKey;
  /** `product` = cut-out render on the surface with a floor shadow; `photo` = full-bleed lifestyle shot. */
  media: "product" | "photo";
  shadow?: AssetKey;
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/** Category tile (Category / *): product media, name, design count and arrow affordance. */
export default function CategoryCard({ name, count, href, image, media, shadow }: Category) {
  return (
    <motion.a
      href={href}
      variants={cardVariants}
      className="group relative flex w-[72%] shrink-0 snap-start flex-col overflow-clip rounded-[20px] border border-oceno-line bg-oceno-surface transition-[border-color,box-shadow,translate] duration-300 ease-out hover:-translate-y-[4px] hover:border-oceno-muted hover:shadow-oceno-float focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oceno-blue sm:w-[42%] md:w-[31%] lg:w-auto lg:min-w-0"
    >
      <div className="relative h-[236px] w-full overflow-clip">
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
                <div className="absolute inset-[-95.59%_-10.31%]">
                  <img
                    src={assets[shadow]}
                    alt=""
                    width={132}
                    height={34}
                    className="block size-full max-w-none transition-[transform,opacity] duration-500 ease-out group-hover:scale-x-[0.86] group-hover:opacity-80"
                  />
                </div>
              </div>
            )}
            <div className="absolute inset-[11.31%_13%_14.69%_13%] transition-transform duration-500 ease-out group-hover:-translate-y-[8px] group-hover:scale-[1.04]">
              <img
                src={assets[image]}
                alt=""
                width={470}
                height={470}
                loading="lazy"
                className="pointer-events-none absolute inset-0 size-full max-w-none object-contain"
              />
            </div>
          </>
        )}
      </div>

      <div className="flex w-full items-center gap-[12px] px-[20px] pt-[4px] pb-[20px]">
        <div className="flex min-w-0 flex-1 flex-col gap-[4px] text-left">
          <p className="font-manrope-semibold text-[20px] leading-[28px] font-semibold tracking-[-0.06px] text-oceno-deep">
            {name}
          </p>
          <p className="font-manrope-regular text-[14px] leading-[22px] font-normal whitespace-nowrap text-oceno-slate">
            {count} designs
          </p>
        </div>
        {/* Decorative: the whole card is the link. */}
        <span
          aria-hidden="true"
          className="flex size-[44px] shrink-0 items-center justify-center rounded-full border border-oceno-line bg-white transition-[background-color,border-color] duration-300 group-hover:border-oceno-blue group-hover:bg-oceno-blue"
        >
          <img
            src={assets.iconArrowUpRight}
            alt=""
            width={20}
            height={20}
            className="block size-[20px] transition-[transform,filter] duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px] group-hover:brightness-0 group-hover:invert"
          />
        </span>
      </div>
    </motion.a>
  );
}
