import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Separator } from "@/components/ui/separator";
import { company } from "@/lib/site-config";
import { productCategories } from "@/lib/products";
import { serviceCities } from "@/lib/services";

export function Footer() {
  const primaryCities = serviceCities.filter((c) => c.priority === "primary");

  return (
    <footer className="border-t border-border bg-[var(--brand-charcoal)] mt-24">
      <div className="container-wide py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Logo size="default" asLink={false} withSymbol />
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
            {company.shortPitch}
          </p>
          <div className="mt-6 space-y-2">
            {company.certifications.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 mr-2 mb-2 text-xs font-medium text-foreground/80 px-2 py-1 rounded border border-border bg-background/40"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4 text-foreground">Ürünlerimiz</h4>
          <ul className="space-y-2.5 text-sm">
            {productCategories.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/urunler/${p.slug}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {p.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4 text-foreground">Hizmet Bölgeleri</h4>
          <ul className="space-y-2.5 text-sm">
            {primaryCities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/hizmet-bolgeleri/${c.slug}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
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
          <h4 className="text-sm font-semibold mb-4 text-foreground">İletişim</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2 text-muted-foreground">
              <Phone size={14} className="mt-1 shrink-0" />
              <a
                href={`tel:${company.contact.phone}`}
                className="hover:text-foreground transition-colors"
              >
                {company.contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2 text-muted-foreground">
              <Mail size={14} className="mt-1 shrink-0" />
              <a
                href={`mailto:${company.contact.email}`}
                className="hover:text-foreground transition-colors"
              >
                {company.contact.email}
              </a>
            </li>
            {company.locations.map((loc) => (
              <li key={loc.label} className="flex items-start gap-2 text-muted-foreground">
                <MapPin size={14} className="mt-1 shrink-0" />
                <div>
                  <div className="font-medium text-foreground/90">{loc.label}</div>
                  <div className="text-xs leading-relaxed">
                    {loc.addressLine1}
                    <br />
                    {loc.city} / {loc.district}
                  </div>
                </div>
              </li>
            ))}
            <li className="flex items-start gap-2 text-muted-foreground">
              <Clock size={14} className="mt-1 shrink-0" />
              <div className="text-xs leading-relaxed">
                {company.workingHours.map((h) => (
                  <div key={h.day}>
                    <span className="text-foreground/90">{h.day}:</span> {h.hours}
                  </div>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <Separator />

      <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div>
          © {new Date().getFullYear()} {company.name}. Tüm hakları saklıdır.
        </div>
        <div className="flex items-center gap-4">
          <Link href="/kvkk" className="hover:text-foreground transition-colors">
            KVKK
          </Link>
          <Link href="/gizlilik" className="hover:text-foreground transition-colors">
            Gizlilik Politikası
          </Link>
          <Link href="/cerez" className="hover:text-foreground transition-colors">
            Çerez Politikası
          </Link>
        </div>
      </div>
    </footer>
  );
}
