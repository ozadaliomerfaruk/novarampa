import { ImageResponse } from "next/og";

/**
 * Site favicon — tüm tarayıcı sekmeleri için.
 * Next.js otomatik olarak /icon route'una bağlar (favicon.svg ile birlikte fallback).
 */
export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F97316",
          fontSize: "22px",
          fontWeight: 800,
          color: "white",
          letterSpacing: "-0.06em",
          fontFamily: "system-ui, sans-serif",
          borderRadius: "6px",
        }}
      >
        N
      </div>
    ),
    { ...size }
  );
}
