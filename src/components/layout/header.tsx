"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, ChevronDown, MapPin, Lightbulb } from "lucide-react";
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
import { customerSegments, serviceCities } from "@/lib/services";
import { cn } from "@/lib/utils";

type ActiveMenu = "products" | "solutions" | "regions" | null;

const navItems = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Servis", href: "/servis" },
  { label: "Yedek Parça", href: "/yedek-parca" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

const mobileExtras = [{ label: "Referanslar", href: "/referanslar" }];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<ActiveMenu>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const primaryCities = serviceCities.filter((c) => c.priority === "primary");
  const secondaryCities = serviceCities.filter((c) => c.priority === "secondary");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
      onMouseLeave={() => setActive(null)}
    >
      <div className="container-wide flex h-16 md:h-20 items-center justify-between gap-3">
        <Logo size="default" withSymbol />

        <nav className="hidden lg:flex items-center gap-0.5">
          <MenuTrigger
            label="Ürünler"
            active={active === "products"}
            onActivate={() => setActive("products")}
          />
          <MenuTrigger
            label="Çözümler"
            active={active === "solutions"}
            onActivate={() => setActive("solutions")}
          />
          <MenuTrigger
            label="Bölgeler"
            active={active === "regions"}
            onActivate={() => setActive("regions")}
          />
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setActive(null)}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${company.contact.phone}`}
            className="hidden xl:inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors px-3 py-2"
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
            <SheetContent
              side="right"
              className="w-[88vw] sm:max-w-md bg-background overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle>
                  <Logo size="default" withSymbol />
                </SheetTitle>
              </SheetHeader>
              <MobileNav
                primaryCities={primaryCities}
                secondaryCities={secondaryCities}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop mega-menus */}
      <AnimatePresence>
        {active === "products" && (
          <DropPanel onClose={() => setActive(null)}>
            <div className="container-wide py-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {productCategories.map((p) => (
                <Link
                  key={p.slug}
                  href={`/urunler/${p.slug}`}
                  onClick={() => setActive(null)}
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
              <Link
                href="/urunler"
                onClick={() => setActive(null)}
                className="p-4 rounded-lg border border-[var(--brand-orange)]/30 bg-[var(--brand-orange)]/5 hover:bg-[var(--brand-orange)]/10 transition-colors"
              >
                <div className="text-sm font-semibold text-[var(--brand-orange)]">
                  Tüm ürünleri gör →
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  7 kategori, kapasite ve ölçü filtreli
                </div>
              </Link>
            </div>
          </DropPanel>
        )}

        {active === "solutions" && (
          <DropPanel onClose={() => setActive(null)}>
            <div className="container-wide py-8">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                <Lightbulb size={12} />
                Sektörel Çözümler
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {customerSegments.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/cozumler/${s.slug}`}
                    onClick={() => setActive(null)}
                    className="group p-4 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-foreground group-hover:text-[var(--brand-orange)] transition-colors">
                        {s.name}
                      </div>
                      <div className="text-[10px] font-mono text-[var(--brand-orange)]">
                        ~%{s.share}
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {s.description}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border/50">
                <Link
                  href="/cozumler"
                  onClick={() => setActive(null)}
                  className="text-sm font-medium text-[var(--brand-orange)] hover:text-[var(--brand-orange-hover)]"
                >
                  Tüm sektörel çözümler →
                </Link>
              </div>
            </div>
          </DropPanel>
        )}

        {active === "regions" && (
          <DropPanel onClose={() => setActive(null)}>
            <div className="container-wide py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  <MapPin size={12} />
                  Öncelikli Bölgeler — Montaj + Servis
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {primaryCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/hizmet-bolgeleri/${c.slug}`}
                      onClick={() => setActive(null)}
                      className="group p-4 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
                    >
                      <div className="text-sm font-semibold text-foreground group-hover:text-[var(--brand-orange)] transition-colors">
                        {c.name}
                      </div>
                      {c.industrialZones && (
                        <div className="mt-1 text-xs text-muted-foreground line-clamp-1">
                          {c.industrialZones.join(", ")}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                  Diğer İller
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {secondaryCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/hizmet-bolgeleri/${c.slug}`}
                      onClick={() => setActive(null)}
                      className="text-xs font-medium px-2.5 py-1 rounded-full border border-border hover:border-[var(--brand-orange)]/40 hover:text-foreground text-muted-foreground transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/hizmet-bolgeleri"
                  onClick={() => setActive(null)}
                  className="mt-4 inline-block text-xs font-medium text-[var(--brand-orange)] hover:text-[var(--brand-orange-hover)]"
                >
                  Türkiye geneli sevkiyat →
                </Link>
              </div>
            </div>
          </DropPanel>
        )}
      </AnimatePresence>
    </header>
  );
}

function MenuTrigger({
  label,
  active,
  onActivate,
}: {
  label: string;
  active: boolean;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onActivate}
      onMouseEnter={onActivate}
      className={cn(
        "inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
        active
          ? "text-foreground bg-muted/40"
          : "text-foreground/80 hover:text-foreground"
      )}
    >
      {label}
      <ChevronDown
        size={14}
        className={cn("transition-transform", active && "rotate-180")}
      />
    </button>
  );
}

function DropPanel({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      onMouseLeave={onClose}
      className="hidden lg:block absolute inset-x-0 top-full bg-popover/95 backdrop-blur-md border-b border-border shadow-2xl"
    >
      {children}
    </motion.div>
  );
}

function MobileNav({
  primaryCities,
  secondaryCities,
}: {
  primaryCities: typeof serviceCities;
  secondaryCities: typeof serviceCities;
}) {
  return (
    <div className="flex flex-col gap-1 mt-6 px-4 pb-8">
      <MobileSection title="Ürünler" href="/urunler">
        {productCategories.map((p) => (
          <Link
            key={p.slug}
            href={`/urunler/${p.slug}`}
            className="ml-4 px-3 py-2 rounded-md text-sm text-foreground/70 hover:bg-muted hover:text-foreground transition-colors block"
          >
            — {p.shortName}
          </Link>
        ))}
      </MobileSection>

      <MobileSection title="Çözümler" href="/cozumler">
        {customerSegments.map((s) => (
          <Link
            key={s.slug}
            href={`/cozumler/${s.slug}`}
            className="ml-4 px-3 py-2 rounded-md text-sm text-foreground/70 hover:bg-muted hover:text-foreground transition-colors block"
          >
            — {s.name}
          </Link>
        ))}
      </MobileSection>

      <MobileSection title="Bölgeler" href="/hizmet-bolgeleri">
        {primaryCities.map((c) => (
          <Link
            key={c.slug}
            href={`/hizmet-bolgeleri/${c.slug}`}
            className="ml-4 px-3 py-2 rounded-md text-sm text-foreground/70 hover:bg-muted hover:text-foreground transition-colors block"
          >
            — {c.name}
          </Link>
        ))}
        <div className="ml-4 mt-2 mb-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          Diğer iller
        </div>
        <div className="ml-4 flex flex-wrap gap-1.5">
          {secondaryCities.map((c) => (
            <Link
              key={c.slug}
              href={`/hizmet-bolgeleri/${c.slug}`}
              className="text-xs px-2 py-1 rounded-full border border-border text-muted-foreground"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </MobileSection>

      {[...navItems, ...mobileExtras].map((item) => (
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
  );
}

function MobileSection({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group">
      <summary className="flex items-center justify-between px-3 py-3 rounded-md text-base font-medium hover:bg-muted transition-colors cursor-pointer list-none">
        <Link href={href} onClick={(e) => e.stopPropagation()} className="flex-1">
          {title}
        </Link>
        <ChevronDown
          size={16}
          className="transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="mt-1 mb-2">{children}</div>
    </details>
  );
}
