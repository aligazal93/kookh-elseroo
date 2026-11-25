import AdminDashboard from "@/components/admin/AdminDashboard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [bookingCount, revenue, customerCount, latestBookings] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.aggregate({ where: { status: { not: "CANCELLED" } }, _sum: { totalPrice: true } }),
    prisma.customer.count(),
    prisma.booking.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
      select: {
        id: true, checkIn: true, checkOut: true, totalPrice: true, status: true,
        customer: { select: { fullName: true } },
      },
    }),
  ]);

  const dateFormatter = new Intl.DateTimeFormat("ar-SA", { day: "numeric", month: "short" });
  const bookings = latestBookings.map((booking) => ({
    id: `#KS-${String(booking.id).padStart(4, "0")}`,
    name: booking.customer.fullName,
    initials: booking.customer.fullName.split(" ").slice(0, 2).map((part) => part[0]).join(""),
    unit: "كوخ السرور",
    date: `${dateFormatter.format(booking.checkIn)} - ${dateFormatter.format(booking.checkOut)}`,
    price: `${booking.totalPrice.toLocaleString("ar-SA")} ريال`,
    status: booking.status,
  }));

  return <AdminDashboard bookings={bookings} summary={{ bookingCount, revenue: revenue._sum.totalPrice ?? 0, customerCount }} />;
}
