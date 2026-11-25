import { NextRequest, NextResponse } from "next/server";
import { getAboutContent, getContactContent, getFaqContent, getSiteSettings, updateAboutContent, updateContactContent, updateFaqContent, updateSiteSettings } from "@/features/content/content.service";
import type { AboutContent, ContactContent, FaqContent, SiteSettingsData } from "@/features/content/content.types";
import { isContentPageName, validateContentPayload } from "@/features/content/content.validation";
import { isHomeLocale } from "@/features/home/home.types";

type Context = { params: Promise<{ page: string; locale: string }> };

export async function GET(_request: NextRequest, context: Context) {
  const { page, locale } = await context.params;
  if (!isContentPageName(page) || !isHomeLocale(locale)) return NextResponse.json({ success: false, message: "Invalid page or locale" }, { status: 400 });
  const loaders = { about: getAboutContent, faqs: getFaqContent, contact: getContactContent, settings: getSiteSettings };
  return NextResponse.json({ success: true, data: await loaders[page](locale) });
}

export async function PUT(request: NextRequest, context: Context) {
  try {
    const { page, locale } = await context.params;
    if (!isContentPageName(page) || !isHomeLocale(locale)) return NextResponse.json({ success: false, message: "Invalid page or locale" }, { status: 400 });
    const result = validateContentPayload(page, await request.json(), locale);
    if (!result.success) return NextResponse.json({ success: false, message: "Validation failed", errors: result.errors }, { status: 400 });

    let data;
    if (page === "about") data = await updateAboutContent(result.data as AboutContent);
    else if (page === "faqs") data = await updateFaqContent(result.data as FaqContent);
    else if (page === "contact") data = await updateContactContent(result.data as ContactContent);
    else data = await updateSiteSettings(result.data as SiteSettingsData);
    return NextResponse.json({ success: true, message: "Content updated", data });
  } catch (error) {
    console.error("Content update failed:", error);
    return NextResponse.json({ success: false, message: "Unable to update content" }, { status: 500 });
  }
}
