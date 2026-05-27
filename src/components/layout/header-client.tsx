"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Menu,
  Phone,
  Mail,
  ChevronDown,
  Cog,
  Award,
  Building2,
  Hammer,
  Wrench,
  BookOpen,
  MessageCircle,
  Briefcase,
  Star,
  Package,
  Layers,
  MapPin,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
import { productCategories } from "@/lib/products";
import { customerSegments, serviceCities } from "@/lib/services";
import { cn } from "@/lib/utils";
import type { MergedContact, NavSegment, NavCity } from "@/lib/site-data";
import type { NavbarPage, WorkingHoursRow } from "@/sanity/lib/types";

type ActiveMenu =
  | "products"
  | "solutions"
  | "regions"
  | "company"
  | "service"
  | "contact"
  | null;

// Blog tek link kalıyor — Sanity içeriği henüz boş.
const navItems = [{ label: "Blog", href: "/blog" }];

const mobileExtras = [
  { label: "Yedek Parça", href: "/yedek-parca" },
  { label: "Referanslar", href: "/referanslar" },
];

// ─── Mobile sheet için dropdown alt menü içerikleri ───
const companyItems = [
  {
    icon: Hammer,
    label: "Şirket Hikayesi",
    description: "Dinamik Mühendislik'ten Nova Rampa'ya",
    href: "/hakkimizda",
  },
  {
    icon: Award,
    label: "Sertifikalar",
    description: "CE, TSE, EN 1398 uyumlu üretim",
    href: "/hakkimizda#sertifikalar",
  },
  {
    icon: Building2,
    label: "Atölye & Ofis",
    description: "Çorlu üretim, Sultanbeyli ofis",
    href: "/hakkimizda#konumlar",
  },
  {
    icon: Star,
    label: "Referanslarımız",
    description: "Tamamlanan projeler, müşteri portföyü",
    href: "/referanslar",
  },
] as const;

// Base items — "Hızlı Destek" runtime contact prop'una göre eklenir.
const serviceItemsBase = [
  {
    icon: Wrench,
    label: "Servis Talep",
    description: "Arıza, periyodik bakım, saha keşfi",
    href: "/servis",
  },
  {
    icon: Cog,
    label: "Yedek Parça",
    description: "Hidrolik, mekanik, conta — orijinal stok",
    href: "/yedek-parca",
  },
  {
    icon: BookOpen,
    label: "Bakım Rehberi",
    description: "Periyodik kontrol noktaları",
    href: "/servis#bakim",
  },
] as const;

// Contact items factory — runtime contact prop'una göre üretilir.
function buildContactItems(contact: MergedContact) {
  return [
    {
      icon: Phone,
      label: "Telefon",
      description: contact.phoneDisplay,
      href: `tel:${contact.phone}`,
      external: true,
    },
    {
      icon: Mail,
      label: "E-posta",
      description: contact.email,
      href: `mailto:${contact.email}`,
      external: true,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      description: "Anlık mesaj — hızlı dönüş",
      href: contact.whatsappLink,
      external: true,
      accent: true,
    },
    {
      icon: Building2,
      label: "Atölye — Çorlu",
      description: "Zafer Mh., Bakım Onarım 3. Sok. No:12",
      href: "/iletisim#atolye",
    },
    {
      icon: Briefcase,
      label: "Ofis — Sultanbeyli",
      description: "Mimar Sinan Mh., Hazım Sok. No:2A",
      href: "/iletisim#ofis",
    },
  ] as const;
}

function buildServiceWhatsapp(contact: MergedContact) {
  return {
    icon: MessageCircle,
    label: "Hızlı Destek",
    description: "WhatsApp ile anında saha ekibi",
    href: contact.whatsappLink,
    external: true,
  } as const;
}

export function HeaderClient({
  contact = {
    phone: company.contact.phone,
    phoneDisplay: company.contact.phoneDisplay,
    email: company.contact.email,
    whatsapp: company.contact.whatsapp,
    whatsappLink: company.contact.whatsappLink,
  },
  segments: segmentsProp,
  cities: citiesProp,
  navbarPages = [],
  logoUrl,
  workingHours: hoursProp,
}: {
  contact?: MergedContact;
  segments?: NavSegment[];
  cities?: NavCity[];
  navbarPages?: NavbarPage[];
  logoUrl?: string;
  workingHours?: WorkingHoursRow[];
} = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<ActiveMenu>(null);

  // Sanity'den gelen segments/cities yoksa hardcoded fallback
  const segments: NavSegment[] =
    segmentsProp && segmentsProp.length > 0
      ? segmentsProp
      : customerSegments.map((s) => ({
          slug: s.slug,
          name: s.name,
          description: s.description,
          share: s.share,
        }));
  const cities: NavCity[] =
    citiesProp && citiesProp.length > 0
      ? citiesProp
      : serviceCities.map((c) => ({
          slug: c.slug,
          name: c.name,
          priority: c.priority,
          industrialZones: c.industrialZones,
        }));

  // Sanity'den gelen contact'a göre dinamik dropdown item'ları
  const contactItems = buildContactItems(contact);
  const serviceItems = [
    ...serviceItemsBase,
    buildServiceWhatsapp(contact),
  ] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const primaryCities = cities.filter((c) => c.priority === "primary");
  const secondaryCities = cities.filter((c) => c.priority === "secondary");

  // Çalışma saatleri (Sanity > fallback site-config)
  const workingHoursList: WorkingHoursRow[] =
    hoursProp && hoursProp.length > 0
      ? hoursProp
      : company.workingHours.map((h) => ({ day: h.day, hours: h.hours }));

  const close = () => setActive(null);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background/70 backdrop-blur-sm"
      )}
      onMouseLeave={close}
    >
      {/* ─── ÜST HAIRLINE BAR — telefon + email ─── */}
      <div className="hidden md:block border-b border-border/40 bg-[var(--brand-paper)]/30">
        <div className="container-wide flex h-9 items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-5">
            <a
              href={`tel:${contact.phone}`}
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Phone size={12} />
              <span className="tabular-nums">{contact.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Mail size={12} />
              <span>{contact.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="font-mono uppercase tracking-widest text-[10px]">
              {workingHoursList[0]?.hours ?? "09:00 – 18:00"} · {workingHoursList[0]?.day?.split(/[–-]/)[0]?.trim() ?? "Hafta İçi"}
            </span>
            <Link
              href="/iletisim"
              className="hover:text-foreground transition-colors uppercase tracking-wider text-[10px] font-medium"
            >
              Bize Ulaşın →
            </Link>
          </div>
        </div>
      </div>

      {/* ─── ANA NAV ROW ─── */}
      <div className="container-wide flex h-20 md:h-24 items-center justify-between gap-3">
        <Logo size="default" withSymbol src={logoUrl} />

        <nav className="hidden lg:flex items-center gap-0">
          {/* ─── Ürünler ─── */}
          <NavGroup
            name="products"
            label="Ürünler"
            active={active}
            setActive={setActive}
          >
            {productCategories.map((p) => (
              <NavRow
                key={p.slug}
                href={`/urunler/${p.slug}`}
                label={p.shortName}
                sublabel={p.tagline}
                icon={Package}
                onClick={close}
              />
            ))}
            <NavDivider />
            <NavRow
              href="/urunler"
              label="Tüm ürünleri gör"
              icon={ArrowRight}
              accent
              onClick={close}
            />
          </NavGroup>

          {/* ─── Çözümler ─── */}
          <NavGroup
            name="solutions"
            label="Çözümler"
            active={active}
            setActive={setActive}
          >
            {segments.map((s) => (
              <NavRow
                key={s.slug}
                href={`/cozumler/${s.slug}`}
                label={s.name}
                sublabel={s.description}
                rightLabel={`~%${s.share}`}
                icon={Layers}
                onClick={close}
              />
            ))}
            <NavDivider />
            <NavRow
              href="/cozumler"
              label="Tüm sektörel çözümler"
              icon={ArrowRight}
              accent
              onClick={close}
            />
          </NavGroup>

          {/* ─── Bölgeler ─── */}
          <NavGroup
            name="regions"
            label="Bölgeler"
            active={active}
            setActive={setActive}
          >
            <NavLabel>Öncelikli — Montaj + Servis</NavLabel>
            {primaryCities.map((c) => (
              <NavRow
                key={c.slug}
                href={`/hizmet-bolgeleri/${c.slug}`}
                label={c.name}
                sublabel={c.industrialZones?.join(", ")}
                icon={MapPin}
                onClick={close}
              />
            ))}
            <NavDivider />
            <NavLabel>Diğer İller — Sevkiyat</NavLabel>
            <div className="px-3 py-2 flex flex-wrap gap-1.5">
              {secondaryCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/hizmet-bolgeleri/${c.slug}`}
                  onClick={close}
                  className="text-xs font-medium px-2 py-0.5 rounded-full border border-border hover:border-[var(--brand-orange)]/40 hover:text-foreground text-muted-foreground transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
            <NavDivider />
            <NavRow
              href="/hizmet-bolgeleri"
              label="Türkiye geneli sevkiyat"
              icon={ArrowRight}
              accent
              onClick={close}
            />
          </NavGroup>

          {/* ─── Hakkımızda ─── */}
          <NavGroup
            name="company"
            label="Hakkımızda"
            active={active}
            setActive={setActive}
          >
            {companyItems.map((item) => (
              <NavRow
                key={item.href}
                href={item.href}
                label={item.label}
                sublabel={item.description}
                icon={item.icon}
                onClick={close}
              />
            ))}
            <NavDivider />
            <div className="px-3 py-2 flex flex-wrap gap-1.5">
              {company.certifications.map((c) => (
                <span
                  key={c}
                  className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border border-border text-muted-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </NavGroup>

          {/* ─── Servis ─── */}
          <NavGroup
            name="service"
            label="Servis"
            active={active}
            setActive={setActive}
          >
            {serviceItems.map((item) => {
              const isExternal = "external" in item && item.external;
              return (
                <NavRow
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  sublabel={item.description}
                  icon={item.icon}
                  external={isExternal}
                  onClick={close}
                />
              );
            })}
            <NavDivider />
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              {company.warrantyYears} yıl garanti
            </div>
          </NavGroup>

          {/* ─── Blog (flat link) ─── */}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={close}
              className="px-2.5 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {/* ─── Eren'in Sanity'de oluşturduğu özel sayfalar (navbar'da göster=açık) ─── */}
          {navbarPages.map((p) => (
            <Link
              key={p._id}
              href={`/${p.slug}`}
              onMouseEnter={close}
              className="px-2.5 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md transition-colors"
            >
              {p.navbarLabel?.trim() || p.title}
            </Link>
          ))}

          {/* ─── İletişim (right-aligned panel) ─── */}
          <NavGroup
            name="contact"
            label="İletişim"
            active={active}
            setActive={setActive}
            align="right"
          >
            {contactItems.map((item) => {
              const isExternal = "external" in item && item.external;
              const isAccent = "accent" in item && item.accent;
              return (
                <NavRow
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  sublabel={item.description}
                  icon={item.icon}
                  external={isExternal}
                  accent={isAccent}
                  onClick={close}
                />
              );
            })}
            <NavDivider />
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Çalışma Saatleri
            </div>
            {workingHoursList.map((h) => (
              <div
                key={h.day}
                className="px-3 py-1 flex items-center justify-between gap-3 text-xs text-muted-foreground"
              >
                <span>{h.day}</span>
                <span className="font-mono text-foreground">{h.hours}</span>
              </div>
            ))}
          </NavGroup>
        </nav>

        {/* ─── İKİ CTA ─── */}
        <div className="flex items-center gap-2">
          <LinkButton
            href="/yedek-parca"
            size="default"
            variant="outline"
            className="hidden md:inline-flex lg:hidden xl:inline-flex border-foreground/15 hover:border-[var(--brand-orange)]/40 hover:bg-[var(--brand-orange)]/5 font-semibold"
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
                  <Logo size="default" withSymbol src={logoUrl} />
                </SheetTitle>
              </SheetHeader>
              <MobileNav
                primaryCities={primaryCities}
                secondaryCities={secondaryCities}
                segments={segments}
                contact={contact}
                navbarPages={navbarPages}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// ─── NavGroup: trigger + relative-positioned mini dropdown ───
function NavGroup({
  name,
  label,
  active,
  setActive,
  align = "left",
  children,
}: {
  name: Exclude<ActiveMenu, null>;
  label: string;
  active: ActiveMenu;
  setActive: (m: ActiveMenu) => void;
  align?: "left" | "right";
  children: React.ReactNode;
}) {
  const isOpen = active === name;
  return (
    <div className="relative" onMouseEnter={() => setActive(name)}>
      <MenuTrigger
        label={label}
        active={isOpen}
        onActivate={() => setActive(name)}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute top-full mt-1 w-80 rounded-xl bg-popover/95 backdrop-blur-md border border-border shadow-[0_20px_60px_-15px_rgba(20,34,53,0.25)] overflow-hidden z-50 py-1.5",
              align === "right" ? "right-0" : "left-0"
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── MenuTrigger: header'daki tıklanabilir buton ───
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
        "inline-flex items-center gap-1 px-2.5 py-2 text-sm font-medium rounded-md transition-colors",
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

// ─── NavRow: dropdown içindeki tek satır ───
function NavRow({
  href,
  label,
  sublabel,
  rightLabel,
  icon: Icon,
  accent = false,
  external = false,
  onClick,
}: {
  href: string;
  label: string;
  sublabel?: string;
  rightLabel?: string;
  icon?: LucideIcon;
  accent?: boolean;
  external?: boolean;
  onClick?: () => void;
}) {
  const className = cn(
    "flex items-start gap-2.5 px-3 py-2 transition-colors group",
    accent ? "text-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/8" : "hover:bg-muted/60"
  );
  const inner = (
    <>
      {Icon && (
        <Icon
          size={14}
          className={cn(
            "mt-0.5 shrink-0",
            accent
              ? "text-[var(--brand-orange)]"
              : "text-muted-foreground group-hover:text-[var(--brand-orange)]"
          )}
        />
      )}
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            "text-sm font-medium leading-tight flex items-center justify-between gap-2",
            accent ? "text-[var(--brand-orange)]" : "text-foreground"
          )}
        >
          <span className="truncate">{label}</span>
          {rightLabel && (
            <span className="text-[10px] font-mono text-[var(--brand-orange)] shrink-0">
              {rightLabel}
            </span>
          )}
        </div>
        {sublabel && (
          <div className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
            {sublabel}
          </div>
        )}
      </div>
    </>
  );
  if (external) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onClick={onClick}
        className={className}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={className}>
      {inner}
    </Link>
  );
}

function NavDivider() {
  return <div className="h-px bg-border/50 my-1 mx-3" />;
}

function NavLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
      {children}
    </div>
  );
}

// ─── Mobile sheet drawer ───
function MobileNav({
  primaryCities,
  secondaryCities,
  segments,
  contact,
  navbarPages = [],
}: {
  primaryCities: NavCity[];
  secondaryCities: NavCity[];
  segments: NavSegment[];
  contact: MergedContact;
  navbarPages?: NavbarPage[];
}) {
  const contactItems = buildContactItems(contact);
  const serviceItems = [
    ...serviceItemsBase,
    buildServiceWhatsapp(contact),
  ] as const;
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
        {segments.map((s) => (
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

      <MobileSection title="Hakkımızda" href="/hakkimizda">
        {companyItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="ml-4 px-3 py-2 rounded-md text-sm text-foreground/70 hover:bg-muted hover:text-foreground transition-colors block"
          >
            — {item.label}
          </Link>
        ))}
      </MobileSection>

      <MobileSection title="Servis" href="/servis">
        {serviceItems.map((item) => {
          const isExternal = "external" in item && item.external;
          const className =
            "ml-4 px-3 py-2 rounded-md text-sm text-foreground/70 hover:bg-muted hover:text-foreground transition-colors block";
          return isExternal ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              — {item.label}
            </a>
          ) : (
            <Link key={item.label} href={item.href} className={className}>
              — {item.label}
            </Link>
          );
        })}
      </MobileSection>

      <MobileSection title="İletişim" href="/iletisim">
        {contactItems.map((item) => {
          const isExternal = "external" in item && item.external;
          const className =
            "ml-4 px-3 py-2 rounded-md text-sm text-foreground/70 hover:bg-muted hover:text-foreground transition-colors flex items-center gap-2";
          const inner = (
            <>
              <item.icon size={13} className="text-[var(--brand-orange)]" />
              <span className="truncate">
                {item.label} — {item.description}
              </span>
            </>
          );
          return isExternal ? (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={className}
            >
              {inner}
            </a>
          ) : (
            <Link key={item.label} href={item.href} className={className}>
              {inner}
            </Link>
          );
        })}
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

      {/* Eren'in Sanity'de oluşturduğu özel sayfalar */}
      {navbarPages.map((p) => (
        <Link
          key={p._id}
          href={`/${p.slug}`}
          className="px-3 py-3 rounded-md text-base font-medium hover:bg-muted transition-colors"
        >
          {p.navbarLabel?.trim() || p.title}
        </Link>
      ))}

      <LinkButton
        href="/teklif-al"
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
