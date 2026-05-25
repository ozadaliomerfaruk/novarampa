import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";
import { siteConfig, company } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: `${company.name} web sitesi çerez kullanım politikası.`,
  alternates: { canonical: `${siteConfig.url}/cerez` },
  robots: { index: true, follow: false },
};

export default function CerezPage() {
  return (
    <LegalLayout
      title="Çerez Politikası"
      subtitle="Web sitemizde kullanılan çerezler ve bunları nasıl yönetebileceğiniz hakkında bilgi."
      updatedAt="25 Mayıs 2026"
      breadcrumbLabel="Çerez"
    >
      <p>
        <strong>{company.name}</strong> olarak,{" "}
        <a href={siteConfig.url}>{siteConfig.url}</a> web sitemizde kullanıcı
        deneyiminizi iyileştirmek, site performansını ölçmek ve hizmetlerimizi
        geliştirmek amacıyla çerezler ve benzeri teknolojiler kullanıyoruz.
      </p>

      <h2>1. Çerez Nedir?</h2>
      <p>
        Çerezler, web sitelerinin tarayıcınızda saklayabildiği küçük metin
        dosyalarıdır. Çerezler genellikle bir web sitesinin daha verimli
        çalışmasını ve site sahiplerine bilgi sağlamasını mümkün kılar.
      </p>

      <h2>2. Kullandığımız Çerez Türleri</h2>

      <h3>2.1. Zorunlu Çerezler</h3>
      <p>
        Web sitesinin temel işlevlerinin (form gönderimi, sayfa gezinti)
        çalışması için gereklidir. Bu çerezler kapatılamaz.
      </p>
      <ul>
        <li>
          <strong>Next.js session çerezi:</strong> Form güvenliği ve sayfa
          önbellekleme
        </li>
      </ul>

      <h3>2.2. Performans / Analitik Çerezler</h3>
      <p>
        Ziyaretçilerin siteyi nasıl kullandığını ölçmek için kullanılır.
        Toplanan veriler anonimleştirilmiştir.
      </p>
      <ul>
        <li>
          <strong>Vercel Analytics:</strong> Sayfa ziyaretleri, performans
          ölçümleri (kişisel veri içermez)
        </li>
        <li>
          <strong>Vercel Speed Insights:</strong> Sayfa yükleme süresi ve
          kullanıcı deneyimi metrikleri
        </li>
      </ul>

      <h3>2.3. Üçüncü Taraf Çerezleri</h3>
      <p>
        Aşağıdaki üçüncü taraf hizmetler kendi çerezlerini yerleştirebilir:
      </p>
      <ul>
        <li>
          <strong>WhatsApp (Meta):</strong> WhatsApp linkine tıkladığınızda
          Meta&apos;nın çerezleri devreye girer
        </li>
        <li>
          <strong>Google Maps:</strong> Harita linklerine tıkladığınızda Google
          çerezleri yüklenir
        </li>
      </ul>

      <h2>3. Çerezleri Nasıl Yönetebilirsiniz?</h2>
      <p>
        Çoğu tarayıcı çerezleri otomatik olarak kabul edecek şekilde
        ayarlanmıştır. Tarayıcı ayarlarınızı değiştirerek çerezleri
        engelleyebilir veya çerez yerleştirildiğinde uyarı alabilirsiniz.
      </p>
      <p>Yaygın tarayıcılar için çerez yönetimi rehberleri:</p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/tr/kb/cerezleri-silme-web-sitelerinin-bilgilerini-kaldirma"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/tr-tr/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
          >
            Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/tr-tr/microsoft-edge/microsoft-edge-de-tan%C4%B1mlama-bilgilerini-silme-63947406-40ac-c3b8-57b9-2a946a29ae09"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Edge
          </a>
        </li>
      </ul>
      <p>
        <strong>Önemli not:</strong> Zorunlu çerezleri devre dışı bırakırsanız,
        formlar ve bazı özellikler düzgün çalışmayabilir.
      </p>

      <h2>4. Politikanın Güncellenmesi</h2>
      <p>
        Bu politika zaman zaman güncellenebilir. Son sürüm her zaman bu
        sayfada yayınlanır.
      </p>

      <h2>5. İletişim</h2>
      <p>
        Sorularınız için:{" "}
        <a href={`mailto:${company.contact.email}`}>{company.contact.email}</a>
      </p>

      <hr />

      <p style={{ fontSize: "0.9rem", opacity: 0.75 }}>
        <strong>Not:</strong> Bu metin {company.name} için hazırlanmış genel bir
        şablondur. Hukuki bağlayıcılık için lütfen şirket avukatınızla nihai
        metni gözden geçiriniz.
      </p>
    </LegalLayout>
  );
}
