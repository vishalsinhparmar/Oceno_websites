import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import ProductCard from "@/components/sections/home/FeaturedProducts/ProductCard";
import IconButton from "@/components/ui/IconButton";
import { catalogueProducts, listingContent, sortOptions, type SortId } from "@/config/products";
import { assets } from "@/lib/assets";
import {
  activeChips,
  applyFilters,
  emptyFilters,
  filtersEqual,
  sortProducts,
  summarise,
  type Filters,
  type ListGroup,
} from "@/lib/catalogue";
import { cn } from "@/lib/cn";
import { easeOut, fraunces, stagger } from "@/lib/motion";
import FiltersPanel from "./FiltersPanel";

type ListingProps = {
  filters: Filters;
  onFiltersChange: (next: Filters) => void;
  query: string;
  onQueryChange: (q: string) => void;
};

const chipText = "font-manrope-semibold text-[13px] leading-[18px] font-semibold tracking-[0.026px] whitespace-nowrap";
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oceno-blue";

/** 1 2 3 … 10 around the current page. */
function pageItems(page: number, count: number): (number | "gap")[] {
  if (count <= 5) return Array.from({ length: count }, (_, i) => i + 1);
  if (page <= 2) return [1, 2, 3, "gap", count];
  if (page >= count - 1) return [1, "gap", count - 2, count - 1, count];
  return [1, "gap", page - 1, page, page + 1, "gap", count];
}

function SortMenu({ value, onChange }: { value: SortId; onChange: (v: SortId) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = sortOptions.find((o) => o.id === value) ?? sortOptions[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-[44px] items-center gap-[10px] rounded-full border border-oceno-line bg-white pr-[16px] pl-[18px] transition-colors hover:border-oceno-ink/30",
          focusRing,
        )}
      >
        <span className={cn(chipText, "text-oceno-deep")}>Sort: {current.label}</span>
        <img
          src={assets.iconChevronDown}
          alt=""
          width={16}
          height={16}
          className={cn("block size-[16px] transition-transform duration-300 ease-out", open && "rotate-180")}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Sort products"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: easeOut }}
            className="absolute top-[calc(100%+8px)] right-0 z-30 w-[232px] origin-top-right rounded-[16px] border border-oceno-line bg-white p-[6px] shadow-oceno-float"
          >
            {sortOptions.map((o) => {
              const selected = o.id === value;
              return (
                <button
                  key={o.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={selected}
                  onClick={() => {
                    onChange(o.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-[10px] px-[12px] py-[10px] text-left transition-colors focus-visible:outline-2 focus-visible:outline-oceno-blue",
                    selected ? "bg-oceno-blue-tint text-oceno-blue" : "text-oceno-ink hover:bg-oceno-surface hover:text-oceno-deep",
                  )}
                >
                  <span className={chipText}>{o.label}</span>
                  {selected && <span aria-hidden="true" className="size-[6px] rounded-full bg-oceno-blue" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ViewToggle({ value, onChange }: { value: "grid" | "list"; onChange: (v: "grid" | "list") => void }) {
  const items = [
    { id: "grid", label: "Grid view", icon: assets.iconGridWhite },
    { id: "list", label: "List view", icon: assets.iconList },
  ] as const;
  return (
    <div role="group" aria-label="Layout" className="flex gap-[10px]">
      {items.map((item) => {
        const active = value === item.id;
        return (
          <button
            key={item.id}
            type="button"
            aria-label={item.label}
            aria-pressed={active}
            onClick={() => onChange(item.id)}
            className={cn(
              "flex size-[44px] items-center justify-center rounded-full border transition-[background-color,border-color,transform] duration-200 ease-out active:scale-95",
              focusRing,
              active ? "border-oceno-deep bg-oceno-deep" : "border-oceno-line bg-white hover:border-oceno-ink/30",
            )}
          >
            {/* Glyphs are recoloured so either can sit on navy or white. */}
            <img src={item.icon} alt="" width={20} height={20} className={cn("block size-[20px] brightness-0", active && "invert")} />
          </button>
        );
      })}
    </div>
  );
}

/** Products listing (Section / Listing): filters sidebar, toolbar, results grid and pagination. */
export default function Listing({ filters, onFiltersChange, query, onQueryChange }: ListingProps) {
  const [draft, setDraft] = useState(filters);
  const [synced, setSynced] = useState(filters);
  const [sort, setSort] = useState<SortId>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [drawer, setDrawer] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Applied filters can change from the hero tabs or chips; reset the draft and page to match.
  if (!filtersEqual(filters, synced)) {
    setSynced(filters);
    setDraft(filters);
    setPage(1);
  }

  const filtered = !filtersEqual(filters, emptyFilters) || query.trim() !== "";
  const results = useMemo(() => {
    const list = sortProducts(applyFilters(catalogueProducts, filters, query), sort);
    if (filtered || page === 1 || list.length === 0) return list;
    // Only the first page ships with the site; later pages rotate it until the full catalogue is wired.
    const offset = ((page - 1) * 2) % list.length;
    return [...list.slice(offset), ...list.slice(0, offset)];
  }, [filters, query, sort, page, filtered]);

  const chips = activeChips(filters);
  const dirty = !filtersEqual(draft, filters);

  useEffect(() => {
    if (!drawer) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [drawer]);

  const scrollToResults = () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const apply = () => {
    onFiltersChange(draft);
    setDrawer(false);
    scrollToResults();
  };
  const clearAll = () => {
    setDraft(emptyFilters);
    onFiltersChange(emptyFilters);
    onQueryChange("");
  };
  const removeChip = (group: ListGroup | "width", value?: string) => {
    if (group === "width") onFiltersChange({ ...filters, width: emptyFilters.width });
    else onFiltersChange({ ...filters, [group]: (filters[group] as string[]).filter((v) => v !== value) });
  };
  const goTo = (p: number) => {
    setPage(Math.min(Math.max(p, 1), listingContent.pageCount));
    scrollToResults();
  };

  const panelProps = { draft, onChange: setDraft, onApply: apply, onClear: clearAll, dirty };
  const countAccent = "font-fraunces-light-italic font-light text-oceno-blue italic";

  return (
    <MotionConfig reducedMotion="user">
      <section aria-label="Product listing" className="bg-white px-5 pt-8 pb-20 sm:px-8 lg:pt-[48px] lg:pb-[120px] xl:px-10 2xl:px-[120px]">
        <div className="flex items-start gap-[32px] xl:gap-[40px]">
          <motion.aside
            aria-label="Filters"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="hidden w-[280px] shrink-0 lg:block"
          >
            <FiltersPanel {...panelProps} />
          </motion.aside>

          <div id="product-results" ref={resultsRef} className="flex min-w-0 flex-1 scroll-mt-[120px] flex-col gap-[24px]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 flex-col gap-[4px]">
                <p aria-live="polite" className="font-manrope-semibold text-[20px] leading-[28px] font-semibold tracking-[-0.06px] text-oceno-deep">
                  {filtered ? (
                    <>
                      <em className={countAccent} style={fraunces}>
                        {results.length}
                      </em>{" "}
                      matching {results.length === 1 ? "product" : "products"}
                    </>
                  ) : (
                    <>
                      Showing {results.length} of{" "}
                      <em className={countAccent} style={fraunces}>
                        {listingContent.total}
                      </em>{" "}
                      products
                    </>
                  )}
                </p>
                <p className="truncate font-manrope-regular text-[14px] leading-[22px] text-oceno-slate">{summarise(filters, query)}</p>
              </div>
              <div className="flex items-center gap-[10px]">
                <button
                  type="button"
                  onClick={() => setDrawer(true)}
                  className={cn(
                    "flex h-[44px] items-center gap-[8px] rounded-full border border-oceno-line bg-white px-[16px] transition-colors hover:border-oceno-ink/30 lg:hidden",
                    focusRing,
                  )}
                >
                  <img src={assets.iconSliders} alt="" width={16} height={16} className="block size-[16px]" />
                  <span className={cn(chipText, "text-oceno-deep")}>Filters</span>
                  {chips.length > 0 && (
                    <span className="flex size-[20px] items-center justify-center rounded-full bg-oceno-blue font-manrope-bold text-[11px] leading-none font-bold text-white">
                      {chips.length}
                    </span>
                  )}
                </button>
                <SortMenu value={sort} onChange={setSort} />
                <div className="ml-auto sm:ml-0">
                  <ViewToggle value={view} onChange={setView} />
                </div>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {chips.length > 0 && (
                <motion.div
                  key="chips"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="-mb-[24px] overflow-hidden"
                >
                  <ul aria-label="Active filters" className="flex flex-wrap items-center gap-[8px] pb-[24px]">
                    <AnimatePresence initial={false}>
                      {chips.map((chip) => (
                        <motion.li
                          key={chip.key}
                          layout
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          transition={{ duration: 0.2, ease: easeOut }}
                        >
                          <button
                            type="button"
                            onClick={() => removeChip(chip.group, chip.value)}
                            aria-label={`Remove ${chip.label} filter`}
                            className={cn("group flex items-center gap-[8px] rounded-full bg-oceno-deep px-[18px] py-[10px] transition-colors hover:bg-oceno-red", focusRing)}
                          >
                            {/* Check swaps to a cross on hover to signal removal. */}
                            <span aria-hidden="true" className="relative size-[16px] shrink-0">
                              <img
                                src={assets.iconCheckWhite}
                                alt=""
                                width={16}
                                height={16}
                                className="absolute inset-0 block size-full transition-[opacity,transform] duration-200 group-hover:scale-50 group-hover:opacity-0"
                              />
                              <span className="absolute inset-0 flex scale-50 items-center justify-center font-manrope-bold text-[16px] leading-none text-white opacity-0 transition-[opacity,transform] duration-200 group-hover:scale-100 group-hover:opacity-100">
                                ×
                              </span>
                            </span>
                            <span className={cn(chipText, "text-white")}>{chip.label}</span>
                          </button>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                    <motion.li layout>
                      <button
                        type="button"
                        onClick={clearAll}
                        className={cn(chipText, "rounded-[4px] px-[4px] text-oceno-blue transition-colors hover:text-oceno-deep", focusRing)}
                      >
                        Clear all
                      </button>
                    </motion.li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {results.length > 0 ? (
              <motion.div
                className={cn("grid gap-[24px]", view === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}
                variants={stagger(0.07)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.05 }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {results.map((p) => (
                    <motion.div
                      key={`${p.id}-${view}`}
                      layout
                      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                      transition={{ layout: { duration: 0.45, ease: easeOut } }}
                      className="flex"
                    >
                      <ProductCard {...p} layout={view} className="w-full" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeOut }}
                className="flex flex-col items-center gap-[12px] rounded-[20px] border border-dashed border-oceno-muted bg-oceno-surface px-6 py-[72px] text-center"
              >
                <p className="font-fraunces-light text-[32px] leading-[38px] font-light tracking-[-0.6px] text-oceno-deep" style={fraunces}>
                  Nothing in that{" "}
                  <em className="font-fraunces-light-italic text-oceno-blue italic" style={fraunces}>
                    combination
                  </em>
                  .
                </p>
                <p className="max-w-[420px] font-manrope-regular text-[16px] leading-[26px] text-oceno-slate">
                  Try removing a filter or widening the size range — most designs can also be made to order in any finish.
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className={cn(
                    "mt-[8px] rounded-full bg-oceno-deep px-[26px] py-[14px] font-manrope-semibold text-[15px] leading-[20px] font-semibold tracking-[0.03px] text-white transition-colors hover:bg-oceno-navy",
                    focusRing,
                  )}
                >
                  Clear all filters
                </button>
              </motion.div>
            )}

            {!filtered && (
              <nav aria-label="Pagination" className="flex items-center justify-center gap-[8px] pt-[24px]">
                <IconButton label="Previous page" onClick={() => goTo(page - 1)} disabled={page === 1}>
                  <img src={assets.iconChevronLeft} alt="" width={20} height={20} className="block size-[20px]" />
                </IconButton>
                {pageItems(page, listingContent.pageCount).map((item, i) =>
                  item === "gap" ? (
                    <span
                      key={`gap-${i}`}
                      aria-hidden="true"
                      className={cn(chipText, "hidden size-[44px] items-center justify-center rounded-[12px] border border-oceno-line bg-white text-oceno-deep sm:flex")}
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      type="button"
                      aria-label={`Page ${item}`}
                      aria-current={item === page ? "page" : undefined}
                      onClick={() => goTo(item)}
                      className={cn(
                        chipText,
                        "flex size-[44px] items-center justify-center rounded-[12px] border transition-[background-color,border-color,color,transform] duration-200 ease-out active:scale-95",
                        focusRing,
                        item === page
                          ? "border-oceno-deep bg-oceno-deep text-white"
                          : "border-oceno-line bg-white text-oceno-deep hover:-translate-y-[2px] hover:border-oceno-ink/30",
                      )}
                    >
                      {item}
                    </button>
                  ),
                )}
                <IconButton label="Next page" tone="dark" onClick={() => goTo(page + 1)} disabled={page === listingContent.pageCount}>
                  <img src={assets.iconChevronRightWhite} alt="" width={20} height={20} className="block size-[20px]" />
                </IconButton>
              </nav>
            )}
          </div>
        </div>

        <AnimatePresence>
          {drawer && (
            <motion.div
              key="drawer"
              className="fixed inset-0 z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setDrawer(false)}
                className="absolute inset-0 bg-oceno-deep/50 backdrop-blur-[2px]"
              />
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Filters"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.4, ease: easeOut }}
                className="absolute inset-y-0 right-0 w-full max-w-[360px] overflow-y-auto bg-white p-3"
              >
                <FiltersPanel {...panelProps} className="border-0 p-[16px]" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </MotionConfig>
  );
}
