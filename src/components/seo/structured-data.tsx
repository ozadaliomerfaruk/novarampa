import { company, siteConfig } from "@/lib/site-config";
import { productCategories } from "@/lib/products";

// JSON-LD: Hem Google'ın rich result'ı, hem de AI motorlarının kontekstli
// anlamlandırması için kritik. Bunu <head> içinde inline script olarak basıyoruz.

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    alternateName: company.brand,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    email: company.contact.email,
    telephone: company.contact.phone,
    foundingDate: String(company.founded),
    slogan: company.slogan,
    description: siteConfig.description,
    address: company.locations.map((loc) => ({
      "@type": "PostalAddress",
      streetAddress: loc.addressLine1,
      addressLocality: loc.city,
      addressRegion: loc.district,
      addressCountry: "TR",
    })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.contact.phone,
      contactType: "sales",
      areaServed: "TR",
      availableLanguage: ["Turkish", "English"],
    },
    sameAs: Object.values(company.socials).filter(Boolean),
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#organization`,
    name: company.name,
    image: `${siteConfig.url}/og-image.jpg`,
    url: siteConfig.url,
    telephone: company.contact.phone,
    email: company.contact.email,
    priceRange: "$$",
    address: company.locations.map((loc) => ({
      "@type": "PostalAddress",
      streetAddress: loc.addressLine1,
      addressLocality: loc.city,
      addressRegion: loc.district,
      addressCountry: "TR",
    })),
    geo: company.locations[0]
      ? {
          "@type": "GeoCoordinates",
          latitude: company.locations[0].lat,
          longitude: company.locations[0].lng,
        }
      : undefined,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "12:00",
      },
    ],
    areaServed: ["İstanbul", "Kocaeli", "Tekirdağ", "Bursa", "Türkiye"],
    makesOffer: productCategories.map((p) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: p.name,
        description: p.description,
        url: `${siteConfig.url}/urunler/${p.slug}`,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.name,
    url: siteConfig.url,
    inLanguage: "tr-TR",
    publisher: {
      "@type": "Organization",
      name: company.name,
    },
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type BreadcrumbItem = { name: string; url: string };

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ProductJsonLd({
  name,
  description,
  image,
  slug,
}: {
  name: string;
  description: string;
  image?: string;
  slug: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: image || `${siteConfig.url}/og-image.jpg`,
    brand: { "@type": "Brand", name: company.name },
    manufacturer: { "@type": "Organization", name: company.name, url: siteConfig.url },
    url: `${siteConfig.url}/urunler/${slug}`,
    countryOfOrigin: "TR",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/teklif-al?urun=${slug}`,
      priceCurrency: "TRY",
      // Fiyat görünmüyor — Eren'in tercihi
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "TRY",
        eligibleQuantity: { "@type": "QuantitativeValue", minValue: 1 },
      },
    },
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (!faqs?.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
