import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactMap from "@/components/contact/ContactMap";
import { getContactContent, getSiteSettings } from "@/features/content/content.service";
import { isHomeLocale } from "@/features/home/home.types";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const locale = isHomeLocale(value) ? value : "ar";
  const [content, settings] = await Promise.all([getContactContent(locale), getSiteSettings(locale)]);
  return (
    <main>
      <ContactHero title={content.title} image={content.heroImage} />

      <section className="relative -mt-6 rounded-t-3xl bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
            <ContactForm title={content.formTitle} labels={content.formLabels} />
            <ContactInfo title={content.contactSectionTitle} settings={settings} locale={locale} />
          </div>
          <ContactMap title={content.mapTitle} url={settings.mapEmbedUrl} />
        </div>
      </section>
    </main>
  );
}
