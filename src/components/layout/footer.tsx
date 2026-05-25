import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { company } from "@/lib/site-config";
import { productCategories } from "@/lib/products";
import { serviceCities } from "@/lib/services";

export function Footer() {
  const primaryCities = serviceCities.filter((c) => c.priority === "primary");

  return (
    <footer className="surface-dark mt-24 relative overflow-hidden">
      {/* Üst dekor — turuncu accent çizgi */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-orange)] to-transparent opacity-60" />

      <div className="container-wide py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Logo size="default" asLink={false} withSymbol inverted />
          <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-xs">
            {company.shortPitch}
          </p>
          <div className="mt-6 space-y-2">
            {company.certifications.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 mr-2 mb-2 text-xs font-medium text-white/85 px-2 py-1 rounded border border-white/15 bg-white/5"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4 text-white">Ürünlerimiz</h4>
          <ul className="space-y-2.5 text-sm">
            {productCategories.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/urunler/${p.slug}`}
                  className="text-white/65 hover:text-white transition-colors"
                >
                  {p.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4 text-white">Hizmet Bölgeleri</h4>
          <ul className="space-y-2.5 text-sm">
            {primaryCities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/hizmet-bolgeleri/${c.slug}`}
                  className="text-white/65 hover:text-white transition-colors"
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
            <li className="flex items-start gap-2 text-white/65">
              <Phone size={14} className="mt-1 shrink-0" />
              <a
                href={`tel:${company.contact.phone}`}
                className="hover:text-white transition-colors"
              >
                {company.contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2 text-white/65">
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
                className="flex items-start gap-2 text-white/65"
              >
                <MapPin size={14} className="mt-1 shrink-0" />
                <div>
                  <div className="font-medium text-white/90">{loc.label}</div>
                  <div className="text-xs leading-relaxed">
                    {loc.addressLine1}
                    <br />
                    {loc.city} / {loc.district}
                  </div>
                </div>
              </li>
            ))}
            <li className="flex items-start gap-2 text-white/65">
              <Clock size={14} className="mt-1 shrink-0" />
              <div className="text-xs leading-relaxed">
                {company.workingHours.map((h) => (
                  <div key={h.day}>
                    <span className="text-white/90">{h.day}:</span> {h.hours}
                  </div>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/55">
          <div>
            © {new Date().getFullYear()} {company.name}. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/kvkk" className="hover:text-white transition-colors">
              KVKK
            </Link>
            <Link href="/gizlilik" className="hover:text-white transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="/cerez" className="hover:text-white transition-colors">
              Çerez Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
