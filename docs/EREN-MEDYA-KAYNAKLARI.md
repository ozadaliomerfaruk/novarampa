# Eren geri bildirimi — medya ve veri kaynakları

Hazırlanma: 9 Eylül 2026. Ana video: `public/videos/hero-workshop-loop.mp4`.

## Video

19,2 saniye; 1280×720; 25 fps; H.264 / yuv420p; sessiz; fast-start; yaklaşık 3,0 MB. Altı sahne, her geçişte 0,4 saniye karışım. Son sahne ilk sahnenin başlangıcına karışır; döngü siyaha düşmez. Afiş: `public/videos/hero-poster.jpg`.

| Sıra | Kullanılan sahne                                           | Kaynak                                                                                                                           |
| ---- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Mevcut Novarampa mobil rampa fotoğrafında yavaş yakınlaşma | Sanity `product-seyyar-mobil-rampa.mainImage`                                                                                    |
| 2    | Forklift ile kamyona yükleme                               | [Tomas Gutierrez Duport / Pexels 32838797](https://www.pexels.com/video/efficient-warehouse-forklift-loading-outdoors-32838797/) |
| 3    | Yakınlaştırılmış kaynak çalışması                          | [Dominik Zítka / Pexels 31806784](https://www.pexels.com/video/industrial-welder-at-work-in-factory-setting-31806784/)           |
| 4    | Spiral taşlama, yakın kadraj                               | [Pexels 8804773](https://www.pexels.com/video/close-up-shot-of-grinding-metal-8804773/)                                          |
| 5    | Örs üzerinde çekiç çalışması, yakın kadraj                 | [Tima Miroshnichenko / Pexels 5846390](https://www.pexels.com/video/person-hammering-metal-5846390/)                             |
| 6    | Fabrikada şerit testere                                    | [Tima Miroshnichenko / Pexels 4941369](https://www.pexels.com/video/a-man-using-a-bandsaw-in-a-factory-4941369/)                 |

Pexels klipleri [Pexels lisansı](https://www.pexels.com/license/) kapsamında kullanıldı; indirme sayfaları ve görüntüler kontrol edildi. Mixkit'te bulunan bazı uygun sahneler kişisel kullanımla sınırlı olduğu için kullanılmadı. Stok görüntüler Novarampa'nın kendi tesisinde çekilmiş görüntüler olarak etiketlenmedi.

**9. maddenin açık farkı:** Rampa üzerinde gerçek kamera hareketi yerine mevcut ürün fotoğrafına hareket uygulandı. Forklift klibi kamyona yüklemeyi gösteriyor; rampaya tırmanmayı göstermiyor. Diğer dört üretim sahnesi gerçek stok videodur. Birebir rampa/forklift çekimleri geldiğinde ilk iki segment değiştirilebilir. Kullanıcı uygun stokla hazırlanmasını onayladı; bu iki görsel fark saklanmadı.

Kurgu betiği: `scripts/build-hero-video.mjs`. `node scripts/build-hero-video.mjs <ham-klip-klasörü>` komutu sistemdeki FFmpeg'i kullanır; gerekirse `FFMPEG_PATH` ile çalıştırılabilir dosyanın yolu verilir. Girdi adları: `ramp.jpg`, `forklift.mp4`, `welding.mp4`, `grinder.mp4`, `hammer-modern.mp4`, `bandsaw.mp4`. Ham klipler `.playwright-mcp/stock/` içinde; dağıtım dosyaları yalnızca son montaj ve afiştir.

## Yazı tipi

`public/brand/novarampa-baskerville.svg`, Windows'ta kurulu Baskerville Old Face fontunun kalın stiliyle oluşturulmuş NOVARAMPA harf konturlarını içerir. Font dosyası dağıtılmaz. Böylece bu fontun yüklü olmadığı cihazlarda da istenen kelime aynı görünür. H1 erişilebilir metni korunur; Studio'da farklı bir başlık yazılırsa metin normal font yığınıyla gösterilir.

## İl–ilçe verisi

[TurkiyeAPI veri kümeleri](https://docs.turkiyeapi.dev/en/v2/guide/datasets) üzerinden alınan 81 il ve 973 ilçe, `src/lib/turkey-locations.json` içinde çevrimdışı kullanılır. Form çalışırken üçüncü taraf API çağrısı yapılmaz.

- [İller](https://api.turkiyeapi.dev/v2/datasets/provinces.json)
- [İlçeler](https://api.turkiyeapi.dev/v2/datasets/districts.json)
- [Proje / lisans](https://github.com/ubeydeozdmr/turkiye-api)

İl değiştiğinde ilçe seçimi sıfırlanır. Sunucu, ilçenin seçilen ile ait olduğunu ayrıca doğrular.
