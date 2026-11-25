import {
  ChevronDownIcon,
  MessageCircleQuestionMarkIcon,
} from "@animateicons/react/lucide";

import type { TitledItem } from "@/features/content/content.types";

export default function Policies({ title, items }: { title: string; items: TitledItem[] }) {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-secondary sm:text-4xl">
          {title}
        </h2>
        <div className="space-y-4">
          {items.map((policy, index) => (
            <details
              key={`${policy.title}-${index}`}
              className="group rounded-2xl border border-primary/20 px-5 py-5 sm:px-7"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 [&::-webkit-details-marker]:hidden">
                <MessageCircleQuestionMarkIcon
                  className="shrink-0 text-primary"
                  size={30}
                />
                <span className="flex-1 font-bold text-secondary sm:text-lg">
                  {policy.title}
                </span>
                <ChevronDownIcon
                  className="shrink-0 transition group-open:rotate-180"
                  size={20}
                />
              </summary>
              <p className="mt-4 px-11 text-sm leading-7 text-text-secondary sm:text-base">
                {policy.description}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
