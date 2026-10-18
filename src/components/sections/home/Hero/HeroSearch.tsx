import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import FilterChip from "@/components/ui/FilterChip";
import { productSearch } from "@/config/home";
import { assets } from "@/lib/assets";

/** Product finder card overlapping the hero base (Search Card). */
export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category) params.set("category", category);
    const qs = params.toString();
    window.location.assign(qs ? `${productSearch.action}?${qs}` : productSearch.action);
  }

  return (
    <motion.div
      className="relative flex w-full flex-col gap-[18px] rounded-[24px] bg-white px-5 py-6 shadow-oceno-float sm:px-[32px] sm:py-[28px]"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
        <h2 className="font-manrope-semibold text-[20px] leading-[28px] font-semibold tracking-[-0.06px] text-oceno-deep">
          {productSearch.title}
        </h2>
        <Button
          href={productSearch.browseAll.href}
          variant="link"
          icon={<img src={assets.iconArrowRightBlue} alt="" width={18} height={18} className="block size-[18px]" />}
        >
          {productSearch.browseAll.label}
        </Button>
      </div>

      <form
        role="search"
        onSubmit={handleSubmit}
        className="flex w-full items-center gap-[12px] rounded-full border border-oceno-line bg-oceno-surface py-[8px] pr-[8px] pl-[18px] transition-[border-color,box-shadow] duration-200 focus-within:border-oceno-blue focus-within:shadow-[0_0_0_4px_rgba(11,77,245,0.12)] sm:pl-[24px]"
      >
        <img src={assets.iconSearchLarge} alt="" width={22} height={22} className="block size-[22px] shrink-0" />
        <label htmlFor="hero-search" className="sr-only">
          Search products
        </label>
        <input
          id="hero-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={productSearch.placeholder}
          className="min-w-0 flex-1 bg-transparent font-manrope-regular text-[16px] leading-[26px] font-normal text-oceno-ink-strong outline-none placeholder:text-oceno-subtle [&::-webkit-search-cancel-button]:hidden"
        />
        <Button type="submit">Search</Button>
      </form>

      <div className="flex flex-wrap items-center gap-[10px]">
        <p className="font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-slate">Popular:</p>
        {productSearch.popular.map((item) => (
          <FilterChip
            key={item.label}
            label={item.label}
            count={item.count}
            selected={category === item.label}
            onClick={() => setCategory((current) => (current === item.label ? null : item.label))}
          />
        ))}
      </div>
    </motion.div>
  );
}
