/**
 * Önceden tanımlı ürün karşılaştırmaları.
 * Her biri /karsilastir/<slug> URL'sinde yayınlanır.
 *
 * Yeni karşılaştırma eklemek için bu listeye ekle — slug otomatik route'a düşer.
 */

export type ComparisonPair = {
  slug: string; // URL slug
  productASlug: string; // products.ts'teki slug
  productBSlug: string;
  title: string; // Sayfa H1'i
  shortTitle: string; // Listeleme kartında
  intro: string; // Üst paragraf
  whenA: string; // "Hangi durumda A daha iyi?"
  whenB: string; // "Hangi durumda B daha iyi?"
  verdict?: string; // "Genel öneri"
};

export const comparisons: ComparisonPair[] = [
  {
    slug: "mentereli-vs-teleskopik",
    productASlug: "mentereli-yukleme-rampasi",
    productBSlug: "teleskopik-yukleme-rampasi",
    title: "Menteşeli vs Teleskopik Yükleme Rampası",
    shortTitle: "Menteşeli vs Teleskopik",
    intro:
      "İki rampa da hidrolik mekanizmayla çalışır ve beton çukura monte edilir. Aralarındaki temel fark dil mekanizmasında: menteşeli rampa sabit, teleskopik rampa uzayıp kısalabilen dile sahip.",
    whenA:
      "Standart kamyon ve TIR yükleme noktaları için. Maliyet hassasiyeti yüksek projelerde, ortalama yük yüksekliği değişken olmayan tesislerde tercih edilir.",
    whenB:
      "Konteyner yüklemesi, farklı araç yüksekliklerinin sık kullanıldığı tesisler, soğuk hava deposu projeleri. Uzayan dil mekanizması esneklik sağlar.",
    verdict:
      "Genel kural: araç çeşitliliği yoksa menteşeli, varsa teleskopik. Soğuk hava deposunda teleskopik neredeyse zorunludur.",
  },
  {
    slug: "mentereli-vs-mobil",
    productASlug: "mentereli-yukleme-rampasi",
    productBSlug: "seyyar-mobil-rampa",
    title: "Sabit Menteşeli vs Seyyar Mobil Rampa",
    shortTitle: "Sabit vs Seyyar",
    intro:
      "Sabit menteşeli rampa beton çukura monte edilen kalıcı bir çözümdür. Mobil rampa ise tekerlekli, taşınabilir bir çelik konstrüksiyondur.",
    whenA:
      "Kalıcı işletme noktası, yüksek frekanslı sevkiyat, uzun vadeli yatırım hedefi. Çukur açtırma maliyeti karşılanabiliyorsa.",
    whenB:
      "Geçici şantiyeler, kiralık alanlar, çukur açtırılamayan zeminler, açık alan sevkiyat. Hızlı kurulum gerektiren projeler.",
    verdict:
      "Kalıcı operasyon = menteşeli, geçici veya çukursuz = mobil. Mobil rampa kapasite limiti 20 ton, menteşelide standart 12 ton ama özel imalat ile yukarı çıkılabilir.",
  },
  {
    slug: "dikey-vs-mentereli",
    productASlug: "dik-yukleme-rampasi",
    productBSlug: "mentereli-yukleme-rampasi",
    title: "Dikey Rampa vs Menteşeli Rampa",
    shortTitle: "Dikey vs Menteşeli",
    intro:
      "Dikey rampa çukur açtırmaya gerek bırakmadan, kullanılmadığında dik konuma gelen modeldir. Menteşeli rampa standart beton çukura monte edilir.",
    whenA:
      "Bina inşaatı bitmiş, sonradan rampa eklenmek istenen tesisler. Soğuk hava sızdırmazlığı kritik olduğu işletmeler.",
    whenB:
      "Yeni inşaat, müteahhitlik projeleri. Beton çukur baştan planlandığında en ekonomik çözüm.",
    verdict:
      "Renovasyon = dikey, yeni proje = menteşeli. Dikey rampa fiyat olarak %15-25 daha yüksektir ama montaj maliyeti düşürür.",
  },
];

export function getComparisonBySlug(slug: string): ComparisonPair | undefined {
  return comparisons.find((c) => c.slug === slug);
}
