import { MotionConfig, motion, type Variants } from "motion/react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { projectsContent } from "@/config/home";
import { assets, type AssetKey } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { easeOut, fraunces, rise } from "@/lib/motion";

const tile: Variants = {
  hidden: { opacity: 0, clipPath: "inset(12% 0% 0% 0% round 20px)" },
  show: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0% round 20px)",
    transition: { duration: 1, ease: easeOut },
  },
};

type ProjectCardProps = {
  title: string;
  location: string;
  meta: string;
  image: AssetKey;
  href: string;
  className?: string;
};

/** Gallery tile (Card / Project): photo, location pill, title and scope. */
function ProjectCard({ title, location, meta, image, href, className }: ProjectCardProps) {
  return (
    <motion.a
      href={href}
      variants={tile}
      className={cn(
        "group relative isolate flex flex-col items-start justify-end gap-[10px] overflow-clip rounded-[20px] p-[22px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oceno-blue sm:p-[28px]",
        className,
      )}
    >
      <img
        src={assets[image]}
        alt=""
        width={1200}
        height={1500}
        loading="lazy"
        className="pointer-events-none absolute inset-0 -z-10 size-full max-w-none object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(5,11,31,0)] via-[rgba(5,11,31,0)] via-45% to-[rgba(5,11,31,0.78)] transition-opacity duration-500 group-hover:opacity-90"
      />
      <span className="flex items-center gap-[6px] rounded-full bg-white/[0.16] py-[6px] pr-[12px] pl-[10px] backdrop-blur-[12px]">
        <img src={assets.iconMapPinWhite} alt="" width={14} height={14} className="block size-[14px]" />
        <span className="font-manrope-semibold text-[13px] leading-[18px] font-semibold tracking-[0.026px] whitespace-nowrap text-white">
          {location}
        </span>
      </span>
      <h3 className="font-manrope-semibold text-[22px] leading-[30px] font-semibold tracking-[-0.12px] text-white transition-transform duration-500 ease-out group-hover:-translate-y-[2px] sm:text-[24px] sm:leading-[32px]">
        {title}
      </h3>
      <p className="font-manrope-regular text-[14px] leading-[22px] font-normal text-oceno-muted">{meta}</p>
      <span
        aria-hidden="true"
        className="absolute top-[22px] right-[22px] flex size-[44px] translate-y-[6px] items-center justify-center rounded-full border border-white/30 bg-white/[0.12] opacity-0 backdrop-blur-[8px] transition-[opacity,translate,background-color] duration-300 ease-out group-hover:translate-y-0 group-hover:bg-white/20 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:top-[28px] sm:right-[28px]"
      >
        <img src={assets.iconArrowUpRightWhite} alt="" width={20} height={20} className="block size-[20px]" />
      </span>
    </motion.a>
  );
}

/** Home "Projects & installations" section (Section / Projects). */
export default function Projects() {
  const { eyebrow, cta, projects } = projectsContent;
  const [feature, ...rest] = projects;

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="projects-heading"
        className="flex flex-col gap-10 bg-oceno-surface px-5 py-16 sm:px-8 sm:py-20 lg:gap-[48px] lg:py-[120px] xl:px-10 2xl:px-[120px]"
      >
        <motion.div
          className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between md:gap-[40px]"
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="flex max-w-[720px] flex-col items-start gap-[16px]">
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
            <h2
              id="projects-heading"
              className="font-fraunces-regular text-[34px] leading-[42px] font-normal tracking-[-0.44px] text-oceno-deep sm:text-[44px] sm:leading-[52px]"
              style={fraunces}
            >
              Spaces we have{" "}
              <em className="font-fraunces-light-italic font-light text-oceno-blue italic" style={fraunces}>
                helped shape
              </em>
              .
            </h2>
          </div>
          <Button
            href={cta.href}
            variant="outline"
            icon={<img src={assets.iconArrowRightDark} alt="" width={18} height={18} className="block size-[18px]" />}
          >
            {cta.label}
          </Button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:gap-[24px] lg:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
        >
          <ProjectCard {...feature} className="h-[380px] sm:h-[460px] lg:h-[560px]" />
          <div className="flex flex-col gap-4 sm:gap-[24px]">
            {rest.map((project) => (
              <ProjectCard key={project.id} {...project} className="h-[300px] lg:h-[268px]" />
            ))}
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
