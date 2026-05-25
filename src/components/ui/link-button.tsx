/**
 * Next.js Link'i shadcn Button stilleri ile sarar.
 * Yeni shadcn (base-ui) sürümünde `asChild` desteği olmadığı için
 * navigasyon butonlarında bu helper'ı kullanıyoruz.
 */
import Link, { type LinkProps } from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = LinkProps &
  Omit<ComponentProps<"a">, keyof LinkProps> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
    className?: string;
  };

export function LinkButton({
  className,
  variant,
  size,
  children,
  ...props
}: Props) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export function ExternalLinkButton({
  className,
  variant,
  size,
  children,
  ...props
}: ComponentProps<"a"> & VariantProps<typeof buttonVariants>) {
  return (
    <a
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </a>
  );
}
