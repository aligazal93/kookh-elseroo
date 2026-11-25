import Image from "next/image";
import type { AboutContent } from "@/features/content/content.types";

export default function AboutStory({ content }: { content: AboutContent }) {

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="mb-3 text-sm font-bold text-primary">{content.storyEyebrow}</p>
          <h2 className="text-3xl font-bold leading-tight text-secondary sm:text-4xl lg:text-5xl">
            {content.storyTitle}
          </h2>
          <p className="mt-6 leading-8 text-text-secondary">{content.storyFirst}</p>
          <p className="mt-5 leading-8 text-text-secondary">{content.storySecond}</p>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-xl lg:order-2">
          <div className="absolute -start-8 -top-8 size-40 rotate-45 rounded-3xl bg-primary/10" />
          <Image
            src={content.storyImage}
            alt={content.storyImageAlt}
            width={620}
            height={458}
            className="relative w-full rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
