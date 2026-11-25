import { NextRequest, NextResponse } from "next/server";

import { getHomePageContent, updateHomePageContent } from "@/features/home/home.service";
import { isHomeLocale } from "@/features/home/home.types";
import { validateHomePageInput } from "@/features/home/home.validation";

type RouteContext = { params: Promise<{ locale: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const { locale } = await context.params;
  if (!isHomeLocale(locale)) {
    return NextResponse.json({ success: false, message: "Invalid locale" }, { status: 400 });
  }

  return NextResponse.json({ success: true, data: await getHomePageContent(locale) });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { locale } = await context.params;
    if (!isHomeLocale(locale)) {
      return NextResponse.json({ success: false, message: "Invalid locale" }, { status: 400 });
    }

    const result = validateHomePageInput(await request.json());
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: result.errors },
        { status: 400 },
      );
    }

    if (result.data.locale !== locale) {
      return NextResponse.json(
        { success: false, message: "Body locale must match URL locale" },
        { status: 400 },
      );
    }

    const data = await updateHomePageContent(result.data);
    return NextResponse.json({ success: true, message: "Homepage updated", data });
  } catch (error) {
    console.error("Unable to update homepage:", error);
    return NextResponse.json(
      { success: false, message: "Unable to update homepage" },
      { status: 500 },
    );
  }
}
