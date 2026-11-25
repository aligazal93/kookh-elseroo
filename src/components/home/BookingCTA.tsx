import { Link } from "@/i18n/navigation";

type BookingCTAProps = {
  content: { title: string; description: string; buttonLabel: string };
};

export default function BookingCTA({ content }: BookingCTAProps) {
  return (
    <section className="bg-background px-5 pb-16 pt-6 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
      <div className="mx-auto max-w-4xl rounded-3xl bg-primary px-6 py-10 text-center text-white shadow-card sm:px-10 sm:py-12">
        <h2 className="text-2xl font-bold sm:text-3xl">
          {content.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/90 sm:text-base">
          {content.description}
        </p>
        <Link
          href="/booking"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-button bg-white px-8 text-sm font-bold text-primary transition hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {content.buttonLabel}
        </Link>
      </div>
    </section>
  );
}
