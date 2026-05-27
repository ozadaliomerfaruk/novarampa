import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

/**
 * Default Open Graph image — anasayfa ve override edilmeyen tüm sayfalar için.
 * Next.js otomatik olarak /opengraph-image route'una bağlar ve metadata'ya dahil eder.
 *
 * Boyut: 1200×630 (Facebook/LinkedIn/Twitter standardı)
 */
export const runtime = "edge";
export const alt = "Nova Rampa — Yükleme Rampası İmalatı";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #142235 0%, #1c2f47 50%, #142235 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Orange glow accent */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "70%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(249,115,22,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Top: brand mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "#F97316",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.04em",
            }}
          >
            N
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "0.08em",
            }}
          >
            NOVARAMPA
          </div>
        </div>

        {/* Center: headline + subtitle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            zIndex: 1,
            maxWidth: "880px",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#F97316",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
            }}
          >
            2003 — 2026 · Saha Tecrübesi
          </div>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
            }}
          >
            Yükleme rampası imalatçısı.
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.4,
              maxWidth: "780px",
            }}
          >
            Hidrolik, teleskopik, makaslı platform — Marmara&apos;dan Türkiye
            geneline imalat, montaj, servis.
          </div>
        </div>

        {/* Bottom: cert chips + URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            {["CE & TSE Belgeli", "EN 1398 Uyumlu", "2 Yıl Garanti"].map(
              (label) => (
                <div
                  key={label}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.18)",
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "18px",
                    fontWeight: 500,
                  }}
                >
                  {label}
                </div>
              )
            )}
          </div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.65)",
              fontFamily: "monospace",
            }}
          >
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
