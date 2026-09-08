import type { HomeFaqItem } from "@/sanity/lib/types";
export const defaultHomeFaqs: HomeFaqItem[] = [
  {
    question: "İhtiyacıma uygun rampayı nasıl seçebilirim?",
    answer:
      "Araç tipi, forklift özellikleri, taşıma kapasitesi ve kot farkı rampa seçiminde belirleyicidir. Teklif formunda ihtiyacınızı paylaşarak ekibimizden destek alabilirsiniz.",
  },
  {
    question: "Özel ölçüde yükleme rampası üretiyor musunuz?",
    answer:
      "Evet. Sahanın ölçüleri, araçlar ve kullanım koşulları değerlendirilerek ihtiyaca özel rampa üretimi yapılabilir.",
  },
  {
    question: "Ürünlerinizin garanti süresi nedir?",
    answer:
      "Tüm Novarampa ürünleri imalat hatalarına karşı 2 yıl garanti altındadır.",
  },
  {
    question: "Bakım, onarım ve yedek parça desteği sağlıyor musunuz?",
    answer:
      "Servis talep formundan bakım veya onarım ihtiyacınızı iletebilirsiniz. Yedek parça talepleri için ayrı parça talep formunu kullanabilirsiniz.",
  },
];
export function resolveHomeFaqs(items?: HomeFaqItem[] | null) {
  const valid = items?.filter(
    (item) => item.question?.trim() && item.answer?.trim(),
  );
  return valid?.length ? valid : defaultHomeFaqs;
}
