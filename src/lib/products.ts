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
  /** Detay sayfasındaki "Teknik Özellikler" bölümü (etiket + değer). */
  technicalSpecs?: { label: string; value: string }[];
  icon: string; // lucide-react icon adı
  order: number;
};

// ─── Ürün kataloğu ──────────────────────────────────────────────────
// Sıra Eren'in anasayfa isteğine göre:
// 1 Seyyar/Mobil · 2 Dik · 3 Menteşeli · 4 Teleskopik · 5 Gömme · 6 Konteynere Geçiş
// (Makaslı Platform katalogda korunur ama anasayfa listesinde gösterilmez.)
export const productCategories: ProductCategory[] = [
  {
    slug: "seyyar-mobil-rampa",
    name: "Seyyar / Mobil Yükleme Rampası",
    shortName: "Seyyar / Mobil Yükleme Rampası",
    tagline: "Sabit çukur gerektirmeyen, tekerlekli taşınabilir çözüm.",
    description:
      "Forkliftin zemin seviyesinden kamyon, tır gibi nakliye araçlarına tırmanmasını sağlayan, herhangi bir düz alanı yükleme alanına çevirmenize imkan tanıyan mobil çözüm.",
    capacities: ["8 ton", "10 ton", "12 ton", "15 ton", "20+ ton"],
    dimensions: "10,3 m × 2,2 m (katlanınca 8 m) — 40 cm bariyer, 75 cm dil",
    features: [
      "Beton çukur imalatı gerektirmez.",
      "Taşınabilir yapısı sayesinde istediğiniz zaman rampanızın yerini değiştirebilirsiniz.",
      "Montaj gerektirmez.",
      "Açık veya kapalı alan fark etmeksizin, forkliftin zemin seviyesinden dorseye tırmanmasını sağlar.",
      "Özellikle kapalı kasa araçlarda yükleme-boşaltma süresini minimuma indirerek verimliliğinizi artırır.",
      "Kullanılmadığı zamanlarda kuyruk kısmı katlanabilir ve alandan tasarruf sağlar.",
      "Tırmanma kısmındaki tırtıklı ve galvanizli ızgaralar ve düz kısımdaki gözyaşı desenli sac; yağmurlu havada dahi forkliftin kaymasını engelleyerek güvenle ve hız kaybetmeden çalışmanıza olanak sağlar.",
      "100-160 cm arası istenilen seviyede yükseklik ayarı yapılarak her türlü nakliye aracında kullanılabilir.",
    ],
    bestFor: ["Açık alan sevkiyat", "Geçici proje", "Hızlı kurulum gerektiren işler"],
    technicalSpecs: [
      {
        label: "Ebatlar",
        value:
          "10,3 mt uzunluk (katlanma durumunda 8 mt) × 2,2 mt genişlik × 40 cm yüksekliğinde bariyerler. İhtiyaç halinde standart ölçülerin dışına çıkılabilir.",
      },
      {
        label: "Taşıma Kapasitesi",
        value: "Standart 8 ton (10-12-15-20+ ton olarak da imal edilebilir).",
      },
      {
        label: "Maksimum kaldırma / indirme mesafesi",
        value: "160 cm / 100 cm",
      },
      {
        label: "Rampa Zemin Malzemesi",
        value:
          "Tırmanma kısmı: 3.30 galvanizli çentikli ızgara. Düz kısım: 6-7 mm antipatinaj özellikli gözyaşı desenli sac.",
      },
      {
        label: "Dil Malzemesi",
        value: "12 mm gözyaşı desenli sac, 75 cm uzunluk.",
      },
      {
        label: "Çalışma Şekli",
        value:
          "Ön dil ve kuyruk kısmı hidrolik el pompası ile çalışır. Rampa yükseklik ayarı manuel kriko ile yapılır; sisteme redüktör ilave edilerek elektrikli olarak da imal edilebilir.",
      },
    ],
    icon: "Truck",
    order: 1,
  },
  {
    slug: "dik-yukleme-rampasi",
    name: "Dik (Dikey) Yükleme Rampası",
    shortName: "Dik Rampa",
    tagline: "Beton çukur açtırmadan, inşaatı bitmiş işletmeler için.",
    description:
      "Dik tip yükleme rampaları bina kotunun yüksek olduğu durumlarda, beton çukur imalatı gerektirmeyen ve mevcut bina betonuna monte edilebilen, pratik ve ekonomik bir çözümdür.",
    capacities: ["6 ton", "8 ton", "10 ton", "12 ton"],
    dimensions: "200 × 150 cm · 200 × 200 cm",
    features: [
      "Beton çukur imalatı gerektirmez.",
      "Kullanılmadığı zaman dik konuma gelerek yer kaplamaz.",
      "Kurulumu ve bakımı kolaydır.",
      "Farklı tonajlarda ve ölçülerde imal edilebilir.",
      "Yükleme ve boşaltma sırasında rampa kendini otomatik olarak araç kasasının değişen yüksekliğine göre ayarlar.",
    ],
    bestFor: ["İnşaatı tamamlanmış depo", "Yüksek bina kotu", "Renovasyon projeleri"],
    technicalSpecs: [
      {
        label: "Ebatlar",
        value:
          "200 × 150 cm, 200 × 200 cm. İhtiyaç halinde standart ölçülerin dışına çıkılabilir.",
      },
      {
        label: "Taşıma Kapasitesi",
        value: "Standart 6 ton (8, 10, 12 ton olarak da imal edilebilir).",
      },
      {
        label: "Rampa Zemin Malzemesi",
        value: "Antipatinaj özellikli 6-7 mm gözyaşı desenli sac.",
      },
      {
        label: "Çalışma Şekli",
        value:
          "Elektrikli hidrolik ünite ile çalışır. Opsiyonel olarak, elektrik kesintilerinde zaman kaybetmemek adına manuel el pompası ile de kontrol edilebilir.",
      },
    ],
    icon: "MoveVertical",
    order: 2,
  },
  {
    slug: "mentereli-yukleme-rampasi",
    name: "Menteşeli (Dilli) Yükleme Rampası",
    shortName: "Menteşeli Rampa",
    tagline: "Sektörün en yaygın, en güvenilir tipi.",
    description:
      "Menteşeli yükleme rampası, beton içine gömülerek hiçbir yer kaplamadan depo zemini ile araç arasında kolay ve problemsiz bir geçiş sağlamak için tasarlanmış, hızlı ve güvenli bir çözümdür.",
    capacities: ["6 ton", "8 ton", "10 ton", "12 ton", "15 ton"],
    dimensions: "200 × 250 × 60 cm platform · 40 cm menteşeli dil",
    features: [
      "Beton zeminde açılan çukura gömülerek monte edilir.",
      "Bina kotunun yüksek olduğu durumlarda en çok tercih edilen rampa sistemidir.",
      "Menteşeli rampa ile teleskopik rampa temelde aynı mantıkla çalışır.",
      "İsmini, ön tarafında yer alan ve araca oturup yükü aktarmasını sağlayan 40 cm'lik menteşeli dilden alır.",
      "Yükleme ve boşaltma sırasında rampa kendini otomatik olarak araç kasasının değişen yüksekliğine göre ayarlar.",
      "Nakliye aracının yanaşma esnasında rampaya ve betona zarar vermemesi için beton çukurunun sağına ve soluna çarpma takozları monte edilir.",
      "Körüklerle birlikte kullanıldığında ısı kaybının önlenmesinde ve hijyenin sağlanmasında önemli rol oynar.",
    ],
    bestFor: ["Fabrika sevkiyat", "Lojistik depo", "Genel sanayi"],
    technicalSpecs: [
      {
        label: "Ebatlar",
        value:
          "200 × 250 × 60 cm platform, 40 cm menteşeli dil. İhtiyaç halinde standart ölçülerin dışına çıkılabilir.",
      },
      {
        label: "Taşıma Kapasitesi",
        value:
          "Standart 6 ton (ihtiyaç halinde 8, 10, 12 veya 15 ton olarak da imal edilebilir).",
      },
      {
        label: "Maksimum kaldırma / indirme mesafesi",
        value: "Zemin seviyesinden -30 cm / +40 cm aralığında hareket kabiliyeti.",
      },
      {
        label: "Rampa Zemin Malzemesi",
        value: "Antipatinaj özellikli 6-7 mm gözyaşı desenli sac.",
      },
      {
        label: "Dil Malzemesi",
        value: "Antipatinaj özellikli 12-13 mm gözyaşı desenli sac, 40 cm uzunluk.",
      },
      {
        label: "Ek Donanım",
        value: "2 adet kauçuk çarpma takozu.",
      },
      {
        label: "Çalışma Şekli",
        value: "Elektrikli hidrolik ünite ile çalışır.",
      },
    ],
    icon: "Warehouse",
    order: 3,
  },
  {
    slug: "teleskopik-yukleme-rampasi",
    name: "Teleskopik (Dilli) Yükleme Rampası",
    shortName: "Teleskopik Rampa",
    tagline: "Konteyner ve farklı araç yüksekliklerinin premium çözümü.",
    description:
      "Teleskopik rampalar, temelde menteşeli rampalar ile aynı çalışma prensibine sahiptir. Fakat daha uzun dil yapısıyla daha fazla hareket kabiliyeti sunar. Özellikle konteyner taşıyan nakliye araçlarının yükleme-boşaltma işlemlerinde avantaj sağlar.",
    capacities: ["6 ton", "8 ton", "10 ton", "12 ton", "15 ton"],
    dimensions: "200 × 250 × 60 cm platform · 50-60-100 cm teleskopik dil",
    features: [
      "Beton zeminde açılan çukura gömülerek monte edilir.",
      "Menteşeli rampa ile teleskopik rampa temelde aynı mantıkla çalışır.",
      "İsmini, ön tarafında yer alan ve araca oturup yükü aktarmasını sağlayan teleskopik dilden alır.",
      "Yükleme ve boşaltma sırasında rampa kendini otomatik olarak araç kasasının değişen yüksekliğine göre ayarlar.",
      "Nakliye aracının yanaşma esnasında rampaya ve betona zarar vermemesi için beton çukurunun sağına ve soluna çarpma takozları monte edilir.",
      "Körüklerle birlikte kullanıldığında ısı kaybının önlenmesinde ve hijyenin sağlanmasında önemli rol oynar.",
    ],
    bestFor: ["Konteyner yükleme", "Soğuk hava deposu", "Çoklu araç yüksekliği"],
    technicalSpecs: [
      {
        label: "Ebatlar",
        value:
          "200 × 250 × 60 cm platform, 50-60-100 cm teleskopik dil. İhtiyaç halinde standart ölçülerin dışına çıkılabilir.",
      },
      {
        label: "Taşıma Kapasitesi",
        value: "Standart 6 ton (8, 10, 12, 15 ton olarak da imal edilebilir).",
      },
      {
        label: "Rampa Zemin Malzemesi",
        value: "Antipatinaj özellikli 6-7 mm gözyaşı desenli sac.",
      },
      {
        label: "Dil Malzemesi",
        value: "12-13 mm gözyaşı desenli sac.",
      },
      {
        label: "Ek Donanım",
        value: "2 adet kauçuk çarpma takozu.",
      },
      {
        label: "Çalışma Şekli",
        value: "Elektrikli hidrolik ünite ile çalışır.",
      },
    ],
    icon: "MoveHorizontal",
    order: 4,
  },
  {
    slug: "gomme-rampa",
    name: "Gömme Rampa",
    shortName: "Gömme Rampa",
    tagline: "Zemine sıfır, geçişe izin veren özel tasarım.",
    description:
      "Gömme rampalar, sürekli olarak aynı alanda yükleme boşaltma işlemi yapmayı planlayan ve rampanın yer işgal etmesini istemeyen işletmeler için en ideal çözümdür.",
    capacities: ["8 ton", "10 ton", "12 ton", "15 ton"],
    dimensions: "Standart 11 m (7-15 m arası imal edilebilir)",
    features: [
      "Forkliftin zemin seviyesinden nakliye aracına tırmanmasını sağlar.",
      "Kullanılmadığı zamanlarda beton içine gömülerek yer işgal etmez.",
      "Bir nevi mobil rampa sisteminin beton zemine gömülerek sabitlenmiş halidir.",
      "Kullanılmadığında tamamen kapanarak beton ile hemzemin bir vaziyet alır.",
      "Kapalıyken üzerinden ağır vasıta geçmesinde sakınca yoktur.",
      "Yüksek mukavemetli ST52 çelikten imal edilir; tonaj aşımı olmadığı sürece deforme olmaz.",
      "Beton zemin içinde çukur açılır, rampa bu çukura yerleştirilir ve altındaki 2 piston yardımıyla kaldırılır; ön taraftaki menteşeli dil araca oturtulur ve yük dorseye aktarılır. Pistonlar yaylanma hareketi yaparak rampanın araçla senkronize, sarsıntısız yükleme yapmasını sağlar.",
    ],
    bestFor: ["Sabit yükleme noktası", "Çift kullanımlı alanlar", "Özel tasarım depo"],
    technicalSpecs: [
      {
        label: "Ebatlar",
        value:
          "Standart olarak 11 mt uzunluk idealdir; ihtiyaç halinde 7 mt'den 15 mt'ye kadar da imal edilebilir.",
      },
      {
        label: "Taşıma Kapasitesi",
        value: "8-15 ton arasında imal edilebilir.",
      },
      {
        label: "Maksimum kaldırma / indirme mesafesi",
        value: "0-160 cm aralığında hareket edebilir.",
      },
      {
        label: "Rampa Zemin Malzemesi",
        value: "Galvanizli, tırtıklı çelik ızgara.",
      },
      {
        label: "Dil Malzemesi",
        value: "12-13 mm kalınlığında, 60 cm uzunluğunda gözyaşı desenli sac.",
      },
      {
        label: "Çalışma Şekli",
        value: "Elektrikli hidrolik ünite ile çalışır.",
      },
    ],
    icon: "LayoutGrid",
    order: 5,
  },
  {
    slug: "konteyner-gecis-rampasi",
    name: "Konteynere Geçiş Rampası",
    shortName: "Konteynere Geçiş Rampası",
    tagline: "Forklift ve transpaletin konteynere güvenli geçişi.",
    description:
      "Konteynere geçiş rampaları, forklift veya transpalet gibi araçların zemin ile konteyner arasındaki kot farkını aşarak konteyner içine erişmesini sağlayan sistemlerdir.",
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
    order: 6,
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
    order: 7,
  },
];

// ─── Anasayfada gösterilecek ürünler ────────────────────────────────
// Eren'in verdiği tam sıra; Makaslı Platform anasayfada gösterilmez.
const HOME_PRODUCT_SLUGS = [
  "seyyar-mobil-rampa",
  "dik-yukleme-rampasi",
  "mentereli-yukleme-rampasi",
  "teleskopik-yukleme-rampasi",
  "gomme-rampa",
  "konteyner-gecis-rampasi",
] as const;

export const homeProducts: ProductCategory[] = HOME_PRODUCT_SLUGS.map(
  (slug) => productCategories.find((p) => p.slug === slug)!
).filter(Boolean);

export const capacityNote =
  "Belirtilen tonajlar taşıma (statik) kapasitesidir, kaldırma kapasitesi değildir.";

export function getProductBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find((p) => p.slug === slug);
}
