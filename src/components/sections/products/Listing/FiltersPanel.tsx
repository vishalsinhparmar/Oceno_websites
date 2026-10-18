import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { filterGroups } from "@/config/products";
import { assets } from "@/lib/assets";
import { toggleValue, type Filters, type ListGroup } from "@/lib/catalogue";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";

type FiltersPanelProps = {
  draft: Filters;
  onChange: (next: Filters) => void;
  onApply: () => void;
  onClear: () => void;
  /** Draft differs from the applied filters. */
  dirty: boolean;
  className?: string;
};

function Section({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="border-t border-oceno-line py-[20px]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between rounded-[6px] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oceno-blue"
      >
        <span className="font-manrope-semibold text-[15px] leading-[20px] font-semibold tracking-[0.03px] text-oceno-deep">{title}</span>
        {/* Two minus strokes: the second rotates upright to form a plus while collapsed. */}
        <span aria-hidden="true" className="relative size-[16px] shrink-0 group-hover:brightness-50">
          <img src={assets.iconMinus} alt="" width={16} height={16} className="absolute inset-0 block size-full" />
          <img
            src={assets.iconMinus}
            alt=""
            width={16}
            height={16}
            className={cn("absolute inset-0 block size-full transition-transform duration-300 ease-out", !open && "rotate-90")}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="overflow-hidden"
          >
            <div className="flex flex-col items-start gap-[14px] pt-[14px]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Checkbox({ label, count, checked, onToggle }: { label: string; count: number; checked: boolean; onToggle: () => void }) {
  return (
    <label className="group flex cursor-pointer items-center gap-[12px]">
      <input type="checkbox" checked={checked} onChange={onToggle} className="peer sr-only" />
      <span
        aria-hidden="true"
        className={cn(
          "flex size-[20px] shrink-0 items-center justify-center rounded-[6px] transition-[background-color,border-color,box-shadow] duration-200 peer-focus-visible:shadow-[0_0_0_3px_rgba(11,77,245,0.3)]",
          checked ? "bg-oceno-blue" : "border-[1.5px] border-oceno-muted bg-white group-hover:border-oceno-blue",
        )}
      >
        <motion.img
          src={assets.iconCheckSmallWhite}
          alt=""
          width={14}
          height={14}
          initial={false}
          animate={{ scale: checked ? 1 : 0.4, opacity: checked ? 1 : 0 }}
          transition={{ duration: 0.2, ease: easeOut }}
          className="block size-[14px]"
        />
      </span>
      <span className="font-manrope-regular text-[14px] leading-[22px] whitespace-nowrap text-oceno-ink transition-colors group-hover:text-oceno-deep">
        {label}
      </span>
      <span className="font-manrope-regular text-[14px] leading-[22px] whitespace-nowrap text-oceno-subtle">({count})</span>
    </label>
  );
}

function CheckList({ group, draft, onChange }: { group: Exclude<ListGroup, "finish">; draft: Filters; onChange: (f: Filters) => void }) {
  const options = filterGroups[group].options as { id: string; label: string; count: number }[];
  const selected = draft[group] as string[];
  return (
    <>
      {options.map((o) => (
        <Checkbox
          key={o.id}
          label={o.label}
          count={o.count}
          checked={selected.includes(o.id)}
          onToggle={() => onChange({ ...draft, [group]: toggleValue(selected, o.id) })}
        />
      ))}
    </>
  );
}

function RangeSlider({ value, onChange }: { value: [number, number]; onChange: (v: [number, number]) => void }) {
  const { min, max, step, unit } = filterGroups.size;
  // Thumb centres travel from 8.5px to (100% - 8.5px) on a native range input.
  const pos = (v: number) => `calc(8.5px + ${(v - min) / (max - min)} * (100% - 17px))`;
  return (
    <div className="flex w-full flex-col gap-[14px]">
      <div className="relative h-[24px] w-full">
        <span aria-hidden="true" className="absolute inset-x-0 top-[10px] h-[4px] rounded-full bg-oceno-line" />
        <span
          aria-hidden="true"
          className="absolute top-[10px] h-[4px] bg-oceno-blue"
          style={{ left: pos(value[0]), right: `calc(100% - ${pos(value[1])})` }}
        />
        <input
          type="range"
          aria-label="Minimum width"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => onChange([Math.min(Number(e.target.value), value[1] - step), value[1]])}
          className="oceno-range"
        />
        <input
          type="range"
          aria-label="Maximum width"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={(e) => onChange([value[0], Math.max(Number(e.target.value), value[0] + step)])}
          className="oceno-range"
        />
      </div>
      <div className="flex w-full justify-between font-manrope-regular text-[14px] leading-[22px] whitespace-nowrap text-oceno-slate tabular-nums">
        <span>
          {value[0]} {unit}
        </span>
        <span>
          {value[1]} {unit}
        </span>
      </div>
    </div>
  );
}

/** Filters sidebar: edits a draft that is committed with "Apply filters". */
export default function FiltersPanel({ draft, onChange, onApply, onClear, dirty, className }: FiltersPanelProps) {
  const finishes = filterGroups.finish.options;
  const selectedFinishes = finishes.filter((f) => draft.finish.includes(f.id));

  return (
    <div className={cn("flex flex-col rounded-[20px] border border-oceno-line bg-white p-[24px]", className)}>
      <div className="flex items-center justify-between pb-[16px]">
        <div className="flex items-center gap-[8px]">
          <img src={assets.iconSliders} alt="" width={18} height={18} className="block size-[18px]" />
          <h2 className="font-manrope-semibold text-[20px] leading-[28px] font-semibold tracking-[-0.06px] text-oceno-deep">Filters</h2>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="rounded-[4px] font-manrope-semibold text-[13px] leading-[18px] font-semibold tracking-[0.026px] text-oceno-blue transition-colors hover:text-oceno-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oceno-blue"
        >
          Clear all
        </button>
      </div>

      <Section title={filterGroups.category.label}>
        <CheckList group="category" draft={draft} onChange={onChange} />
      </Section>

      <Section title={filterGroups.finish.label}>
        <div role="group" aria-label="Finish and colour" className="flex flex-wrap gap-[8px]">
          {finishes.map((f) => {
            const selected = draft.finish.includes(f.id);
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={selected}
                aria-label={f.label}
                title={f.label}
                onClick={() => onChange({ ...draft, finish: toggleValue(draft.finish, f.id) })}
                className={cn(
                  "flex size-[44px] items-center justify-center rounded-full transition-[box-shadow,transform] duration-200 ease-out hover:scale-[1.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oceno-blue active:scale-95",
                  selected ? "shadow-[inset_0_0_0_2px_var(--color-oceno-blue)]" : "shadow-[inset_0_0_0_1px_var(--color-oceno-line)]",
                )}
              >
                <span className="block size-[32px] rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]" style={{ backgroundColor: f.color }} />
              </button>
            );
          })}
        </div>
        <p className="font-manrope-regular text-[14px] leading-[22px] text-oceno-slate" aria-live="polite">
          Selected: {selectedFinishes.length ? selectedFinishes.map((f) => f.label).join(", ") : "Any finish"}
        </p>
      </Section>

      <Section title={filterGroups.installation.label}>
        <CheckList group="installation" draft={draft} onChange={onChange} />
      </Section>

      <Section title={filterGroups.size.label}>
        <RangeSlider value={draft.width} onChange={(width) => onChange({ ...draft, width })} />
      </Section>

      <Section title={filterGroups.material.label} defaultOpen={false}>
        <CheckList group="material" draft={draft} onChange={onChange} />
      </Section>

      <Section title={filterGroups.collection.label} defaultOpen={false}>
        <CheckList group="collection" draft={draft} onChange={onChange} />
      </Section>

      <button
        type="button"
        onClick={onApply}
        className={cn(
          "mt-[4px] flex w-full items-center justify-center gap-[10px] rounded-full bg-oceno-blue px-[26px] py-[14px] font-manrope-semibold text-[15px] leading-[20px] font-semibold tracking-[0.03px] text-white transition-[background-color,box-shadow,transform] duration-200 hover:bg-oceno-blue-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oceno-blue active:scale-[0.98]",
          dirty && "shadow-[0_10px_24px_-10px_rgba(11,77,245,0.7)]",
        )}
      >
        Apply filters
        <AnimatePresence>
          {dirty && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2, ease: easeOut }}
              className="size-[7px] rounded-full bg-white"
            >
              <span className="sr-only">(unapplied changes)</span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
