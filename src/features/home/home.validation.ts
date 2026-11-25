import {
  AMENITY_ICON_KEYS,
  isHomeLocale,
  type AmenityIconKey,
  type HomePageData,
} from "./home.types";

type ValidationResult =
  | { success: true; data: HomePageData }
  | { success: false; errors: string[] };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(value: unknown, field: string, errors: string[]) {
  if (typeof value !== "string" || value.trim().length === 0) {
    errors.push(`${field} is required`);
    return "";
  }
  return value.trim();
}

export function validateHomePageInput(value: unknown): ValidationResult {
  if (!isRecord(value)) return { success: false, errors: ["Request body must be an object"] };

  const errors: string[] = [];
  const localeValue = requiredString(value.locale, "locale", errors);
  const locale = isHomeLocale(localeValue) ? localeValue : "ar";
  if (localeValue && !isHomeLocale(localeValue)) errors.push("locale must be ar or en");

  const section = (key: string) => {
    const current = value[key];
    if (!isRecord(current)) {
      errors.push(`${key} must be an object`);
      return {} as Record<string, unknown>;
    }
    return current;
  };

  const hero = section("hero");
  const about = section("about");
  const amenitiesSection = section("amenitiesSection");
  const gallerySection = section("gallerySection");
  const testimonialsSection = section("testimonialsSection");
  const cta = section("cta");

  const amenities = Array.isArray(value.amenities) ? value.amenities : [];
  const galleryImages = Array.isArray(value.galleryImages) ? value.galleryImages : [];
  const testimonials = Array.isArray(value.testimonials) ? value.testimonials : [];

  if (!Array.isArray(value.amenities)) errors.push("amenities must be an array");
  if (!Array.isArray(value.galleryImages)) errors.push("galleryImages must be an array");
  if (!Array.isArray(value.testimonials)) errors.push("testimonials must be an array");

  const data: HomePageData = {
    locale,
    hero: {
      title: requiredString(hero.title, "hero.title", errors),
      subtitle: requiredString(hero.subtitle, "hero.subtitle", errors),
      description: requiredString(hero.description, "hero.description", errors),
      image: requiredString(hero.image, "hero.image", errors),
    },
    about: {
      eyebrow: requiredString(about.eyebrow, "about.eyebrow", errors),
      title: requiredString(about.title, "about.title", errors),
      description: requiredString(about.description, "about.description", errors),
      videoUrl: requiredString(about.videoUrl, "about.videoUrl", errors),
    },
    amenitiesSection: {
      eyebrow: requiredString(amenitiesSection.eyebrow, "amenitiesSection.eyebrow", errors),
      title: requiredString(amenitiesSection.title, "amenitiesSection.title", errors),
    },
    gallerySection: {
      eyebrow: requiredString(gallerySection.eyebrow, "gallerySection.eyebrow", errors),
      title: requiredString(gallerySection.title, "gallerySection.title", errors),
    },
    testimonialsSection: {
      eyebrow: requiredString(testimonialsSection.eyebrow, "testimonialsSection.eyebrow", errors),
      title: requiredString(testimonialsSection.title, "testimonialsSection.title", errors),
    },
    cta: {
      title: requiredString(cta.title, "cta.title", errors),
      description: requiredString(cta.description, "cta.description", errors),
      buttonLabel: requiredString(cta.buttonLabel, "cta.buttonLabel", errors),
    },
    amenities: amenities.map((item, index) => {
      const current = isRecord(item) ? item : {};
      const icon = requiredString(current.iconKey, `amenities.${index}.iconKey`, errors);
      if (icon && !AMENITY_ICON_KEYS.includes(icon as AmenityIconKey)) {
        errors.push(`amenities.${index}.iconKey is invalid`);
      }
      return {
        iconKey: (AMENITY_ICON_KEYS.includes(icon as AmenityIconKey) ? icon : "wifi") as AmenityIconKey,
        name: requiredString(current.name, `amenities.${index}.name`, errors),
        description: requiredString(current.description, `amenities.${index}.description`, errors),
        sortOrder: index,
        isActive: current.isActive !== false,
      };
    }),
    galleryImages: galleryImages.map((item, index) => {
      const current = isRecord(item) ? item : {};
      return {
        imageUrl: requiredString(current.imageUrl, `galleryImages.${index}.imageUrl`, errors),
        alt: requiredString(current.alt, `galleryImages.${index}.alt`, errors),
        sortOrder: index,
        isActive: current.isActive !== false,
      };
    }),
    testimonials: testimonials.map((item, index) => {
      const current = isRecord(item) ? item : {};
      const rating = Number(current.rating);
      if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        errors.push(`testimonials.${index}.rating must be between 1 and 5`);
      }
      return {
        name: requiredString(current.name, `testimonials.${index}.name`, errors),
        text: requiredString(current.text, `testimonials.${index}.text`, errors),
        rating: Number.isInteger(rating) && rating >= 1 && rating <= 5 ? rating : 5,
        sortOrder: index,
        isActive: current.isActive !== false,
      };
    }),
  };

  return errors.length > 0 ? { success: false, errors } : { success: true, data };
}
