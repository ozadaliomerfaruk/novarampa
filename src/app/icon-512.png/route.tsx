import { ImageResponse } from "next/og";

/**
 * PWA icon 512×512 — manifest.json'da referans verilen büyük ikon.
 * Splash screen ve büyük launcher slot'ları için.
 * URL: /icon-512.png
 */
export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #142235 0%, #1c2f47 100%)",
          borderRadius: "96px",
        }}
      >
        <div
          style={{
            width: "400px",
            height: "400px",
            borderRadius: "80px",
            background: "#F97316",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "280px",
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.06em",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          N
        </div>
      </div>
    ),
    { width: 512, height: 512 }
  );
}
