import { isHomeLocale } from "@/features/home/home.types";
import type { AboutContent, ContactContent, ContentPageName, FaqContent, SiteSettingsData } from "./content.types";

type ContentPayload = AboutContent | FaqContent | ContactContent | SiteSettingsData;
type Result = { success: true; data: ContentPayload } | { success: false; errors: string[] };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getPath(source: Record<string, unknown>, path: string) {
  return path.split(".").reduce<unknown>((value, key) => isRecord(value) ? value[key] : undefined, source);
}

const requiredPaths: Record<ContentPageName, string[]> = {
  about: ["heroTitle", "heroImage", "storyEyebrow", "storyTitle", "storyFirst", "storySecond", "storyImage", "storyImageAlt", "valuesTitle", "facilitiesTitle", "policiesTitle"],
  faqs: ["title", "heroImage"],
  contact: ["title", "heroImage", "formTitle", "contactSectionTitle", "mapTitle", "formLabels.firstName", "formLabels.lastName", "formLabels.phone", "formLabels.email", "formLabels.message", "formLabels.firstNamePlaceholder", "formLabels.lastNamePlaceholder", "formLabels.emailPlaceholder", "formLabels.messagePlaceholder", "formLabels.submit"],
  settings: ["siteName", "headerLogo", "footerLogo", "phone", "email", "fax", "address", "mapEmbedUrl", "instagramUrl", "facebookUrl", "xUrl", "whatsappUrl", "footerCredit"],
};

export function validateContentPayload(page: ContentPageName, value: unknown, locale: string): Result {
  if (!isHomeLocale(locale)) return { success: false, errors: ["Invalid locale"] };
  if (!isRecord(value)) return { success: false, errors: ["Request body must be an object"] };

  const errors = requiredPaths[page]
    .filter((path) => typeof getPath(value, path) !== "string" || String(getPath(value, path)).trim() === "")
    .map((path) => `${path} is required`);

  if (value.locale !== locale) errors.push("Body locale must match URL locale");

  const validateItems = (items: unknown, path: string, fields: string[]) => {
    if (!Array.isArray(items)) { errors.push(`${path} must be an array`); return; }
    items.forEach((item, index) => {
      if (!isRecord(item)) { errors.push(`${path}.${index} must be an object`); return; }
      fields.forEach((field) => {
        if (typeof item[field] !== "string" || String(item[field]).trim() === "") errors.push(`${path}.${index}.${field} is required`);
      });
    });
  };

  if (page === "about") {
    validateItems(value.values, "values", ["title", "description"]);
    validateItems(value.facilities, "facilities", ["title", "description"]);
    validateItems(value.policies, "policies", ["title", "description"]);
  }

  if (page === "faqs") {
    if (!Array.isArray(value.groups)) errors.push("groups must be an array");
    else value.groups.forEach((group, groupIndex) => {
      if (!isRecord(group) || typeof group.title !== "string" || !Array.isArray(group.items)) { errors.push(`groups.${groupIndex} is invalid`); return; }
      validateItems(group.items, `groups.${groupIndex}.items`, ["question", "answer"]);
    });
  }

  return errors.length ? { success: false, errors } : { success: true, data: value as unknown as ContentPayload };
}

export function isContentPageName(value: string): value is ContentPageName {
  return ["about", "faqs", "contact", "settings"].includes(value);
}
