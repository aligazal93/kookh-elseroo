import { aboutDefaults, contactDefaults, faqDefaults, settingsDefaults } from "./content.defaults";
import { findAboutContent, findContactContent, findFaqContent, findSiteSettings, saveAboutContent, saveContactContent, saveFaqContent, saveSiteSettings } from "./content.repository";
import type { AboutContent, ContactContent, ContentLocale, FaqContent, SiteSettingsData } from "./content.types";

async function withFallback<T>(loader: () => Promise<T | null>, fallback: T) {
  try { return (await loader()) ?? fallback; } catch (error) { console.error("Content loading failed:", error); return fallback; }
}

export const getAboutContent = (locale: ContentLocale) => withFallback(() => findAboutContent(locale), aboutDefaults[locale]);
export const getFaqContent = (locale: ContentLocale) => withFallback(() => findFaqContent(locale), faqDefaults[locale]);
export const getContactContent = (locale: ContentLocale) => withFallback(() => findContactContent(locale), contactDefaults[locale]);
export const getSiteSettings = (locale: ContentLocale) => withFallback(() => findSiteSettings(locale), settingsDefaults[locale]);

export const updateAboutContent = (data: AboutContent) => saveAboutContent(data);
export const updateFaqContent = (data: FaqContent) => saveFaqContent(data);
export const updateContactContent = (data: ContactContent) => saveContactContent(data);
export const updateSiteSettings = (data: SiteSettingsData) => saveSiteSettings(data);
