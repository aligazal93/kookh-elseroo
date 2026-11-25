import { NextResponse } from "next/server";

import { createSession, normalizeEmail, verifyPassword } from "@/features/auth/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const email = typeof body?.email === "string" ? normalizeEmail(body.email) : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ message: "أدخل البريد الإلكتروني وكلمة المرور." }, { status: 400 });
  }

  const customer = await prisma.customer.findUnique({ where: { email } });
  if (!customer || !(await verifyPassword(password, customer.passwordHash))) {
    return NextResponse.json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة." }, { status: 401 });
  }

  await createSession(customer.id);
  return NextResponse.json({ customer: { id: customer.id, fullName: customer.fullName, email: customer.email, phone: customer.phone } });
}
