import Categories from "@/components/sections/home/Categories";
import BrandStory from "@/components/sections/home/BrandStory";
import Catalogue from "@/components/sections/home/Catalogue";
import CtaBand from "@/components/sections/home/CtaBand";
import FeaturedProducts from "@/components/sections/home/FeaturedProducts";
import Hero from "@/components/sections/home/Hero";
import Projects from "@/components/sections/home/Projects";
import Spotlight from "@/components/sections/home/Spotlight";
import Stats from "@/components/sections/home/Stats";
import Testimonials from "@/components/sections/home/Testimonials";
import WhyOceno from "@/components/sections/home/WhyOceno";

/** Home page composed of its sections. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <BrandStory />
      <Stats />
      <WhyOceno />
      <Spotlight />
      <Projects />
      <Catalogue />
      <Testimonials />
      <CtaBand />
    </>
  );
}
