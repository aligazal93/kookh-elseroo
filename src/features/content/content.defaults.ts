import type {
  AboutContent,
  ContactContent,
  ContentLocale,
  FaqContent,
  SiteSettingsData,
} from "./content.types";

const aboutAr: AboutContent = {
  locale: "ar", heroTitle: "عن كوخ السرور", heroImage: "/images/road.png",
  storyEyebrow: "عن كوخ السرور", storyTitle: "ملاذك الهادئ بين الأشجار",
  storyFirst: "بدأت فكرة كوخ السرور من حلم بسيط: توفير ملاذ هادئ وسط الطبيعة يجمع بين الفخامة والبساطة.",
  storySecond: "صممنا كل تفصيلة بعناية لنمنح ضيوفنا تجربة استثنائية وسط أجمل المناظر الطبيعية.",
  storyImage: "/images/pic-4.png", storyImageAlt: "كوخ السرور وسط الطبيعة",
  valuesTitle: "رؤيتنا وقيمنا", values: [
    { iconKey: "nature", title: "صديق للبيئة", description: "نلتزم بالاستدامة في كل تفاصيل الكوخ." },
    { iconKey: "experience", title: "تجربة فريدة", description: "كل ضيف يحظى بتجربة شخصية لا تُنسى." },
    { iconKey: "location", title: "قلب الطبيعة", description: "موقع مثالي بعيد عن صخب المدينة." },
  ],
  facilitiesTitle: "المرافق والخدمات", facilities: [
    { iconKey: "wifi", title: "واي فاي مجاني", description: "اتصال سريع بالإنترنت" },
    { iconKey: "fireplace", title: "مدفأة", description: "أجواء دافئة في الشتاء" },
    { iconKey: "view", title: "إطلالة طبيعية", description: "مناظر خلابة على الجبال" },
    { iconKey: "kitchen", title: "مطبخ مجهز", description: "كل ما تحتاجه للطهي" },
    { iconKey: "parking", title: "موقف سيارات", description: "موقف خاص ومجاني" },
    { iconKey: "ac", title: "تكييف", description: "تحكم كامل بالحرارة" },
  ],
  policiesTitle: "سياسات الإقامة", policies: [
    { title: "سياسة الإلغاء", description: "يمكنك إلغاء الحجز مجاناً قبل 48 ساعة من موعد الوصول." },
    { title: "أوقات الوصول والمغادرة", description: "الوصول من الساعة 3:00 مساءً والمغادرة قبل 12:00 ظهراً." },
  ],
};

const aboutEn: AboutContent = {
  ...aboutAr, locale: "en", heroTitle: "About Kookh Al Soroor", storyEyebrow: "About Kookh Al Soroor",
  storyTitle: "Your peaceful escape among the trees", storyFirst: "Kookh Al Soroor began with a simple dream: to create a peaceful retreat in nature.",
  storySecond: "Every detail was thoughtfully designed to give our guests an exceptional experience.", storyImageAlt: "Kookh Al Soroor surrounded by nature",
  valuesTitle: "Our vision and values", values: [
    { iconKey: "nature", title: "Eco-friendly", description: "We are committed to sustainability in every detail." },
    { iconKey: "experience", title: "A unique experience", description: "Every guest enjoys a personal and unforgettable stay." },
    { iconKey: "location", title: "In the heart of nature", description: "A perfect location away from the city." },
  ], facilitiesTitle: "Amenities and services", facilities: [
    { iconKey: "wifi", title: "Free Wi-Fi", description: "Fast internet connection" },
    { iconKey: "fireplace", title: "Fireplace", description: "A warm winter atmosphere" },
    { iconKey: "view", title: "Scenic view", description: "Breathtaking mountain views" },
  ], policiesTitle: "Stay policies", policies: [
    { title: "Cancellation policy", description: "Cancel free of charge up to 48 hours before arrival." },
    { title: "Check-in and check-out", description: "Check-in starts at 3:00 PM and check-out is before 12:00 PM." },
  ],
};

const faqAr: FaqContent = { locale: "ar", title: "الأسئلة الشائعة", heroImage: "/images/road.png", groups: [
  { title: "الحجز", items: [{ question: "ما هي سياسة الإلغاء؟", answer: "يمكنك إلغاء الحجز مجاناً قبل 48 ساعة من موعد الوصول." }] },
  { title: "الدفع", items: [{ question: "ما هي طرق الدفع المتاحة؟", answer: "نقبل البطاقات الائتمانية والدفع عند الوصول." }] },
] };
const faqEn: FaqContent = { locale: "en", title: "Frequently asked questions", heroImage: "/images/road.png", groups: [
  { title: "Booking", items: [{ question: "What is the cancellation policy?", answer: "Cancel free of charge up to 48 hours before arrival." }] },
  { title: "Payment", items: [{ question: "Which payment methods are available?", answer: "We accept credit cards and payment upon arrival." }] },
] };

const contactAr: ContactContent = { locale: "ar", title: "تواصل معنا", heroImage: "/images/road.png", formTitle: "نسعد بتواصلك معنا والإجابة على استفساراتك", contactSectionTitle: "تواصل معنا من خلال", mapTitle: "موقع كوخ السرور على الخريطة", formLabels: { firstName: "الاسم الأول", lastName: "الاسم الأخير", phone: "رقم الجوال", email: "البريد الإلكتروني", message: "كيف يمكننا المساعدة؟", firstNamePlaceholder: "أدخل الاسم الأول", lastNamePlaceholder: "أدخل الاسم الأخير", emailPlaceholder: "أدخل البريد الإلكتروني", messagePlaceholder: "اكتب رسالتك هنا", submit: "إرسال" } };
const contactEn: ContactContent = { locale: "en", title: "Contact us", heroImage: "/images/road.png", formTitle: "We are happy to answer your questions", contactSectionTitle: "Get in touch", mapTitle: "Kookh Al Soroor location on the map", formLabels: { firstName: "First name", lastName: "Last name", phone: "Phone number", email: "Email address", message: "How can we help?", firstNamePlaceholder: "Enter your first name", lastNamePlaceholder: "Enter your last name", emailPlaceholder: "Enter your email address", messagePlaceholder: "Write your message here", submit: "Send" } };

const settingsAr: SiteSettingsData = { locale: "ar", siteName: "كوخ السرور", headerLogo: "/images/logo.png", footerLogo: "/images/logo-footer.png", phone: "+966 50 123 4567", email: "info@cypress-cabin.com", fax: "+966 50 123 4567", address: "وادي السرور، المنطقة الجبلية", mapEmbedUrl: "https://www.google.com/maps?q=Abha%20Saudi%20Arabia&output=embed", instagramUrl: "#", facebookUrl: "#", xUrl: "#", whatsappUrl: "#", footerCredit: "BY Ali Ghazal © 2026" };
const settingsEn: SiteSettingsData = { ...settingsAr, locale: "en", siteName: "Kookh Al Soroor", address: "Wadi Al Soroor, Mountain Region" };

export const aboutDefaults: Record<ContentLocale, AboutContent> = { ar: aboutAr, en: aboutEn };
export const faqDefaults: Record<ContentLocale, FaqContent> = { ar: faqAr, en: faqEn };
export const contactDefaults: Record<ContentLocale, ContactContent> = { ar: contactAr, en: contactEn };
export const settingsDefaults: Record<ContentLocale, SiteSettingsData> = { ar: settingsAr, en: settingsEn };
