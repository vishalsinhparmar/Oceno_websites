import { MotionConfig, motion, type Variants } from "motion/react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import IconButton from "@/components/ui/IconButton";
import { catalogueContent } from "@/config/home";
import { assets, type AssetKey } from "@/lib/assets";
import { easeOut, fraunces, rise, stagger } from "@/lib/motion";

const cover = { backgroundImage: "linear-gradient(129.47deg, #16295c 0%, #050b1f 71.43%)" } as const;

const cardIn: Variants = {
  hidden: { opacity: 0, y: 48, rotate: 2 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.9, ease: easeOut } },
};

type CatalogueCardProps = {
  coverTitle: string;
  cover: AssetKey;
  meta: string;
  title: string;
  downloadHref: string;
  previewHref: string;
};

/** Catalogue card (Card / Catalogue): branded cover, file meta, download + preview. */
function CatalogueCard({ coverTitle, cover: image, meta, title, downloadHref, previewHref }: CatalogueCardProps) {
  return (
    <motion.article
      variants={cardIn}
      className="group flex flex-col overflow-clip rounded-[20px] border border-oceno-line bg-white transition-[box-shadow,translate,border-color] duration-300 ease-out hover:-translate-y-[6px] hover:border-oceno-muted hover:shadow-oceno-float"
    >
      <div className="relative h-[340px] w-full overflow-clip" style={cover}>
        <img
          src={assets.logoWhite}
          alt=""
          width={1021}
          height={304}
          className="absolute top-[24px] left-[24px] h-[29px] w-[96px] object-contain"
        />
        <p className="absolute top-[32px] right-[24px] font-manrope-medium text-[12px] leading-[16px] font-medium tracking-[0.36px] text-white">
          2026
        </p>
        <img
          src={assets[image]}
          alt=""
          width={940}
          height={940}
          loading="lazy"
          className="pointer-events-none absolute bottom-[94px] left-[calc(50%+1px)] size-[190px] max-w-none -translate-x-1/2 object-contain transition-transform duration-700 ease-out group-hover:-translate-y-[10px] group-hover:scale-[1.05]"
        />
        <img
          src={assets.brandWave}
          alt=""
          aria-hidden="true"
          width={160}
          height={24}
          className="absolute top-[214px] left-[24px] h-[10px] w-[64px] origin-left transition-transform duration-500 ease-out group-hover:scale-x-[1.25]"
        />
        <p
          aria-hidden="true"
          className="absolute top-[232px] left-[24px] w-[234px] font-fraunces-regular text-[34px] leading-[42px] font-normal tracking-[-0.17px] text-white"
          style={fraunces}
        >
          {coverTitle}
        </p>
      </div>
      <div className="flex w-full flex-col items-start gap-[10px] p-[20px]">
        <p className="font-manrope-medium text-[12px] leading-[16px] font-medium tracking-[0.36px] whitespace-nowrap text-oceno-slate uppercase">
          {meta}
        </p>
        <h3 className="w-full font-manrope-semibold text-[20px] leading-[28px] font-semibold tracking-[-0.06px] text-oceno-deep">
          {title}
        </h3>
        <div className="flex w-full items-center gap-[8px]">
          <Button
            href={downloadHref}
            className="min-w-0 flex-1 justify-center"
            aria-label={`Download ${title}`}
            icon={
              <img
                src={assets.iconDownloadWhite}
                alt=""
                width={18}
                height={18}
                className="block size-[18px] transition-transform duration-300 group-hover:translate-y-[1px]"
              />
            }
          >
            Download
          </Button>
          <IconButton href={previewHref} label={`Preview ${title}`}>
            <img src={assets.iconEye} alt="" width={20} height={20} className="block size-[20px]" />
          </IconButton>
        </div>
      </div>
    </motion.article>
  );
}

/** Home "Catalogue & downloads" section (Section / Catalogue). */
export default function Catalogue() {
  const { eyebrow, description, documents, catalogues } = catalogueContent;

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="catalogue-heading"
        className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:py-[120px] xl:px-10 2xl:px-[120px]"
      >
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-[48px] xl:gap-[64px]">
          <motion.div
            className="flex min-w-0 flex-1 flex-col items-start gap-[24px]"
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={rise}>
              <Eyebrow tone="light">{eyebrow}</Eyebrow>
            </motion.div>
            <motion.h2
              id="catalogue-heading"
              variants={rise}
              className="font-fraunces-regular text-[34px] leading-[42px] font-normal tracking-[-0.44px] text-oceno-deep sm:text-[44px] sm:leading-[52px]"
              style={fraunces}
            >
              Every model, size and finish — in{" "}
              <em className="font-fraunces-light-italic font-light text-oceno-blue italic" style={fraunces}>
                one download
              </em>
              .
            </motion.h2>
            <motion.p
              variants={rise}
              className="font-manrope-regular text-[16px] leading-[26px] font-normal text-oceno-slate sm:text-[18px] sm:leading-[30px]"
            >
              {description}
            </motion.p>
            <ul className="flex w-full flex-col">
              {documents.map((doc) => (
                <motion.li key={doc.id} variants={rise}>
                  <a
                    href={doc.href}
                    className="group flex w-full items-center gap-[12px] border-b border-oceno-line py-[16px] transition-[padding,background-color] duration-300 ease-out hover:bg-oceno-surface hover:px-[12px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oceno-blue"
                  >
                    <img src={assets.iconFileBlue} alt="" width={20} height={20} className="block size-[20px] shrink-0" />
                    <span className="min-w-0 flex-1 font-manrope-semibold text-[15px] leading-[20px] font-semibold tracking-[0.03px] text-oceno-deep">
                      {doc.label}
                    </span>
                    <span className="hidden font-manrope-regular text-[14px] leading-[22px] font-normal whitespace-nowrap text-oceno-slate sm:inline">
                      {doc.meta}
                    </span>
                    <img
                      src={assets.iconDownloadDark}
                      alt=""
                      width={18}
                      height={18}
                      className="block size-[18px] shrink-0 transition-transform duration-300 ease-out group-hover:translate-y-[2px]"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:w-[540px] lg:shrink-0 xl:w-[588px]"
            variants={stagger(0.15, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {catalogues.map(({ id, ...item }) => (
              <CatalogueCard key={id} {...item} />
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
