"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { XIcon } from "@animateicons/react/lucide";
import type { HomeGalleryImageData } from "@/features/home/home.types";

type GalleryProps = {
  section: { eyebrow: string; title: string };
  images: HomeGalleryImageData[];
};

export default function Gallery({ section, images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const galleryImages = images.filter((image) => image.isActive);

  useEffect(() => {
    if (selectedImage === null) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedImage(null);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedImage]);

  return (
    <>
      <section className="bg-background px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center sm:mb-10">
            <p className="mb-3 text-sm font-bold text-primary">
              {section.eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-secondary sm:text-4xl">
              {section.title}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:grid-rows-2">
            {galleryImages.map((image, index) => (
              <button
                type="button"
                key={image.id ?? `${image.imageUrl}-${index}`}
                onClick={() => setSelectedImage(index)}
                aria-label={image.alt}
                className={`relative min-h-40 cursor-pointer overflow-hidden rounded-2xl sm:min-h-56 ${
                  index === 2
                    ? "col-span-2 h-72 sm:h-96 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-auto"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedImage !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={section.title}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="إغلاق الصورة"
            className="absolute end-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:end-8 sm:top-8"
          >
            <XIcon size={24} />
          </button>

          <div
            className="relative h-[80vh] w-full max-w-6xl cursor-default"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={galleryImages[selectedImage].imageUrl}
              alt={galleryImages[selectedImage].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
