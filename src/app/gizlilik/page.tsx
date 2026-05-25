import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";
import { siteConfig, company } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: `${company.name} gizlilik politikası ve kullanıcı verilerinin korunması.`,
  alternates: { canonical: `${siteConfig.url}/gizlilik` },
  robots: { index: true, follow: false },
};

export default function GizlilikPage() {
  return (
    <LegalLayout
      title="Gizlilik Politikası"
      subtitle="Web sitemizi ziyaret ettiğinizde gizliliğinizi koruyoruz. Bu metin hangi verileri topladığımızı ve nasıl kullandığımızı açıklar."
      updatedAt="25 Mayıs 2026"
      breadcrumbLabel="Gizlilik"
    >
      <p>
        <strong>{company.name}</strong> (&quot;biz&quot;, &quot;Nova
        Rampa&quot;) olarak,{" "}
        <a href={siteConfig.url}>{siteConfig.url}</a> adresinde sunduğumuz
        hizmetler kapsamında kullanıcılarımızın gizliliğine önem veriyoruz.
        İşbu Gizlilik Politikası, web sitemizi ziyaretiniz sırasında işlenen
        verilerinizin nasıl korunduğunu açıklamaktadır.
      </p>

      <h2>1. Topladığımız Bilgiler</h2>
      <h3>1.1. Sizin Verdiğiniz Bilgiler</h3>
      <ul>
        <li>
          Teklif ve servis formlarını doldurduğunuzda paylaştığınız ad, soyad,
          telefon, e-posta, firma, şehir, talep detayı bilgileri
        </li>
        <li>E-posta veya WhatsApp üzerinden bize ilettiğiniz iletişim içerikleri</li>
      </ul>

      <h3>1.2. Otomatik Olarak Toplanan Bilgiler</h3>
      <ul>
        <li>
          IP adresi, tarayıcı türü, işletim sistemi, ziyaret edilen sayfalar,
          ziyaret süresi (Vercel Analytics aracılığıyla, anonimleştirilmiş)
        </li>
        <li>Çerez verileri (detay için Çerez Politikası&apos;na bakınız)</li>
      </ul>

      <h2>2. Bilgileri Nasıl Kullanırız</h2>
      <ul>
        <li>Talep ettiğiniz hizmetleri sağlamak ve sorularınıza yanıt vermek</li>
        <li>Teklif hazırlamak ve iletmek</li>
        <li>Site performansını analiz etmek ve kullanıcı deneyimini iyileştirmek</li>
        <li>Yasal yükümlülüklerimizi yerine getirmek</li>
      </ul>

      <h2>3. Bilgilerin Paylaşımı</h2>
      <p>Kişisel bilgilerinizi üçüncü taraflarla satmaz veya kiralamayız.</p>
      <p>
        Verileriniz yalnızca aşağıdaki durumlarda paylaşılabilir:
      </p>
      <ul>
        <li>Hizmet sağlayıcılarımız (hosting, e-posta, CMS) ile sınırlı işlem</li>
        <li>Yetkili kamu kurumlarının yasal talebi halinde</li>
        <li>Çözüm ortakları ile, hizmetin gerektirdiği ölçüde</li>
      </ul>

      <h2>4. Veri Güvenliği</h2>
      <p>
        Verileriniz, HTTPS şifrelemesi ile iletilir. Hosting altyapımız
        (Vercel, Hostinger) endüstri standardı güvenlik önlemleri ile
        korunmaktadır. İçerik yönetim sistemimiz Sanity, ISO 27001 sertifikalı
        altyapı üzerinde çalışmaktadır.
      </p>

      <h2>5. Üçüncü Taraf Hizmetleri</h2>
      <ul>
        <li>
          <strong>Vercel Analytics:</strong> Anonim ziyaretçi analizleri
          (kişisel veri içermez)
        </li>
        <li>
          <strong>Sanity CMS:</strong> İçerik yönetimi (form yanıtları burada
          saklanır)
        </li>
        <li>
          <strong>Resend:</strong> Form bildirimleri için e-posta iletimi
        </li>
        <li>
          <strong>WhatsApp:</strong> WhatsApp&apos;tan iletişim seçeneği
          Meta&apos;nın gizlilik politikasına tabidir
        </li>
      </ul>

      <h2>6. Çocukların Gizliliği</h2>
      <p>
        Web sitemiz 18 yaş altı kullanıcılardan bilinçli olarak bilgi
        toplamaz. 18 yaş altı bir kullanıcının bizimle bilgi paylaştığını
        düşünüyorsanız, lütfen bizimle iletişime geçin.
      </p>

      <h2>7. Politikanın Güncellenmesi</h2>
      <p>
        Bu Gizlilik Politikası zaman zaman güncellenebilir. Güncel sürüm her
        zaman bu sayfada yayınlanır. &quot;Son güncelleme&quot; tarihini takip
        etmenizi öneririz.
      </p>

      <h2>8. İletişim</h2>
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
