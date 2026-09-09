# Sanity içerik tamamlama

Tarih: 9 Eylül 2026. Kullanıcı denetimde kalan beş başlığın tamamlanmasını istedi; önceki push ve deploy yetkisi geçerli.

## Tamamlananlar

- [x] Konteynere Geçiş Rampası ana fotoğrafı eklendi. Ürün görselinin uçlarını korumak için Stüdyo'da Görsel Yerleşimi / Tamamını göster seçeneği eklendi.
- [x] Kullanımdaki dört SSS sorusu Site Ayarları'na aktarıldı.
- [x] Kullanımdaki 19,2 saniyelik MP4 video Sanity dosya varlığına aktarıldı; mevcut stok montajın sahneleri değiştirilmedi.
- [x] Hakkımızda, ana sayfa bölümleri, sayfa başlık/açıklamaları ve teklif kutucukları için 12 grupta 51 alan içeren Sayfa Metinleri belgesi oluşturuldu ve sayfalara bağlandı.
- [x] Eksik konum taslağı iki geçerli site adresiyle tamamlandı, yedeklendi ve yayımlandı.
- [x] İletişim sayfası, harita bağlantıları, footer ve LocalBusiness yapılandırılmış verisi aynı yayımlanmış CMS adreslerini kullanıyor.
- [x] Stüdyo yardım metinleri güncellendi.
- [x] ESLint, TypeScript, üretim derlemesi ve dört CMS metin testi geçti.
- [x] Yerel üretim sürümünde 11 masaüstü ve 8 mobil sayfa kontrol edildi: HTTP 200, yatay taşma ve tarayıcı çalışma zamanı hatası yok. Sanity videosu 19,2 saniye; SSS sayısı 4.
- [x] Aktarım tekrar önizlemesi: 0 bekleyen işlem.

## Eren panelde nereden düzenleyecek?

Anasayfa İçeriği > **Sayfa Metinleri**: Hakkımızda, ana sayfa bölüm başlıkları/açıklamaları, Neden Novarampa kutucukları, ürünler/referanslar/servis/blog/iletişim/teklif/yedek parça sayfa girişleri, ortak teklif bölümü ve footer üstü üç kutucuk.

Anasayfa İçeriği > **Site Ayarları**: video, SSS soruları, adresler, iletişim bilgileri ve atölye fotoğrafları.

**Ürünler > Konteynere Geçiş Rampası > Görseller**: ana fotoğraf ve görsel yerleşimi.

Değişiklikler Stüdyo'da Yayınla düğmesiyle yayımlanır. Önbelleğin yenilenmesi nedeniyle siteye yansıması yaklaşık bir dakika sürebilir. Başlık/açıklama alanları eksikse mevcut metinler alan bazında yedek olarak kullanılır; bilinçli boş açıklamalar boş kalır.

## Veri ve kaynaklar

Konum taslağı yeni bir adres içermiyordu: yalnızca tip alanı doldurulmuş boş bir satır vardı. Sitede kullanılan iki adres aynen aktarıldı. Gerçek bir adres değişikliği yapılmadı. Hakkımızda metni, noktalaması ve “her montajda verilen emek” içindeki çift boşluk korunarak aktarıldı.

Ürün fotoğrafı [Dinamik Mühendislik / Dynamic Rampa ürün arşivinden](https://dynamicrampa.com/u57-konteynere-gecis-rampasi) alındı. Şirketin resmi sitesindeki 2003 geçmişi ve Çorlu adresi Novarampa'nın aktarılan kökeniyle örtüşüyor. Orijinal fotoğraf ve marka işareti korunuyor. Kaynak ve SHA-256: [container-ramp-image-source.json](container-ramp-image-source.json).

Aktarım: `node --env-file=.env.local scripts/complete-sanity-content.mjs` önizleme, `--apply` uygulama. Önce belge yedeği alınır; var olan metin/görsel güncellemeleri korunur. Taslak yayımlama hem taslak hem yayındaki revizyon kimliğini kontrol eder. Kod derlemesinde otomatik veri yazımı yapılmaz.

İlk işlem yedeği: `.playwright-mcp/backups/sanity-content-before-1788943452876.json`; görsel yerleşimi yedeği: `.playwright-mcp/backups/sanity-content-before-1788943905939.json`. Yedekler git dışında tutulur.

Bu kayıt yayın öncesi doğrulamayı içerir. Yayın akışı: `origin/master`, bağlı Vercel projesi, ardından canlı video/SSS/metin/adres/görsel kontrolü.
