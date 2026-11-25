import {
  CarIcon,
  FlameIcon,
  MountainIcon,
  UtensilsIcon,
  WifiIcon,
  WindIcon,
} from "@animateicons/react/lucide";

import type { TitledItem } from "@/features/content/content.types";
const icons = { wifi: WifiIcon, fireplace: FlameIcon, view: MountainIcon, kitchen: UtensilsIcon, parking: CarIcon, ac: WindIcon };

export default function Facilities({ title, items }: { title: string; items: TitledItem[] }) {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-secondary sm:text-4xl">
          {title}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((item, index) => {
            const Icon = icons[item.iconKey as keyof typeof icons] ?? WifiIcon;
            return (
            <article
              key={`${item.title}-${index}`}
              className="rounded-2xl border border-primary/20 px-6 py-9 text-center"
            >
              <Icon className="mx-auto text-primary" size={32} />
              <h3 className="mt-5 text-xl font-bold text-secondary">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-text-secondary">
                {item.description}
              </p>
            </article>
          )})}
        </div>
      </div>
    </section>
  );
}
