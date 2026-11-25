import { NextRequest, NextResponse } from "next/server";
import { getAboutContent, getContactContent, getFaqContent, getSiteSettings } from "@/features/content/content.service";
import { isContentPageName } from "@/features/content/content.validation";
import { isHomeLocale } from "@/features/home/home.types";

type Context = { params: Promise<{ page: string }> };

export async function GET(request: NextRequest, context: Context) {
  const { page } = await context.params;
  const locale = request.nextUrl.searchParams.get("locale") ?? "ar";
  if (!isContentPageName(page) || !isHomeLocale(locale)) return NextResponse.json({ success: false, message: "Invalid page or locale" }, { status: 400 });

  const loaders = { about: getAboutContent, faqs: getFaqContent, contact: getContactContent, settings: getSiteSettings };
  return NextResponse.json({ success: true, data: await loaders[page](locale) });
}
