import type { HomeLocale } from "@/features/home/home.types";

export type ContentLocale = HomeLocale;

export type TitledItem = { iconKey?: string; title: string; description: string };

export type AboutContent = {
  locale: ContentLocale;
  heroTitle: string;
  heroImage: string;
  storyEyebrow: string;
  storyTitle: string;
  storyFirst: string;
  storySecond: string;
  storyImage: string;
  storyImageAlt: string;
  valuesTitle: string;
  values: TitledItem[];
  facilitiesTitle: string;
  facilities: TitledItem[];
  policiesTitle: string;
  policies: TitledItem[];
};

export type FaqGroup = {
  title: string;
  items: Array<{ question: string; answer: string }>;
};

export type FaqContent = {
  locale: ContentLocale;
  title: string;
  heroImage: string;
  groups: FaqGroup[];
};

export type ContactFormLabels = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submit: string;
};

export type ContactContent = {
  locale: ContentLocale;
  title: string;
  heroImage: string;
  formTitle: string;
  formLabels: ContactFormLabels;
  contactSectionTitle: string;
  mapTitle: string;
};

export type SiteSettingsData = {
  locale: ContentLocale;
  siteName: string;
  headerLogo: string;
  footerLogo: string;
  phone: string;
  email: string;
  fax: string;
  address: string;
  mapEmbedUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  xUrl: string;
  whatsappUrl: string;
  footerCredit: string;
};

export type ContentPageName = "about" | "faqs" | "contact" | "settings";
