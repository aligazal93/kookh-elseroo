"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon, CheckIcon, CloudUploadIcon, ImageIcon, LoaderCircleIcon, PlusIcon, SaveIcon, Trash2Icon } from "@animateicons/react/lucide";

import type { AboutContent, ContactContent, ContentLocale, ContentPageName, FaqContent, SiteSettingsData, TitledItem } from "@/features/content/content.types";

type ContentData = AboutContent | FaqContent | ContactContent | SiteSettingsData;
type Notice = { type: "success" | "error"; message: string } | null;

const inputClass = "mt-2 min-h-11 w-full rounded-xl border border-[#dde1e5] bg-white px-3.5 text-sm outline-none transition focus:border-primary/55 focus:ring-4 focus:ring-primary/8";
const labels: Record<ContentPageName, { title: string; description: string }> = {
  about: { title: "إدارة صفحة عن الكوخ", description: "القصة والقيم والمرافق وسياسات الإقامة" },
  faqs: { title: "إدارة الأسئلة الشائعة", description: "الأقسام والأسئلة والإجابات" },
  contact: { title: "إدارة صفحة التواصل", description: "عناوين الصفحة ونموذج التواصل" },
  settings: { title: "إعدادات الموقع", description: "الشعار وبيانات التواصل والخريطة والسوشيال" },
};

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  return <label className="block text-sm font-semibold text-[#4a4f55]">{label}{multiline ? <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} className={`${inputClass} resize-y py-3 leading-7`} /> : <input value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />}</label>;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-2xl border border-[#e3e6e9] bg-white shadow-[0_5px_20px_rgba(25,28,32,.04)]"><h2 className="border-b border-[#eceef0] px-5 py-5 text-lg font-bold sm:px-6">{title}</h2><div className="grid gap-5 p-5 sm:p-6">{children}</div></section>;
}

function ImageUpload({ label, value, onChange, fit = "cover" }: { label: string; value: string; onChange: (url: string) => void; fit?: "cover" | "contain" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  async function upload(file: File) {
    setUploading(true); setError("");
    try {
      const body = new FormData(); body.append("image", file);
      const response = await fetch("/api/admin/uploads/images", { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message ?? "تعذر رفع الصورة");
      onChange(result.data.url);
    } catch (uploadError) { setError(uploadError instanceof Error ? uploadError.message : "تعذر رفع الصورة"); }
    finally { setUploading(false); }
  }
  return <div><p className="text-sm font-semibold text-[#4a4f55]">{label}</p><div className="mt-2 grid gap-3 sm:grid-cols-[8rem_1fr] sm:items-center"><div className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-[#f1f3f5]">{value ? <Image src={value} alt="معاينة" fill sizes="128px" className={fit === "contain" ? "object-contain p-2" : "object-cover"} /> : <div className="flex h-full items-center justify-center text-[#a2a7ad]"><ImageIcon size={24} /></div>}</div><div><label className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-primary/45 bg-primary/5 px-4 text-sm font-bold text-primary"><>{uploading ? <LoaderCircleIcon size={18} className="animate-spin" /> : <CloudUploadIcon size={18} />}{uploading ? "جاري الرفع..." : "اختر صورة من جهازك"}</><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" disabled={uploading} onChange={(e) => { const file = e.target.files?.[0]; if (file) upload(file); e.target.value = ""; }} /></label><p className="mt-2 break-all text-xs text-[#8d939a]">{value}</p>{error && <p className="mt-1 text-xs text-red-600">{error}</p>}</div></div></div>;
}

function ItemsEditor({ items, onChange, addLabel }: { items: TitledItem[]; onChange: (items: TitledItem[]) => void; addLabel: string }) {
  return <div className="grid gap-3">{items.map((item, index) => <div key={index} className="grid gap-3 rounded-xl border bg-[#fafbfc] p-4 sm:grid-cols-[1fr_1.5fr_auto] sm:items-end"><Field label="العنوان" value={item.title} onChange={(value) => onChange(items.map((current, i) => i === index ? { ...current, title: value } : current))} /><Field label="الوصف" value={item.description} onChange={(value) => onChange(items.map((current, i) => i === index ? { ...current, description: value } : current))} /><button type="button" aria-label="حذف" onClick={() => onChange(items.filter((_, i) => i !== index))} className="flex size-11 items-center justify-center rounded-xl border border-red-200 text-red-600"><Trash2Icon size={18} /></button></div>)}<button type="button" onClick={() => onChange([...items, { title: "", description: "" }])} className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-dashed border-primary/45 bg-primary/5 text-sm font-bold text-primary"><PlusIcon size={18} />{addLabel}</button></div>;
}

export default function AdminContentEditor({ page, initialData }: { page: ContentPageName; initialData: ContentData }) {
  const [locale, setLocale] = useState<ContentLocale>("ar");
  const [data, setData] = useState<ContentData | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  async function changeLocale(nextLocale: ContentLocale) {
    if (nextLocale === locale) return;
    setLoading(true); setNotice(null);
    try {
      const response = await fetch(`/api/admin/content/${page}/${nextLocale}`, { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message ?? "تعذر التحميل");
      setData(result.data); setLocale(nextLocale);
    } catch (error) {
      setNotice({ type: "error", message: error instanceof Error ? error.message : "تعذر التحميل" });
    } finally { setLoading(false); }
  }

  async function save() {
    if (!data) return; setSaving(true); setNotice(null);
    try { const response = await fetch(`/api/admin/content/${page}/${locale}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); const result = await response.json(); if (!response.ok) throw new Error(Array.isArray(result.errors) ? result.errors.join("، ") : result.message); setData(result.data); setNotice({ type: "success", message: "تم حفظ التغييرات بنجاح" }); }
    catch (error) { setNotice({ type: "error", message: error instanceof Error ? error.message : "تعذر الحفظ" }); } finally { setSaving(false); }
  }

  return <div className="min-h-screen bg-[#f6f7f9]"><header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur"><div className="mx-auto flex min-h-20 max-w-7xl items-center gap-3 px-4 py-3 sm:px-6"><Link href="/admin" className="flex size-11 items-center justify-center rounded-xl border"><ArrowRightIcon size={20} /></Link><div><h1 className="text-lg font-bold sm:text-xl">{labels[page].title}</h1><p className="text-xs text-[#8a9097] sm:text-sm">{labels[page].description}</p></div><button type="button" onClick={save} disabled={!data || saving} className="me-auto flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white disabled:opacity-50">{saving ? <LoaderCircleIcon size={18} className="animate-spin" /> : <SaveIcon size={18} />}{saving ? "جاري الحفظ..." : "حفظ التغييرات"}</button></div></header><main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8"><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div className="inline-flex rounded-xl border bg-white p-1">{(["ar", "en"] as ContentLocale[]).map((item) => <button key={item} onClick={() => changeLocale(item)} className={`min-w-28 rounded-lg px-4 py-2.5 text-sm font-bold ${locale === item ? "bg-[#202225] text-white" : "text-[#757b82]"}`}>{item === "ar" ? "العربية" : "English"}</button>)}</div>{notice && <div className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${notice.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{notice.type === "success" && <CheckIcon size={17} />}{notice.message}</div>}</div>{loading ? <div className="flex min-h-[50vh] items-center justify-center"><LoaderCircleIcon size={32} className="animate-spin text-primary" /></div> : data ? <EditorForm page={page} data={data} setData={setData} /> : null}</main></div>;
}

function EditorForm({ page, data, setData }: { page: ContentPageName; data: ContentData; setData: (data: ContentData) => void }) {
  if (page === "about") {
    const value = data as AboutContent;
    return <div className="grid gap-5 xl:grid-cols-2"><div className="grid gap-5"><Card title="واجهة الصفحة"><Field label="عنوان الصفحة" value={value.heroTitle} onChange={(heroTitle) => setData({ ...value, heroTitle })} /><ImageUpload label="صورة الغلاف" value={value.heroImage} onChange={(heroImage) => setData({ ...value, heroImage })} /></Card><Card title="قصة الكوخ"><Field label="العنوان الصغير" value={value.storyEyebrow} onChange={(storyEyebrow) => setData({ ...value, storyEyebrow })} /><Field label="العنوان" value={value.storyTitle} onChange={(storyTitle) => setData({ ...value, storyTitle })} /><Field label="الفقرة الأولى" value={value.storyFirst} multiline onChange={(storyFirst) => setData({ ...value, storyFirst })} /><Field label="الفقرة الثانية" value={value.storySecond} multiline onChange={(storySecond) => setData({ ...value, storySecond })} /><ImageUpload label="صورة القصة" value={value.storyImage} onChange={(storyImage) => setData({ ...value, storyImage })} /><Field label="وصف الصورة" value={value.storyImageAlt} onChange={(storyImageAlt) => setData({ ...value, storyImageAlt })} /></Card></div><div className="grid gap-5"><Card title="القيم"><Field label="عنوان القسم" value={value.valuesTitle} onChange={(valuesTitle) => setData({ ...value, valuesTitle })} /><ItemsEditor items={value.values} onChange={(values) => setData({ ...value, values })} addLabel="إضافة قيمة" /></Card><Card title="المرافق"><Field label="عنوان القسم" value={value.facilitiesTitle} onChange={(facilitiesTitle) => setData({ ...value, facilitiesTitle })} /><ItemsEditor items={value.facilities} onChange={(facilities) => setData({ ...value, facilities })} addLabel="إضافة مرفق" /></Card><Card title="السياسات"><Field label="عنوان القسم" value={value.policiesTitle} onChange={(policiesTitle) => setData({ ...value, policiesTitle })} /><ItemsEditor items={value.policies} onChange={(policies) => setData({ ...value, policies })} addLabel="إضافة سياسة" /></Card></div></div>;
  }

  if (page === "faqs") {
    const value = data as FaqContent;
    return <div className="grid gap-5"><Card title="واجهة الصفحة"><Field label="عنوان الصفحة" value={value.title} onChange={(title) => setData({ ...value, title })} /><ImageUpload label="صورة الغلاف" value={value.heroImage} onChange={(heroImage) => setData({ ...value, heroImage })} /></Card>{value.groups.map((group, groupIndex) => <Card key={groupIndex} title={`قسم ${groupIndex + 1}`}><Field label="اسم القسم" value={group.title} onChange={(title) => setData({ ...value, groups: value.groups.map((current, i) => i === groupIndex ? { ...current, title } : current) })} />{group.items.map((item, itemIndex) => <div key={itemIndex} className="grid gap-3 rounded-xl border bg-[#fafbfc] p-4 sm:grid-cols-[1fr_1.5fr_auto] sm:items-end"><Field label="السؤال" value={item.question} onChange={(question) => setData({ ...value, groups: value.groups.map((current, i) => i === groupIndex ? { ...current, items: current.items.map((q, j) => j === itemIndex ? { ...q, question } : q) } : current) })} /><Field label="الإجابة" value={item.answer} onChange={(answer) => setData({ ...value, groups: value.groups.map((current, i) => i === groupIndex ? { ...current, items: current.items.map((q, j) => j === itemIndex ? { ...q, answer } : q) } : current) })} /><button onClick={() => setData({ ...value, groups: value.groups.map((current, i) => i === groupIndex ? { ...current, items: current.items.filter((_, j) => j !== itemIndex) } : current) })} className="flex size-11 items-center justify-center rounded-xl border border-red-200 text-red-600"><Trash2Icon size={18} /></button></div>)}<button onClick={() => setData({ ...value, groups: value.groups.map((current, i) => i === groupIndex ? { ...current, items: [...current.items, { question: "", answer: "" }] } : current) })} className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-dashed border-primary/45 text-sm font-bold text-primary"><PlusIcon size={18} />إضافة سؤال</button></Card>)}<button onClick={() => setData({ ...value, groups: [...value.groups, { title: "", items: [] }] })} className="min-h-12 rounded-xl bg-[#202225] font-bold text-white">إضافة قسم جديد</button></div>;
  }

  if (page === "contact") {
    const value = data as ContactContent;
    const labelNames: Record<keyof ContactContent["formLabels"], string> = { firstName: "الاسم الأول", lastName: "الاسم الأخير", phone: "رقم الجوال", email: "البريد الإلكتروني", message: "حقل الرسالة", firstNamePlaceholder: "مثال الاسم الأول", lastNamePlaceholder: "مثال الاسم الأخير", emailPlaceholder: "مثال البريد", messagePlaceholder: "مثال الرسالة", submit: "نص زر الإرسال" };
    return <div className="grid gap-5 xl:grid-cols-2"><Card title="واجهة الصفحة"><Field label="عنوان الصفحة" value={value.title} onChange={(title) => setData({ ...value, title })} /><ImageUpload label="صورة الغلاف" value={value.heroImage} onChange={(heroImage) => setData({ ...value, heroImage })} /><Field label="عنوان نموذج التواصل" value={value.formTitle} onChange={(formTitle) => setData({ ...value, formTitle })} /><Field label="عنوان بيانات التواصل" value={value.contactSectionTitle} onChange={(contactSectionTitle) => setData({ ...value, contactSectionTitle })} /><Field label="عنوان الخريطة" value={value.mapTitle} onChange={(mapTitle) => setData({ ...value, mapTitle })} /></Card><Card title="نصوص النموذج"><div className="grid gap-4 sm:grid-cols-2">{(Object.keys(value.formLabels) as Array<keyof typeof value.formLabels>).map((key) => <Field key={key} label={labelNames[key]} value={value.formLabels[key]} onChange={(text) => setData({ ...value, formLabels: { ...value.formLabels, [key]: text } })} />)}</div></Card></div>;
  }

  const value = data as SiteSettingsData;
  return <div className="grid gap-5 xl:grid-cols-2"><Card title="هوية الموقع"><Field label="اسم الموقع" value={value.siteName} onChange={(siteName) => setData({ ...value, siteName })} /><ImageUpload label="شعار الهيدر" value={value.headerLogo} fit="contain" onChange={(headerLogo) => setData({ ...value, headerLogo })} /><ImageUpload label="شعار الفوتر" value={value.footerLogo} fit="contain" onChange={(footerLogo) => setData({ ...value, footerLogo })} /><Field label="حقوق الفوتر" value={value.footerCredit} onChange={(footerCredit) => setData({ ...value, footerCredit })} /></Card><div className="grid gap-5"><Card title="بيانات التواصل"><Field label="رقم الهاتف" value={value.phone} onChange={(phone) => setData({ ...value, phone })} /><Field label="البريد الإلكتروني" value={value.email} onChange={(email) => setData({ ...value, email })} /><Field label="الفاكس" value={value.fax} onChange={(fax) => setData({ ...value, fax })} /><Field label="العنوان" value={value.address} onChange={(address) => setData({ ...value, address })} /><Field label="رابط تضمين الخريطة" value={value.mapEmbedUrl} onChange={(mapEmbedUrl) => setData({ ...value, mapEmbedUrl })} /></Card><Card title="روابط التواصل الاجتماعي"><Field label="Instagram" value={value.instagramUrl} onChange={(instagramUrl) => setData({ ...value, instagramUrl })} /><Field label="Facebook" value={value.facebookUrl} onChange={(facebookUrl) => setData({ ...value, facebookUrl })} /><Field label="X" value={value.xUrl} onChange={(xUrl) => setData({ ...value, xUrl })} /><Field label="WhatsApp" value={value.whatsappUrl} onChange={(whatsappUrl) => setData({ ...value, whatsappUrl })} /></Card></div></div>;
}
