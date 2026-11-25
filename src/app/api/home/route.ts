import { NextRequest, NextResponse } from "next/server";

import { getHomePageContent } from "@/features/home/home.service";
import { isHomeLocale } from "@/features/home/home.types";

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("locale") ?? "ar";

  if (!isHomeLocale(locale)) {
    return NextResponse.json(
      { success: false, message: "locale must be ar or en" },
      { status: 400 },
    );
  }

  const data = await getHomePageContent(locale);
  return NextResponse.json({ success: true, data });
}
