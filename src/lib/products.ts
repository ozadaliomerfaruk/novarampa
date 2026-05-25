export type ProductCategory = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  capacities: string[]; // ton
  dimensions: string;
  features: string[];
  bestFor: string[];
  icon: string; // lucide-react icon adı
  order: number;
};

export const productCategories: ProductCategory[] = [
  {
    slug: "mentereli-yukleme-rampasi",
    name: "Menteşeli (Dilli) Yükleme Rampası",
    shortName: "Menteşeli Rampa",
    tagline: "Sektörün en yaygın, en güvenilir tipi.",
    description:
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
    icon: "Warehouse",
    order: 1,
  },
  {
    slug: "teleskopik-yukleme-rampasi",
    name: "Teleskopik (Dilli) Yükleme Rampası",
    shortName: "Teleskopik Rampa",
    tagline: "Konteyner ve farklı araç yüksekliklerinin premium çözümü.",
    description:
      "Dil kısmı uzayıp kısalabilen, esnek teleskopik mekanizmaya sahip hidrolik yükleme rampası. Soğuk hava deposu projelerinde tercih edilir.",
    capacities: ["6 ton", "9 ton", "12 ton"],
    dimensions: "2000 × 2500 mm — 60 cm beton çukuru (60 cm ve 100 cm dilli versiyonlar mevcut)",
    features: [
      "Uzatılabilir dil ile konteyner yüklemeye uygun",
      "60 / 100 cm dil seçenekleri",
      "Zemin seviyesinden geniş hareket aralığı",
      "Soğuk hava deposu uyumlu yalıtım",
    ],
    bestFor: ["Soğuk hava deposu", "Konteyner yükleme", "Çoklu araç yüksekliği"],
    icon: "MoveHorizontal",
    order: 2,
  },
  {
    slug: "dik-yukleme-rampasi",
    name: "Dik (Dikey) Yükleme Rampası",
    shortName: "Dikey Rampa",
    tagline: "Beton çukur açtırmadan, inşaatı bitmiş işletmeler için.",
    description:
      "Kullanım dışı dikey konuma gelen, beton çukur gerektirmeyen yükleme rampası. Soğuk hava deposu projelerinde özellikle tercih edilir.",
    capacities: ["6 ton", "9 ton", "12 ton"],
    dimensions: "2000 × 1500 mm",
    features: [
      "Çukur açtırmaya gerek yok",
      "Kullanılmadığında dik konuma gelir",
      "Soğuk hava sızdırmazlığı için ideal",
      "Hızlı kurulum",
    ],
    bestFor: ["Soğuk hava deposu", "İnşaatı tamamlanmış depo", "Renovasyon projeleri"],
    icon: "MoveVertical",
    order: 3,
  },
  {
    slug: "seyyar-mobil-rampa",
    name: "Seyyar / Mobil Yükleme Rampası",
    shortName: "Mobil Rampa",
    tagline: "Sabit çukur gerektirmeyen, tekerlekli taşınabilir çözüm.",
    description:
      "Galvaniz ızgara yüzeyli, çatlatmaya dayanıklı çelik konstrüksiyonlu, tekerlekli mobil rampa. Açık alanlarda ve geçici sevkiyat noktalarında kullanılır.",
    capacities: ["10 ton", "12 ton", "15 ton", "20 ton"],
    dimensions: "2,2 × 10,3 m — 2 m katlanabilir kuyruk, 70 cm ön flap",
    features: [
      "100 – 150 cm yükseklik ayarı",
      "Katlanabilir kuyruk ile kompakt taşıma",
      "Galvaniz ızgara — kayma önleyici yüzey",
      "Tekerlekli, kolay taşıma",
    ],
    bestFor: ["Açık alan sevkiyat", "Geçici proje", "Hızlı kurulum gerektiren işler"],
    icon: "Truck",
    order: 4,
  },
  {
    slug: "makasli-platform",
    name: "Makaslı Platform",
    shortName: "Makaslı Platform",
    tagline: "Dikey yük taşımanın güvenli ve sessiz yolu.",
    description:
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
    icon: "ChevronsUp",
    order: 5,
  },
  {
    slug: "gomme-rampa",
    name: "Gömme Rampa",
    shortName: "Gömme Rampa",
    tagline: "Zemine sıfır, geçişe izin veren özel tasarım.",
    description:
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
    icon: "LayoutGrid",
    order: 6,
  },
  {
    slug: "konteyner-gecis-rampasi",
    name: "Konteynere Geçiş Rampası",
    shortName: "Konteyner Geçiş Rampası",
    tagline: "Forklift ve transpaletin konteynere güvenli geçişi.",
    description:
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
    icon: "Container",
    order: 7,
  },
];

export const capacityNote =
  "Belirtilen tonajlar taşıma (statik) kapasitesidir, kaldırma kapasitesi değildir.";

export function getProductBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find((p) => p.slug === slug);
}
