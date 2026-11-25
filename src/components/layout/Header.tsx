import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./Language";
import { MenuIcon, UserRoundIcon } from "@animateicons/react/lucide";
import { getLocale } from "next-intl/server";
import { getSiteSettings } from "@/features/content/content.service";
import { getCurrentCustomer } from "@/features/auth/auth";
import LogoutButton from "@/components/auth/LogoutButton";

const navigationLinks = [
  {
    key: "home",
    href: "/",
  },
  {
    key: "about",
    href: "/about",
  },
  {
    key: "faq",
    href: "/faqs",
  },
  {
    key: "contact",
    href: "/contact",
  },
] as const;

export default async function Header() {
  const t = await getTranslations("Navigation");
  const locale = await getLocale();
  const settings = await getSiteSettings(locale === "en" ? "en" : "ar");
  const customer = await getCurrentCustomer();

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10 lg:py-5">
        <div className="flex items-center gap-8 xl:gap-12">
          <Link href="/" aria-label={t("home")}>
            <Image
              src={settings.headerLogo}
              alt={settings.siteName}
              width={115}
              height={60}
              priority
              className="h-auto w-24 drop-shadow-md lg:w-28"
            />
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 lg:flex xl:gap-9"
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-sm font-medium text-white drop-shadow-sm transition-colors hover:text-primary-300 focus-visible:text-primary-300 focus-visible:outline-none"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-5 sm:flex lg:gap-7">
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          {customer ? (
            <div className="hidden items-center gap-2 text-sm font-medium text-white sm:flex">
              <UserRoundIcon size={18} />
              <div><span className="block">{customer.fullName}</span><LogoutButton label={t("logout")} /></div>
            </div>
          ) : (
            <Link href="/login" className="hidden items-center gap-2 text-sm font-medium text-white transition-colors hover:text-primary-300 focus-visible:text-primary-300 focus-visible:outline-none sm:flex">
              <UserRoundIcon size={18} /><span>{t("login")}</span>
            </Link>
          )}

          <Link
            href="/booking"
            className="hidden min-w-32 rounded-button bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-black/15 transition-colors hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:block"
          >
            {t("bookNow")}
          </Link>
        </div>

        <details className="group relative lg:hidden">
          <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md transition hover:bg-black/35 [&::-webkit-details-marker]:hidden">
            <MenuIcon size={22} />
            <span className="sr-only">Main navigation</span>
          </summary>
          <div className="absolute end-0 top-14 w-64 overflow-hidden rounded-2xl border border-white/10 bg-secondary/95 p-3 shadow-dropdown backdrop-blur-xl">
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {navigationLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 hover:text-primary-300"
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>
            <div className="mt-2 flex items-center justify-between border-t border-white/10 px-4 pt-3">
              <LanguageSwitcher />
              {customer ? (
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <UserRoundIcon size={18} /><div><span className="block">{customer.fullName}</span>
                  <LogoutButton label={t("logout")} /></div>
                </div>
              ) : (
                <Link href="/login" className="flex items-center gap-2 text-sm font-medium text-white transition hover:text-primary-300">
                  <UserRoundIcon size={18} /><span>{t("login")}</span>
                </Link>
              )}
            </div>
            <Link
              href="/"
              className="mt-4 block rounded-button bg-primary px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-primary-600"
            >
              {t("bookNow")}
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
