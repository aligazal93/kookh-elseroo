"use client";

import { useLocale } from "next-intl";

import {
  usePathname,
  useRouter,
} from "@/i18n/navigation";
import Image from "next/image";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === "ar" ? "en" : "ar";

  function changeLanguage() {
    router.replace(pathname, {
      locale: nextLocale,
    });
  }

  return (
    <button
      type="button"
      onClick={changeLanguage}
      className="flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-primary-300 focus-visible:text-primary-300 focus-visible:outline-none"
      aria-label={
        locale === "ar"
          ? "Change language to English"
          : "تغيير اللغة إلى العربية"
      }
    >
     {locale === "ar" ? <Image src="/images/en.png" alt="English" width={24} height={24} className="cursor-pointer" /> : <Image src="/images/ar.png" alt="Arabic" width={24} className="cursor-pointer" height={24} />}
    </button>
  );
}
