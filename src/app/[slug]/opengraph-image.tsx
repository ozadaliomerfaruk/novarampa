import { ImageResponse } from "next/og";
import { sanityFetch } from "@/sanity/lib/fetch";
import { pageBySlugQuery } from "@/sanity/lib/queries";
import type { CustomPage } from "@/sanity/lib/types";

/**
 * Per-custom-page OG image — Eren'in Sanity'de oluşturduğu özel sayfalar için.
 * URL: /<slug>/opengraph-image
 */
// Node runtime — Sanity'den veri çeker; edge env-inlining sorununu önler.
export const alt = "Nova Rampa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function CustomPageOGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await sanityFetch<CustomPage>(pageBySlugQuery, {
    slug,
  });

  // Sayfa bulunamadıysa default OG döner
  const title = page?.title ?? "Nova Rampa";
  const excerpt = page?.excerpt ?? "Yükleme rampası imalatçısı";

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
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Brand */}
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
              width: "48px",
              height: "48px",
              borderRadius: "10px",
              background: "#F97316",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 800,
              color: "white",
            }}
          >
            N
          </div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "0.08em",
            }}
          >
            NOVARAMPA
          </div>
        </div>

        {/* Title + excerpt */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            zIndex: 1,
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: title.length > 50 ? "72px" : "84px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
          {excerpt && (
            <div
              style={{
                display: "flex",
                fontSize: "26px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.4,
                maxWidth: "880px",
              }}
            >
              {excerpt.length > 180 ? excerpt.slice(0, 180) + "..." : excerpt}
            </div>
          )}
        </div>

        {/* URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.65)",
              fontFamily: "monospace",
            }}
          >
            {`novarampa.com/${slug}`}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
