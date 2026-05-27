import { ImageResponse } from "next/og";

/**
 * PWA icon 192×192 — manifest.json'da referans verilen ikon.
 * URL: /icon-192.png
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
          borderRadius: "32px",
        }}
      >
        <div
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "28px",
            background: "#F97316",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "100px",
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
    { width: 192, height: 192 }
  );
}
