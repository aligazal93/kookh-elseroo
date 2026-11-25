import FaqHero from "@/components/faqs/FaqHero";
import FaqList from "@/components/faqs/FaqList";
import { getFaqContent } from "@/features/content/content.service";
import { isHomeLocale } from "@/features/home/home.types";

export default async function FaqsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const content = await getFaqContent(isHomeLocale(value) ? value : "ar");
  return (
    <main>
      <FaqHero title={content.title} image={content.heroImage} />
      <FaqList groups={content.groups} />
    </main>
  );
}
