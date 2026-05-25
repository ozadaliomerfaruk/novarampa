# Nova Rampa — Web Sitesi

Nova Rampa (novarampa.com) için modern, SEO/GEO uyumlu kurumsal web sitesi.

## Stack

- **Framework**: Next.js 16 (App Router) + TypeScript + React 19
- **Styling**: Tailwind CSS v4 + shadcn/ui (neutral base)
- **Animasyon**: Framer Motion + Lenis (smooth scroll)
- **CMS / Admin Panel**: Sanity Studio (gömülü, `/studio` yolunda)
- **Form**: React Hook Form + Zod
- **Mail**: Resend
- **Analytics**: Vercel Analytics + Speed Insights
- **Hosting**: Vercel (frontend) + Hostinger (domain & mail)

## Kurulum

```bash
npm install
cp .env.local.example .env.local
# .env.local içine Sanity projectId ve Resend API key gir
npm run dev
```

Sanity projesi oluşturmak için:

```bash
npx sanity@latest init --bare
# Çıktıdaki projectId'yi .env.local dosyasındaki NEXT_PUBLIC_SANITY_PROJECT_ID'ye yapıştır
```

## Klasör Yapısı

```
src/
├── app/                    # Next.js App Router sayfaları
│   ├── (site)/             # Public site sayfaları
│   ├── studio/             # Sanity Studio (admin panel)
│   ├── api/                # Form API endpointleri
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── manifest.ts
│   └── layout.tsx          # Root layout (font, metadata)
├── components/
│   ├── ui/                 # shadcn/ui ham bileşenler
│   ├── layout/             # Header, Footer
│   ├── home/               # Anasayfa bölümleri
│   ├── brand/              # Logo, marka öğeleri
│   └── seo/                # Structured data (JSON-LD)
├── lib/
│   ├── site-config.ts      # Şirket bilgileri, marka kimliği
│   ├── products.ts         # Ürün kategorileri (statik)
│   ├── services.ts         # Hizmet bölgeleri + müşteri segmentleri
│   ├── references.ts       # Referans firma listesi
│   └── utils.ts            # cn(), formatPhone() vb.
└── sanity/
    ├── env.ts              # Sanity environment değişkenleri
    ├── lib/                # Sanity client + image URL builder + queries
    ├── schemaTypes/        # İçerik şemaları (ürün, blog, referans, vb.)
    └── structure.ts        # Sanity Studio sol menü düzeni
```

## Eren'in Yöneteceği Yer: `/studio`

Site canlıya alındıktan sonra Eren `novarampa.com/studio` adresine girip:

- 🆕 Ürün ekler/çıkarır, kapasite ve özellikleri günceller
- 📝 Blog yazılar
- 🏆 Referans firmaları (logo ile) yükler
- 🔧 Yedek parça kataloğunu yönetir
- 📨 Teklif ve servis taleplerini takip eder

## Komutlar

| Komut | İşlev |
|---|---|
| `npm run dev` | Geliştirme sunucusunu başlatır (`http://localhost:3000`) |
| `npm run build` | Production build üretir |
| `npm run start` | Production build'i çalıştırır |
| `npm run lint` | ESLint kontrolü |

## Deployment

1. **GitHub'a push** edilen her commit Vercel'de otomatik deploy edilir.
2. Vercel dashboard'da environment değişkenlerini (Sanity, Resend) ayarlayın.
3. `novarampa.com` Hostinger DNS panelinden Vercel'in IP/CNAME'ine yönlendirilir.
4. Mail (info@novarampa.com) Hostinger'da kalmaya devam eder — DNS MX kayıtlarına dokunulmaz.

## Tasarım Kuralları

- **Renkler**: Siyah arka plan (`--brand-black`), turuncu vurgu (`--brand-orange`), beyaz yazı.
- **Font**: Inter (body) + Space Grotesk (heading).
- **Animasyon**: Yumuşak ve performansa öncelik. Mobilde reduced-motion'a saygı.
- **Fiyat görünmez**: Hiçbir sayfada ürün fiyatı gösterilmez (Eren'in tercihi).

## Lisans

Özel proje. Tüm hakları Nova Rampa'ya aittir.
