/**
 * Eren SEO/GEO Yol Haritası PDF generator
 *
 * Çalıştırma: node scripts/generate-eren-pdf.mjs
 * Çıktı: eren-seo-yol-haritasi.pdf
 *
 * Yöntem: HTML render et → Chromium headless → PDF print.
 */
import { chromium } from "playwright-core";
import { writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const OUT_PATH = resolve("eren-seo-yol-haritasi.pdf");
const TMP_HTML = resolve("scripts/_eren-pdf.html");

const HTML = `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<title>Nova Rampa — SEO & GEO Yol Haritası</title>
<style>
  @page { size: A4; margin: 18mm 16mm 22mm 16mm; }
  @page :first { margin: 0; }

  :root {
    --navy: #142235;
    --navy-light: #1c2f47;
    --orange: #F97316;
    --orange-light: #ffb375;
    --paper: #FAF8F4;
    --paper-2: #f1ede4;
    --ink: #142235;
    --muted: #6b7689;
    --line: #e3dfd5;
  }

  * { box-sizing: border-box; }
  html, body { padding: 0; margin: 0; }
  body {
    font-family: -apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    color: var(--ink);
    line-height: 1.55;
    font-size: 10.5pt;
    background: white;
  }

  /* ─── KAPAK ─── */
  .cover {
    page-break-after: always;
    height: 297mm;
    width: 210mm;
    padding: 28mm 22mm;
    background: linear-gradient(140deg, var(--navy) 0%, var(--navy-light) 60%, var(--navy) 100%);
    color: white;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .cover-glow {
    position: absolute;
    top: 35%; right: -10%;
    width: 60%; height: 60%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(249,115,22,0.35) 0%, transparent 70%);
  }
  .cover-brand {
    display: flex; align-items: center; gap: 14px;
    position: relative; z-index: 2;
  }
  .cover-brand .mark {
    width: 56px; height: 56px;
    border-radius: 12px;
    background: var(--orange);
    display: flex; align-items: center; justify-content: center;
    color: white; font-weight: 800; font-size: 32px;
    letter-spacing: -0.04em;
  }
  .cover-brand .wordmark {
    font-weight: 700; letter-spacing: 0.08em; font-size: 22px;
  }
  .cover-title-block { position: relative; z-index: 2; }
  .cover-eyebrow {
    color: var(--orange);
    font-size: 11pt; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    margin-bottom: 18px;
  }
  .cover-title {
    font-size: 48pt; font-weight: 800; line-height: 1.0;
    letter-spacing: -0.035em;
    margin: 0 0 16px;
  }
  .cover-title em {
    font-style: italic; font-weight: 500;
    color: var(--orange);
  }
  .cover-subtitle {
    font-size: 14pt; color: rgba(255,255,255,0.78);
    line-height: 1.45; max-width: 480px;
  }
  .cover-meta {
    position: relative; z-index: 2;
    display: flex; justify-content: space-between; align-items: flex-end;
    font-family: ui-monospace, "SF Mono", Menlo, monospace;
    font-size: 9pt; color: rgba(255,255,255,0.55);
    letter-spacing: 0.12em; text-transform: uppercase;
  }
  .cover-meta .pill {
    padding: 8px 14px;
    border: 1px solid rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.05);
    border-radius: 999px;
    color: rgba(255,255,255,0.85);
  }

  /* ─── İÇİNDEKİLER + İÇ SAYFA ─── */
  .page-eyebrow {
    color: var(--orange);
    font-size: 9pt; font-weight: 600;
    letter-spacing: 0.22em; text-transform: uppercase;
    margin-bottom: 6px;
  }
  .page-h1 {
    font-size: 26pt; font-weight: 800;
    line-height: 1.05; letter-spacing: -0.03em;
    margin: 0 0 12px;
  }
  .page-lead {
    color: var(--muted);
    font-size: 11pt; line-height: 1.55;
    margin-bottom: 18px;
    max-width: 540px;
  }
  .hr {
    height: 1px; background: var(--line);
    margin: 14px 0 18px;
  }

  /* ─── ÖZET KART (kapak altında) ─── */
  .status-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 8px; margin: 18px 0 24px;
  }
  .status-card {
    border: 1px solid var(--line);
    background: var(--paper);
    border-radius: 10px;
    padding: 14px;
  }
  .status-card .num {
    font-size: 28pt; font-weight: 800;
    letter-spacing: -0.04em; line-height: 1; color: var(--orange);
  }
  .status-card .label {
    font-size: 9pt; font-weight: 600;
    color: var(--muted); text-transform: uppercase;
    letter-spacing: 0.12em; margin-top: 6px;
  }
  .status-card .caption {
    font-size: 9pt; color: var(--muted); margin-top: 4px;
  }

  /* ─── İÇERİK LİSTE (TOC) ─── */
  .toc { margin-top: 12px; }
  .toc-row {
    display: flex; justify-content: space-between; align-items: baseline;
    padding: 8px 0;
    border-bottom: 1px dashed var(--line);
    font-size: 10pt;
  }
  .toc-row strong {
    font-weight: 600; color: var(--ink);
  }
  .toc-row .toc-num {
    font-family: ui-monospace, monospace;
    color: var(--orange);
    margin-right: 10px;
    font-weight: 700;
  }
  .toc-row .toc-pri {
    font-size: 8pt;
    padding: 2px 8px;
    border-radius: 999px;
    margin-left: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
  }
  .pri-critical { background: rgba(249,115,22,0.15); color: var(--orange); }
  .pri-high { background: rgba(20,34,53,0.08); color: var(--navy); }
  .pri-medium { background: rgba(107,118,137,0.12); color: var(--muted); }

  /* ─── BÖLÜM ─── */
  .section { page-break-before: always; }
  .section:first-child { page-break-before: auto; }

  .section-head {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 16px;
  }
  .section-num {
    font-size: 32pt; font-weight: 800; letter-spacing: -0.04em;
    color: var(--orange); line-height: 1;
    font-family: ui-monospace, monospace;
  }
  .section-title {
    flex: 1;
  }
  .section-title h2 {
    margin: 0; font-size: 22pt; font-weight: 800;
    letter-spacing: -0.025em; line-height: 1.1;
  }
  .section-title .meta {
    font-size: 9pt; color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.15em;
    margin-top: 4px;
  }

  /* ─── İŞ KARTI ─── */
  .task {
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 14px 16px;
    margin-bottom: 14px;
    background: white;
    page-break-inside: avoid;
  }
  .task-head {
    display: flex; justify-content: space-between; align-items: flex-start;
    gap: 12px; margin-bottom: 8px;
  }
  .task-head h3 {
    margin: 0; font-size: 13pt; font-weight: 700;
    line-height: 1.25; flex: 1;
  }
  .task-head h3 .idx {
    color: var(--muted); font-weight: 600;
    margin-right: 6px; font-family: ui-monospace, monospace;
    font-size: 11pt;
  }
  .badges {
    display: flex; gap: 4px; flex-shrink: 0;
  }
  .badge {
    font-size: 7.5pt; padding: 3px 8px;
    border-radius: 999px;
    text-transform: uppercase; letter-spacing: 0.1em;
    font-weight: 700;
    white-space: nowrap;
  }
  .badge.critical { background: var(--orange); color: white; }
  .badge.high { background: var(--navy); color: white; }
  .badge.medium { background: var(--paper-2); color: var(--navy); }

  .task-body {
    font-size: 10pt; color: var(--ink); line-height: 1.55;
  }
  .task-body p { margin: 6px 0; }
  .task-body strong { color: var(--navy); font-weight: 600; }

  .task-sub {
    margin-top: 10px;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .task-info {
    border-left: 3px solid var(--orange);
    padding: 6px 12px;
    background: var(--paper);
    border-radius: 0 6px 6px 0;
    font-size: 9pt;
  }
  .task-info .label {
    color: var(--muted); font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.1em;
    font-size: 7.5pt; margin-bottom: 2px;
  }
  .task-info .value { color: var(--ink); }

  /* Adım listesi */
  .steps {
    margin: 8px 0 4px;
    padding-left: 0;
    list-style: none;
    counter-reset: step;
  }
  .steps li {
    counter-increment: step;
    padding: 4px 0 4px 26px;
    position: relative;
    font-size: 10pt;
    line-height: 1.5;
  }
  .steps li::before {
    content: counter(step);
    position: absolute;
    left: 0; top: 4px;
    width: 18px; height: 18px;
    background: var(--orange);
    color: white;
    border-radius: 50%;
    font-size: 8pt; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    font-family: ui-monospace, monospace;
  }

  /* Niçin önemli kutusu */
  .why {
    margin-top: 8px;
    border-radius: 6px;
    background: rgba(20,34,53,0.05);
    padding: 8px 12px;
    font-size: 9.5pt;
    line-height: 1.5;
  }
  .why .ico { font-weight: 700; color: var(--orange); }

  /* Footer */
  .footer {
    position: fixed;
    bottom: 8mm;
    left: 16mm; right: 16mm;
    display: flex; justify-content: space-between;
    font-family: ui-monospace, monospace;
    font-size: 7pt; color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.12em;
  }
  .footer .url { color: var(--orange); font-weight: 600; }

  /* Özet sayfası tablo */
  .summary-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 12px;
  }
  .summary-table th, .summary-table td {
    text-align: left;
    padding: 8px 10px;
    border-bottom: 1px solid var(--line);
    font-size: 9pt;
    vertical-align: top;
  }
  .summary-table thead th {
    background: var(--navy);
    color: white;
    font-weight: 600;
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  /* Final sayfa */
  .final-cta {
    margin-top: 24px;
    background: linear-gradient(135deg, var(--navy), var(--navy-light));
    color: white;
    padding: 26px;
    border-radius: 14px;
  }
  .final-cta h3 {
    margin: 0 0 8px; font-size: 18pt; font-weight: 800;
    letter-spacing: -0.02em;
  }
  .final-cta p {
    color: rgba(255,255,255,0.8);
    font-size: 10pt; line-height: 1.55; margin: 6px 0;
  }
  .final-cta a {
    display: inline-block;
    background: var(--orange);
    color: white;
    padding: 8px 16px;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 600;
    font-size: 10pt;
    margin-top: 8px;
  }
</style>
</head>
<body>

<!-- ─── KAPAK ─── -->
<div class="cover">
  <div class="cover-glow"></div>

  <div class="cover-brand">
    <div class="mark">N</div>
    <div class="wordmark">NOVARAMPA</div>
  </div>

  <div class="cover-title-block">
    <div class="cover-eyebrow">SEO &amp; GEO Yol Haritası · 2026</div>
    <h1 class="cover-title">
      Google'da<br>
      <em>ve AI'da</em><br>
      görünür ol.
    </h1>
    <p class="cover-subtitle">
      Web sitesi altyapısı %93 hazır. Bu rehber, kodun yapamadığı —
      Eren'in kendi başına yapması gereken — adımları sıralı,
      açıklamalı ve önceliklendirilmiş şekilde sunar.
    </p>
  </div>

  <div class="cover-meta">
    <span>Nova Rampa · Çorlu / İstanbul</span>
    <span class="pill">Eren için hazırlandı</span>
  </div>
</div>

<!-- ─── ÖZET + TOC ─── -->
<div class="section">
  <div class="page-eyebrow">Mevcut Durum &amp; Yol Haritası</div>
  <h1 class="page-h1">Web sitesi %93 hazır.<br>Gerisi senin elinde.</h1>
  <p class="page-lead">
    Site tarafında SEO &amp; GEO (Generative Engine Optimization — AI motorları için optimizasyon)
    altyapısı tamamlandı: robots, sitemap, JSON-LD, FAQ, karşılaştırma sayfaları, dinamik OG görselleri.
    Geriye kalan iş, web sitesi DIŞINDA yapılacak otorite sinyalleri ve içerik üretimi.
    Bu adımları ihmal edersen Google ve ChatGPT sonuçlarında diğer markalar öne çıkar.
  </p>

  <div class="status-grid">
    <div class="status-card">
      <div class="num">93</div>
      <div class="label">/100 SEO Skoru</div>
      <div class="caption">Kod tarafı tamamlandı</div>
    </div>
    <div class="status-card">
      <div class="num">28</div>
      <div class="label">Yapılacak İş</div>
      <div class="caption">8 kritik · 12 yüksek · 8 orta</div>
    </div>
    <div class="status-card">
      <div class="num">~36s</div>
      <div class="label">Toplam Zaman</div>
      <div class="caption">İlk 6 hafta yoğun, sonra bakım</div>
    </div>
  </div>

  <h2 style="font-size: 14pt; margin: 18px 0 8px; letter-spacing:-0.02em;">İçindekiler</h2>

  <div class="toc">
    <div class="toc-row">
      <span><span class="toc-num">01</span><strong>Google Hesapları Kurulumu</strong> · Search Console, Analytics, Business Profile</span>
      <span class="toc-pri pri-critical">Kritik</span>
    </div>
    <div class="toc-row">
      <span><span class="toc-num">02</span><strong>Google Maps Yorumları</strong> · Müşteri review toplama akışı</span>
      <span class="toc-pri pri-critical">Kritik</span>
    </div>
    <div class="toc-row">
      <span><span class="toc-num">03</span><strong>Sosyal Medya Açılışı</strong> · Instagram, LinkedIn, YouTube</span>
      <span class="toc-pri pri-high">Yüksek</span>
    </div>
    <div class="toc-row">
      <span><span class="toc-num">04</span><strong>Sektörel Kayıtlar &amp; B2B Rehberler</strong> · Sanayi Odası, OSB</span>
      <span class="toc-pri pri-high">Yüksek</span>
    </div>
    <div class="toc-row">
      <span><span class="toc-num">05</span><strong>Sanity'de İçerik Üretimi</strong> · FAQ, blog, gerçek fotolar</span>
      <span class="toc-pri pri-high">Yüksek</span>
    </div>
    <div class="toc-row">
      <span><span class="toc-num">06</span><strong>Aylık Bakım</strong> · Performans, hata takibi</span>
      <span class="toc-pri pri-medium">Orta</span>
    </div>
  </div>
</div>


<!-- ─── BÖLÜM 1: GOOGLE HESAPLARI ─── -->
<div class="section">
  <div class="section-head">
    <div class="section-num">01</div>
    <div class="section-title">
      <h2>Google Hesapları Kurulumu</h2>
      <div class="meta">İlk hafta · Kritik · Tek kerelik kurulum</div>
    </div>
  </div>

  <!-- 1.1 Search Console -->
  <div class="task">
    <div class="task-head">
      <h3><span class="idx">1.1</span> Google Search Console kur</h3>
      <div class="badges"><span class="badge critical">Kritik</span></div>
    </div>
    <div class="task-body">
      <p><strong>Ne işe yarar:</strong> Google'ın siteyi nasıl gördüğünü anlamak, hangi kelimelerden gelindiğini görmek, indexleme hatalarını yakalamak. Eren olmadan bu görünmez kalır.</p>
      <ol class="steps">
        <li><strong>search.google.com/search-console</strong> adresine git, info@novarampa.com ile giriş yap.</li>
        <li>"Mülk ekle" → "URL ön eki" → <code>https://novarampa.com</code> yapıştır.</li>
        <li>Doğrulama için "HTML etiketi" yöntemini seç, kodu kopyala, kodunu geliştiriciye yolla (5 dk'lık iş).</li>
        <li>Doğrulandıktan sonra <strong>Sitemap</strong> sekmesine git, <code>sitemap.xml</code> yaz → Gönder.</li>
        <li>İlk veriler 48-72 saatte gelir.</li>
      </ol>
      <div class="task-sub">
        <div class="task-info"><div class="label">Zaman</div><div class="value">15 dakika</div></div>
        <div class="task-info"><div class="label">Maliyet</div><div class="value">Ücretsiz</div></div>
      </div>
      <div class="why"><span class="ico">→</span> <strong>Ölçüm:</strong> 4-6 hafta sonra Search Console'da "yükleme rampası" kelimeleri için gösterim sayısını takip et. İlk hedef: 1.000 gösterim/ay.</div>
    </div>
  </div>

  <!-- 1.2 GA4 -->
  <div class="task">
    <div class="task-head">
      <h3><span class="idx">1.2</span> Google Analytics 4 (GA4) kur</h3>
      <div class="badges"><span class="badge critical">Kritik</span></div>
    </div>
    <div class="task-body">
      <p><strong>Ne işe yarar:</strong> Sitene kimler geliyor, hangi sayfada ne kadar kalıyor, en çok hangi içerik okunuyor? Pazarlama bütçesini doğru sayfalara akıtmak için temel.</p>
      <ol class="steps">
        <li><strong>analytics.google.com</strong> → "Hesap oluştur" → "Nova Rampa" adını ver.</li>
        <li>"Mülk oluştur" → "Web" → URL yapıştır → Endüstri: "İmalat".</li>
        <li>"Measurement ID" (G-XXXXXXX şeklinde) kopyala, geliştiriciye yolla.</li>
        <li>"Dönüşüm Olayları" kısmında <strong>form_submit</strong> ve <strong>contact_click</strong> olarak işaretle.</li>
      </ol>
      <div class="task-sub">
        <div class="task-info"><div class="label">Zaman</div><div class="value">20 dakika</div></div>
        <div class="task-info"><div class="label">Maliyet</div><div class="value">Ücretsiz</div></div>
      </div>
      <div class="why"><span class="ico">→</span> <strong>Ölçüm:</strong> Aylık aktif kullanıcı, ortalama oturum süresi, en çok ziyaret edilen 10 sayfa. İlk 3 ayda baseline oluştur.</div>
    </div>
  </div>

  <!-- 1.3 Google Business Profile - Çorlu -->
  <div class="task">
    <div class="task-head">
      <h3><span class="idx">1.3</span> Google Business Profile — Çorlu Atölye</h3>
      <div class="badges"><span class="badge critical">Kritik</span></div>
    </div>
    <div class="task-body">
      <p><strong>Ne işe yarar:</strong> "Çorlu yükleme rampası" araması yapan biri Google Maps'te seni bulur. Telefonu açar, yol tarifi alır. Yerel müşterilerin %70'i bu yolla başvurur.</p>
      <ol class="steps">
        <li><strong>business.google.com</strong> → "İşletme ekle" → "Nova Rampa".</li>
        <li>İşletme tipi: <strong>Yükleme Rampası İmalatçısı</strong>. Kategori: "İmalatçı".</li>
        <li>Adres: <em>Zafer Mahallesi, Bakım Onarım 3. Sokak No:12, Çorlu/Tekirdağ</em>.</li>
        <li>Telefon + web sitesi + çalışma saatleri (Pazartesi-Cuma 09:00-18:00, Cumartesi 09:00-12:00).</li>
        <li>Doğrulama: <strong>posta kartı</strong> seç (5-10 gün gelir) veya video çağrı (varsa).</li>
        <li>Onaylandıktan sonra: 10+ atölye fotoğrafı yükle, hizmetler listesi ekle (Yükleme rampası imalatı, montajı, servisi).</li>
      </ol>
      <div class="task-sub">
        <div class="task-info"><div class="label">Zaman</div><div class="value">30 dk + 10 gün doğrulama</div></div>
        <div class="task-info"><div class="label">Maliyet</div><div class="value">Ücretsiz</div></div>
      </div>
      <div class="why"><span class="ico">→</span> <strong>Ölçüm:</strong> Aylık "Maps'te görüntülenme" + "yol tarifi isteyen" sayısı. İlk hedef 100 görüntülenme/ay.</div>
    </div>
  </div>

  <!-- 1.4 Google Business Profile - Sultanbeyli -->
  <div class="task">
    <div class="task-head">
      <h3><span class="idx">1.4</span> Google Business Profile — Sultanbeyli Ofis</h3>
      <div class="badges"><span class="badge critical">Kritik</span></div>
    </div>
    <div class="task-body">
      <p><strong>Ne işe yarar:</strong> İstanbul'da yükleme rampası arayan müşteri için ayrı bir görünürlük. Çorlu ile aynı işletmeden 2. konum olarak ekle (Google buna izin verir).</p>
      <ol class="steps">
        <li>Aynı hesapta "Konum ekle" → 2. konum.</li>
        <li>Adres: <em>Mimar Sinan Mahallesi, Basra Caddesi, Hazım Sokak No:2A, Sultanbeyli/İstanbul</em>.</li>
        <li>Hizmet alanı olarak <strong>İstanbul, Kocaeli</strong> ekle.</li>
        <li>Doğrulama tekrar postanedan.</li>
      </ol>
      <div class="task-sub">
        <div class="task-info"><div class="label">Zaman</div><div class="value">20 dk + 10 gün</div></div>
        <div class="task-info"><div class="label">Maliyet</div><div class="value">Ücretsiz</div></div>
      </div>
    </div>
  </div>
</div>


<!-- ─── BÖLÜM 2: MÜŞTERİ YORUMLARI ─── -->
<div class="section">
  <div class="section-head">
    <div class="section-num">02</div>
    <div class="section-title">
      <h2>Google Maps Yorumları</h2>
      <div class="meta">Süreklilik gerekir · Kritik · 6 ayda 50 yorum hedefi</div>
    </div>
  </div>

  <!-- 2.1 -->
  <div class="task">
    <div class="task-head">
      <h3><span class="idx">2.1</span> Yorum toplama akışı kur</h3>
      <div class="badges"><span class="badge critical">Kritik</span></div>
    </div>
    <div class="task-body">
      <p><strong>Ne işe yarar:</strong> Google review sayısı + ortalama puan, B2B'de bile satın alma kararının %60'ını etkiler. AI motorları da (ChatGPT, Perplexity) yorum sayısı yüksek yerel işletmeleri öncelikle önerir.</p>
      <ol class="steps">
        <li>Google Business Profile yönetiminde "İncele bağlantısı paylaş" linkini al (her iki konum için ayrı).</li>
        <li>Bu linki QR kod yap (qr-code-generator.com — ücretsiz) ve atölyeye, ofise yapıştır.</li>
        <li>Eski 20-30 müşterine WhatsApp mesajı: <em>"Merhaba [İsim] bey, geçen ay rampanızı kuruyorduk. Google'a 1 dakikalık değerlendirme yazabilir misiniz? Link: [URL]. Çok değerli."</em></li>
        <li>Her teslim sonrası yeni müşteriye email + WhatsApp ile review linki.</li>
      </ol>
      <div class="task-sub">
        <div class="task-info"><div class="label">Zaman</div><div class="value">İlk hafta 4 saat, sonra 30 dk/ay</div></div>
        <div class="task-info"><div class="label">Maliyet</div><div class="value">Ücretsiz</div></div>
      </div>
      <div class="why"><span class="ico">→</span> <strong>Ölçüm:</strong> 6 ay sonra hedef 50 review, ortalama 4.7+ puan. 10 yorumun altındaysa AI sonuçlarında ikincil kalırsın.</div>
    </div>
  </div>

  <!-- 2.2 -->
  <div class="task">
    <div class="task-head">
      <h3><span class="idx">2.2</span> Yorumlara cevap verme rutini</h3>
      <div class="badges"><span class="badge high">Yüksek</span></div>
    </div>
    <div class="task-body">
      <p><strong>Ne işe yarar:</strong> Google yorum yanıtlama oranını bir SEO sinyali olarak kullanır. Cevaplanan işletmeler arama sonuçlarında %4-8 daha yukarı gelir.</p>
      <ol class="steps">
        <li>Haftada 1 kez Business Profile'a gir.</li>
        <li>Pozitif yoruma kısa teşekkür yaz: <em>"Geri bildiriminiz için teşekkürler [İsim] bey. Yine bekleriz."</em></li>
        <li>Negatif yorumu mutlaka cevapla: nazik, çözüm odaklı. Ardından özel mesaj at.</li>
      </ol>
    </div>
  </div>

  <!-- 2.3 -->
  <div class="task">
    <div class="task-head">
      <h3><span class="idx">2.3</span> WhatsApp template oluştur</h3>
      <div class="badges"><span class="badge high">Yüksek</span></div>
    </div>
    <div class="task-body">
      <p><strong>Ne işe yarar:</strong> Her teslimde manuel yazmak yerine, hazır şablon ile review iste. %3-5 dönüş yerine %15-25 dönüş alırsın.</p>
      <ol class="steps">
        <li>WhatsApp Business uygulamasını indir (Eren'in numarasıyla).</li>
        <li>"Hızlı yanıtlar" bölümüne 3 şablon ekle: <em>review iste</em>, <em>teslim sonrası kontrol</em>, <em>servis randevusu</em>.</li>
        <li>Her şablonda mutlaka Google review linkini koy.</li>
      </ol>
    </div>
  </div>
</div>


<!-- ─── BÖLÜM 3: SOSYAL MEDYA ─── -->
<div class="section">
  <div class="section-head">
    <div class="section-num">03</div>
    <div class="section-title">
      <h2>Sosyal Medya Açılışı</h2>
      <div class="meta">İlk ay yoğun · Yüksek öncelik · Düzenli içerik gerekir</div>
    </div>
  </div>

  <div class="task">
    <div class="task-head">
      <h3><span class="idx">3.1</span> Instagram Business hesabı</h3>
      <div class="badges"><span class="badge high">Yüksek</span></div>
    </div>
    <div class="task-body">
      <p><strong>Ne işe yarar:</strong> Endüstriyel ürünlerin görsel kanıtı için en uygun platform. "Çorlu yükleme rampası" diye arayanlar Instagram'ı da kontrol eder. Reel'ler (kısa videolar) montaj sürecini göstermek için ideal.</p>
      <ol class="steps">
        <li>@novarampa kullanıcı adıyla hesap aç.</li>
        <li>Bio: <em>"Yükleme rampası imalatçısı · 2003'ten beri saha · CE/TSE belgeli · Marmara &amp; Türkiye geneli ↓"</em></li>
        <li>Profil linki: novarampa.com</li>
        <li>İlk hafta 9 post: 3 atölye fotosu, 3 ürün, 3 saha teslim.</li>
        <li>URL'i <strong>Sanity Site Ayarları → Sosyal Medya → Instagram</strong> alanına yapıştır → footer'da otomatik gözükür.</li>
      </ol>
      <div class="task-sub">
        <div class="task-info"><div class="label">Zaman</div><div class="value">İlk hafta 4 saat, sonra haftada 1 saat</div></div>
        <div class="task-info"><div class="label">Maliyet</div><div class="value">Ücretsiz</div></div>
      </div>
      <div class="why"><span class="ico">→</span> <strong>İçerik fikirleri:</strong> Montaj timelapse video, "öncesi/sonrası", müşteri tesisi tanıtımı (izin alarak), atölyede kaynak çekimleri, ekip portreleri.</div>
    </div>
  </div>

  <div class="task">
    <div class="task-head">
      <h3><span class="idx">3.2</span> LinkedIn Şirket sayfası</h3>
      <div class="badges"><span class="badge high">Yüksek</span></div>
    </div>
    <div class="task-body">
      <p><strong>Ne işe yarar:</strong> B2B müşteri (fabrika satın alma yetkilisi, lojistik müdürü) LinkedIn üzerinden tedarikçi araştırır. ChatGPT, Perplexity gibi AI'lar LinkedIn'i otorite kaynak olarak görür.</p>
      <ol class="steps">
        <li>LinkedIn → "Şirket oluştur" → küçük işletme (1-50).</li>
        <li>Sektör: <em>Mühendislik &amp; İmalat</em>. Şirket büyüklüğü: <em>1-50 çalışan</em>.</li>
        <li>Logo, kapak (atölye fotosu), açıklama (Sanity'deki "Şirket hikayesi"nden kopyala).</li>
        <li>Eren kendi profilinden "Bu şirkette çalışıyorum" işaretlesin.</li>
        <li>Haftada 1 post: ürün vakası, sektörel haber yorumu, atölyeden anlık.</li>
        <li>URL'i <strong>Sanity → Sosyal Medya → LinkedIn</strong> alanına yapıştır.</li>
      </ol>
      <div class="task-sub">
        <div class="task-info"><div class="label">Zaman</div><div class="value">2 saat kurulum, haftada 30 dk içerik</div></div>
        <div class="task-info"><div class="label">Maliyet</div><div class="value">Ücretsiz</div></div>
      </div>
    </div>
  </div>

  <div class="task">
    <div class="task-head">
      <h3><span class="idx">3.3</span> YouTube kanalı</h3>
      <div class="badges"><span class="badge medium">Orta</span></div>
    </div>
    <div class="task-body">
      <p><strong>Ne işe yarar:</strong> "Hidrolik rampa nasıl çalışır" gibi Google aramalarında ilk sırada videolar çıkar. Müşteri bir markayı YouTube'da görürse, satın alma niyeti 4 kat artar.</p>
      <ol class="steps">
        <li>YouTube.com → Eren'in Gmail hesabıyla → "Kanal oluştur" → "Nova Rampa".</li>
        <li>İlk 3 video: <em>(1)</em> Atölyede 60 saniyelik kaynak süreci, <em>(2)</em> Tamamlanmış bir rampa kurulum timelapse, <em>(3)</em> Çorlu atölye turu (2 dk).</li>
        <li>Her video açıklamasına: ürün sayfası linki, telefon, web sitesi.</li>
        <li>URL'i <strong>Sanity → Sosyal Medya → YouTube</strong> alanına yapıştır.</li>
      </ol>
      <div class="task-sub">
        <div class="task-info"><div class="label">Zaman</div><div class="value">Video başına 1-2 saat çekim+edit</div></div>
        <div class="task-info"><div class="label">Maliyet</div><div class="value">Ücretsiz (CapCut ile edit)</div></div>
      </div>
    </div>
  </div>
</div>


<!-- ─── BÖLÜM 4: SEKTÖREL KAYITLAR ─── -->
<div class="section">
  <div class="section-head">
    <div class="section-num">04</div>
    <div class="section-title">
      <h2>Sektörel Kayıtlar &amp; B2B Rehberler</h2>
      <div class="meta">İlk 30 gün · Yüksek öncelik · Otorite backlink kaynakları</div>
    </div>
  </div>

  <div class="task">
    <div class="task-head">
      <h3><span class="idx">4.1</span> Tekirdağ Sanayi ve Ticaret Odası kaydı</h3>
      <div class="badges"><span class="badge high">Yüksek</span></div>
    </div>
    <div class="task-body">
      <p><strong>Ne işe yarar:</strong> Resmi kuruluş olarak görünürlük + tedarikçi/üretici listelerinde adın geçer. Backlink olarak Google'da güçlü authority sinyali.</p>
      <ol class="steps">
        <li>Tekirdağ TSO web sitesine git, üyelik bilgilerini güncelle.</li>
        <li>"Üye Firmalar Rehberi"nde Nova Rampa olarak listelendiğinden emin ol.</li>
        <li>İşletme açıklamasına "yükleme rampası imalatçısı" + Marmara/Türkiye geneli ekle.</li>
      </ol>
      <div class="task-sub">
        <div class="task-info"><div class="label">Zaman</div><div class="value">1 saat</div></div>
        <div class="task-info"><div class="label">Maliyet</div><div class="value">Üyelik aidatı var</div></div>
      </div>
    </div>
  </div>

  <div class="task">
    <div class="task-head">
      <h3><span class="idx">4.2</span> OSB (Organize Sanayi Bölgesi) rehberleri</h3>
      <div class="badges"><span class="badge high">Yüksek</span></div>
    </div>
    <div class="task-body">
      <p><strong>Ne işe yarar:</strong> Çorlu OSB, Çerkezköy OSB rehberlerinde tedarikçi olarak yer alınca, OSB'deki fabrikaların ilk başvuru adresisin. ChatGPT'ye "Çorlu OSB'de yükleme rampası firması" sorulduğunda da çıkarsın.</p>
      <ol class="steps">
        <li>OSB yönetimleriyle email/telefon: tedarikçi rehberinize kayıt olmak istiyoruz.</li>
        <li>Çorlu OSB · Çerkezköy OSB · İkitelli OSB · Gebze OSB · Sultanbeyli Sanayi Sitesi → en az 4 kayıt.</li>
        <li>Her kayıtta yöntemi: firma adı + web sitesi + ürün açıklaması + iletişim.</li>
      </ol>
      <div class="task-sub">
        <div class="task-info"><div class="label">Zaman</div><div class="value">3-4 saat</div></div>
        <div class="task-info"><div class="label">Maliyet</div><div class="value">Genellikle ücretsiz</div></div>
      </div>
    </div>
  </div>

  <div class="task">
    <div class="task-head">
      <h3><span class="idx">4.3</span> B2B Türkiye platformları</h3>
      <div class="badges"><span class="badge medium">Orta</span></div>
    </div>
    <div class="task-body">
      <p><strong>Ne işe yarar:</strong> İhracat ve yerel pazarda backlink + müşteri kaynağı. Bazıları ücretli ama temel listelemeler ücretsiz.</p>
      <ol class="steps">
        <li><strong>sanayi.gov.tr / Sanayi Veri Tabanı</strong> — ücretsiz, zorunlu.</li>
        <li><strong>turkiyeb2b.com</strong>, <strong>b2b.com.tr</strong> — temel kayıt ücretsiz.</li>
        <li>İhracat hedefi varsa: <strong>turkishexporter.net</strong>, <strong>made-in-turkey.com</strong>.</li>
        <li><strong>sektorel.com</strong>, <strong>biproje.com</strong> — yapı sektörü rehberleri.</li>
      </ol>
    </div>
  </div>

  <div class="task">
    <div class="task-head">
      <h3><span class="idx">4.4</span> Crunchbase &amp; LinkedIn yatırımcı profili</h3>
      <div class="badges"><span class="badge medium">Orta</span></div>
    </div>
    <div class="task-body">
      <p><strong>Ne işe yarar:</strong> AI motorları Crunchbase'i şirket bilgisi için kanonik kaynak olarak kullanır. Wikipedia için "notable" eşiği için de gerekli.</p>
      <ol class="steps">
        <li>crunchbase.com → "Add a company" → Nova Rampa.</li>
        <li>Kuruluş tarihi (2022), endüstri (Manufacturing), HQ Çorlu/Tekirdağ.</li>
        <li>Founder olarak Eren'in adını ekle, kısa biyografisi.</li>
      </ol>
    </div>
  </div>
</div>


<!-- ─── BÖLÜM 5: SANITY İÇERİĞİ ─── -->
<div class="section">
  <div class="section-head">
    <div class="section-num">05</div>
    <div class="section-title">
      <h2>Sanity'de İçerik Üretimi</h2>
      <div class="meta">İlk 6 hafta · Yüksek öncelik · Sürekli yenileme</div>
    </div>
  </div>

  <div class="task">
    <div class="task-head">
      <h3><span class="idx">5.1</span> Ürün FAQ'larını doldur (her ürün için 5-10 soru)</h3>
      <div class="badges"><span class="badge high">Yüksek</span></div>
    </div>
    <div class="task-body">
      <p><strong>Ne işe yarar:</strong> Her ürün sayfasında SSS bölümü hem ziyaretçi sorularını cevaplar, hem Google'da rich snippet çıkartır, hem AI'lara doğrudan cevap kaynağı olur.</p>
      <ol class="steps">
        <li>Studio → Ürünler → her ürünü tek tek aç.</li>
        <li>"Sıkça Sorulan Sorular" sekmesine 5-10 gerçek müşteri sorusu ve cevabını ekle.</li>
        <li>Örnek (Menteşeli için zaten 4 tane var, kalanları sen ekle): <em>"Beton çukur ne büyüklükte olmalı?", "Kaç ton kapasitede üretiyorsunuz?", "Montaj süresi?", "Bakım sıklığı?", "Yedek parça stok süresi?"</em></li>
      </ol>
      <div class="task-sub">
        <div class="task-info"><div class="label">Zaman</div><div class="value">Ürün başına 20-30 dk · toplam 3 saat</div></div>
        <div class="task-info"><div class="label">Etki</div><div class="value">Google rich snippet + AI extraction</div></div>
      </div>
    </div>
  </div>

  <div class="task">
    <div class="task-head">
      <h3><span class="idx">5.2</span> Atölye fotoğrafları çek + Sanity'ye yükle</h3>
      <div class="badges"><span class="badge high">Yüksek</span></div>
    </div>
    <div class="task-body">
      <p><strong>Ne işe yarar:</strong> Şu anda anasayfa "Atölye / Saha" bölümünde Unsplash stock fotoğrafları var. Gerçek atölye fotosu hem güveni hem otantikliği artırır. Müşteri "Bu hakikaten Çorlu'daki atölye" diye görür.</p>
      <ol class="steps">
        <li>Telefonla (12 MP üstü) yatay format 4 farklı fotoğraf çek: <strong>(1)</strong> Atölyede kaynak/üretim, <strong>(2)</strong> Hidrolik silindir yakın çekim, <strong>(3)</strong> Saha montajı, <strong>(4)</strong> Tamamlanmış teslim sahnesi.</li>
        <li>Studio → Site Ayarları → "Atölye Fotoğrafları" alanına yükle.</li>
        <li>Her fotoğrafa anlamlı "Alt Metin" yaz (Google görme engelliler ve SEO için): <em>"Çorlu atölyesinde hidrolik silindir montajı"</em></li>
      </ol>
      <div class="task-sub">
        <div class="task-info"><div class="label">Zaman</div><div class="value">1-2 saat (1 günlük atölye ziyareti)</div></div>
        <div class="task-info"><div class="label">Maliyet</div><div class="value">Ücretsiz (telefon kamera yeterli)</div></div>
      </div>
    </div>
  </div>

  <div class="task">
    <div class="task-head">
      <h3><span class="idx">5.3</span> Ürün galerisi: gerçek ürün fotoları</h3>
      <div class="badges"><span class="badge high">Yüksek</span></div>
    </div>
    <div class="task-body">
      <p><strong>Ne işe yarar:</strong> Müşteri ürünü görmek ister. Şu anda ürün sayfalarında resim yok. 7 ürün × 1-3 fotoğraf yeterli başlangıç için.</p>
      <ol class="steps">
        <li>Atölyede ve sahada her ürün tipinden net foto çek (gri/beyaz arkaplanlı tercih).</li>
        <li>Studio → Ürünler → ilgili ürün → "Ana Görsel" + "Galeri" alanlarına yükle.</li>
        <li>Alt metinleri unutma.</li>
      </ol>
      <div class="task-sub">
        <div class="task-info"><div class="label">Zaman</div><div class="value">Ürün başına 20 dk · toplam 2.5 saat</div></div>
      </div>
    </div>
  </div>

  <div class="task">
    <div class="task-head">
      <h3><span class="idx">5.4</span> Blog yazıları (haftada 1 hedef)</h3>
      <div class="badges"><span class="badge medium">Orta</span></div>
    </div>
    <div class="task-body">
      <p><strong>Ne işe yarar:</strong> Blog Google'da "uzun kuyruk" anahtar kelimelerinden trafik çeker. Yazı başına ayda ortalama 50-200 ziyaret + AI motorlarına bilgi kaynağı.</p>
      <p><strong>İlk 8 hafta için yazı önerileri:</strong></p>
      <ol class="steps">
        <li><em>"Yükleme Rampası Seçerken Dikkat Edilecek 10 Kritik Nokta"</em> — kapsamlı rehber, 1500 kelime.</li>
        <li><em>"Hidrolik Rampa vs Mobil Rampa: Hangisi Sizin İşletmeniz İçin?"</em> — karşılaştırma yazısı (mevcut /karsilastir sayfalarımızı destekler).</li>
        <li><em>"Soğuk Hava Deposu İçin Doğru Rampa Nasıl Seçilir?"</em> — sektörel.</li>
        <li><em>"EN 1398 Standardı: Yükleme Rampası Güvenlik Şartnamesi"</em> — teknik, AI'lar bayılır.</li>
        <li><em>"Yükleme Rampası Bakımı: Periyodik Kontrol Rehberi"</em> — HowTo schema ile (Sanity'de "Rehber Adımları" alanını doldur).</li>
        <li><em>"Konteyner Geçiş Rampası Nasıl Çalışır?"</em></li>
        <li><em>"İstanbul'da Yükleme Rampası Kurulumu: Süreç ve Maliyet Faktörleri"</em> — yerel SEO.</li>
        <li><em>"5 Soruda Yükleme Rampası Garanti Koşulları"</em> — pratik.</li>
      </ol>
      <div class="task-sub">
        <div class="task-info"><div class="label">Zaman</div><div class="value">Yazı başına 2-4 saat (kendin yazarsan)</div></div>
        <div class="task-info"><div class="label">Alternatif</div><div class="value">Freelance yazara 500-1000 TL/yazı</div></div>
      </div>
    </div>
  </div>

  <div class="task">
    <div class="task-head">
      <h3><span class="idx">5.5</span> Referans projelere vaka çalışması ekle</h3>
      <div class="badges"><span class="badge medium">Orta</span></div>
    </div>
    <div class="task-body">
      <p><strong>Ne işe yarar:</strong> Şu an 64 referans firma var ama sadece logo/isim. 4-5 tanesine kısa vaka çalışması eklersen, "X firma için yapılan rampa" örneği AI'lar tarafından alıntılanır.</p>
      <ol class="steps">
        <li>Studio → Referanslar → 4-5 büyük müşteri seç (Arçelik, Şişecam, Hayat Kimya gibi).</li>
        <li>"Proje Hikayesi" sekmesini aç: başlık, özet (1 paragraf), kurulan ürün, yıl, varsa foto.</li>
      </ol>
    </div>
  </div>
</div>


<!-- ─── BÖLÜM 6: AYLIK BAKIM ─── -->
<div class="section">
  <div class="section-head">
    <div class="section-num">06</div>
    <div class="section-title">
      <h2>Aylık Bakım Rutini</h2>
      <div class="meta">Her ayın 1'inde · Orta öncelik · ~1 saat</div>
    </div>
  </div>

  <div class="task">
    <div class="task-head">
      <h3><span class="idx">6.1</span> Search Console performans kontrolü</h3>
      <div class="badges"><span class="badge medium">Orta</span></div>
    </div>
    <div class="task-body">
      <ol class="steps">
        <li>Search Console → Performans → son 28 gün.</li>
        <li>"En çok gösterim alan sorgular" listesinde Nova Rampa adı geçen kelimeleri not et.</li>
        <li>"Sayfalar" sekmesinde hangi sayfalar en çok tıklanıyor, hangileri gösterilse de tıklanmıyor (CTR düşük → title/description geliştir).</li>
        <li>"Kapsam" → indexlenmemiş sayfaları kontrol et, varsa nedeni anla.</li>
      </ol>
    </div>
  </div>

  <div class="task">
    <div class="task-head">
      <h3><span class="idx">6.2</span> Google Maps yorum sayısı</h3>
      <div class="badges"><span class="badge medium">Orta</span></div>
    </div>
    <div class="task-body">
      <ol class="steps">
        <li>Business Profile → "İncelemeler" sekmesi.</li>
        <li>Yeni gelmiş yorumları yanıtla.</li>
        <li>Bu ay yeni 3-5 review hedefi → eski müşterilere hatırlat.</li>
      </ol>
    </div>
  </div>

  <div class="task">
    <div class="task-head">
      <h3><span class="idx">6.3</span> Sanity Studio'ya yeni içerik gir</h3>
      <div class="badges"><span class="badge medium">Orta</span></div>
    </div>
    <div class="task-body">
      <ol class="steps">
        <li>Bu ayki yeni blog yazısını yayınla.</li>
        <li>Tamamlanan büyük projeyi referans olarak ekle.</li>
        <li>Yeni sektör/şehir hizmet alanına girdiysek ekle.</li>
      </ol>
    </div>
  </div>
</div>


<!-- ─── ÖZET TABLO + FİNAL ─── -->
<div class="section">
  <div class="section-head">
    <div class="section-num">07</div>
    <div class="section-title">
      <h2>Özet: 90 Günlük Plan</h2>
      <div class="meta">Önceliklendirilmiş yol haritası</div>
    </div>
  </div>

  <table class="summary-table">
    <thead>
      <tr>
        <th style="width: 12%;">Hafta</th>
        <th style="width: 50%;">Yapılacak</th>
        <th style="width: 18%;">Süre</th>
        <th style="width: 20%;">Sonuç</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1-2</strong></td>
        <td>Google Search Console + GA4 + 2 Google Business Profile başvurusu (1.1-1.4)</td>
        <td>4-5 saat</td>
        <td>Veri toplama başlar</td>
      </tr>
      <tr>
        <td><strong>3-4</strong></td>
        <td>Instagram + LinkedIn açılışı, ilk 9 post (3.1, 3.2)</td>
        <td>8 saat</td>
        <td>Sosyal kanıt</td>
      </tr>
      <tr>
        <td><strong>5-6</strong></td>
        <td>Atölye fotoları + ürün fotoları çek, Sanity'ye yükle (5.2, 5.3)</td>
        <td>5-6 saat</td>
        <td>Site güveni ↑</td>
      </tr>
      <tr>
        <td><strong>7-8</strong></td>
        <td>OSB + Sanayi Odası rehberlerine kayıt (4.1, 4.2)</td>
        <td>5 saat</td>
        <td>Backlink kazanımı</td>
      </tr>
      <tr>
        <td><strong>9-10</strong></td>
        <td>Tüm ürünlere FAQ ekle (5.1) + İlk 2 blog yazısı (5.4)</td>
        <td>8 saat</td>
        <td>AI &amp; Google'da içerik</td>
      </tr>
      <tr>
        <td><strong>11-12</strong></td>
        <td>YouTube ilk 3 video, eski müşterilere review isteği (3.3, 2.1)</td>
        <td>6-8 saat</td>
        <td>İlk 10-15 Google review</td>
      </tr>
      <tr>
        <td colspan="2"><strong>TOPLAM (3 ay)</strong></td>
        <td><strong>~36 saat</strong></td>
        <td><strong>Yaklaşık 5 günlük iş, ayda 12 saat</strong></td>
      </tr>
    </tbody>
  </table>

  <div class="final-cta">
    <h3>3 ay sonra ne bekle?</h3>
    <p>
      Google'da "Çorlu yükleme rampası", "İstanbul hidrolik rampa", "fabrika rampa imalatçısı" gibi
      yerel arama kelimelerinde ilk sayfa görünürlük. ChatGPT/Claude/Perplexity'ye sorulduğunda
      Nova Rampa'nın ürün ve hizmet bilgileri direkt cevap kaynağı olarak gösterilir.
    </p>
    <p>
      6-12 ay sonra: bilinçli marka aramalarında lider konum + organik trafik aylık 2.000-5.000
      ziyarete çıkması olası.
    </p>
    <p style="margin-top: 14px;">
      <strong>Vazgeçilmez kural:</strong> Bu liste tek seferlik değil — sürekli takip gerektirir.
      Aylık 4-6 saat ayırarak rakiplerinden ayrış. 0 saat ayırırsan kod ne kadar iyi olursa olsun
      rakipler öne geçer.
    </p>
  </div>
</div>

</body>
</html>`;

async function main() {
  console.log("📝 HTML hazırlandı, PDF üretiliyor...");
  writeFileSync(TMP_HTML, HTML, "utf-8");

  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });
  try {
    const page = await browser.newPage();
    const fileUrl = "file://" + TMP_HTML.replace(/\\/g, "/");
    await page.goto(fileUrl, { waitUntil: "networkidle" });
    await page.pdf({
      path: OUT_PATH,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });
    console.log(`✅ Oluşturuldu: ${OUT_PATH}`);
    if (existsSync(OUT_PATH)) {
      const size = (await import("node:fs")).statSync(OUT_PATH).size;
      console.log(`   Boyut: ${(size / 1024).toFixed(1)} KB`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("❌ Hata:", err.message);
  process.exit(1);
});
