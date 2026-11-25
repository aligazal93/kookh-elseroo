import { prisma } from "@/lib/prisma";

import { mapHomePageRecord } from "./home.mapper";
import type { HomeLocale, HomePageData } from "./home.types";

const homePageInclude = {
  amenities: { orderBy: { sortOrder: "asc" as const } },
  galleryImages: { orderBy: { sortOrder: "asc" as const } },
  testimonials: { orderBy: { sortOrder: "asc" as const } },
};

export async function findHomePage(locale: HomeLocale) {
  const record = await prisma.homePage.findUnique({
    where: { locale },
    include: homePageInclude,
  });

  return record ? mapHomePageRecord(record) : null;
}

export async function saveHomePage(input: HomePageData) {
  await prisma.$transaction(async (transaction) => {
    const page = await transaction.homePage.upsert({
      where: { locale: input.locale },
      create: {
        locale: input.locale,
        heroTitle: input.hero.title,
        heroSubtitle: input.hero.subtitle,
        heroDescription: input.hero.description,
        heroImage: input.hero.image,
        aboutEyebrow: input.about.eyebrow,
        aboutTitle: input.about.title,
        aboutDescription: input.about.description,
        aboutVideoUrl: input.about.videoUrl,
        amenitiesEyebrow: input.amenitiesSection.eyebrow,
        amenitiesTitle: input.amenitiesSection.title,
        galleryEyebrow: input.gallerySection.eyebrow,
        galleryTitle: input.gallerySection.title,
        testimonialsEyebrow: input.testimonialsSection.eyebrow,
        testimonialsTitle: input.testimonialsSection.title,
        ctaTitle: input.cta.title,
        ctaDescription: input.cta.description,
        ctaButtonLabel: input.cta.buttonLabel,
      },
      update: {
        heroTitle: input.hero.title,
        heroSubtitle: input.hero.subtitle,
        heroDescription: input.hero.description,
        heroImage: input.hero.image,
        aboutEyebrow: input.about.eyebrow,
        aboutTitle: input.about.title,
        aboutDescription: input.about.description,
        aboutVideoUrl: input.about.videoUrl,
        amenitiesEyebrow: input.amenitiesSection.eyebrow,
        amenitiesTitle: input.amenitiesSection.title,
        galleryEyebrow: input.gallerySection.eyebrow,
        galleryTitle: input.gallerySection.title,
        testimonialsEyebrow: input.testimonialsSection.eyebrow,
        testimonialsTitle: input.testimonialsSection.title,
        ctaTitle: input.cta.title,
        ctaDescription: input.cta.description,
        ctaButtonLabel: input.cta.buttonLabel,
      },
    });

    await Promise.all([
      transaction.homeAmenity.deleteMany({ where: { homePageId: page.id } }),
      transaction.homeGalleryImage.deleteMany({ where: { homePageId: page.id } }),
      transaction.homeTestimonial.deleteMany({ where: { homePageId: page.id } }),
    ]);

    await transaction.homeAmenity.createMany({
      data: input.amenities.map((item, index) => ({
        homePageId: page.id,
        iconKey: item.iconKey,
        name: item.name,
        description: item.description,
        sortOrder: index,
        isActive: item.isActive,
      })),
    });
    await transaction.homeGalleryImage.createMany({
      data: input.galleryImages.map((item, index) => ({
        homePageId: page.id,
        imageUrl: item.imageUrl,
        alt: item.alt,
        sortOrder: index,
        isActive: item.isActive,
      })),
    });
    await transaction.homeTestimonial.createMany({
      data: input.testimonials.map((item, index) => ({
        homePageId: page.id,
        name: item.name,
        text: item.text,
        rating: item.rating,
        sortOrder: index,
        isActive: item.isActive,
      })),
    });
  });

  return findHomePage(input.locale);
}
