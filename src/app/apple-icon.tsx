import { ImageResponse } from "next/og";

/**
 * Apple touch icon — iOS "Ana ekrana ekle" için.
 * Next.js otomatik olarak /apple-icon.png route'una bağlar.
 */
export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
            width: "140px",
            height: "140px",
            borderRadius: "28px",
            background: "#F97316",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "92px",
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
    { ...size }
  );
}
