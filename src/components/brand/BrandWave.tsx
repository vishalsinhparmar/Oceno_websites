import { assets } from "@/lib/assets";
import { cn } from "@/lib/cn";

/** Signature red swoosh (Brand / Wave), used under display headings. */
export default function BrandWave({ className }: { className?: string }) {
  return (
    <img
      src={assets.brandWave}
      alt=""
      aria-hidden="true"
      width={160}
      height={24}
      className={cn("block h-[22px] w-[160px] shrink-0", className)}
    />
  );
}
