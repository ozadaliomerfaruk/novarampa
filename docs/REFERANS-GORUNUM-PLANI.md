# Referans görünümü — ikinci düzenleme

Kullanıcı tercihi: Özgün renkler, ortak açık zemin ve dengeli boyutlar.

Renkler: yüzey #FFFFFF, ince ayırıcı #E6EAEE, başlık #17212B, yardımcı metin #68737D, site vurgusu #FF7900. Ana sayfanın ve başlıkların mevcut tema paleti korunur.

Yazı: mevcut Work Sans firma isimleri (13–14 px, 500), mevcut Open Sans sektör (11–12 px). Yeni yazı tipi eklenmez.

Yerleşim: tek beyaz yüzeyde düzenli logo duvarı; telefonda 2, tablette 3, masaüstünde 4–5 sütun. İç içe kartlar ve ayrı renkli zeminler kaldırılır. Logolar optik merkeze oturur; isim ve sektör tabanda hizalanır.

```text
┌─────────────────────────────────────────────┐
│     LOGO      │     LOGO      │     LOGO     │
│  Firma / alan │ Firma / alan  │ Firma / alan │
├───────────────┼───────────────┼──────────────┤
│     LOGO      │     LOGO      │     LOGO     │
└─────────────────────────────────────────────┘
```

İlke: Novarampa'nın üretim ve sevkiyat alanındaki müşteri çeşitliliğini firmanın özgün kimlikleriyle göstermesi. Renkler değiştirilmez, tüm logoların etrafına kutu eklenmez. Her logonun oranı ve kapladığı görünür alan birlikte değerlendirilir; beyaz varyantlar resmi renkli/koyu varyantlarla değiştirilir. Kaynak dosya kalitesi yetmediğinde yeni detay uydurulmaz.

Plan değerlendirmesi: önceki iç içe yuvarlak kart düzeni yerine tek yüzey seçildi; ayırıcılar müşteri listesini taramayı kolaylaştırır. Firma bilgileri ve ana sayfadaki referans seçimi korunur.

## Uygulama ve kontrol

- [x] Tek beyaz yüzey, özgün logo renkleri ve 2–5 sütunlu düzen.
- [x] 8 resmi açık zemin varyantı, 4 dış boşluk kırpması ve 15 optik boyut ayarı.
- [x] Stüdyo üzerinden yüzde ile boyut düzenleme.
- [x] 63 logo; masaüstü/mobil ve açık/koyu tema; ana sayfa referans bandı.
- [x] Firma içerikleri korunuyor; aktarım tekrar önizlemesi 0 değişiklik.
- [x] ESLint, TypeScript ve üretim derlemesi başarılı.

Görsel değerlendirme: önceki farklı zeminli kartlar yerine aynı yüzey ve hizalar kullanılıyor. Geniş ve kare logoların görünür alanları dengeli; mobilde taşma yok. Rebul ve Sörmaş gibi düşük çözünürlüklü resmi kaynaklar için ileride özgün SVG/yüksek çözünürlüklü varlıklar kullanılabilir. Logo detayları yeniden üretilmedi.
