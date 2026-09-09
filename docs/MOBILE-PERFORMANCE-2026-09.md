# Mobil açılış iyileştirmesi — 9 Eylül 2026

Uygulama commitleri: `a6ae3ec` ve `61523b0`. Son Vercel yayını başarılı: [deployment](https://vercel.com/ahmet-eren-oezdemir-s-projects/novarampa/AXjThgtVjgHhA5YLp8G3Nsr2Y1ER).

## Yapılan değişiklikler

- Kullanılmayan Space Grotesk kaldırıldı. Open Sans, Work Sans ve JetBrains Mono aynı aileler korunarak Türkçe/Latin-1 alt kümelerine ayrıldı. Kullanılan kalınlıklar korundu; tüm Türkçe harfler otomatik kontrol edildi.
- Üç WOFF2 dosyası toplam 82.632 bayt. Yalnızca gövde ve başlık fontları önceden yükleniyor: font preload sayısı 7 → 2. Kaynaklar, SHA-256 değerleri, SIL OFL lisansları ve yeniden üretim araçları depoda.
- Fontlar `next/font/local` ile sunuluyor. Fontların geç yüklenmesi halinde ilk ziyaret boyunca metrikleri ayarlanmış tarayıcı yedeği kullanılıyor; geç font değişimiyle metin yeniden akmıyor. Bu durumda ilk ziyarette yazı görünümü küçük farklılık gösterebilir. Önbellekli ziyaretlerde marka fontları hemen kullanılabilir. Baskerville NOVARAMPA SVG korunuyor.
- Video kaynağı ilk HTML içinde yer almıyor. Metin, fontlar ve ilk görseller yüklendikten ve sayfa çizildikten sonra arka plan videosu başlatılıyor. Videodan önce duyarlı, optimize edilmiş kapak gösteriliyor.
- Hareket azaltma, veri tasarrufu ve 2G bağlantılarda otomatik video indirmesi yapılmıyor. Kullanıcının oynat/duraklat düğmesi çalışmaya devam ediyor. Video hatasında kapak korunuyor.
- Blog kapağı gereksiz preload yerine eager yükleniyor. Blog ve ürün görsellerinin sizes değerleri gerçek yerleşim genişlikleriyle eşleştirildi.
- Başlık ve blogdaki ok/süre sembolleri SVG ikonlarına çevrildi; tek sembol için büyük matematik/sembol fontlarının indirilmesi önlendi.
- Alan adı, DNS, Google hesapları ve Sanity içeriği bu çalışmada değiştirilmedi.

- Açılış metni sunucu bileşenine taşındı; başlık/slogan için Framer Motion katmanı kaldırıldı. Kaydırma oku hafif CSS hareketi kullanıyor. Mobilde pahalı tam ekran SVG grain filtresi kapatıldı.

## Doğrulama

- 21 mevcut SEO, CMS ve form testi geçti. Form testleri mock kullanır; gerçek talep gönderilmedi.
- ESLint ve üretim derlemesi geçti.
- Mobil 390 px ve masaüstü 1440 px ana sayfa/blog: yatay taşma, ilk ekranda kırık görsel ve tarayıcı çalışma hatası yok.
- Font istekleri bekletildiğinde ana ekran metni görünür, video kaynağı boş ve video ağ isteği yok; fontlar serbest bırakıldıktan sonra otomatik oynatma çalışıyor.
- Oynat/duraklat, hareket azaltma, veri tasarrufu, 2G ve video indirme hatası senaryoları kontrol edildi.
- Yavaş font yüklemesinde blog başlığının konum ve boyutu indirme öncesi/sonrası aynı kaldı. Açık tema geçişi kontrol edildi.
- Canlı HTML: HTTP 200, iki font preload, ilk HTML video kaynağı boş.

## Ölçüm yöntemi

Aynı canlı alan adı `novarampa.vercel.app`, önce `4357d3d`, sonra `61523b0` sürümüyle ölçüldü. Her sürümde ana sayfa ve ilk blog için üçer yeni tarayıcı ölçümü alındı. Araç Lighthouse 13.4.1; mobile, 412 × 823, DPR 1,75, simulate throttling, RTT 150 ms, throughput 1638,4 Kbps ve CPU slowdown 4. Tarayıcı önbelleği temiz; CDN önbelleği sıcak olabilir.

Önceki denetimin tek ölçümleri (ana sayfa 5,0 sn; blog 3,9 sn) yeni ölçümlerle karıştırılmıyor. Bu turdaki tek tek sonuçlar ve ortanca değerler raporlanıyor. Yerel CPU/ağ değişkenliği belirgin; laboratuvar sonuçları gerçek kullanıcı Core Web Vitals verisi değildir.

## Sonuçlar

Her hücre üç ölçümün ortancasıdır. Önce/sonra aynı Lighthouse yöntemi kullanıldı.

| Ölçüm | Ana sayfa önce | Ana sayfa sonra | Blog önce | Blog sonra |
|---|---:|---:|---:|---:|
| Lighthouse LCP | 2,71 sn | 3,53 sn | 4,97 sn | 1,89 sn |
| Lighthouse performans | 79 | 90 | 79 | 93 |
| Font aktarımı | 258.780 B | 83.392 B | 328.712 B | 83.422 B |
| Erişilebilirlik | 100 | 100 | 100 | 100 |
| Teknik SEO | 100 | 100 | 100 | 100 |

Ana sayfa font yükü yaklaşık %68, blog font yükü %75 azaldı. Son üç Lighthouse çalışmasının tamamında CLS 0. Ana sayfa LCP sonuçları 1,95 / 3,55 / 3,53 sn; blog 1,70 / 1,89 / 3,11 sn. Başlangıç ana sayfa sonuçları 5,74 / 2,71 / 2,68 sn idi. Dolayısıyla ana sayfanın Lighthouse LCP ortancası bu turdaki başlangıçtan daha yüksek: bu yöntemle her koşulda hızlandığı veya 2,5 sn hedefini karşıladığı iddia edilmiyor.

### Doğrudan yavaşlatılmış tarayıcı kontrolü — farklı yöntem

Canlı son sürümde Chrome CDP ile gecikme 150 ms, indirme 209.715 B/sn (yaklaşık 1,6 Mbps), yükleme 86.400 B/sn ve işlemci 4 kat yavaşlatıldı. Her ölçüm yeni tarayıcı bağlamı ve temiz önbellekle 412 × 823 / DPR 1,75 görünümde yapıldı. PerformanceObserver ile load olayından üç saniye sonrasına kadar LCP izlendi.

| Sayfa | Üç LCP ölçümü | Ortanca |
|---|---|---:|
| Ana sayfa | 2,020 / 2,084 / 1,964 sn | **2,020 sn** |
| Blog | 2,088 / 2,068 / 2,180 sn | **2,088 sn** |

Bu altı ölçümde CLS 0, yatay taşma yok, fontlar yüklenmiş ve ana sayfa videosunun kaynağı doğru. 2,5 sn hedefi bu doğrudan yavaşlatılmış testte sağlandı. Bu değerler Lighthouse simulate tahminleriyle birebir karşılaştırılmamalı. Eski sabit Vercel deployment adresi giriş sayfasına yönlendiği için bu yöntemde eski sürüm için eşleşen bir başlangıç ölçümü alınamadı.

Gerçek kullanıcı Core Web Vitals verisi henüz yok; alan adı geçişi ve Search Console kurulumu sonrası özellikle ana sayfa LCP izlenmeli. Tüm tekil ölçümler ve yöntem ayrımı [JSON sonuç dosyasında](./mobile-performance-results-2026-09.json). Ham Lighthouse raporları ve ekran görüntüleri yerel `.playwright-mcp/performance/` klasöründe. Bazı Lighthouse çalışmaları geçerli raporu yazdıktan sonra Windows geçici profil temizliğinde EPERM verdi; raporların runtimeError/runWarnings alanlarında ölçüm hatası yok.


## Bakım kaynakları

[Font dosyaları ve yeniden üretim](../src/app/fonts/README.md), [Next.js font belgeleri](https://nextjs.org/docs/app/api-reference/components/font), [Next.js Image belgeleri](https://nextjs.org/docs/app/api-reference/components/image), [Google Fonts alt küme API](https://developers.google.com/fonts/docs/css2).
