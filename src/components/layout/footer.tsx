import { getSiteCopy } from "@/lib/site-copy-server";
import Link from "next/link";
import type { SVGProps } from "react";
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
import { getProducts } from "@/lib/catalog";
import { getSiteData } from "@/lib/site-data";

// ─── Brand ikonları (lucide-react brand logoları yok, inline SVG) ───
function IgIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function LiIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function YtIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}
function FbIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function XIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M18 4l-12 16" />
      <path d="M6 4l12 16" />
    </svg>
  );
}
function TtIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}
type SocialIcon = (p: SVGProps<SVGSVGElement>) => React.ReactElement;

// Kurumsal sütun — Çözümler/Bölgeler kaldırıldı, sade sayfa linkleri
const corporateLinks = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Referanslar", href: "/referanslar" },
  { label: "Servis", href: "/servis" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

export async function Footer() {
  const copy = await getSiteCopy();
  const footerCtas = [
    {
      href: "/teklif-al",
      icon: MessageCircle,
      title: copy.footer.quoteTitle,
      description: copy.footer.quoteDescription,
      accent: true,
    },
    {
      href: "/servis",
      icon: Wrench,
      title: copy.footer.serviceTitle,
      description: copy.footer.serviceDescription,
    },
    {
      href: "/yedek-parca",
      icon: Cog,
      title: copy.footer.partsTitle,
      description: copy.footer.partsDescription,
    },
  ];
  const products = await getProducts();
  const { contact, socials, locations, workingHours, logoUrl, companyName } =
    await getSiteData();

  // Sadece dolu olan sosyal medya linklerini topla
  const socialEntries: {
    key: string;
    href: string;
    label: string;
    Icon: SocialIcon;
  }[] = [];
  if (socials.instagram)
    socialEntries.push({
      key: "ig",
      href: socials.instagram,
      label: "Instagram",
      Icon: IgIcon,
    });
  if (socials.linkedin)
    socialEntries.push({
      key: "li",
      href: socials.linkedin,
      label: "LinkedIn",
      Icon: LiIcon,
    });
  if (socials.youtube)
    socialEntries.push({
      key: "yt",
      href: socials.youtube,
      label: "YouTube",
      Icon: YtIcon,
    });
  if (socials.facebook)
    socialEntries.push({
      key: "fb",
      href: socials.facebook,
      label: "Facebook",
      Icon: FbIcon,
    });
  if (socials.twitter)
    socialEntries.push({
      key: "tw",
      href: socials.twitter,
      label: "X (Twitter)",
      Icon: XIcon,
    });
  if (socials.tiktok)
    socialEntries.push({
      key: "tt",
      href: socials.tiktok,
      label: "TikTok",
      Icon: TtIcon,
    });

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
              <div className="flex items-center justify-end">
                <cta.icon
                  size={28}
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

      {/* ─── Site Map: 4 sütun (marka + ürünler + kurumsal + iletişim) ─── */}
      <div className="border-t border-white/10">
        <div className="container-wide py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10">
          <div className="lg:col-span-4">
            <Logo
              size="large"
              asLink={false}
              withSymbol
              inverted
              src={logoUrl}
            />
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

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold mb-4 text-white">Ürünler</h4>
            <ul className="space-y-2.5 text-sm">
              {products.map((p) => (
                <li key={p._id}>
                  <Link
                    href={`/urunler/${p.slug.current}`}
                    className="text-white/60 hover:text-[var(--brand-orange)] transition-colors"
                  >
                    {p.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold mb-4 text-white">Kurumsal</h4>
            <ul className="space-y-2.5 text-sm">
              {corporateLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/60 hover:text-[var(--brand-orange)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold mb-4 text-white">İletişim</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-white/60">
                <Phone size={14} className="mt-1 shrink-0" />
                <a
                  href={`tel:${contact.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/60">
                <Mail size={14} className="mt-1 shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {contact.email}
                </a>
              </li>
              {locations.map((loc) => (
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
                  {workingHours.map((h) => (
                    <div key={h.day}>
                      <span className="text-white/85">{h.day}:</span> {h.hours}
                    </div>
                  ))}
                </div>
              </li>
            </ul>

            {/* ─── Sosyal Medya — Sanity'de hiç doldurulmadıysa hiç gözükmez ─── */}
            {socialEntries.length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-xs font-mono uppercase tracking-widest text-white/45 mb-3">
                  Sosyal Medya
                </div>
                <div className="flex flex-wrap gap-2">
                  {socialEntries.map((s) => (
                    <a
                      key={s.key}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="inline-flex items-center justify-center size-9 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-[var(--brand-orange)] hover:border-[var(--brand-orange)] text-white/85 hover:text-white transition-colors"
                    >
                      <s.Icon />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Copyright Strip ─── */}
      <div className="border-t border-white/10">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/45">
          <div className="font-mono uppercase tracking-wider">
            © {new Date().getFullYear()} {companyName} ·{" "}
            {locations.map((l) => l.city).join(" / ")}
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
