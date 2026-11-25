import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

import type { AboutContent, ContactContent, ContentLocale, FaqContent, SiteSettingsData } from "./content.types";

export async function findAboutContent(locale: ContentLocale): Promise<AboutContent | null> {
  const row = await prisma.aboutPageContent.findUnique({ where: { locale } });
  return row ? { ...row, locale, values: row.values as AboutContent["values"], facilities: row.facilities as AboutContent["facilities"], policies: row.policies as AboutContent["policies"] } : null;
}

export async function saveAboutContent(data: AboutContent) {
  await prisma.aboutPageContent.upsert({ where: { locale: data.locale }, create: { ...data, values: data.values as Prisma.InputJsonValue, facilities: data.facilities as Prisma.InputJsonValue, policies: data.policies as Prisma.InputJsonValue }, update: { ...data, values: data.values as Prisma.InputJsonValue, facilities: data.facilities as Prisma.InputJsonValue, policies: data.policies as Prisma.InputJsonValue } });
  return findAboutContent(data.locale);
}

export async function findFaqContent(locale: ContentLocale): Promise<FaqContent | null> {
  const row = await prisma.faqPageContent.findUnique({ where: { locale } });
  return row ? { ...row, locale, groups: row.groups as FaqContent["groups"] } : null;
}

export async function saveFaqContent(data: FaqContent) {
  await prisma.faqPageContent.upsert({ where: { locale: data.locale }, create: { ...data, groups: data.groups as Prisma.InputJsonValue }, update: { ...data, groups: data.groups as Prisma.InputJsonValue } });
  return findFaqContent(data.locale);
}

export async function findContactContent(locale: ContentLocale): Promise<ContactContent | null> {
  const row = await prisma.contactPageContent.findUnique({ where: { locale } });
  return row ? { ...row, locale, formLabels: row.formLabels as ContactContent["formLabels"] } : null;
}

export async function saveContactContent(data: ContactContent) {
  await prisma.contactPageContent.upsert({ where: { locale: data.locale }, create: { ...data, formLabels: data.formLabels as Prisma.InputJsonValue }, update: { ...data, formLabels: data.formLabels as Prisma.InputJsonValue } });
  return findContactContent(data.locale);
}

export async function findSiteSettings(locale: ContentLocale): Promise<SiteSettingsData | null> {
  const row = await prisma.siteSettings.findUnique({ where: { locale } });
  return row ? { ...row, locale } : null;
}

export async function saveSiteSettings(data: SiteSettingsData) {
  await prisma.siteSettings.upsert({ where: { locale: data.locale }, create: data, update: data });
  return findSiteSettings(data.locale);
}
