import { cn } from "@/lib/utils";

interface ContentImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  src: string;
  alt: string;
  priority?: boolean;
}

export function ContentImage({
  src,
  alt,
  className,
  priority = false,
  ...props
}: ContentImageProps) {
  return (
    // Native img is more reliable than next/image on Cloudflare Workers.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
      {...props}
    />
  );
}
