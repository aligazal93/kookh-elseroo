import { ArrowRightIcon, CalendarDaysIcon, MailIcon, PhoneIcon, UsersRoundIcon } from "@animateicons/react/lucide";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function statusView(status: string) {
  if (status === "CONFIRMED") return { label: "مؤكد", className: "bg-emerald-50 text-emerald-700" };
  if (status === "CANCELLED") return { label: "ملغي", className: "bg-red-50 text-red-700" };
  return { label: "بانتظار الدفع", className: "bg-amber-50 text-amber-700" };
}

export default async function BookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: { select: { fullName: true, email: true, phone: true } } },
  });
  const dateFormatter = new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium" });

  return (
    <main className="min-h-screen bg-[#f6f7f9] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary"><CalendarDaysIcon size={18} /> إدارة الحجوزات</div>
            <h1 className="text-3xl font-bold text-[#202225]">الحجوزات</h1>
            <p className="mt-2 text-sm text-[#737981]">كل الحجوزات المسجلة من نموذج الصفحة الرئيسية.</p>
          </div>
          <Link href="/admin" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#e2e5e8] bg-white px-5 text-sm font-semibold text-[#555b63] transition hover:bg-[#fafafa]"><ArrowRightIcon size={18} /> العودة للوحة التحكم</Link>
        </header>

        <section className="overflow-hidden rounded-2xl border border-[#e5e8eb] bg-white shadow-[0_4px_18px_rgba(30,30,30,0.035)]">
          <div className="border-b border-[#edf0f2] px-6 py-5"><h2 className="font-bold text-[#24272b]">قائمة الحجوزات</h2><p className="mt-1 text-sm text-[#8a9098]">إجمالي {bookings.length.toLocaleString("ar-SA")} حجز</p></div>
          {bookings.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center px-5 text-center"><span className="flex size-14 items-center justify-center rounded-2xl bg-[#fff2e7] text-primary"><CalendarDaysIcon size={26} /></span><h3 className="mt-4 font-bold text-[#24272b]">لا توجد حجوزات بعد</h3><p className="mt-2 text-sm text-[#8a9098]">ستظهر الحجوزات هنا فور تسجيلها من الموقع.</p></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[70rem] text-right">
                <thead><tr className="bg-[#fafbfc] text-xs font-semibold text-[#8a9098]"><th className="px-6 py-4">رقم الحجز</th><th className="px-4 py-4">العميل</th><th className="px-4 py-4">الإقامة</th><th className="px-4 py-4">الأفراد</th><th className="px-4 py-4">السعر</th><th className="px-4 py-4">الحالة</th><th className="px-6 py-4">تاريخ الطلب</th></tr></thead>
                <tbody className="divide-y divide-[#f0f1f3]">
                  {bookings.map((booking) => {
                    const status = statusView(booking.status);
                    return <tr key={booking.id} className="align-top transition hover:bg-[#fcfcfd]">
                      <td className="px-6 py-5 font-semibold text-primary">#KS-{String(booking.id).padStart(4, "0")}</td>
                      <td className="px-4 py-5"><p className="font-semibold text-[#292c30]">{booking.customer.fullName}</p><p className="mt-1 flex items-center gap-1.5 text-xs text-[#8a9098]"><MailIcon size={13} />{booking.customer.email}</p><p className="mt-1 flex items-center gap-1.5 text-xs text-[#8a9098]" dir="ltr"><PhoneIcon size={13} />{booking.customer.phone}</p></td>
                      <td className="px-4 py-5 text-sm text-[#555b63]"><p>{dateFormatter.format(booking.checkIn)}</p><p className="mt-1">إلى {dateFormatter.format(booking.checkOut)}</p><p className="mt-1 text-xs text-[#9a9fa6]">{booking.nights} ليلة</p></td>
                      <td className="px-4 py-5"><span className="inline-flex items-center gap-2 text-sm text-[#555b63]"><UsersRoundIcon size={16} />{booking.guests}</span></td>
                      <td className="px-4 py-5"><p className="font-bold text-[#292c30]">{booking.totalPrice.toLocaleString("ar-SA")} ريال</p><p className="mt-1 text-xs text-[#9a9fa6]">{booking.pricePerNight} ريال / ليلة</p></td>
                      <td className="px-4 py-5"><span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>{status.label}</span></td>
                      <td className="px-6 py-5 text-sm text-[#737981]">{dateFormatter.format(booking.createdAt)}</td>
                    </tr>;
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
