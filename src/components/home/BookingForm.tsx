"use client";

import { ArrowLeftIcon, CalendarDaysIcon, UsersRoundIcon, XIcon } from "@animateicons/react/lucide";
import { useTranslations } from "next-intl";
import { FormEvent, useMemo, useState } from "react";

type Toast = { type: "success" | "error"; message: string } | null;

export default function BookingForm() {
  const t = useTranslations("Hero");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [pending, setPending] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const today = new Date().toISOString().slice(0, 10);

  const estimate = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    const nights = Math.round((new Date(`${checkOut}T00:00:00Z`).getTime() - new Date(`${checkIn}T00:00:00Z`).getTime()) / 86_400_000);
    return nights > 0 ? { nights, total: nights * 100 } : null;
  }, [checkIn, checkOut]);

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setToast(null);
    setPending(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkIn, checkOut, guests: Number(guests) }),
      });
      const result = await response.json();

      if (response.status === 409) {
        setToast({ type: "error", message: t("alreadyBooked") });
      } else if (response.status === 401) {
        setToast({ type: "error", message: t("loginRequired") });
      } else if (!response.ok) {
        setToast({ type: "error", message: t("invalidDates") });
      } else {
        setToast({ type: "success", message: t("bookingSuccess", { total: result.booking.totalPrice }) });
        setCheckIn("");
        setCheckOut("");
        setGuests("2");
      }
    } catch {
      setToast({ type: "error", message: t("bookingError") });
    } finally {
      setPending(false);
    }
  }

  const fieldClass = "flex min-h-16 flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 text-white transition focus-within:border-primary/80 hover:bg-white/10 sm:min-w-48";

  return (
    <>
      {toast && (
        <div role="status" className={`fixed end-5 top-24 z-[100] flex max-w-md items-start gap-3 rounded-2xl border px-5 py-4 text-sm font-semibold shadow-2xl backdrop-blur-xl ${toast.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}>
          <p className="leading-6">{toast.message}</p>
          <button type="button" onClick={() => setToast(null)} aria-label={t("closeToast")} className="mt-0.5 shrink-0"><XIcon size={18} /></button>
        </div>
      )}

      <form onSubmit={submitBooking} className="mx-auto grid w-full max-w-5xl gap-2.5 rounded-2xl border border-white/10 bg-secondary/75 p-3 shadow-hero-form backdrop-blur-md sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:gap-3 lg:rounded-[1.25rem] lg:p-4">
        <label className={fieldClass}>
          <CalendarDaysIcon className="shrink-0 text-white/65" size={19} />
          <span className="min-w-0 flex-1"><span className="block text-xs text-white/65">{t("arrivalDate")}</span><input required type="date" min={today} value={checkIn} onChange={(event) => setCheckIn(event.target.value)} className="mt-1 w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]" /></span>
        </label>

        <label className={fieldClass}>
          <CalendarDaysIcon className="shrink-0 text-white/65" size={19} />
          <span className="min-w-0 flex-1"><span className="block text-xs text-white/65">{t("departureDate")}</span><input required type="date" min={checkIn || today} value={checkOut} onChange={(event) => setCheckOut(event.target.value)} className="mt-1 w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]" /></span>
        </label>

        <label className={fieldClass}>
          <UsersRoundIcon className="shrink-0 text-white/65" size={19} />
          <span className="min-w-0 flex-1"><span className="block text-xs text-white/65">{t("guests")}</span><select value={guests} onChange={(event) => setGuests(event.target.value)} className="mt-1 w-full cursor-pointer bg-transparent text-sm text-white outline-none">{Array.from({ length: 10 }, (_, index) => <option key={index + 1} className="text-secondary" value={index + 1}>{index + 1}</option>)}</select></span>
        </label>

        <button disabled={pending || !estimate} type="submit" className="flex min-h-16 min-w-48 flex-col items-center justify-center rounded-xl bg-primary px-7 text-sm font-semibold text-white shadow-lg shadow-black/15 transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2 lg:col-span-1">
          <span className="flex items-center gap-2">{pending ? t("bookingPending") : t("checkAvailability")}<ArrowLeftIcon className="rtl:rotate-0 ltr:rotate-180" size={18} /></span>
          <span className="mt-1 text-xs font-normal text-white/75">{estimate ? t("priceSummary", { nights: estimate.nights, total: estimate.total }) : t("nightPrice")}</span>
        </button>
      </form>
    </>
  );
}
