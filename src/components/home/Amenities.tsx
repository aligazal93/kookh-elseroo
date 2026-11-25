import {
  CarIcon,
  FlameIcon,
  MountainIcon,
  UtensilsIcon,
  WifiIcon,
  WindIcon,
} from "@animateicons/react/lucide";

import type { HomeAmenityData } from "@/features/home/home.types";

const amenityIcons = {
  wifi: WifiIcon,
  fireplace: FlameIcon,
  mountain: MountainIcon,
  kitchen: UtensilsIcon,
  parking: CarIcon,
  airConditioning: WindIcon,
};

type AmenitiesProps = {
  section: { eyebrow: string; title: string };
  items: HomeAmenityData[];
};

export default function Amenities({ section, items }: AmenitiesProps) {

  return (
    <section className="bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-7">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-sm font-semibold text-primary">
            {section.eyebrow}
          </p>
          <h2 className="text-3xl font-bold text-secondary sm:text-4xl">
            {section.title}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {items.filter((amenity) => amenity.isActive).map((amenity) => {
            const Icon = amenityIcons[amenity.iconKey];

            return (
              <article
                key={amenity.id ?? `${amenity.iconKey}-${amenity.sortOrder}`}
                className="group flex min-h-48 flex-col items-center justify-center rounded-2xl border border-primary/15 bg-white/45 px-6 py-8 text-center transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:bg-white hover:shadow-card"
              >
                <Icon
                  aria-hidden="true"
                  className="mb-5 text-primary transition-transform duration-300 group-hover:scale-110"
                  size={30}
                />
                <h3 className="text-xl font-bold text-secondary">
                  {amenity.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  {amenity.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
