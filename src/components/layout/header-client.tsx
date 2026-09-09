"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, Mail, Cog, ArrowRight } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { SiteSearch } from "@/components/layout/site-search";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { Magnetic } from "@/components/ui/magnetic";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { company } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { MergedContact } from "@/lib/site-data";
import type { NavbarPage, WorkingHoursRow } from "@/sanity/lib/types";

// Düz nav linkleri — dropdown yok, gunoziplik.com tarzı kayan alt çizgi.
const navItems = [
  { label: "Anasayfa", href: "/" },
  { label: "Ürünler", href: "/urunler" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Referanslar", href: "/referanslar" },
  { label: "Servis", href: "/servis" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

const mobileExtras = [{ label: "Yedek Parça", href: "/yedek-parca" }];

export function HeaderClient({
  contact = {
    phone: company.contact.phone,
    phoneDisplay: company.contact.phoneDisplay,
    email: company.contact.email,
    whatsapp: company.contact.whatsapp,
    whatsappLink: company.contact.whatsappLink,
  },
  navbarPages = [],
  logoUrl,
}: {
  contact?: MergedContact;
  navbarPages?: NavbarPage[];
  logoUrl?: string;
  workingHours?: WorkingHoursRow[];
} = {}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Header koyu hero videosunun üzerinde mi? (yalnız anasayfa, scroll edilmemiş)
  // Evetse beyaz stil; değilse temaya göre uyum sağlayan (foreground) stil.
  const onDark = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border shadow-sm"
          : onDark
            ? "bg-transparent"
            : "bg-background/95 border-b border-border",
      )}
    >
      {/* ─── ÜST HAIRLINE BAR — telefon + email ─── */}
      <div
        className={cn(
          "hidden md:block border-b",
          onDark ? "border-white/10" : "border-border",
        )}
      >
        <div
          className={cn(
            "mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 flex h-10 items-center justify-between text-sm",
            onDark ? "text-white/70" : "text-muted-foreground",
          )}
        >
          <div className="flex items-center gap-6">
            <a
              href={`tel:${contact.phone}`}
              className={cn(
                "inline-flex items-center gap-1.5 transition-colors",
                onDark ? "hover:text-white" : "hover:text-foreground",
              )}
            >
              <Phone size={14} />
              <span className="tabular-nums">{contact.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${contact.email}`}
              className={cn(
                "inline-flex items-center gap-1.5 transition-colors",
                onDark ? "hover:text-white" : "hover:text-foreground",
              )}
            >
              <Mail size={14} />
              <span>{contact.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-5">
            <SiteSearch />
            <Link
              href="/iletisim"
              className={cn(
                "transition-colors uppercase tracking-wider text-xs font-medium",
                onDark ? "hover:text-white" : "hover:text-foreground",
              )}
            >
              Bize Ulaşın{" "}
              <ArrowRight
                size={12}
                className="inline-block ml-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* ─── ANA NAV ROW ─── */}
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 flex h-24 md:h-28 items-center justify-between gap-3">
        <Logo
          size="large"
          withSymbol
          src={logoUrl}
          {...(onDark ? { inverted: true } : { autoInvert: true })}
        />

        <nav
          aria-label="Ana menü"
          className="hidden xl:flex items-center gap-0 -translate-y-5"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              onDark={onDark}
            />
          ))}

          {/* ─── Eren'in Sanity'de oluşturduğu özel sayfalar (navbar'da göster=açık) ─── */}
          {navbarPages.map((p) => (
            <NavLink
              key={p._id}
              href={`/${p.slug}`}
              label={p.navbarLabel?.trim() || p.title}
              onDark={onDark}
            />
          ))}
        </nav>

        {/* ─── CTA + TEMA BUTONU ─── */}
        <div className="flex shrink-0 items-center gap-2 md:-translate-y-5">
          <div className={cn("md:hidden", onDark && "text-white")}>
            <SiteSearch iconOnly />
          </div>
          <LinkButton
            href="/yedek-parca"
            size="default"
            variant="outline"
            className={cn(
              "hidden md:inline-flex h-11 px-4 text-[0.95rem] bg-transparent font-semibold hover:border-[var(--brand-orange)]/60 hover:bg-[var(--brand-orange)]/10",
              onDark
                ? "border-white/20 text-white hover:text-white"
                : "border-border text-foreground hover:text-foreground",
            )}
          >
            <Cog size={15} className="mr-1.5" />
            Yedek Parça
          </LinkButton>
          <Magnetic strength={0.2}>
            <LinkButton
              href="/teklif-al"
              size="default"
              className="hidden md:inline-flex h-11 px-5 text-[0.95rem] bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold shadow-[0_0_0_0_var(--brand-orange)] hover:shadow-[0_8px_24px_-6px_var(--brand-orange)] transition-all"
            >
              Teklif Al
            </LinkButton>
          </Magnetic>

          {/* Koyu/açık tema geçişi */}
          <ThemeToggle onDark={onDark} />

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "xl:hidden",
                    onDark
                      ? "text-white hover:text-white hover:bg-white/10"
                      : "text-foreground hover:text-foreground hover:bg-muted",
                  )}
                  aria-label="Menüyü aç"
                >
                  <Menu />
                </Button>
              }
            />
            <SheetContent side="left" className="bg-background overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <Logo
                    size="default"
                    withSymbol
                    autoInvert
                    asLink={false}
                    src={logoUrl}
                  />
                </SheetTitle>
              </SheetHeader>
              <MobileNav
                contact={contact}
                navbarPages={navbarPages}
                onNavigate={() => setMenuOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// ─── NavLink: düz link + hover'da soldan kayan alt çizgi ───
function NavLink({
  href,
  label,
  onDark = false,
}: {
  href: string;
  label: string;
  onDark?: boolean;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname?.startsWith(`${href}/`);
  const activeText = onDark ? "text-white" : "text-foreground";
  const idleText = onDark
    ? "text-white/75 hover:text-white"
    : "text-foreground/70 hover:text-foreground";
  return (
    <Link
      href={href}
      className={cn(
        "relative px-2 2xl:px-3 py-2 text-sm 2xl:text-base font-medium transition-colors",
        "after:absolute after:left-3 after:right-3 after:bottom-0.5 after:h-[2px]",
        "after:bg-[var(--brand-orange)] after:origin-left after:transition-transform after:duration-300",
        isActive
          ? cn(activeText, "after:scale-x-100")
          : cn(idleText, "after:scale-x-0 hover:after:scale-x-100"),
      )}
    >
      {label}
    </Link>
  );
}

// ─── Mobile sheet drawer — gunoziplik tarzı: yandan açılır,
// düz liste, her satırın altında ince ayraç çizgisi ───
function MobileNav({
  contact,
  navbarPages = [],
  onNavigate,
}: {
  contact: MergedContact;
  navbarPages?: NavbarPage[];
  onNavigate?: () => void;
}) {
  return (
    <div className="flex flex-col mt-6 px-4 pb-8">
      {[...navItems, ...mobileExtras].map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className="px-1 py-4 text-base font-medium border-b border-border hover:text-[var(--brand-orange)] transition-colors"
        >
          {item.label}
        </Link>
      ))}

      {/* Eren'in Sanity'de oluşturduğu özel sayfalar */}
      {navbarPages.map((p) => (
        <Link
          key={p._id}
          href={`/${p.slug}`}
          onClick={onNavigate}
          className="px-1 py-4 text-base font-medium border-b border-border hover:text-[var(--brand-orange)] transition-colors"
        >
          {p.navbarLabel?.trim() || p.title}
        </Link>
      ))}

      <LinkButton
        href="/teklif-al"
        onClick={onNavigate}
        className="mt-4 bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold h-12"
      >
        Teklif Al
      </LinkButton>
      <a
        href={`tel:${contact.phone}`}
        className="mt-2 inline-flex items-center justify-center gap-2 h-12 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors"
      >
        <Phone size={16} />
        {contact.phoneDisplay}
      </a>
    </div>
  );
}
