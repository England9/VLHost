import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  imageAlt: string;
}

export function PageHero({
  title,
  subtitle,
  description,
  image,
  imageAlt,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      </div>
      <div className="relative container-luxury pb-12 md:pb-16 pt-32 w-full text-center">
        {subtitle && (
          <p className="text-[11px] tracking-luxury uppercase text-accent mb-4">
            {subtitle}
          </p>
        )}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground text-balance">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-foreground-muted max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
