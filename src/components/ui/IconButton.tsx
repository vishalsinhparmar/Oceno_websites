import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex size-[44px] shrink-0 items-center justify-center rounded-full border transition-[border-color,background-color,transform,opacity] duration-200 ease-out active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oceno-blue disabled:pointer-events-none disabled:opacity-40";

const tones = {
  light: "border-oceno-line bg-white hover:border-oceno-ink/30 hover:bg-slate-50",
  dark: "border-oceno-deep bg-oceno-deep hover:border-oceno-navy hover:bg-oceno-navy",
  glass: "border-white/30 bg-white/[0.12] hover:border-white/60 hover:bg-white/20",
} as const;

type Common = { label: string; children: ReactNode; className?: string; tone?: keyof typeof tones };

type IconButtonProps =
  | (Common & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "children">)
  | (Common & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "children">);

/** 44px circular icon button (Core / Icon Button). */
export default function IconButton(props: IconButtonProps) {
  const { label, children, className, tone = "light" } = props;
  const classes = cn(base, tones[tone], className);
  if (props.href !== undefined) {
    const { label: _l, children: _c, className: _cl, tone: _t, ...rest } = props;
    return (
      <a aria-label={label} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  const { label: _l, children: _c, className: _cl, tone: _t, ...rest } = props;
  return (
    <button type="button" aria-label={label} className={classes} {...rest}>
      {children}
    </button>
  );
}
