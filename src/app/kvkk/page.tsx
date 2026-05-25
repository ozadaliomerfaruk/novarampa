import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/legal-layout";
import { siteConfig, company } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: `${company.name} kişisel verilerin korunması kanunu kapsamında veri işleme politikası.`,
  alternates: { canonical: `${siteConfig.url}/kvkk` },
  robots: { index: true, follow: false },
};

export default function KvkkPage() {
  return (
    <LegalLayout
      title="KVKK Aydınlatma Metni"
      subtitle="6698 Sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu olarak aydınlatma yükümlülüğümüz."
      updatedAt="25 Mayıs 2026"
      breadcrumbLabel="KVKK"
    >
      <p>
        İşbu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu
        (&quot;KVKK&quot;) uyarınca veri sorumlusu sıfatıyla <strong>{company.name}</strong>
        tarafından, kişisel verilerinizin işlenme amaçları, hukuki sebepleri,
        toplama yöntemleri ve haklarınız hakkında sizleri bilgilendirmek amacıyla
        hazırlanmıştır.
      </p>

      <h2>1. Veri Sorumlusu</h2>
      <p>
        <strong>{company.name}</strong>
        <br />
        Atölye: {company.locations[0].addressLine1}, {company.locations[0].city} /
        {" "}{company.locations[0].district}
        <br />
        Ofis: {company.locations[1].addressLine1}, {company.locations[1].city} /
        {" "}{company.locations[1].district}
        <br />
        E-posta:{" "}
        <a href={`mailto:${company.contact.email}`}>{company.contact.email}</a>
        <br />
        Telefon: {company.contact.phoneDisplay}
      </p>

      <h2>2. İşlenen Kişisel Veriler</h2>
      <p>
        Web sitemiz üzerinden iletişim formu, teklif talep formu, servis talep
        formu doldurmanız veya bizimle e-posta/telefon yoluyla iletişime
        geçmeniz halinde aşağıdaki kişisel verileriniz işlenebilir:
      </p>
      <ul>
        <li>
          <strong>Kimlik bilgileri:</strong> Ad, soyad
        </li>
        <li>
          <strong>İletişim bilgileri:</strong> Telefon, e-posta adresi, çalıştığınız
          firma, şehir bilgisi
        </li>
        <li>
          <strong>Talep bilgileri:</strong> Ürün tercihi, kapasite, ölçü, sektör,
          mesaj içeriği, arıza tanımı
        </li>
        <li>
          <strong>Teknik veriler:</strong> Site kullanımı sırasında otomatik
          olarak işlenen IP adresi, tarayıcı bilgisi, ziyaret edilen sayfalar
        </li>
      </ul>

      <h2>3. Kişisel Verilerin İşlenme Amaçları</h2>
      <ul>
        <li>Talep ettiğiniz hizmet veya ürün hakkında size dönüş yapılması</li>
        <li>Teklif hazırlanması ve iletilmesi</li>
        <li>Servis ve bakım hizmetlerinin planlanması ve sunulması</li>
        <li>Müşteri ilişkileri yönetimi ve müşteri memnuniyetinin ölçülmesi</li>
        <li>
          Yasal yükümlülüklerin yerine getirilmesi (faturalama, vergi mevzuatı)
        </li>
        <li>Web sitesi performansının izlenmesi ve iyileştirilmesi</li>
      </ul>

      <h2>4. Kişisel Verilerin Aktarılması</h2>
      <p>
        Kişisel verileriniz; KVKK&apos;nın 8. ve 9. maddelerine uygun olarak,
        yalnızca yasal yükümlülüklerin yerine getirilmesi, hizmetin
        sunulabilmesi ve çözüm ortaklarımız ile koordinasyon amacıyla yetkili
        kamu kurumları, mali müşavir, hosting hizmet sağlayıcısı (Vercel Inc.,
        ABD; Hostinger, Litvanya) ve içerik yönetim altyapısı sağlayıcımız
        (Sanity Inc., ABD) ile paylaşılabilir. Yurt dışına aktarım, KVKK
        9. madde kapsamında açık rızanız veya yeterli korumayı taahhüt eden
        yazılı sözleşmeler çerçevesinde yapılır.
      </p>

      <h2>5. Kişisel Verilerin Saklanma Süresi</h2>
      <p>
        Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca
        ve/veya yasal saklama süreleri (örneğin ticari defterler için 10 yıl)
        boyunca saklanır. Süre sonunda silinir, yok edilir veya anonim hale
        getirilir.
      </p>

      <h2>6. Veri Sahibi Olarak Haklarınız</h2>
      <p>KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
      <ul>
        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
        <li>İşlenmişse buna ilişkin bilgi talep etme</li>
        <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
        <li>Yurt içinde veya dışında aktarıldığı üçüncü kişileri bilme</li>
        <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
        <li>KVKK&apos;da öngörülen şartlar çerçevesinde silinmesini isteme</li>
        <li>
          Aktarıldığı üçüncü kişilere yukarıdaki bildirimin yapılmasını isteme
        </li>
        <li>Aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
        <li>
          Kanuna aykırı işlenmesi sebebiyle zarara uğramanız halinde tazminat
          talep etme
        </li>
      </ul>

      <h2>7. İletişim</h2>
      <p>
        Haklarınızı kullanmak için{" "}
        <a href={`mailto:${company.contact.email}`}>{company.contact.email}</a>{" "}
        adresine veya posta yoluyla atölye adresimize yazılı başvurabilirsiniz.
        Talebiniz en geç 30 gün içinde sonuçlandırılacaktır.
      </p>

      <hr />

      <p style={{ fontSize: "0.9rem", opacity: 0.75 }}>
        <strong>Not:</strong> Bu metin {company.name} için hazırlanmış bir
        şablondur ve yürürlükteki mevzuata göre güncel tutulmaktadır. Hukuki
        bağlayıcılık için lütfen şirket avukatınızla nihai metni gözden
        geçiriniz.
      </p>
    </LegalLayout>
  );
}
