# Referans logoları

Tarih: 2026-09-09

Kapsam: /referanslar sayfasındaki mevcut 63 firma. Eren tarafından yüklenen 7 logo korunur; eksik 56 logo firmaların resmi sitelerinden, resmi basın kitlerinden veya firma broşüründen tamamlanır. Firma adları, sektörler, sıralama ve ana sayfada öne çıkarılan firma seçimi değişmez.

## Görünüm

- Mevcut turuncu, siyah ve beyaz tasarım korunur. Kartlarda eşit yüksekliğe sahip logo alanı kullanılır; orijinal logo oranları ve renkleri korunur.
- Logo zeminleri temadan bağımsızdır. Beyaz logolar için koyu lacivert (#182433), diğerleri için beyaz kullanılır.
- Stüdyo > Referans / Proje > Logo ve Logo Zemini alanlarıyla düzenlenebilir. Aynı sunum ana sayfanın mevcut referans bandında da kullanılır.
- Görseller Sanity ve Next Image üzerinden sunulur; diğer firmaların sitelerine tarayıcıdan doğrudan görsel isteği yapılmaz.

## Kaynak ve tekrar çalıştırma

`reference-logo-manifest.json` firma kimliği, özgün kaynak bağlantısı, zemin tercihi ve yerel dosyanın SHA-256 değerini tutar. `public/references/` içindeki dosyalar yalnızca web için boyutlandırılmış kaynak kopyalarıdır. Firma logoları yeniden çizilmemiştir. Bazı firmaların resmi kaynakları düşük çözünürlüklüdür; daha kaliteli dosyalar Stüdyo üzerinden değiştirilebilir.

Özel eşleşmeler: Parex yapı kimyasalları markasıdır; Toyota Tsusho için Toyota otomobil logosu kullanılmaz. Yörpaş için şirketin resmi sayfasında doğrulanan Komagene marka logosu kullanılır. Sörmaş logosu şirketin METEC fuar broşürünün ilk sayfasındaki gömülü görseldir.

Önizleme:

```sh
node --env-file=.env.local scripts/import-reference-logos.mjs
```

Uygulama:

```sh
node --env-file=.env.local scripts/import-reference-logos.mjs --apply
```

Aktarım mevcut logoların üzerine yazmaz. Belge revizyonu değişmişse güncellemeyi durdurur; işlem öncesi kayıtları git dışında `.playwright-mcp/backups/` altına yedekler. İşlem sonunda firma sayısı, eski logolar ve logo dışındaki içerik alanları doğrulanır. Günöz Tekstil kaydındaki mevcut beyaz logo için yalnızca eksik zemin tercihi tamamlanır.

## Yeni eklenen logolar

| Firma | Kaynak | Zemin |
| --- | --- | --- |
| Arçelik | [Resmi kaynak](https://www.arcelikglobal.com/media/oswlax15/arcelik_marka_logo.png) | Açık |
| Eczacıbaşı | [Resmi kaynak](https://www.eczacibasi.com.tr/assets/eczacibasi-logo-2023.png) | Açık |
| Mars Lojistik | [Resmi kaynak](https://marslogistics.com/content/images/web/logo/MARS_LOGISTICS_LOGO.png) | Açık |
| Roketsan | [Resmi kaynak](https://www.roketsan.com.tr/uploads/images/large/1627296818_logo.svg?1627296818) | Açık |
| THY | [Resmi kaynak](https://investor.turkishairlines.com/templates/default/assets/img/footer/thy_footer_logo.png) | Koyu |
| Toyota Tsusho | [Resmi kaynak](https://www.toyota-tsusho.com/english/app-files/img/cmn_logo01.svg) | Açık |
| Şişecam (Cam Elyaf Sanayii A.Ş.) | [Resmi kaynak](https://www.sisecam.com/_catalogs/masterpage/assets/images/logos/logo.svg?v=1) | Açık |
| ABC Deterjan | [Resmi kaynak](https://www.abcdeterjan.com.tr/wp-content/uploads/logo.png) | Açık |
| ABS Alçı | [Resmi kaynak](https://www.absalci.com.tr/uploads/logo.png) | Açık |
| Adopen | [Resmi kaynak](https://www.adopen.com.tr/wp-content/uploads/2024/02/adopen-logo.png) | Açık |
| Aksa Akrilik | [Resmi kaynak](https://asset.aksa.com/media-data/others/2025/10/15/aksa-yeni-logo-jxcl124w.svg) | Açık |
| Arkas Lojistik | [Resmi kaynak](https://www.arkaslojistik.com/assets/logo_white.png) | Koyu |
| Asaş Alüminyum | [Resmi kaynak](https://www.asastr.com/sites/1/content/img/logo.svg) | Açık |
| Cronimet | [Resmi kaynak](https://www.cronimet.de/en/assets/templates/cronimet/images/navigation/navi_logo.png) | Koyu |
| Deva Holding | [Resmi kaynak](https://www.deva.com.tr/) | Açık |
| Docotton Group | [Resmi kaynak](https://www.docotton.com/uploadFiles/stores/docotton-group-1001-1712748709.png) | Açık |
| EAE | [Resmi kaynak](https://www.eae.com.tr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Feae-elektrik-logo.c571e196.webp&w=828&q=75) | Açık |
| Ege Kimya | [Resmi kaynak](https://www.egekimya.com/wp-content/uploads/2026/05/ege-logo.png) | Açık |
| Enpay | [Resmi kaynak](https://www.enpay.com/assets/images/logo.png) | Açık |
| Fırat Plastik | [Resmi kaynak](https://www.firat.com/cmsfiles/Galleries/451/logo_firat.png) | Açık |
| HSA Enerji | [Resmi kaynak](https://dcms.hsaenerji.com/storage/media/wRtvmkoNknzEqxS80pjoM8GBk6UP1eEPfcwI1ljb.png) | Açık |
| Hasçelik Kablo | [Resmi kaynak](https://www.hascelikkablo.com.tr/depo/logo-hasc.png) | Açık |
| Kalekim | [Resmi kaynak](https://www.kalekim.com/) | Açık |
| Kartonsan | [Resmi kaynak](https://www.kartonsan.com.tr/images/logo.svg) | Açık |
| Kervan | [Resmi kaynak](https://kervangida.com/images/logoOpenGraph.png) | Açık |
| Kronospan | [Resmi kaynak](https://prowly-prod.s3.eu-west-1.amazonaws.com/uploads/3508/assets/281279/original-d57f8be695de50c36848d1d0a9e59a70.jpg) | Açık |
| Kırmızıgül Kozmetik | [Resmi kaynak](https://www.kirmizigulkozmetik.com/wp-content/uploads/2023/10/kirmizigul-beyaz-logo.png) | Koyu |
| Makbul | [Resmi kaynak](https://www.makbul.com/assets/img/logo.png) | Açık |
| Mondi | [Resmi kaynak](https://www.mondigroup.com/ui/gfx/icons/logo.svg) | Açık |
| ODE Yalıtım | [Resmi kaynak](https://ode.com.tr/project/_resources/images/logo.svg) | Açık |
| Parex | [Resmi kaynak](https://dynamicmedia.sika.com/adobe/assets/urn:aaid:aem:70dea728-1414-4d84-98f9-e25869439bd6/as/us-PAREX-Logo-Black-01211694.png?width=320&height=76) | Açık |
| Patiswiss | [Resmi kaynak](https://www.patiswiss.com.tr/cdn/shop/files/ps.png?v=1764318164) | Açık |
| Polinas | [Resmi kaynak](https://www.polinas.com/Templates/Default/assets/images/logo.png) | Açık |
| Poliport Kimya | [Resmi kaynak](https://www.poliport.com/images/bckg/logo.png) | Koyu |
| QUA Granit | [Resmi kaynak](https://www.qua.com.tr/uploads/logo-color.png) | Açık |
| Rebul Kozmetik | [Resmi kaynak](https://static.ticimax.cloud/73999/Uploads/HeaderTasarim/Header2/9099201f-5a9e-41c0-9b26-132def4d233a.jpg) | Açık |
| Reis Makina | [Resmi kaynak](https://marsellonline.com//images/Reis/reismakina-01.png) | Açık |
| Sarten Ambalaj | [Resmi kaynak](https://www.sarten.com.tr/wp-content/uploads/2024/01/SARTEN-LOGO-500-.png) | Açık |
| Silkcoat | [Resmi kaynak](https://silkcoat.com/_next/image/?url=%2Flogo%2Flogo_base.png&w=2048&q=90&dpl=dpl_4mnD63TG9x9fRpymybQVTMEfLm6E) | Açık |
| Sistem Alüminyum | [Resmi kaynak](https://www.sistemal.com/wp-content/uploads/2022/03/sistem-aluminyum-renkli-logo.png) | Açık |
| Sörmaş | [Resmi kaynak](https://www.gifa.de/vis-content/event-GMTN2019.metec/exh-GMTN2019.2579950/METEC-2019-SORPA-DIS-TICARET-A.S.-Exhibitor-GMTN2019.2579950-QjebtDhjRzKJdJe8aBI2Cg.pdf) | Açık |
| Targid Tarım | [Resmi kaynak](https://targid.com/wp-content/uploads/2016/08/Targid-logo-web.png) | Açık |
| Tarım Kredi | [Resmi kaynak](https://tarimkredi.org.tr/assets/front/images/logo.png) | Açık |
| Tat Gıda | [Resmi kaynak](https://tatgida.azureedge.net/wp-prod/wp-content/uploads/2023/09/tat-logo@3x.png) | Açık |
| Tedi | [Resmi kaynak](https://www.tedi.com.tr/idea/fz/62/themes/selftpl_6a43c2d25819a/assets/uploads/logo.png?revision=8.4.3.2-2-1788872256) | Açık |
| Teka | [Resmi kaynak](https://www.teka.com/tr-tr/wp-content/themes/teka/img/teka-new-logo.svg) | Açık |
| Tosçelik | [Resmi kaynak](https://c.toscelik.com.tr/images/641068toscelikpng) | Açık |
| Vatan Kablo | [Resmi kaynak](https://vatan.com.tr/assets/images/vatan/logo.png) | Açık |
| Vatan Plastik | [Resmi kaynak](https://www.vatanplastik.com/wp-content/uploads/2020/01/vatan_logo-1.png) | Açık |
| Yataş | [Resmi kaynak](https://p1-assets-yatas.sm.mncdn.com/assets/img/yatas/logo.webp) | Açık |
| Yörpaş | [Resmi kaynak](https://gateway.komagene.com.tr/site/StaticFiles/YuklenenLogolar/32/Logo-Kmgn.png) | Koyu |
| Çobanpınar | [Resmi kaynak](https://www.cobanpinar.com.tr/cobanpinar/images/logolar/logo.gif) | Açık |
| Özdilek | [Resmi kaynak](https://www.ozdilek.com.tr/tr/images/logo/logo.svg) | Açık |
| Özismak | [Resmi kaynak](https://www.ozismak.com/wp-content/themes/proweb/images/logo.png) | Açık |
| İnka | [Resmi kaynak](https://inkafixing.com/wp-content/uploads/2025/01/inka-beyaz@2x.png) | Koyu |
| İskefe Holding | [Resmi kaynak](https://www.iskefeholding.com.tr/) | Açık |

## Doğrulama

- [x] 63 logo için görsel kontrol; oranlar, kırpılma ve zemin kontrastı.
- [x] ESLint ve TypeScript kontrolü.
- [x] Stüdyo aktarımı ve mevcut içeriklerin korunması.
- [x] Üretim derlemesi.
- [x] Masaüstü / mobil, açık / koyu tema ve ana sayfa bandı kontrolü.
- [x] Aktarım tekrar çalıştırma önizlemesi: 0 eksik logo, 63 mevcut logo korunuyor.

Yayın akışı: `master` dalına push, GitHub/Vercel dağıtım sonucunun izlenmesi ve canlı `/referanslar` sayfasında 63 logonun yüklenmesinin kontrolü.
