import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  MessageCircleIcon,
  TwitterIcon,
} from "@animateicons/react/lucide";
import { getLocale } from "next-intl/server";
import { getSiteSettings } from "@/features/content/content.service";

export default async function Footer() {
  const locale = await getLocale();
  const settings = await getSiteSettings(locale === "en" ? "en" : "ar");
  const socialLinks = [
    { label: "Instagram", href: settings.instagramUrl, Icon: InstagramIcon },
    { label: "Facebook", href: settings.facebookUrl, Icon: FacebookIcon },
    { label: "X", href: settings.xUrl, Icon: TwitterIcon },
    { label: "WhatsApp", href: settings.whatsappUrl, Icon: MessageCircleIcon },
  ];
  return (
    <footer className="border-t border-primary/10 bg-surface px-5 py-2 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <Image
          src={settings.footerLogo}
          alt={settings.siteName}
          width={129}
          height={56}
          className="h-auto w-28"
        />

        <div className="flex items-center gap-3">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary transition hover:bg-primary hover:text-white"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
      <div className="text-center font-bold text-primary pt-4">
        <p className="text-sm text-surface/50">
         {settings.footerCredit}
          
        </p>
      </div>
    </footer>
  );
}
