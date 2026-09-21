import Image from "next/image";

interface HeroPortraitProps {
  src: string;
  alt: string;
  name: string;
  title: string;
}

/**
 * Profil görseli. Admin panelinden bir görsel yüklenmediyse, sahte fotoğraf
 * yerine sakin bir yer tutucu panel gösterilir.
 */
export function HeroPortrait({ src, alt, name, title }: HeroPortraitProps) {
  if (src) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-ice-100">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 440px, (min-width: 640px) 60vw, 85vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="flex aspect-[4/5] w-full flex-col justify-end rounded-3xl bg-gradient-to-br from-ice-100 via-ice-50 to-sand-100 p-8"
    >
      <p className="font-serif text-2xl text-ice-900">{name}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-ice-700">{title}</p>
    </div>
  );
}
