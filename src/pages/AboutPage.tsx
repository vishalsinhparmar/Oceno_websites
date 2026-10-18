import AboutHero from "@/components/sections/about/AboutHero";
import AboutStats from "@/components/sections/about/AboutStats";
import GlobalPresence from "@/components/sections/about/GlobalPresence";
import Journey from "@/components/sections/about/Journey";
import Mission from "@/components/sections/about/Mission";
import Values from "@/components/sections/about/Values";
import CtaBand from "@/components/sections/home/CtaBand";
import { aboutCtaContent } from "@/config/about";
import { fraunces } from "@/lib/motion";

/** About page composed of its sections. */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Mission />
      <AboutStats />
      <Values />
      <Journey />
      <GlobalPresence />
      <CtaBand
        content={aboutCtaContent}
        product="productPedestalNoir"
        productClassName="right-[280px] bottom-[-6px]"
        heading={
          <>
            Let’s build your bathroom range{" "}
            <em className="font-fraunces-light-italic text-[#bcd0ff] italic" style={fraunces}>
              together
            </em>
            .
          </>
        }
      />
    </>
  );
}
