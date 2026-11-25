import { defaultHomeContent } from "./home.defaults";
import { findHomePage, saveHomePage } from "./home.repository";
import type { HomeLocale, HomePageData } from "./home.types";

export async function getHomePageContent(locale: HomeLocale): Promise<HomePageData> {
  try {
    return (await findHomePage(locale)) ?? defaultHomeContent[locale];
  } catch (error) {
    console.error(`Unable to load homepage content for ${locale}:`, error);
    return defaultHomeContent[locale];
  }
}

export async function updateHomePageContent(input: HomePageData) {
  return saveHomePage(input);
}
