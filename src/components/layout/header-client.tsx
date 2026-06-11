"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, Mail, Cog } from "lucide-react";

import { Logo } from "@/components/brand/logo";
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
  workingHours: hoursProp,
}: {
  contact?: MergedContact;
  navbarPages?: NavbarPage[];
  logoUrl?: string;
  workingHours?: WorkingHoursRow[];
} = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Çalışma saatleri (Sanity > fallback site-config)
  const workingHoursList: WorkingHoursRow[] =
    hoursProp && hoursProp.length > 0
      ? hoursProp
      : company.workingHours.map((h) => ({ day: h.day, hours: h.hours }));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-white/10 shadow-sm"
          : "bg-transparent"
      )}
    >
      {/* ─── ÜST HAIRLINE BAR — telefon + email (şeffaf, video üzerine) ─── */}
      <div className="hidden md:block border-b border-white/10">
        <div className="container-wide flex h-9 items-center justify-between text-xs text-white/60">
          <div className="flex items-center gap-5">
            <a
              href={`tel:${contact.phone}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone size={12} />
              <span className="tabular-nums">{contact.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail size={12} />
              <span>{contact.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="font-mono uppercase tracking-widest text-[10px]">
              {workingHoursList[0]?.hours ?? "09:00 – 18:00"} ·{" "}
              {workingHoursList[0]?.day?.split(/[–-]/)[0]?.trim() ?? "Hafta İçi"}
            </span>
            <Link
              href="/iletisim"
              className="hover:text-white transition-colors uppercase tracking-wider text-[10px] font-medium"
            >
              Bize Ulaşın →
            </Link>
          </div>
        </div>
      </div>

      {/* ─── ANA NAV ROW ─── */}
      <div className="container-wide flex h-20 md:h-24 items-center justify-between gap-3">
        <Logo size="default" withSymbol inverted src={logoUrl} />

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}

          {/* ─── Eren'in Sanity'de oluşturduğu özel sayfalar (navbar'da göster=açık) ─── */}
          {navbarPages.map((p) => (
            <NavLink
              key={p._id}
              href={`/${p.slug}`}
              label={p.navbarLabel?.trim() || p.title}
            />
          ))}
        </nav>

        {/* ─── İKİ CTA ─── */}
        <div className="flex items-center gap-2">
          <LinkButton
            href="/yedek-parca"
            size="default"
            variant="outline"
            className="hidden md:inline-flex lg:hidden xl:inline-flex border-white/20 text-white bg-transparent hover:border-[var(--brand-orange)]/60 hover:bg-[var(--brand-orange)]/10 hover:text-white font-semibold"
          >
            <Cog size={14} className="mr-1.5" />
            Yedek Parça
          </LinkButton>
          <Magnetic strength={0.2}>
            <LinkButton
              href="/teklif-al"
              size="default"
              className="hidden md:inline-flex bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold shadow-[0_0_0_0_var(--brand-orange)] hover:shadow-[0_8px_24px_-6px_var(--brand-orange)] transition-all"
            >
              Teklif Al
            </LinkButton>
          </Magnetic>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-white hover:text-white hover:bg-white/10"
                  aria-label="Menüyü aç"
                >
                  <Menu />
                </Button>
              }
            />
            <SheetContent
              side="left"
              className="bg-background overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle>
                  <Logo
                    size="default"
                    withSymbol
                    inverted
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
function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname?.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={cn(
        "relative px-2.5 py-2 text-sm font-medium transition-colors",
        "after:absolute after:left-2.5 after:right-2.5 after:bottom-0.5 after:h-[2px]",
        "after:bg-[var(--brand-orange)] after:origin-left after:transition-transform after:duration-300",
        isActive
          ? "text-white after:scale-x-100"
          : "text-white/75 hover:text-white after:scale-x-0 hover:after:scale-x-100"
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
