"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { company } from "@/lib/site-config";
import { productCategories } from "@/lib/products";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Çözümler", href: "/cozumler" },
  { label: "Referanslar", href: "/referanslar" },
  { label: "Yedek Parça", href: "/yedek-parca" },
  { label: "Servis", href: "/servis" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container-wide flex h-16 md:h-20 items-center justify-between gap-4">
        <Logo size="default" />

        <nav className="hidden lg:flex items-center gap-1">
          <button
            type="button"
            onClick={() => setProductsOpen((s) => !s)}
            onMouseEnter={() => setProductsOpen(true)}
            className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md transition-colors"
          >
            Ürünler
            <ChevronDown
              size={14}
              className={cn(
                "transition-transform",
                productsOpen && "rotate-180"
              )}
            />
          </button>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${company.contact.phone}`}
            className="hidden md:inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors px-3 py-2"
            aria-label="Telefon"
          >
            <Phone size={14} />
            <span>{company.contact.phoneDisplay}</span>
          </a>
          <LinkButton
            href="/teklif-al"
            size="default"
            className="hidden md:inline-flex bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-[var(--brand-black)] font-semibold shadow-[0_0_0_0_var(--brand-orange)] hover:shadow-[0_8px_24px_-6px_var(--brand-orange)] transition-all"
          >
            Teklif Al
          </LinkButton>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Menüyü aç"
                >
                  <Menu />
                </Button>
              }
            />
            <SheetContent side="right" className="w-[88vw] sm:max-w-md bg-background">
              <SheetHeader>
                <SheetTitle>
                  <Logo size="default" />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 mt-6 px-4">
                <Link
                  href="/urunler"
                  className="px-3 py-3 rounded-md text-base font-medium hover:bg-muted transition-colors"
                >
                  Ürünler
                </Link>
                {productCategories.slice(0, 4).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/urunler/${p.slug}`}
                    className="ml-4 px-3 py-2 rounded-md text-sm text-foreground/70 hover:bg-muted hover:text-foreground transition-colors"
                  >
                    — {p.shortName}
                  </Link>
                ))}
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-3 rounded-md text-base font-medium hover:bg-muted transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <LinkButton
                  href="/teklif-al"
                  className="mt-4 bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-[var(--brand-black)] font-semibold h-12"
                >
                  Teklif Al
                </LinkButton>
                <a
                  href={`tel:${company.contact.phone}`}
                  className="mt-2 inline-flex items-center justify-center gap-2 h-12 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  <Phone size={16} />
                  {company.contact.phoneDisplay}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AnimatePresence>
        {productsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            onMouseLeave={() => setProductsOpen(false)}
            className="hidden lg:block absolute inset-x-0 top-full bg-popover/95 backdrop-blur-md border-b border-border shadow-2xl"
          >
            <div className="container-wide py-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {productCategories.map((p) => (
                <Link
                  key={p.slug}
                  href={`/urunler/${p.slug}`}
                  onClick={() => setProductsOpen(false)}
                  className="group p-4 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
                >
                  <div className="text-sm font-semibold text-foreground group-hover:text-[var(--brand-orange)] transition-colors">
                    {p.shortName}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {p.tagline}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
