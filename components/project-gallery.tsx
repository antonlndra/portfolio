import { DATA } from "@/data/resume";
import Image from "next/image";

function GalleryLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-md bg-background/85 px-2.5 py-1 text-xs font-medium tracking-wide text-foreground shadow-sm backdrop-blur-sm">
      {children}
    </p>
  );
}

function ShotItem({
  title,
  src,
  alt,
  priority,
}: {
  title: string;
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <li className="relative overflow-hidden rounded-lg bg-muted/40 ring-1 ring-black/10 dark:ring-white/10">
      <Image
        src={src}
        alt={alt}
        width={2560}
        height={1600}
        sizes="(max-width: 1024px) 100vw, 68vw"
        className="block h-auto w-full object-contain"
        priority={priority}
      />
      <GalleryLabel>{title}</GalleryLabel>
    </li>
  );
}

function BentoItem({
  title,
  items,
}: {
  title: string;
  items: readonly {
    src: string;
    alt: string;
    span: "wide" | "square" | "tall";
  }[];
}) {
  const [wordmark, mark, ...phones] = items;

  return (
    <li className="relative overflow-hidden rounded-md bg-neutral-200/80 p-1.5 dark:bg-neutral-900/80 sm:p-2">
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <div className="flex gap-1.5 sm:gap-2">
          {wordmark ? (
            <div className="relative aspect-[1024/465] min-w-0 flex-1 overflow-hidden rounded-md bg-[#83D482]">
              <Image
                src={wordmark.src}
                alt={wordmark.alt}
                fill
                sizes="(max-width: 1024px) 80vw, 50vw"
                className="object-contain"
                priority
              />
            </div>
          ) : null}
          {mark ? (
            <div className="relative aspect-square w-[18%] min-w-[88px] max-w-[160px] shrink-0 overflow-hidden rounded-md bg-[#83D482]">
              <Image
                src={mark.src}
                alt={mark.alt}
                fill
                sizes="160px"
                className="object-contain p-3 sm:p-4"
              />
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {phones.map((phone) => (
            <div
              key={phone.src}
              className="relative aspect-[402/874] overflow-hidden rounded-md bg-white dark:bg-neutral-950"
            >
              <Image
                src={phone.src}
                alt={phone.alt}
                fill
                sizes="(max-width: 1024px) 33vw, 22vw"
                className="object-contain object-top"
              />
            </div>
          ))}
        </div>
      </div>
      <GalleryLabel>{title}</GalleryLabel>
    </li>
  );
}

export default function ProjectGallery() {
  return (
    <aside
      aria-label="Galería de proyectos"
      className="bg-muted/30 lg:h-dvh lg:overflow-y-auto lg:border-l lg:border-border"
    >
      <ul className="flex flex-col gap-2 p-2 sm:gap-3 sm:p-3">
        {DATA.gallery.map((item, index) => {
          if (item.type === "bento") {
            return (
              <BentoItem
                key={item.title}
                title={item.title}
                items={item.items}
              />
            );
          }

          return (
            <ShotItem
              key={item.src}
              title={item.title}
              src={item.src}
              alt={item.alt}
              priority={index < 2}
            />
          );
        })}
      </ul>
    </aside>
  );
}
