import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const customers = await prisma.customer.findMany({
    select: { id: true, fullName: true, email: true, phone: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ customers });
}
