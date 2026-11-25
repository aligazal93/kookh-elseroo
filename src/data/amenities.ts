export const amenities = [
  {
    id: "amenity-wifi",
    iconKey: "wifi",
    name: { ar: "واي فاي مجاني", en: "Free Wi-Fi" },
    description: { ar: "اتصال سريع بالإنترنت", en: "Fast internet connection" },
  },
  {
    id: "amenity-fireplace",
    iconKey: "fireplace",
    name: { ar: "مدفأة", en: "Fireplace" },
    description: { ar: "أجواء دافئة في الشتاء", en: "A warm atmosphere in winter" },
  },
  {
    id: "amenity-scenic-view",
    iconKey: "mountain",
    name: { ar: "إطلالة طبيعية", en: "Scenic view" },
    description: { ar: "مناظر خلابة على الجبال", en: "Breathtaking mountain views" },
  },
  {
    id: "amenity-equipped-kitchen",
    iconKey: "kitchen",
    name: { ar: "مطبخ مجهز", en: "Equipped kitchen" },
    description: { ar: "كل ما تحتاجه للطهي", en: "Everything you need for cooking" },
  },
  {
    id: "amenity-private-parking",
    iconKey: "parking",
    name: { ar: "موقف سيارات", en: "Private parking" },
    description: { ar: "موقف خاص ومجاني", en: "Free private parking" },
  },
  {
    id: "amenity-air-conditioning",
    iconKey: "airConditioning",
    name: { ar: "تكييف", en: "Air conditioning" },
    description: { ar: "تحكم كامل بدرجة الحرارة", en: "Full temperature control" },
  },
] as const;
