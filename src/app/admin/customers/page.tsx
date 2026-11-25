import Link from "next/link";
import { ArrowRightIcon, MailIcon, PhoneIcon, UserRoundIcon, UsersRoundIcon } from "@animateicons/react/lucide";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    select: { id: true, fullName: true, email: true, phone: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  const dateFormatter = new Intl.DateTimeFormat("ar-EG", { dateStyle: "medium", timeStyle: "short" });

  return (
    <main className="min-h-screen bg-[#f6f7f9] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary"><UsersRoundIcon size={18} /> إدارة العملاء</div>
            <h1 className="text-3xl font-bold text-[#202225]">العملاء المسجلون</h1>
            <p className="mt-2 text-sm text-[#737981]">كل حساب يتم إنشاؤه من صفحة التسجيل سيظهر هنا تلقائياً.</p>
          </div>
          <Link href="/admin" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#e2e5e8] bg-white px-5 text-sm font-semibold text-[#555b63] transition hover:bg-[#fafafa]">
            <ArrowRightIcon size={18} /> العودة للوحة التحكم
          </Link>
        </div>

        <section className="overflow-hidden rounded-2xl border border-[#e5e8eb] bg-white shadow-[0_4px_18px_rgba(30,30,30,0.035)]">
          <div className="flex items-center justify-between border-b border-[#edf0f2] px-5 py-5 sm:px-6">
            <div><h2 className="font-bold text-[#24272b]">قائمة العملاء</h2><p className="mt-1 text-sm text-[#8a9098]">إجمالي {customers.length} عميل</p></div>
          </div>

          {customers.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center px-5 text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-[#fff2e7] text-primary"><UserRoundIcon size={26} /></span>
              <h3 className="mt-4 font-bold text-[#24272b]">لا يوجد عملاء بعد</h3>
              <p className="mt-2 text-sm text-[#8a9098]">سيظهر أول عميل هنا بعد إنشاء حساب من الموقع.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[48rem] text-right">
                <thead><tr className="bg-[#fafbfc] text-xs font-semibold text-[#8a9098]"><th className="px-6 py-4">العميل</th><th className="px-4 py-4">البريد الإلكتروني</th><th className="px-4 py-4">رقم الجوال</th><th className="px-6 py-4">تاريخ التسجيل</th></tr></thead>
                <tbody className="divide-y divide-[#f0f1f3]">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="transition hover:bg-[#fcfcfd]">
                      <td className="px-6 py-4"><div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-[#fff0e4] font-bold text-primary">{customer.fullName.slice(0, 1)}</span><div><p className="font-semibold text-[#292c30]">{customer.fullName}</p><p className="mt-0.5 text-xs text-[#9a9fa6]">#{customer.id}</p></div></div></td>
                      <td className="px-4 py-4"><span className="inline-flex items-center gap-2 text-sm text-[#626870]"><MailIcon size={16} />{customer.email}</span></td>
                      <td className="px-4 py-4"><span className="inline-flex items-center gap-2 text-sm text-[#626870]" dir="ltr"><PhoneIcon size={16} />{customer.phone}</span></td>
                      <td className="px-6 py-4 text-sm text-[#737981]">{dateFormatter.format(customer.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
