"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BellIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  CircleQuestionMarkIcon,
  EyeIcon,
  HouseIcon,
  HotelIcon,
  ImageIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  MessageSquareTextIcon,
  EllipsisIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  TrendingUpIcon,
  UserRoundIcon,
  UsersRoundIcon,
  WalletCardsIcon,
  XIcon,
} from "@animateicons/react/lucide";

const contentNavigation = [
  { label: "الصفحة الرئيسية", icon: MessageSquareTextIcon, href: "/admin/content/home" },
  { label: "عن الكوخ", icon: ImageIcon, href: "/admin/content/about" },
  { label: "الأسئلة الشائعة", icon: CircleQuestionMarkIcon, href: "/admin/content/faqs" },
  { label: "تواصل معنا", icon: MessageSquareTextIcon, href: "/admin/content/contact" },
];

type DashboardBooking = { id: string; name: string; initials: string; unit: string; date: string; price: string; status: string };
type AdminDashboardProps = { bookings: DashboardBooking[]; summary: { bookingCount: number; revenue: number; customerCount: number } };

function bookingStatus(status: string) {
  if (status === "CONFIRMED") return { label: "مؤكد", style: "bg-[#eaf7f0] text-[#24855f]" };
  if (status === "CANCELLED") return { label: "ملغي", style: "bg-[#fdecec] text-[#c74343]" };
  return { label: "بانتظار الدفع", style: "bg-[#fff5df] text-[#b67612]" };
}

const occupancy = [
  { day: "س", value: 54 },
  { day: "ح", value: 68 },
  { day: "ن", value: 61 },
  { day: "ث", value: 82 },
  { day: "ر", value: 73 },
  { day: "خ", value: 91 },
  { day: "ج", value: 78 },
];

function SidebarContent({ onNavigate, bookingCount }: { onNavigate?: () => void; bookingCount: number }) {
  const navigation = [
    { label: "نظرة عامة", icon: LayoutDashboardIcon, active: true },
    { label: "الحجوزات", icon: CalendarDaysIcon, badge: String(bookingCount), href: "/admin/bookings" },
    { label: "الوحدات", icon: HouseIcon },
    { label: "العملاء", icon: UsersRoundIcon, href: "/admin/customers" },
  ];
  return (
    <div className="flex h-full flex-col bg-[#17191c] text-white">
      <div className="flex h-24 items-center gap-3 border-b border-white/8 px-6">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-white p-2 shadow-lg shadow-black/20">
          <Image
            src="/images/logo.png"
            alt="كوخ السرور"
            width={72}
            height={48}
            className="h-auto w-full object-contain"
          />
        </div>
        <div>
          <p className="text-base font-bold">كوخ السرور</p>
          <p className="mt-0.5 text-xs text-white/45">لوحة الإدارة</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-xs font-medium text-white/35">الإدارة</p>
        <div className="space-y-1">
          {navigation.map((item) => {
            const className = `flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                item.active
                  ? "bg-primary text-white shadow-lg shadow-primary/15"
                  : "text-white/62 hover:bg-white/6 hover:text-white"
              }`;
            const content = <><item.icon size={19} /><span>{item.label}</span>{item.badge && <span className="me-auto rounded-full bg-white/12 px-2 py-0.5 text-xs">{item.badge}</span>}</>;
            return item.href ? <Link key={item.label} href={item.href} onClick={onNavigate} className={className}>{content}</Link> : <button key={item.label} type="button" onClick={onNavigate} className={className}>
              {content}
            </button>;
          })}
        </div>

        <p className="mb-3 mt-8 px-3 text-xs font-medium text-white/35">المحتوى</p>
        <div className="space-y-1">
          {contentNavigation.map((item) => item.href ? (
            <Link
              key={item.label}
              onClick={onNavigate}
              href={item.href}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/62 transition hover:bg-white/6 hover:text-white"
            >
              <item.icon size={19} />
              <span>{item.label}</span>
            </Link>
          ) : (
            <button key={item.label} type="button" onClick={onNavigate} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/62 transition hover:bg-white/6 hover:text-white">
              <item.icon size={19} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="border-t border-white/8 p-4">
        <Link
          href="/admin/settings"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/62 transition hover:bg-white/6 hover:text-white"
        >
          <SettingsIcon size={19} />
          <span>الإعدادات</span>
        </Link>
        <button
          type="button"
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#e78a8a] transition hover:bg-[#c74343]/10"
        >
          <LogOutIcon size={19} />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard({ bookings, summary }: AdminDashboardProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const stats = [
    { title: "إجمالي الحجوزات", value: summary.bookingCount.toLocaleString("ar-SA"), note: "كل الحجوزات المسجلة", icon: CalendarDaysIcon, tone: "bg-[#fff2e7] text-[#a96026]" },
    { title: "إجمالي قيمة الحجوزات", value: `${summary.revenue.toLocaleString("ar-SA")} ريال`, note: "باستثناء الحجوزات الملغاة", icon: WalletCardsIcon, tone: "bg-[#eaf7f0] text-[#24855f]" },
    { title: "الحجوزات النشطة", value: summary.bookingCount.toLocaleString("ar-SA"), note: "قيد المتابعة والتأكيد", icon: HotelIcon, tone: "bg-[#ebf3fb] text-[#3279a8]" },
    { title: "إجمالي العملاء", value: summary.customerCount.toLocaleString("ar-SA"), note: "الحسابات المسجلة بالموقع", icon: UserRoundIcon, tone: "bg-[#f3edfb] text-[#8054a8]" },
  ];

  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      <aside className="fixed inset-y-0 right-0 z-40 hidden w-64 lg:block">
        <SidebarContent bookingCount={summary.bookingCount} />
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="إغلاق القائمة"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="absolute inset-y-0 right-0 w-[min(19rem,86vw)] shadow-2xl">
            <button
              type="button"
              aria-label="إغلاق القائمة"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute left-4 top-5 z-10 flex size-10 items-center justify-center rounded-xl bg-white/8 text-white transition hover:bg-white/14"
            >
              <XIcon size={20} />
            </button>
            <SidebarContent bookingCount={summary.bookingCount} onNavigate={() => setMobileMenuOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:mr-64">
        <header className="sticky top-0 z-30 border-b border-[#e8eaed] bg-white/92 backdrop-blur-xl">
          <div className="flex h-20 items-center gap-3 px-4 sm:px-6 xl:px-8">
            <button
              type="button"
              aria-label="فتح القائمة"
              onClick={() => setMobileMenuOpen(true)}
              className="flex size-11 items-center justify-center rounded-xl border border-[#e4e6e9] text-[#555b63] transition hover:bg-[#f5f6f7] lg:hidden"
            >
              <MenuIcon size={21} />
            </button>

            <div className="relative hidden min-w-0 max-w-md flex-1 md:block">
              <SearchIcon
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#92979e]"
              />
              <input
                type="search"
                placeholder="ابحث في لوحة التحكم..."
                className="h-11 w-full rounded-xl border border-[#e5e7ea] bg-[#f8f9fa] pr-11 pl-4 text-sm outline-none transition placeholder:text-[#a0a5ac] focus:border-primary/50 focus:bg-white focus:ring-4 focus:ring-primary/8"
              />
            </div>

            <div className="me-auto flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                aria-label="الإشعارات"
                className="relative flex size-11 items-center justify-center rounded-xl border border-[#e5e7ea] text-[#555b63] transition hover:bg-[#f6f7f8]"
              >
                <BellIcon size={19} />
                <span className="absolute left-2.5 top-2.5 size-2 rounded-full border-2 border-white bg-[#c74343]" />
              </button>

              <button
                type="button"
                className="flex items-center gap-3 rounded-xl p-1.5 text-right transition hover:bg-[#f6f7f8]"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#fff0e4] text-sm font-bold text-primary">
                  عم
                </span>
                <span className="hidden sm:block">
                  <span className="block text-sm font-semibold text-[#24272b]">عمر محمد</span>
                  <span className="block text-xs text-[#8a9098]">مدير النظام</span>
                </span>
                <ChevronDownIcon size={16} className="hidden text-[#8a9098] sm:block" />
              </button>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 sm:py-8 xl:px-8">
          <section className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-sm font-medium text-primary">الثلاثاء، 24 نوفمبر 2026</p>
              <h1 className="text-2xl font-bold tracking-tight text-[#202225] sm:text-3xl">
                صباح الخير، عمر
              </h1>
              <p className="mt-2 text-sm text-[#737981] sm:text-base">
                إليك ملخص أداء كوخ السرور اليوم.
              </p>
            </div>
            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2 self-start rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <PlusIcon size={18} />
              حجز جديد
            </button>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <article
                key={stat.title}
                className="rounded-2xl border border-[#e8eaed] bg-white p-5 shadow-[0_4px_18px_rgba(30,30,30,0.035)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className={`flex size-11 items-center justify-center rounded-xl ${stat.tone}`}>
                    <stat.icon size={21} />
                  </div>
                </div>
                <p className="mt-5 text-sm font-medium text-[#777d85]">{stat.title}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-[#202225]">{stat.value}</p>
                <p className="mt-2 text-xs text-[#9a9fa6]">{stat.note}</p>
              </article>
            ))}
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(19rem,0.75fr)]">
            <article className="overflow-hidden rounded-2xl border border-[#e8eaed] bg-white shadow-[0_4px_18px_rgba(30,30,30,0.035)]">
              <div className="flex items-center justify-between border-b border-[#edf0f2] px-5 py-5 sm:px-6">
                <div>
                  <h2 className="text-lg font-bold text-[#24272b]">أحدث الحجوزات</h2>
                  <p className="mt-1 text-sm text-[#8a9098]">آخر الحجوزات المسجلة بالنظام</p>
                </div>
                <Link href="/admin/bookings" className="text-sm font-semibold text-primary transition hover:text-primary-700">
                  عرض الكل
                </Link>
              </div>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[46rem] text-right">
                  <thead>
                    <tr className="bg-[#fafbfc] text-xs font-semibold text-[#8a9098]">
                      <th className="px-6 py-3.5">العميل</th>
                      <th className="px-4 py-3.5">الوحدة</th>
                      <th className="px-4 py-3.5">موعد الإقامة</th>
                      <th className="px-4 py-3.5">المبلغ</th>
                      <th className="px-4 py-3.5">الحالة</th>
                      <th className="px-4 py-3.5" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f1f3]">
                    {bookings.map((booking) => {
                      const status = bookingStatus(booking.status);
                      return (
                      <tr key={booking.id} className="transition hover:bg-[#fcfcfd]">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#f3f4f6] text-xs font-bold text-[#5d626a]">
                              {booking.initials}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-[#292c30]">{booking.name}</p>
                              <p className="mt-0.5 text-xs text-[#999ea5]">{booking.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-[#555b63]">{booking.unit}</td>
                        <td className="px-4 py-4 text-sm text-[#555b63]">{booking.date}</td>
                        <td className="px-4 py-4 text-sm font-semibold text-[#33373c]">{booking.price}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.style}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <button type="button" aria-label="خيارات الحجز" className="flex size-9 items-center justify-center rounded-lg text-[#8a9098] transition hover:bg-[#f0f2f4] hover:text-[#33373c]">
                            <EllipsisIcon size={18} />
                          </button>
                        </td>
                      </tr>);
                    })}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-[#edf0f2] md:hidden">
                {bookings.map((booking) => {
                  const status = bookingStatus(booking.status);
                  return (
                  <div key={booking.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#f3f4f6] text-xs font-bold text-[#5d626a]">
                        {booking.initials}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-[#292c30]">{booking.name}</p>
                            <p className="mt-0.5 text-xs text-[#999ea5]">{booking.id} · {booking.unit}</p>
                          </div>
                          <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${status.style}`}>
                            {status.label}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3 text-xs text-[#777d85]">
                          <span>{booking.date}</span>
                          <strong className="text-[#33373c]">{booking.price}</strong>
                        </div>
                      </div>
                    </div>
                  </div>);
                })}
              </div>
            </article>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
              <article className="rounded-2xl border border-[#e8eaed] bg-white p-5 shadow-[0_4px_18px_rgba(30,30,30,0.035)] sm:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-[#24272b]">معدل الإشغال</h2>
                    <p className="mt-1 text-sm text-[#8a9098]">آخر 7 أيام</p>
                  </div>
                  <span className="rounded-lg bg-[#f5f6f7] px-2.5 py-1.5 text-xs font-medium text-[#666c74]">أسبوعي</span>
                </div>
                <div className="mt-6 flex h-40 items-end justify-between gap-2 border-b border-[#eceef0] px-1">
                  {occupancy.map((item) => (
                    <div key={item.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                      <div className="group relative flex h-full w-full items-end justify-center">
                        <span className="absolute bottom-[calc(var(--bar-height)+6px)] hidden rounded-md bg-[#202225] px-2 py-1 text-xs text-white group-hover:block" style={{ "--bar-height": `${item.value}%` } as React.CSSProperties}>
                          {item.value}%
                        </span>
                        <div
                          className="w-full max-w-7 rounded-t-md bg-[#e9c9af] transition hover:bg-primary"
                          style={{ height: `${item.value}%` }}
                        />
                      </div>
                      <span className="pb-2 text-xs text-[#8f949b]">{item.day}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-[#202225]">78%</p>
                    <p className="mt-1 text-xs text-[#8a9098]">المتوسط الأسبوعي</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-[#24855f]">
                    <TrendingUpIcon size={14} /> 5.1%
                  </span>
                </div>
              </article>

              <article className="rounded-2xl bg-gradient-to-bl from-[#a96026] to-[#794019] p-5 text-white shadow-xl shadow-primary/15 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/70">إدارة المحتوى</p>
                    <h2 className="mt-2 text-xl font-bold">حدّث موقعك بسهولة</h2>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-white/70">
                      عدّل النصوص والصور التي تظهر للزوار من مكان واحد.
                    </p>
                  </div>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/12">
                    <EyeIcon size={21} />
                  </span>
                </div>
                <Link href="/admin/content/home" className="mt-5 inline-flex rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#82451d] transition hover:bg-[#fff7f0]">
                  إدارة المحتوى
                </Link>
              </article>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
