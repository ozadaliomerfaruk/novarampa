export const siteConfig = {
  name: "Nova Rampa",
  legalName: "Nova Rampa",
  url: "https://novarampa.com",
  title: "Nova Rampa | Yükleme Rampası İmalatı — Marmara ve Türkiye Geneli",
  description:
    "Hidrolik yükleme rampası, teleskopik rampa, mobil rampa imalatı. CE & TSE belgeli, EN 1398 uyumlu. Marmara bölgesi ve Türkiye geneline imalat ve sevkiyat.",
  keywords: [
    "yükleme rampası",
    "yükleme rampası imalatı",
    "hidrolik rampa",
    "teleskopik rampa",
    "mobil rampa",
    "seyyar rampa",
    "dikey yükleme rampası",
    "gömme rampa",
    "konteyner geçiş rampası",
    "CE belgeli rampa",
    "EN 1398",
    "İstanbul yükleme rampası",
    "Kocaeli yükleme rampası",
    "Bursa yükleme rampası",
    "Çorlu yükleme rampası",
    "Tekirdağ yükleme rampası",
    "Marmara yükleme rampası",
    "fabrika rampası",
    "depo rampası",
    "soğuk hava deposu rampası",
  ],
  ogImage: "/og-image.jpg",
} as const;

export const company = {
  name: "Nova Rampa",
  brand: "NOVARAMPA",
  founded: 2022,
  heritageSince: 2003, // Dinamik Mühendislik'ten gelen miras
  slogan: "Geçmişin gücüyle, yükünüzü hafifletiyoruz.",
  shortPitch:
    "Yirmi yıllık ustalığın üzerine inşa edilen yeni nesil yükleme rampası markası.",

  story: `NOVARAMPA, köklü bir ustalığın üzerine inşa edilen yeni nesil bir vizyonun adıdır.
Temelleri, yıllar önce Dinamik Mühendislik çatısı altında atıldı. Sahada kazanılan tecrübe,
her montajda verilen emek, atölyenin sesi, demirin kokusu — bu mesleği bizim için sadece bir iş
olmaktan çıkarıp bir tutkuya dönüştürdü.

"NOVA" yeniliği temsil eder; "RAMPA" ise yolun başladığı yeri, köklerimizi ve yıllardır
değişmeyen işimizi. Misyonumuz, geçmişin deneyimini geleceğin ihtiyaçlarıyla buluşturmak ve
her projede daha sağlam, daha verimli ve sürdürülebilir çözümler üretmektir.`,

  contact: {
    email: "info@novarampa.com",
    phone: "+905348676693",
    phoneDisplay: "+90 534 867 6693",
    whatsapp: "+905348676693",
    whatsappLink: "https://wa.me/905348676693",
  },

  workingHours: [
    { day: "Pazartesi – Cuma", hours: "09:00 – 18:00" },
    { day: "Cumartesi", hours: "09:00 – 12:00" },
    { day: "Pazar", hours: "Kapalı" },
  ],

  locations: [
    {
      type: "workshop" as const,
      label: "Atölye",
      addressLine1: "Zafer Mahallesi, Bakım Onarım 3. Sokak No:12",
      city: "Çorlu",
      district: "Tekirdağ",
      country: "Türkiye",
      // Yaklaşık koordinatlar (Google Maps için)
      lat: 41.156,
      lng: 27.804,
    },
    {
      type: "office" as const,
      label: "Ofis",
      addressLine1: "Mimar Sinan Mahallesi, Basra Caddesi, Hazım Sokak No:2A",
      city: "Sultanbeyli",
      district: "İstanbul",
      country: "Türkiye",
      lat: 40.969,
      lng: 29.27,
    },
  ],

  socials: {
    // Henüz aktif değil — sonradan doldurulacak
    instagram: "",
    linkedin: "",
    youtube: "",
    facebook: "",
  },

  certifications: ["CE", "TSE", "EN 1398 uyumlu"],
  warrantyYears: 2,
  warrantyNote: "Yalnızca imalat hatalarını kapsar.",
} as const;

export type Location = (typeof company.locations)[number];
