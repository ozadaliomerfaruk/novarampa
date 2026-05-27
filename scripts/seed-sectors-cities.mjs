#!/usr/bin/env node
/**
 * Sektörler + Şehirler seed.
 * src/lib/services.ts'deki hardcoded data'yı Sanity'ye taşır.
 *
 * Çalıştırma: node scripts/seed-sectors-cities.mjs
 */
import "dotenv/config";
import { config } from "dotenv";
import { createClient } from "@sanity/client";

config({ path: ".env.local" });

const client = createClient({
  projectId: "6bn1d24t",
  dataset: "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// ─── Sektörler ─────────────────────────────────────────────
const segments = [
  {
    slug: "lojistik-depo",
    name: "Lojistik ve Depo İşletmecisi",
    description:
      "Antrepo, e-ticaret deposu, kargo merkezi sahipleri. Soğuk hava deposu yükleme körüğü ve depo rampa sistemleri arıyor.",
    share: 35,
    keywords: ["depo rampası", "lojistik rampa", "antrepo rampası"],
    recommendedProducts: [
      "product-teleskopik-yukleme-rampasi",
      "product-mentereli-yukleme-rampasi",
    ],
    order: 1,
  },
  {
    slug: "fabrika-sanayi",
    name: "Fabrika Satın Alma Yetkilisi",
    description:
      "Otomotiv yan sanayi, gıda, kimya, plastik, metal işleme fabrikaları. CE belgeli, EN 1398 uyumlu rampa arıyor.",
    share: 25,
    keywords: ["fabrika rampası", "CE belgeli rampa", "EN 1398 rampa"],
    recommendedProducts: [
      "product-mentereli-yukleme-rampasi",
      "product-teleskopik-yukleme-rampasi",
    ],
    order: 2,
  },
  {
    slug: "muteahhit-proje",
    name: "İnşaat / Proje Müteahhidi",
    description:
      "Yeni fabrika ya da depo inşa eden müteahhitler. Rampa çukuru ve montaj şartnamesi ihtiyacı var.",
    share: 20,
    keywords: ["rampa çukuru", "montaj şartnamesi", "proje rampası"],
    recommendedProducts: [
      "product-mentereli-yukleme-rampasi",
      "product-dik-yukleme-rampasi",
    ],
    order: 3,
  },
  {
    slug: "soguk-hava-gida",
    name: "Soğuk Hava Deposu / Gıda Üretimi",
    description:
      "Soğuk hava deposu işletmecileri, gıda üretim tesisleri. Hava sızdırmazlığı ve enerji verimliliği öncelikli.",
    share: 10,
    keywords: ["soğuk hava deposu rampası", "yalıtımlı rampa"],
    recommendedProducts: [
      "product-teleskopik-yukleme-rampasi",
      "product-dik-yukleme-rampasi",
    ],
    order: 4,
  },
  {
    slug: "supermarket-perakende",
    name: "Süpermarket / Perakende Zinciri",
    description:
      "Market arka kapısında küçük rampa ihtiyacı. Fiyat hassasiyeti yüksek.",
    share: 5,
    keywords: ["market rampası", "perakende rampa"],
    recommendedProducts: [
      "product-seyyar-mobil-rampa",
      "product-makasli-platform",
    ],
    order: 5,
  },
  {
    slug: "kucuk-isletme",
    name: "Küçük İşletme / Atölye",
    description:
      "Küçük çaplı seyyar veya kompakt rampa arayan işletmeler. Hızlı teslim odaklı.",
    share: 5,
    keywords: ["seyyar rampa", "küçük rampa"],
    recommendedProducts: [
      "product-seyyar-mobil-rampa",
      "product-makasli-platform",
    ],
    order: 6,
  },
];

// ─── Şehirler ──────────────────────────────────────────────
const cities = [
  {
    slug: "istanbul",
    name: "İstanbul",
    region: "Marmara",
    industrialZones: ["İkitelli", "Hadımköy", "Tuzla", "Sultanbeyli", "Pendik"],
    priority: "primary",
    order: 1,
  },
  {
    slug: "kocaeli",
    name: "Kocaeli",
    region: "Marmara",
    industrialZones: ["Gebze", "İzmit", "Dilovası", "Çayırova"],
    priority: "primary",
    order: 2,
  },
  {
    slug: "tekirdag",
    name: "Tekirdağ",
    region: "Marmara",
    industrialZones: ["Çorlu", "Çerkezköy", "Kapaklı", "Ergene"],
    priority: "primary",
    order: 3,
  },
  {
    slug: "bursa",
    name: "Bursa",
    region: "Marmara",
    industrialZones: ["Nilüfer", "Yıldırım", "İnegöl OSB"],
    priority: "primary",
    order: 4,
  },
  { slug: "sakarya", name: "Sakarya", region: "Marmara", priority: "secondary", order: 5 },
  { slug: "yalova", name: "Yalova", region: "Marmara", priority: "secondary", order: 6 },
  { slug: "bilecik", name: "Bilecik", region: "Marmara", priority: "secondary", order: 7 },
  { slug: "edirne", name: "Edirne", region: "Marmara", priority: "secondary", order: 8 },
  { slug: "kirklareli", name: "Kırklareli", region: "Marmara", priority: "secondary", order: 9 },
  { slug: "canakkale", name: "Çanakkale", region: "Marmara", priority: "secondary", order: 10 },
  { slug: "balikesir", name: "Balıkesir", region: "Marmara", priority: "secondary", order: 11 },
];

async function seed() {
  console.log("🌱 Sektörler + Şehirler seed başlıyor...\n");

  // Verify products exist (segments reference them)
  const productIds = new Set(
    (await client.fetch('*[_type=="product"]._id')).map((id) => id)
  );

  // 1) Segments
  console.log("🎯 Müşteri sektörleri yükleniyor...");
  let segCount = 0;
  for (const s of segments) {
    const recommended = s.recommendedProducts
      .filter((id) => productIds.has(id))
      .map((id, i) => ({
        _key: `rp-${i + 1}`,
        _type: "reference",
        _ref: id,
      }));
    const doc = {
      _id: `segment-${s.slug}`,
      _type: "customerSegment",
      name: s.name,
      slug: { _type: "slug", current: s.slug },
      description: s.description,
      share: s.share,
      keywords: s.keywords,
      orderRank: s.order,
      recommendedProducts: recommended,
    };
    await client.createOrReplace(doc);
    segCount++;
  }
  console.log(`✅ ${segCount} sektör yüklendi\n`);

  // 2) Cities
  console.log("📍 Hizmet bölgeleri (iller) yükleniyor...");
  let cityCount = 0;
  for (const c of cities) {
    const doc = {
      _id: `city-${c.slug}`,
      _type: "serviceCity",
      name: c.name,
      slug: { _type: "slug", current: c.slug },
      region: c.region,
      priority: c.priority,
      industrialZones: c.industrialZones,
      orderRank: c.order,
    };
    await client.createOrReplace(doc);
    cityCount++;
  }
  console.log(`✅ ${cityCount} il yüklendi\n`);

  console.log("🎉 Tamamlandı!");
  console.log(`
Özet:
  🎯 ${segCount} müşteri sektörü
  📍 ${cityCount} hizmet bölgesi (${cities.filter((c) => c.priority === "primary").length} öncelikli, ${cities.filter((c) => c.priority === "secondary").length} ikincil)

Studio'da:
  → 🎯 Müşteri Sektörleri → 6 sektör hazır, görsel ekle/değiştir
  → 📍 Hizmet Bölgeleri → 11 il hazır, yeni il ekleyebilirsin
`);
}

seed().catch((err) => {
  console.error("❌ HATA:", err);
  process.exit(1);
});
