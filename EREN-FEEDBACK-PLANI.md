# Nova Rampa — Eren feedback ve ekler planı

## Güncel durum — 9 Eylül 2026

- **32 madde uygulandı ve doğrulandı. 9. madde için montaj hazır; iki sahne farkı nedeniyle birebir tamamlandı olarak işaretlenmedi.**
- Kullanıcı “bitti. şimdi hepsini derle ve implementasyona geç” dedi; 33 maddelik e-posta ve 13 ekran görüntüsünün toplanması tamamlandı.
- Kullanıcı video için “Uygun stok videolarla hazırla” seçimini yaptı.
- Rampa sahnesi mevcut ürün fotoğrafına hareket uygulanarak oluşturuldu. Forklift sahnesi kamyona yükleme gösterir; rampaya tırmanma göstermez. Kaynak, taşlama, çekiç ve şerit testere sahneleri stok videodur.
- Kod ve medya çalışma ağacında hazır. Beş fazla yedek parça CMS'den silindi; Makaslı Platform görünür katalogdan çıkarıldı. Kullanıcı sonraki mesajında push ve deploy işlemlerini yetkilendirdi; hedef `origin/master` ve bağlı Vercel projesidir.
- Kutular uygulama durumunu gösterir. Talep numaraları, görsel notları ve istenen metinler korunur.
- Doğrulama: [EREN-DOGRULAMA.md](docs/EREN-DOGRULAMA.md). Medya ve veri kaynakları: [EREN-MEDYA-KAYNAKLARI.md](docs/EREN-MEDYA-KAYNAKLARI.md).
- Gereksinim cümleleri özgün talep olarak gelecek zamanla bırakıldı; gerçekleşme durumu kutularda ve uygulama kaydındadır.

## Gelen kaynaklar ve ek kaydı

| Kayıt  | Kaynak / ek                                                                                                                                                   | İlgili maddeler                | Durum                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------ |
| E-001  | Eren'in e-posta feedback'i, kullanıcı tarafından metin olarak iletildi                                                                                        | 1–33                           | Aşağıya kaydedildi                                                             |
| EK-001 | Kullanıcının “2.ve 3. madde” notuyla gönderdiği, üst menü ve arama konumu kırmızıyla işaretlenmiş ekran görüntüsü                                             | 2, 3                           | Görsel incelendi; ayrıntılar aşağıya kaydedildi                                |
| EK-002 | Kullanıcının “5.madde” notuyla gönderdiği, dört Atölye görselinin yazılarının kırmızı çarpılarla işaretlendiği ekran görüntüsü                                | 5; 26 için yardımcı bağlam     | Görsel incelendi; ayrıntılar aşağıya kaydedildi                                |
| EK-003 | Kullanıcının “7.10. ve 12. madde” notuyla gönderdiği, Neden Nova Rampa başlığı, sloganı, sevkiyat kartı ve ayırıcı çizginin işaretlendiği ekran görüntüsü     | 7, 10, 12                      | Görsel incelendi; ayrıntılar aşağıya kaydedildi                                |
| EK-004 | Kullanıcının “8.madde” notuyla gönderdiği, giriş videosunun altındaki beyaz şeridin kırmızıyla tarandığı ekran görüntüsü                                      | 8                              | Görsel incelendi; kaplanacak alan aşağıya kaydedildi                           |
| EK-005 | Kullanıcının “14. madde” notuyla gönderdiği, footer üstündeki üç kartın numaralarının ve sağ üst simgelerinin işaretlendiği ekran görüntüsü                   | 14                             | Görsel incelendi; ayrıntılar aşağıya kaydedildi                                |
| EK-006 | Kullanıcının “17. ve 18. madde” notuyla gönderdiği, silinecek beş yedek parça kartı ve Kontrol Panosu açıklamasının işaretlendiği ekran görüntüsü             | 17, 18                         | Beş kart ayırt edildi; korunacak aynı adlı ürün ve kesilen açıklama kaydedildi |
| EK-007 | Kullanıcının “23. madde” notuyla gönderdiği, ürün kartlarının küçük sıra numaraları ve kapasite alanlarının işaretlendiği ekran görüntüsü                     | 23                             | Görsel incelendi; kaldırılacak alanlar kaydedildi                              |
| EK-008 | Kullanıcının “25. madde” notuyla gönderdiği, ürün detayındaki kaldırılacak bölümleri ve özellikler listesinin yeni konumunu gösteren ekran görüntüsü          | 25; 1 ile yerleşim ilişkisi    | Görsel incelendi; taşınacak ve kaldırılacak alanlar kaydedildi                 |
| EK-009 | Kullanıcının “28. madde” notuyla gönderdiği, Referanslar sayfasındaki küçük açıklama ve Öne Çıkan Referanslarımız başlığının çizildiği ekran görüntüsü        | 28                             | Görsel incelendi; tek liste talebiyle eşleştirildi                             |
| EK-010 | Kullanıcının “29.madde” notuyla gönderdiği, Servis sayfasındaki üç adım kartı, Acil Durum kutusu ve form başlığı altı açıklamasının çizildiği ekran görüntüsü | 29                             | Görsel incelendi; form açıklamasının konumu netleşti                           |
| EK-011 | Kullanıcının “31. madde” notuyla gönderdiği, İKS servis formundaki üçlü marka seçimini ve seçili marka için seri numarası alanını gösteren ekran görüntüsü    | 31; 19 ile ortak alan ilişkisi | Görsel incelendi; Nova Rampa seçenekleri ve koşullarıyla eşleştirildi          |
| EK-012 | Kullanıcının “32. madde” notuyla gönderdiği, İletişim sayfasındaki Çalışma Saatleri kutusu ve aynı gün dönüş ifadesinin çizildiği ekran görüntüsü             | 32                             | Görsel incelendi; kaldırılacak kutu ve cümle parçası ayrıştırıldı              |
| EK-013 | Kullanıcının “33. madde” notuyla gönderdiği, teklif sayfasındaki sol bölüm, süre ibaresi, sektör ve ölçü notunun çizildiği ekran görüntüsü                    | 33                             | Görsel incelendi; kaldırılacak alanlar ve formun ortalanması kaydedildi        |

On üç ekran görüntüsü teslim alındı ve incelendi. Görseller bu görüşmedeki eklerdir; ayrı yerel PNG/JPG kopyaları teslim edilmedi. Video kaynağı stok olarak netleşti; yeni kullanıcı eki beklenmiyor.

### EK-001 — üst menü hizası ve arama konumu (2, 3)

- Kaynak: Kullanıcının bu görüşmede “2.ve 3. madde” mesajına eklediği ekran görüntüsü.
- Görsel: 1918 × 367 piksel; tarayıcı adres çubuğunda `novarampa.vercel.app` görünüyor. Bu kayıt gönderilen görüntünün incelemesidir, canlı site kontrolü değildir.
- Dosya durumu: Görsel görüşmede mevcut; yerel dosya yolu verilmedi. Görselin işaretlemeleri burada metin olarak saklandı; yerel görsel kopyası oluşturulmuş sayılmaz.
- **2. madde — işaretlenen grup:** Kırmızı çerçeve, Anasayfa'dan Garanti'ye kadar menü bağlantılarını ve sağdaki Yedek Parça, Teklif Al ve tema düğmesini birlikte kapsıyor. Soldaki kırmızı ok bu gruptan NOVARAMPA logosunun yazısına yöneliyor.
- **2. madde — hedef:** Menü ve sağdaki buton grubu bir bütün olarak yukarı taşınarak logo yazısıyla aynı görsel yatay hizaya getirilecek. Talep yalnızca tek bir menü bağlantısını yukarı almak olarak uygulanmayacak. Kesin piksel değeri verilmemiş; hizalama bu görsel referansla değerlendirilecek.
- **3. madde — işaretlenen konum:** Üstte telefon ve e-postanın bulunduğu ince iletişim şeridinin sağında, `BİZE ULAŞIN →` bağlantısının hemen soluna kırmızı bir arama kutusu çizilmiş. Çizimde büyüteç simgesi ve `arama` yazısı bulunuyor.
- **3. madde — hedef:** Site içi arama kontrolü üst iletişim şeridinde, Bize Ulaşın'ın hemen solunda konumlanacak. Kırmızı kutu ve oklar açıklama işaretleridir; sitenin nihai renk veya çerçeve tasarımı talebi olarak alınmayacak.
- Görsel masaüstü görünümünü gösteriyor. Mobil arama yerleşimi, aramanın açılma biçimi ve sonuç kapsamı bu ekte belirtilmemiş.
- Görselde `Garanti` menü bağlantısının bulunması mevcut görünüm bağlamıdır; bu ek tek başına yeni bir Garanti sayfası oluşturma talebi değildir.
- Durum: Görsel gereksinimleri uygulandı; son doğrulama kayıtları aşağıda.

### EK-002 — Atölye görsellerindeki yazıların kaldırılması (5)

- Kaynak: Kullanıcının bu görüşmede “5.madde” mesajına eklediği ekran görüntüsü; dört görselin sol altındaki yazılar kırmızı çarpılarla işaretlenmiş.
- Dosya durumu: Görsel görüşmede mevcut; yerel dosya yolu verilmedi. İşaretlemelerin açıklaması bu plana kaydedildi.
- **5. madde — kaldırılacaklar:** Dört görselin alt kısmında, görselin üzerine bindirilmiş `01–04` numaraları, `SAHA` etiketleri ve `Atölyeden` yazıları kaldırılacak. Talep sadece kartların dışındaki açıklamalarla sınırlı değil; görsellerin üzerindeki bu yazıları da kapsıyor.
- **5. madde — başlık:** E-postadaki talep gereği görsel grubunun üstüne tek bir `Atölye` bölüm başlığı eklenecek.
- Kırmızı çarpılar kaldırılacak yazıları gösteriyor; fotoğrafların kaldırılması istenmiyor.
- **26. maddeye yardımcı görsel bağlam:** Sol üstte mavi rampa, sağ üstte kamyona uzanan rampa, sol altta forklift/rampa illüstrasyonu, sağ altta forklift kullanan işçinin fotoğrafı var. Üçüncü görsel sol altta küçük, dördüncü görsel sağ altta çok daha uzun. Bu, 26. maddede anılan oran farkını görsel olarak tanımlıyor; kullanıcı bu eki doğrudan 5. madde için gönderdi, yeni hedef ölçüler belirtmedi.
- Durum: Görsel gereksinimleri uygulandı; son doğrulama kayıtları aşağıda.

### EK-003 — Neden Nova Rampa, başlık boyutu ve bölüm ayırıcı (7, 10, 12)

- Kaynak: Kullanıcının “7.10. ve 12. madde” mesajına eklediği, Neden Nova Rampa bölümünün kırmızıyla işaretlenmiş ekran görüntüsü.
- Dosya durumu: Görsel görüşmede mevcut; yerel dosya yolu verilmedi. Görseldeki işaretlemelerin açıklaması bu plana kaydedildi.
- **7. madde — kaldırılacak slogan:** Büyük beyaz `Yirmi yılın getirdiği güven, yeni neslin getirdiği netlik.` cümlesinin tamamı kırmızıyla çizilmiş. E-postadaki “20 yılın getirdiği güven...” ifadesinin hedefi bu iki satırlı metindir.
- **7. madde — kaldırılacak kart:** Soldan üçüncü `Türkiye Geneli Sevkiyat` kartının tamamına çarpı konmuş; simgesi, başlığı ve açıklamasıyla kaldırılacak. Diğer üç kart (CE/TSE/EN 1398, İki Yıl Garanti, Yedek Parça ve Servis) bu kaldırma talebinin dışında; garanti ve servis açıklamaları 16. maddeye göre değişecek.
- **10. madde — büyütülecek başlık:** Sloganın üstündeki küçük turuncu `NEDEN NOVA RAMPA` başlığı kırmızı daireyle işaretlenmiş. Büyük slogan kaldırılırken bu bölüm adı korunup daha büyük puntoyla ana bölüm başlığı haline getirilecek. Görsel 10. maddenin bir örneğidir; e-postadaki tüm ana bölüm başlıklarını büyütme kapsamını daraltmaz. Kesin punto belirtilmemiş.
- **12. madde — kaldırılacak kalınlık:** Bölümün üstündeki ince yatay turuncu ayırıcının merkezindeki kısa, kalın, yuvarlatılmış turuncu parça daire ve çarpıyla işaretlenmiş. İnce ayırıcı çizgi korunacak, merkezindeki kalın parça kaldırılacak. Görselin daha üstünde, menünün altındaki ayrı turuncu çizgi bu işaretlemenin hedefi değil.
- Kırmızı çizimler açıklama işaretleridir; nihai tasarıma eklenmeyecek.
- Durum: Görsel gereksinimleri uygulandı; son doğrulama kayıtları aşağıda.

### EK-004 — giriş videosunun alt boşluğu da kaplaması (8)

- Kaynak: Kullanıcının “8.madde” mesajıyla gönderdiği ana sayfa ekran görüntüsü; giriş videosunun altındaki beyaz şerit kırmızı zikzaklarla taranmış.
- Dosya durumu: Görsel görüşmede mevcut; yerel dosya yolu verilmedi. İşaretleme ve hedef görünüm bu plana metin olarak kaydedildi.
- **Mevcut görünüm:** Üst iletişim şeridi, logo/menü, büyük NOVARAMPA yazısı, slogan ve Teklif Al/WhatsApp butonları video alanında. Video, tarayıcının görünen sayfa alanının alt sınırına ulaşmadan bitiyor; altında bütün genişliğe yayılan beyaz bir boşluk görünüyor.
- **8. madde — hedef:** Girişteki hero/video arka planı kırmızıyla taranan alt şeridi de kaplayacak biçimde uzatılacak. Sayfa ilk açıldığında video, üstteki iletişim şeridi ve menünün arkasından başlayarak görünür sayfa alanının alt kenarına kadar kesintisiz devam edecek; altta bu boş şerit kalmayacak.
- Hedef, tarayıcının web sayfasını gösterdiği görünür alanıdır; ekran görüntüsündeki adres/sekme çubuğu ve Windows görev çubuğu bu alanın dışında.
- Başlık, slogan ve butonlar video üzerinde kalacak. Alan büyürken videonun en/boy oranı korunacak; görüntü esnetilmeyecek. Bu ek kesin piksel yüksekliği veya yeni bir içerik hizası belirtmiyor.
- Bu görsel, e-postada 8. maddede anılan taralı alan referansını tamamlıyor. 9. maddedeki yeni video sahneleri/kurgu ayrı talep; bu ek yeni video dosyası teslimi değil.
- Durum: Görsel gereksinimleri uygulandı; son doğrulama kayıtları aşağıda.

### EK-005 — footer üstündeki üç kartın numaraları ve simgeleri (14)

- Kaynak: Kullanıcının “14. madde” mesajına eklediği ekran görüntüsü; footer'ın hemen üstündeki Teklif Al, Servis Talep ve Yedek Parça kartları işaretlenmiş.
- Dosya durumu: Görsel görüşmede mevcut; yerel dosya yolu verilmedi. İşaretlemeler bu plana metin olarak kaydedildi.
- **Kaldırılacaklar:** Üç kartın sol üstündeki `01`, `02` ve `03` numaralarının her birine kırmızı çarpı konmuş. Numaralandırma üç karttan da kaldırılacak.
- **Büyütülecekler:** Her kartın sağ üstündeki simge kırmızı daireyle işaretlenmiş: Teklif Al'da konuşma balonu, Servis Talep'te anahtar, Yedek Parça'da dişli. Simgeler e-postadaki “bir tık büyüsün” talebine göre biraz büyütülecek; kesin ölçü verilmemiş.
- Kartların kendileri korunacak. Kırmızı çarpılar numaraları, daireler büyütülecek simgeleri gösteriyor; kartların kaldırılması veya kırmızı işaretlerin tasarıma eklenmesi istenmiyor.
- **Açıklamalar:** 14. maddedeki e-posta metinleri esas alınacak. Görsel mevcut durumu gösteriyor; Teklif Al kartındaki `24 saat içinde`, servis kartındaki `saha keşfi` ve yedek parça kartındaki mevcut stok/sevkiyat açıklaması yeni metin talebinin yerine geçmiyor.
- Görsel, e-postadaki ilk açıklamanın tırnak içine alınmış `yazsın` sözcüğüyle ilgili yeni bir metin açıklaması getirmiyor; özgün e-posta kaydı korunuyor.
- Durum: Görsel gereksinimleri uygulandı; son doğrulama kayıtları aşağıda.

### EK-006 — silinecek beş yedek parça ve Kontrol Panosu açıklaması (17, 18)

- Kaynak: Kullanıcının “17. ve 18. madde” mesajıyla gönderdiği `/yedek-parca` sayfası ekran görüntüsü.
- Dosya durumu: Görsel görüşmede mevcut; yerel dosya yolu verilmedi. İşaretlenen kartlar ve metin alanı bu plana kaydedildi.
- **17. madde — silinecek beş kart:** Aşağıdaki kartların üzerine kırmızı çarpı konmuş.

| Kart           | Görselde ayırt edici konum / özellik                                                              |
| -------------- | ------------------------------------------------------------------------------------------------- |
| Rampa Takozu   | Sağ sütundaki görselsiz, uzun ve büyük ölçüde boş kart; yalnız başlık ve STOKTA etiketi görünüyor |
| Lastik Flap    | Bir alt sırada, sol sütunda bulunan görselsiz kart                                                |
| Kapı Contası   | Aynı alt sırada, orta sütunda bulunan görselsiz kart                                              |
| Çarpma Tamponu | Aynı alt sırada, sağ sütunda bulunan görselsiz kart                                               |
| Köşe Koruyucu  | En altta, sol sütunda bulunan görselsiz kart                                                      |

- **Korunacak aynı adlı ürün:** Orta sütundaki fotoğraflı `Rampa Takozu` kartı çarpıyla işaretlenmemiş; ürün açıklaması ve uyumlu ürün etiketleri var. Bu kart korunacak. Adı Rampa Takozu olan bütün kayıtları silmek talebi karşılamaz; silinecek olan sağdaki görselsiz ek karttır.
- Eren'in düzenlediği ürünler korunacak. Bu beş kartın kod içindeki varsayılan içerikten mi yoksa CMS kayıtlarından mı geldiği uygulamada doğrulanacak; ekran görüntüsü tek başına veri kaynağını veya kayıt ID'lerini göstermiyor.
- **18. madde — genişletilecek açıklama:** Sol sütundaki fotoğraflı `Kontrol Panosu` kartının başlığı ve altındaki açıklama kırmızıyla çevrelenmiş. Açıklama birkaç satır sonra `...` ile kesiliyor.
- Kontrol Panosu kartı silinmeyecek. E-postadaki “Devamını oku” benzeri kontrolle açıklamanın tamamı erişilebilir hale getirilecek; fotoğraf ve uyumlu ürün bilgileri korunacak.
- Ekran görüntüsünde kesilen devam metni görünmüyor; tam açıklama uydurulmayacak, uygulamada mevcut içerik kaynağından alınacak.
- Durum: Görsel gereksinimleri uygulandı; son doğrulama kayıtları aşağıda.

### EK-007 — ürün kartlarındaki numara ve kapasite alanları (23)

- Kaynak: Kullanıcının “23. madde” mesajıyla gönderdiği Ürünler sayfası ekran görüntüsü; Seyyar / Mobil Yükleme Rampası, Dik Rampa ve Menteşeli Rampa kartları görünüyor.
- Dosya durumu: Görsel görüşmede mevcut; yerel dosya yolu verilmedi. İşaretlenen alanlar bu plana metin olarak kaydedildi.
- **Kaldırılacak numaralandırma:** Üç kartta da görselin altında, ürün adının üstündeki küçük sıra numarası kırmızıyla çizilmiş. Ürün kartlarındaki bu numaralandırma kaldırılacak.
- **Kaldırılacak kapasite alanı:** Dik Rampa ve Menteşeli Rampa kartlarının altındaki `KAPASİTE` başlığı ve tonaj etiketleri kırmızı çarpılarla işaretlenmiş. Başlık ve tonaj etiketlerinin tamamı kaldırılacak; sadece bazı ton değerleri silinmeyecek.
- Seyyar / Mobil Yükleme Rampası kartında bu görüntüde kapasite alanı görünmüyor. E-postadaki talep Ürünler sayfasındaki tüm kartları kapsıyor; yalnızca bu üç örnekle sınırlı değil.
- Kartların ürün fotoğrafları, adları, açıklamaları ve sağdaki detay bağlantısı okları bu kaldırma talebinin dışında. Görsel boyutu ve hover çerçevesiyle ilgili 22. madde ayrıca geçerli.
- Bu ek kartlardaki bilgilerin gösterimini kaldırma referansıdır; ürünlerin kendilerini veya CMS'deki teknik kapasite verilerini silme talebi olarak genişletilmeyecek. Ürün detayındaki kutucuklar 25. maddede ayrıca ele alınıyor.
- Durum: Görsel gereksinimleri uygulandı; son doğrulama kayıtları aşağıda.

### EK-008 — ürün detayının sadeleştirilmesi ve özelliklerin taşınması (25)

- Kaynak: Kullanıcının “25. madde” mesajıyla gönderdiği Menteşeli Rampa ürün detay sayfası ekran görüntüsü.
- Dosya durumu: Görsel görüşmede mevcut; yerel dosya yolu verilmedi. Kırmızı işaretler ve hedef yerleşim bu plana kaydedildi.
- **Taşınacak bölüm:** Sol alttaki `ÖNE ÇIKAN ÖZELLİKLER` başlığı daireye alınmış; buradan çıkan ok, üstte `Bu ürün için teklif al` ve `WhatsApp'tan sor` butonlarının hemen altındaki boşluğu gösteriyor. Başlık ve özellik maddeleri birlikte, sol içerik sütununda bu buton satırının hemen altına taşınacak; özellik listesi kaldırılmayacak.
- **Kaldırılacak ibare:** Öne çıkan özellikler başlığının altındaki `Sahanın istediği şekilde.` cümlesi ayrı olarak çizilmiş; bu alt başlık taşınmayacak, kaldırılacak.
- **Kaldırılacak üç kart:** `KAPASİTE (TAŞIMA)`, `STANDART ÖLÇÜ` ve `SERTİFİKALAR` kartlarının tamamının üzerine büyük bir çarpı konmuş. Kartlar, içlerindeki değer/etiket/açıklamalarla birlikte ürün detay görünümünden kaldırılacak.
- **Kaldırılacak sektör alanı:** Sağ alttaki `UYGUN SEKTÖRLER` alanı çarpıyla işaretlenmiş. Bölüm etiketi, `Kimler tercih ediyor?` başlığı ve sektör listesi birlikte kaldırılacak.
- Üstteki ürün görseli, teklif ve WhatsApp butonları bu kaldırma talebinin dışında. Bu ek bir ürün üzerinden örnek gösteriyor; e-postadaki ürün detay sayfaları kapsamı korunuyor.
- **1. maddeyle ilişki:** Bu üç kartın kaldırılması, 1. maddede konumu tarif edilen teknik detay maddelerini veya ortak tasarım notunu kaldırma talebi değil. Özellikler buton altına taşınırken teknik detay → ortak not → benzer ürünler konum ilişkisi ayrıca korunacak.
- Durum: Görsel gereksinimleri uygulandı; son doğrulama kayıtları aşağıda.

### EK-009 — Referanslar sayfasındaki açıklama ve gruplamanın kaldırılması (28)

- Kaynak: Kullanıcının “28. madde” mesajıyla gönderdiği `/referanslar` sayfası ekran görüntüsü.
- Dosya durumu: Görsel görüşmede mevcut; yerel dosya yolu verilmedi. İşaretlenen alanlar bu plana kaydedildi.
- **Kaldırılacak küçük açıklama:** Büyük `Türkiye'nin yükünü taşıyan firmalar, bizi tercih ediyor.` başlığının hemen altındaki, `Yüzlerce proje...` ile başlayan ve `firmalardan bazıları.` ile biten iki satırlı gri açıklama kırmızıyla çizilmiş.
- **Kaldırılacak grup başlığı:** Kartların hemen üzerindeki `Öne Çıkan Referanslarımız` başlığı ayrıca çizilmiş. E-postaya göre `Diğer Referanslar` ayrımı da kaldırılacak ve bütün firmalar tek bir listede birlikte gösterilecek; ikinci grup bu ekran görüntüsünün görünen kısmında yer almıyor.
- Firma kartları silinmeyecek. Görüntüde Arçelik, Eczacıbaşı, Hayat Kimya ve Mars Lojistik kartları görünüyor; tek liste yalnızca bu örnek firmalarla sınırlı değil, tüm referansları kapsayacak.
- Büyük ana başlık bu görselde çizilmemiş; 28. madde kapsamında kaldırılacak metin olarak yorumlanmayacak. İç sayfa başlıklarının boyutu ve hizası için 20. madde ayrıca geçerli.
- **Ana sayfayı koruma:** Bu düzenleme Referanslar sayfasındaki gruplamayla ilgili. Ana sayfadaki mevcut Referanslarımız alanı e-postadaki açık talep gereği korunacak; başlığının font/boyut düzenlemesi 11. maddeye göre ele alınacak.
- Durum: Görsel gereksinimleri uygulandı; son doğrulama kayıtları aşağıda.

### EK-010 — Servis sayfasındaki adım kartları, acil durum kutusu ve form açıklaması (29)

- Kaynak: Kullanıcının “29.madde” mesajıyla gönderdiği `/servis` sayfası ekran görüntüsü.
- Dosya durumu: Görsel görüşmede mevcut; yerel dosya yolu verilmedi. İşaretlenen alanlar bu plana kaydedildi.
- **Kaldırılacak adım kartları:** `01. Arızayı Tarif Edin`, `02. Ekibimiz Sizi Arasın` ve `03. Servis Planlansın` kartlarının üçünü birden kapsayan kırmızı çarpı var. Yalnızca numaralar değil, simge, başlık ve açıklamalarıyla üç kartın tamamı kaldırılacak.
- **Kaldırılacak acil durum alanı:** Formun sağındaki `ACİL DURUM` kutusunun tamamı çarpıyla işaretlenmiş. `Üretim durduysa direkt arayın.` başlığı, telefon bağlantısı ve `WhatsApp + Foto Gönder` butonu bu kutuyla birlikte kaldırılacak.
- **Form açıklamasının konumu netleşti:** Çizilen cümle form bittikten sonra değil, form kutusunun içinde `Servis Talep Formu` başlığının hemen altında ve ilk giriş alanlarının üstünde yer alıyor. `Bilgilerinizi paylaşın, uygun ilk fırsatta dönüş yapalım.` açıklaması kaldırılacak. E-postadaki “Servis talep formunun altındaki cümle” ifadesinin görselde işaretlenen karşılığı bu başlık altı açıklaması.
- `Servis Talep Formu` başlığı ve formun kendisi korunacak. Form alanlarıyla ilgili 31. madde ayrıca geçerli.
- E-postadaki yeni sayfa başlığı `rampanız susmasın, üretiminiz durmasın.` ve açıklama `Servis talepleriniz için formu doldurmanız yeterli. Ekibimiz en kısa zamanda dönüş sağlayacaktır.` talepleri geçerli; ekran görüntüsündeki eski başlık ve üst açıklama yeni metinlerin yerine kullanılmayacak.
- Durum: Görsel gereksinimleri uygulandı; son doğrulama kayıtları aşağıda.

### EK-011 — servis formunda marka seçimi ve koşullu seri numarası alanı (31)

- Kaynak: Kullanıcının “31. madde” mesajıyla gönderdiği `servis.iksyapi.com.tr/talep/` ekran görüntüsü. Bu kayıt gönderilen görsele dayanıyor; referans sitede canlı etkileşim yapılmadı.
- Dosya durumu: Görsel görüşmede mevcut; yerel dosya yolu verilmedi. Form görünümü ve e-postayla ilişkisi bu plana kaydedildi.
- **Görseldeki örnek:** İKS formunun `Kapı Bilgisi` adımında marka sorusu, yan yana üç çerçeveli radyo seçeneğiyle sunuluyor. İlk seçenek seçili ve altında `Ürün / Seri Numarası` alanı açık. Seçili seçenek renkli kenarlık ve dolu radyo işaretiyle ayırt ediliyor.
- **Nova Rampa'ya aktarılacak soru:** `Ürün markası Novarampa mı?`
- **Seçenek ve alan davranışları:** E-postadaki adlar ve koşullar esas alınacak.

| Seçenek               | Gösterilecek alan / davranış                                                                                      | Kaynak                                                                             |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Evet, Novarampa ürünü | Ürün Seri No                                                                                                      | E-posta koşulu; görsel seçili marka + seri numarası yerleşimini örnekliyor         |
| Hayır, farklı marka   | Hangi marka olduğunu belirtiniz                                                                                   | E-postada açıkça isteniyor; bu seçeneğin açılmış hali görselde gösterilmiyor       |
| Bilmiyorum.           | Seri numarası veya marka adı için ek alan istenmedi; iki koşullu alanın kapalı olması beklenen uygulama davranışı | E-postadaki iki koşuldan çıkarım; bu seçeneğin açılmış hali görselde gösterilmiyor |

- Görseldeki İKS marka adı Nova Rampa'ya taşınmayacak; yukarıdaki özgün e-posta metinleri kullanılacak.
- Görsel, marka seçiminin görünümüne ve koşullu alana referans. Beş adımlı form akışı, `Kapı Bilgisi` başlığı, Geri/Devam düğmeleri veya İKS renkleri bu ekle ayrıca talep edilmiş sayılmayacak.
- Referans seri numarası alanının yer tutucusunda `opsiyonel` yazıyor. E-postada Nova Rampa formundaki zorunluluk ve varsayılan seçili seçenek belirtilmedi; referansın ilk seçeneğinin seçili olması kullanıcı adına otomatik başlangıç tercihi olarak kabul edilmeyecek.
- **İl/ilçe:** 31. maddenin il ve ilçe seçenekleri talebi geçerli; bu ekran görüntüsü konum alanlarını göstermiyor.
- **19. maddeyle ilişki:** Servis formunun yeni alanları, ayrı yedek parça formundaki ortak alanlar ve parça seçimiyle birlikte değerlendirilecek; bu ek tek başına yeni bir form adımı veya yeni kapsam eklemiyor.
- Durum: Görsel gereksinimleri uygulandı; son doğrulama kayıtları aşağıda.

### EK-012 — İletişim sayfasındaki çalışma saatleri ve aynı gün dönüş ifadesi (32)

- Kaynak: Kullanıcının “32. madde” mesajıyla gönderdiği İletişim sayfası ekran görüntüsü.
- Dosya durumu: Görsel görüşmede mevcut; yerel dosya yolu verilmedi. İşaretlemeler bu plana kaydedildi.
- **Kaldırılacak çalışma saatleri alanı:** `ÇALIŞMA SAATLERİ` etiketi, `Bizden bir cevap ne zaman beklemelisiniz?` başlığı ve Pazartesi–Cuma / Cumartesi / Pazar saat kartlarını kapsayan kutunun üzerine büyük kırmızı çarpı konmuş. Kutunun tamamı kaldırılacak; yalnızca saat değerleri silinmeyecek.
- Bu, İletişim sayfasındaki kutunun kaldırılması talebi. Şirketin çalışma saatleri verisini veya sitenin diğer yerlerindeki saat bilgilerini topluca silme talebi olarak genişletilmeyecek.
- **Kısaltılacak teklif çağrısı açıklaması:** Alt kutuda `Online teklif formunu doldurun, ekibimiz aynı gün size dönsün.` cümlesinin yalnızca `ekibimiz aynı gün size dönsün` kısmı çizilmiş. Kalan cümle noktalaması tamamlanarak `Online teklif formunu doldurun.` olacak.
- Alt kutunun `Detaylı bilgi almak ister misiniz?` başlığı ile `Teklif Formu` ve `WhatsApp` butonları çizilmemiş; korunacak.
- E-postadaki `bir telefon kadar yakın` cümlesinin kaldırılması ve yeni sayfa açıklaması talebi geçerli; sayfanın o üst bölümü bu görüntüde görünmüyor. Görsel, 32. maddenin kapsamını yalnızca görünen iki alana daraltmıyor.
- Durum: Görsel gereksinimleri uygulandı; son doğrulama kayıtları aşağıda.

### EK-013 — teklif sayfasındaki sol bölüm ve form alanlarının sadeleştirilmesi (33)

- Kaynak: Kullanıcının “33. madde” mesajıyla gönderdiği `/teklif-al` sayfasının açık tema ekran görüntüsü.
- Dosya durumu: Görsel görüşmede mevcut; yerel dosya yolu verilmedi. İşaretlenen alanlar bu plana kaydedildi.
- **Kaldırılacak sol bölüm:** `Neden bizden teklif almalısınız?` başlığı, alt açıklaması ve dört fayda maddesi büyük kırmızı çarpıyla birlikte işaretlenmiş. `Aynı gün dönüş`, `Belgeli üretim, 2 yıl garanti`, `Sahanıza özel tasarım` ve `Teslim sonrası destek` içeriklerini kapsayan sol bölüm tamamen kaldırılacak.
- **Form yerleşimi:** Sol bölüm kaldırıldıktan sonra teklif formu e-postadaki talebe göre sayfada ortalanacak; mevcut sağ sütun konumunda bırakılmayacak.
- **Süre ibaresi:** Formun üstündeki `TEKLİF FORMU · ~ 2 DAKİKA` satırında süre kısmı çizilmiş. `2 dakika` ifadesi ve buna bağlı ayraç kaldırılacak; `Teklif Formu` etiketi korunacak.
- **Kaldırılacak form alanları:** `Sektör` etiketi ve seçicisi kırmızı çarpıyla, `Ölçü Notu` etiketi ve giriş alanı kırmızı çizgilerle işaretlenmiş. İki alan da etiketleri ve kontrolleriyle birlikte kaldırılacak.
- `Bilgilerinizi paylaşın` başlığı, zorunlu alan açıklaması ve işaretlenmemiş form alanları korunacak. Özellikle `Kapasite` alanı bu görselde çizilmemiş; 23 ve 25. maddelerde ürün kartlarından kapasite bilgisinin kaldırılması, teklif formundaki kapasite alanını kaldırma talebi değil.
- E-postadaki yeni sayfa başlığı `Projenize uygun rampayı birlikte seçelim`, alt metin `aşağıdaki formu doldurunuz` ve `Telefonla daha hızlı` kutusunun kaldırılması talepleri geçerli; bu ekran görüntüsü bunların tamamını göstermiyor.
- Görsel açık temada alınmış; bu ek tek başına sitenin varsayılan temasını değiştirme talebi değil.
- Durum: Görsel gereksinimleri uygulandı; son doğrulama kayıtları aşağıda.

## E-posta talepleri — özgün sıra

- [x] **1. Ürün detayındaki ortak notun konumu**

  Ürün detay sayfasındaki "araç tipi, forklift özellikleri, kot farkı vesaire gibi faktörler rampa tasarımında belirleyici rol oynar." notu, teknik detay maddelerinin altında, benzer ürünlerin üstünde konumlansın.

- [x] **2. Üst menü hizası**

  Giriş sayfasında başlıklar satırı yukarı yanaşsın, logo ile hizalı olsun.

  Görsel referans: **EK-001**. Menü bağlantıları ile sağdaki Yedek Parça, Teklif Al ve tema düğmesi birlikte yukarı alınarak logo yazısıyla hizalanacak.

- [x] **3. Site içi arama**

  Tepedeki bize ulaşın butonunun soluna bir site içi arama butonu eklensin.

  Görsel referans: **EK-001**. Arama, üst iletişim şeridinde Bize Ulaşın'ın hemen soluna yerleşecek; çizimde büyüteç ve `arama` etiketi var.

- [x] **4. NOVARAMPA başlığının fontu**

  Giriş sayfasındaki büyük NOVARAMPA yazısının yazı tipi "kalın Baskerville Old Face" olsun.

- [x] **5. Atölye başlığı ve görsel altı yazılar**

  Giriş sayfasında görsellerin olduğu bölüme "Atölye" başlığı eklensin. Görsellerin altındaki yazılar kaldırılsın.

  Görsel referans: **EK-002**. Dört görselin üzerine bindirilmiş numara/SAHA etiketleri ve Atölyeden yazıları kaldırılacak; fotoğraflar korunacak, görsel grubunun üstünde tek bir Atölye başlığı olacak.

- [x] **6. SSS bölümünün geri eklenmesi**

  "SSS" bölümü kaldırılmış. Referanslarımızın altına yeniden "SSS" bölümü eklensin.

- [x] **7. Neden Novarampa bölümünden kaldırılacaklar**

  "Neden Novarampa" bölümünden "20 yılın getirdiği güven..." ile başlayan cümle kaldırılsın ve "Türkiye geneli sevkiyat" yazan kutucuk kaldırılsın.

  Görsel referans: **EK-003**. Çizilen tam slogan `Yirmi yılın getirdiği güven, yeni neslin getirdiği netlik.`; kaldırılacak kart soldan üçüncü Türkiye Geneli Sevkiyat kartının tamamı. Neden Nova Rampa bölüm adı ve diğer üç kart korunuyor.

- [x] **8. Giriş animasyonunun ekranı kaplaması**

  Giriş sayfasındaki animasyon ekranı kaplasın. (Ekran görüntüsünde paylaştığım taralı alanı da kapatsın.)

  Görsel referans: **EK-004**. Kırmızıyla taranan alan videonun altında kalan beyaz şerit. Hero/video, görünen web sayfası alanının alt kenarına kadar uzanıp bu boşluğu kaplayacak; tarayıcı araç çubuğu ve işletim sistemi görev çubuğu hedef alana dahil değil.

- [ ] **9. Ana sayfa arka plan videosu**

  Ana sayfa arka plandaki video şu şekilde olsun; rampa üzerinde ilerleyen yakın kadraj birkaç saniyelik bir görüntü, rampaya tırmanan bir forkliftin birkaç saniyelik görüntüsü, kaynak yapan işçilerin olduğu yakın kadraj birkaç saniyelik görüntü, spiral taşlama yapan, çekiç sallayan, şerit testerede çalışan işçilerin birkaç saniyelik görüntüsü kullanılarak oluşturulacak kesintisiz bir loop olsun.(gunoziplik.com sitesindeki ana sayfa videosu tadında bir şey olsun istiyorum mümkünse)

- [x] **10. Ana bölüm başlıklarının boyutu**

  Giriş sayfasındaki ana bölüm başlıkları daha büyük puntoyla yazılsın.

  Görsel referans: **EK-003**. Küçük turuncu `NEDEN NOVA RAMPA` başlığı daireyle işaretlenmiş; büyütülmesi istenen bölüm başlığına somut örnek. Tüm ana bölüm başlıklarını kapsayan özgün talep geçerli.

- [x] **11. Referanslarımız başlığının tutarlılığı**

  Referanslarımız başlığı da diğerleriyle aynı yazı tipinde ve büyüklüğünde olsun.

- [x] **12. Bölüm ayırıcı turuncu çizgi**

  Ana sayfada bölümleri ayıran turuncu çizginin ortası kalın olmasın.

  Görsel referans: **EK-003**. İnce ayırıcının ortasındaki kısa, kalın turuncu parça işaretlenmiş; bu parça kaldırılıp ince çizgi korunacak.

- [x] **13. Ana sayfa teklif çağrısı**

  "Projeniz için doğru rampayı birlikte seçelim" yazan cümlenin puntosu küçülsün. Altındaki açıklamada "birkaç dakikanızı ayırarak teklif formunu doldurun ve ihtiyacınıza özel teklif alın. Detaylar için formu doldurduktan sonra WhatsApp'tan iletişime geçebilirsiniz." yazsın.

- [x] **14. Footer üstündeki üç kutucuk**

  Footer'ın üstündeki "teklif al", "servis talep" ve "yedek parça" kutucuklarından numaralandırma kaldırılsın. Kutucukların sağ üstündeki semboller bir tık büyüsün. "Teklif al" kutucuğundaki açıklamada "Projeniz için ihtiyacınıza özel teklif alın yazsın." "Servis talep" kutucuğundaki açıklamada "Mevcut rampanız için bakım veya onarım teklifi alın." yazsın. "Yedek parça" kutucuğundaki açıklamada "Tüm Novarampa ürünleri ve diğer uyumlu modeller için yedek parça desteği alın." yazsın.

  Görsel referans: **EK-005**. Kartların sol üstündeki 01/02/03 numaraları kaldırılacak; sağ üstteki konuşma balonu, anahtar ve dişli simgeleri biraz büyütülecek. Görseldeki mevcut açıklamalar yerine bu maddedeki e-posta metinleri uygulanacak.

- [x] **15. Makaslı platform içeriklerinin kaldırılması**

  Makaslı platform içerikleri siteden komple kaldırılsın.

- [x] **16. Garanti ve servis kutucuklarının metinleri**

  "Neden Novarampa" bölümündeki "iki yıl garanti" kutucuğunun açıklamasında "Tüm Novarampa ürünleri imalat hatalarına karşı 2 yıl garanti altındadır." yazsın. "Yedek parça ve servis" kutucuğunda "Saha ekipleri ve yedek parça stoğu ile uzun ömürlü kullanım sunar." yazsın.

- [x] **17. Yedek parçadaki silinemeyen beş ürün**

  Yedek parçada benim düzenlediklerim hariç 5 ürün daha listeleniyor, silemiyorum. Silinsin!

  Görsel referans: **EK-006**. Silinecekler: sağdaki görselsiz Rampa Takozu, Lastik Flap, Kapı Contası, Çarpma Tamponu ve Köşe Koruyucu kartları. Ortadaki fotoğraflı Rampa Takozu kartı ve Eren'in düzenlediği diğer ürünler korunacak; aynı ada göre toplu silme yapılmayacak.

- [x] **18. Yedek parça açıklamasını genişletme**

  Yedek parçada "kontrol panosu" ürün açıklamasının hepsi görünmüyor. "Devamını oku" gibi bir buton eklensin.

  Görsel referans: **EK-006**. Kontrol Panosu kartındaki birkaç satır sonra üç noktayla kesilen açıklama kırmızıyla çevrelenmiş. Kart korunacak; mevcut tam açıklama Devamını oku benzeri bir kontrolle açılacak.

- [x] **19. Ayrı yedek parça talep formu**

  Yedek parça sayfasında "parça talep formu" butonuna tıklayınca "servis talep" sayfasına gidiyor. Gitmesin. Bu buton için ayrı bir "yedek parça talep formu" oluşturulsun; Servis talep formuyla aynı olsun, sadece ek olarak müşteri rampa tipi seçebildiği gibi hangi yedek parçayı talep ettiğini de seçebilsin. "Tercih edilen tarih" kaldırılsın.

- [x] **20. İç sayfa başlıklarının boyutu ve hizası**

  Ana başlıkların detay sayfalarında sayfa başlığı daha büyük puntoyla yazılsın ve sayfayı ortalasın.

- [x] **21. Ürünler sayfasının başlığı ve açıklaması**

  Ürünler sayfasında "Her yüke bir çözüm..." yazsın. Açıklamada "Yükünüz ağır, biliyoruz. Gelin pratik rampa çözümlerimizden ihtiyacınıza yönelik olanı belirleyelim ve yükünüzü birlikte hafifletelim. Bizim için her teslimat, sizinle büyüyen bir ortaklık demek" yazsın.

- [x] **22. Ürün görselleri ve hover çerçevesi**

  Ürünler sayfasındaki ve ana sayfadaki ürün görselleri biraz daha büyük olsun (Özellikle ana sayfadakiler çok küçük) ve imleç kutucuk üzerine geldiğinde beliren turuncu çerçeve biraz daha belirgin olsun.

- [x] **23. Ürün kartlarından kaldırılacak bilgiler**

  Ürünler sayfasındaki kutucuklardan numaralandırma ve kapasite bilgisi kaldırılsın.

  Görsel referans: **EK-007**. Görsel altı/ürün adı üstündeki küçük sıra numaraları ile kartların altındaki KAPASİTE başlığı ve tüm tonaj etiketleri kaldırılacak. Talep Ürünler sayfasındaki bütün kartlara uygulanacak; ürünlerin kendileri silinmeyecek.

- [x] **24. Studio vitrin cümlesinin karakter sınırı**

  Stüdyodan ürünlerin vitrin cümlesini düzenleyemiyorum, 150 karakter ile sınırlandırılmış. Karakter sınırı olmasın.

- [x] **25. Ürün detay sayfasının sadeleştirilmesi**

  Ürün detay sayfasında "uygun sektörler" kısmı kaldırılsın. "Kapasite", "standart ölçü" ve "sertifikalar" kutucukları kaldırılsın. "Öne çıkan özellikler", "bu ürün için teklif al" butonunun hemen altında listelensin. "Sahanın istediği şekilde" ibaresi kaldırılsın.

  Görsel referans: **EK-008**. Ok, Öne çıkan özellikler başlığı ve listesinin sol sütunda teklif/WhatsApp buton satırının hemen altına taşınacağını gösteriyor. Sahanın istediği şekilde ibaresi, üç teknik özet kartı ve Uygun sektörler alanı (Kimler tercih ediyor? başlığı ve liste dahil) kaldırılacak.

- [x] **26. Atölye fotoğraflarının oranları**

  Ana sayfa Atölye bölümündeki fotoğraflar biraz daha orantılı olsun. Mesela 4. foto gereksiz derecede büyük, yanında 3. foto çok küçük kalıyor. Asimetri abartılı değil tadında olsun.

- [x] **27. Hakkımızda sayfası ve birebir kullanılacak metin**

  Hakkımızda sayfasındaki "Hızlı bilgi" kutucuğu kaldırılsın. "Köklü ustalığın yeni nesil adı" yazısı kaldırılsın, onun yerine "Geçmişin gücüyle, yükünüzü hafifletiyoruz." yazısı gelsin. "Değerlerimiz" bölümü komple kaldırılsın. Hakkımızda metni, noktasına virgülüne kadar hiçbir şey değişmeden, aktardığım gibi yazılsın ve sayfayı ortalasın. Metin şu şekilde;

  Aşağıdaki blok, içerik için birebir kaynak metindir. İkinci paragrafta `her montajda  verilen` ifadesinde iki boşluk vardır; üçüncü paragraftaki `yolcuğu` ve son paragraftaki `daha verimli, ve` dahil metin düzeltilmez.

```text
NOVARAMPA, 2003 yılından bu yana elde edilen mesleki birikim ve ustalığın üzerine inşa edilmiş yeni nesil bir vizyonun adıdır.

NOVARAMPA’nın temelleri yıllar evvel Dinamik Mühendislik çatısı altında atıldı. Sahada kazanılan tecrübe, her montajda  verilen emek, atölyenin sesi, demirin kokusu, bu mesleği bizim için sadece bir iş olmaktan çıkarıp bir tutkuya dönüştürdü ve anladık ki bu sadece devam ettirilecek bir iş değil, daha ileri taşınması gereken bir yolculuktu.

İşte NOVARAMPA tam olarak bu noktada doğdu. “NOVA” yeniliği temsil eder, “RAMPA” ise yolun başladığı yeri, köklerimizi ve yıllardır değişmeyen işimizi… İkinci kuşak bir devamlılığın ötesinde; sürekli gelişen, kendini yenileyen ve sektöre değer katan bir marka olmak gayesiyle bu yolcuğu daha ileri taşımaya gayret ediyoruz.

Misyonumuz, bu köklü birikimi ihtiyaç duyulan her yere ulaştırmak, geçmişin deneyimini geleceğin ihtiyaçlarıyla buluşturmak ve her projede daha sağlam, daha verimli, ve sürdürülebilir çözümler üretmektir. Müşterilerimize sadece bir ürün sağlamayı değil, uzun vadeli çözümlerle katkıda bulunmayı hedefliyoruz. Bizim için her teslimat, sizinle büyüyen bir ortaklık demek.
```

- [x] **28. Referanslar sayfasının tek liste olması**

  "Referanslar" sayfasındaki küçük puntolu cümle kaldırılacak. "Öne çıkan referanslarımız" ve "diğer referanslar" ayrımı olmayacak. Bütün firmalar beraber listelenecek. (Ana sayfada şu an mevcut olan "referanslarımız" kısmı korunacak!)

  Görsel referans: **EK-009**. Ana başlık altındaki iki satırlı gri açıklama ve Öne Çıkan Referanslarımız grup başlığı çizilmiş. Firma kartları korunarak tüm referanslar tek listede gösterilecek; ana sayfadaki referanslar alanı korunacak.

- [x] **29. Servis sayfasının metin ve düzeni**

  Servis sayfasında "rampanıza bir göz atalım" cümlesi yerine "yedek parça" sayfasındaki gibi "rampanız susmasın, üretiminiz durmasın." yazsın. Altındaki cümlede "Servis talepleriniz için formu doldurmanız yeterli. Ekibimiz en kısa zamanda dönüş sağlayacaktır." yazsın. 1-2-3 nolu kutucuklar ve "acil durum" kutucuğu kaldırılsın. Servis talep formunun altındaki cümle kaldırılsın.

  Görsel referans: **EK-010**. Üç adım kartı ve sağdaki Acil Durum kutusu tamamen kaldırılacak. Çizilen form açıklaması, Servis Talep Formu başlığının hemen altındaki `Bilgilerinizi paylaşın, uygun ilk fırsatta dönüş yapalım.` cümlesi; formun kendisi ve başlığı korunacak.

- [x] **30. Blog sayfasının başlığı ve alt metni**

  Blog sayfasında "sahanın diliyle rampa rehberi" yerine "İşinizi kolaylaştıracak rampa rehberi" yazsın. Alt metinde "Rampa seçiminde işinizi kolaylaştıracak 7 temel soruyu cevaplandırıyoruz." yazsın.

- [x] **31. Servis formunda il/ilçe ve koşullu marka alanları**

  Servis talep formunda il ve ilçe seçenekleri olsun. İKS yapı sitesindeki gibi marka seçimi olsun (https://servis.iksyapi.com.tr/talep/) "Ürün markası Novarampa mı?" diye sorulsun, seçenekler "Evet, Novarampa ürünü", "Hayır, farklı marka" ve "Bilmiyorum." olsun. "Evet" seçilirse "Ürün Seri No" sorulsun, "Farklı marka" seçilirse "Hangi marka olduğunu belirtiniz" yazan bir kutucuk çıksın, müşteri doldursun.

  Görsel referans: **EK-011**. Marka sorusu üç çerçeveli radyo seçeneğiyle sunulacak; Evet için seri numarası, Farklı marka için marka adı alanı gösterilecek. Görselde yalnızca ilk seçeneğin açık hali var. İKS'nin beş adımlı form yapısı ayrıca talep edilmiş sayılmayacak; il/ilçe talebi geçerli.

- [x] **32. İletişim sayfasının sadeleştirilmesi**

  "İletişim" sayfasından "bir telefon kadar yakın" cümlesi kaldırılsın. Açıklama olarak "ihtiyacınıza uygun rampa modelini birlikte seçelim. WhatsApp, e-posta veya teklif formundan ulaşabilirsiniz" yazsın. "Çalışma saatleri" başlıklı kutucuk kaldırılsın. "Ekibimiz aynı gün size dönsün" ibaresi kaldırılsın.

  Görsel referans: **EK-012**. Çalışma Saatleri kutusu, başlığı ve üç gün/saat kartıyla birlikte kaldırılacak. Alt teklif çağrısında yalnızca `ekibimiz aynı gün size dönsün` bölümü çıkarılacak; `Online teklif formunu doldurun.` cümlesi, Detaylı bilgi almak ister misiniz? başlığı ve iki iletişim butonu korunacak.

- [x] **33. Teklif sayfası ve formunun sadeleştirilmesi**

  Teklif sayfasında "Projenize uygun rampayı birlikte seçelim" yazsın. Altında "aşağıdaki formu doldurunuz" yazsın. "Neden bizden teklif almalısınız" yazan bölüm kaldırılsın. Teklif formu sayfayı ortalasın ve "2 dakika" ibaresi kaldırılsın. Teklif formundan ölçü notu ve sektör seçeneği kaldırılsın. "Telefonla daha hızlı" kutucuğu kaldırılsın.

  Görsel referans: **EK-013**. Soldaki Neden bizden teklif almalısınız bölümü açıklama ve dört fayda maddesiyle kaldırılacak, form ortalanacak. Üstteki süre ibaresi, Sektör ve Ölçü Notu alanları çıkarılacak. İşaretlenmemiş Kapasite alanı ve form başlığı korunacak.

## Eklerle netleşen uygulama kararları

| Konu                 | Sonuç                                                                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Menü ve arama        | Menü ve sağ kontrol grubu logo yazısına yükseltildi. Arama üst şeritte Bize Ulaşın'ın solunda; mobilde simge ve ayrı sonuç sayfası.                                 |
| Hero                 | 100svh tam ekran; 19,2 saniyelik sessiz döngü ve duraklatma düğmesi. 9. maddedeki iki sahne farkı açık tutuldu.                                                     |
| Baskerville Old Face | Kalın fonttan NOVARAMPA harf konturları oluşturuldu; font dosyasını dağıtmadan her cihazda aynı kelime görünümü.                                                    |
| Beş fazla parça      | Görselsiz Rampa Takozu, Lastik Flap, Kapı Contası, Çarpma Tamponu ve Köşe Koruyucu; yayımlanan kayıtlar ve boş taslakları silindi. Fotoğraflı Rampa Takozu korundu. |
| Kontrol Panosu       | CMS'deki tam açıklama, açılıp kapanan Devamını oku düğmesiyle erişilebilir.                                                                                         |
| Atölye               | 7/5 ve 5/7 genişliklerinde iki dengeli sıra; masaüstünde eşit görsel yüksekliği, mobilde tek sütun.                                                                 |
| Formlar              | 81 il / 973 ilçe; il değişince ilçe sıfırlanır. Marka zorunlu ve başlangıçta boş; seri numarası isteğe bağlı, farklı marka adı zorunlu.                             |
| Yedek parça formu    | Servis ile ortak alanlar, ek parça seçimi, tarih alanı yok; ayrı API ve Studio talep listesi.                                                                       |
| Teklif formu         | Kapasite, adet ve Bilgilerinizi paylaşın başlığı korundu; sektör, ölçü notu, süre ve sol fayda alanı kaldırıldı.                                                    |

## Uygulama iş grupları

Aşağıdaki dağılım uygulamada izlendi. Yeni dosyalar ve doğrulama ayrıntıları son kayıt bölümündedir.

| İş grubu                                                   | Maddeler                    | İlk incelemede ilgili görünen dosyalar / alanlar                                                                                                                                                           |
| ---------------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Üst menü, arama, hero, font ve video                       | 2, 3, 4, 8, 9               | `src/components/layout/header-client.tsx`, `src/components/home/hero.tsx`, `src/app/layout.tsx`, `src/app/globals.css`, `public/videos/`, Sanity site ayarları; arama için gerekli yeni bileşen/veri akışı |
| Ana sayfa başlıkları, atölye, SSS, neden biz ve ayırıcılar | 5, 6, 7, 10, 11, 12, 16, 26 | `src/app/page.tsx`, `src/components/home/workshop-section.tsx`, `home-faqs.tsx`, `why-us.tsx`, `references-strip.tsx`, `src/components/layout/section-divider.tsx`                                         |
| Alt teklif çağrısı ve footer kutucukları                   | 13, 14                      | `src/components/home/cta-section.tsx`, `src/components/layout/footer.tsx`                                                                                                                                  |
| Ürün listeleri, detayları ve Studio alanı                  | 1, 21, 22, 23, 24, 25       | `src/app/urunler/page.tsx`, `src/app/urunler/[slug]/page.tsx`, `src/components/home/product-grid.tsx`, `src/sanity/schemaTypes/product.ts`                                                                 |
| Makaslı platformun siteden çıkarılması                     | 15                          | Statik ürünler, Sanity'den gelen ürünler, gezinme, form seçenekleri, karşılaştırmalar, SEO metinleri, sitemap ve ilgili içeriklerin tamamında tarama                                                       |
| Yedek parça kataloğu ve ayrı talep akışı                   | 17, 18, 19                  | `src/app/yedek-parca/page.tsx`, `src/sanity/schemaTypes/sparePart.ts`, katalog sorguları; yeni sayfa/form, doğrulama, kayıt ve bildirim akışı                                                              |
| İç sayfa başlıkları ve içerikler                           | 20, 27, 28, 30, 32          | `src/app/hakkimizda/page.tsx`, `referanslar/page.tsx`, `blog/page.tsx`, `iletisim/page.tsx` ve kapsama giren diğer iç sayfa başlıkları                                                                     |
| Servis sayfası ve form alanları                            | 29, 31                      | `src/app/servis/page.tsx`, `src/components/forms/service-form.tsx`, `src/lib/form-schemas.ts`, `src/app/api/service/route.ts`, `src/sanity/schemaTypes/serviceRequest.ts`, ilgili tipler ve il/ilçe verisi |
| Teklif sayfası ve form alanları                            | 33                          | `src/app/teklif-al/page.tsx`, `src/components/forms/quote-form.tsx`, `src/lib/form-schemas.ts`, `src/app/api/quote/route.ts`, `src/sanity/schemaTypes/quoteRequest.ts`                                     |

### Uygulama sırasında korunacak ilişkiler

- 1 ve 25 birlikte uygulanır: ürün özelliklerinin, teknik detayların, ortak notun ve benzer ürünlerin sırası birlikte kontrol edilir. EK-008 özellikler başlığı ve listesinin teklif/WhatsApp butonlarının hemen altına taşınacağını netleştirir; kaldırılacak üç özet kartı, korunacak teknik detay maddeleriyle karıştırılmaz.
- 5 ve 26 aynı Atölye bölümünü değiştirir; başlık, altyazıların kaldırılması ve görsel oranları birlikte değerlendirilir.
- 6 için ana sayfada `HomeFaqs` bileşeni zaten mevcut; içerik olmadığında neden görünmediği incelenerek istenen SSS görünürlüğü sağlanır.
- 10, 11 ve 20 ortak başlık düzeniyle ilişkilidir; 4 yalnızca büyük NOVARAMPA yazısının özel font talebidir.
- 15 yalnızca ana sayfadan gizleme olarak ele alınmaz; talep sitedeki makaslı platform içeriklerinin tamamını kapsar.
- 17'de Eren'in düzenlediği yedek parçalar korunur; kaldırılması istenen fazladan beş ürün ayırt edilir.
- 19 ve 31'de alan değişiklikleri sadece görünümde bırakılmaz; form doğrulaması, API, CMS kaydı ve e-posta bildirimiyle tutarlı hale getirilir.
- 28'de Referanslar sayfasındaki gruplama kaldırılır; ana sayfanın mevcut referanslar alanı korunur. Ana sayfa başlığının 11. maddeye göre düzenlenmesi ayrı taleptir.
- 33'te kaldırılan alanlar ve sayfa düzeni, teklif formunun mevcut ürün ön seçimi akışıyla birlikte kontrol edilir.
- Sanity'de mevcut veri varken kod içindeki varsayılan metinleri değiştirmek tek başına yeterli olmayabilir; her değişikliğin gerçek veri kaynağı uygulamada doğrulanır.
- Kod değişiklikleri öncesinde repo yönergeleri ve ilgili yerel Next.js belgeleri okunur; kütüphane/API kullanımında repo Context7 talimatları izlenir.

## Tamamlama kontrolleri

- [x] “Bitti” ve stok video seçimi kaydedildi; 13 ek ilgili maddelere bağlandı.
- [x] 32 maddenin içerik ve davranışları uygulandı; 9. maddenin iki sahne farkı ayrıca kaydedildi.
- [x] Hakkımızda'nın dört paragrafı planın özgün metniyle programatik olarak birebir karşılaştırıldı.
- [x] Masaüstü, mobil ve açık/koyu temalarda yerleşimler kontrol edildi.
- [x] Arama, ürün bağlantıları, açıklama genişletme ve koşullu form alanları tarayıcıda çalıştırıldı.
- [x] Form verileri tarayıcıda taklit API yanıtlarıyla; sunucu doğrulama ve teslim davranışı 12 otomatik testle kontrol edildi. Gerçek e-posta gönderilmedi.
- [x] Eren'in düzenlediği ürünler, fotoğraflı Rampa Takozu ve ana sayfa referans alanı korundu.
- [x] Makaslı Platform arayüz, form seçenekleri, karşılaştırmalar, sitemap ve SEO içeriklerinden çıkarıldı; CMS kaydı görünmez tutuldu.
- [x] Lint, TypeScript ve üretim derlemesi geçti.
- [ ] 9. maddenin rampa üzerinde gerçek kamera hareketi ve rampaya tırmanan forklift sahneleri birebir karşılanmadı; mevcut montajdaki farklar kaynak dosyasında açıklandı.

## Feedback öncesi teknik inceleme — ayrı bağlam

Bu bölüm Eren'in yeni taleplerine eklenmiş iş listesi değildir; önceki incelemenin başlangıç durumunu saklar.

- Başlangıç dalı: `master`; plan oluşturulmadan önce çalışma ağacı temizdi.
- İlk görülen son commit: `930a9de` — ana sayfa redesign, ürün içerikleri ve light/dark mod.
- TypeScript: `tsc --noEmit --incremental false` geçti.
- Lint: 1 hata, 12 uyarı. Hata: `src/app/teklif-al/page.tsx:180` içinde KVKK sayfasına `<a>` ile iç bağlantı.
- Ürün detayından teklif formuna slug gidiyor, form seçenekleri ürün adını değer olarak kullanıyor; ön seçim uyumsuzluğu tespit edildi.
- Header/footer CMS iletişim verisini kullanırken bazı WhatsApp bağlantıları ve İletişim sayfası statik şirket bilgilerini kullanıyor.
- Ana sayfadaki kod tabanlı ürün sırası ve hariç tutmalar, Sanity ürünleri geldiğinde uygulanmıyor.
- Bu ön incelemede uygulama kodu değiştirilmedi; tarayıcı veya production build kontrolü yapılmadı.

## Kayıt geçmişi

1. E-001 alındı: 33 maddelik e-posta bu dosyaya kaydedildi. Ekler bekleniyor. Kullanıcı henüz “bitti” demedi.
2. EK-001 alındı: Kullanıcı “2.ve 3. madde” notuyla üst menünün yukarı hizalanmasını ve üst iletişim şeridindeki arama konumunu gösteren ekran görüntüsünü gönderdi. Görsel notları 2 ve 3. maddelere bağlandı. Diğer ekler bekleniyor; uygulamaya başlanmadı.
3. EK-002 alındı: Kullanıcı “5.madde” notuyla dört Atölye görselinin üzerindeki numara/SAHA ve Atölyeden yazılarının kaldırılmasını işaretleyen ekran görüntüsünü gönderdi. 5. maddeye bağlandı; 26. madde için görünen fotoğraf sıralaması ve oran farkı ayrıca not edildi. Toplama devam ediyor; uygulamaya başlanmadı.
4. EK-003 alındı: Kullanıcı “7.10. ve 12. madde” notuyla Neden Nova Rampa bölümünün işaretli ekran görüntüsünü gönderdi. Kaldırılacak tam slogan ve sevkiyat kartı, büyütülecek bölüm adı ve ayırıcının kaldırılacak kalın merkezi kaydedildi. Toplama devam ediyor; uygulamaya başlanmadı.
5. EK-004 alındı: Kullanıcı “8.madde” notuyla giriş videosunun altındaki beyaz şeridi kırmızıyla tarayan ekran görüntüsünü gönderdi. Hero/videonun görünür web sayfası alanının alt kenarına kadar uzanacağı kaydedildi; 8. maddenin beklenen görseli alındı. Toplama devam ediyor; uygulamaya başlanmadı.
6. EK-005 alındı: Kullanıcı “14. madde” notuyla footer üstündeki Teklif Al, Servis Talep ve Yedek Parça kartlarının ekran görüntüsünü gönderdi. Üç numaranın kaldırılacağı ve sağ üst simgelerin biraz büyütüleceği kaydedildi; açıklamalar için özgün e-posta esas alınacak. Toplama devam ediyor; uygulamaya başlanmadı.
7. EK-006 alındı: Kullanıcı “17. ve 18. madde” notuyla yedek parça ekran görüntüsünü gönderdi. Silinecek beş kart isim ve görünümle kaydedildi; fotoğraflı Rampa Takozu'nun korunacağı özellikle ayrıştırıldı. Kontrol Panosu açıklamasına genişletme kontrolü ekleme talebi görselle eşleştirildi. Toplama devam ediyor; uygulamaya başlanmadı.
8. EK-007 alındı: Kullanıcı “23. madde” notuyla Ürünler sayfasındaki kartların ekran görüntüsünü gönderdi. Ürün adı üstündeki küçük sıra numaraları ile KAPASİTE başlığı ve tonaj etiketlerinin kaldırılacağı kaydedildi. Toplama devam ediyor; uygulamaya başlanmadı.
9. EK-008 alındı: Kullanıcı “25. madde” notuyla ürün detay ekran görüntüsünü gönderdi. Öne çıkan özellikler başlığı ve listesinin teklif/WhatsApp butonları altına taşınacağı; üç teknik özet kartının, sektör alanının ve Sahanın istediği şekilde ibaresinin kaldırılacağı kaydedildi. 1. maddeyle yerleşim ilişkisi not edildi. Toplama devam ediyor; uygulamaya başlanmadı.
10. EK-009 alındı: Kullanıcı “28. madde” notuyla Referanslar sayfası ekran görüntüsünü gönderdi. Küçük açıklama ve grup başlığının kaldırılması, firmaların tek listede birleştirilmesi ve ana sayfa referans alanının korunması kaydedildi. Toplama devam ediyor; uygulamaya başlanmadı.
11. EK-010 alındı: Kullanıcı “29.madde” notuyla Servis sayfasının ekran görüntüsünü gönderdi. Üç adım kartı ve Acil Durum kutusunun tamamının kaldırılacağı kaydedildi. E-postadaki kaldırılacak form cümlesinin, Servis Talep Formu başlığının hemen altındaki açıklama olduğu görselle netleşti. Toplama devam ediyor; uygulamaya başlanmadı.
12. EK-011 alındı: Kullanıcı “31. madde” notuyla İKS servis formundaki marka seçimi örneğini gönderdi. Üç radyo seçeneği, Evet seçeneğinin seri numarası alanı ve e-postadaki farklı marka koşuluyla ilişkisi kaydedildi. İl/ilçe talebi korundu; referansın beş adımlı yapısı yeni gereksinim olarak alınmadı. Toplama devam ediyor; uygulamaya başlanmadı.
13. EK-012 alındı: Kullanıcı “32. madde” notuyla İletişim sayfası ekran görüntüsünü gönderdi. Çalışma Saatleri kutusunun tamamının ve alt teklif çağrısındaki aynı gün dönüş ifadesinin kaldırılması kaydedildi; alt kutunun başlığı, kalan cümlesi ve butonları korunacak. Toplama devam ediyor; uygulamaya başlanmadı.
14. EK-013 alındı: Kullanıcı “33. madde” notuyla teklif sayfası ekran görüntüsünü gönderdi. Sol fayda bölümünün, süre ibaresinin, sektör ve ölçü notu alanlarının kaldırılması ve formun ortalanması kaydedildi. Son numaralı maddenin görseli alınmış olsa da kullanıcı “bitti” demedi; toplama devam ediyor, uygulamaya başlanmadı.

15. Kullanıcı “bitti” diyerek uygulamayı başlattı; 33 madde ve 13 ek tamamlandı.
16. Kullanıcı videonun uygun stok görüntülerle hazırlanmasını istedi.
17. 9 Eylül 2026: Uygulama, CMS temizliği, yeni video ve doğrulamalar tamamlandı. 9. maddenin iki sahne farkı açık kaydedildi.

## Birleştirilmiş uygulama kararı

- Kullanıcı “bitti” diyerek 33 madde ve 13 görselin uygulanmasını istedi.
- 9. madde: Kullanıcı uygun stok videolarla kurgu hazırlanmasını seçti.
- Tasarım: Mevcut siyah/beyaz tema, turuncu vurgu (#F97316), koyu navy (#142235), açık zemin (#F9FAFB) ve gri metin korunur. Work Sans bölüm başlıkları, Open Sans gövde; ana NOVARAMPA yazısında kalın Baskerville Old Face.
- Ana bölüm adları ortak büyük başlık ölçeğinde; iç sayfa girişleri ortalı; Atölye 7/5 ve 5/7 dengeli iki sıra. Ürün görselleri daha baskın, kartlar numarasız, form sayfaları tek merkez sütun.
- Arama: ürün, yedek parça, blog ve yayımlanmış özel sayfalar ile ana sayfalarda Türkçe uyumlu site içi arama. Masaüstünde üst şeritte Bize Ulaşın öncesi; mobilde menü yanında.
- Marka seçimi zorunlu, varsayılanı boş; seri numarası isteğe bağlı, farklı marka seçilirse marka adı istenir. İl/ilçe Türkiye genelini kapsar; il değişince ilçe temizlenir.
- Teklif kutucuğu açıklamasındaki “yazsın” talimat sözcüğü olarak değerlendirilir: “Projeniz için ihtiyacınıza özel teklif alın.”
- Sanity denetimi: SSS boş; varsayılan sorular ile görünür bölüm ve aynı veriden JSON-LD sağlanacak. Silinecek beş parça gerçek CMS belgeleri; görselli Rampa Takozu korunacak. Makaslı Platform görünür katalogdan çıkarılacak.

## Son uygulama kaydı

- Üst menü ve arama: `header-client.tsx`, `site-search.tsx`, `src/lib/site-search.ts`, `src/app/arama/page.tsx`.
- Ortak başlıklar: `page-intro.tsx`, `globals.css`. Ana sayfa, ürün, referans, hakkında, servis, blog, iletişim ve teklif sayfaları talep sırasıyla güncellendi.
- Ürün ve yedek parça katalogları: `src/lib/catalog.ts`, Sanity sorguları, ürün kartları ve detay sayfaları. Studio vitrin cümlesindeki 150 karakter sınırı kaldırıldı.
- Formlar: ortak alan bileşeni, bağımlı il/ilçe seçenekleri, koşullu marka alanları, `/yedek-parca-talep`, `/api/spare-part` ve Studio Yedek Parça Talepleri listesi eklendi.
- Sunucu: `form-schemas.ts`, `support-request-handler.ts`, `request-delivery.ts`. Yanlış il/ilçe ve katalog dışı destek seçenekleri reddedilir. Gizlenen marka alanları temizlenir; kayıt veya bildirim teslim edilmeden başarı yanıtı verilmez.
- CMS: `scripts/apply-eren-feedback.mjs` varsayılan olarak kuru çalışır. Beş fazla ürünün yayımlanan kayıtları ve boş taslakları yedeklendi ve silindi. Makaslı Platform `visible: false` yapıldı.
- CMS yedeği (yerel, git dışında): `.playwright-mcp/cms-eren-backup-2026-09-08T23-16-50-567Z.json`. Korunan fotoğraflı Rampa Takozu kimliği: `sparePart-yay-sistemi`; revizyonunun değişmediği doğrulandı.
- Seed betiği, Eren'in düzenlediği mevcut kayıtları yeniden yazmayacak şekilde `createIfNotExists` kullanır; bu çalışma sırasında seed çalıştırılmadı.
- Son medya: `public/videos/hero-workshop-loop.mp4`, `hero-poster.jpg`, `public/brand/novarampa-baskerville.svg`.
- Test: `npm run test:feedback` — 12 senaryo. Ayrıntılı sonuçlar `docs/EREN-DOGRULAMA.md` içinde.
