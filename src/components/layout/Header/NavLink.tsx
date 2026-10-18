import { motion } from "motion/react";
import type { NavItem } from "@/config/site";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/cn";

type NavLinkProps = {
  item: NavItem;
  active: boolean;
};

/** Header link (Navigation / Nav Link). Active shows the red logo-accent indicator. */
export default function NavLink({ item, active }: NavLinkProps) {
  return (
    <a
      href={item.href}
      aria-current={active ? "page" : undefined}
      className="group relative flex shrink-0 flex-col items-center gap-[6px] pt-[8px] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oceno-blue"
    >
      <span className="flex items-center gap-[6px]">
        <span
          className={cn(
            "font-manrope-medium text-[15px] leading-[20px] font-medium whitespace-nowrap transition-colors duration-200",
            active ? "text-oceno-blue" : "text-oceno-ink group-hover:text-oceno-blue",
          )}
        >
          {item.label}
        </span>
        {item.hasDropdown && (
          <img
            src={active ? assets.chevronActive : assets.chevronDefault}
            alt=""
            aria-hidden="true"
            width={16}
            height={16}
            className="block size-[16px] shrink-0 transition-transform duration-200 group-hover:translate-y-[1px]"
          />
        )}
      </span>
      <span className="relative h-[2px] w-[18px] shrink-0">
        {active && (
          <motion.span
            layoutId="nav-indicator"
            className="absolute inset-0 rounded-[2px] bg-oceno-red"
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
          />
        )}
      </span>
    </a>
  );
}
