import { Fragment } from "react";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/cn";

type Crumb = { label: string; href: string };

type BreadcrumbProps = {
  items: readonly Crumb[];
  current: string;
  /** `dark` = navy page heroes, `light` = surface/white page heroes. */
  tone?: "dark" | "light";
  className?: string;
};

/** Breadcrumb trail (Navigation / Breadcrumb). */
export default function Breadcrumb({ items, current, tone = "dark", className }: BreadcrumbProps) {
  const light = tone === "light";
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-[8px]">
        {items.map((item) => (
          <Fragment key={item.label}>
            <li>
              <a
                href={item.href}
                className={cn(
                  "font-manrope-semibold text-[13px] leading-[18px] font-semibold tracking-[0.026px] whitespace-nowrap transition-colors focus-visible:outline-none",
                  light
                    ? "text-oceno-slate hover:text-oceno-blue focus-visible:text-oceno-blue"
                    : "text-oceno-muted hover:text-white focus-visible:text-white",
                )}
              >
                {item.label}
              </a>
            </li>
            <li aria-hidden="true">
              <img src={light ? assets.iconChevronRightSlate : assets.iconChevronRightMuted} alt="" width={14} height={14} className="block size-[14px]" />
            </li>
          </Fragment>
        ))}
        <li
          aria-current="page"
          className={cn(
            "font-manrope-semibold text-[13px] leading-[18px] font-semibold tracking-[0.026px] whitespace-nowrap",
            light ? "text-oceno-deep" : "text-white",
          )}
        >
          {current}
        </li>
      </ol>
    </nav>
  );
}
