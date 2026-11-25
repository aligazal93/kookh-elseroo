import type {
  HomeAmenity,
  HomeGalleryImage,
  HomePage,
  HomeTestimonial,
} from "@/generated/prisma/client";

import type { AmenityIconKey, HomePageData } from "./home.types";

type HomePageRecord = HomePage & {
  amenities: HomeAmenity[];
  galleryImages: HomeGalleryImage[];
  testimonials: HomeTestimonial[];
};

export function mapHomePageRecord(record: HomePageRecord): HomePageData {
  return {
    locale: record.locale as HomePageData["locale"],
    hero: {
      title: record.heroTitle,
      subtitle: record.heroSubtitle,
      description: record.heroDescription,
      image: record.heroImage,
    },
    about: {
      eyebrow: record.aboutEyebrow,
      title: record.aboutTitle,
      description: record.aboutDescription,
      videoUrl: record.aboutVideoUrl,
    },
    amenitiesSection: {
      eyebrow: record.amenitiesEyebrow,
      title: record.amenitiesTitle,
    },
    gallerySection: {
      eyebrow: record.galleryEyebrow,
      title: record.galleryTitle,
    },
    testimonialsSection: {
      eyebrow: record.testimonialsEyebrow,
      title: record.testimonialsTitle,
    },
    cta: {
      title: record.ctaTitle,
      description: record.ctaDescription,
      buttonLabel: record.ctaButtonLabel,
    },
    amenities: record.amenities.map((item) => ({
      id: item.id,
      iconKey: item.iconKey as AmenityIconKey,
      name: item.name,
      description: item.description,
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    })),
    galleryImages: record.galleryImages.map((item) => ({
      id: item.id,
      imageUrl: item.imageUrl,
      alt: item.alt,
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    })),
    testimonials: record.testimonials.map((item) => ({
      id: item.id,
      name: item.name,
      text: item.text,
      rating: item.rating,
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    })),
  };
}
