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
      "İki rampa da hidrolik mekanizmayla çalışır ve beton çukura monte edilir. Aralarındaki temel fark dil mekanizmasında: menteşeli rampanın dili dönerek açılır, teleskopik rampanın dili ileri–geri uzanır.",
    whenA:
      "Standart kamyon ve TIR yükleme noktaları için. Maliyet hassasiyeti yüksek projelerde, ortalama yük yüksekliği değişken olmayan tesislerde tercih edilir.",
    whenB:
      "Konteyner yüklemesi, farklı araç yüksekliklerinin sık kullanıldığı tesisler, soğuk hava deposu projeleri. Uzayan dil mekanizması esneklik sağlar.",
    verdict:
      "Araç çeşitliliği, dilin temas mesafesi ve kapı düzeni birlikte değerlendirilmelidir. Soğuk hava deposunda yalıtım ve körük dahil bütün yükleme noktası için çözüm seçilir.",
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
      "Sabit peron ile araç arasında geçiş ve zemin seviyesinden yükleme farklı ihtiyaçlardır. Kapasite, geçecek ekipman ve yüke göre; model ise saha ve montaj koşullarına göre belirlenir.",
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
      "Mevcut yapının ve yeni inşaatın gereksinimleri farklıdır. Ürün ve saha işlerinin toplam kapsamını karşılaştırın; fiyat farkı proje ölçüleri ve montaj koşullarıyla netleşir.",
  },
];

export function getComparisonBySlug(slug: string): ComparisonPair | undefined {
  return comparisons.find((c) => c.slug === slug);
}
