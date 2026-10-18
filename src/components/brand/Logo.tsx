import { assets } from "@/lib/assets";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  /** `color` for light surfaces, `white` for navy / photography. */
  tone?: "color" | "white";
};

/** OCENO wordmark (Brand / Logo). */
export default function Logo({ className, tone = "color" }: LogoProps) {
  return (
    <a href="/" aria-label="OCENO home" className={cn("relative block shrink-0", className)}>
      <img
        src={tone === "white" ? assets.logoWhite : assets.logoColor}
        alt="Oceno – the european treasures"
        width={tone === "white" ? 1021 : 160}
        height={tone === "white" ? 304 : 48}
        className="pointer-events-none size-full object-contain"
      />
    </a>
  );
}
