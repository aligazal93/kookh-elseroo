type AboutProps = {
  content: {
    eyebrow: string;
    title: string;
    description: string;
    videoUrl: string;
  };
};

export function About({ content }: AboutProps) {
  return (
    <section id="about" className="bg-background px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold text-primary sm:text-base">
            {content.eyebrow}
          </p>

          <h2 className="text-3xl font-bold leading-tight text-secondary sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-text-secondary sm:mt-6 sm:text-base sm:leading-8">
            {content.description}
          </p>
        </div>

        <div className="mx-auto mt-8 w-full max-w-5xl overflow-hidden rounded-2xl bg-secondary shadow-card sm:mt-10 lg:mt-12 lg:rounded-3xl">
          <iframe
            className="aspect-video w-full border-0"
            src={content.videoUrl}
            title={content.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
