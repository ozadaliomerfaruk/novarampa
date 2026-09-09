"use client";

import type { CSSProperties } from "react";

/**
 * Eren için hızlı kullanım rehberi — Studio sol menüsünde
 * "❓ Nereden Başlamalıyım?" tıklandığında bu component gösterilir.
 *
 * Sanity'nin kendi UI sistemine bağımlı değil — plain JSX + inline style.
 */
export function HelpComponent() {
  const wrapStyle: CSSProperties = {
    maxWidth: 820,
    margin: "0 auto",
    padding: "40px 28px 80px",
    color: "var(--card-fg-color, #111)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  };

  return (
    <div style={wrapStyle}>
      {/* Başlık */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Nova Rampa İçerik Paneline Hoş Geldin Eren 👋
        </h1>
        <p
          style={{
            marginTop: 12,
            color: "var(--card-muted-fg-color, #666)",
            fontSize: 15,
            lineHeight: 1.6,
          }}
        >
          Bu panelden sitenin tüm içeriklerini değiştirebilirsin. Bilgisayar
          bilgisi gerekmez — formları doldur, sağ üstte &quot;Publish&quot;
          tuşuna bas, 30 saniye içinde site güncellenir.
        </p>
      </div>

      {/* GÜNLÜK İŞLER */}
      <Section
        badge="Günlük"
        badgeColor="#F97316"
        title="En sık yapacağın 3 iş"
      >
        <Step
          n="1"
          title="📨 Gelen Talepleri kontrol et"
          detail="Sol menüde 'Teklif Talepleri', 'Servis Talepleri' ve 'Yedek Parça Talepleri' — yeni gelenler 🆕 etiketli. Durumlarını güncelle (📞 Aranıyor → 📨 Teklif gönderildi → ✅ Kazanıldı). Sağ alanda dahili notlar tutabilirsin."
        />
        <Step
          n="2"
          title="⭐ Referans / Proje ekle"
          detail="Yeni bir kurulum tamamladığında: 'Referanslar' → 'Create new' → firma adı, sektör, logo yükle. Logo Boyutu (%) ile logonun görünür büyüklüğünü ayarlayabilirsin. Özgün renkli ve açık zemine uygun logo kullan."
        />
        <Step
          n="3"
          title="✍️ Blog yazısı yayınla"
          detail="SEO için altın değerinde. 'Blog Yazıları' → 'Create new' → başlık, kapak görseli, gövde. Üst toolbar'dan kalın/italik/liste ekle. Yayın tarihini istediğin tarihe ayarlayabilirsin."
        />
      </Section>

      {/* HAFTALIK */}
      <Section badge="Haftalık" badgeColor="#142235" title="Ara sıra güncelle">
        <Step
          n="•"
          title="🏠 Anasayfa İçeriği → Site Ayarları"
          detail="Hero başlığı, slogan, arka plan videosu, atölye fotoğrafları, adresler ve SSS soruları burada. Metin değişikliklerinden sonra Yayınla düğmesine bas."
        />
        <Step
          n="•"
          title="📝 Anasayfa İçeriği → Sayfa Metinleri"
          detail="Hakkımızda metni, ana sayfa bölüm başlıkları, Neden Novarampa kutucukları, sayfa açıklamaları ve footer üstü teklif kutucukları. İlgili sekmeyi açıp metni düzenle; Hakkımızda paragrafları arasına bir boş satır bırak."
        />
        <Step
          n="•"
          title="📦 Ürün bilgilerini güncel tut"
          detail="Yeni kapasite eklendiğinde, ölçü değiştiğinde veya FAQ eklenmesi gerektiğinde 'Ürünler' → ilgili ürünü düzenle."
        />
      </Section>

      {/* İPUÇLARI */}
      <Section
        badge="İpuçları"
        badgeColor="#9B7100"
        title="Bilmen gereken kısayollar"
      >
        <Tip
          emoji="✅"
          text="Her değişiklikten sonra sağ üstte 'Publish' (Yayınla) butonuna bas. Aksi halde site eski içeriği gösterir."
        />
        <Tip
          emoji="↩️"
          text="Yanlışlık yaptıysan endişelenme — sağ üstteki 'History' (geçmiş) ikonundan eski versiyona dönebilirsin."
        />
        <Tip
          emoji="📸"
          text="Fotoğraf eklerken: net, ışıklı, ürünü tek başına gösteren kareleri tercih et. JPG/PNG, min 1200px genişlik."
        />
        <Tip
          emoji="⏱️"
          text="Yayınlanan değişikliklerin görünmesi önbellek nedeniyle yaklaşık bir dakika sürebilir. Hemen göremezsen sayfayı yenile (Ctrl+R)."
        />
        <Tip
          emoji="🔒"
          text="Şifren veya hesap erişimin değişirse Ömer Faruk'a yaz — ben hallederim."
        />
      </Section>

      {/* MENÜ AÇIKLAMA */}
      <Section title="Sol menü neye yarıyor?">
        <MenuRow
          label="🏠 Anasayfa İçeriği"
          detail="Site Ayarları: video, fotoğraf, adres ve SSS. Sayfa Metinleri: başlıklar, açıklamalar, Hakkımızda ve teklif kutucukları"
        />
        <MenuRow
          label="📦 Ürünler"
          detail="Her ürün ayrı bir kart. /urunler sayfasında ve anasayfa vitrinde listelenir"
        />
        <MenuRow
          label="🔧 Yedek Parçalar"
          detail="/yedek-parca sayfasındaki parça kataloğu. Stok durumunu açıp kapatabilirsin"
        />
        <MenuRow
          label="⭐ Referanslar"
          detail="Referans firmalar. Logo, firma adı, sektör ve logo boyutu"
        />
        <MenuRow
          label="✍️ Blog Yazıları"
          detail="/blog sayfası ve SEO için önemli yazılar"
        />
        <MenuRow
          label="📨 Teklif / 🛠️ Servis / ⚙️ Yedek Parça Talepleri"
          detail="Site formlarından gelen müşteri talepleri. Durum takibi burada"
        />
      </Section>
    </div>
  );
}

// ─── Yardımcı componentler ───

function Section({
  badge,
  badgeColor,
  title,
  children,
}: {
  badge?: string;
  badgeColor?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        marginTop: 24,
        padding: 24,
        borderRadius: 12,
        border: "1px solid var(--card-border-color, #ddd)",
        background: "var(--card-bg-color, #fff)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
        }}
      >
        {badge && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#fff",
              background: badgeColor,
              padding: "3px 9px",
              borderRadius: 999,
            }}
          >
            {badge}
          </span>
        )}
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{title}</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {children}
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  detail,
}: {
  n: string;
  title: string;
  detail: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
      <div
        style={{
          minWidth: 30,
          height: 30,
          borderRadius: "50%",
          background: "var(--card-muted-fg-color, #ebebeb)",
          color: "var(--card-bg-color, #fff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        {n}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
          {title}
        </div>
        <div
          style={{
            fontSize: 13,
            lineHeight: 1.55,
            color: "var(--card-muted-fg-color, #666)",
          }}
        >
          {detail}
        </div>
      </div>
    </div>
  );
}

function Tip({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
      <span style={{ fontSize: 16 }}>{emoji}</span>
      <span style={{ fontSize: 13, lineHeight: 1.55 }}>{text}</span>
    </div>
  );
}

function MenuRow({ label, detail }: { label: string; detail: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
      <div
        style={{
          minWidth: 200,
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      <div
        style={{
          flex: 1,
          fontSize: 13,
          lineHeight: 1.55,
          color: "var(--card-muted-fg-color, #666)",
        }}
      >
        {detail}
      </div>
    </div>
  );
}
