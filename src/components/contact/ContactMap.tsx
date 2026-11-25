export default function ContactMap({ title, url }: { title: string; url: string }) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-primary/20">
      <iframe
        title={title}
        src={url}
        loading="lazy"
        className="h-72 w-full border-0 sm:h-96"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
