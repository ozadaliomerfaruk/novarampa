import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Clock,
  Wrench,
  Cog,
} from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { company } from "@/lib/site-config";
import { productCategories } from "@/lib/products";
import { serviceCities } from "@/lib/services";

const footerCtas = [
  {
    href: "/teklif-al",
    icon: MessageCircle,
    eyebrow: "01",
    title: "Teklif Al",
    description:
      "Projeniz için ihtiyacınıza özel teklifi 24 saat içinde alın.",
    accent: true,
  },
  {
    href: "/servis",
    icon: Wrench,
    eyebrow: "02",
    title: "Servis Talep",
    description: "Mevcut rampanız için bakım, onarım, saha keşfi.",
  },
  {
    href: "/yedek-parca",
    icon: Cog,
    eyebrow: "03",
    title: "Yedek Parça",
    description: "Hidrolik, mekanik, conta — orijinal stok ve hızlı sevkiyat.",
  },
];

export function Footer() {
  const primaryCities = serviceCities.filter((c) => c.priority === "primary");

  return (
    <footer className="surface-dark relative overflow-hidden">
      {/* Turuncu hairline accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-orange)] to-transparent opacity-60" />
      {/* Soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--brand-orange)] rounded-full opacity-[0.05] blur-[140px] pointer-events-none" />

      {/* ─── CTA Cards Row ─── */}
      <div className="container-wide pt-20 pb-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {footerCtas.map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className={`group relative overflow-hidden rounded-2xl p-7 transition-all duration-500 ${
                cta.accent
                  ? "bg-[var(--brand-orange)] text-white border border-[var(--brand-orange-hover)]/40 hover:bg-[var(--brand-orange-hover)] shadow-[0_0_0_0_var(--brand-orange)] hover:shadow-[0_20px_50px_-15px_rgba(249,115,22,0.55)]"
                  : "bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-mono uppercase tracking-[0.25em] ${
                    cta.accent ? "text-white/80" : "text-white/50"
                  }`}
                >
                  {cta.eyebrow}
                </span>
                <cta.icon
                  size={20}
                  className={cta.accent ? "text-white/80" : "text-white/60"}
                />
              </div>
              <div className="mt-10 text-2xl sm:text-3xl font-heading font-bold leading-tight">
                {cta.title}
              </div>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  cta.accent ? "text-white/85" : "text-white/60"
                }`}
              >
                {cta.description}
              </p>
              <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium">
                {cta.accent ? "Hemen başla" : "Devam et"}
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ─── 4 Column Info ─── */}
      <div className="border-t border-white/10">
        <div className="container-wide py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Logo size="default" asLink={false} withSymbol inverted />
            <p className="mt-4 text-sm text-white/65 leading-relaxed max-w-xs">
              {company.shortPitch}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {company.certifications.map((c) => (
                <span
                  key={c}
                  className="text-xs font-medium text-white/85 px-2 py-1 rounded border border-white/15 bg-white/5"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">
              Ürünlerimiz
            </h4>
            <ul className="space-y-2.5 text-sm">
              {productCategories.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/urunler/${p.slug}`}
                    className="text-white/60 hover:text-[var(--brand-orange)] transition-colors"
                  >
                    {p.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">
              Hizmet Bölgeleri
            </h4>
            <ul className="space-y-2.5 text-sm">
              {primaryCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/hizmet-bolgeleri/${c.slug}`}
                    className="text-white/60 hover:text-[var(--brand-orange)] transition-colors"
                  >
                    {c.name} Yükleme Rampası
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/hizmet-bolgeleri"
                  className="text-[var(--brand-orange)] hover:text-[var(--brand-orange-hover)] transition-colors font-medium"
                >
                  Türkiye geneline sevkiyat →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">İletişim</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-white/60">
                <Phone size={14} className="mt-1 shrink-0" />
                <a
                  href={`tel:${company.contact.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {company.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/60">
                <Mail size={14} className="mt-1 shrink-0" />
                <a
                  href={`mailto:${company.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {company.contact.email}
                </a>
              </li>
              {company.locations.map((loc) => (
                <li
                  key={loc.label}
                  className="flex items-start gap-2 text-white/60"
                >
                  <MapPin size={14} className="mt-1 shrink-0" />
                  <div>
                    <div className="font-medium text-white/85">{loc.label}</div>
                    <div className="text-xs leading-relaxed">
                      {loc.addressLine1}
                      <br />
                      {loc.city} / {loc.district}
                    </div>
                  </div>
                </li>
              ))}
              <li className="flex items-start gap-2 text-white/60">
                <Clock size={14} className="mt-1 shrink-0" />
                <div className="text-xs leading-relaxed">
                  {company.workingHours.map((h) => (
                    <div key={h.day}>
                      <span className="text-white/85">{h.day}:</span> {h.hours}
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ─── Copyright Strip ─── */}
      <div className="border-t border-white/10">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/45">
          <div className="font-mono uppercase tracking-wider">
            © {new Date().getFullYear()} {company.name} · Çorlu / İstanbul
          </div>
          <div className="flex items-center gap-4">
            <Link href="/kvkk" className="hover:text-white transition-colors">
              KVKK
            </Link>
            <span className="text-white/20">·</span>
            <Link
              href="/gizlilik"
              className="hover:text-white transition-colors"
            >
              Gizlilik
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/cerez" className="hover:text-white transition-colors">
              Çerez
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
