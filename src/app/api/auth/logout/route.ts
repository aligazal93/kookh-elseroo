import { NextResponse } from "next/server";

import { deleteCurrentSession } from "@/features/auth/auth";

export async function POST() {
  await deleteCurrentSession();
  return NextResponse.json({ success: true });
}
