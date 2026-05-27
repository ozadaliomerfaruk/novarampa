#!/usr/bin/env node
/**
 * Sanity seed script — kodda gömülü tüm içeriği Sanity'ye yükler.
 *
 * Çalıştırma: node scripts/seed-sanity.mjs
 * Gereksinim: .env.local içinde SANITY_API_WRITE_TOKEN
 *
 * Güvenli: aynı _id'li belgeyi tekrar yazmak için createOrReplace kullanır.
 * Yani script'i 2. kez çalıştırırsanız duplicate oluşmaz, üzerine yazar.
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

// ─── PRODUCTS ───────────────────────────────────────────────────────
const products = [
  {
    slug: "mentereli-yukleme-rampasi",
    name: "Menteşeli (Dilli) Yükleme Rampası",
    shortName: "Menteşeli Rampa",
    tagline: "Sektörün en yaygın, en güvenilir tipi.",
    shortDescription:
      "Beton çukura monte edilen, menteşeli dil mekanizmasına sahip hidrolik yükleme rampası. Fabrika ve depo girişlerinde standart çözüm.",
    capacities: ["6 ton", "9 ton", "12 ton"],
    dimensions: "2000 × 2500 mm — 60 cm beton çukuru",
    features: [
      "Zemin seviyesinden −30 / +40 cm hareket kabiliyeti",
      "Galvaniz veya çelik dil seçenekleri",
      "Hidrolik silindirli, sessiz çalışma",
      "Otomatik dil kilitleme",
    ],
    bestFor: ["Fabrika sevkiyat", "Lojistik depo", "Genel sanayi"],
    orderRank: 1,
  },
  {
    slug: "teleskopik-yukleme-rampasi",
    name: "Teleskopik (Dilli) Yükleme Rampası",
    shortName: "Teleskopik Rampa",
    tagline: "Konteyner ve farklı araç yüksekliklerinin premium çözümü.",
    shortDescription:
      "Dil kısmı uzayıp kısalabilen, esnek teleskopik mekanizmaya sahip hidrolik yükleme rampası. Soğuk hava deposu projelerinde tercih edilir.",
    capacities: ["6 ton", "9 ton", "12 ton"],
    dimensions:
      "2000 × 2500 mm — 60 cm beton çukuru (60 cm ve 100 cm dilli versiyonlar mevcut)",
    features: [
      "Uzatılabilir dil ile konteyner yüklemeye uygun",
      "60 / 100 cm dil seçenekleri",
      "Zemin seviyesinden geniş hareket aralığı",
      "Soğuk hava deposu uyumlu yalıtım",
    ],
    bestFor: [
      "Soğuk hava deposu",
      "Konteyner yükleme",
      "Çoklu araç yüksekliği",
    ],
    orderRank: 2,
  },
  {
    slug: "dik-yukleme-rampasi",
    name: "Dik (Dikey) Yükleme Rampası",
    shortName: "Dikey Rampa",
    tagline: "Beton çukur açtırmadan, inşaatı bitmiş işletmeler için.",
    shortDescription:
      "Kullanım dışı dikey konuma gelen, beton çukur gerektirmeyen yükleme rampası. Soğuk hava deposu projelerinde özellikle tercih edilir.",
    capacities: ["6 ton", "9 ton", "12 ton"],
    dimensions: "2000 × 1500 mm",
    features: [
      "Çukur açtırmaya gerek yok",
      "Kullanılmadığında dik konuma gelir",
      "Soğuk hava sızdırmazlığı için ideal",
      "Hızlı kurulum",
    ],
    bestFor: [
      "Soğuk hava deposu",
      "İnşaatı tamamlanmış depo",
      "Renovasyon projeleri",
    ],
    orderRank: 3,
  },
  {
    slug: "seyyar-mobil-rampa",
    name: "Seyyar / Mobil Yükleme Rampası",
    shortName: "Mobil Rampa",
    tagline: "Sabit çukur gerektirmeyen, tekerlekli taşınabilir çözüm.",
    shortDescription:
      "Galvaniz ızgara yüzeyli, çatlatmaya dayanıklı çelik konstrüksiyonlu, tekerlekli mobil rampa. Açık alanlarda ve geçici sevkiyat noktalarında kullanılır.",
    capacities: ["10 ton", "12 ton", "15 ton", "20 ton"],
    dimensions: "2,2 × 10,3 m — 2 m katlanabilir kuyruk, 70 cm ön flap",
    features: [
      "100 – 150 cm yükseklik ayarı",
      "Katlanabilir kuyruk ile kompakt taşıma",
      "Galvaniz ızgara — kayma önleyici yüzey",
      "Tekerlekli, kolay taşıma",
    ],
    bestFor: [
      "Açık alan sevkiyat",
      "Geçici proje",
      "Hızlı kurulum gerektiren işler",
    ],
    orderRank: 4,
  },
  {
    slug: "makasli-platform",
    name: "Makaslı Platform",
    shortName: "Makaslı Platform",
    tagline: "Dikey yük taşımanın güvenli ve sessiz yolu.",
    shortDescription:
      "Hidrolik makas mekanizmalı dikey yükleme platformu. Büyük seviye farklarında rampa alternatifi olarak kullanılır.",
    capacities: ["500 kg", "1.000 kg", "2.000 kg", "5.000 kg"],
    dimensions: "Özel ölçü üretim",
    features: [
      "500 kg – 5.000 kg aralığında üretim",
      "Hidrolik kontrol",
      "Sessiz çalışma",
      "Acil stop ve güvenlik kilitleri",
    ],
    bestFor: ["Katlar arası yük taşıma", "Sevkiyat platformları", "Servis bölgeleri"],
    orderRank: 5,
  },
  {
    slug: "gomme-rampa",
    name: "Gömme Rampa",
    shortName: "Gömme Rampa",
    tagline: "Zemine sıfır, geçişe izin veren özel tasarım.",
    shortDescription:
      "Zemine gömülü, kullanılmadığında üzerinden geçilebilen gizli rampa çözümü. Mimari estetik gerektiren projeler için özel imalat.",
    capacities: ["Projeye özel"],
    dimensions: "Projeye özel ölçü",
    features: [
      "Zemine sıfır gömülü tasarım",
      "Kullanım dışı yaya/araç geçişine uygun",
      "Özel mimari projeler için",
      "Tam özelleştirilebilir",
    ],
    bestFor: ["Mimari projeler", "Çift kullanımlı alanlar", "Özel tasarım depo"],
    orderRank: 6,
  },
  {
    slug: "konteyner-gecis-rampasi",
    name: "Konteynere Geçiş Rampası",
    shortName: "Konteyner Geçiş Rampası",
    tagline: "Forklift ve transpaletin konteynere güvenli geçişi.",
    shortDescription:
      "Konteyner içine forklift veya transpaletle yük taşımak için tasarlanmış özel geçiş rampası. Liman, lojistik merkezi ve antrepolarda kullanılır.",
    capacities: ["6 ton", "9 ton", "12 ton"],
    dimensions: "Standart ve özel ölçü",
    features: [
      "Konteyner içine taşmayan ergonomik tasarım",
      "Forklift ve transpalet için kayma önleyici",
      "Hızlı yerleştirme",
      "Çelik konstrüksiyon",
    ],
    bestFor: ["Liman ve antrepo", "Konteyner yükleme/boşaltma", "Lojistik merkezi"],
    orderRank: 7,
  },
];

// ─── REFERENCES (Eren'in raporda paylaştığı firmalar) ──────────────
const referenceCompanies = [
  { name: "Arçelik", featured: true, sector: "Beyaz Eşya" },
  { name: "Şişecam (Cam Elyaf Sanayii A.Ş.)", featured: true, sector: "Cam ve Kimya" },
  { name: "Hayat Kimya", featured: true, sector: "Kimya" },
  { name: "Roketsan", featured: true, sector: "Savunma" },
  { name: "Eczacıbaşı", featured: true, sector: "Sağlık ve Tüketim" },
  { name: "Toyota Tsusho", featured: true, sector: "Otomotiv" },
  { name: "Mars Lojistik", featured: true, sector: "Lojistik" },
  { name: "THY", featured: true, sector: "Havacılık" },
  { name: "Arkas Lojistik", sector: "Lojistik" },
  { name: "Tosçelik", sector: "Demir Çelik" },
  { name: "Tat Gıda", sector: "Gıda" },
  { name: "Aksa Akrilik", sector: "Kimya" },
  { name: "Asaş Alüminyum", sector: "Metal" },
  { name: "Fırat Plastik", sector: "Plastik" },
  { name: "Adopen", sector: "Yapı" },
  { name: "Kalekim", sector: "Yapı" },
  { name: "Kervan", sector: "Gıda" },
  { name: "Sırma", sector: "İçecek" },
  { name: "ABC Deterjan", sector: "Temizlik" },
  { name: "ABS Alçı", sector: "Yapı" },
  { name: "C Steinweg Levant", sector: "Lojistik" },
  { name: "Chryso Kat Katkı Malz.", sector: "Yapı Kimyasalları" },
  { name: "Cronimet", sector: "Metal" },
  { name: "Çobanpınar", sector: "Gıda" },
  { name: "Deva Holding A.Ş.", sector: "İlaç" },
  { name: "Docotton Group", sector: "Tekstil" },
  { name: "EAE", sector: "Elektrik" },
  { name: "Ege Kimya", sector: "Kimya" },
  { name: "Enpay", sector: "Enerji" },
  { name: "Erşen Antrepo", sector: "Lojistik" },
  { name: "Frimpeks", sector: "Etiket/Baskı" },
  { name: "Günöz Tekstil", sector: "Tekstil" },
  { name: "Hasçelik Kablo", sector: "Kablo" },
  { name: "Horoz Lojistik", sector: "Lojistik" },
  { name: "HSA Enerji", sector: "Enerji" },
  { name: "İNKA", sector: "Yapı" },
  { name: "İskefe Holding", sector: "Holding" },
  { name: "Kartonsan", sector: "Karton" },
  { name: "Kırmızıgül Kozmetik", sector: "Kozmetik" },
  { name: "Kronospan", sector: "Mobilya/Levha" },
  { name: "Makbul", sector: "Gıda" },
  { name: "Mondi", sector: "Ambalaj" },
  { name: "Ode Yalıtım", sector: "Yapı" },
  { name: "Özdilek", sector: "Perakende/Tekstil" },
  { name: "Özismak", sector: "Makina" },
  { name: "Parex", sector: "Yapı Kimyasalları" },
  { name: "Patiswiss", sector: "Gıda/Çikolata" },
  { name: "Polinas", sector: "Ambalaj" },
  { name: "Poliport Kimya", sector: "Kimya/Liman" },
  { name: "Qua Granite", sector: "Seramik" },
  { name: "Rebul Kozmetik", sector: "Kozmetik" },
  { name: "Reis Makina", sector: "Makina" },
  { name: "Sarten Ambalaj", sector: "Ambalaj" },
  { name: "Silkcoat", sector: "Boya" },
  { name: "Sistem Alüminyum", sector: "Metal" },
  { name: "Sörmaş", sector: "Refrakter" },
  { name: "Targid Tarım", sector: "Tarım" },
  { name: "Tarım Kredi", sector: "Tarım Kooperatif" },
  { name: "Tedi", sector: "Perakende" },
  { name: "Teka", sector: "Beyaz Eşya" },
  { name: "Vatan Kablo", sector: "Kablo" },
  { name: "Vatan Plastik", sector: "Plastik" },
  { name: "Yataş", sector: "Mobilya" },
  { name: "Yörpaş", sector: "Gıda" },
];

// ─── SPARE PARTS ───────────────────────────────────────────────────
const spareParts = [
  // Hidrolik Sistem
  { name: "Hidrolik Silindir", category: "Hidrolik Sistem", description: "Standart hidrolik rampa silindiri. Tüm modeller için stoğumuzda mevcut." },
  { name: "Hidrolik Motor", category: "Hidrolik Sistem", description: "Hidrolik güç ünitesi motoru. Sessiz çalışma, uzun ömür." },
  { name: "Hidrolik Hortum", category: "Hidrolik Sistem", description: "Yüksek basınca dayanıklı hidrolik bağlantı hortumu. Çeşitli uzunluk seçenekleri." },
  { name: "Yağ Contası", category: "Hidrolik Sistem", description: "Hidrolik sistem sızdırmazlık contası. Periyodik bakım kapsamında değiştirilir." },
  // Elektrik Sistem
  { name: "Kontrol Kutusu", category: "Elektrik Sistem", description: "Rampa kumanda paneli. Elektronik kontrol ve güvenlik devreleri ile." },
  { name: "Buton Paneli", category: "Elektrik Sistem", description: "Operatör butonları. Yukarı/aşağı/acil stop. Su geçirmez muhafaza." },
  { name: "Limit Anahtarı", category: "Elektrik Sistem", description: "Otomatik durdurma anahtarı. Güvenlik için kritik bileşen." },
  { name: "Kablo Seti", category: "Elektrik Sistem", description: "Komple elektrik kablo bağlantı seti. Etiketli, kolay montajlı." },
  // Mekanik Aksam
  { name: "Menteşe Pimleri", category: "Mekanik Aksam", description: "Sertleştirilmiş çelik menteşe pinleri. Ağır yük dayanımı." },
  { name: "Dil Mekanizması", category: "Mekanik Aksam", description: "Menteşeli/teleskopik dil grupları. Galvaniz ve çelik versiyonları mevcut." },
  { name: "Yay Sistemi", category: "Mekanik Aksam", description: "Dil hareketini destekleyen yay grubu. Standart ve özel tonajlı versiyonlar." },
  { name: "Çelik Halat", category: "Mekanik Aksam", description: "Yedek güvenlik halatı. Sertifikalı, yük kapasitesi etiketli." },
  // Tampon & Conta
  { name: "Lastik Flap", category: "Tampon & Conta", description: "Ön/yan kapak lastiği. Soğuk hava deposu sızdırmazlığı için." },
  { name: "Kapı Contası", category: "Tampon & Conta", description: "Yükleme kapısı çevre contası. Yalıtım ve toz tutmaya karşı." },
  { name: "Çarpma Tamponu", category: "Tampon & Conta", description: "Tır/kamyon çarpmasını absorbe eden kauçuk tampon. 250-450 mm seçenekleri." },
  { name: "Köşe Koruyucu", category: "Tampon & Conta", description: "Kapı çevresi köşe koruma profilleri. Aşınmaya karşı." },
];

// ─── SETTINGS DEFAULTS ─────────────────────────────────────────────
const settings = {
  _id: "siteSettings",
  _type: "settings",
  heroTitle: "Yükleme rampası imalatçısı.",
  heroSubtitle:
    "Hidrolik yükleme rampası, teleskopik, makaslı platform — fabrika ve depo girişleri için anahtar teslim imalat, montaj ve servis.",
  heroCtaLabel: "Hemen Teklif Al",
  stats: [
    { _key: "s1", value: 23, suffix: "+", label: "Yıllık Miras", caption: "2003'ten beri sahada" },
    { _key: "s2", value: 150, suffix: "+", label: "Proje Teslimi", caption: "İmalat + montaj" },
    { _key: "s3", value: 20, suffix: "T", label: "Kapasiteye Kadar", caption: "Mobil + Makaslı dahil" },
    { _key: "s4", value: 11, suffix: " İL", label: "Marmara + Türkiye", caption: "Genelinde sevkiyat" },
  ],
  certifications: ["CE & TSE Belgeli", "EN 1398 Uyumlu", "2 Yıl Garanti"],
  brandTimeline: [
    {
      _key: "m1",
      year: 2003,
      title: "Dinamik Mühendislik kuruldu",
      description: "Yükleme rampası sektörüne giriş; ilk fabrika ve depo projeleri.",
    },
    {
      _key: "m2",
      year: 2010,
      title: "Marmara genelinde uzmanlaşma",
      description: "İstanbul, Kocaeli, Bursa OSB'lerinde kurulu yüzlerce ürün.",
    },
    {
      _key: "m3",
      year: 2018,
      title: "Soğuk hava ve özel imalat",
      description: "Teleskopik, dikey ve makaslı platform üretiminin başlangıcı.",
    },
    {
      _key: "m4",
      year: 2022,
      title: "Nova Rampa markası doğdu",
      description: "Yeni nesil vizyon, modern tasarım, dijital servis süreçleri.",
    },
    {
      _key: "m5",
      year: 2026,
      title: "Türkiye geneline yayılım",
      description: "Marmara'dan tüm Türkiye'ye sevkiyat ve montaj ağı.",
    },
  ],
  companyName: "Nova Rampa",
  tagline:
    "Yirmi yıllık ustalığın üzerine inşa edilen yeni nesil yükleme rampası markası.",
  contact: {
    phone: "+905348676693",
    phoneDisplay: "+90 534 867 6693",
    email: "info@novarampa.com",
    whatsapp: "905348676693",
  },
  locations: [
    {
      _key: "loc1",
      label: "Atölye",
      type: "workshop",
      addressLine1: "Zafer Mahallesi, Bakım Onarım 3. Sokak No:12",
      city: "Çorlu",
      district: "Tekirdağ",
    },
    {
      _key: "loc2",
      label: "Ofis",
      type: "office",
      addressLine1: "Mimar Sinan Mahallesi, Basra Caddesi, Hazım Sokak No:2A",
      city: "Sultanbeyli",
      district: "İstanbul",
    },
  ],
  workingHours: [
    { _key: "wh1", day: "Pazartesi – Cuma", hours: "09:00 – 18:00" },
    { _key: "wh2", day: "Cumartesi", hours: "09:00 – 12:00" },
    { _key: "wh3", day: "Pazar", hours: "Kapalı" },
  ],
  homeFaqs: [
    {
      _key: "hf1",
      question: "Yükleme rampası seçerken nelere dikkat etmeli?",
      answer:
        "En kritik 4 faktör: 1) Taşıma kapasitesi (6-20 ton aralığında), 2) Beton çukur ölçüsü (standart 60 cm), 3) Araç tipi (TIR, kamyon, konteyner), 4) Sektör ihtiyacı (soğuk hava sızdırmazlığı vb). Saha keşfi ile en uygun model birlikte belirlenir.",
    },
    {
      _key: "hf2",
      question: "Menteşeli mi teleskopik rampa mı tercih edilmeli?",
      answer:
        "Standart kamyon yükleme için menteşeli, konteyner ve farklı araç yüksekliği için teleskopik tercih edilir. Soğuk hava deposu projelerinde teleskopik neredeyse zorunludur.",
    },
    {
      _key: "hf3",
      question: "Çukur açtırmadan rampa kurulabilir mi?",
      answer:
        "Evet. Dikey (dik) rampa ve seyyar mobil rampa çukur gerektirmez. Dikey rampa beton zemine cıvata ile sabitlenir, mobil rampa tekerlekli olduğu için herhangi bir alana getirilip kullanılabilir.",
    },
    {
      _key: "hf4",
      question: "Garanti süresi ne kadar?",
      answer:
        "Tüm Nova Rampa ürünlerimizde 2 yıl tam garanti veriyoruz. Garanti imalat hatalarını kapsar. Mekanik aksam, hidrolik sistem ve elektrik kontrol ünitesi garanti kapsamındadır.",
    },
    {
      _key: "hf5",
      question: "Türkiye'nin neresine sevkiyat yapıyorsunuz?",
      answer:
        "Marmara bölgesinin tamamında (İstanbul, Kocaeli, Tekirdağ, Bursa öncelikli) montaj + servis veriyoruz. Türkiye'nin her noktasına ürün sevkiyatı yapıyoruz; uzak bölgelerde montaj koşulları talebe göre değerlendirilir.",
    },
    {
      _key: "hf6",
      question: "Teklif alma süreci nasıl işliyor?",
      answer:
        "Web sitemizdeki teklif formunu doldurun veya WhatsApp'tan yazın. Mesai saatleri içinde gelen taleplere 1 iş günü içinde dönüş yapıyoruz. Saha keşfi gerekirse ücretsiz randevu alıyoruz.",
    },
    {
      _key: "hf7",
      question: "CE ve TSE belgeleriniz var mı?",
      answer:
        "Evet. Tüm ürünlerimiz CE belgeli ve TSE standartlarında üretilmektedir. Ayrıca EN 1398 uyumluluğu sağlıyoruz — bu Avrupa Birliği'nin yükleme rampası standardıdır.",
    },
    {
      _key: "hf8",
      question: "Yedek parça temin edebiliyor musunuz?",
      answer:
        "Evet. Hidrolik silindir, motor, conta, lastik flap, kontrol kutusu gibi tüm yedek parçaları stoğumuzda tutuyoruz. Acil durumlarda 1-2 iş günü içinde sevkiyat yapabiliyoruz.",
    },
    {
      _key: "hf9",
      question: "Hangi sektörlere hizmet veriyorsunuz?",
      answer:
        "Lojistik & depo, fabrika & sanayi, gıda & soğuk hava, inşaat & müteahhitlik, süpermarket & perakende ve küçük işletmeler. Sektör bazlı özelleştirilmiş çözümlerimiz var.",
    },
    {
      _key: "hf10",
      question: "Mevcut rampam için servis veriyor musunuz?",
      answer:
        "Evet, başka markaların rampalarına da servis veriyoruz. Arıza, periyodik bakım, yedek parça değişimi için Servis sayfasındaki formdan talebinizi iletebilirsiniz.",
    },
  ],
  socials: {
    // Aktif olduğunda Eren Sanity'den dolduracak. Boş bırakılırsa footer'da hiç gözükmez.
    instagram: "",
    linkedin: "",
    youtube: "",
    facebook: "",
    twitter: "",
    tiktok: "",
  },
  announcement: {
    enabled: false,
    text: "",
  },
};

// ─── ÇALIŞTIR ──────────────────────────────────────────────────────
async function seed() {
  console.log("🌱 Sanity seed başlıyor...\n");

  // 1) Products
  console.log("📦 Ürünler yükleniyor...");
  let productCount = 0;
  for (const p of products) {
    const doc = {
      _id: `product-${p.slug}`,
      _type: "product",
      name: p.name,
      shortName: p.shortName,
      slug: { _type: "slug", current: p.slug },
      tagline: p.tagline,
      shortDescription: p.shortDescription,
      capacities: p.capacities,
      dimensions: p.dimensions,
      features: p.features,
      bestFor: p.bestFor,
      orderRank: p.orderRank,
    };
    await client.createOrReplace(doc);
    productCount++;
    process.stdout.write(`  ${productCount}/${products.length} `);
  }
  console.log(`✅ ${productCount} ürün yüklendi\n`);

  // 2) References
  console.log("⭐ Referanslar yükleniyor...");
  let refCount = 0;
  for (const r of referenceCompanies) {
    const idSafe = r.name
      .toLocaleLowerCase("tr")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    const doc = {
      _id: `reference-${idSafe}`,
      _type: "referenceCompany",
      name: r.name,
      sector: r.sector,
      featured: !!r.featured,
    };
    await client.createOrReplace(doc);
    refCount++;
  }
  console.log(`✅ ${refCount} referans yüklendi\n`);

  // 3) Spare parts
  console.log("🔧 Yedek parçalar yükleniyor...");
  let partCount = 0;
  for (const p of spareParts) {
    const idSafe = p.name
      .toLocaleLowerCase("tr")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    const doc = {
      _id: `sparePart-${idSafe}`,
      _type: "sparePart",
      name: p.name,
      slug: { _type: "slug", current: idSafe },
      description: `[${p.category}] ${p.description}`,
      available: true,
      orderRank: partCount + 1,
    };
    await client.createOrReplace(doc);
    partCount++;
  }
  console.log(`✅ ${partCount} yedek parça yüklendi\n`);

  // 4) Site Settings
  console.log("⚙️ Site Ayarları güncelleniyor...");
  await client.createOrReplace(settings);
  console.log("✅ Site Settings yüklendi\n");

  console.log("🎉 Sanity seed tamamlandı!");
  console.log(`
Özet:
  📦 ${productCount} ürün
  ⭐ ${refCount} referans (${referenceCompanies.filter((r) => r.featured).length} öne çıkan)
  🔧 ${partCount} yedek parça
  ⚙️ 1 site ayarları belgesi (stats + sertifikalar + timeline + hero defaults)

Studio'yu açın: http://localhost:3000/studio
`);
}

seed().catch((err) => {
  console.error("❌ HATA:", err);
  process.exit(1);
});
