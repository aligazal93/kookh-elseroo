import { Prisma } from "@/generated/prisma/client";
import { getCurrentCustomer } from "@/features/auth/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const PRICE_PER_NIGHT = 100;

function parseDate(value: unknown) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function POST(request: Request) {
  const customer = await getCurrentCustomer();
  if (!customer) {
    return NextResponse.json({ code: "AUTH_REQUIRED" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const checkIn = parseDate(body?.checkIn);
  const checkOut = parseDate(body?.checkOut);
  const guests = Number(body?.guests);

  if (!checkIn || !checkOut || checkOut <= checkIn || !Number.isInteger(guests) || guests < 1 || guests > 10) {
    return NextResponse.json({ code: "INVALID_BOOKING" }, { status: 400 });
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  if (checkIn < today) {
    return NextResponse.json({ code: "PAST_DATE" }, { status: 400 });
  }

  const nights = Math.round((checkOut.getTime() - checkIn.getTime()) / 86_400_000);

  try {
    const booking = await prisma.$transaction(async (tx) => {
      const overlappingBooking = await tx.booking.findFirst({
        where: {
          status: { not: "CANCELLED" },
          checkIn: { lt: checkOut },
          checkOut: { gt: checkIn },
        },
        select: { id: true },
      });

      if (overlappingBooking) throw new Error("BOOKING_CONFLICT");

      return tx.booking.create({
        data: {
          customerId: customer.id,
          checkIn,
          checkOut,
          guests,
          nights,
          pricePerNight: PRICE_PER_NIGHT,
          totalPrice: nights * PRICE_PER_NIGHT,
        },
        select: { id: true, nights: true, totalPrice: true },
      });
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "BOOKING_CONFLICT") {
      return NextResponse.json({ code: "BOOKING_CONFLICT" }, { status: 409 });
    }
    throw error;
  }
}
