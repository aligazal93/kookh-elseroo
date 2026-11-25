import { NextResponse } from "next/server";

import { createSession, hashPassword, normalizeEmail } from "@/features/auth/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const fullName = typeof body?.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body?.email === "string" ? normalizeEmail(body.email) : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (fullName.length < 2 || !email.includes("@") || phone.length < 7 || password.length < 8) {
    return NextResponse.json({ message: "بيانات التسجيل غير مكتملة أو غير صحيحة." }, { status: 400 });
  }

  const existingCustomer = await prisma.customer.findUnique({ where: { email }, select: { id: true } });
  if (existingCustomer) {
    return NextResponse.json({ message: "البريد الإلكتروني مسجل بالفعل." }, { status: 409 });
  }

  const customer = await prisma.customer.create({
    data: { fullName, email, phone, passwordHash: await hashPassword(password) },
    select: { id: true, fullName: true, email: true, phone: true },
  });
  await createSession(customer.id);

  return NextResponse.json({ customer }, { status: 201 });
}
