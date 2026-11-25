import Hero from "@/components/home/Hero";
import { About } from "@/components/home/About";
import Amenities from "@/components/home/Amenities";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import BookingCTA from "@/components/home/BookingCTA";
import { getHomePageContent } from "@/features/home/home.service";
import { isHomeLocale } from "@/features/home/home.types";

type HomePageProps = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  const locale = isHomeLocale(localeParam) ? localeParam : "ar";
  const content = await getHomePageContent(locale);

  return (
    <>
      <Hero content={content.hero} />
      <About content={content.about} />
      <Amenities section={content.amenitiesSection} items={content.amenities} />
      <Gallery section={content.gallerySection} images={content.galleryImages} />
      <Testimonials section={content.testimonialsSection} items={content.testimonials} />
      <BookingCTA content={content.cta} />
    </>
  );
}
