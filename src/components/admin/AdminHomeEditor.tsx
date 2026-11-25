"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRightIcon,
  CheckIcon,
  CloudUploadIcon,
  EyeIcon,
  ImageIcon,
  LoaderCircleIcon,
  PlusIcon,
  SaveIcon,
  Trash2Icon,
} from "@animateicons/react/lucide";

import {
  AMENITY_ICON_KEYS,
  type HomeLocale,
  type HomePageData,
} from "@/features/home/home.types";

type Notice = { type: "success" | "error"; message: string } | null;

const inputClass =
  "mt-2 min-h-11 w-full rounded-xl border border-[#dde1e5] bg-white px-3.5 text-sm text-[#25282c] outline-none transition placeholder:text-[#a3a8ae] focus:border-primary/55 focus:ring-4 focus:ring-primary/8";

function Field({
  label,
  value,
  onChange,
  multiline = false,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  hint?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-[#4a4f55]">
      {label}
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          className={`${inputClass} resize-y py-3 leading-7`}
        />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} />
      )}
      {hint && <span className="mt-1.5 block text-xs font-normal text-[#92979e]">{hint}</span>}
    </label>
  );
}

function ImageUploadField({
  label,
  value,
  onUploaded,
}: {
  label: string;
  value: string;
  onUploaded: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/admin/uploads/images", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.message ?? "تعذر رفع الصورة");
      onUploaded(result.data.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "تعذر رفع الصورة");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <p className="text-sm font-semibold text-[#4a4f55]">{label}</p>
      <div className="mt-2 grid gap-3 sm:grid-cols-[8rem_1fr] sm:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#e1e4e7] bg-[#f1f3f5]">
          {value ? (
            <Image src={value} alt="معاينة الصورة" fill sizes="128px" className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-[#a2a7ad]">
              <ImageIcon size={25} />
            </div>
          )}
        </div>
        <div>
          <label className={`flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-primary/45 bg-primary/5 px-4 text-sm font-bold text-primary transition hover:bg-primary/10 ${uploading ? "pointer-events-none opacity-60" : ""}`}>
            {uploading ? <LoaderCircleIcon size={18} className="animate-spin" /> : <CloudUploadIcon size={18} />}
            {uploading ? "جاري رفع الصورة..." : "اختر صورة من جهازك"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="sr-only"
              disabled={uploading}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) upload(file);
                event.target.value = "";
              }}
            />
          </label>
          <p className="mt-2 break-all text-xs text-[#8d939a]">{value || "لم يتم اختيار صورة"}</p>
          <p className="mt-1 text-xs text-[#a0a5ab]">JPG أو PNG أو WEBP أو GIF — بحد أقصى 5MB</p>
          {error && <p className="mt-1.5 text-xs font-semibold text-[#c74343]">{error}</p>}
        </div>
      </div>
    </div>
  );
}

function Card({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#e3e6e9] bg-white shadow-[0_5px_20px_rgba(25,28,32,0.04)]">
      <div className="border-b border-[#eceef0] px-5 py-5 sm:px-6">
        <h2 className="text-lg font-bold text-[#24272b]">{title}</h2>
        <p className="mt-1 text-sm text-[#858b92]">{description}</p>
      </div>
      <div className="grid gap-5 p-5 sm:p-6">{children}</div>
    </section>
  );
}

export default function AdminHomeEditor() {
  const [locale, setLocale] = useState<HomeLocale>("ar");
  const [content, setContent] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadContent() {
      setLoading(true);
      setNotice(null);
      try {
        const response = await fetch(`/api/admin/home/${locale}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message ?? "تعذر تحميل المحتوى");
        setContent(result.data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setNotice({ type: "error", message: error instanceof Error ? error.message : "تعذر تحميل المحتوى" });
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadContent();
    return () => controller.abort();
  }, [locale]);

  function updateSection<K extends keyof Pick<HomePageData, "hero" | "about" | "amenitiesSection" | "gallerySection" | "testimonialsSection" | "cta">>(
    section: K,
    field: keyof HomePageData[K],
    value: string,
  ) {
    setContent((current) => current ? {
      ...current,
      [section]: { ...current[section], [field]: value },
    } : current);
  }

  async function save() {
    if (!content) return;
    setSaving(true);
    setNotice(null);
    try {
      const response = await fetch(`/api/admin/home/${locale}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const result = await response.json();
      if (!response.ok) {
        const details = Array.isArray(result.errors) ? `: ${result.errors.join("، ")}` : "";
        throw new Error(`${result.message ?? "تعذر الحفظ"}${details}`);
      }
      setContent(result.data);
      setNotice({ type: "success", message: "تم حفظ محتوى الصفحة الرئيسية بنجاح" });
    } catch (error) {
      setNotice({ type: "error", message: error instanceof Error ? error.message : "تعذر حفظ المحتوى" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      <header className="sticky top-0 z-30 border-b border-[#e5e8eb] bg-white/94 backdrop-blur-xl">
        <div className="mx-auto flex min-h-20 max-w-[90rem] flex-wrap items-center gap-3 px-4 py-3 sm:px-6 xl:px-8">
          <Link href="/admin" className="flex size-11 items-center justify-center rounded-xl border border-[#e1e4e7] text-[#5c6269] transition hover:bg-[#f4f5f6]" aria-label="العودة للوحة التحكم">
            <ArrowRightIcon size={20} />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-[#222529] sm:text-xl">إدارة الصفحة الرئيسية</h1>
            <p className="mt-0.5 text-xs text-[#8a9097] sm:text-sm">عدّل المحتوى الذي يظهر مباشرة لزوار الموقع</p>
          </div>

          <div className="me-auto flex items-center gap-2">
            <Link href={`/${locale}`} target="_blank" className="hidden h-11 items-center gap-2 rounded-xl border border-[#dfe2e5] bg-white px-4 text-sm font-semibold text-[#555b62] transition hover:bg-[#f6f7f8] sm:flex">
              <EyeIcon size={18} /> معاينة
            </Link>
            <button type="button" onClick={save} disabled={!content || saving} className="flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-lg shadow-primary/15 transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-55">
              {saving ? <LoaderCircleIcon size={18} className="animate-spin" /> : <SaveIcon size={18} />}
              {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[90rem] px-4 py-6 sm:px-6 sm:py-8 xl:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex self-start rounded-xl border border-[#e0e3e6] bg-white p-1">
            {(["ar", "en"] as HomeLocale[]).map((item) => (
              <button key={item} type="button" onClick={() => setLocale(item)} className={`min-w-28 rounded-lg px-4 py-2.5 text-sm font-bold transition ${locale === item ? "bg-[#202225] text-white shadow" : "text-[#757b82] hover:bg-[#f5f6f7]"}`}>
                {item === "ar" ? "العربية" : "English"}
              </button>
            ))}
          </div>
          {notice && (
            <div className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${notice.type === "success" ? "bg-[#e8f7ef] text-[#247553]" : "bg-[#fdecec] text-[#b83f3f]"}`}>
              {notice.type === "success" && <CheckIcon size={17} />}
              {notice.message}
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex min-h-[50vh] items-center justify-center rounded-2xl border border-[#e3e6e9] bg-white">
            <div className="text-center text-[#777d84]">
              <LoaderCircleIcon size={32} className="mx-auto animate-spin text-primary" />
              <p className="mt-3 text-sm">جاري تحميل المحتوى...</p>
            </div>
          </div>
        ) : content ? (
          <div className="grid items-start gap-5 xl:grid-cols-2">
            <div className="grid gap-5">
              <Card title="القسم الرئيسي" description="أول محتوى وصورة يراها الزائر">
                <Field label="العنوان الرئيسي" value={content.hero.title} onChange={(value) => updateSection("hero", "title", value)} />
                <Field label="العنوان الفرعي" value={content.hero.subtitle} onChange={(value) => updateSection("hero", "subtitle", value)} />
                <Field label="الوصف" value={content.hero.description} multiline onChange={(value) => updateSection("hero", "description", value)} />
                <ImageUploadField label="صورة الخلفية" value={content.hero.image} onUploaded={(value) => updateSection("hero", "image", value)} />
              </Card>

              <Card title="قسم عن الكوخ" description="النص والفيديو التعريفي">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="العنوان الصغير" value={content.about.eyebrow} onChange={(value) => updateSection("about", "eyebrow", value)} />
                  <Field label="العنوان" value={content.about.title} onChange={(value) => updateSection("about", "title", value)} />
                </div>
                <Field label="الوصف" value={content.about.description} multiline onChange={(value) => updateSection("about", "description", value)} />
                <Field label="رابط تضمين YouTube" value={content.about.videoUrl} onChange={(value) => updateSection("about", "videoUrl", value)} />
              </Card>

              <Card title="المرافق والخدمات" description="يمكنك تعديل العناصر أو إضافة وحذف مرفق">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="العنوان الصغير" value={content.amenitiesSection.eyebrow} onChange={(value) => updateSection("amenitiesSection", "eyebrow", value)} />
                  <Field label="عنوان القسم" value={content.amenitiesSection.title} onChange={(value) => updateSection("amenitiesSection", "title", value)} />
                </div>
                <div className="grid gap-3">
                  {content.amenities.map((item, index) => (
                    <div key={`${item.iconKey}-${index}`} className="rounded-xl border border-[#e4e7ea] bg-[#fafbfc] p-4">
                      <div className="grid gap-3 sm:grid-cols-[10rem_1fr_1fr_auto] sm:items-end">
                        <label className="text-sm font-semibold text-[#4a4f55]">الأيقونة
                          <select value={item.iconKey} onChange={(event) => setContent({ ...content, amenities: content.amenities.map((current, currentIndex) => currentIndex === index ? { ...current, iconKey: event.target.value as typeof current.iconKey } : current) })} className={inputClass}>
                            {AMENITY_ICON_KEYS.map((key) => <option key={key} value={key}>{key}</option>)}
                          </select>
                        </label>
                        <Field label="الاسم" value={item.name} onChange={(value) => setContent({ ...content, amenities: content.amenities.map((current, currentIndex) => currentIndex === index ? { ...current, name: value } : current) })} />
                        <Field label="الوصف" value={item.description} onChange={(value) => setContent({ ...content, amenities: content.amenities.map((current, currentIndex) => currentIndex === index ? { ...current, description: value } : current) })} />
                        <button type="button" aria-label="حذف المرفق" onClick={() => setContent({ ...content, amenities: content.amenities.filter((_, currentIndex) => currentIndex !== index) })} className="flex size-11 items-center justify-center rounded-xl border border-[#f1cccc] text-[#c74343] transition hover:bg-[#fdecec]"><Trash2Icon size={18} /></button>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => setContent({ ...content, amenities: [...content.amenities, { iconKey: "wifi", name: "", description: "", sortOrder: content.amenities.length, isActive: true }] })} className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-dashed border-primary/45 bg-primary/5 text-sm font-bold text-primary transition hover:bg-primary/10">
                    <PlusIcon size={18} /> إضافة مرفق
                  </button>
                </div>
              </Card>
            </div>

            <div className="grid gap-5">
              <Card title="معرض الصور" description="تحكم في عنوان القسم والصور المعروضة">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="العنوان الصغير" value={content.gallerySection.eyebrow} onChange={(value) => updateSection("gallerySection", "eyebrow", value)} />
                  <Field label="عنوان القسم" value={content.gallerySection.title} onChange={(value) => updateSection("gallerySection", "title", value)} />
                </div>
                <div className="grid gap-3">
                  {content.galleryImages.map((item, index) => (
                    <div key={`${item.imageUrl}-${index}`} className="grid gap-4 rounded-xl border border-[#e4e7ea] bg-[#fafbfc] p-4 sm:grid-cols-[1.2fr_1fr_auto] sm:items-end">
                      <ImageUploadField label={`الصورة ${index + 1}`} value={item.imageUrl} onUploaded={(value) => setContent({ ...content, galleryImages: content.galleryImages.map((current, currentIndex) => currentIndex === index ? { ...current, imageUrl: value } : current) })} />
                      <Field label="وصف الصورة" value={item.alt} onChange={(value) => setContent({ ...content, galleryImages: content.galleryImages.map((current, currentIndex) => currentIndex === index ? { ...current, alt: value } : current) })} />
                      <button type="button" aria-label="حذف الصورة" onClick={() => setContent({ ...content, galleryImages: content.galleryImages.filter((_, currentIndex) => currentIndex !== index) })} className="flex size-11 items-center justify-center rounded-xl border border-[#f1cccc] text-[#c74343] transition hover:bg-[#fdecec]"><Trash2Icon size={18} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => setContent({ ...content, galleryImages: [...content.galleryImages, { imageUrl: "", alt: "", sortOrder: content.galleryImages.length, isActive: true }] })} className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-dashed border-primary/45 bg-primary/5 text-sm font-bold text-primary transition hover:bg-primary/10">
                    <ImageIcon size={18} /> إضافة صورة
                  </button>
                </div>
              </Card>

              <Card title="آراء الضيوف" description="أضف التقييمات التي تظهر في الصفحة">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="العنوان الصغير" value={content.testimonialsSection.eyebrow} onChange={(value) => updateSection("testimonialsSection", "eyebrow", value)} />
                  <Field label="عنوان القسم" value={content.testimonialsSection.title} onChange={(value) => updateSection("testimonialsSection", "title", value)} />
                </div>
                {content.testimonials.map((item, index) => (
                  <div key={`${item.name}-${index}`} className="rounded-xl border border-[#e4e7ea] bg-[#fafbfc] p-4">
                    <div className="grid gap-3 sm:grid-cols-[1fr_8rem_auto] sm:items-end">
                      <Field label="اسم الضيف" value={item.name} onChange={(value) => setContent({ ...content, testimonials: content.testimonials.map((current, currentIndex) => currentIndex === index ? { ...current, name: value } : current) })} />
                      <label className="text-sm font-semibold text-[#4a4f55]">التقييم
                        <select value={item.rating} onChange={(event) => setContent({ ...content, testimonials: content.testimonials.map((current, currentIndex) => currentIndex === index ? { ...current, rating: Number(event.target.value) } : current) })} className={inputClass}>
                          {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} نجوم</option>)}
                        </select>
                      </label>
                      <button type="button" aria-label="حذف الرأي" onClick={() => setContent({ ...content, testimonials: content.testimonials.filter((_, currentIndex) => currentIndex !== index) })} className="flex size-11 items-center justify-center rounded-xl border border-[#f1cccc] text-[#c74343] transition hover:bg-[#fdecec]"><Trash2Icon size={18} /></button>
                    </div>
                    <div className="mt-3"><Field label="نص الرأي" value={item.text} multiline onChange={(value) => setContent({ ...content, testimonials: content.testimonials.map((current, currentIndex) => currentIndex === index ? { ...current, text: value } : current) })} /></div>
                  </div>
                ))}
                <button type="button" onClick={() => setContent({ ...content, testimonials: [...content.testimonials, { name: "", text: "", rating: 5, sortOrder: content.testimonials.length, isActive: true }] })} className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-dashed border-primary/45 bg-primary/5 text-sm font-bold text-primary transition hover:bg-primary/10">
                  <PlusIcon size={18} /> إضافة رأي
                </button>
              </Card>

              <Card title="دعوة الحجز" description="القسم الأخير الذي يشجع الزائر على الحجز">
                <Field label="العنوان" value={content.cta.title} onChange={(value) => updateSection("cta", "title", value)} />
                <Field label="الوصف" value={content.cta.description} multiline onChange={(value) => updateSection("cta", "description", value)} />
                <Field label="نص الزر" value={content.cta.buttonLabel} onChange={(value) => updateSection("cta", "buttonLabel", value)} />
              </Card>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-[#f0caca] bg-[#fff5f5] p-8 text-center text-[#b54141]">تعذر تحميل بيانات الصفحة.</div>
        )}
      </main>
    </div>
  );
}
