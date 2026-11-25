import type { ContactFormLabels } from "@/features/content/content.types";

export default function ContactForm({ title, labels }: { title: string; labels: ContactFormLabels }) {
  const inputClass =
    "mt-2 h-12 w-full rounded-xl border border-primary/20 bg-transparent px-4 text-xs outline-none transition placeholder:text-text-muted focus:border-primary";

  return (
    <div className="rounded-2xl border border-primary/20 p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-secondary sm:text-xl">
        {title}
      </h2>

      <form className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="font-bold text-secondary">
          {labels.firstName} <span className="text-red-600">*</span>
          <input
            required
            name="firstName"
            autoComplete="given-name"
            placeholder={labels.firstNamePlaceholder}
            className={inputClass}
          />
        </label>

        <label className="font-bold text-secondary">
          {labels.lastName} <span className="text-red-600">*</span>
          <input
            required
            name="lastName"
            autoComplete="family-name"
            placeholder={labels.lastNamePlaceholder}
            className={inputClass}
          />
        </label>

        <label className="font-bold text-secondary">
          {labels.phone} <span className="text-red-600">*</span>
          <input
            required
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="+966 00 000 0000"
            className={inputClass}
            dir="rtl"
          />
        </label>

        <label className="font-bold text-secondary">
          {labels.email} <span className="text-red-600">*</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            placeholder={labels.emailPlaceholder}
            className={inputClass}
          />
        </label>

        <label className="font-bold text-secondary sm:col-span-2">
          {labels.message}
          <textarea
            name="message"
            rows={4}
            placeholder={labels.messagePlaceholder}
            className="mt-2 w-full resize-y rounded-xl border border-primary/20 bg-transparent p-4 text-sm outline-none transition placeholder:text-text-muted focus:border-primary"
          />
        </label>

        <button
          type="submit"
          className="min-h-12 rounded-xl bg-primary px-8 font-bold text-white transition hover:bg-primary-600 sm:col-start-2"
        >
          {labels.submit}
        </button>
      </form>
    </div>
  );
}
