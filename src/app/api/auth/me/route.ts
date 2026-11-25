import { NextResponse } from "next/server";

import { getCurrentCustomer } from "@/features/auth/auth";

export async function GET() {
  const customer = await getCurrentCustomer();
  return customer
    ? NextResponse.json({ customer })
    : NextResponse.json({ message: "غير مسجل الدخول." }, { status: 401 });
}
