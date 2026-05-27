import { company, siteConfig } from "@/lib/site-config";
import { productCategories } from "@/lib/products";

// JSON-LD: Hem Google'ın rich result'ı, hem de AI motorlarının kontekstli
// anlamlandırması için kritik. Bunu <head> içinde inline script olarak basıyoruz.

export function OrganizationJsonLd({
  socials = [],
}: {
  socials?: string[];
} = {}) {
  // Sanity'den gelen sosyal medya linkleri varsa onları kullan,
  // yoksa hardcoded company.socials'tan boş olmayanları al.
  const sameAs =
    socials.length > 0
      ? socials
      : Object.values(company.socials).filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: company.name,
    alternateName: company.brand,
    url: siteConfig.url,
    // Logo programmatic /icon-512.png — gerçek dosya yok ama route hep çalışır
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/icon-512.png`,
      width: 512,
      height: 512,
    },
    image: `${siteConfig.url}/opengraph-image`,
    email: company.contact.email,
    telephone: company.contact.phone,
    foundingDate: String(company.founded),
    slogan: company.slogan,
    description: siteConfig.description,
    // AI motorları için: hangi alanlarda uzmanız
    knowsAbout: [
      "Yükleme rampası imalatı",
      "Hidrolik rampa",
      "Teleskopik rampa",
      "Mobil rampa",
      "Makaslı platform",
      "Konteyner geçiş rampası",
      "Soğuk hava deposu rampası",
      "CE belgeli endüstriyel ekipman",
      "EN 1398 uyumlu rampa",
      "Fabrika ve depo girişi çözümleri",
    ],
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
    sameAs,
    award: company.certifications.map((c) => `${c} sertifikası`),
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
    image: `${siteConfig.url}/opengraph-image`,
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

// ─── BlogPosting (her blog yazısı için) ────────────────────────────
export function BlogPostingJsonLd({
  title,
  description,
  slug,
  imageUrl,
  publishedAt,
  updatedAt,
  author = company.name,
  readTimeMinutes,
  tags = [],
}: {
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  readTimeMinutes?: number;
  tags?: string[];
}) {
  const url = `${siteConfig.url}/blog/${slug}`;
  const image = imageUrl ?? `${siteConfig.url}/blog/${slug}/opengraph-image`;
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: title,
    description,
    image,
    url,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: {
      "@type": author === company.name ? "Organization" : "Person",
      name: author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: company.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon-512.png`,
        width: 512,
        height: 512,
      },
    },
    keywords: tags.join(", "),
    inLanguage: "tr-TR",
    ...(readTimeMinutes && {
      timeRequired: `PT${readTimeMinutes}M`,
    }),
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── LocalBusiness — şehir bazlı (her ilin kendi entity'si) ────────
// AI'a "Bursa'da yükleme rampası firması" gibi sorulduğunda
// her şehir için ayrı bir LocalBusiness varlığı sunulur.
export function CityLocalBusinessJsonLd({
  cityName,
  slug,
  industrialZones,
  priority,
  description,
}: {
  cityName: string;
  slug: string;
  industrialZones?: string[];
  priority: "primary" | "secondary" | "national";
  description?: string;
}) {
  const url = `${siteConfig.url}/hizmet-bolgeleri/${slug}`;
  const serviceType =
    priority === "primary"
      ? "İmalat + Montaj + Servis"
      : "İmalat + Sevkiyat";

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}#localbusiness`,
    name: `${company.name} — ${cityName}`,
    description:
      description ??
      `${cityName} ve çevresine yükleme rampası imalatı, montajı ve servisi. ${
        industrialZones?.length
          ? `Hizmet verdiğimiz başlıca bölgeler: ${industrialZones.join(", ")}.`
          : ""
      } CE & TSE belgeli, EN 1398 uyumlu.`,
    url,
    image: `${siteConfig.url}/hizmet-bolgeleri/${slug}/opengraph-image`,
    telephone: company.contact.phone,
    email: company.contact.email,
    parentOrganization: { "@id": `${siteConfig.url}/#organization` },
    areaServed: {
      "@type": "City",
      name: cityName,
      ...(industrialZones?.length && {
        containsPlace: industrialZones.map((zone) => ({
          "@type": "Place",
          name: zone,
        })),
      }),
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", addressLocality: cityName },
      geoRadius: priority === "primary" ? "75000" : "200000",
    },
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${cityName} Yükleme Rampası ${serviceType}`,
        provider: { "@id": `${siteConfig.url}/#organization` },
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

// ─── Service — sektör bazlı (her sektör için ayrı service entity) ──
// AI'a "Soğuk hava deposu rampası" gibi sorulduğunda
// her sektör için ayrı bir Service varlığı sunulur.
export function SegmentServiceJsonLd({
  segmentName,
  slug,
  description,
  keywords,
}: {
  segmentName: string;
  slug: string;
  description: string;
  keywords?: string[];
}) {
  const url = `${siteConfig.url}/cozumler/${slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: `${segmentName} İçin Yükleme Rampası Çözümü`,
    description,
    url,
    provider: { "@id": `${siteConfig.url}/#organization` },
    serviceType: "Yükleme rampası imalatı ve montajı",
    areaServed: { "@type": "Country", name: "Türkiye" },
    audience: {
      "@type": "BusinessAudience",
      audienceType: segmentName,
    },
    ...(keywords?.length && { keywords: keywords.join(", ") }),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${segmentName} ürün portföyü`,
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

// ─── Service Master (Nova Rampa'nın ana hizmeti) ───────────────────
// Anasayfada Organization + LocalBusiness ile birlikte basılır.
// AI'a "Nova Rampa ne yapıyor?" sorulduğunda net hizmet tanımı sunar.
export function ServiceMasterJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/#service`,
    name: "Endüstriyel Yükleme Rampası İmalatı, Montajı ve Servisi",
    serviceType: "Yükleme rampası imalatı, kurulumu, bakımı ve yedek parça",
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: { "@type": "Country", name: "Türkiye" },
    description:
      "Hidrolik, teleskopik, dikey, mobil yükleme rampası ve makaslı platform imalatı. " +
      "Fabrika, depo, lojistik merkez ve soğuk hava deposu girişleri için anahtar teslim " +
      "üretim, montaj ve teslim sonrası servis. CE & TSE belgeli, EN 1398 uyumlu.",
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Endüstriyel işletme sahibi, fabrika satın alma yetkilisi, lojistik müdürü",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Ürün Portföyü",
      itemListElement: productCategories.map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: p.name,
          url: `${siteConfig.url}/urunler/${p.slug}`,
        },
      })),
    },
    termsOfService: `${siteConfig.url}/garanti`,
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── HowTo schema — Blog rehber yazıları için ──────────────────────
// Sanity blogPost'a `howToSteps` alanı eklenince otomatik çalışır.
// Yoksa render etmez (return null).
export function HowToJsonLd({
  name,
  description,
  steps,
  totalTime,
  imageUrl,
}: {
  name: string;
  description?: string;
  steps: { name: string; text: string; image?: string }[];
  totalTime?: string; // ISO 8601 duration, örn: "PT30M"
  imageUrl?: string;
}) {
  if (!steps || steps.length === 0) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    image: imageUrl,
    totalTime,
    inLanguage: "tr-TR",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.image && { image: s.image }),
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

// ─── Comparison page — iki ürün karşılaştırması ────────────────────
// AI'a "X vs Y rampa hangisi daha iyi?" sorulduğunda
// yapısal karşılaştırma verisi sunar.
export function ComparisonJsonLd({
  productA,
  productB,
  slug,
}: {
  productA: { name: string; slug: string; description?: string };
  productB: { name: string; slug: string; description?: string };
  slug: string;
}) {
  const url = `${siteConfig.url}/karsilastir/${slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#page`,
    url,
    name: `${productA.name} vs ${productB.name} — Karşılaştırma`,
    description: `${productA.name} ile ${productB.name} arasındaki farklar: kapasite, ölçü, kullanım alanı, fiyat değerlendirmesi.`,
    about: [
      {
        "@type": "Product",
        name: productA.name,
        url: `${siteConfig.url}/urunler/${productA.slug}`,
        description: productA.description,
      },
      {
        "@type": "Product",
        name: productB.name,
        url: `${siteConfig.url}/urunler/${productB.slug}`,
        description: productB.description,
      },
    ],
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: { "@type": "Product", name: productA.name },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: { "@type": "Product", name: productB.name },
        },
      ],
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
