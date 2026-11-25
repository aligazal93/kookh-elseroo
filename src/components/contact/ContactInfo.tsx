import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@animateicons/react/lucide";

import type { SiteSettingsData } from "@/features/content/content.types";

export default function ContactInfo({ title, settings, locale }: { title: string; settings: SiteSettingsData; locale: "ar" | "en" }) {
  const labels = locale === "ar" ? { phone: "رقم الجوال", email: "البريد الإلكتروني", fax: "فاكس", location: "الموقع" } : { phone: "Phone number", email: "Email address", fax: "Fax", location: "Location" };
  const contactItems = [
    { key: "phone", value: settings.phone, Icon: PhoneIcon },
    { key: "email", value: settings.email, Icon: MailIcon },
    { key: "fax", value: settings.fax, Icon: MailIcon },
  ] as const;

  return (
    <aside className="rounded-2xl border border-primary/20 p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-secondary sm:text-xl">
        {title}
      </h2>

      <div className="mt-8 space-y-7">
        {contactItems.map(({ key, value, Icon }) => (
          <div key={key}>
            <div className="flex items-center gap-2 font-bold text-secondary">
              <Icon className="text-primary" size={20} />
              <span>{labels[key]}</span>
            </div>
            <p className="mt-2 text-lg font-semibold text-primary" dir="rtl">
              {value}
            </p>
          </div>
        ))}

        <div>
          <div className="flex items-center gap-2 font-bold text-secondary">
            <MapPinIcon className="text-primary" size={20} />
            <span>{labels.location}</span>
          </div>
          <p className="mt-2 text-lg font-semibold text-primary">
            {settings.address}
          </p>
        </div>
      </div>
    </aside>
  );
}
