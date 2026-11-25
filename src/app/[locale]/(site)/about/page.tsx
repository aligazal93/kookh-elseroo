import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import Values from "@/components/about/Values";
import Facilities from "@/components/about/Facilities";
import Policies from "@/components/about/Policies";
import { getAboutContent } from "@/features/content/content.service";
import { isHomeLocale } from "@/features/home/home.types";

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const content = await getAboutContent(isHomeLocale(value) ? value : "ar");
  return (
    <>
        <AboutHero title={content.heroTitle} image={content.heroImage} />
        <AboutStory content={content} />
        <Values title={content.valuesTitle} items={content.values} />
        <Facilities title={content.facilitiesTitle} items={content.facilities} />
        <Policies title={content.policiesTitle} items={content.policies} />
    </>
  );
}
