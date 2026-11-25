export const HOME_LOCALES = ["ar", "en"] as const;
export type HomeLocale = (typeof HOME_LOCALES)[number];

export const AMENITY_ICON_KEYS = [
  "wifi",
  "fireplace",
  "mountain",
  "kitchen",
  "parking",
  "airConditioning",
] as const;

export type AmenityIconKey = (typeof AMENITY_ICON_KEYS)[number];

export type HomeAmenityData = {
  id?: number;
  iconKey: AmenityIconKey;
  name: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
};

export type HomeGalleryImageData = {
  id?: number;
  imageUrl: string;
  alt: string;
  sortOrder: number;
  isActive: boolean;
};

export type HomeTestimonialData = {
  id?: number;
  name: string;
  text: string;
  rating: number;
  sortOrder: number;
  isActive: boolean;
};

export type HomePageData = {
  locale: HomeLocale;
  hero: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    videoUrl: string;
  };
  amenitiesSection: {
    eyebrow: string;
    title: string;
  };
  gallerySection: {
    eyebrow: string;
    title: string;
  };
  testimonialsSection: {
    eyebrow: string;
    title: string;
  };
  cta: {
    title: string;
    description: string;
    buttonLabel: string;
  };
  amenities: HomeAmenityData[];
  galleryImages: HomeGalleryImageData[];
  testimonials: HomeTestimonialData[];
};

export function isHomeLocale(value: string): value is HomeLocale {
  return HOME_LOCALES.includes(value as HomeLocale);
}
