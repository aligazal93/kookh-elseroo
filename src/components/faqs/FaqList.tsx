import { ChevronDownIcon } from "@animateicons/react/lucide";
import type { FaqGroup } from "@/features/content/content.types";

export default function FaqList({ groups }: { groups: FaqGroup[] }) {
  return (
    <section className="relative -mt-6 rounded-t-3xl bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl space-y-16">
        {groups.map((group, groupIndex) => (
          <div key={`${group.title}-${groupIndex}`}>
            <h2 className="mb-6 text-2xl font-bold text-secondary sm:text-3xl">
              {group.title}
            </h2>

            <div className="overflow-hidden rounded-2xl border border-primary/15">
              {group.items.map((item, index) => (
                <details
                  key={`${item.question}-${index}`}
                  open={index < group.items.length - 1}
                  className="group border-b border-primary/10 px-5 py-5 last:border-b-0 sm:px-7"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-4 [&::-webkit-details-marker]:hidden">
                    <span className="flex-1 font-bold text-secondary">
                      {item.question}
                    </span>
                    <ChevronDownIcon
                      className="shrink-0 transition group-open:rotate-180"
                      size={18}
                    />
                  </summary>
                  <p className="mt-3 pe-8 text-sm leading-7 text-text-secondary">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
