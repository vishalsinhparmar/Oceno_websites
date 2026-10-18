import { siteConfig } from "@/config/site";
import { assets } from "@/lib/assets";

const labelClass =
  "font-manrope-semibold text-[13px] leading-[18px] font-semibold tracking-[0.026px] whitespace-nowrap";

function Icon({ src }: { src: string }) {
  return <img src={src} alt="" aria-hidden="true" width={16} height={16} className="block size-[16px] shrink-0" />;
}

/** Dark utility bar above the main header. */
export default function UtilityBar() {
  return (
    <div className="bg-oceno-navy">
      <div className="flex items-center justify-between gap-6 px-5 py-[10px] sm:px-8 xl:px-10 2xl:px-[120px]">
        <p className={`hidden items-center gap-[8px] text-oceno-muted md:flex ${labelClass}`}>
          <Icon src={assets.iconFactory} />
          <span className="whitespace-pre">{`${siteConfig.tagline}  ·  ${siteConfig.location}`}</span>
        </p>

        <ul className="flex w-full items-center justify-between gap-[24px] md:w-auto md:justify-end">
          <li>
            <a
              href={siteConfig.phone.href}
              className={`flex items-center gap-[8px] text-oceno-muted transition-colors hover:text-white ${labelClass}`}
            >
              <Icon src={assets.iconPhone} />
              {siteConfig.phone.display}
            </a>
          </li>
          <li className="hidden sm:block">
            <a
              href={siteConfig.email.href}
              className={`flex items-center gap-[8px] text-oceno-muted transition-colors hover:text-white ${labelClass}`}
            >
              <Icon src={assets.iconMail} />
              {siteConfig.email.display}
            </a>
          </li>
          <li>
            <button
              type="button"
              aria-label="Language: English"
              className={`flex items-center gap-[8px] text-white ${labelClass}`}
            >
              <Icon src={assets.iconGlobe} />
              {siteConfig.language}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
