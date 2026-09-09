import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage as SanityImageType } from "@/sanity/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  image: SanityImageType;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  fill?: boolean;
  quality?: number;
};

export function SanityImage({
  image,
  alt,
  width,
  height,
  className,
  sizes,
  priority,
  loading,
  fill,
  quality = 85,
}: Props) {
  if (!image?.asset) return null;

  const altText = alt ?? image.alt ?? "";

  if (fill) {
    return (
      <Image
        src={urlFor(image).quality(quality).auto("format").url()}
        alt={altText}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
        className={cn("object-cover", className)}
        preload={priority}
        loading={loading}
      />
    );
  }

  const w = width ?? 1200;
  const h = height ?? 800;

  return (
    <Image
      src={urlFor(image)
        .width(w)
        .height(h)
        .quality(quality)
        .auto("format")
        .url()}
      alt={altText}
      width={w}
      height={h}
      sizes={sizes}
      className={className}
      preload={priority}
      loading={loading}
    />
  );
}
