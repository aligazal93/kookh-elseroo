import Image from "next/image";
import BookingForm from "@/components/home/BookingForm";

type HeroProps = {
  content: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  };
};

export default function Hero({ content }: HeroProps) {
  return (
    <section className="relative flex min-h-[100svh] overflow-hidden bg-secondary text-white">
      <Image
        src={content.image}
        alt="كوخ السرور وسط الطبيعة"
        fill
        priority
        sizes="100vw"
        className="z-0 object-cover object-center"
      />
      <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(20,16,30,.46),rgba(15,12,12,.38)_48%,rgba(12,9,8,.62))]" />

      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col justify-end px-5 pb-6 pt-28 sm:px-8 sm:pb-8 lg:px-10 lg:pb-12 lg:pt-36">
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10 lg:mb-12">
          <h1 className="text-3xl font-bold leading-[1.45] drop-shadow-lg sm:text-4xl lg:text-5xl">
            <span className="block">{content.title}</span>
            <span className="block">{content.subtitle}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/90 drop-shadow-md sm:mt-5 sm:text-base sm:leading-8">
            {content.description}
          </p>
        </div>

        <BookingForm />
      </div>
    </section>
  );
}
