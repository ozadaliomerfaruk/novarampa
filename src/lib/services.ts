export type ServiceCity = {
  slug: string;
  name: string;
  region: string;
  industrialZones?: string[];
  priority: "primary" | "secondary" | "national";
};

// Marmara öncelikli + Türkiye geneli sevkiyat
export const serviceCities: ServiceCity[] = [
  {
    slug: "istanbul",
    name: "İstanbul",
    region: "Marmara",
    industrialZones: ["İkitelli", "Hadımköy", "Tuzla", "Sultanbeyli", "Pendik"],
    priority: "primary",
  },
  {
    slug: "kocaeli",
    name: "Kocaeli",
    region: "Marmara",
    industrialZones: ["Gebze", "İzmit", "Dilovası", "Çayırova"],
    priority: "primary",
  },
  {
    slug: "tekirdag",
    name: "Tekirdağ",
    region: "Marmara",
    industrialZones: ["Çorlu", "Çerkezköy", "Kapaklı", "Ergene"],
    priority: "primary",
  },
  {
    slug: "bursa",
    name: "Bursa",
    region: "Marmara",
    industrialZones: ["Nilüfer", "Yıldırım", "İnegöl OSB"],
    priority: "primary",
  },
  {
    slug: "sakarya",
    name: "Sakarya",
    region: "Marmara",
    priority: "secondary",
  },
  {
    slug: "yalova",
    name: "Yalova",
    region: "Marmara",
    priority: "secondary",
  },
  {
    slug: "bilecik",
    name: "Bilecik",
    region: "Marmara",
    priority: "secondary",
  },
  {
    slug: "edirne",
    name: "Edirne",
    region: "Marmara",
    priority: "secondary",
  },
  {
    slug: "kirklareli",
    name: "Kırklareli",
    region: "Marmara",
    priority: "secondary",
  },
  {
    slug: "canakkale",
    name: "Çanakkale",
    region: "Marmara",
    priority: "secondary",
  },
  {
    slug: "balikesir",
    name: "Balıkesir",
    region: "Marmara",
    priority: "secondary",
  },
];

export const serviceCoverageNote =
  "Türkiye'nin her noktasına ürün sevkiyatı yapıyoruz. Montaj ve servis koşulları konuma göre değişir; müşteri talebine göre değerlendirilir.";

export type CustomerSegment = {
  slug: string;
  name: string;
  description: string;
  share: number; // yüzde
  keywords: string[];
  recommendedProducts: string[]; // product slug
};

export const customerSegments: CustomerSegment[] = [
  {
    slug: "lojistik-depo",
    name: "Lojistik ve Depo İşletmecisi",
    description:
      "Antrepo, e-ticaret deposu, kargo merkezi sahipleri. Soğuk hava deposu yükleme körüğü ve depo rampa sistemleri arıyor.",
    share: 35,
    keywords: ["depo rampası", "lojistik rampa", "antrepo rampası"],
    recommendedProducts: [
      "teleskopik-yukleme-rampasi",
      "mentereli-yukleme-rampasi",
    ],
  },
  {
    slug: "fabrika-sanayi",
    name: "Fabrika Satın Alma Yetkilisi",
    description:
      "Otomotiv yan sanayi, gıda, kimya, plastik, metal işleme fabrikaları. CE belgeli, EN 1398 uyumlu rampa arıyor.",
    share: 25,
    keywords: ["fabrika rampası", "CE belgeli rampa", "EN 1398 rampa"],
    recommendedProducts: [
      "mentereli-yukleme-rampasi",
      "teleskopik-yukleme-rampasi",
    ],
  },
  {
    slug: "muteahhit-proje",
    name: "İnşaat / Proje Müteahhidi",
    description:
      "Yeni fabrika ya da depo inşa eden müteahhitler. Rampa çukuru ve montaj şartnamesi ihtiyacı var.",
    share: 20,
    keywords: ["rampa çukuru", "montaj şartnamesi", "proje rampası"],
    recommendedProducts: ["mentereli-yukleme-rampasi", "dik-yukleme-rampasi"],
  },
  {
    slug: "soguk-hava-gida",
    name: "Soğuk Hava Deposu / Gıda Üretimi",
    description:
      "Soğuk hava deposu işletmecileri, gıda üretim tesisleri. Hava sızdırmazlığı ve enerji verimliliği öncelikli.",
    share: 10,
    keywords: ["soğuk hava deposu rampası", "yalıtımlı rampa"],
    recommendedProducts: ["teleskopik-yukleme-rampasi", "dik-yukleme-rampasi"],
  },
  {
    slug: "supermarket-perakende",
    name: "Süpermarket / Perakende Zinciri",
    description:
      "Market arka kapısında küçük rampa ihtiyacı. Fiyat hassasiyeti yüksek.",
    share: 5,
    keywords: ["market rampası", "perakende rampa"],
    recommendedProducts: ["seyyar-mobil-rampa"],
  },
  {
    slug: "kucuk-isletme",
    name: "Küçük İşletme / Atölye",
    description:
      "Küçük çaplı seyyar veya kompakt rampa arayan işletmeler. Hızlı teslim odaklı.",
    share: 5,
    keywords: ["seyyar rampa", "küçük rampa"],
    recommendedProducts: ["seyyar-mobil-rampa"],
  },
];
