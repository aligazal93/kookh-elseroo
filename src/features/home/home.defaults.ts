import type { HomeLocale, HomePageData } from "./home.types";

const sharedGallery = [
  "/images/pic-1.png",
  "/images/pic-2.png",
  "/images/pic-3.png",
  "/images/bk.png",
  "/images/pic-1.png",
];

const arabic: HomePageData = {
  locale: "ar",
  hero: {
    title: "اهرب من صخب المدينة",
    subtitle: "واستمتع بإقامة هادئة في كوخ السرور",
    description:
      "كوخ مجهز بالكامل بإطلالة خلابة وسط الطبيعة، حيث الهدوء والخصوصية والتصميم العصري يلتقون في مكان واحد.",
    image: "/images/bk.png",
  },
  about: {
    eyebrow: "عن كوخ السرور",
    title: "ملاذك الهادئ بين الأشجار",
    description:
      "يقع كوخ السرور في قلب الطبيعة الخلابة، محاطاً بأشجار السرو العتيقة وإطلالات ساحرة على الجبال. صُمم الكوخ ليوفر تجربة إقامة فاخرة تجمع بين سحر الطبيعة وراحة المنزل العصري.",
    videoUrl: "https://www.youtube.com/embed/Glcw-WGzD_g?si=0u0-KnX85yF9mBp6",
  },
  amenitiesSection: {
    eyebrow: "المرافق والخدمات",
    title: "كل ما تحتاجه لإقامة مثالية",
  },
  gallerySection: { eyebrow: "صور من الكوخ", title: "اكتشف جمال المكان" },
  testimonialsSection: { eyebrow: "آراء الضيوف", title: "ماذا يقول ضيوفنا" },
  cta: {
    title: "جاهز لتجربة لا تُنسى؟",
    description: "احجز إقامتك الآن واستمتع بأجمل الأوقات وسط الطبيعة",
    buttonLabel: "ابدأ الحجز الآن",
  },
  amenities: [
    ["wifi", "واي فاي مجاني", "اتصال سريع بالإنترنت"],
    ["fireplace", "مدفأة", "أجواء دافئة في الشتاء"],
    ["mountain", "إطلالة طبيعية", "مناظر خلابة على الجبال"],
    ["kitchen", "مطبخ مجهز", "كل ما تحتاجه للطهي"],
    ["parking", "موقف سيارات", "موقف خاص ومجاني"],
    ["airConditioning", "تكييف", "تحكم كامل بدرجة الحرارة"],
  ].map(([iconKey, name, description], sortOrder) => ({
    iconKey: iconKey as HomePageData["amenities"][number]["iconKey"],
    name,
    description,
    sortOrder,
    isActive: true,
  })),
  galleryImages: sharedGallery.map((imageUrl, sortOrder) => ({
    imageUrl,
    alt: ["جلسة داخلية في الكوخ", "جلسة خارجية وسط الطبيعة", "الكوخ بين الجبال", "واجهة الكوخ وقت الغروب", "تفاصيل الأثاث داخل الكوخ"][sortOrder],
    sortOrder,
    isActive: true,
  })),
  testimonials: [
    { name: "أحمد العتيبي", text: "تجربة رائعة! المكان نظيف جداً وهادئ والطبيعة المحيطة بالكوخ جميلة بشكل لا يوصف.", rating: 5 },
    { name: "محمد السالم", text: "مكان يفوق التوقعات، مناسب للاسترخاء وقضاء وقت مميز بعيداً عن ضوضاء المدينة.", rating: 4 },
  ].map((item, sortOrder) => ({ ...item, sortOrder, isActive: true })),
};

const english: HomePageData = {
  locale: "en",
  hero: {
    title: "Escape the noise of the city",
    subtitle: "And enjoy a peaceful stay at Kookh Al Soroor",
    description:
      "A fully equipped cabin with a breathtaking view surrounded by nature, where tranquility, privacy and modern design meet.",
    image: "/images/bk.png",
  },
  about: {
    eyebrow: "About Kookh Al Soroor",
    title: "Your peaceful escape among the trees",
    description:
      "Kookh Al Soroor is located in the heart of beautiful nature, surrounded by cypress trees and breathtaking mountain views. The cabin offers a luxurious stay that combines the charm of nature with modern comfort.",
    videoUrl: "https://www.youtube.com/embed/Glcw-WGzD_g?si=0u0-KnX85yF9mBp6",
  },
  amenitiesSection: { eyebrow: "Amenities & services", title: "Everything you need for a perfect stay" },
  gallerySection: { eyebrow: "Cabin gallery", title: "Discover the beauty of the place" },
  testimonialsSection: { eyebrow: "Guest reviews", title: "What our guests say" },
  cta: {
    title: "Ready for an unforgettable stay?",
    description: "Book your stay now and enjoy beautiful moments surrounded by nature.",
    buttonLabel: "Start booking",
  },
  amenities: [
    ["wifi", "Free Wi-Fi", "Fast internet connection"],
    ["fireplace", "Fireplace", "A warm atmosphere in winter"],
    ["mountain", "Scenic view", "Breathtaking mountain views"],
    ["kitchen", "Equipped kitchen", "Everything you need for cooking"],
    ["parking", "Private parking", "Free private parking"],
    ["airConditioning", "Air conditioning", "Full temperature control"],
  ].map(([iconKey, name, description], sortOrder) => ({
    iconKey: iconKey as HomePageData["amenities"][number]["iconKey"],
    name,
    description,
    sortOrder,
    isActive: true,
  })),
  galleryImages: sharedGallery.map((imageUrl, sortOrder) => ({
    imageUrl,
    alt: ["Indoor seating area in the cabin", "Outdoor seating surrounded by nature", "The cabin among the mountains", "The cabin exterior at sunset", "Furniture details inside the cabin"][sortOrder],
    sortOrder,
    isActive: true,
  })),
  testimonials: [
    { name: "Ahmed Alotaibi", text: "A wonderful experience! The place was very clean and peaceful, and the surrounding nature was incredibly beautiful.", rating: 5 },
    { name: "Mohammed Alsalem", text: "The place exceeded our expectations. It is perfect for relaxing and enjoying quality time away from the noise of the city.", rating: 4 },
  ].map((item, sortOrder) => ({ ...item, sortOrder, isActive: true })),
};

export const defaultHomeContent: Record<HomeLocale, HomePageData> = {
  ar: arabic,
  en: english,
};
