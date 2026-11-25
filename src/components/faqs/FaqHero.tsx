import Image from "next/image";
export default function FaqHero({ title, image }: { title: string; image: string }) {

  return (
    <section className="relative flex min-h-64 items-center justify-center overflow-hidden sm:min-h-72 lg:min-h-80">
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/65" />
      <h1 className="relative z-10 px-5 pt-16 text-center text-3xl font-bold text-white sm:text-4xl">
        {title}
      </h1>
    </section>
  );
}
