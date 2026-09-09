import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

/**
 * Tek belge: site geneli içerik ayarları.
 * Sol menüden "Site Ayarları"na tıklayarak ulaşılır.
 * Bu belgedeki her değişiklik 30 saniye içinde canlıya yansır.
 */
export const settingsType = defineType({
  name: "settings",
  title: "Site Ayarları",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "hero", title: "Anasayfa — Üst Bölüm", default: true },
    { name: "brand", title: "🎨 Logo & Marka" },
    { name: "contact", title: "📞 İletişim" },
    { name: "locations", title: "📍 Konumlar" },
    { name: "hours", title: "⏰ Çalışma Saatleri" },
    { name: "socials", title: "📱 Sosyal Medya" },
    { name: "workshop", title: "Atölye Fotoları" },
    { name: "timeline", title: "Marka Tarihçesi" },
    { name: "featured", title: "Vitrin Ürünleri" },
    { name: "faqs", title: "❓ Sıkça Sorulan Sorular" },
    { name: "announcement", title: "Duyuru Bandı" },
  ],
  fields: [
    // ─── HERO (Üst Bölüm) ───
    defineField({
      name: "heroTitle",
      title: "Anasayfa Başlık (H1)",
      description: "Site açıldığında en büyük yazı. Örn: 'NOVARAMPA'",
      type: "string",
      group: "hero",
      validation: (r) => r.max(120),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Anasayfa Alt Başlık (Slogan)",
      description:
        "Başlığın altındaki slogan. Örn: 'Geçmişin Gücüyle, Yükünüzü Hafifletiyoruz...'",
      type: "text",
      rows: 3,
      group: "hero",
      validation: (r) => r.max(300),
    }),
    defineField({
      name: "heroCtaLabel",
      title: "Buton Yazısı",
      description:
        "Anasayfadaki turuncu butonun yazısı. Genelde 'Teklif Al' veya 'Hemen Teklif Al' yazıyor.",
      type: "string",
      group: "hero",
      initialValue: "Teklif Al",
      validation: (r) => r.max(30),
    }),
    defineField({
      name: "heroVideo",
      title: "Anasayfa Arka Plan Video (mp4)",
      description:
        "İsteğe bağlı. Yüklerseniz hero'nun arka planı bu video olur, yüklemezseniz varsayılan video gösterilir. Maks. 5MB, 10-20 saniye loop önerilir. Mute & otomatik oynar.",
      type: "file",
      options: { accept: "video/mp4" },
      group: "hero",
    }),

    // ─── WORKSHOP PHOTOS (Atölyeden Fotoğraflar) ───
    defineField({
      name: "workshopPhotos",
      title: "Atölye Fotoğrafları (4 adet)",
      description:
        "Anasayfadaki Atölye bölümünün dört fotoğrafı. Başlığı Sayfa Metinleri bölümünden düzenleyebilirsiniz; fotoğraf üzerindeki yazılar gösterilmez.",
      type: "array",
      group: "workshop",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Metin (görme engelliler için)",
              description:
                "Fotoğrafta ne olduğunu kısa anlatın. Örn: 'Atölyede kaynak çalışması — kıvılcımlar uçuşuyor'",
              type: "string",
              validation: (r) => r.required(),
            },
            {
              name: "caption",
              title: "Sahne Başlığı",
              description:
                "Eski içerik notu. Fotoğraf üzerinde gösterilmez; erişilebilir açıklama için Alt Metin alanını kullanın.",
              type: "string",
            },
          ],
        },
      ],
      validation: (r) => r.length(4).warning("Tam 4 fotoğraf önerilir."),
    }),

    // ─── BRAND TIMELINE ───
    defineField({
      name: "brandTimeline",
      title: "Marka Tarihçesi (Dönüm Noktaları)",
      description:
        "Anasayfada 'Brand Timeline' bölümü için. Şirketin önemli adımlarını yıl bazlı listele. Örn: 2003 → Dinamik Mühendislik kuruldu; 2022 → Nova Rampa markası doğdu.",
      type: "array",
      group: "timeline",
      of: [
        {
          type: "object",
          name: "milestone",
          fields: [
            {
              name: "year",
              title: "Yıl",
              type: "number",
              validation: (r) => r.required().min(1990).max(2100),
            },
            {
              name: "title",
              title: "Başlık",
              description: "Kısa başlık. Örn: 'Dinamik Mühendislik kuruldu'",
              type: "string",
              validation: (r) => r.required(),
            },
            {
              name: "description",
              title: "Açıklama (opsiyonel)",
              type: "text",
              rows: 2,
            },
          ],
          preview: {
            select: { title: "title", subtitle: "year" },
            prepare: ({ title, subtitle }) => ({
              title: `${subtitle} — ${title}`,
            }),
          },
        },
      ],
    }),

    // ─── FEATURED PRODUCTS ───
    defineField({
      name: "featuredProducts",
      title: "Vitrindeki Ürünler",
      description:
        "Anasayfada öne çıkarılan ürünler. Maks 4 ürün seçin — listenin sırası vitrindeki sıra olur. Boş bırakılırsa tüm ürünler sırasıyla gösterilir.",
      type: "array",
      group: "featured",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      validation: (r) => r.max(4),
    }),

    // ─── LOGO & BRAND ───
    defineField({
      name: "logo",
      title: "Site Logosu",
      description:
        "Header'da ve footer'da gözüken ana logo. Boş bırakırsanız varsayılan logo (kod dosyasındaki SVG) kullanılır. Yatay format önerilir (örn 1260×380 px).",
      type: "image",
      group: "brand",
      options: { hotspot: false, accept: "image/svg+xml,image/png,image/webp" },
      fields: [
        {
          name: "alt",
          title: "Alt Metin",
          type: "string",
          initialValue: "Nova Rampa",
        },
      ],
    }),
    defineField({
      name: "companyName",
      title: "Şirket Adı",
      description:
        "Footer copyright satırında ve resmi yerlerde gözüken tam ad. Örn: 'Nova Rampa'",
      type: "string",
      group: "brand",
      initialValue: "Nova Rampa",
    }),
    defineField({
      name: "tagline",
      title: "Slogan / Kısa Tanım",
      description:
        "Footer'da logonun altında ve sosyal medya paylaşımlarında gözüken kısa cümle. Örn: 'Yirmi yıllık ustalığın üzerine inşa edilen yeni nesil yükleme rampası markası.'",
      type: "text",
      group: "brand",
      rows: 2,
      validation: (r) => r.max(280),
    }),

    // ─── CONTACT INFO ───
    defineField({
      name: "contact",
      title: "İletişim Bilgileri",
      description:
        "Header, footer ve iletişim sayfasında gözüken bilgiler. Buradan değiştirdiğin her şey site genelinde otomatik güncellenir.",
      type: "object",
      group: "contact",
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: "phone",
          title: "Telefon (uluslararası format)",
          description:
            "Click-to-call için kullanılır. Boşluksuz, başında '+' olacak şekilde. Örn: +905348676693",
          type: "string",
          validation: (r) =>
            r
              .regex(/^\+\d{8,15}$/)
              .warning("Boşluksuz, başında '+' olmalı. Örn: +905348676693"),
        },
        {
          name: "phoneDisplay",
          title: "Telefon (gösterim formatı)",
          description:
            "Ekranda gözüken format. İnsanın okuyabileceği şekilde. Örn: +90 534 867 6693",
          type: "string",
        },
        {
          name: "email",
          title: "E-posta Adresi",
          description: "Örn: info@novarampa.com",
          type: "string",
          validation: (r) =>
            r
              .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
              .warning("Geçerli bir e-posta adresi girin."),
        },
        {
          name: "whatsapp",
          title: "WhatsApp Numarası",
          description:
            "wa.me linki için. Telefon ile aynı olabilir. Boşluksuz, başında '+' olmadan. Örn: 905348676693",
          type: "string",
        },
      ],
    }),

    // ─── LOCATIONS ───
    defineField({
      name: "locations",
      title: "Konumlar (Atölye, Ofis, Şubeler)",
      description:
        "Footer ve İletişim sayfasında gözüken adresler. Atölye + Ofis için 2 konum yeterli, yeni şube açılırsa ekleyebilirsin.",
      type: "array",
      group: "locations",
      of: [
        {
          type: "object",
          name: "location",
          fields: [
            {
              name: "label",
              title: "Etiket",
              description:
                "Bu konumun ne olduğu. Örn: 'Atölye', 'Ofis', 'Showroom', 'İzmir Şube'",
              type: "string",
              validation: (r) => r.required().max(40),
            },
            {
              name: "type",
              title: "Tip",
              description: "Yer tipi (gösterimde ikon farkı için).",
              type: "string",
              options: {
                list: [
                  { value: "workshop", title: "🏗️ Atölye / Üretim" },
                  { value: "office", title: "💼 Ofis" },
                  { value: "showroom", title: "🏬 Showroom" },
                  { value: "warehouse", title: "📦 Depo" },
                ],
              },
              initialValue: "office",
            },
            {
              name: "addressLine1",
              title: "Adres",
              description:
                "Tam adres. Örn: 'Zafer Mahallesi, Bakım Onarım 3. Sokak No:12'",
              type: "string",
              validation: (r) => r.required(),
            },
            {
              name: "city",
              title: "İlçe",
              description: "Örn: 'Çorlu', 'Sultanbeyli'",
              type: "string",
              validation: (r) => r.required(),
            },
            {
              name: "district",
              title: "İl",
              description: "Örn: 'Tekirdağ', 'İstanbul'",
              type: "string",
              validation: (r) => r.required(),
            },
            {
              name: "googleMapsUrl",
              title: "Google Maps Linki (opsiyonel)",
              description:
                "Adresi Google Maps'te aç, 'Paylaş' → 'Bağlantıyı kopyala' yapıştır. Yer üstüne tıklanınca haritada açılır.",
              type: "url",
              validation: (r) => r.uri({ scheme: ["http", "https"] }).warning(),
            },
          ],
          preview: {
            select: {
              title: "label",
              city: "city",
              district: "district",
              type: "type",
            },
            prepare: ({ title, city, district, type }) => {
              const icon =
                type === "workshop"
                  ? "🏗️"
                  : type === "showroom"
                    ? "🏬"
                    : type === "warehouse"
                      ? "📦"
                      : "💼";
              return {
                title: `${icon} ${title}`,
                subtitle: city && district ? `${city} / ${district}` : "",
              };
            },
          },
        },
      ],
    }),

    // ─── WORKING HOURS ───
    defineField({
      name: "workingHours",
      title: "Çalışma Saatleri",
      description:
        "Footer içinde listelenir. Her satır bir gün/aralık. Örn: 'Pazartesi – Cuma' → '09:00 – 18:00'",
      type: "array",
      group: "hours",
      of: [
        {
          type: "object",
          name: "hoursRow",
          fields: [
            {
              name: "day",
              title: "Gün(ler)",
              description:
                "Örn: 'Pazartesi – Cuma', 'Cumartesi', 'Pazar', 'Resmi Tatiller'",
              type: "string",
              validation: (r) => r.required(),
            },
            {
              name: "hours",
              title: "Saat Aralığı",
              description: "Örn: '09:00 – 18:00', 'Kapalı', 'Randevulu'",
              type: "string",
              validation: (r) => r.required(),
            },
          ],
          preview: {
            select: { title: "day", subtitle: "hours" },
          },
        },
      ],
    }),

    // ─── SOCIAL MEDIA ───
    defineField({
      name: "socials",
      title: "Sosyal Medya Hesapları",
      description:
        "Footer'da, iletişim sayfasında gözüken sosyal medya ikonları. Boş bıraktıkların gözükmez — sadece doldurduklarını gösteririz.",
      type: "object",
      group: "socials",
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: "instagram",
          title: "Instagram URL",
          description: "Tam adres yazın. Örn: https://instagram.com/novarampa",
          type: "url",
          validation: (r) => r.uri({ scheme: ["http", "https"] }).warning(),
        },
        {
          name: "linkedin",
          title: "LinkedIn URL",
          description:
            "Şirket sayfası tam adresi. Örn: https://linkedin.com/company/novarampa",
          type: "url",
          validation: (r) => r.uri({ scheme: ["http", "https"] }).warning(),
        },
        {
          name: "youtube",
          title: "YouTube URL",
          description: "Kanal adresi. Örn: https://youtube.com/@novarampa",
          type: "url",
          validation: (r) => r.uri({ scheme: ["http", "https"] }).warning(),
        },
        {
          name: "facebook",
          title: "Facebook URL",
          description: "Sayfa adresi. Örn: https://facebook.com/novarampa",
          type: "url",
          validation: (r) => r.uri({ scheme: ["http", "https"] }).warning(),
        },
        {
          name: "twitter",
          title: "Twitter / X URL",
          description: "Örn: https://x.com/novarampa",
          type: "url",
          validation: (r) => r.uri({ scheme: ["http", "https"] }).warning(),
        },
        {
          name: "tiktok",
          title: "TikTok URL",
          description: "Örn: https://tiktok.com/@novarampa",
          type: "url",
          validation: (r) => r.uri({ scheme: ["http", "https"] }).warning(),
        },
      ],
    }),

    // ─── HOMEPAGE FAQ ───
    defineField({
      name: "homeFaqs",
      title: "Anasayfa SSS (Sıkça Sorulan Sorular)",
      description:
        "Anasayfada gösterilen genel sorular ve cevaplar. SSS bölüm başlığı ve açıklaması Sayfa Metinleri içindeki Ana sayfa sekmesindedir.",
      type: "array",
      group: "faqs",
      of: [
        {
          type: "object",
          name: "homeFaq",
          fields: [
            {
              name: "question",
              title: "Soru",
              description:
                "Müşterinin tipik soracağı şekilde yaz. Örn: 'Yükleme rampası seçerken nelere dikkat etmeli?'",
              type: "string",
              validation: (r) => r.required().max(160),
            },
            {
              name: "answer",
              title: "Cevap",
              description:
                "Net, kısa, doğrudan cevap. AI motorları kısa cevapları daha çok kullanır. 2-4 cümle önerilir.",
              type: "text",
              rows: 4,
              validation: (r) => r.required().max(600),
            },
          ],
          preview: {
            select: { title: "question", subtitle: "answer" },
          },
        },
      ],
    }),

    // ─── ANNOUNCEMENT BAR ───
    defineField({
      name: "announcement",
      title: "Üst Duyuru Bandı",
      description:
        "Header'ın üstünde çıkan ince duyuru çubuğu. Yeni ürün, kampanya, fuar gibi geçici haberler için. 'Aktif'i kapatırsan duyuru gözükmez.",
      type: "object",
      group: "announcement",
      fields: [
        {
          name: "enabled",
          title: "Aktif",
          description: "Açıkken duyuru gözükür, kapalıyken gizlenir.",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "text",
          title: "Duyuru Metni",
          description: "Örn: 'Yeni atölyemiz Çorlu OSB'de açıldı — Ekim 2026'",
          type: "string",
        },
        {
          name: "link",
          title: "Bağlantı (opsiyonel)",
          description:
            "Duyuruya tıklayınca gidilecek sayfa. Boş bırakılırsa tıklanmaz.",
          type: "url",
          validation: (r) =>
            r.uri({ scheme: ["http", "https", "/"], allowRelative: true }),
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Ayarları",
        subtitle: "Anasayfa, iletişim, marka ve duyurular",
      };
    },
  },
});
