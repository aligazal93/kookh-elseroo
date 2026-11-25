import type { HomeTestimonialData } from "@/features/home/home.types";

type TestimonialsProps = {
  section: { eyebrow: string; title: string };
  items: HomeTestimonialData[];
};

export default function Testimonials({ section, items }: TestimonialsProps) {
  return (
    <section className="bg-background px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center sm:mb-10">
          <p className="mb-3 text-sm font-bold text-primary">
            {section.eyebrow}
          </p>
          <h2 className="text-3xl font-bold text-secondary sm:text-4xl">
            {section.title}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
          {items.filter((testimonial) => testimonial.isActive).map((testimonial) => {
            const rating = Math.max(0, Math.min(5, testimonial.rating));

            return (
              <article
                key={testimonial.id ?? `${testimonial.name}-${testimonial.sortOrder}`}
                className="relative overflow-hidden rounded-2xl border border-primary/15 bg-white px-6 py-7 sm:px-8 sm:py-9"
              >
                <div className="relative">
                  <div
                    className="mb-4 flex gap-1 text-3xl sm:text-4xl"
                    aria-label={`${rating} / 5`}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= rating
                            ? "text-amber-400"
                            : "text-secondary/15"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
                    {testimonial.text}
                  </p>
                  <p className="mt-4 text-sm font-bold text-secondary">
                    {testimonial.name}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
