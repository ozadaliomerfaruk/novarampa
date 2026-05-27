#!/usr/bin/env node
/**
 * Ek seed script — Sanity Settings'e:
 *   - 4 workshop fotoğrafı (Unsplash'tan upload edilir, Sanity asset olur)
 *   - 4 vitrin (featured) ürün (ilk 4 ürün)
 *
 * Çalıştırma: node scripts/seed-sanity-images.mjs
 * Gereksinim: SANITY_API_WRITE_TOKEN
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

// ─── Workshop fotoğrafları (Unsplash'tan indirilir, Sanity'ye upload edilir) ──
const workshopPhotos = [
  {
    url: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1600&q=85&auto=format&fit=crop",
    alt: "Atölyede kaynak çalışması — kıvılcımlar uçuşuyor",
    caption: "01 — Atölye · Kaynak ve çelik konstrüksiyon",
    filename: "atolye-kaynak.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=85&auto=format&fit=crop",
    alt: "Hidrolik silindir ve mekanizma yakın çekim",
    caption: "02 — Üretim · Hidrolik montaj hattı",
    filename: "uretim-hidrolik.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=85&auto=format&fit=crop",
    alt: "Yükleme rampası montajı — saha çalışması",
    caption: "03 — Montaj · Sahaya kurulum ve test",
    filename: "montaj-saha.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=1600&q=85&auto=format&fit=crop",
    alt: "Tamamlanmış rampa — kamyon yanaşmış teslim sahnesi",
    caption: "04 — Teslim · İşletmeye devir ve eğitim",
    filename: "teslim-kamyon.jpg",
  },
];

async function uploadFromUrl(url, filename) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`İndirilemedi: ${url}`);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const asset = await client.assets.upload("image", buffer, { filename });
  return asset;
}

async function seed() {
  console.log("📸 Workshop fotoğrafları indirilip Sanity'ye upload ediliyor...\n");

  const uploadedAssets = [];
  for (let i = 0; i < workshopPhotos.length; i++) {
    const p = workshopPhotos[i];
    process.stdout.write(`  ${i + 1}/${workshopPhotos.length} ${p.filename}... `);
    const asset = await uploadFromUrl(p.url, p.filename);
    uploadedAssets.push({ ...p, asset });
    console.log(`✅ (${asset._id})`);
  }

  console.log("\n📦 Vitrin ürünleri seçiliyor (ilk 4 ürün)...");
  const products = await client.fetch(
    `*[_type=="product"] | order(orderRank asc)[0...4]{_id, name, orderRank}`
  );
  console.log(`  Seçilen: ${products.map((p) => p.name).join(", ")}\n`);

  console.log("⚙️ Site Settings güncelleniyor...");
  await client
    .patch("siteSettings")
    .set({
      workshopPhotos: uploadedAssets.map((p, i) => ({
        _key: `wp-${i + 1}`,
        _type: "image",
        asset: { _type: "reference", _ref: p.asset._id },
        alt: p.alt,
        caption: p.caption,
      })),
      featuredProducts: products.map((p) => ({
        _key: `fp-${p._id.replace(/[^a-zA-Z0-9]/g, "")}`,
        _type: "reference",
        _ref: p._id,
      })),
    })
    .commit();

  console.log("✅ Site Settings güncellendi.\n");
  console.log("🎉 Tamamlandı!");
  console.log(`
Özet:
  📸 ${uploadedAssets.length} atölye fotoğrafı Sanity'ye yüklendi
  📦 ${products.length} vitrin ürünü set edildi

Şimdi Studio'da:
  → Site Ayarları → "Atölye Fotoları" sekmesi → 4 foto gözükür
  → Site Ayarları → "Vitrin Ürünleri" sekmesi → 4 ürün hazır
  Eren her birini değiştirebilir veya kaldırabilir.
`);
}

seed().catch((err) => {
  console.error("❌ HATA:", err);
  process.exit(1);
});
